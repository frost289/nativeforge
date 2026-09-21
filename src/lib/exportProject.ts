import type { BuilderNode } from '../types'

export function projectJson(nodes: BuilderNode[]) {
  return JSON.stringify({ name: 'Untitled project', version: 1, screens: [{ id: 'home', name: 'Home', nodes }] }, null, 2)
}

export function downloadProject(nodes: BuilderNode[]) {
  const blob = new Blob([projectJson(nodes)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'nativeforge-project.json'
  anchor.click()
  URL.revokeObjectURL(url)
}
