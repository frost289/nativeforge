import type { LucideIcon } from 'lucide-react'

export type NodeType = 'screen' | 'text' | 'button' | 'input' | 'image' | 'card' | 'divider' | 'stack'

export type NodeStyle = {
  color?: string
  background?: string
  fontSize?: number
  fontWeight?: number
  radius?: number
  padding?: number
  gap?: number
  align?: 'left' | 'center' | 'right'
  width?: 'full' | 'fit'
}

export type BuilderNode = {
  id: string
  type: NodeType
  name: string
  content: string
  parentId?: string
  style: NodeStyle
  visible?: boolean
}

export type ComponentDefinition = {
  type: NodeType
  label: string
  description: string
  icon: LucideIcon
  defaultContent: string
  color: string
}

export type ModalType = 'theme' | 'export' | 'templates' | null
