import React from 'react'
import { plantMeta } from '../../data/factory'

const NAV = [
  { id: 'overview',        label: 'Plant Overview'    },
  { id: 'machines',        label: 'Machine Health'     },
  { id: 'bottleneck',      label: 'Bottleneck Intel'   },
  { id: 'recommendations', label: 'Recommendations'    },
  { id: 'handover',        label: 'Shift Handover'     },
]

// Simple geometric icon per page
const ICONS = {
  overview:        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="7" width="3" height="6" fill="currentColor" rx="0.5"/><rect x="5.5" y="4" width="3" height="9" fill="currentColor" rx="0.5"/><rect x="10" y="1" width="3" height="12" fill="currentColor" rx="0.5"/></svg>,
  machines:        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.5"/></svg>,
  bottleneck:      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3h10M3.5 6h7M5 9h4M6 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  recommendations: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M2 7h7M2 10h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  handover:        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
}

export default function Sidebar({ active, onNav, alertCount }) {
  return (
    <div style={{
      width: 212,
      minHeight: '100vh',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>

      {/* Logo area */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.01em' }}>
          MOIP
        </div>
        <div style={{ fontSize: 11, color: 'var(--dim)', marginTop: 2, letterSpacing: '0.04em' }}>
          Operational Intelligence
        </div>
      </div>

      {/* Plant context */}
      <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <div className="live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: 'var(--green)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>LIVE</span>
        </div>
        <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500, marginBottom: 2 }}>{plantMeta.name}</div>
        <div style={{ fontSize: 11, color: 'var(--dim)', lineHeight: 1.5 }}>{plantMeta.shift}</div>
        <div style={{ fontSize: 11, color: 'var(--dim)' }}>{plantMeta.date}</div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '10px 10px' }}>
        {NAV.map(item => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              className={isActive ? 'nav-active' : 'nav-item'}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                padding: '8px 10px',
                borderRadius: 4,
                border: 'none',
                borderLeft: isActive ? '2px solid var(--green)' : '2px solid transparent',
                background: isActive ? 'rgba(34,197,94,0.06)' : 'transparent',
                color: isActive ? 'var(--text)' : 'var(--muted)',
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                marginBottom: 1,
                transition: 'all 0.15s',
                position: 'relative',
              }}
            >
              <span style={{ opacity: isActive ? 1 : 0.6, flexShrink: 0 }}>
                {ICONS[item.id]}
              </span>
              <span>{item.label}</span>
              {item.id === 'recommendations' && alertCount > 0 && (
                <span style={{
                  marginLeft: 'auto',
                  background: '#EF4444',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 600,
                  borderRadius: 10,
                  padding: '1px 5px',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {alertCount}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: 10, color: 'var(--dim)', lineHeight: 1.7 }}>
          Prototype · Demo mode<br />
          <span style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>v1.0</span>
        </div>
      </div>
    </div>
  )
}
