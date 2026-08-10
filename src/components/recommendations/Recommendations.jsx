import React, { useState } from 'react'
import { RiskBadge, SectionTitle, riskColor } from '../shared/UI'
import { recommendations } from '../../data/factory'

function RecCard({ rec, expanded, onToggle }) {
  const color = riskColor(rec.priority)
  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${expanded ? color + '40' : 'var(--border)'}`,
      borderRadius: 6,
      overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      <div onClick={onToggle} style={{
        padding: '13px 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        borderLeft: `2px solid ${color}`,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
            <RiskBadge risk={rec.priority} />
            <span style={{ fontSize: 11, color: 'var(--info)', fontFamily: 'var(--font-mono)' }}>{rec.machine}</span>
            <span style={{ fontSize: 11, color: 'var(--dim)', marginLeft: 'auto' }}>{rec.age}</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 5 }}>{rec.title}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <span style={{ fontSize: 11, color: 'var(--dim)' }}>
              Action: <span style={{ color: 'var(--info)' }}>{rec.action}</span>
            </span>
            <span style={{ fontSize: 11, color: 'var(--dim)' }}>
              ETA: <span style={{ color: '#F59E0B' }}>{rec.eta}</span>
            </span>
            <span style={{ fontSize: 11, color: 'var(--dim)' }}>
              Impact: <span style={{ color: '#22C55E' }}>{rec.impact}</span>
            </span>
          </div>
        </div>
        <div style={{
          color: 'var(--dim)', fontSize: 14, flexShrink: 0,
          transform: expanded ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s', userSelect: 'none',
        }}>▾</div>
      </div>

      {expanded && (
        <div style={{ padding: '0 16px 14px 18px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7, margin: '12px 0' }}>
            {rec.detail}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              background: `${color}15`, color, border: `1px solid ${color}40`,
              borderRadius: 4, padding: '7px 14px', fontSize: 12, fontWeight: 500, cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}>
              Acknowledge & assign
            </button>
            <button style={{
              background: 'transparent', color: 'var(--dim)', border: '1px solid var(--border2)',
              borderRadius: 4, padding: '7px 14px', fontSize: 12, cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Recommendations() {
  const [expanded, setExpanded] = useState('rec_01')
  const critical = recommendations.filter(r => r.priority === 'CRITICAL').length
  const high     = recommendations.filter(r => r.priority === 'HIGH').length

  return (
    <div className="fade-up" style={{ padding: '22px 26px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <SectionTitle>Recommendation queue</SectionTitle>
          <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: -6 }}>
            Ranked by urgency × impact ·{' '}
            <span style={{ color: '#EF4444' }}>{critical} critical</span> ·{' '}
            <span style={{ color: '#F59E0B' }}>{high} high</span>
          </div>
        </div>
        <div style={{
          fontSize: 11, color: 'var(--muted)',
          background: 'var(--raised)', borderRadius: 4, padding: '5px 10px',
          fontFamily: 'var(--font-mono)',
        }}>
          Adoption rate: <span style={{ color: '#22C55E' }}>62%</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {recommendations.map(rec => (
          <RecCard key={rec.id} rec={rec}
            expanded={expanded === rec.id}
            onToggle={() => setExpanded(expanded === rec.id ? null : rec.id)} />
        ))}
      </div>

      <div style={{
        marginTop: 16, padding: '12px 16px',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 6, fontSize: 12, color: 'var(--dim)', lineHeight: 1.7,
      }}>
        <span style={{ color: 'var(--text)', fontWeight: 500 }}>How recommendations are generated: </span>
        Each recommendation triggers when a KPI crosses a threshold — health score drops below 50,
        bottleneck sustained for over 15 minutes, or a pattern is detected across 3+ shifts.
        Priority weighted by urgency × estimated OEE impact. Every recommendation links to
        the specific data event that triggered it.
      </div>
    </div>
  )
}
