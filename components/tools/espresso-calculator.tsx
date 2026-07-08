'use client'

import { useState } from 'react'

const SHOTS = [
  { id: 'ristretto', label: 'Ristretto', ratio: 1.5, time: '20–25 s' },
  { id: 'normale', label: 'Normale', ratio: 2, time: '25–30 s' },
  { id: 'lungo', label: 'Lungo', ratio: 3, time: '30–40 s' },
] as const

function round(n: number, d = 1) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function EspressoCalculator() {
  const [dose, setDose] = useState(18)
  const [ratio, setRatio] = useState(2)

  const yieldOut = dose * ratio
  const matchedShot =
    SHOTS.find((s) => Math.abs(s.ratio - ratio) < 0.26) ?? null

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <label className="mb-2 block text-sm font-medium text-foreground">Shot style</label>
      <div className="grid grid-cols-3 gap-2">
        {SHOTS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setRatio(s.ratio)}
            className={`rounded-xl border p-3 text-center transition-colors ${
              Math.abs(s.ratio - ratio) < 0.26
                ? 'border-accent bg-accent/10'
                : 'border-border bg-background hover:border-accent/50'
            }`}
          >
            <div className="text-sm font-semibold text-foreground">{s.label}</div>
            <div className="text-xs text-muted-foreground">1:{s.ratio}</div>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-baseline justify-between">
          <label className="text-sm font-medium text-foreground">Brew ratio (1:{round(ratio, 2)})</label>
          <span className="text-xs text-muted-foreground">
            {matchedShot ? matchedShot.time : 'custom'}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={3.5}
          step={0.1}
          value={ratio}
          onChange={(e) => setRatio(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
          aria-label="Espresso brew ratio"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-1 flex items-baseline justify-between">
            <label className="text-sm font-medium text-foreground">Dose in</label>
            <span className="text-xs text-muted-foreground">g</span>
          </div>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.1}
            value={dose}
            onChange={(e) => setDose(Math.max(0, Number(e.target.value)))}
            className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
          />
        </div>
        <div className="rounded-xl border border-accent/60 bg-accent/5 p-4">
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-sm font-medium text-foreground">Yield out</span>
            <span className="text-xs text-muted-foreground">g</span>
          </div>
          <div className="text-2xl font-semibold text-foreground">{round(yieldOut)} g</div>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
        Pull <span className="font-semibold text-foreground">{dose} g</span> in to{' '}
        <span className="font-semibold text-foreground">{round(yieldOut)} g</span> out
        {matchedShot ? ` in about ${matchedShot.time}` : ''}. Sour and fast? Grind finer. Bitter and
        slow? Grind coarser. Change one variable at a time.
      </div>
    </div>
  )
}
