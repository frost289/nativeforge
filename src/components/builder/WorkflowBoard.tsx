import { ArrowRight, Bell, GitBranch, MoreHorizontal, Plus, Sparkles, Zap } from 'lucide-react'
import { useBuilderStore } from '../../store/useBuilderStore'

const cards = [
  { id: 'trigger', title: 'Button tapped', detail: 'When Primary button is tapped', icon: Zap, color: '#a29bff' },
  { id: 'request', title: 'Fetch data', detail: 'GET /api/recommendations', icon: GitBranch, color: '#63dbbb' },
  { id: 'toast', title: 'Show message', detail: '“You’re all set!”', icon: Bell, color: '#f6a85b' },
]

export default function WorkflowBoard() {
  const { setWorkflow } = useBuilderStore()
  return <div className="workflow-board"><div className="workflow-head"><div><span className="eyebrow">Logic canvas</span><h2>Home workflow</h2><p>Connect actions and create delightful app flows.</p></div><div className="workflow-head-actions"><button className="secondary-action"><Sparkles size={14} /> Suggest flow</button><button className="primary-action" onClick={() => setWorkflow(false)}>Back to builder</button></div></div><div className="workflow-canvas"><div className="workflow-grid" /><div className="workflow-path">{cards.map((card, index) => { const Icon = card.icon; return <div className="workflow-step" key={card.id}><div className="workflow-card"><div className="workflow-card-top"><span className="workflow-icon" style={{ background: `${card.color}20`, color: card.color }}><Icon size={15} /></span><span className="step-label">{index === 0 ? 'TRIGGER' : 'ACTION'}</span><MoreHorizontal size={15} /></div><strong>{card.title}</strong><small>{card.detail}</small></div>{index < cards.length - 1 && <div className="workflow-connector"><ArrowRight size={16} /></div>}</div> })}<button className="add-step"><Plus size={15} /> Add step</button></div><div className="workflow-tip"><Sparkles size={15} /><span><strong>Tip:</strong> Workflows are evaluated from top to bottom.</span></div></div></div>
}
