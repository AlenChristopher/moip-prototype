import React from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { OeeGauge, StatCard, SectionTitle, RiskBadge, riskColor } from '../shared/UI'
import { oeeBreakdown, downtimePareto, alerts } from '../../data/factory'

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--raised)', border: '1px solid var(--border2)',
      borderRadius: 5, padding: '8px 12px', fontSize: 12,
    }}>
      <div style={{ color: 'var(--dim)', marginBottom: 4, fontFamily: 'var(--font-mono)' }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, display: 'flex', gap: 10, justifyContent: 'space-between' }}>
          <span>{p.name}</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function Overview({ kpi, history }) {
  return (
    <div className="fade-up" style={{ padding: '22px 26px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* KPI strip */}
      <div>
        <SectionTitle>Live plant KPIs</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr 1fr 1fr', gap: 10, alignItems: 'start' }}>
          {/* OEE gauge card */}
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '16px 18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <OeeGauge value={kpi.oee} size={120} />
          </div>
          <StatCard label="Throughput" value={kpi.throughput} unit="units"
            sub={`Target ${kpi.targetThroughput}`}
            color={kpi.throughput / kpi.targetThroughput > 0.9 ? '#22C55E' : '#F59E0B'} />
          <StatCard label="Downtime" value={kpi.downtime} unit="%"
            sub="Target < 5.0%"
            color={kpi.downtime < 5 ? '#22C55E' : '#EF4444'} />
          <StatCard label="First Pass Yield" value={kpi.fpy} unit="%"
            sub="Target ≥ 97%"
            color={kpi.fpy >= 97 ? '#22C55E' : '#F59E0B'} />
          <StatCard label="MTBF" value={kpi.mtbf} unit="hr" sub="Rolling 90-day" color="var(--info)" />
          <StatCard label="Active Alerts" value={kpi.activeAlerts}
            sub="2 require action"
            color={kpi.activeAlerts > 0 ? '#EF4444' : '#22C55E'} />
        </div>
      </div>

      {/* OEE breakdown + throughput */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 12 }}>

        {/* OEE breakdown */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '16px 18px' }}>
          <SectionTitle>OEE breakdown</SectionTitle>
          {[
            { label: 'Availability', value: oeeBreakdown.availability, color: '#22C55E' },
            { label: 'Performance',  value: oeeBreakdown.performance,  color: '#60A5FA' },
            { label: 'Quality',      value: oeeBreakdown.quality,       color: '#A78BFA' },
          ].map(item => (
            <div key={item.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>{item.label}</span>
                <span style={{ fontSize: 12, color: item.color, fontFamily: 'var(--font-mono)' }}>
                  {item.value}%
                </span>
              </div>
              <div style={{ height: 3, background: 'var(--overlay)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${item.value}%`, background: item.color,
                  borderRadius: 2, transition: 'width 0.9s ease',
                }} />
              </div>
            </div>
          ))}
          <div style={{
            marginTop: 10, padding: '8px 10px',
            background: 'var(--raised)', borderRadius: 4, borderLeft: '2px solid var(--green-dim)',
          }}>
            <div style={{ fontSize: 11, color: 'var(--dim)' }}>World-class benchmark</div>
            <div style={{ fontSize: 13, color: 'var(--green)', fontFamily: 'var(--font-mono)', marginTop: 1 }}>≥ 85.0%</div>
          </div>
        </div>

        {/* Throughput chart */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '16px 18px' }}>
          <SectionTitle>Throughput — units / hour</SectionTitle>
          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={history} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22C55E" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fill: 'var(--dim)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--dim)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                axisLine={false} tickLine={false} domain={[60, 120]} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="target" name="Target"
                stroke="var(--border2)" strokeDasharray="4 3" fill="none" strokeWidth={1} dot={false} />
              <Area type="monotone" dataKey="actual" name="Actual"
                stroke="#22C55E" fill="url(#areaGrad)" strokeWidth={1.5} dot={false}
                activeDot={{ r: 3, fill: '#22C55E' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Downtime pareto + alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

        {/* Pareto */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '16px 18px' }}>
          <SectionTitle>Downtime causes — this shift</SectionTitle>
          <ResponsiveContainer width="100%" height={155}>
            <BarChart data={downtimePareto} layout="vertical" margin={{ top: 0, right: 36, bottom: 0, left: 0 }}>
              <XAxis type="number" tick={{ fill: 'var(--dim)', fontSize: 11, fontFamily: 'var(--font-mono)' }}
                axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="reason" tick={{ fill: 'var(--muted)', fontSize: 11 }}
                axisLine={false} tickLine={false} width={120} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="minutes" name="Minutes" radius={[0, 2, 2, 0]}>
                {downtimePareto.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6, padding: '16px 18px' }}>
          <SectionTitle>Active alerts</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {alerts.map(alert => (
              <div key={alert.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '9px 11px',
                background: 'var(--raised)', borderRadius: 5,
                borderLeft: `2px solid ${riskColor(alert.level)}`,
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 3 }}>
                    <RiskBadge risk={alert.level} small />
                    <span style={{ fontSize: 11, color: 'var(--info)', fontFamily: 'var(--font-mono)' }}>
                      {alert.machine}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.4 }}>{alert.message}</div>
                </div>
                <span style={{ fontSize: 11, color: 'var(--dim)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                  {alert.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
