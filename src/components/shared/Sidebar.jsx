import React from 'react'
import { plantMeta } from '../../data/factory'

const NAV = [
  { id: 'overview',        icon: '⬡', label: 'Plant Overview'   },
  { id: 'machines',        icon: '◈', label: 'Machine Health'    },
  { id: 'bottleneck',      icon: '⬡', label: 'Bottleneck Intel'  },
  { id: 'recommendations', icon: '◆', label: 'Recommendations'   },
  { id: 'handover',        icon: '⇄', label: 'Shift Handover'    },
]

export default function Sidebar({ active, onNav, alertCount }) {
  return (
    <div style={{
      width: 220,
      minHeight: '100vh',
      background: '#0D1117',
      borderRight: '1px solid #21262D',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '22px 20px 16px', borderBottom: '1px solid #161B22' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: 'rgba(0,212,255,0.1)',
            border: '1px solid rgba(0,212,255,0.3)',
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16,
          }}>
            ⬡
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#E6EDF3', letterSpacing: '-0.01em' }}>MOIP</div>
            <div style={{ fontSize: 10, color: '#8B949E', letterSpacing: '0.05em' }}>PROTOTYPE v1.0</div>
          </div>
        </div>
      </div>

      {/* Plant info */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid #161B22' }}>
        <div style={{ fontSize: 11, color: '#00D4FF', letterSpacing: '0.04em', marginBottom: 4 }}>
          ● LIVE
        </div>
        <div style={{ fontSize: 12, color: '#E6EDF3', fontWeight: 500 }}>{plantMeta.name}</div>
        <div style={{ fontSize: 11, color: '#8B949E', marginTop: 2 }}>{plantMeta.shift}</div>
        <div style={{ fontSize: 11, color: '#8B949E' }}>{plantMeta.date}</div>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '12px 10px' }}>
        {NAV.map(item => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 6,
                border: 'none',
                background: isActive ? 'rgba(0,212,255,0.08)' : 'transparent',
                color: isActive ? '#00D4FF' : '#8B949E',
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                marginBottom: 2,
                transition: 'all 0.15s',
                borderLeft: isActive ? '2px solid #00D4FF' : '2px solid transparent',
                position: 'relative',
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
              {item.id === 'recommendations' && alertCount > 0 && (
                <span style={{
                  marginLeft: 'auto',
                  background: '#FF4560',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  borderRadius: 10,
                  padding: '1px 6px',
                  minWidth: 18,
                  textAlign: 'center',
                }}>
                  {alertCount}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid #161B22' }}>
        <div style={{ fontSize: 10, color: '#484F58', lineHeight: 1.6 }}>
          Manufacturing Operational<br />Intelligence Platform<br />
          <span style={{ color: '#00D4FF' }}>Prototype — Demo Mode</span>
        </div>
      </div>
    </div>
  )
}
