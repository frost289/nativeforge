import { Bell, ChevronDown, Cloud, Command, Download, Eye, Grid2X2, HelpCircle, Moon, Play, Redo2, RotateCcw, Sparkles, Undo2, Workflow } from 'lucide-react'
import { useBuilderStore } from '../../store/useBuilderStore'

export default function TopNav() {
  const { setModal, workflowMode, setWorkflow, setSelected } = useBuilderStore()
  return (
    <header className="top-nav">
      <div className="brand">
        <div className="brand-mark"><Sparkles size={14} fill="currentColor" /></div>
        <span>nativeforge</span><span className="brand-slash">/</span><span className="brand-project">untitled</span>
      </div>
      <div className="top-nav-center">
        <button className="nav-pill active"><Grid2X2 size={14} /> Builder</button>
        <button className={`nav-pill ${workflowMode ? 'active' : ''}`} onClick={() => setWorkflow(!workflowMode)}><Workflow size={14} /> Workflow</button>
      </div>
      <div className="top-actions">
        <div className="save-state"><Cloud size={14} /> Saved <span className="save-dot" /></div>
        <button className="icon-button" aria-label="Undo"><Undo2 size={16} /></button>
        <button className="icon-button" aria-label="Redo"><Redo2 size={16} /></button>
        <span className="nav-divider" />
        <button className="top-button" onClick={() => setModal('templates')}><Sparkles size={14} /> Templates</button>
        <button className="top-button" onClick={() => setModal('theme')}><Moon size={14} /> Theme</button>
        <button className="preview-button" onClick={() => setSelected('cta')}><Play size={13} fill="currentColor" /> Preview</button>
        <button className="export-button" onClick={() => setModal('export')}><Download size={14} /> Export</button>
        <button className="avatar" title="Profile">JD</button>
        <button className="icon-button"><Bell size={16} /></button>
        <button className="icon-button"><HelpCircle size={16} /></button>
        <div className="shortcut"><Command size={11} /> K</div>
      </div>
    </header>
  )
}

export function Breadcrumb() {
  return <div className="breadcrumb"><span>Projects</span><ChevronDown size={12} /><span className="crumb-active">Untitled project</span><ChevronDown size={12} /></div>
}

export function CanvasToolbar() {
  const { zoom, setZoom, setModal } = useBuilderStore()
  return (
    <div className="canvas-toolbar">
      <div className="canvas-mode"><button className="canvas-mode-active"><Grid2X2 size={14} /> Design</button><button onClick={() => setModal('templates')}><Eye size={14} /> Inspect</button></div>
      <div className="canvas-actions">
        <button className="icon-button"><RotateCcw size={15} /></button>
        <span className="toolbar-divider" />
        <button className="zoom-control" onClick={() => setZoom(zoom - 10)}>−</button>
        <span className="zoom-value">{zoom}%</span>
        <button className="zoom-control" onClick={() => setZoom(zoom + 10)}>+</button>
        <button className="icon-button"><Grid2X2 size={15} /></button>
      </div>
    </div>
  )
}
