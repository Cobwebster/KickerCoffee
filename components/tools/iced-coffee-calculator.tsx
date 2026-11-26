'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/components/link'

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
  {
    id: 'latte-concentrate',
    label: 'Iced latte from concentrate',
    note: 'Strong brew + ice + milk volume',
    brewRatio: 10,
    icePercent: 0.25,
  },
] as const

const SIZES = [
  { id: '12oz', label: '12 oz', total: 355 },
  { id: '16oz', label: '16 oz', total: 473 },
  { id: '20oz', label: '20 oz', total: 591 },
  { id: 'custom', label: 'Custom', total: 0 },
] as const

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

function mlToOz(ml: number) {
  return round(ml / 29.5735, 1)
}

function ozToMl(oz: number) {
  return round(oz * 29.5735)
}

export function IcedCoffeeCalculator() {
  const [styleId, setStyleId] = useState<(typeof STYLES)[number]['id']>('japanese')
  const [sizeId, setSizeId] = useState<(typeof SIZES)[number]['id']>('16oz')
  const [customUnit, setCustomUnit] = useState<'ml' | 'oz'>('ml')
  const [customMl, setCustomMl] = useState(473)
  const [milkMl, setMilkMl] = useState(120)

  const style = STYLES.find((s) => s.id === styleId) ?? STYLES[0]
  const isLatte = styleId === 'latte-concentrate'
  const glassTotal =
    sizeId === 'custom' ? Math.max(150, customMl) : (SIZES.find((s) => s.id === sizeId)?.total ?? 473)

  const { ice, brewWater, dose, coffeePortion } = useMemo(() => {
    if (isLatte) {
      const milk = Math.min(milkMl, glassTotal - 80)
      const remaining = Math.max(80, glassTotal - milk)
      const iceAmt = round(remaining * style.icePercent)
      const brew = round(remaining - iceAmt)
      const coffeeDose = round((brew + iceAmt) / style.brewRatio)
      return { ice: iceAmt, brewWater: brew, dose: coffeeDose, coffeePortion: brew + iceAmt }
    }
    const iceAmt = round(glassTotal * style.icePercent)
    const brew = style.icePercent > 0 ? round(glassTotal - iceAmt) : glassTotal
    const coffeeDose = round(glassTotal / style.brewRatio)
    return { ice: iceAmt, brewWater: brew, dose: coffeeDose, coffeePortion: glassTotal }
  }, [glassTotal, isLatte, milkMl, style.brewRatio, style.icePercent])

  const milkUsed = isLatte ? Math.min(milkMl, glassTotal - 80) : 0

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

            {sizeId === 'custom' && (
              <div className="mt-3 rounded-xl border border-border bg-background p-3">
                <div className="mb-2 flex gap-2">
                  {(['ml', 'oz'] as const).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setCustomUnit(u)}
                      className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${
                        customUnit === u
                          ? 'border-accent bg-accent/10 text-foreground'
                          : 'border-border text-muted-foreground'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min={customUnit === 'ml' ? 150 : 5}
                  step={customUnit === 'ml' ? 10 : 0.5}
                  value={customUnit === 'ml' ? customMl : mlToOz(customMl)}
                  onChange={(e) => {
                    const v = Number(e.target.value)
                    setCustomMl(customUnit === 'ml' ? Math.max(150, v) : ozToMl(Math.max(5, v)))
                  }}
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-base font-semibold text-foreground outline-none focus:border-accent"
                  aria-label={`Custom glass size in ${customUnit}`}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  {customMl} ml · {mlToOz(customMl)} oz
                </p>
              </div>
            )}
          </div>

          {isLatte && (
            <div className="rounded-xl border border-border bg-background p-4">
              <div className="mb-2 flex items-baseline justify-between">
                <label htmlFor="iced-milk" className="text-sm font-medium text-foreground">
                  Milk volume
                </label>
                <span className="text-sm font-semibold text-foreground">{milkUsed} ml</span>
              </div>
              <input
                id="iced-milk"
                type="range"
                min={40}
                max={Math.max(80, glassTotal - 100)}
                step={10}
                value={milkUsed}
                onChange={(e) => setMilkMl(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Coffee+ice portion ≈ {coffeePortion} ml, then milk fills the glass. Good base for an
                iced latte without guessing dilution.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
          <h2 className="font-serif text-xl font-semibold text-foreground">Your iced coffee recipe</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat label="Coffee" value={`${dose} g`} big />
            <Stat label="Hot brew water" value={`${brewWater} g`} />
            {ice > 0 && <Stat label="Ice in glass" value={`${ice} g`} />}
            {isLatte && <Stat label="Milk" value={`${milkUsed} ml`} />}
            <Stat label="Final drink" value={`≈ ${glassTotal} ml`} />
            <Stat label="Brew ratio" value={`1:${style.brewRatio}`} />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            {style.id === 'japanese'
              ? 'Grind medium-fine. Bloom, then brew the hot water through grounds into a vessel packed with the ice above. Melting ice finishes the strength — bright and aromatic, not overnight cold brew.'
              : style.id === 'cooled'
                ? 'Brew hot at a normal 1:16 ratio, then chill in the fridge. Cleaner than leftover hot coffee, mellower than flash brew.'
                : style.id === 'latte-concentrate'
                  ? 'Brew the concentrate onto (or over) the ice, then add cold milk. Adjust milk if ice melts too fast and thins the cup — or use larger cubes / a colder glass.'
                  : 'Brew a stronger hot concentrate, pour over ice, and let dilution finish the strength. Great base for iced lattes.'}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Recipes:{' '}
            <Link href="/recipes/iced-latte" className="font-medium text-accent hover:underline">
              iced latte
            </Link>
            {' · '}
            <Link
              href="/recipes/brown-sugar-shaken-espresso"
              className="font-medium text-accent hover:underline"
            >
              shaken espresso
            </Link>
            {' · '}
            <Link href="/tools/cold-brew-calculator" className="font-medium text-accent hover:underline">
              cold brew calculator
            </Link>
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
