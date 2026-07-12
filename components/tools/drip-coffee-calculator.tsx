'use client'

import { useState } from 'react'

const OUNCES_TO_ML = 29.5735
const MACHINE_CUP_ML = 5 * OUNCES_TO_ML
const MUG_ML = 8 * OUNCES_TO_ML
const GRAMS_PER_TBSP = 5.3
const GRAMS_PER_SCOOP = 10

const STRENGTHS = [
  { id: 'light', label: 'Light', ratio: 17.5 },
  { id: 'standard', label: 'Standard', ratio: 16.5 },
  { id: 'strong', label: 'Strong', ratio: 15.5 },
] as const

const PRESETS = [4, 8, 10, 12]

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function DripCoffeeCalculator() {
  const [servingType, setServingType] = useState<'machine-cups' | 'mugs'>('machine-cups')
  const [cups, setCups] = useState(8)
  const [strengthId, setStrengthId] = useState<(typeof STRENGTHS)[number]['id']>('standard')

  const strength = STRENGTHS.find((item) => item.id === strengthId) ?? STRENGTHS[1]
  const mlPerCup = servingType === 'machine-cups' ? MACHINE_CUP_ML : MUG_ML
  const water = cups * mlPerCup
  const coffee = water / strength.ratio
  const tbsp = coffee / GRAMS_PER_TBSP
  const scoops = coffee / GRAMS_PER_SCOOP

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Serving style</label>
            <div className="flex flex-wrap gap-2">
              <ToggleButton
                active={servingType === 'machine-cups'}
                onClick={() => setServingType('machine-cups')}
                label="Coffee maker cups"
                note="5 oz each"
              />
              <ToggleButton
                active={servingType === 'mugs'}
                onClick={() => setServingType('mugs')}
                label="Full mugs"
                note="8 oz each"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Batch size</label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setCups(preset)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                    cups === preset
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-accent/50'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-border bg-background p-4">
              <div className="mb-1 flex items-baseline justify-between">
                <label className="text-sm font-medium text-foreground">Cups</label>
                <span className="text-xs text-muted-foreground">
                  {servingType === 'machine-cups' ? '5 oz machine cups' : '8 oz mugs'}
                </span>
              </div>
              <input
                type="number"
                inputMode="decimal"
                min={1}
                step={1}
                value={cups}
                onChange={(e) => setCups(Math.max(1, Number(e.target.value)))}
                className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Strength ({strength.label.toLowerCase()} · 1:{strength.ratio})
            </label>
            <div className="flex flex-wrap gap-2">
              {STRENGTHS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStrengthId(item.id)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                    strengthId === item.id
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-accent/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
          <h2 className="font-serif text-xl font-semibold text-foreground">Your drip recipe</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <ResultCard label="Coffee" value={`${round(coffee, 1)} g`} />
            <ResultCard label="Water" value={`${round(water)} ml`} />
            <ResultCard label="Tablespoons" value={`≈ ${round(tbsp, 1)}`} />
            <ResultCard label="Scoops" value={`≈ ${round(scoops, 1)}`} />
          </div>
          <div className="mt-4 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground">
            This batch equals about <span className="font-semibold text-foreground">{round(water / 1000, 2)} L</span> of water and is sized for{' '}
            <span className="font-semibold text-foreground">{round(cups)}</span>{' '}
            {servingType === 'machine-cups' ? 'coffee maker cups' : 'mugs'}.
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Most drip machines count one cup as 5 oz, not a full 8 oz mug. Tablespoons and scoops are approximate because coffee density changes with roast and grind. Use the gram value whenever possible.
      </p>
    </div>
  )
}

function ToggleButton({
  active,
  onClick,
  label,
  note,
}: {
  active: boolean
  onClick: () => void
  label: string
  note: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-left transition-colors ${
        active
          ? 'border-accent bg-accent text-accent-foreground'
          : 'border-border bg-background hover:border-accent/50'
      }`}
    >
      <span className="block text-sm font-medium">{label}</span>
      <span className={`block text-xs ${active ? 'opacity-80' : 'text-muted-foreground'}`}>{note}</span>
    </button>
  )
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold text-foreground">{value}</div>
    </div>
  )
}
