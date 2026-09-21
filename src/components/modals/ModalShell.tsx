import { X } from 'lucide-react'
import type { ReactNode } from 'react'

export default function ModalShell({ title, eyebrow, children, onClose, wide = false }: { title: string; eyebrow?: string; children: ReactNode; onClose: () => void; wide?: boolean }) {
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><div className={`modal-shell ${wide ? 'modal-wide' : ''}`}><div className="modal-head">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2><button onClick={onClose}><X size={17} /></button></div>{children}</div></div>
}
