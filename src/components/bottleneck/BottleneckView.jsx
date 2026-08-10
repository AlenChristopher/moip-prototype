import React from 'react'
import { SectionTitle } from '../shared/UI'

function cellColors(score) {
  if (score >= 85) return { bg: 'rgba(239,68,68,0.07)',  border: '#EF4444', text: '#EF4444', bar: '#EF4444' }
  if (score >= 65) return { bg: 'rgba(245,158,11,0.07)', border: '#F59E0B', text: '#F59E0B', bar: '#F59E0B' }
  if (score >= 40) return { bg: 'rgba(96,165,250,0.06)', border: '#60A5FA', text: '#60A5FA', bar: '#60A5FA' }
  return               { bg: 'rgba(34,197,94,0.06)',   border: '#22C55E', text: '#22C55E', bar: '#22C55E' }
}

function StationCell({ station }) {
  const c = cellColors(station.score)
  const isHot = station.score >= 85

  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${isHot ? c.border : c.border + '55'}`,
      borderRadius: 6,
      padding: '13px 14px',
      position: 'relative',
      transition: 'all 0.5s ease',
    }}>
      {station.bottleneck && (
        <div style={{
          position: 'absolute', top: -9, right: 10,
          background: '#EF4444', color: '#fff',
          fontSize: 9, fontWeight: 600,
          padding: '2px 7px', borderRadius: 10,
          letterSpacing: '0.07em', fontFamily: 'var(--font-mono)',
        }}>
          BOTTLENECK
        </div>
      )}

      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>
        {station.name}
      </div>

      {/* Score bar */}
      <div style={{ height: 2, background: 'var(--overlay)', borderRadius: 1, marginBottom: 8 }}>
        <div style={{ height: '100%', width: `${station.score}%`, background: c.bar, borderRadius: 1, transition: 'width 0.5s ease' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 500, color: c.text, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
            {station.score}
          </div>
          <div style={{ fontSize: 10, color: 'var(--dim)', marginTop: 1 }}>score</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 18, fontWeight: 500, color: c.text, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
            {station.queue}
          </div>
          <div style={{ fontSize: 10, color: 'var(--dim)', marginTop: 1 }}>queue</div>
        </div>
      </div>

      <div style={{
        marginTop: 8, padding: '3px 7px',
        background: 'var(--raised)', borderRadius: 3,
        fontSize: 11, fontFamily: 'var(--font-mono)',
        color: station.cycleVsTakt.startsWith('+') ? '#F59E0B' : '#22C55E',
      }}>
        {station.cycleVsTakt} vs takt
      </div>
    </div>
  )
}

export default function BottleneckView({ stations }) {
  const active = stations.find(s => s.bottleneck)

  return (
    <div className="fade-up" style={{ padding: '22px 26px' }}>
      <div style={{ marginBottom: 16 }}>
        <SectionTitle>Dynamic bottleneck intelligence</SectionTitle>
        <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: -6 }}>
          Station scores updated every 15 min · composite: queue 40% · cycle time 30% · downtime 20% · variance 10%
        </div>
      </div>

      {/* Active bottleneck callout */}
      {active && (
        <div style={{
          background: 'rgba(239,68,68,0.06)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 6, padding: '14px 18px', marginBottom: 16,
          display: 'flex', gap: 14, alignItems: 'flex-start',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 5,
            background: 'rgba(239,68,68,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, flexShrink: 0, color: '#EF4444',
          }}>
            ▲
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#EF4444', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>
              Active bottleneck — {active.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
              Queue {active.queue} units and rising · cycle time {active.cycleVsTakt} above takt ·
              Estimated gain if resolved:{' '}
              <span style={{ color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>+8 units/hr</span>
              <br />
              Recommended action:{' '}
              <span style={{ color: 'var(--info)' }}>reallocate one operator from Transfer-5 (61% utilisation)</span>
            </div>
          </div>
        </div>
      )}

      {/* Station grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 18 }}>
        {stations.map(s => <StationCell key={s.id} station={s} />)}
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex', gap: 18, padding: '10px 14px',
        background: 'var(--surface)', borderRadius: 5,
        border: '1px solid var(--border)', alignItems: 'center',
      }}>
        <span style={{ fontSize: 11, color: 'var(--dim)', fontFamily: 'var(--font-mono)' }}>SCORE</span>
        {[
          { range: '0–39',   label: 'Low',      color: '#22C55E' },
          { range: '40–64',  label: 'Moderate', color: '#60A5FA' },
          { range: '65–84',  label: 'High',     color: '#F59E0B' },
          { range: '85–100', label: 'Critical', color: '#EF4444' },
        ].map(item => (
          <div key={item.range} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color }} />
            <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
              {item.range} <span style={{ color: item.color }}>{item.label}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
