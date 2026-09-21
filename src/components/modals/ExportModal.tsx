import { Check, Code2, Copy, Download, FileJson, Smartphone } from 'lucide-react'
import { useState } from 'react'
import ModalShell from './ModalShell'
import { useBuilderStore } from '../../store/useBuilderStore'
import { downloadProject, projectJson } from '../../lib/exportProject'

export default function ExportModal() {
  const { nodes, setModal } = useBuilderStore()
  const [copied, setCopied] = useState(false)
  const copy = async () => { await navigator.clipboard?.writeText(projectJson(nodes)); setCopied(true); window.setTimeout(() => setCopied(false), 1600) }
  return <ModalShell title="Export project" eyebrow="Ready when you are" onClose={() => setModal(null)} wide><p className="modal-copy">Take your design with you. Export a project file or generate a native starter.</p><div className="export-options"><button className="export-card" onClick={() => downloadProject(nodes)}><span className="export-card-icon purple"><FileJson size={19} /></span><span><strong>Project JSON</strong><small>Portable NativeForge project file</small></span><Download size={15} /></button><button className="export-card"><span className="export-card-icon mint"><Code2 size={19} /></span><span><strong>React Native starter</strong><small>Components and styles, ready to run</small></span><span className="soon">Soon</span></button><button className="export-card"><span className="export-card-icon orange"><Smartphone size={19} /></span><span><strong>Preview link</strong><small>Share a live version with your team</small></span><span className="soon">Soon</span></button></div><div className="code-preview"><div className="code-preview-head"><span><span className="code-dot" /> manifest.json</span><button onClick={copy}>{copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied' : 'Copy'}</button></div><pre>{projectJson(nodes).slice(0, 560)}{projectJson(nodes).length > 560 ? '\n  ...' : ''}</pre></div><div className="modal-footer"><span>{nodes.length} layers <small>in Home screen</small></span><button className="primary-action" onClick={() => downloadProject(nodes)}><Download size={14} /> Download JSON</button></div></ModalShell>
}
