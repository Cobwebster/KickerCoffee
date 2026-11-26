'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/components/link'
import { Plus, Trash2 } from 'lucide-react'

const HALF_LIFE_HOURS = 5.5

const DOSE_PRESETS = [
  { id: 'brewed', label: 'Brewed coffee (8 oz)', mg: 95 },
  { id: 'large', label: 'Large drip (16 oz)', mg: 190 },
  { id: 'espresso', label: 'Espresso shot', mg: 63 },
  { id: 'double', label: 'Double espresso', mg: 126 },
  { id: 'coldbrew', label: 'Cold brew (8 oz)', mg: 155 },
  { id: 'custom', label: 'Custom mg', mg: 0 },
] as const

type Dose = { id: string; label: string; mg: number; timeMin: number }

function remainingAt(mg: number, hours: number, halfLife: number) {
  if (hours < 0 || mg <= 0) return 0
  return mg * 2 ** (-hours / halfLife)
}

function hoursUntil(mg: number, target: number, halfLife: number) {
  if (mg <= 0 || target <= 0 || target >= mg) return 0
  return halfLife * Math.log2(mg / target)
}

function round(n: number, d = 1) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

function formatClock(min: number) {
  const m = ((Math.round(min) % (24 * 60)) + 24 * 60) % (24 * 60)
  const h24 = Math.floor(m / 60)
  const mm = m % 60
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  const ampm = h24 < 12 ? 'am' : 'pm'
  return `${h12}:${mm.toString().padStart(2, '0')} ${ampm}`
}

function minutesBetween(fromMin: number, toMin: number) {
  let diff = toMin - fromMin
  if (diff < 0) diff += 24 * 60
  return diff
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function CaffeineHalfLifeCalculator() {
  const [mode, setMode] = useState<'hours' | 'clock'>('clock')
  const [presetId, setPresetId] = useState<(typeof DOSE_PRESETS)[number]['id']>('brewed')
  const [customMg, setCustomMg] = useState(200)
  const [hoursAgo, setHoursAgo] = useState(3)
  const [drinkTimeMin, setDrinkTimeMin] = useState(14 * 60) // 2pm
  const [bedTimeMin, setBedTimeMin] = useState(23 * 60) // 11pm
  const [halfLife, setHalfLife] = useState(HALF_LIFE_HOURS)
  const [stack, setStack] = useState<Dose[]>([])

  const primaryMg =
    presetId === 'custom'
      ? customMg
      : DOSE_PRESETS.find((p) => p.id === presetId)!.mg

  const primaryLabel =
    presetId === 'custom'
      ? `Custom (${primaryMg} mg)`
      : DOSE_PRESETS.find((p) => p.id === presetId)!.label

  const hoursSincePrimary =
    mode === 'hours'
      ? hoursAgo
      : minutesBetween(drinkTimeMin, (() => {
          const now = new Date()
          return now.getHours() * 60 + now.getMinutes()
        })()) / 60

  const allDoses: Dose[] = useMemo(() => {
    const primary: Dose = {
      id: 'primary',
      label: primaryLabel,
      mg: primaryMg,
      timeMin: mode === 'clock' ? drinkTimeMin : 0,
    }
    return [primary, ...stack]
  }, [mode, drinkTimeMin, primaryLabel, primaryMg, stack])

  const nowLeft = useMemo(() => {
    if (mode === 'hours' && stack.length === 0) {
      return remainingAt(primaryMg, hoursAgo, halfLife)
    }
    const now = new Date()
    const nowMin = mode === 'clock' ? now.getHours() * 60 + now.getMinutes() : hoursAgo * 60
    return allDoses.reduce((sum, d) => {
      const hours =
        mode === 'hours' && d.id === 'primary'
          ? hoursAgo
          : minutesBetween(d.timeMin, nowMin) / 60
      return sum + remainingAt(d.mg, hours, halfLife)
    }, 0)
  }, [allDoses, halfLife, hoursAgo, mode, primaryMg])

  const atBed =
    mode === 'clock'
      ? allDoses.reduce((sum, d) => {
          const hours = minutesBetween(d.timeMin, bedTimeMin) / 60
          return sum + remainingAt(d.mg, hours, halfLife)
        }, 0)
      : remainingAt(primaryMg, hoursAgo + minutesBetween(0, bedTimeMin) / 60, halfLife)

  const to50 = Math.max(0, hoursUntil(primaryMg, primaryMg * 0.5, halfLife) - hoursSincePrimary)
  const to25 = Math.max(0, hoursUntil(primaryMg, primaryMg * 0.25, halfLife) - hoursSincePrimary)
  const to10 = Math.max(0, hoursUntil(primaryMg, primaryMg * 0.1, halfLife) - hoursSincePrimary)

  const timeline = useMemo(() => {
    return [0, 1, 2, 3, 4, 5, 6, 8, 10, 12].map((h) => {
      if (mode === 'hours' && stack.length === 0) {
        return { h, mg: round(remainingAt(primaryMg, hoursAgo + h, halfLife), 0) }
      }
      const now = new Date()
      const baseMin =
        mode === 'clock' ? now.getHours() * 60 + now.getMinutes() : Math.round(hoursAgo * 60)
      const atMin = baseMin + h * 60
      const mg = allDoses.reduce((sum, d) => {
        const hours = minutesBetween(d.timeMin, atMin) / 60
        return sum + remainingAt(d.mg, hours, halfLife)
      }, 0)
      return { h, mg: round(mg, 0) }
    })
  }, [allDoses, halfLife, hoursAgo, mode, primaryMg, stack.length])

  function addStackDose() {
    const preset = DOSE_PRESETS.find((p) => p.id === presetId)!
    const mg = presetId === 'custom' ? customMg : preset.mg
    const label = presetId === 'custom' ? `Custom (${mg} mg)` : preset.label
    const timeMin = mode === 'clock' ? drinkTimeMin : Math.round((hoursAgo + 2) * 60)
    setStack((prev) =>
      [...prev, { id: uid(), label, mg, timeMin }].sort((a, b) => a.timeMin - b.timeMin),
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="mb-5 flex flex-wrap gap-2">
        {(
          [
            { id: 'clock', label: 'Clock time' },
            { id: 'hours', label: 'Hours since' },
          ] as const
        ).map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === m.id
                ? 'border-accent bg-accent text-accent-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-accent/50'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <label htmlFor="hl-dose" className="mb-2 block text-sm font-medium text-foreground">
        Starting dose
      </label>
      <select
        id="hl-dose"
        value={presetId}
        onChange={(e) => setPresetId(e.target.value as typeof presetId)}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
      >
        {DOSE_PRESETS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.id === 'custom' ? p.label : `${p.label} — ${p.mg} mg`}
          </option>
        ))}
      </select>

      {presetId === 'custom' && (
        <div className="mt-4">
          <label htmlFor="hl-custom" className="mb-2 block text-sm font-medium text-foreground">
            Caffeine (mg)
          </label>
          <input
            id="hl-custom"
            type="number"
            min={1}
            max={800}
            value={customMg}
            onChange={(e) => setCustomMg(Math.max(1, Number(e.target.value)))}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
          />
        </div>
      )}

      {mode === 'hours' ? (
        <div className="mt-5">
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="hl-ago" className="text-sm font-medium text-foreground">
              Hours since you drank it
            </label>
            <span className="text-sm font-semibold text-foreground">{hoursAgo} h</span>
          </div>
          <input
            id="hl-ago"
            type="range"
            min={0}
            max={12}
            step={0.5}
            value={hoursAgo}
            onChange={(e) => setHoursAgo(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">I drank at</span>
            <input
              type="time"
              value={`${Math.floor(drinkTimeMin / 60)
                .toString()
                .padStart(2, '0')}:${(drinkTimeMin % 60).toString().padStart(2, '0')}`}
              onChange={(e) => {
                const [h, m] = e.target.value.split(':').map(Number)
                if (Number.isFinite(h) && Number.isFinite(m)) setDrinkTimeMin(h * 60 + m)
              }}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-foreground">Bedtime</span>
            <input
              type="time"
              value={`${Math.floor(bedTimeMin / 60)
                .toString()
                .padStart(2, '0')}:${(bedTimeMin % 60).toString().padStart(2, '0')}`}
              onChange={(e) => {
                const [h, m] = e.target.value.split(':').map(Number)
                if (Number.isFinite(h) && Number.isFinite(m)) setBedTimeMin(h * 60 + m)
              }}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
            />
          </label>
        </div>
      )}

      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <label htmlFor="hl-half" className="text-sm font-medium text-foreground">
            Assumed half-life
          </label>
          <span className="text-sm font-semibold text-foreground">{halfLife} h</span>
        </div>
        <input
          id="hl-half"
          type="range"
          min={3}
          max={10}
          step={0.5}
          value={halfLife}
          onChange={(e) => setHalfLife(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Many adults land near 5–6 hours. Pregnancy often slows clearance (longer half-life). Smoking
          can speed it up. Genetics and some medications also matter — not medical advice.
        </p>
      </div>

      <div className="mt-5 rounded-xl border border-border bg-background p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-foreground">Optional extra doses</p>
          <button
            type="button"
            onClick={addStackDose}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:border-accent"
          >
            <Plus className="size-3.5" />
            Add another drink
          </button>
        </div>
        {stack.length === 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Single-dose by default. Stack a second coffee if you drank more than once.
          </p>
        ) : (
          <ul className="mt-3 flex flex-col gap-2">
            {stack.map((d) => (
              <li
                key={d.id}
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
              >
                <span className="min-w-0 flex-1 truncate text-foreground">
                  {d.label} · {d.mg} mg
                  {mode === 'clock' ? ` · ${formatClock(d.timeMin)}` : ''}
                </span>
                {mode === 'clock' && (
                  <input
                    type="time"
                    value={`${Math.floor(d.timeMin / 60)
                      .toString()
                      .padStart(2, '0')}:${(d.timeMin % 60).toString().padStart(2, '0')}`}
                    onChange={(e) => {
                      const [h, m] = e.target.value.split(':').map(Number)
                      if (!Number.isFinite(h) || !Number.isFinite(m)) return
                      setStack((prev) =>
                        prev
                          .map((x) => (x.id === d.id ? { ...x, timeMin: h * 60 + m } : x))
                          .sort((a, b) => a.timeMin - b.timeMin),
                      )
                    }}
                    className="rounded-lg border border-border bg-card px-2 py-1 text-xs"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setStack((prev) => prev.filter((x) => x.id !== d.id))}
                  className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Remove dose"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-background p-4">
        <p className="text-sm text-muted-foreground">Estimated caffeine still in your system now</p>
        <p className="mt-1 font-serif text-3xl font-semibold text-foreground">
          {round(nowLeft, 0)} mg
        </p>
        {mode === 'clock' && (
          <p className="mt-2 text-sm text-muted-foreground">
            At bedtime ({formatClock(bedTimeMin)}): ~{round(atBed, 0)} mg left from this stack
          </p>
        )}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-3">
          <p className="text-xs text-muted-foreground">Until ~50% of primary left</p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {to50 <= 0 ? 'Already there' : `${round(to50, 1)} h`}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-3">
          <p className="text-xs text-muted-foreground">Until ~25% left</p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {to25 <= 0 ? 'Already there' : `${round(to25, 1)} h`}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-3">
          <p className="text-xs text-muted-foreground">Until ~10% left</p>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {to10 <= 0 ? 'Already there' : `${round(to10, 1)} h`}
          </p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[240px] text-left text-sm">
          <caption className="border-b border-border bg-background px-4 py-2 text-left text-xs text-muted-foreground">
            Rough remaining caffeine from now (all doses stacked)
          </caption>
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="px-4 py-2 font-medium">Hours from now</th>
              <th className="px-4 py-2 font-medium">Approx left</th>
            </tr>
          </thead>
          <tbody>
            {timeline.map((row) => (
              <tr key={row.h} className="border-b border-border last:border-0">
                <td className="px-4 py-2 text-foreground">+{row.h} h</td>
                <td className="px-4 py-2 font-medium text-foreground">{row.mg} mg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Educational estimate only — not a medical test. For a calendar log, cut-down goals, and
        weekly trends, use the{' '}
        <Link href="/tools/caffeine-day-planner" className="font-medium text-accent hover:underline">
          caffeine tracker
        </Link>
        .
      </p>
    </div>
  )
}
