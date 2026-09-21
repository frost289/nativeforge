import { AlignCenter, AlignLeft, AlignRight, ChevronDown, Copy, Eye, EyeOff, Link2, MoreHorizontal, Trash2, Type, X } from 'lucide-react'
import { useBuilderStore } from '../../store/useBuilderStore'

function NumberInput({ label, value, onChange, suffix }: { label: string; value?: number; onChange: (value: number) => void; suffix?: string }) {
  return <label className="number-field"><span>{label}</span><div><input type="number" value={value ?? ''} onChange={(event) => onChange(Number(event.target.value))} />{suffix && <small>{suffix}</small>}</div></label>
}

export default function PropertyInspector() {
  const { nodes, selectedId, setSelected, updateNode, duplicateNode, removeNode } = useBuilderStore()
  const node = nodes.find((item) => item.id === selectedId)
  if (!node) return <aside className="right-inspector inspector-empty"><div className="empty-inspector-icon"><Type size={20} /></div><h3>Select a component</h3><p>Choose something on the canvas to edit its properties.</p></aside>
  const style = node.style
  return (
    <aside className="right-inspector">
      <div className="inspector-head"><div><span className="eyebrow">Selected layer</span><h3>{node.name}</h3></div><div className="inspector-head-actions"><button onClick={() => updateNode(node.id, { visible: node.visible === false })}>{node.visible === false ? <EyeOff size={15} /> : <Eye size={15} />}</button><button onClick={() => setSelected('')}><X size={15} /></button></div></div>
      <div className="inspector-type"><span className="type-dot" /><span>{node.type}</span><button><MoreHorizontal size={15} /></button></div>
      <div className="inspector-section">
        <div className="section-title">Content <ChevronDown size={14} /></div>
        <label className="field-label">Text</label>
        <textarea className="content-input" value={node.content} onChange={(event) => updateNode(node.id, { content: event.target.value })} rows={2} />
        <label className="field-label">Layer name</label>
        <input className="text-input" value={node.name} onChange={(event) => updateNode(node.id, { name: event.target.value })} />
      </div>
      <div className="inspector-section">
        <div className="section-title">Layout <ChevronDown size={14} /></div>
        <div className="field-grid"><NumberInput label="Width" value={style.width === 'fit' ? undefined : 100} onChange={() => undefined} suffix="%" /><NumberInput label="Radius" value={style.radius} onChange={(value) => updateNode(node.id, { style: { radius: value } })} suffix="px" /></div>
        <NumberInput label="Padding" value={style.padding} onChange={(value) => updateNode(node.id, { style: { padding: value } })} suffix="px" />
        <div className="align-row"><span>Alignment</span><div><button className={style.align === 'left' ? 'active' : ''} onClick={() => updateNode(node.id, { style: { align: 'left' } })}><AlignLeft size={14} /></button><button className={style.align === 'center' ? 'active' : ''} onClick={() => updateNode(node.id, { style: { align: 'center' } })}><AlignCenter size={14} /></button><button className={style.align === 'right' ? 'active' : ''} onClick={() => updateNode(node.id, { style: { align: 'right' } })}><AlignRight size={14} /></button></div></div>
      </div>
      <div className="inspector-section">
        <div className="section-title">Appearance <ChevronDown size={14} /></div>
        <div className="color-row"><span>Text color</span><label className="color-picker"><input type="color" value={style.color ?? '#ffffff'} onChange={(event) => updateNode(node.id, { style: { color: event.target.value } })} /><span style={{ background: style.color ?? '#fff' }} /><code>{style.color ?? '#ffffff'}</code></label></div>
        {(node.type !== 'text' && node.type !== 'divider') && <div className="color-row"><span>Fill</span><label className="color-picker"><input type="color" value={style.background ?? '#171c29'} onChange={(event) => updateNode(node.id, { style: { background: event.target.value } })} /><span style={{ background: style.background ?? '#171c29' }} /><code>{style.background ?? '#171c29'}</code></label></div>}
        <div className="field-grid"><NumberInput label="Font size" value={style.fontSize} onChange={(value) => updateNode(node.id, { style: { fontSize: value } })} suffix="px" /><NumberInput label="Weight" value={style.fontWeight} onChange={(value) => updateNode(node.id, { style: { fontWeight: value } })} /></div>
      </div>
      <div className="inspector-section interaction-section"><div className="section-title">Interaction <ChevronDown size={14} /></div><button className="action-row"><Link2 size={14} /><span>On tap</span><span className="action-value">None <ChevronDown size={12} /></span></button></div>
      <div className="inspector-bottom"><button onClick={() => duplicateNode(node.id)}><Copy size={14} /> Duplicate</button><button className="danger-action" onClick={() => removeNode(node.id)}><Trash2 size={14} /> Delete</button></div>
    </aside>
  )
}
