import type { LucideIcon } from 'lucide-react'

export type NodeType =
  | 'screen' | 'text' | 'button' | 'input' | 'image' | 'card'
  | 'divider' | 'stack' | 'heading' | 'label' | 'caption'
  | 'passwordInput' | 'numberInput' | 'textarea' | 'checkbox'
  | 'switch' | 'slider' | 'rating' | 'iconButton' | 'fab'
  | 'radioGroup' | 'list' | 'dataTable' | 'kanban' | 'barChart'
  | 'lineChart' | 'pieChart' | 'statCard' | 'timeline' | 'calendar'
  | 'bottomTabBar' | 'topBar' | 'drawer' | 'tabs' | 'stepIndicator'
  | 'formContainer' | 'formField' | 'formSubmit' | 'fileUpload'
  | 'signaturePad' | 'loginScreen' | 'registerScreen'
  | 'forgotPassword' | 'otpVerification' | 'invoiceCard'
  | 'receiptView' | 'productCard' | 'pricingTable' | 'qrScanner'
  | 'barcodeDisplay' | 'modal' | 'bottomSheet' | 'toast' | 'alert'
  | 'loadingSpinner' | 'emptyState' | 'badge' | 'progressBar'
  | 'stepper' | 'avatar' | 'icon' | 'scrollView' | 'safeAreaView'
  | 'hStack' | 'vStack' | 'grid' | 'spacer' | 'richText'
  | 'videoPlayer' | 'mapView' | 'breadcrumb'

export type NodeStyle = {
  color?: string
  background?: string
  fontSize?: number
  fontWeight?: number
  radius?: number
  padding?: number
  gap?: number
  align?: 'left' | 'center' | 'right'
  width?: 'full' | 'fit' | number
  height?: number
  opacity?: number
  border?: string
  shadow?: boolean
}

export type WorkflowTrigger = {
  type: 'onPress' | 'onLoad' | 'onChange' | 'onSubmit' | 'onSwipe'
}

export type WorkflowAction =
  | { type: 'navigate'; screen: string; params?: Record<string, any> }
  | { type: 'firestoreRead'; collection: string; storeAs: string }
  | { type: 'firestoreWrite'; collection: string; data: Record<string, any>; operation: 'add' | 'update' | 'delete' }
  | { type: 'showToast'; message: string; variant: 'success' | 'error' | 'info' }
  | { type: 'setVariable'; name: string; value: any }
  | { type: 'condition'; if: string; then: WorkflowAction[]; else: WorkflowAction[] }
  | { type: 'signIn'; emailField: string; passwordField: string }
  | { type: 'signOut' }
  | { type: 'setUserRole'; role: string }

export type Workflow = {
  id: string
  trigger: WorkflowTrigger
  actions: WorkflowAction[]
}

export type DataBinding = {
  collectionId: string
  field: string
  mode: 'read' | 'write'
}

export type BuilderNode = {
  id: string
  type: NodeType
  name: string
  content: string
  parentId?: string
  style: NodeStyle
  visible?: boolean
  workflows?: Workflow[]
  dataBinding?: DataBinding
  children?: BuilderNode[]
  requiredRoles?: string[]
}

export type AppScreen = {
  id: string
  name: string
  route: string
  isEntryPoint: boolean
  requiredRoles: string[]
  nodes: BuilderNode[]
}

export type CollectionField = {
  name: string
  type: 'string' | 'number' | 'boolean' | 'timestamp' | 'reference'
}

export type DataCollection = {
  id: string
  name: string
  firestoreCollection: string
  fields: CollectionField[]
}

export type AppRole = {
  id: string
  name: string
  permissions: string[]
}

export type AppTheme = {
  primary: string
  secondary: string
  background: string
  surface: string
  text: string
  textSecondary: string
  borderRadius: number
  fontFamily: string
}

export type Project = {
  id: string
  name: string
  ownerId: string
  theme: AppTheme
  screens: AppScreen[]
  collections: DataCollection[]
  roles: AppRole[]
  createdAt: string
  updatedAt: string
}

export type ComponentDefinition = {
  type: NodeType
  label: string
  description: string
  icon: LucideIcon
  defaultContent: string
  color: string
  group: string
  defaultStyle?: NodeStyle
}

export type ModalType = 'theme' | 'export' | 'templates' | null
export type AuthUser = { uid: string; email: string; displayName?: string }
