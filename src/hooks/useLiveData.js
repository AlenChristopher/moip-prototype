import { useState, useEffect, useRef } from 'react'
import { kpiSummary, machines, stations, alerts, throughputHistory } from '../data/factory'

// Nudge a value by ±delta randomly, clamped between min and max
function nudge(val, delta, min, max) {
  const next = val + (Math.random() - 0.5) * 2 * delta
  return Math.min(max, Math.max(min, next))
}

export function useLiveData() {
  const [kpi, setKpi]         = useState({ ...kpiSummary })
  const [mchs, setMchs]       = useState(machines.map(m => ({ ...m })))
  const [sts, setSts]         = useState(stations.map(s => ({ ...s })))
  const [history, setHistory] = useState(throughputHistory)
  const [tick, setTick]       = useState(0)
  const tickRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      tickRef.current += 1
      setTick(tickRef.current)

      // Nudge top-level KPIs gently
      setKpi(prev => ({
        ...prev,
        oee:        +nudge(prev.oee, 0.15, 68, 74).toFixed(1),
        throughput: Math.round(nudge(prev.throughput, 2, 830, 870)),
        downtime:   +nudge(prev.downtime, 0.05, 4.2, 5.4).toFixed(1),
        fpy:        +nudge(prev.fpy, 0.1, 95.5, 97.0).toFixed(1),
      }))

      // Nudge machine health scores — Press-04 trends slowly down
      setMchs(prev => prev.map(m => {
        if (m.id === 'mch_01') {
          const next = +nudge(m.healthScore, 0.2, 38, 44).toFixed(0)
          return { ...m, healthScore: next }
        }
        return { ...m, healthScore: +nudge(m.healthScore, 0.1, m.healthScore - 2, m.healthScore + 2).toFixed(0) }
      }))

      // Nudge bottleneck queue depths — Assembly-3 fluctuates most
      setSts(prev => prev.map(s => ({
        ...s,
        queue: s.bottleneck
          ? Math.round(nudge(s.queue, 2, 36, 48))
          : Math.max(0, Math.round(nudge(s.queue, 0.5, 0, s.queue + 3))),
        score: s.bottleneck
          ? Math.round(nudge(s.score, 1, 90, 99))
          : Math.round(nudge(s.score, 0.5, Math.max(10, s.score - 5), s.score + 5)),
      })))

      // Every 12 ticks (~60s) push a new throughput data point
      if (tickRef.current % 12 === 0) {
        setHistory(prev => {
          const next = [...prev.slice(1)]
          const last = next[next.length - 1]
          const hour = (parseInt(last.time) + 1) % 24
          next.push({
            time: `${String(hour).padStart(2, '0')}:00`,
            actual: Math.round(nudge(last.actual, 5, 78, 110)),
            target: 109,
          })
          return next
        })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return { kpi, machines: mchs, stations: sts, history, tick }
}
