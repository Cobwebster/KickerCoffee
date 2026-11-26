'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/components/link'

/** Grams per level tablespoon */
const DENSITY = {
  ground: { tbsp: 5.3, label: 'Ground coffee' },
  bean: { tbsp: 4.5, label: 'Whole bean' },
} as const

const SCOOP_TBSP = 2 // standard scoop ≈ 2 tbsp

const HEAPING_FACTOR = 1.3 // rough heaping vs level

const TABLE_GRAMS = [10, 15, 16, 20, 30, 55, 70, 100]

function round(n: number, d = 1) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function MeasurementConverter() {
  const [amount, setAmount] = useState(20)
  const [unitId, setUnitId] = useState<'grams' | 'tbsp' | 'scoop' | 'tsp'>('grams')
  const [form, setForm] = useState<'ground' | 'bean'>('ground')
  const [scoopStyle, setScoopStyle] = useState<'level' | 'heaping'>('level')

  const gramsPerTbsp =
    DENSITY[form].tbsp * (scoopStyle === 'heaping' ? HEAPING_FACTOR : 1)
  const gramsPerScoop = gramsPerTbsp * SCOOP_TBSP
  const gramsPerTsp = gramsPerTbsp / 3

  const units = useMemo(
    () =>
      [
        { id: 'grams' as const, label: 'Grams', perGram: 1 },
        { id: 'tbsp' as const, label: 'Tablespoons', perGram: 1 / gramsPerTbsp },
        { id: 'scoop' as const, label: 'Scoops', perGram: 1 / gramsPerScoop },
        { id: 'tsp' as const, label: 'Teaspoons', perGram: 1 / gramsPerTsp },
      ] as const,
    [gramsPerScoop, gramsPerTbsp, gramsPerTsp],
  )

  const unit = units.find((u) => u.id === unitId)!
  const grams = amount / unit.perGram

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Coffee form (density)</p>
          <div className="flex flex-wrap gap-2">
            {(['ground', 'bean'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setForm(f)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  form === f
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-accent/50'
                }`}
              >
                {DENSITY[f].label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Scoop / spoon style</p>
          <div className="flex flex-wrap gap-2">
            {(['level', 'heaping'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setScoopStyle(s)}
                className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  scoopStyle === s
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-accent/50'
                }`}
              >
                {s === 'level' ? 'Level' : 'Heaping'}
              </button>
            ))}
          </div>
        </div>
      </div>

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
            {units.map((u) => (
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
        {units.map((u) => {
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
        Using {DENSITY[form].label.toLowerCase()}, {scoopStyle} measures: 1 tablespoon ≈{' '}
        {round(gramsPerTbsp)} g · 1 standard scoop (2 tbsp) ≈ {round(gramsPerScoop)} g. Whole beans
        pack lighter by volume than grounds; heaping scoops add ~30% in this estimate.
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[320px] text-left text-sm">
          <caption className="border-b border-border bg-background px-4 py-2 text-left text-xs text-muted-foreground">
            Conversion table — {DENSITY[form].label.toLowerCase()}, {scoopStyle} spoons (
            {round(gramsPerTbsp)} g/tbsp)
          </caption>
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="px-4 py-2 font-medium">Grams</th>
              <th className="px-4 py-2 font-medium">Tablespoons</th>
              <th className="px-4 py-2 font-medium">Scoops</th>
              <th className="px-4 py-2 font-medium">Teaspoons</th>
            </tr>
          </thead>
          <tbody>
            {TABLE_GRAMS.map((g) => (
              <tr key={g} className="border-b border-border last:border-0">
                <td className="px-4 py-2 font-medium text-foreground">{g} g</td>
                <td className="px-4 py-2 text-muted-foreground">
                  {round(g / gramsPerTbsp)} tbsp
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  {round(g / gramsPerScoop)} scoops
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  {round(g / gramsPerTsp)} tsp
                </td>
              </tr>
            ))}
            <tr className="border-b border-border bg-accent/5">
              <td className="px-4 py-2 font-medium text-foreground">
                {round(gramsPerTbsp)} g
              </td>
              <td className="px-4 py-2 text-foreground">1 tbsp</td>
              <td className="px-4 py-2 text-muted-foreground">
                {round(gramsPerTbsp / gramsPerScoop)} scoops
              </td>
              <td className="px-4 py-2 text-muted-foreground">3 tsp</td>
            </tr>
            <tr className="bg-accent/5">
              <td className="px-4 py-2 font-medium text-foreground">
                {round(gramsPerScoop)} g
              </td>
              <td className="px-4 py-2 text-muted-foreground">2 tbsp</td>
              <td className="px-4 py-2 text-foreground">1 scoop</td>
              <td className="px-4 py-2 text-muted-foreground">6 tsp</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-background p-4">
        <p className="text-sm font-medium text-foreground">Why scales beat scoops</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Roast level, grind size, and how hard you pack the spoon change volume. A “tablespoon” of
          light-roast whole beans can weigh ~4 g while the same spoon of fine dark grounds can push
          6+ g — a 50% dose swing that ruins recipes. Level vs heaping is another silent variable.
          A $10 scale locked to grams makes every calculator on this site actually repeatable. Need
          a brew dose?{' '}
          <Link href="/tools/coffee-ratio-calculator" className="font-medium text-accent hover:underline">
            Coffee ratio calculator
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
