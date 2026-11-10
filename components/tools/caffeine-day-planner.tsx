'use client'

import { useEffect, useMemo, useState } from 'react'
import { Link } from '@/components/link'
import { Plus, Trash2, Moon, Coffee, AlertTriangle } from 'lucide-react'

const STORAGE_KEY = 'kicker-caffeine-day-v1'
const SAFE_LIMIT = 400
const DEFAULT_HALF_LIFE = 5.5
const DEFAULT_BEDTIME = 22 * 60 + 30 // 10:30 pm
const DEFAULT_THRESHOLD = 50

const DRINK_PRESETS = [
  { id: 'brewed', label: 'Brewed coffee (8 oz)', mg: 95 },
  { id: 'drip-large', label: 'Large drip (16 oz)', mg: 190 },
  { id: 'espresso', label: 'Espresso shot', mg: 63 },
  { id: 'double', label: 'Double espresso', mg: 126 },
  { id: 'iced-latte', label: 'Iced latte (2 shots)', mg: 126 },
  { id: 'coldbrew', label: 'Cold brew (8 oz)', mg: 155 },
  { id: 'shaken', label: 'Shaken espresso (2–3 shots)', mg: 170 },
  { id: 'americano', label: 'Americano (2 shots)', mg: 126 },
  { id: 'instant', label: 'Instant coffee (8 oz)', mg: 62 },
  { id: 'tea', label: 'Black tea', mg: 47 },
  { id: 'energy', label: 'Energy drink (~16 oz)', mg: 160 },
  { id: 'decaf', label: 'Decaf coffee (8 oz)', mg: 5 },
  { id: 'custom', label: 'Custom mg', mg: 0 },
] as const

type DrinkId = (typeof DRINK_PRESETS)[number]['id']

type LogEntry = {
  id: string
  drinkId: DrinkId
  label: string
  mg: number
  timeMin: number
}

type StoredState = {
  entries: LogEntry[]
  bedtimeMin: number
  halfLife: number
  threshold: number
}

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function formatTime(min: number) {
  const m = ((Math.round(min) % (24 * 60)) + 24 * 60) % (24 * 60)
  const h24 = Math.floor(m / 60)
  const mm = m % 60
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  const ampm = h24 < 12 ? 'am' : 'pm'
  return `${h12}:${mm.toString().padStart(2, '0')} ${ampm}`
}

function remainingAt(mg: number, hoursSince: number, halfLife: number) {
  if (hoursSince < 0 || mg <= 0) return 0
  return mg * 2 ** (-hoursSince / halfLife)
}

function totalAt(entries: LogEntry[], atMin: number, halfLife: number) {
  return entries.reduce((sum, e) => {
    const hours = (atMin - e.timeMin) / 60
    return sum + remainingAt(e.mg, hours, halfLife)
  }, 0)
}

function findCutoff(
  entries: LogEntry[],
  bedtimeMin: number,
  halfLife: number,
  threshold: number,
): number | null {
  if (entries.length === 0) return null
  const earliest = Math.min(...entries.map((e) => e.timeMin))
  // Latest time you can still drink (from the log) and be under threshold at bedtime
  let latestOk: number | null = null
  for (let t = earliest; t <= bedtimeMin; t += 15) {
    const subset = entries.filter((e) => e.timeMin <= t)
    if (totalAt(subset, bedtimeMin, halfLife) <= threshold) {
      latestOk = t
    }
  }
  return latestOk
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function CaffeineDayPlanner() {
  const [entries, setEntries] = useState<LogEntry[]>([
    {
      id: 'seed-1',
      drinkId: 'brewed',
      label: 'Brewed coffee (8 oz)',
      mg: 95,
      timeMin: 8 * 60,
    },
  ])
  const [bedtimeMin, setBedtimeMin] = useState(DEFAULT_BEDTIME)
  const [halfLife, setHalfLife] = useState(DEFAULT_HALF_LIFE)
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD)
  const [pickId, setPickId] = useState<DrinkId>('brewed')
  const [customMg, setCustomMg] = useState(100)
  const [addTimeMin, setAddTimeMin] = useState(12 * 60 + 30)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as StoredState
        if (Array.isArray(parsed.entries) && parsed.entries.length) {
          setEntries(parsed.entries)
        }
        if (typeof parsed.bedtimeMin === 'number') setBedtimeMin(parsed.bedtimeMin)
        if (typeof parsed.halfLife === 'number') setHalfLife(parsed.halfLife)
        if (typeof parsed.threshold === 'number') setThreshold(parsed.threshold)
      }
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const payload: StoredState = { entries, bedtimeMin, halfLife, threshold }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      /* ignore */
    }
  }, [entries, bedtimeMin, halfLife, threshold, hydrated])

  const totalIngested = useMemo(
    () => entries.reduce((s, e) => s + e.mg, 0),
    [entries],
  )

  const atBedtime = useMemo(
    () => round(totalAt(entries, bedtimeMin, halfLife), 0),
    [entries, bedtimeMin, halfLife],
  )

  const cutoff = useMemo(
    () => findCutoff(entries, bedtimeMin, halfLife, threshold),
    [entries, bedtimeMin, halfLife, threshold],
  )

  const curve = useMemo(() => {
    const start = entries.length
      ? Math.min(6 * 60, ...entries.map((e) => e.timeMin)) - 30
      : 6 * 60
    const end = bedtimeMin + 60
    const points: { min: number; mg: number }[] = []
    for (let t = start; t <= end; t += 30) {
      points.push({ min: t, mg: totalAt(entries, t, halfLife) })
    }
    return points
  }, [entries, bedtimeMin, halfLife])

  const maxCurve = Math.max(SAFE_LIMIT, ...curve.map((p) => p.mg), 1)

  function addDrink() {
    const preset = DRINK_PRESETS.find((d) => d.id === pickId)!
    const mg = pickId === 'custom' ? clamp(customMg, 1, 800) : preset.mg
    const label = pickId === 'custom' ? `Custom (${mg} mg)` : preset.label
    setEntries((prev) =>
      [...prev, { id: uid(), drinkId: pickId, label, mg, timeMin: addTimeMin }].sort(
        (a, b) => a.timeMin - b.timeMin,
      ),
    )
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  function clearDay() {
    setEntries([])
  }

  const overLimit = totalIngested > SAFE_LIMIT
  const bedtimeOk = atBedtime <= threshold
  const pctLimit = Math.min(100, (totalIngested / SAFE_LIMIT) * 100)

  const chartW = 320
  const chartH = 120
  const pad = 8
  const path = curve
    .map((p, i) => {
      const x =
        pad + ((p.min - curve[0].min) / Math.max(1, curve[curve.length - 1].min - curve[0].min)) * (chartW - pad * 2)
      const y = chartH - pad - (p.mg / maxCurve) * (chartH - pad * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  const bedtimeX =
    curve.length > 1
      ? pad +
        ((bedtimeMin - curve[0].min) / Math.max(1, curve[curve.length - 1].min - curve[0].min)) *
          (chartW - pad * 2)
      : pad

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">Caffeine day planner</p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-foreground md:text-2xl">
            Log drinks. See your evening.
          </h3>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Stack today’s coffees on a timeline. We estimate what is still in your system at bedtime
            and when you should stop for sleep.
          </p>
        </div>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={clearDay}
            className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            Clear day
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">Total ingested</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
            {totalIngested} <span className="text-base font-medium text-muted-foreground">mg</span>
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
            <div
              className={`h-full rounded-full ${overLimit ? 'bg-red-500' : 'bg-accent'}`}
              style={{ width: `${pctLimit}%` }}
            />
          </div>
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            vs ~{SAFE_LIMIT} mg adult guideline
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Moon className="size-3.5" aria-hidden="true" />
            Still left at {formatTime(bedtimeMin)}
          </p>
          <p
            className={`mt-1 font-serif text-2xl font-semibold ${
              bedtimeOk ? 'text-foreground' : 'text-amber-700 dark:text-amber-400'
            }`}
          >
            {atBedtime} <span className="text-base font-medium text-muted-foreground">mg</span>
          </p>
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            Target under {threshold} mg for sleep
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">Suggested caffeine cutoff</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
            {cutoff == null
              ? '—'
              : formatTime(cutoff)}
          </p>
          <p className="mt-1.5 text-[11px] text-muted-foreground">
            {entries.length === 0
              ? 'Add drinks to estimate'
              : cutoff == null
                ? 'Even early cups leave too much by bed — lower dose or earlier day'
                : `Based on today’s log + ${threshold} mg bedtime target`}
          </p>
        </div>
      </div>

      {(overLimit || !bedtimeOk) && entries.length > 0 && (
        <div className="mt-4 flex gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-sm text-foreground">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden="true" />
          <p>
            {overLimit && (
              <>
                You are over the common {SAFE_LIMIT} mg daily guide ({totalIngested} mg).{' '}
              </>
            )}
            {!bedtimeOk && (
              <>
                About {atBedtime} mg may still be circulating at {formatTime(bedtimeMin)} — earlier
                cutoff or a smaller last drink usually helps more than switching to decaf only at
                night.
              </>
            )}
          </p>
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background p-4">
        <div className="mb-3 flex items-baseline justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Estimated caffeine in your system
          </p>
          <p className="text-[11px] text-muted-foreground">Half-life {halfLife} h</p>
        </div>
        <svg
          viewBox={`0 0 ${chartW} ${chartH}`}
          className="h-auto w-full"
          role="img"
          aria-label="Caffeine remaining over the day"
        >
          <line
            x1={pad}
            x2={chartW - pad}
            y1={chartH - pad - (threshold / maxCurve) * (chartH - pad * 2)}
            y2={chartH - pad - (threshold / maxCurve) * (chartH - pad * 2)}
            stroke="currentColor"
            strokeOpacity={0.2}
            strokeDasharray="4 4"
          />
          <line
            x1={bedtimeX}
            x2={bedtimeX}
            y1={pad}
            y2={chartH - pad}
            stroke="currentColor"
            strokeOpacity={0.25}
          />
          <path d={path} fill="none" stroke="var(--accent)" strokeWidth={2.5} strokeLinecap="round" />
          {entries.map((e) => {
            const x =
              curve.length > 1
                ? pad +
                  ((e.timeMin - curve[0].min) /
                    Math.max(1, curve[curve.length - 1].min - curve[0].min)) *
                    (chartW - pad * 2)
                : pad
            return (
              <circle
                key={e.id}
                cx={x}
                cy={chartH - pad - (totalAt(entries, e.timeMin, halfLife) / maxCurve) * (chartH - pad * 2)}
                r={3.5}
                fill="var(--accent)"
              />
            )
          })}
        </svg>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>{curve[0] ? formatTime(curve[0].min) : ''}</span>
          <span>Bed {formatTime(bedtimeMin)}</span>
          <span>{curve[curve.length - 1] ? formatTime(curve[curve.length - 1].min) : ''}</span>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-background p-4">
        <p className="mb-3 text-sm font-medium text-foreground">Add a drink</p>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted-foreground">Drink</span>
            <select
              value={pickId}
              onChange={(e) => setPickId(e.target.value as DrinkId)}
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground outline-none focus:border-accent"
            >
              {DRINK_PRESETS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.id === 'custom' ? d.label : `${d.label} — ${d.mg} mg`}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted-foreground">Time</span>
            <input
              type="time"
              value={`${Math.floor(addTimeMin / 60)
                .toString()
                .padStart(2, '0')}:${(addTimeMin % 60).toString().padStart(2, '0')}`}
              onChange={(e) => {
                const [h, m] = e.target.value.split(':').map(Number)
                if (Number.isFinite(h) && Number.isFinite(m)) setAddTimeMin(h * 60 + m)
              }}
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground outline-none focus:border-accent"
            />
          </label>
          <div className="flex items-end">
            <button
              type="button"
              onClick={addDrink}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 sm:w-auto"
            >
              <Plus className="size-4" />
              Add
            </button>
          </div>
        </div>
        {pickId === 'custom' && (
          <label className="mt-3 block">
            <span className="mb-1.5 block text-xs text-muted-foreground">Custom caffeine (mg)</span>
            <input
              type="number"
              min={1}
              max={800}
              value={customMg}
              onChange={(e) => setCustomMg(clamp(Number(e.target.value) || 0, 1, 800))}
              className="w-full max-w-[200px] rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-medium text-foreground outline-none focus:border-accent"
            />
          </label>
        )}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {(['brewed', 'double', 'coldbrew', 'iced-latte', 'shaken'] as DrinkId[]).map((id) => {
            const d = DRINK_PRESETS.find((x) => x.id === id)!
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setPickId(id)
                  setEntries((prev) =>
                    [
                      ...prev,
                      {
                        id: uid(),
                        drinkId: id,
                        label: d.label,
                        mg: d.mg,
                        timeMin: addTimeMin,
                      },
                    ].sort((a, b) => a.timeMin - b.timeMin),
                  )
                }}
                className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
              >
                + {d.label.split('(')[0].trim()}
              </button>
            )
          })}
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2">
        {entries.length === 0 && (
          <li className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground">
            No drinks yet — add your morning coffee to start the curve.
          </li>
        )}
        {entries.map((e) => (
          <li
            key={e.id}
            className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5"
          >
            <Coffee className="size-4 shrink-0 text-accent" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{e.label}</p>
              <p className="text-xs text-muted-foreground">
                {formatTime(e.timeMin)} · {e.mg} mg
              </p>
            </div>
            <input
              type="time"
              aria-label={`Time for ${e.label}`}
              value={`${Math.floor(e.timeMin / 60)
                .toString()
                .padStart(2, '0')}:${(e.timeMin % 60).toString().padStart(2, '0')}`}
              onChange={(ev) => {
                const [h, m] = ev.target.value.split(':').map(Number)
                if (!Number.isFinite(h) || !Number.isFinite(m)) return
                setEntries((prev) =>
                  prev
                    .map((x) => (x.id === e.id ? { ...x, timeMin: h * 60 + m } : x))
                    .sort((a, b) => a.timeMin - b.timeMin),
                )
              }}
              className="rounded-lg border border-border bg-card px-2 py-1.5 text-xs text-foreground outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={() => removeEntry(e.id)}
              className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label={`Remove ${e.label}`}
            >
              <Trash2 className="size-4" />
            </button>
          </li>
        ))}
      </ul>

      <details className="mt-6 rounded-xl border border-border bg-background px-4 py-3">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          Sleep settings
        </summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 block text-xs text-muted-foreground">Bedtime</span>
            <input
              type="time"
              value={`${Math.floor(bedtimeMin / 60)
                .toString()
                .padStart(2, '0')}:${(bedtimeMin % 60).toString().padStart(2, '0')}`}
              onChange={(e) => {
                const [h, m] = e.target.value.split(':').map(Number)
                if (Number.isFinite(h) && Number.isFinite(m)) setBedtimeMin(h * 60 + m)
              }}
              className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
              <span>Half-life</span>
              <span>{halfLife} h</span>
            </div>
            <input
              type="range"
              min={3}
              max={10}
              step={0.5}
              value={halfLife}
              onChange={(e) => setHalfLife(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </label>
          <label className="block">
            <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
              <span>Bedtime target</span>
              <span>≤ {threshold} mg</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              step={5}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Estimates only — genetics, pregnancy, and medications change clearance. Not medical advice.
          Saved in this browser so you can reopen tomorrow.
        </p>
      </details>

      <p className="mt-4 text-xs text-muted-foreground">
        Also useful:{' '}
        <Link href="/tools/caffeine-calculator" className="font-medium text-accent hover:underline">
          caffeine mg calculator
        </Link>
        {' · '}
        <Link
          href="/tools/caffeine-half-life-calculator"
          className="font-medium text-accent hover:underline"
        >
          single-dose half-life
        </Link>
        {' · '}
        <Link
          href="/coffee-beans/how-much-coffee-is-too-much"
          className="font-medium text-accent hover:underline"
        >
          how much is too much
        </Link>
      </p>
    </div>
  )
}
