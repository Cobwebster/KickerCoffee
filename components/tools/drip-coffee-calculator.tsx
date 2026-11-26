'use client'

import { useState } from 'react'
import { Link } from '@/components/link'
import { X } from 'lucide-react'

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

/** Typical “carafe full” usable water for common basket machines (approx). */
const CARAFE_PRESETS = [
  { id: 'mr-coffee-4', label: 'Mr. Coffee 4-cup', ml: 590, note: '~4 machine cups' },
  { id: 'mr-coffee-12', label: 'Mr. Coffee 12-cup', ml: 1770, note: 'carafe full' },
  { id: 'cuisinart-10', label: 'Cuisinart 10-cup', ml: 1480, note: 'carafe full' },
  { id: 'cuisinart-14', label: 'Cuisinart 14-cup', ml: 2070, note: 'carafe full' },
  { id: 'generic-12', label: 'Generic 12-cup', ml: 1770, note: '~5 oz × 12' },
] as const

const POT_FAQ = [
  { size: '4 cups', water: '~590 ml', coffee: '~36 g', scoops: '~3.5' },
  { size: '8 cups', water: '~1.18 L', coffee: '~72 g', scoops: '~7' },
  { size: '10 cups', water: '~1.48 L', coffee: '~90 g', scoops: '~9' },
  { size: '12 cups', water: '~1.77 L', coffee: '~107 g', scoops: '~11' },
] as const

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function DripCoffeeCalculator() {
  const [mode, setMode] = useState<'cups' | 'water'>('cups')
  const [servingType, setServingType] = useState<'machine-cups' | 'mugs'>('machine-cups')
  const [cups, setCups] = useState(12)
  const [customWaterMl, setCustomWaterMl] = useState(1770)
  const [carafeId, setCarafeId] = useState<string | null>('mr-coffee-12')
  const [strengthId, setStrengthId] = useState<(typeof STRENGTHS)[number]['id']>('standard')
  const [showGrindChip, setShowGrindChip] = useState(true)

  const strength = STRENGTHS.find((item) => item.id === strengthId) ?? STRENGTHS[1]
  const mlPerCup = servingType === 'machine-cups' ? MACHINE_CUP_ML : MUG_ML
  const water = mode === 'cups' ? cups * mlPerCup : Math.max(100, customWaterMl)
  const coffee = water / strength.ratio
  const tbsp = coffee / GRAMS_PER_TBSP
  const scoops = coffee / GRAMS_PER_SCOOP

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      {showGrindChip && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3">
          <div className="min-w-0 flex-1 text-sm text-foreground">
            <span className="font-semibold">Grind reminder:</span> medium (like sand) for most
            basket machines. Flat-bottom baskets can go a touch coarser; cone baskets a touch finer.{' '}
            <Link
              href="/tools/grind-size-chart?method=drip"
              className="font-medium text-accent hover:underline"
            >
              Open drip grind chart
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setShowGrindChip(false)}
            className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss grind reminder"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Size by</label>
            <div className="flex flex-wrap gap-2">
              <ToggleButton
                active={mode === 'cups'}
                onClick={() => setMode('cups')}
                label="Cup count"
                note="machine cups or mugs"
              />
              <ToggleButton
                active={mode === 'water'}
                onClick={() => setMode('water')}
                label="Water / carafe"
                note="ml, L, or full carafe"
              />
            </div>
          </div>

          {mode === 'cups' ? (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Serving style
                </label>
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
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Carafe full presets
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {CARAFE_PRESETS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setCarafeId(c.id)
                        setCustomWaterMl(c.ml)
                      }}
                      className={`rounded-xl border p-3 text-left transition-colors ${
                        carafeId === c.id
                          ? 'border-accent bg-accent/10'
                          : 'border-border bg-background hover:border-accent/50'
                      }`}
                    >
                      <div className="text-sm font-semibold text-foreground">{c.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {c.ml} ml · {c.note}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border bg-background p-4">
                <div className="mb-1 flex items-baseline justify-between">
                  <label htmlFor="drip-water" className="text-sm font-medium text-foreground">
                    Custom water
                  </label>
                  <span className="text-xs text-muted-foreground">ml</span>
                </div>
                <input
                  id="drip-water"
                  type="number"
                  inputMode="decimal"
                  min={100}
                  step={10}
                  value={round(customWaterMl)}
                  onChange={(e) => {
                    setCarafeId(null)
                    setCustomWaterMl(Math.max(100, Number(e.target.value)))
                  }}
                  className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { label: '1 L', ml: 1000 },
                    { label: '1.5 L', ml: 1500 },
                    { label: '60 oz', ml: round(60 * OUNCES_TO_ML) },
                  ].map((q) => (
                    <button
                      key={q.label}
                      type="button"
                      onClick={() => {
                        setCarafeId(null)
                        setCustomWaterMl(q.ml)
                      }}
                      className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-accent/50"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  ≈ {round(customWaterMl / 1000, 2)} L · {round(customWaterMl / OUNCES_TO_ML)} fl oz
                </p>
              </div>
            </div>
          )}

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
            About <span className="font-semibold text-foreground">{round(water / 1000, 2)} L</span> of
            water
            {mode === 'cups' ? (
              <>
                {' '}
                for <span className="font-semibold text-foreground">{round(cups)}</span>{' '}
                {servingType === 'machine-cups' ? 'coffee maker cups' : 'mugs'}
              </>
            ) : (
              <> (custom / carafe)</>
            )}
            . Scoops ≈ {round(scoops, 1)} level standard scoops (~10 g).
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[280px] text-left text-sm">
          <caption className="border-b border-border bg-background px-4 py-2 text-left text-xs text-muted-foreground">
            Pot-size FAQ (machine cups @ ~1:16.5 standard) — coffee scoops per pot
          </caption>
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="px-4 py-2 font-medium">Pot size</th>
              <th className="px-4 py-2 font-medium">Water</th>
              <th className="px-4 py-2 font-medium">Coffee</th>
              <th className="px-4 py-2 font-medium">Scoops</th>
            </tr>
          </thead>
          <tbody>
            {POT_FAQ.map((row) => (
              <tr key={row.size} className="border-b border-border last:border-0">
                <td className="px-4 py-2 font-medium text-foreground">{row.size}</td>
                <td className="px-4 py-2 text-muted-foreground">{row.water}</td>
                <td className="px-4 py-2 text-muted-foreground">{row.coffee}</td>
                <td className="px-4 py-2 text-muted-foreground">{row.scoops}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-background p-4">
        <p className="text-sm font-medium text-foreground">Drip coffee too weak or too strong?</p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Too weak:</span> use Strong (1:15.5), add
            ~10% more coffee, or grind a notch finer — don’t just hit brew twice on the same grounds.
          </li>
          <li>
            <span className="font-medium text-foreground">Too strong / bitter:</span> Light (1:17.5),
            fewer scoops, or grind slightly coarser. Descale if the pot always tastes flat.
          </li>
          <li>
            <span className="font-medium text-foreground">Scoops confuse pots:</span> “1 scoop per
            cup” assumes 5–6 oz machine cups. A 12-cup maker is not 12 full mugs — use the table
            above.
          </li>
        </ul>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Most drip machines count one cup as 5 oz, not a full 8 oz mug. Carafe presets are typical
        usable volumes — check your manual if the basket overflows. Tablespoons and scoops are
        approximate; use grams when you can.
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
      <span className={`block text-xs ${active ? 'opacity-80' : 'text-muted-foreground'}`}>
        {note}
      </span>
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
