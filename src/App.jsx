import React, { useState } from 'react'
import Sidebar from './components/shared/Sidebar'
import Overview from './components/dashboard/Overview'
import MachineHealth from './components/machines/MachineHealth'
import BottleneckView from './components/bottleneck/BottleneckView'
import Recommendations from './components/recommendations/Recommendations'
import ShiftHandover from './components/dashboard/ShiftHandover'
import { useLiveData } from './hooks/useLiveData'
import { recommendations } from './data/factory'

export default function App() {
  const [page, setPage] = useState('overview')
  const { kpi, machines, stations, history } = useLiveData()

  const urgentCount = recommendations.filter(r =>
    r.priority === 'CRITICAL' || r.priority === 'HIGH'
  ).length

  const pages = {
    overview:        <Overview kpi={kpi} history={history} />,
    machines:        <MachineHealth machines={machines} />,
    bottleneck:      <BottleneckView stations={stations} />,
    recommendations: <Recommendations />,
    handover:        <ShiftHandover />,
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar active={page} onNav={setPage} alertCount={urgentCount} />

      <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>

        {/* Top bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          background: 'rgba(11,17,32,0.94)',
          backdropFilter: 'blur(6px)',
          borderBottom: '1px solid var(--border)',
          padding: '9px 26px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div className="live-dot" style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--green)', flexShrink: 0,
            }} />
            <span style={{ fontSize: 12, color: 'var(--dim)' }}>
              Live · refreshes every 5s · demo mode
            </span>
          </div>

          {/* Live KPI ticker */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {[
              { label: 'OEE',      value: `${kpi.oee}%`,     color: kpi.oee >= 75 ? 'var(--green)' : '#F59E0B' },
              { label: 'Units',    value: kpi.throughput,    color: 'var(--text)' },
              { label: 'Downtime', value: `${kpi.downtime}%`, color: kpi.downtime > 5 ? '#EF4444' : 'var(--green)' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 11, color: 'var(--dim)' }}>{item.label}</span>
                <span style={{
                  fontSize: 12, fontWeight: 500,
                  color: item.color,
                  fontFamily: 'var(--font-mono)',
                  transition: 'color 0.4s',
                }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Page */}
        <div key={page}>
          {pages[page]}
        </div>
      </main>
    </div>
  )
}
