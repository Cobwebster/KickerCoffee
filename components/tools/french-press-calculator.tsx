'use client'

import { useState } from 'react'

const GRAMS_PER_TBSP = 5.3

/** Common French press sizes (usable brew volume, not max fill). */
const PRESS_SIZES = [
  { id: '3-cup', label: '3-cup', water: 350, note: '~12 oz' },
  { id: '4-cup', label: '4-cup', water: 500, note: '~17 oz' },
  { id: '8-cup', label: '8-cup', water: 1000, note: '~34 oz' },
  { id: '12-cup', label: '12-cup', water: 1500, note: '~51 oz' },
] as const

const STRENGTHS = [
  { id: 'mild', label: 'Mild', ratio: 16, note: 'Lighter body' },
  { id: 'classic', label: 'Classic', ratio: 15, note: 'Best starting point' },
  { id: 'strong', label: 'Strong', ratio: 14, note: 'Bold & rich' },
] as const

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function FrenchPressCalculator() {
  const [sizeId, setSizeId] = useState<(typeof PRESS_SIZES)[number]['id']>('8-cup')
  const [strengthId, setStrengthId] = useState<(typeof STRENGTHS)[number]['id']>('classic')
  const [customWater, setCustomWater] = useState<number | null>(null)

  const size = PRESS_SIZES.find((s) => s.id === sizeId) ?? PRESS_SIZES[2]
  const strength = STRENGTHS.find((s) => s.id === strengthId) ?? STRENGTHS[1]
  const water = customWater ?? size.water
  const coffee = water / strength.ratio
  const tbsp = coffee / GRAMS_PER_TBSP
  const mugs = water / 250

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              French press size
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {PRESS_SIZES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSizeId(item.id)
                    setCustomWater(null)
                  }}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    sizeId === item.id && customWater === null
                      ? 'border-accent bg-accent/10'
                      : 'border-border bg-background hover:border-accent/50'
                  }`}
                >
                  <div className="font-semibold text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.note}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-1 flex items-baseline justify-between">
              <label className="text-sm font-medium text-foreground">Water</label>
              <span className="text-xs text-muted-foreground">g / ml</span>
            </div>
            <input
              type="number"
              inputMode="decimal"
              min={100}
              step={10}
              value={round(water)}
              onChange={(e) => setCustomWater(Math.max(100, Number(e.target.value)))}
              className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Leave ~2 cm of headroom under the lid so grounds can bloom.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Strength ({strength.label.toLowerCase()} · 1:{strength.ratio})
            </label>
            <div className="grid gap-2 sm:grid-cols-3">
              {STRENGTHS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStrengthId(item.id)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    strengthId === item.id
                      ? 'border-accent bg-accent/10'
                      : 'border-border bg-background hover:border-accent/50'
                  }`}
                >
                  <div className="font-semibold text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">
                    1:{item.ratio} · {item.note}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Your French press recipe
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat label="Coffee (coarse)" value={`${round(coffee)} g`} big />
            <Stat label="Water" value={`${round(water)} g`} />
            <Stat label="Tablespoons" value={`≈ ${round(tbsp, 1)}`} />
            <Stat label="Approx mugs" value={`≈ ${round(mugs, 1)}`} />
          </div>

          <div className="mt-5 space-y-2 border-t border-border/60 pt-4 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Grind:</span> coarse (like sea salt)
            </p>
            <p>
              <span className="font-medium text-foreground">Steep:</span> 4 minutes
            </p>
            <p>
              <span className="font-medium text-foreground">Water temp:</span> ~93–96°C (200–205°F)
            </p>
            <p>
              <span className="font-medium text-foreground">Finish:</span> press slowly, then
              decant immediately
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        big ? 'border-accent/60 bg-accent/10' : 'border-border bg-background/80'
      }`}
    >
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-semibold text-foreground">{value}</div>
    </div>
  )
}
