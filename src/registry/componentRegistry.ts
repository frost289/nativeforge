import { Box, Circle, Image, LayoutPanelTop, Minus, MousePointer2, Type, TextCursorInput } from 'lucide-react'
import type { ComponentDefinition, NodeType } from '../types'

export const COMPONENTS: ComponentDefinition[] = [
  { type: 'text', label: 'Text', description: 'Headings and labels', icon: Type, defaultContent: 'Your text here', color: '#8d7fff' },
  { type: 'button', label: 'Button', description: 'Tap action', icon: MousePointer2, defaultContent: 'Get started', color: '#63dbbb' },
  { type: 'input', label: 'Input', description: 'Text field', icon: TextCursorInput, defaultContent: 'Enter text...', color: '#f6a85b' },
  { type: 'image', label: 'Image', description: 'Photo or artwork', icon: Image, defaultContent: 'Image placeholder', color: '#ec79a5' },
  { type: 'card', label: 'Card', description: 'Content container', icon: LayoutPanelTop, defaultContent: 'Card title', color: '#67a7f8' },
  { type: 'stack', label: 'Stack', description: 'Vertical group', icon: Box, defaultContent: 'Stack', color: '#9b8df8' },
  { type: 'divider', label: 'Divider', description: 'Visual separator', icon: Minus, defaultContent: '', color: '#687086' },
  { type: 'screen', label: 'Screen', description: 'New app screen', icon: Circle, defaultContent: 'New screen', color: '#63dbbb' },
]

export function getDefinition(type: NodeType) {
  return COMPONENTS.find((component) => component.type === type) ?? COMPONENTS[0]
}
