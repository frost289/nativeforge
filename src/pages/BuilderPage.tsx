import '../App.css'
import TopNav, { Breadcrumb, CanvasToolbar } from '../components/builder/TopNav'
import LeftSidebar from '../components/builder/LeftSidebar'
import PhoneCanvas from '../components/builder/PhoneCanvas'
import PropertyInspector from '../components/builder/PropertyInspector'
import WorkflowBoard from '../components/builder/WorkflowBoard'
import ThemeModal from '../components/modals/ThemeModal'
import ExportModal from '../components/modals/ExportModal'
import TemplatesModal from '../components/modals/TemplatesModal'
import { useBuilderStore } from '../store/useBuilderStore'

export default function BuilderPage() {
  const { modal, workflowMode, theme } = useBuilderStore()
  return <main className={`app-shell theme-${theme}`}><TopNav /><div className="workspace-bar"><Breadcrumb /><div className="workspace-meta"><span>Home</span><span className="meta-separator">/</span><span>Last edited just now</span></div></div>{workflowMode ? <WorkflowBoard /> : <div className="builder-layout"><LeftSidebar /><div className="center-column"><CanvasToolbar /><PhoneCanvas /></div><PropertyInspector /></div>}{modal === 'theme' && <ThemeModal />}{modal === 'export' && <ExportModal />}{modal === 'templates' && <TemplatesModal />}</main>
}
