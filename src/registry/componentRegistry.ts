import { Box, Circle, Image, LayoutPanelTop, Minus, MousePointer2, Type, TextCursorInput } from 'lucide-react'
import type { ComponentDefinition, NodeType } from '../types'

export const COMPONENTS: ComponentDefinition[] = [
  { type: 'text', label: 'Text', description: 'Headings and labels', icon: Type, defaultContent: 'Your text here', color: '#8d7fff', group: 'Content' },
  { type: 'button', label: 'Button', description: 'Tap action', icon: MousePointer2, defaultContent: 'Get started', color: '#63dbbb', group: 'Actions' },
  { type: 'input', label: 'Input', description: 'Text field', icon: TextCursorInput, defaultContent: 'Enter text...', color: '#f6a85b', group: 'Forms' },
  { type: 'image', label: 'Image', description: 'Photo or artwork', icon: Image, defaultContent: 'Image placeholder', color: '#ec79a5', group: 'Content' },
  { type: 'card', label: 'Card', description: 'Content container', icon: LayoutPanelTop, defaultContent: 'Card title', color: '#67a7f8', group: 'Layout' },
  { type: 'stack', label: 'Stack', description: 'Vertical group', icon: Box, defaultContent: 'Stack', color: '#9b8df8', group: 'Layout' },
  { type: 'divider', label: 'Divider', description: 'Visual separator', icon: Minus, defaultContent: '', color: '#687086', group: 'Layout' },
  { type: 'screen', label: 'Screen', description: 'New app screen', icon: Circle, defaultContent: 'New screen', color: '#63dbbb', group: 'Navigation' },
]

export function getDefinition(type: NodeType) {
  return COMPONENTS.find((component) => component.type === type) ?? COMPONENTS[0]
}
