import React, { useState } from 'react'
import { RiskBadge, SectionTitle, scoreColor, SparkLine } from '../shared/UI'

function SubBar({ label, value, max }) {
  const color = scoreColor((value / max) * 100)
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ fontSize: 11, color: 'var(--dim)' }}>{label}</span>
        <span style={{ fontSize: 11, color, fontFamily: 'var(--font-mono)' }}>{value}/{max}</span>
      </div>
      <div style={{ height: 2, background: 'var(--overlay)', borderRadius: 1 }}>
        <div style={{ height: '100%', width: `${(value/max)*100}%`, background: color, borderRadius: 1, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  )
}

function MachineCard({ machine, selected, onSelect }) {
  const color = scoreColor(machine.healthScore)
  const isSelected = selected === machine.id
  const isBad = machine.risk === 'CRITICAL' || machine.risk === 'HIGH'

  return (
    <div onClick={() => onSelect(isSelected ? null : machine.id)} style={{
      background: 'var(--surface)',
      border: `1px solid ${isSelected ? color + '50' : 'var(--border)'}`,
      borderRadius: 6,
      padding: '14px 16px',
      cursor: 'pointer',
      transition: 'border-color 0.2s',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>
            {machine.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--dim)' }}>{machine.type}</div>
          <div style={{ fontSize: 11, color: 'var(--dim)' }}>{machine.station}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: 4 }}>
            <RiskBadge risk={machine.risk} />
          </div>
          <div style={{ fontSize: 24, fontWeight: 500, color, fontFamily: 'var(--font-mono)', lineHeight: 1, transition: 'color 0.4s' }}>
            {machine.healthScore}
          </div>
          <div style={{ fontSize: 10, color: 'var(--dim)' }}>/ 100</div>
        </div>
      </div>

      {/* Spark + quick stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: 'var(--dim)' }}>7d</span>
        <SparkLine data={machine.trend} color={color} width={80} height={24} />
      </div>

      {/* Mini stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 10 }}>
        {[
          { label: 'DT today', value: `${machine.downtimeToday} min` },
          { label: 'CT / takt', value: `${machine.cycleTime}s / ${machine.taktTime}s` },
          { label: 'Fail freq', value: `${machine.failureFreq}/100` },
          { label: 'Last maint', value: machine.lastMaintenance },
        ].map(item => (
          <div key={item.label} style={{
            background: 'var(--raised)', borderRadius: 4, padding: '6px 8px',
          }}>
            <div style={{ fontSize: 10, color: 'var(--dim)', marginBottom: 1 }}>{item.label}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Top factor */}
      <div style={{
        padding: '7px 10px',
        background: isBad ? `${color}08` : 'var(--raised)',
        borderLeft: `2px solid ${color}`,
        borderRadius: '0 3px 3px 0',
      }}>
        <div style={{ fontSize: 10, color: 'var(--dim)', marginBottom: 1 }}>Top factor</div>
        <div style={{ fontSize: 11, color: 'var(--text)', lineHeight: 1.4 }}>{machine.mainFactor}</div>
      </div>

      {/* Sub-scores expanded */}
      {isSelected && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: 11, color: 'var(--dim)', marginBottom: 8 }}>Score sub-components</div>
          <SubBar label="Downtime trend (0–25)"    value={machine.subScores.downtime}    max={25} />
          <SubBar label="Failure frequency (0–25)" value={machine.subScores.failure}     max={25} />
          <SubBar label="Cycle stability (0–20)"   value={machine.subScores.stability}   max={20} />
          <SubBar label="Quality impact (0–15)"    value={machine.subScores.quality}     max={15} />
          <SubBar label="Maintenance age (0–15)"   value={machine.subScores.maintenance} max={15} />
        </div>
      )}
    </div>
  )
}

export default function MachineHealth({ machines }) {
  const [selected, setSelected] = useState('mch_01')
  const sorted = [...machines].sort((a, b) => a.healthScore - b.healthScore)
  const critical = sorted.filter(m => m.risk === 'CRITICAL').length
  const high     = sorted.filter(m => m.risk === 'HIGH').length

  return (
    <div className="fade-up" style={{ padding: '22px 26px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <SectionTitle>Machine health scores</SectionTitle>
          <div style={{ fontSize: 12, color: 'var(--dim)', marginTop: -6 }}>
            Composite 0–100 · recalculated every 15 min ·{' '}
            {critical > 0 && <span style={{ color: '#EF4444' }}>{critical} critical </span>}
            {high > 0 && <span style={{ color: '#F59E0B' }}>{high} high</span>}
          </div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--dim)' }}>Click card to expand sub-scores</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {sorted.map(machine => (
          <MachineCard key={machine.id} machine={machine} selected={selected} onSelect={setSelected} />
        ))}
      </div>
    </div>
  )
}
