'use client'

import { useState } from 'react'

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

export function CaffeineCalculator() {
  const [drinkId, setDrinkId] = useState<(typeof DRINKS)[number]['id']>('brewed')
  const [servings, setServings] = useState(2)

  const drink = DRINKS.find((d) => d.id === drinkId)!
  const total = drink.mg * servings
  const pct = Math.min(100, (total / SAFE_LIMIT) * 100)
  const over = total > SAFE_LIMIT

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
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

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Values are averages and vary by bean, roast, and brew strength. The 400 mg guideline applies
        to most healthy adults; pregnant people and those sensitive to caffeine should aim lower.
      </p>
    </div>
  )
}
