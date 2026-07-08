'use client'

import { useState } from 'react'

const MODES = [
  { id: 'concentrate', label: 'Concentrate', ratio: 8, note: 'Dilute 1:1 before drinking' },
  { id: 'ready', label: 'Ready to drink', ratio: 15, note: 'Pour straight over ice' },
] as const

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function ColdBrewCalculator() {
  const [modeId, setModeId] = useState<(typeof MODES)[number]['id']>('concentrate')
  const [water, setWater] = useState(800)

  const mode = MODES.find((m) => m.id === modeId)!
  const coffee = water / mode.ratio
  const servings = modeId === 'concentrate' ? (water * 2) / 250 : water / 250

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <label className="mb-2 block text-sm font-medium text-foreground">Cold brew style</label>
      <div className="grid gap-3 sm:grid-cols-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setModeId(m.id)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              modeId === m.id
                ? 'border-accent bg-accent/10'
                : 'border-border bg-background hover:border-accent/50'
            }`}
          >
            <div className="font-semibold text-foreground">{m.label}</div>
            <div className="text-sm text-muted-foreground">
              1:{m.ratio} · {m.note}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-background p-4">
        <div className="mb-1 flex items-baseline justify-between">
          <label className="text-sm font-medium text-foreground">Water</label>
          <span className="text-xs text-muted-foreground">g / ml</span>
        </div>
        <input
          type="number"
          inputMode="decimal"
          min={0}
          value={round(water)}
          onChange={(e) => setWater(Math.max(0, Number(e.target.value)))}
          className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {[500, 800, 1000, 2000].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setWater(v)}
              className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-accent/50"
            >
              {v >= 1000 ? `${v / 1000} L` : `${v} ml`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Coffee (coarse)" value={`${round(coffee)} g`} big />
        <Stat label="Water" value={`${round(water)} g`} />
        <Stat label="Approx servings" value={`≈ ${round(servings, 1)}`} />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Steep coarse grounds in the fridge for 12–18 hours, then strain through a fine mesh and paper
        filter. {mode.note}. Concentrate keeps for up to two weeks refrigerated.
      </p>
    </div>
  )
}

function Stat({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        big ? 'border-accent/60 bg-accent/5' : 'border-border bg-secondary'
      }`}
    >
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-xl font-semibold text-foreground">{value}</div>
    </div>
  )
}
