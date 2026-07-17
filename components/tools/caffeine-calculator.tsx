'use client'

import { useMemo, useState } from 'react'

const DRINKS = [
  { id: 'brewed', label: 'Brewed coffee (8 oz)', mg: 95 },
  { id: 'espresso', label: 'Espresso (1 shot)', mg: 63 },
  { id: 'double', label: 'Double espresso', mg: 126 },
  { id: 'coldbrew', label: 'Cold brew (8 oz)', mg: 155 },
  { id: 'drip-large', label: 'Large drip (16 oz)', mg: 190 },
  { id: 'instant', label: 'Instant coffee (8 oz)', mg: 62 },
  { id: 'decaf', label: 'Decaf (8 oz)', mg: 3 },
] as const

const SAFE_LIMIT = 400
/** Rough adult guideline often cited alongside body-weight discussions (~3 mg/kg). */
const MG_PER_KG = 3

function round(n: number, d = 1) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function CaffeineCalculator() {
  const [mode, setMode] = useState<'intake' | 'from-mg' | 'by-weight'>('intake')
  const [drinkId, setDrinkId] = useState<(typeof DRINKS)[number]['id']>('brewed')
  const [servings, setServings] = useState(2)
  const [targetMg, setTargetMg] = useState(155)
  const [weightKg, setWeightKg] = useState(70)

  const drink = DRINKS.find((d) => d.id === drinkId)!
  const total = drink.mg * servings
  const pct = Math.min(100, (total / SAFE_LIMIT) * 100)
  const over = total > SAFE_LIMIT

  const fromMg = useMemo(() => {
    return DRINKS.map((d) => ({
      ...d,
      cups: d.mg > 0 ? targetMg / d.mg : 0,
    }))
  }, [targetMg])

  const weightLimit = round(weightKg * MG_PER_KG, 0)
  const weightCups = weightLimit / 95

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="mb-5 flex flex-wrap gap-2">
        {(
          [
            { id: 'intake', label: 'Daily intake' },
            { id: 'from-mg', label: 'mg → cups' },
            { id: 'by-weight', label: 'By body weight' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id)}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === item.id
                ? 'border-accent bg-accent text-accent-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-accent/50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {mode === 'intake' && (
        <>
          <label htmlFor="drink" className="mb-2 block text-sm font-medium text-foreground">
            Drink
          </label>
          <select
            id="drink"
            value={drinkId}
            onChange={(e) => setDrinkId(e.target.value as typeof drinkId)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
          >
            {DRINKS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label} — {d.mg} mg
              </option>
            ))}
          </select>

          <div className="mt-5">
            <div className="mb-2 flex items-baseline justify-between">
              <label htmlFor="servings" className="text-sm font-medium text-foreground">
                Servings per day
              </label>
              <span className="text-sm font-semibold text-foreground">{servings}</span>
            </div>
            <input
              id="servings"
              type="range"
              min={1}
              max={8}
              step={1}
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <div className="mt-6 rounded-2xl bg-secondary p-6 text-center">
            <div className="text-sm text-muted-foreground">Estimated daily caffeine</div>
            <div className="mt-1 text-5xl font-semibold text-foreground">{total} mg</div>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-background">
              <div
                className={`h-full rounded-full transition-all ${over ? 'bg-destructive' : 'bg-accent'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {Math.round((total / SAFE_LIMIT) * 100)}% of the {SAFE_LIMIT} mg daily limit for most
              adults
            </div>
            {over && (
              <p className="mt-3 text-sm font-medium text-destructive">
                That is above the general 400 mg guideline — consider cutting back.
              </p>
            )}
          </div>
        </>
      )}

      {mode === 'from-mg' && (
        <>
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-1 flex items-baseline justify-between">
              <label className="text-sm font-medium text-foreground">Caffeine amount</label>
              <span className="text-xs text-muted-foreground">mg</span>
            </div>
            <input
              type="number"
              inputMode="decimal"
              min={1}
              value={targetMg}
              onChange={(e) => setTargetMg(Math.max(1, Number(e.target.value)))}
              className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {[130, 155, 190, 200, 400].map((mg) => (
                <button
                  key={mg}
                  type="button"
                  onClick={() => setTargetMg(mg)}
                  className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-accent/50"
                >
                  {mg} mg
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            How many cups is {targetMg} mg of caffeine?
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {fromMg.map((d) => (
              <div key={d.id} className="rounded-xl border border-border bg-secondary p-4">
                <div className="text-xs text-muted-foreground">{d.label}</div>
                <div className="mt-1 text-xl font-semibold text-foreground">
                  ≈ {round(d.cups, 1)} servings
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {mode === 'by-weight' && (
        <>
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-1 flex items-baseline justify-between">
              <label className="text-sm font-medium text-foreground">Body weight</label>
              <span className="text-xs text-muted-foreground">kg</span>
            </div>
            <input
              type="number"
              inputMode="decimal"
              min={30}
              max={200}
              value={weightKg}
              onChange={(e) => setWeightKg(Math.max(30, Number(e.target.value)))}
              className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Uses a rough ~{MG_PER_KG} mg per kg guideline some people use alongside the standard
              400 mg adult limit. Not medical advice.
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-secondary p-6 text-center">
            <div className="text-sm text-muted-foreground">Estimated personal daily ballpark</div>
            <div className="mt-1 text-5xl font-semibold text-foreground">{weightLimit} mg</div>
            <div className="mt-2 text-sm text-muted-foreground">
              About {round(weightCups, 1)} cups of brewed coffee (95 mg each). Cap at {SAFE_LIMIT}{' '}
              mg for most healthy adults unless a clinician says otherwise.
            </div>
          </div>
        </>
      )}
    </div>
  )
}
