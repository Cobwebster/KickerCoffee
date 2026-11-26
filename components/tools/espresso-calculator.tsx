'use client'

import { useEffect, useRef, useState } from 'react'
import { Link } from '@/components/link'
import { Pause, Play, RotateCcw } from 'lucide-react'

const SHOTS = [
  { id: 'ristretto', label: 'Ristretto', ratio: 1.5, time: '20–25 s' },
  { id: 'normale', label: 'Normale', ratio: 2, time: '25–30 s' },
  { id: 'lungo', label: 'Lungo', ratio: 3, time: '30–40 s' },
] as const

function round(n: number, d = 1) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

function formatShotTime(sec: number) {
  const s = Math.max(0, sec)
  const whole = Math.floor(s)
  const tenths = Math.floor((s - whole) * 10)
  return `${whole}.${tenths}s`
}

export function EspressoCalculator() {
  const [dose, setDose] = useState(18)
  const [ratio, setRatio] = useState(2)
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const startRef = useRef<number | null>(null)
  const baseRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const yieldOut = dose * ratio
  const matchedShot = SHOTS.find((s) => Math.abs(s.ratio - ratio) < 0.26) ?? null

  useEffect(() => {
    if (!running) return
    const tick = () => {
      if (startRef.current == null) return
      setElapsed(baseRef.current + (performance.now() - startRef.current) / 1000)
      rafRef.current = requestAnimationFrame(tick)
    }
    startRef.current = performance.now()
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [running])

  function toggleTimer() {
    if (running) {
      baseRef.current = elapsed
      startRef.current = null
      setRunning(false)
      return
    }
    setRunning(true)
  }

  function resetTimer() {
    setRunning(false)
    startRef.current = null
    baseRef.current = 0
    setElapsed(0)
  }

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
          <label className="text-sm font-medium text-foreground">
            Brew ratio (1:{round(ratio, 2)})
          </label>
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

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
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
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-sm font-medium text-foreground">Shot timer</span>
            <span className="text-xs text-muted-foreground">start / stop</span>
          </div>
          <div className="text-2xl font-semibold tabular-nums text-foreground">
            {formatShotTime(elapsed)}
          </div>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={toggleTimer}
              className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border border-accent bg-accent px-2 py-1.5 text-xs font-medium text-accent-foreground"
            >
              {running ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              {running ? 'Stop' : 'Start'}
            </button>
            <button
              type="button"
              onClick={resetTimer}
              className="inline-flex items-center justify-center rounded-lg border border-border px-2 py-1.5 text-muted-foreground hover:border-accent hover:text-foreground"
              aria-label="Reset shot timer"
            >
              <RotateCcw className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-secondary p-4 text-sm leading-relaxed text-muted-foreground">
        Pull <span className="font-semibold text-foreground">{dose} g</span> in to{' '}
        <span className="font-semibold text-foreground">{round(yieldOut)} g</span> out
        {matchedShot ? ` in about ${matchedShot.time}` : ''}. Start the timer with the pump. Sour and
        fast? Grind finer. Bitter and slow? Grind coarser. Change one variable at a time.
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[280px] text-left text-sm">
          <caption className="border-b border-border bg-background px-4 py-2 text-left text-xs text-muted-foreground">
            Quick dial-in — fix taste before changing dose
          </caption>
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="px-4 py-2 font-medium">Symptom</th>
              <th className="px-4 py-2 font-medium">Try</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="px-4 py-2 text-foreground">Sour, fast (&lt;20s)</td>
              <td className="px-4 py-2 text-muted-foreground">Grind finer · or longer ratio</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-2 text-foreground">Bitter, slow (&gt;35s)</td>
              <td className="px-4 py-2 text-muted-foreground">Grind coarser · or shorter ratio</td>
            </tr>
            <tr className="border-b border-border">
              <td className="px-4 py-2 text-foreground">Thin / hollow</td>
              <td className="px-4 py-2 text-muted-foreground">Lower ratio (toward ristretto)</td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-foreground">Harsh / drying</td>
              <td className="px-4 py-2 text-muted-foreground">Higher ratio or coarser grind</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Use the shot in a{' '}
        <Link href="/recipes/cappuccino" className="font-medium text-accent hover:underline">
          cappuccino
        </Link>
        {' or '}
        <Link href="/recipes/cortado" className="font-medium text-accent hover:underline">
          cortado
        </Link>
        .
      </p>
    </div>
  )
}
