'use client'

import { useMemo, useState } from 'react'

const HALF_LIFE_HOURS = 5.5

const DOSE_PRESETS = [
  { id: 'brewed', label: 'Brewed coffee (8 oz)', mg: 95 },
  { id: 'large', label: 'Large drip (16 oz)', mg: 190 },
  { id: 'espresso', label: 'Espresso shot', mg: 63 },
  { id: 'double', label: 'Double espresso', mg: 126 },
  { id: 'coldbrew', label: 'Cold brew (8 oz)', mg: 155 },
  { id: 'custom', label: 'Custom mg', mg: 0 },
] as const

function remainingAt(mg: number, hours: number, halfLife: number) {
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

export function CaffeineHalfLifeCalculator() {
  const [presetId, setPresetId] = useState<(typeof DOSE_PRESETS)[number]['id']>('brewed')
  const [customMg, setCustomMg] = useState(200)
  const [hoursAgo, setHoursAgo] = useState(3)
  const [halfLife, setHalfLife] = useState(HALF_LIFE_HOURS)

  const doseMg =
    presetId === 'custom'
      ? customMg
      : DOSE_PRESETS.find((p) => p.id === presetId)!.mg

  const nowLeft = remainingAt(doseMg, hoursAgo, halfLife)
  const to50 = Math.max(0, hoursUntil(doseMg, doseMg * 0.5, halfLife) - hoursAgo)
  const to25 = Math.max(0, hoursUntil(doseMg, doseMg * 0.25, halfLife) - hoursAgo)
  const to10 = Math.max(0, hoursUntil(doseMg, doseMg * 0.1, halfLife) - hoursAgo)

  const timeline = useMemo(() => {
    return [0, 1, 2, 3, 4, 5, 6, 8, 10, 12].map((h) => ({
      h,
      mg: round(remainingAt(doseMg, hoursAgo + h, halfLife), 0),
    }))
  }, [doseMg, hoursAgo, halfLife])

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
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
          Many adults land near 5–6 hours. Pregnancy, genetics, and some medications change this.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-background p-4">
        <p className="text-sm text-muted-foreground">Estimated caffeine still in your system</p>
        <p className="mt-1 font-serif text-3xl font-semibold text-foreground">
          {round(nowLeft, 0)} mg
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          of {doseMg} mg starting dose ({round((nowLeft / Math.max(doseMg, 1)) * 100, 0)}% left)
        </p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-3">
          <p className="text-xs text-muted-foreground">Until ~50% left</p>
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
            Rough remaining caffeine from now
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
        Educational estimate only — not a medical test. Feelings of alertness do not always match blood caffeine.
      </p>
    </div>
  )
}
