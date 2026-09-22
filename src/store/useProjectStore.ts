import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { AppRole, AppScreen, DataCollection, Project } from '../types'

const defaultScreen: AppScreen = {
  id: 'screen-home',
  name: 'Home',
  route: '/home',
  isEntryPoint: true,
  requiredRoles: [],
  nodes: [],
}

const defaultProject: Omit<Project, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'> = {
  name: 'Untitled Project',
  theme: {
    primary: '#6C63FF',
    secondary: '#63dbbb',
    background: '#10131b',
    surface: '#171c29',
    text: '#f4f4f8',
    textSecondary: '#a3a7b8',
    borderRadius: 12,
    fontFamily: 'Inter',
  },
  screens: [defaultScreen],
  collections: [],
  roles: [],
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to save the project.'
}

type ProjectStore = {
  project: Project | null
  projects: Project[]
  saving: boolean
  activeScreenId: string
  error: string | null
  setActiveScreen: (id: string) => void
  loadProjects: (ownerId: string) => Promise<void>
  loadProject: (id: string) => Promise<void>
  createProject: (ownerId: string, name: string) => Promise<string>
  saveProject: () => Promise<void>
  updateProjectName: (name: string) => void
  addScreen: () => void
  removeScreen: (id: string) => void
  updateScreen: (id: string, patch: Partial<AppScreen>) => void
  addCollection: (collection: DataCollection) => void
  addRole: (role: AppRole) => void
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  project: null,
  projects: [],
  saving: false,
  activeScreenId: 'screen-home',
  error: null,

  setActiveScreen: (id) => set({ activeScreenId: id }),

  loadProjects: async (ownerId) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, created_at, updated_at, project_json')
        .eq('owner_id', ownerId)
        .order('updated_at', { ascending: false })
      if (error) {
        set({ error: errorMessage(error) })
        return
      }
      if (data) {
        set({
          projects: data.map((row) => ({ ...(row.project_json as Project), id: row.id })),
          error: null,
        })
      }
    } catch (error: unknown) {
      set({ error: errorMessage(error) })
    }
  },

  loadProject: async (id) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('project_json')
        .eq('id', id)
        .single()
      if (error) {
        set({ error: errorMessage(error) })
        return
      }
      if (data) set({ project: { ...(data.project_json as Project), id }, error: null })
    } catch (error: unknown) {
      set({ error: errorMessage(error) })
    }
  },

  createProject: async (ownerId, name) => {
    const now = new Date().toISOString()
    const projectWithoutId = { ...defaultProject, name, ownerId, createdAt: now, updatedAt: now }
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({ name, owner_id: ownerId, project_json: projectWithoutId })
        .select('id')
        .single()
      if (error) {
        set({ error: errorMessage(error) })
      }
      const id = data?.id ?? crypto.randomUUID()
      const project = { ...projectWithoutId, id }
      set({ project, projects: [project, ...get().projects], error: null })
      return id
    } catch (error: unknown) {
      const id = crypto.randomUUID()
      set({ error: errorMessage(error) })
      return id
    }
  },

  saveProject: async () => {
    const { project } = get()
    if (!project) return
    set({ saving: true, error: null })
    const updated = { ...project, updatedAt: new Date().toISOString() }
    try {
      const { error } = await supabase
        .from('projects')
        .update({ project_json: updated, updated_at: updated.updatedAt })
        .eq('id', project.id)
      set({ project: updated, saving: false, error: error ? errorMessage(error) : null })
    } catch (error: unknown) {
      set({ saving: false, error: errorMessage(error) })
    }
  },

  updateProjectName: (name) => set((state) => ({
    project: state.project ? { ...state.project, name } : null,
  })),

  addScreen: () => set((state) => {
    if (!state.project) return state
    const id = `screen-${Date.now()}`
    const screen: AppScreen = {
      id,
      name: `Screen ${state.project.screens.length + 1}`,
      route: `/${id}`,
      isEntryPoint: false,
      requiredRoles: [],
      nodes: [],
    }
    return {
      project: { ...state.project, screens: [...state.project.screens, screen] },
      activeScreenId: screen.id,
    }
  }),

  removeScreen: (id) => set((state) => {
    if (!state.project) return state
    const screens = state.project.screens.filter((screen) => screen.id !== id)
    return {
      project: { ...state.project, screens },
      activeScreenId: screens[0]?.id ?? '',
    }
  }),

  updateScreen: (id, patch) => set((state) => {
    if (!state.project) return state
    return {
      project: {
        ...state.project,
        screens: state.project.screens.map((screen) => (
          screen.id === id ? { ...screen, ...patch } : screen
        )),
      },
    }
  }),

  addCollection: (collection) => set((state) => ({
    project: state.project
      ? { ...state.project, collections: [...state.project.collections, collection] }
      : null,
  })),

  addRole: (role) => set((state) => ({
    project: state.project
      ? { ...state.project, roles: [...state.project.roles, role] }
      : null,
  })),
}))

export type { ProjectStore }
