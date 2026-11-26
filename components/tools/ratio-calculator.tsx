'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/components/link'

const CUP_ML = 250
const GRAMS_PER_TBSP = 5.3

const METHOD_PRESETS = [
  { id: 'v60', label: 'V60 / pour over', ratio: 16, grind: 'pour-over', note: '1:16 balanced' },
  { id: 'french', label: 'French press', ratio: 15, grind: 'french-press', note: '1:15 classic' },
  { id: 'aeropress', label: 'AeroPress', ratio: 14, grind: 'aeropress', note: '1:14 concentrate-ish' },
  { id: 'batch', label: 'Batch / drip brew', ratio: 16.5, grind: 'drip', note: '~1:16.5' },
  { id: 'chemex', label: 'Chemex', ratio: 16, grind: 'chemex', note: '1:16 clean' },
] as const

const RATIO_PRESETS = [14, 15, 16, 17, 18]

const METHOD_CHART = [
  { method: 'V60 / pour over', ratio: '1:16–1:17', coffeePer250: '15–16 g', grind: 'Medium-fine' },
  { method: 'Kalita / flat-bottom', ratio: '1:16', coffeePer250: '16 g', grind: 'Medium' },
  { method: 'Chemex', ratio: '1:16–1:17', coffeePer250: '15–16 g', grind: 'Medium-coarse' },
  { method: 'French press', ratio: '1:15', coffeePer250: '17 g', grind: 'Coarse' },
  { method: 'AeroPress', ratio: '1:12–1:15', coffeePer250: '17–21 g*', grind: 'Medium-fine' },
  { method: 'Batch / drip', ratio: '1:16–1:17', coffeePer250: '15–16 g', grind: 'Medium' },
  { method: 'Cold brew concentrate', ratio: '1:8', coffeePer250: '—', grind: 'Extra coarse' },
  { method: 'Espresso (dose:yield)', ratio: '1:2', coffeePer250: '—', grind: 'Fine' },
] as const

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function RatioCalculator() {
  const [water, setWater] = useState(320)
  const [ratio, setRatio] = useState(16)
  const [methodId, setMethodId] = useState<(typeof METHOD_PRESETS)[number]['id'] | null>('v60')

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const r = Number(params.get('ratio'))
      if (Number.isFinite(r) && r >= 12 && r <= 20) {
        setRatio(Math.round(r * 2) / 2)
        setMethodId(null)
      }
      const m = params.get('method')
      const preset = METHOD_PRESETS.find((p) => p.id === m)
      if (preset) {
        setMethodId(preset.id)
        setRatio(preset.ratio)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const coffee = water / ratio
  const cups = water / CUP_ML
  const tbsp = coffee / GRAMS_PER_TBSP
  const activeMethod = METHOD_PRESETS.find((m) => m.id === methodId)

  function setFromCoffee(value: number) {
    setWater(value * ratio)
  }
  function setFromCups(value: number) {
    setWater(value * CUP_ML)
  }

  function snapMethod(id: (typeof METHOD_PRESETS)[number]['id']) {
    const preset = METHOD_PRESETS.find((m) => m.id === id)!
    setMethodId(preset.id)
    setRatio(preset.ratio)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-foreground">Method presets</label>
        <div className="flex flex-wrap gap-2">
          {METHOD_PRESETS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => snapMethod(m.id)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                methodId === m.id
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-accent/50'
              }`}
            >
              {m.label}
              <span className="ml-1 text-xs opacity-80">{m.note}</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Presets snap the ratio slider. Golden ratio coffee for most filter methods sits around
          1:15–1:18 — 1:16 is the all-purpose default.
        </p>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-foreground">
          Brew strength (ratio 1:{round(ratio, 1)})
        </label>
        <div className="flex flex-wrap gap-2">
          {RATIO_PRESETS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRatio(r)
                setMethodId(null)
              }}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                Math.abs(ratio - r) < 0.01
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-accent/50'
              }`}
            >
              1:{r}
              <span className="ml-1 text-xs opacity-70">
                {r === 15 ? 'strong' : r === 18 ? 'light' : r === 16 ? 'golden' : ''}
              </span>
            </button>
          ))}
        </div>
        <input
          type="range"
          min={12}
          max={20}
          step={0.5}
          value={ratio}
          onChange={(e) => {
            setRatio(Number(e.target.value))
            setMethodId(null)
          }}
          className="mt-4 w-full accent-[var(--accent)]"
          aria-label="Coffee to water ratio"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          label="Coffee"
          unit="g"
          value={round(coffee, 1)}
          onChange={setFromCoffee}
        />
        <NumberField
          label="Water"
          unit="g / ml"
          value={round(water)}
          onChange={setWater}
          highlight
        />
        <NumberField
          label="Cups"
          unit={`× ${CUP_ML}ml`}
          value={round(cups, 1)}
          onChange={setFromCups}
          step={0.5}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl bg-secondary p-4 text-sm">
        <Result label="Coffee" value={`${round(coffee, 1)} g`} />
        <Result label="Water" value={`${round(water)} g`} />
        <Result label="Tablespoons" value={`≈ ${round(tbsp, 1)} tbsp`} />
        <Result label="Ratio" value={`1:${round(ratio, 1)}`} />
      </div>

      {activeMethod && (
        <p className="mt-3 text-sm text-muted-foreground">
          Pair with grind:{' '}
          <Link
            href={`/tools/grind-size-chart?method=${activeMethod.grind}`}
            className="font-medium text-accent hover:underline"
          >
            {activeMethod.label} on the grind chart
          </Link>{' '}
          — ratio + grind SERPs usually need both dialed.
        </p>
      )}
      {!activeMethod && (
        <p className="mt-3 text-sm text-muted-foreground">
          Wrong texture for this ratio?{' '}
          <Link href="/tools/grind-size-chart" className="font-medium text-accent hover:underline">
            Open the grind size chart
          </Link>
          .
        </p>
      )}

      <div className="print-chart mt-8 overflow-x-auto rounded-xl border border-border">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background px-4 py-2">
          <p className="text-sm font-medium text-foreground">Coffee to water ratio chart</p>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-accent hover:text-foreground print:hidden"
          >
            Print chart
          </button>
        </div>
        <table className="w-full min-w-[320px] text-left text-sm">
          <caption className="sr-only">
            Printable coffee to water ratio chart by brew method
          </caption>
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              <th className="px-4 py-2 font-medium">Method</th>
              <th className="px-4 py-2 font-medium">Ratio</th>
              <th className="px-4 py-2 font-medium">Coffee / 250 ml</th>
              <th className="px-4 py-2 font-medium">Grind</th>
            </tr>
          </thead>
          <tbody>
            {METHOD_CHART.map((row) => (
              <tr key={row.method} className="border-b border-border last:border-0">
                <td className="px-4 py-2 font-medium text-foreground">{row.method}</td>
                <td className="px-4 py-2 text-muted-foreground">{row.ratio}</td>
                <td className="px-4 py-2 text-muted-foreground">{row.coffeePer250}</td>
                <td className="px-4 py-2 text-muted-foreground">{row.grind}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
          *AeroPress recipes vary widely — many are shorter concentrates diluted after. Espresso and
          cold brew use different scales; open those dedicated calculators when needed.
        </p>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground print:hidden">
        Edit any field and the others update automatically. Grams and millilitres of water are
        interchangeable (1 ml ≈ 1 g). Tablespoons are approximate — a scale is always more accurate.
      </p>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body * { visibility: hidden !important; }
              .print-chart, .print-chart * { visibility: visible !important; }
              .print-chart {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                border: none !important;
              }
            }
          `,
        }}
      />
    </div>
  )
}

function NumberField({
  label,
  unit,
  value,
  onChange,
  step = 1,
  highlight,
}: {
  label: string
  unit: string
  value: number
  onChange: (v: number) => void
  step?: number
  highlight?: boolean
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight ? 'border-accent/60 bg-accent/5' : 'border-border bg-background'
      }`}
    >
      <div className="mb-1 flex items-baseline justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
        className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
      />
    </div>
  )
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-semibold text-foreground">{value}</div>
    </div>
  )
}
