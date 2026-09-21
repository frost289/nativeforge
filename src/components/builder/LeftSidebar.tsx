import { Layers3, Plus, Search, Smartphone, PanelLeft, ChevronDown, MoreHorizontal, Sparkles, LayoutTemplate, X } from 'lucide-react'
import { useBuilderStore } from '../../store/useBuilderStore'
import { COMPONENTS } from '../../registry/componentRegistry'

export default function LeftSidebar() {
  const { activeTab, setActiveTab, sidebarSearch, setSearch, addNode, setModal } = useBuilderStore()
  const filtered = COMPONENTS.filter((component) => component.label.toLowerCase().includes(sidebarSearch.toLowerCase()))
  return (
    <aside className="left-sidebar">
      <div className="sidebar-tabs">
        <button className={activeTab === 'components' ? 'selected' : ''} onClick={() => setActiveTab('components')}><Layers3 size={15} /> Components</button>
        <button className={activeTab === 'screens' ? 'selected' : ''} onClick={() => setActiveTab('screens')}><Smartphone size={15} /> Screens</button>
      </div>
      {activeTab === 'components' ? (
        <>
          <div className="sidebar-heading"><span>Components</span><button className="mini-plus" onClick={() => addNode('text')}><Plus size={14} /></button></div>
          <div className="search-field"><Search size={14} /><input value={sidebarSearch} onChange={(event) => setSearch(event.target.value)} placeholder="Search components..." />{sidebarSearch && <button onClick={() => setSearch('')}><X size={12} /></button>}<kbd>⌘ K</kbd></div>
          <div className="component-list">
            {filtered.map((component) => {
              const Icon = component.icon
              return <button key={component.type} className="component-row" draggable onDragStart={(event) => event.dataTransfer.setData('componentType', component.type)} onClick={() => addNode(component.type)}>
                <span className="component-icon" style={{ color: component.color, backgroundColor: `${component.color}18` }}><Icon size={15} /></span>
                <span className="component-copy"><strong>{component.label}</strong><small>{component.description}</small></span><Plus size={14} className="component-plus" />
              </button>
            })}
          </div>
          <div className="sidebar-spacer" />
          <button className="sidebar-feature" onClick={() => setModal('templates')}><span className="feature-icon"><Sparkles size={15} /></span><span><b>Generate with AI</b><small>Describe what to build</small></span><ChevronDown size={14} /></button>
          <button className="sidebar-feature" onClick={() => setModal('templates')}><span className="feature-icon template-icon"><LayoutTemplate size={15} /></span><span><b>Browse templates</b><small>Start from a foundation</small></span><ChevronDown size={14} /></button>
        </>
      ) : (
        <div className="screens-panel">
          <div className="sidebar-heading"><span>App screens</span><button className="mini-plus" onClick={() => addNode('screen')}><Plus size={14} /></button></div>
          <div className="screen-tree">
            <div className="screen-row active"><Smartphone size={14} /><span>Home</span><MoreHorizontal size={15} /></div>
            <div className="screen-row"><Smartphone size={14} /><span>Profile</span><MoreHorizontal size={15} /></div>
            <div className="screen-row"><Smartphone size={14} /><span>Settings</span><MoreHorizontal size={15} /></div>
          </div>
          <button className="new-screen" onClick={() => addNode('screen')}><Plus size={14} /> New screen</button>
        </div>
      )}
      <div className="sidebar-foot"><button><PanelLeft size={14} /> Collapse sidebar</button></div>
    </aside>
  )
}
