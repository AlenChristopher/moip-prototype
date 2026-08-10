import React from 'react'
import { SectionTitle } from '../shared/UI'
import { shiftHandover } from '../../data/factory'

export default function ShiftHandover() {
  const h = shiftHandover
  const pct = ((h.unitsGood / h.target) * 100).toFixed(1)

  return (
    <div className="fade-up" style={{ padding: '22px 26px' }}>
      <SectionTitle>Auto-generated shift handover report</SectionTitle>
      <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: -6, marginBottom: 18 }}>
        Generated 30 minutes before shift end · delivered to oncoming supervisor via Teams + email
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>

        {/* Shift summary */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '18px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 14 }}>Shift summary</div>
          {[
            { label: 'Shift',            value: h.shift },
            { label: 'Supervisor',       value: h.supervisor },
            { label: 'Units good',       value: `${h.unitsGood.toLocaleString()} / ${h.target.toLocaleString()}` },
            { label: 'Target adherence', value: `${pct}%` },
            { label: 'Total downtime',   value: `${h.totalDowntime} min` },
            { label: 'Open recs',        value: `${h.openRecs} unresolved` },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '8px 0', borderBottom: '1px solid var(--border)',
            }}>
              <span style={{ fontSize: 12, color: 'var(--dim)' }}>{item.label}</span>
              <span style={{ fontSize: 12, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{item.value}</span>
            </div>
          ))}

          {/* Burn-down */}
          <div style={{ marginTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 11, color: 'var(--dim)' }}>Shift target progress</span>
              <span style={{ fontSize: 11, color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>{pct}%</span>
            </div>
            <div style={{ height: 5, background: 'var(--overlay)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${pct}%`,
                background: parseFloat(pct) >= 90 ? '#22C55E' : '#F59E0B',
                borderRadius: 3, transition: 'width 1s ease',
              }} />
            </div>
          </div>
        </div>

        {/* Notes + handover */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{
            background: 'rgba(239,68,68,0.05)',
            border: '1px solid rgba(239,68,68,0.28)',
            borderRadius: 6, padding: '16px 18px',
          }}>
            <div style={{ fontSize: 12, color: '#EF4444', fontWeight: 500, marginBottom: 8 }}>
              Critical issue — action required
            </div>
            <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>
              {h.topIssue}
            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '16px 18px', flex: 1 }}>
            <div style={{ fontSize: 12, color: 'var(--info)', fontWeight: 500, marginBottom: 8 }}>
              Notes for oncoming shift
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              {h.forOncoming}
            </div>
          </div>

          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '12px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--dim)' }}>Handover status</div>
              <div style={{ fontSize: 13, color: '#F59E0B', marginTop: 2, fontFamily: 'var(--font-mono)' }}>
                Awaiting oncoming supervisor
              </div>
            </div>
            <button style={{
              background: 'rgba(96,165,250,0.08)', color: 'var(--info)',
              border: '1px solid rgba(96,165,250,0.3)', borderRadius: 4,
              padding: '7px 14px', fontSize: 12, cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}>
              Acknowledge
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
