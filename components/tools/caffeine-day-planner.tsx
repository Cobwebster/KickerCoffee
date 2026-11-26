'use client'

import { useEffect, useMemo, useState } from 'react'
import { Link } from '@/components/link'
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Target,
  Trash2,
  TrendingDown,
} from 'lucide-react'

const STORAGE_KEY = 'kickercoffee-caffeine-tracker-v1'

const DRINK_PRESETS = [
  { id: 'brewed', label: 'Brewed coffee (8 oz)', mg: 95 },
  { id: 'large', label: 'Large drip (16 oz)', mg: 190 },
  { id: 'espresso', label: 'Espresso shot', mg: 63 },
  { id: 'double', label: 'Double espresso / small latte', mg: 126 },
  { id: 'coldbrew', label: 'Cold brew (8 oz)', mg: 155 },
  { id: 'tea', label: 'Black tea (8 oz)', mg: 47 },
  { id: 'energy', label: 'Energy drink (typical)', mg: 160 },
  { id: 'soda', label: 'Cola / soda (12 oz)', mg: 34 },
  { id: 'decaf', label: 'Decaf coffee (8 oz)', mg: 3 },
  { id: 'custom', label: 'Custom mg', mg: 0 },
] as const

const GOAL_PRESETS = [
  { id: 'standard', label: 'Standard guide', mg: 400, note: 'Common upper guide for many healthy adults.' },
  { id: 'moderate', label: 'Cutting — moderate', mg: 200, note: 'Roughly two drip cups — a common first cut.' },
  { id: 'low', label: 'Cutting — low', mg: 100, note: 'About one drip cup / light day.' },
  { id: 'taper', label: 'Taper week', mg: 50, note: 'Half-caf / tea territory while you taper.' },
  { id: 'custom', label: 'Custom goal', mg: 0, note: 'Set your own daily milligram cap.' },
] as const

type LogEntry = {
  id: string
  date: string
  label: string
  mg: number
  timeMin: number
}

type StoredState = {
  version: 1
  entries: LogEntry[]
  dailyGoal: number
  bedMin: number
  cutoffHours: number
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function parseDateKey(key: string) {
  const [y, m, day] = key.split('-').map(Number)
  return new Date(y, m - 1, day)
}

function todayKey() {
  return toDateKey(new Date())
}

function addDays(key: string, delta: number) {
  const d = parseDateKey(key)
  d.setDate(d.getDate() + delta)
  return toDateKey(d)
}

function formatClock(min: number) {
  const m = ((Math.round(min) % (24 * 60)) + 24 * 60) % (24 * 60)
  const h24 = Math.floor(m / 60)
  const mm = m % 60
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  const ampm = h24 < 12 ? 'am' : 'pm'
  return `${h12}:${pad(mm)} ${ampm}`
}

function minutesToTimeValue(min: number) {
  const m = ((min % (24 * 60)) + 24 * 60) % (24 * 60)
  return `${pad(Math.floor(m / 60))}:${pad(m % 60)}`
}

function parseTime(value: string) {
  const [h, m] = value.split(':').map(Number)
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null
  return h * 60 + m
}

function formatShortDate(key: string) {
  return parseDateKey(key).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function monthLabel(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  })
}

function defaultState(): StoredState {
  return {
    version: 1,
    entries: [],
    dailyGoal: 200,
    bedMin: 23 * 60,
    cutoffHours: 8,
  }
}

function loadState(): StoredState {
  if (typeof window === 'undefined') return defaultState()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as Partial<StoredState>
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.entries)) return defaultState()
    return {
      version: 1,
      entries: parsed.entries.filter(
        (e) =>
          e &&
          typeof e.id === 'string' &&
          typeof e.date === 'string' &&
          typeof e.label === 'string' &&
          typeof e.mg === 'number' &&
          typeof e.timeMin === 'number',
      ),
      dailyGoal:
        typeof parsed.dailyGoal === 'number' && parsed.dailyGoal > 0
          ? Math.min(1000, Math.round(parsed.dailyGoal))
          : 200,
      bedMin: typeof parsed.bedMin === 'number' ? parsed.bedMin : 23 * 60,
      cutoffHours:
        typeof parsed.cutoffHours === 'number' ? Math.min(14, Math.max(4, parsed.cutoffHours)) : 8,
    }
  } catch {
    return defaultState()
  }
}

function dayTotal(entries: LogEntry[], date: string) {
  return entries.filter((e) => e.date === date).reduce((s, e) => s + e.mg, 0)
}

function rangeTotals(entries: LogEntry[], startKey: string, days: number) {
  const out: { date: string; mg: number }[] = []
  for (let i = 0; i < days; i++) {
    const date = addDays(startKey, i)
    out.push({ date, mg: dayTotal(entries, date) })
  }
  return out
}

function avgLogged(points: { mg: number }[]) {
  const logged = points.filter((p) => p.mg > 0)
  if (!logged.length) return 0
  return Math.round(logged.reduce((s, p) => s + p.mg, 0) / logged.length)
}

function BarChart({
  points,
  goal,
  height = 140,
}: {
  points: { date: string; mg: number; label: string }[]
  goal: number
  height?: number
}) {
  const maxMg = Math.max(goal, ...points.map((p) => p.mg), 1)
  const w = Math.max(280, points.length * 36)
  const padL = 28
  const padB = 28
  const padT = 10
  const chartH = height - padB - padT
  const chartW = w - padL - 8
  const barW = Math.min(22, (chartW / points.length) * 0.62)
  const goalY = padT + chartH - (goal / maxMg) * chartH

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${w} ${height}`}
        width="100%"
        height={height}
        role="img"
        aria-label="Caffeine trend chart"
      >
        <line
          x1={padL}
          x2={w - 8}
          y1={goalY}
          y2={goalY}
          stroke="currentColor"
          strokeDasharray="4 4"
          className="text-accent/70"
          strokeWidth={1.5}
        />
        <text x={padL - 4} y={goalY + 3} textAnchor="end" className="fill-muted-foreground" fontSize={9}>
          {goal}
        </text>
        {points.map((p, i) => {
          const x = padL + (i + 0.5) * (chartW / points.length) - barW / 2
          const h = (p.mg / maxMg) * chartH
          const y = padT + chartH - h
          const over = p.mg > goal && p.mg > 0
          return (
            <g key={p.date}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={Math.max(h, p.mg > 0 ? 2 : 0)}
                rx={3}
                className={over ? 'fill-amber-600/80 dark:fill-amber-500/80' : 'fill-accent'}
              />
              <text
                x={x + barW / 2}
                y={height - 8}
                textAnchor="middle"
                className="fill-muted-foreground"
                fontSize={9}
              >
                {p.label}
              </text>
            </g>
          )
        })}
      </svg>
      <p className="mt-1 text-xs text-muted-foreground">
        Dashed line = your daily goal ({goal} mg). Amber bars = over goal.
      </p>
    </div>
  )
}

export function CaffeineDayPlanner() {
  const [hydrated, setHydrated] = useState(false)
  const [entries, setEntries] = useState<LogEntry[]>([])
  const [dailyGoal, setDailyGoal] = useState(200)
  const [goalPreset, setGoalPreset] = useState<(typeof GOAL_PRESETS)[number]['id']>('moderate')
  const [customGoal, setCustomGoal] = useState(150)
  const [bedMin, setBedMin] = useState(23 * 60)
  const [cutoffHours, setCutoffHours] = useState(8)
  const [selectedDate, setSelectedDate] = useState(todayKey)
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth())
  const [chartRange, setChartRange] = useState<'week' | 'month'>('week')
  const [presetId, setPresetId] = useState<(typeof DRINK_PRESETS)[number]['id']>('brewed')
  const [customMg, setCustomMg] = useState(100)
  const [addTimeMin, setAddTimeMin] = useState(() => {
    const n = new Date()
    return n.getHours() * 60 + n.getMinutes()
  })

  useEffect(() => {
    const s = loadState()
    setEntries(s.entries)
    setDailyGoal(s.dailyGoal)
    setBedMin(s.bedMin)
    setCutoffHours(s.cutoffHours)
    const match = GOAL_PRESETS.find((g) => g.id !== 'custom' && g.mg === s.dailyGoal)
    if (match) setGoalPreset(match.id)
    else {
      setGoalPreset('custom')
      setCustomGoal(s.dailyGoal)
    }
    const t = todayKey()
    setSelectedDate(t)
    const d = new Date()
    setViewYear(d.getFullYear())
    setViewMonth(d.getMonth())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const payload: StoredState = {
      version: 1,
      entries,
      dailyGoal,
      bedMin,
      cutoffHours,
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      /* ignore quota / private mode */
    }
  }, [hydrated, entries, dailyGoal, bedMin, cutoffHours])

  const cutoffMin = (bedMin - cutoffHours * 60 + 24 * 60) % (24 * 60)
  const today = todayKey()
  const todayMg = useMemo(() => dayTotal(entries, today), [entries, today])
  const selectedMg = useMemo(() => dayTotal(entries, selectedDate), [entries, selectedDate])
  const selectedEntries = useMemo(
    () =>
      entries
        .filter((e) => e.date === selectedDate)
        .sort((a, b) => a.timeMin - b.timeMin || a.label.localeCompare(b.label)),
    [entries, selectedDate],
  )

  const weekStart = useMemo(() => {
    const d = parseDateKey(today)
    const day = d.getDay() // 0 Sun
    const mondayOffset = day === 0 ? -6 : 1 - day
    d.setDate(d.getDate() + mondayOffset)
    return toDateKey(d)
  }, [today])

  const thisWeek = useMemo(() => rangeTotals(entries, weekStart, 7), [entries, weekStart])
  const lastWeek = useMemo(
    () => rangeTotals(entries, addDays(weekStart, -7), 7),
    [entries, weekStart],
  )
  const thisWeekSum = thisWeek.reduce((s, p) => s + p.mg, 0)
  const lastWeekSum = lastWeek.reduce((s, p) => s + p.mg, 0)
  const thisWeekAvg = avgLogged(thisWeek)
  const weekDeltaPct =
    lastWeekSum > 0 ? Math.round(((thisWeekSum - lastWeekSum) / lastWeekSum) * 100) : null

  const monthStartKey = useMemo(
    () => toDateKey(new Date(viewYear, viewMonth, 1)),
    [viewYear, viewMonth],
  )
  const daysInMonth = useMemo(
    () => new Date(viewYear, viewMonth + 1, 0).getDate(),
    [viewYear, viewMonth],
  )
  const monthPoints = useMemo(
    () => rangeTotals(entries, monthStartKey, daysInMonth),
    [entries, monthStartKey, daysInMonth],
  )
  const monthAvg = avgLogged(monthPoints)
  const monthSum = monthPoints.reduce((s, p) => s + p.mg, 0)

  const underGoalStreak = useMemo(() => {
    let streak = 0
    let cursor = today
    // Don't count today if empty
    if (dayTotal(entries, today) === 0) cursor = addDays(today, -1)
    for (let i = 0; i < 60; i++) {
      const mg = dayTotal(entries, cursor)
      if (mg === 0) break
      if (mg > dailyGoal) break
      streak++
      cursor = addDays(cursor, -1)
    }
    return streak
  }, [entries, today, dailyGoal])

  const chartPoints = useMemo(() => {
    if (chartRange === 'week') {
      return thisWeek.map((p) => ({
        ...p,
        label: parseDateKey(p.date).toLocaleDateString(undefined, { weekday: 'narrow' }),
      }))
    }
    return monthPoints.map((p) => ({
      ...p,
      label: String(parseDateKey(p.date).getDate()),
    }))
  }, [chartRange, thisWeek, monthPoints])

  const calendarCells = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1)
    const startPad = (first.getDay() + 6) % 7 // Monday-first
    const cells: ({ date: string; day: number; mg: number } | null)[] = []
    for (let i = 0; i < startPad; i++) cells.push(null)
    for (let day = 1; day <= daysInMonth; day++) {
      const date = toDateKey(new Date(viewYear, viewMonth, day))
      cells.push({ date, day, mg: dayTotal(entries, date) })
    }
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }, [viewYear, viewMonth, daysInMonth, entries])

  function applyGoalPreset(id: (typeof GOAL_PRESETS)[number]['id']) {
    setGoalPreset(id)
    if (id === 'custom') {
      setDailyGoal(customGoal)
    } else {
      const g = GOAL_PRESETS.find((x) => x.id === id)!
      setDailyGoal(g.mg)
    }
  }

  function addEntry() {
    const preset = DRINK_PRESETS.find((p) => p.id === presetId)!
    const mg = presetId === 'custom' ? Math.max(0, Math.round(customMg)) : preset.mg
    if (mg <= 0 && presetId === 'custom') return
    const label = presetId === 'custom' ? `Custom (${mg} mg)` : preset.label
    setEntries((prev) => [
      ...prev,
      { id: uid(), date: selectedDate, label, mg, timeMin: addTimeMin },
    ])
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  function shiftMonth(delta: number) {
    const d = new Date(viewYear, viewMonth + delta, 1)
    setViewYear(d.getFullYear())
    setViewMonth(d.getMonth())
  }

  function exportCsv() {
    const lines = [
      'date,time,label,mg',
      ...[...entries]
        .sort((a, b) => a.date.localeCompare(b.date) || a.timeMin - b.timeMin)
        .map(
          (e) =>
            `${e.date},${formatClock(e.timeMin)},"${e.label.replace(/"/g, '""')}",${e.mg}`,
        ),
      '',
      `daily_goal_mg,${dailyGoal}`,
      `this_week_total_mg,${thisWeekSum}`,
      `this_week_avg_logged_mg,${thisWeekAvg}`,
      `month_total_mg,${monthSum}`,
      `month_avg_logged_mg,${monthAvg}`,
      '',
      'Educational only — not medical advice. Data from Kicker Coffee caffeine tracker.',
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `caffeine-tracker-${today}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function clearAll() {
    if (!window.confirm('Clear all saved caffeine logs on this device?')) return
    setEntries([])
  }

  function isAfterCutoff(timeMin: number) {
    return cutoffMin < bedMin
      ? timeMin > cutoffMin && timeMin <= bedMin
      : timeMin > cutoffMin || timeMin <= bedMin
  }

  const goalPct = Math.min(100, (selectedMg / dailyGoal) * 100)
  const cutting = dailyGoal <= 200

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
        <p className="text-sm text-muted-foreground">Loading your caffeine tracker…</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Saved on this device
          </p>
          <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground">
            Caffeine calendar tracker
          </h2>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Log drinks or raw milligrams by day. Watch weekly and monthly trends, set a cut-down
            goal, and keep bedtime cutoffs honest — all in your browser&apos;s local storage.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:border-accent"
          >
            <Download className="size-4" />
            Export CSV
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:border-accent hover:text-foreground"
          >
            Clear data
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Today</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-foreground">{todayMg} mg</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Goal {dailyGoal} mg ·{' '}
            {todayMg > dailyGoal
              ? `${todayMg - dailyGoal} mg over`
              : `${dailyGoal - todayMg} mg left`}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">7-day avg (logged days)</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-foreground">{thisWeekAvg} mg</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Week total {thisWeekSum} mg
            {weekDeltaPct != null && (
              <>
                {' '}
                · vs last week{' '}
                <span className={weekDeltaPct <= 0 ? 'text-emerald-700 dark:text-emerald-400' : ''}>
                  {weekDeltaPct > 0 ? '+' : ''}
                  {weekDeltaPct}%
                </span>
              </>
            )}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Month avg (logged)</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-foreground">{monthAvg} mg</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {monthLabel(viewYear, viewMonth)} · {monthSum} mg total
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="inline-flex items-center gap-1 text-sm text-muted-foreground">
            <TrendingDown className="size-3.5" />
            Under-goal streak
          </p>
          <p className="mt-1 font-serif text-3xl font-semibold text-foreground">
            {underGoalStreak}
            <span className="ml-1 text-base font-sans font-medium text-muted-foreground">days</span>
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Consecutive logged days ≤ {dailyGoal} mg
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section>
          <div className="mb-3 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-foreground"
              aria-label="Previous month"
            >
              <ChevronLeft className="size-4" />
            </button>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              {monthLabel(viewYear, viewMonth)}
            </h3>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="rounded-lg border border-border p-1.5 text-muted-foreground hover:text-foreground"
              aria-label="Next month"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {calendarCells.map((cell, i) => {
              if (!cell) return <div key={`empty-${i}`} className="aspect-square" />
              const selected = cell.date === selectedDate
              const isToday = cell.date === today
              const over = cell.mg > dailyGoal
              const logged = cell.mg > 0
              return (
                <button
                  key={cell.date}
                  type="button"
                  onClick={() => setSelectedDate(cell.date)}
                  className={[
                    'flex aspect-square flex-col items-center justify-center rounded-xl border text-sm transition-colors',
                    selected
                      ? 'border-accent bg-accent/15 text-foreground'
                      : 'border-border bg-background hover:border-accent/60',
                    isToday && !selected ? 'ring-1 ring-accent/40' : '',
                  ].join(' ')}
                >
                  <span className="font-medium">{cell.day}</span>
                  <span
                    className={[
                      'mt-0.5 text-[10px] leading-none',
                      !logged
                        ? 'text-muted-foreground/50'
                        : over
                          ? 'text-amber-700 dark:text-amber-400'
                          : 'text-accent',
                    ].join(' ')}
                  >
                    {logged ? cell.mg : '·'}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Tap a day to log or edit. Green-ish totals under goal; amber over goal.
          </p>
        </section>

        <section className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm text-muted-foreground">Selected day</p>
                <p className="font-serif text-xl font-semibold text-foreground">
                  {formatShortDate(selectedDate)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-serif text-2xl font-semibold text-foreground">{selectedMg} mg</p>
                <p className="text-xs text-muted-foreground">
                  {Math.round(goalPct)}% of {dailyGoal} mg goal
                </p>
              </div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${
                  selectedMg > dailyGoal ? 'bg-amber-600' : 'bg-accent'
                }`}
                style={{ width: `${Math.min(100, goalPct)}%` }}
              />
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_auto]">
              <select
                value={presetId}
                onChange={(e) => setPresetId(e.target.value as typeof presetId)}
                className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground outline-none focus:border-accent"
              >
                {DRINK_PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id === 'custom' ? p.label : `${p.label} — ${p.mg} mg`}
                  </option>
                ))}
              </select>
              <input
                type="time"
                value={minutesToTimeValue(addTimeMin)}
                onChange={(e) => {
                  const v = parseTime(e.target.value)
                  if (v != null) setAddTimeMin(v)
                }}
                className="rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground outline-none focus:border-accent"
              />
              <button
                type="button"
                onClick={addEntry}
                className="inline-flex items-center justify-center gap-1 rounded-xl border border-accent bg-accent px-3 py-2.5 text-sm font-medium text-accent-foreground"
              >
                <Plus className="size-4" />
                Log
              </button>
            </div>
            {presetId === 'custom' && (
              <input
                type="number"
                min={1}
                max={1000}
                value={customMg}
                onChange={(e) => setCustomMg(Math.max(0, Number(e.target.value)))}
                className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground outline-none focus:border-accent"
                aria-label="Custom milligrams"
                placeholder="Milligrams"
              />
            )}

            <ul className="mt-4 flex max-h-52 flex-col gap-2 overflow-y-auto">
              {selectedEntries.length === 0 && (
                <li className="rounded-lg border border-dashed border-border px-3 py-3 text-sm text-muted-foreground">
                  Nothing logged yet — add a drink or custom mg for this day.
                </li>
              )}
              {selectedEntries.map((e) => (
                <li
                  key={e.id}
                  className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
                >
                  <span className="min-w-0 flex-1 text-foreground">
                    <span className="font-medium">{formatClock(e.timeMin)}</span> — {e.label} ({e.mg}{' '}
                    mg)
                    {isAfterCutoff(e.timeMin) && (
                      <span className="ml-2 text-xs text-amber-700 dark:text-amber-400">
                        after cutoff
                      </span>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEntry(e.id)}
                    className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Remove entry"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
            {selectedDate !== today && (
              <button
                type="button"
                onClick={() => setSelectedDate(today)}
                className="mt-3 text-sm font-medium text-accent hover:underline"
              >
                Jump to today
              </button>
            )}
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <p className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
              <Target className="size-4 text-accent" />
              Daily goal {cutting ? '(cut-down mode)' : ''}
            </p>
            <select
              value={goalPreset}
              onChange={(e) => applyGoalPreset(e.target.value as typeof goalPreset)}
              className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground outline-none focus:border-accent"
            >
              {GOAL_PRESETS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.id === 'custom' ? g.label : `${g.label} — ${g.mg} mg`}
                </option>
              ))}
            </select>
            {goalPreset === 'custom' && (
              <input
                type="number"
                min={10}
                max={1000}
                value={customGoal}
                onChange={(e) => {
                  const v = Math.max(10, Math.min(1000, Number(e.target.value) || 10))
                  setCustomGoal(v)
                  setDailyGoal(v)
                }}
                className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground outline-none focus:border-accent"
                aria-label="Custom daily goal milligrams"
              />
            )}
            <p className="mt-2 text-xs text-muted-foreground">
              {GOAL_PRESETS.find((g) => g.id === goalPreset)?.note} Not medical advice.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">Bedtime</span>
                <input
                  type="time"
                  value={minutesToTimeValue(bedMin)}
                  onChange={(e) => {
                    const v = parseTime(e.target.value)
                    if (v != null) setBedMin(v)
                  }}
                  className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground outline-none focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">
                  Cutoff buffer (hours)
                </span>
                <input
                  type="number"
                  min={4}
                  max={14}
                  value={cutoffHours}
                  onChange={(e) =>
                    setCutoffHours(Math.min(14, Math.max(4, Number(e.target.value) || 8)))
                  }
                  className="w-full rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-foreground outline-none focus:border-accent"
                />
              </label>
            </div>
            <p className="mt-2 text-sm text-foreground">
              Suggested last caffeine:{' '}
              <span className="font-semibold">~{formatClock(cutoffMin)}</span>
            </p>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-border bg-background p-4 md:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold text-foreground">Trends</h3>
          <div className="inline-flex rounded-xl border border-border p-0.5">
            <button
              type="button"
              onClick={() => setChartRange('week')}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                chartRange === 'week'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              This week
            </button>
            <button
              type="button"
              onClick={() => setChartRange('month')}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                chartRange === 'month'
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              This month
            </button>
          </div>
        </div>
        <BarChart points={chartPoints} goal={dailyGoal} height={chartRange === 'month' ? 160 : 140} />
        {cutting && (
          <div className="mt-4 rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Cutting caffeine tip</p>
            <p className="mt-1">
              Drop ~25–50 mg every few days instead of quitting cold turkey — fewer headaches. Swap
              one regular cup for half-caf or tea, protect your bedtime cutoff, and watch the week
              average fall (not just one perfect day).
            </p>
          </div>
        )}
      </section>

      <p className="mt-5 text-sm text-muted-foreground">
        Related:{' '}
        <Link href="/tools/caffeine-calculator" className="font-medium text-accent hover:underline">
          caffeine calculator
        </Link>
        {' · '}
        <Link
          href="/tools/caffeine-half-life-calculator"
          className="font-medium text-accent hover:underline"
        >
          half-life timeline
        </Link>
        {' · '}
        <Link href="/coffee-beans/coffee-and-anxiety" className="font-medium text-accent hover:underline">
          coffee and anxiety
        </Link>
        {' · '}
        <Link
          href="/coffee-beans/how-much-coffee-is-too-much"
          className="font-medium text-accent hover:underline"
        >
          how much is too much
        </Link>
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Logs stay in this browser only (local storage) — nothing is uploaded. Educational tracker,
        not medical advice. If you have sleep issues, anxiety, pregnancy, or take medications, ask a
        clinician about caffeine.
      </p>
    </div>
  )
}
