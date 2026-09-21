import { Check, Moon, Sparkles, Sun } from 'lucide-react'
import ModalShell from './ModalShell'
import { useBuilderStore } from '../../store/useBuilderStore'

const themes = [
  { id: 'midnight' as const, label: 'Midnight', note: 'Dark and focused', colors: ['#090b11', '#a29bff', '#171c29'], icon: Moon },
  { id: 'aurora' as const, label: 'Aurora', note: 'Colorful and expressive', colors: ['#101321', '#63dbbb', '#202743'], icon: Sparkles },
  { id: 'paper' as const, label: 'Paper', note: 'Light and minimal', colors: ['#f4f3ef', '#5950db', '#ffffff'], icon: Sun },
]

export default function ThemeModal() {
  const { theme, setTheme, setModal } = useBuilderStore()
  return <ModalShell title="Appearance" eyebrow="Workspace settings" onClose={() => setModal(null)}><p className="modal-copy">Choose a visual language for your project. You can change this at any time.</p><div className="theme-grid">{themes.map((item) => { const Icon = item.icon; return <button key={item.id} className={`theme-card ${theme === item.id ? 'active' : ''}`} onClick={() => setTheme(item.id)}><div className="theme-preview" style={{ background: item.colors[0] }}><div className="theme-preview-bar" style={{ background: item.colors[2] }} /><div className="theme-preview-line" style={{ background: item.colors[1] }} /><div className="theme-preview-line short" style={{ background: item.colors[2] }} /><div className="theme-preview-button" style={{ background: item.colors[1] }} /></div><div className="theme-meta"><span className="theme-icon"><Icon size={14} /></span><span><strong>{item.label}</strong><small>{item.note}</small></span>{theme === item.id && <Check size={15} className="theme-check" />}</div></button> })}</div><div className="modal-footer"><span>⌘ , <small>Open appearance</small></span><button className="primary-action" onClick={() => setModal(null)}>Done</button></div></ModalShell>
}
