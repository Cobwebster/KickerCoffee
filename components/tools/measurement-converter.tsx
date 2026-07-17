'use client'

import { useState } from 'react'

// Approximate conversions for ground coffee.
const GRAMS_PER_TBSP = 5.3
const GRAMS_PER_SCOOP = 10 // 1 scoop ≈ 2 tbsp
const GRAMS_PER_TSP = GRAMS_PER_TBSP / 3

const UNITS = [
  { id: 'grams', label: 'Grams', perGram: 1 },
  { id: 'tbsp', label: 'Tablespoons', perGram: 1 / GRAMS_PER_TBSP },
  { id: 'scoop', label: 'Scoops', perGram: 1 / GRAMS_PER_SCOOP },
  { id: 'tsp', label: 'Teaspoons', perGram: 1 / GRAMS_PER_TSP },
] as const

function round(n: number, d = 1) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function MeasurementConverter() {
  const [amount, setAmount] = useState(20)
  const [unitId, setUnitId] = useState<(typeof UNITS)[number]['id']>('grams')

  const unit = UNITS.find((u) => u.id === unitId)!
  const grams = amount / unit.perGram

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="grid gap-4 sm:grid-cols-[1fr_1.2fr]">
        <div className="rounded-xl border border-border bg-background p-4">
          <label htmlFor="amount" className="mb-1 block text-sm font-medium text-foreground">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            inputMode="decimal"
            min={0}
            step={0.5}
            value={amount}
            onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
            className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
          />
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <label htmlFor="unit" className="mb-1 block text-sm font-medium text-foreground">
            Unit
          </label>
          <select
            id="unit"
            value={unitId}
            onChange={(e) => setUnitId(e.target.value as typeof unitId)}
            className="w-full bg-transparent text-lg font-medium text-foreground outline-none"
          >
            {UNITS.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {[
          { amount: 20, unit: 'grams' as const, label: '20 g' },
          { amount: 1, unit: 'tbsp' as const, label: '1 tbsp' },
          { amount: 1, unit: 'scoop' as const, label: '1 scoop' },
          { amount: 55, unit: 'grams' as const, label: '55 g' },
          { amount: 70, unit: 'grams' as const, label: '70 g' },
        ].map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              setAmount(preset.amount)
              setUnitId(preset.unit)
            }}
            className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-accent/50"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {UNITS.map((u) => {
          const converted = grams * u.perGram
          const isSource = u.id === unitId
          return (
            <div
              key={u.id}
              className={`rounded-xl border p-4 text-center ${
                isSource ? 'border-accent/60 bg-accent/5' : 'border-border bg-secondary'
              }`}
            >
              <div className="text-2xl font-semibold text-foreground">{round(converted)}</div>
              <div className="mt-1 text-xs text-muted-foreground">{u.label}</div>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Based on ground coffee: 1 tablespoon ≈ {GRAMS_PER_TBSP} g and 1 standard scoop ≈{' '}
        {GRAMS_PER_SCOOP} g (about 2 tablespoons). Volume varies with bean size, roast, and grind, so
        a scale is always the most accurate.
      </p>
    </div>
  )
}
