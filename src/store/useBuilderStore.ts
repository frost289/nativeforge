import { create } from 'zustand'
import type { BuilderNode, ModalType, NodeStyle } from '../types'

const initialNodes: BuilderNode[] = [
  { id: 'welcome', type: 'text', name: 'Welcome heading', content: 'Build something beautiful.', style: { fontSize: 25, fontWeight: 700, color: '#f5f5fa', align: 'left', width: 'full' } },
  { id: 'subtitle', type: 'text', name: 'Subtitle', content: 'A native app, without the busywork.', style: { fontSize: 14, fontWeight: 400, color: '#a3a7b8', align: 'left', width: 'full' } },
  { id: 'feature-card', type: 'card', name: 'Feature card', content: 'Your next big idea', style: { fontSize: 15, fontWeight: 600, color: '#f4f4f8', background: '#171c29', radius: 16, padding: 18, width: 'full' } },
  { id: 'cta', type: 'button', name: 'Primary button', content: 'Get started', style: { fontSize: 14, fontWeight: 600, color: '#10131b', background: '#a29bff', radius: 12, padding: 14, align: 'center', width: 'full' } },
  { id: 'email', type: 'input', name: 'Email input', content: 'you@example.com', style: { fontSize: 13, fontWeight: 400, color: '#858b9f', background: '#111520', radius: 10, padding: 13, width: 'full' } },
]

type BuilderStore = {
  nodes: BuilderNode[]
  selectedId: string
  activeScreen: string
  activeTab: 'components' | 'screens'
  sidebarSearch: string
  modal: ModalType
  workflowMode: boolean
  zoom: number
  theme: 'midnight' | 'aurora' | 'paper'
  setSelected: (id: string) => void
  setActiveTab: (tab: 'components' | 'screens') => void
  setSearch: (search: string) => void
  setModal: (modal: ModalType) => void
  setWorkflow: (value: boolean) => void
  setZoom: (zoom: number) => void
  updateNode: (id: string, patch: Partial<BuilderNode> & { style?: NodeStyle }) => void
  addNode: (type: BuilderNode['type']) => void
  removeNode: (id: string) => void
  duplicateNode: (id: string) => void
  reorderNodes: (activeId: string, overId: string) => void
  setTheme: (theme: 'midnight' | 'aurora' | 'paper') => void
}

export const useBuilderStore = create<BuilderStore>((set) => ({
  nodes: initialNodes,
  selectedId: 'welcome',
  activeScreen: 'home',
  activeTab: 'components',
  sidebarSearch: '',
  modal: null,
  workflowMode: false,
  zoom: 100,
  theme: 'midnight',
  setSelected: (selectedId) => set({ selectedId }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setSearch: (sidebarSearch) => set({ sidebarSearch }),
  setModal: (modal) => set({ modal }),
  setWorkflow: (workflowMode) => set({ workflowMode }),
  setZoom: (zoom) => set({ zoom: Math.min(130, Math.max(70, zoom)) }),
  updateNode: (id, patch) => set((state) => ({
    nodes: state.nodes.map((node) => node.id === id
      ? { ...node, ...patch, style: patch.style ? { ...node.style, ...patch.style } : node.style }
      : node),
  })),
  addNode: (type) => set((state) => {
    const labels: Record<string, string> = { text: 'Text label', button: 'Secondary button', input: 'Form input', image: 'Image', card: 'Content card', divider: 'Divider', stack: 'Group', screen: 'New screen' }
    const id = `${type}-${Date.now()}`
    const defaults: Record<string, NodeStyle> = {
      text: { fontSize: 16, fontWeight: 500, color: '#f4f4f8', width: 'full' },
      button: { fontSize: 14, fontWeight: 600, color: '#10131b', background: '#a29bff', radius: 12, padding: 13, align: 'center', width: 'full' },
      input: { fontSize: 13, color: '#858b9f', background: '#111520', radius: 10, padding: 13, width: 'full' },
      image: { background: '#1b2432', radius: 14, padding: 32, align: 'center', width: 'full' },
      card: { fontSize: 14, fontWeight: 600, color: '#f4f4f8', background: '#171c29', radius: 16, padding: 18, width: 'full' },
      divider: { color: '#252b3b', width: 'full' },
      stack: { background: '#111520', radius: 12, padding: 16, gap: 12, width: 'full' },
      screen: { background: '#111520', radius: 12, padding: 16, width: 'full' },
    }
    const node = { id, type, name: labels[type] ?? 'Component', content: type === 'divider' ? '' : labels[type] ?? 'Component', style: defaults[type] ?? {} }
    return { nodes: [...state.nodes, node as BuilderNode], selectedId: id }
  }),
  removeNode: (id) => set((state) => {
    const nodes = state.nodes.filter((node) => node.id !== id)
    return { nodes, selectedId: nodes[0]?.id ?? '' }
  }),
  duplicateNode: (id) => set((state) => {
    const original = state.nodes.find((node) => node.id === id)
    if (!original) return state
    const copy = { ...original, id: `${original.type}-${Date.now()}`, name: `${original.name} copy` }
    const index = state.nodes.findIndex((node) => node.id === id)
    const nodes = [...state.nodes]
    nodes.splice(index + 1, 0, copy)
    return { nodes, selectedId: copy.id }
  }),
  reorderNodes: (activeId, overId) => set((state) => {
    const from = state.nodes.findIndex((node) => node.id === activeId)
    const to = state.nodes.findIndex((node) => node.id === overId)
    if (from < 0 || to < 0 || from === to) return state
    const nodes = [...state.nodes]
    const [item] = nodes.splice(from, 1)
    nodes.splice(to, 0, item)
    return { nodes }
  }),
  setTheme: (theme) => set({ theme, modal: null }),
}))
