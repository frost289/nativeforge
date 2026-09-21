import { ArrowUpRight, Layers3, Search, Sparkles, X } from 'lucide-react'
import ModalShell from './ModalShell'
import { useBuilderStore } from '../../store/useBuilderStore'

const templates = [
  { title: 'Focus dashboard', tag: 'Productivity', color: '#7770ed', description: 'A calm home for your daily work.' },
  { title: 'Social profile', tag: 'Community', color: '#e87ba9', description: 'A profile that feels like you.' },
  { title: 'Finance tracker', tag: 'Finance', color: '#65cfb1', description: 'See the bigger picture, instantly.' },
  { title: 'Travel planner', tag: 'Lifestyle', color: '#e7a056', description: 'Make every trip worth remembering.' },
]

export default function TemplatesModal() {
  const { setModal, addNode } = useBuilderStore()
  return <ModalShell title="Start with a template" eyebrow="Curated foundations" onClose={() => setModal(null)} wide><div className="template-toolbar"><div className="modal-search"><Search size={14} /><input placeholder="Search templates" /></div><button className="ai-template-button"><Sparkles size={14} /> Generate with AI</button></div><div className="template-grid">{templates.map((template) => <button className="template-card" key={template.title} onClick={() => { addNode('card'); setModal(null) }}><div className="template-thumb" style={{ background: `linear-gradient(135deg, ${template.color}, #171b2a 75%)` }}><div className="thumb-window"><div /><div /><div /></div><ArrowUpRight size={16} /></div><div className="template-info"><span className="template-tag">{template.tag}</span><strong>{template.title}</strong><small>{template.description}</small></div></button>)}</div><div className="template-footer"><span><Layers3 size={14} /> More templates are added every week</span><button onClick={() => setModal(null)}><X size={14} /> Close</button></div></ModalShell>
}
