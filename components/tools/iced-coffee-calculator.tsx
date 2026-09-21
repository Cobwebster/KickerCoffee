'use client'

import { useState } from 'react'

const STYLES = [
  {
    id: 'japanese',
    label: 'Japanese iced (flash brew)',
    note: 'Hot brew directly onto ice — bright & aromatic',
    brewRatio: 10,
    icePercent: 0.4,
  },
  {
    id: 'cooled',
    label: 'Hot brew, then chill',
    note: 'Normal hot ratio, cool in fridge',
    brewRatio: 16,
    icePercent: 0,
  },
  {
    id: 'concentrate',
    label: 'Iced concentrate over ice',
    note: 'Strong hot brew diluted by melting ice',
    brewRatio: 12,
    icePercent: 0.35,
  },
] as const

const SIZES = [
  { id: '12oz', label: '12 oz glass', total: 355 },
  { id: '16oz', label: '16 oz glass', total: 473 },
  { id: '20oz', label: '20 oz tumbler', total: 591 },
] as const

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function IcedCoffeeCalculator() {
  const [styleId, setStyleId] = useState<(typeof STYLES)[number]['id']>('japanese')
  const [sizeId, setSizeId] = useState<(typeof SIZES)[number]['id']>('16oz')

  const style = STYLES.find((s) => s.id === styleId) ?? STYLES[0]
  const size = SIZES.find((s) => s.id === sizeId) ?? SIZES[1]
  const ice = round(size.total * style.icePercent)
  const brewWater =
    style.icePercent > 0 ? round(size.total - ice) : size.total
  const dose = round(size.total / style.brewRatio)

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              How to make iced coffee
            </label>
            <div className="grid gap-2">
              {STYLES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStyleId(item.id)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    styleId === item.id
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

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Glass size</label>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSizeId(item.id)}
                  className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                    sizeId === item.id
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
          <h2 className="font-serif text-xl font-semibold text-foreground">Your iced coffee recipe</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat label="Coffee" value={`${dose} g`} big />
            <Stat label="Hot brew water" value={`${brewWater} g`} />
            {ice > 0 && <Stat label="Ice in glass" value={`${ice} g`} />}
            <Stat label="Final drink" value={`≈ ${size.total} ml`} />
            <Stat label="Brew ratio" value={`1:${style.brewRatio}`} />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {style.id === 'japanese'
              ? 'Grind medium-fine. Bloom, then brew the hot water through grounds into a vessel packed with the ice above. Melting ice finishes the strength — bright and aromatic, not the same as overnight cold brew.'
              : style.id === 'cooled'
                ? 'Brew hot at a normal 1:16 ratio, then chill in the fridge. Cleaner than leftover hot coffee, mellower than flash brew.'
                : 'Brew a stronger hot concentrate, pour over ice, and let dilution finish the strength. Great base for iced lattes.'}
          </p>
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
