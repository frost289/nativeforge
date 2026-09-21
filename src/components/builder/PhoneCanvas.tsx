import { useRef, useState } from 'react'
import { Copy, GripVertical, Trash2, Image as ImageIcon, Sparkles } from 'lucide-react'
import { useBuilderStore } from '../../store/useBuilderStore'
import type { BuilderNode } from '../../types'
import { getDefinition } from '../../registry/componentRegistry'

function NodeContent({ node }: { node: BuilderNode }) {
  if (node.type === 'image') return <div className="node-image-content"><ImageIcon size={22} /><span>{node.content}</span></div>
  if (node.type === 'divider') return <div className="node-divider" />
  if (node.type === 'button') return <span className="node-button-content">{node.content}</span>
  if (node.type === 'input') return <span className="node-input-content">{node.content}</span>
  if (node.type === 'card') return <><strong>{node.content}</strong><span className="card-subtext">A focused space for your content</span></>
  if (node.type === 'stack') return <><span className="stack-label">{node.content}</span><div className="stack-lines"><i /><i /><i /></div></>
  return node.content
}

function CanvasNode({ node }: { node: BuilderNode }) {
  const { selectedId, setSelected, duplicateNode, removeNode, reorderNodes } = useBuilderStore()
  const [dragging, setDragging] = useState(false)
  const selected = selectedId === node.id
  const definition = getDefinition(node.type)
  return (
    <div
      className={`canvas-node node-${node.type} ${selected ? 'is-selected' : ''} ${dragging ? 'is-dragging' : ''}`}
      style={{ color: node.style.color, background: node.type === 'button' || node.type === 'card' || node.type === 'input' || node.type === 'image' || node.type === 'stack' ? node.style.background : undefined, borderRadius: node.style.radius, padding: node.style.padding, fontSize: node.style.fontSize, fontWeight: node.style.fontWeight, textAlign: node.style.align, width: node.style.width === 'fit' ? 'fit-content' : undefined }}
      draggable
      onDragStart={(event) => { event.stopPropagation(); setDragging(true); event.dataTransfer.setData('nodeId', node.id) }}
      onDragEnd={() => setDragging(false)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => { event.stopPropagation(); const activeId = event.dataTransfer.getData('nodeId'); if (activeId) reorderNodes(activeId, node.id) }}
      onClick={(event) => { event.stopPropagation(); setSelected(node.id) }}
    >
      {selected && <div className="selection-label" style={{ background: definition.color }}>{node.name}</div>}
      {selected && <div className="node-actions"><button onClick={(event) => { event.stopPropagation(); duplicateNode(node.id) }}><Copy size={12} /></button><button onClick={(event) => { event.stopPropagation(); removeNode(node.id) }}><Trash2 size={12} /></button></div>}
      {selected && <span className="drag-handle"><GripVertical size={13} /></span>}
      {node.type === 'card' && <Sparkles className="card-spark" size={16} />}
      <NodeContent node={node} />
    </div>
  )
}

export default function PhoneCanvas() {
  const { nodes, zoom, setSelected, addNode } = useBuilderStore()
  const canvasRef = useRef<HTMLDivElement>(null)
  const [dropHint, setDropHint] = useState(false)
  const onDrop = (event: React.DragEvent) => {
    const type = event.dataTransfer.getData('componentType') as BuilderNode['type']
    if (type) { addNode(type); setDropHint(false) }
  }
  return (
    <section className="canvas-area">
      <div className="canvas-toolbar-wrap"><span className="canvas-title"><span className="live-indicator" /> Home <span className="unsaved">•</span></span></div>
      <div className="canvas-scroll">
        <div className="phone-wrap" style={{ transform: `scale(${zoom / 100})` }}>
          <div className="phone-device">
            <div className="phone-speaker" />
            <div className="phone-screen" ref={canvasRef} onClick={() => setSelected('')} onDragOver={(event) => { event.preventDefault(); setDropHint(true) }} onDragLeave={() => setDropHint(false)} onDrop={onDrop}>
              <div className="status-bar"><span>9:41</span><span className="status-icons">● ◔ ▮</span></div>
              <div className="app-header"><span className="app-greeting">Good morning <span>✦</span></span><button className="app-avatar">JD</button></div>
              <div className={`nodes-stack ${dropHint ? 'drop-hint' : ''}`}>
                {nodes.map((node) => <CanvasNode key={node.id} node={node} />)}
                {nodes.length === 0 && <div className="empty-canvas"><Sparkles size={20} /><span>Drop a component here</span></div>}
              </div>
              <div className="phone-home-indicator" />
            </div>
          </div>
        </div>
      </div>
      <div className="canvas-footer"><span>Drag components from the left to add them</span><span>⌘ + Enter to preview</span></div>
    </section>
  )
}
