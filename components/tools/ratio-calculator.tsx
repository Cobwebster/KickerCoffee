'use client'

import { useState } from 'react'

const CUP_ML = 250
const GRAMS_PER_TBSP = 5.3
const RATIO_PRESETS = [15, 16, 17, 18]

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function RatioCalculator() {
  // Water grams is the single source of truth.
  const [water, setWater] = useState(320)
  const [ratio, setRatio] = useState(16)

  const coffee = water / ratio
  const cups = water / CUP_ML
  const tbsp = coffee / GRAMS_PER_TBSP

  function setFromCoffee(value: number) {
    setWater(value * ratio)
  }
  function setFromCups(value: number) {
    setWater(value * CUP_ML)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-foreground">
          Brew strength (ratio 1:{ratio})
        </label>
        <div className="flex flex-wrap gap-2">
          {RATIO_PRESETS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRatio(r)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                ratio === r
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-accent/50'
              }`}
            >
              1:{r}
              <span className="ml-1 text-xs opacity-70">
                {r === 15 ? 'strong' : r === 18 ? 'light' : ''}
              </span>
            </button>
          ))}
        </div>
        <input
          type="range"
          min={13}
          max={20}
          step={1}
          value={ratio}
          onChange={(e) => setRatio(Number(e.target.value))}
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
        <Result label="Ratio" value={`1:${ratio}`} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Edit any field and the others update automatically. Grams and millilitres of water are
        interchangeable (1 ml of water weighs 1 g). Tablespoons are approximate — a scale is always
        more accurate.
      </p>
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
