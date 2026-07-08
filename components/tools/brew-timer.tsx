'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

type Phase = {
  name: string
  start: number
  end: number
  targetPct: number
  instruction: string
}

function buildPhases(dose: number, ratio: number): Phase[] {
  const total = dose * ratio
  const bloom = Math.round(dose * 2)
  const firstTarget = Math.round(total * 0.6)
  return [
    {
      name: 'Bloom',
      start: 0,
      end: 45,
      targetPct: bloom / total,
      instruction: `Pour ${bloom} g of water to wet all the grounds. Let it bloom and release CO₂.`,
    },
    {
      name: 'First pour',
      start: 45,
      end: 75,
      targetPct: firstTarget / total,
      instruction: `Pour in slow spirals up to ${firstTarget} g total.`,
    },
    {
      name: 'Second pour',
      start: 75,
      end: 105,
      targetPct: 1,
      instruction: `Top up to ${Math.round(total)} g total, pouring in the center.`,
    },
    {
      name: 'Drawdown',
      start: 105,
      end: 195,
      targetPct: 1,
      instruction: 'Stop pouring. Let the water draw down completely, then swirl and serve.',
    },
  ]
}

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function BrewTimer() {
  const [dose, setDose] = useState(20)
  const [ratio, setRatio] = useState(16)
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const phases = buildPhases(dose, ratio)
  const total = dose * ratio
  const finish = phases[phases.length - 1].end
  const active = phases.find((p) => elapsed >= p.start && elapsed < p.end) ?? null
  const targetWeight = active ? Math.round(total * active.targetPct) : Math.round(total)
  const done = elapsed >= finish

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed((e) => {
          if (e + 1 >= finish) {
            setRunning(false)
            return finish
          }
          return e + 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, finish])

  function reset() {
    setRunning(false)
    setElapsed(0)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <Setup label="Coffee dose" unit="g" value={dose} onChange={setDose} disabled={running || elapsed > 0} />
        <Setup label="Ratio (1:x)" unit="" value={ratio} onChange={setRatio} disabled={running || elapsed > 0} />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        Target: <span className="font-semibold text-foreground">{dose} g coffee</span> to{' '}
        <span className="font-semibold text-foreground">{Math.round(total)} g water</span>
      </p>

      <div className="mt-6 flex flex-col items-center rounded-2xl bg-secondary p-6 text-center">
        <div className="font-mono text-6xl font-semibold tabular-nums text-foreground">
          {fmt(elapsed)}
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {done ? 'Brew complete' : active ? active.name : 'Ready'}
        </div>
        {!done && (
          <div className="mt-4 text-2xl font-semibold text-accent">Pour to {targetWeight} g</div>
        )}
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            disabled={done}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {running ? <Pause className="size-4" /> : <Play className="size-4" />}
            {running ? 'Pause' : elapsed > 0 ? 'Resume' : 'Start'}
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <RotateCcw className="size-4" />
            Reset
          </button>
        </div>
      </div>

      <ol className="mt-6 flex flex-col gap-2">
        {phases.map((p) => {
          const isActive = active?.name === p.name && !done
          const isPast = elapsed >= p.end
          return (
            <li
              key={p.name}
              className={`flex gap-4 rounded-xl border p-4 transition-colors ${
                isActive
                  ? 'border-accent bg-accent/10'
                  : isPast
                    ? 'border-border bg-secondary/50 opacity-60'
                    : 'border-border bg-background'
              }`}
            >
              <div className="w-16 shrink-0 font-mono text-sm text-muted-foreground">
                {fmt(p.start)}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{p.name}</div>
                <div className="text-sm leading-relaxed text-muted-foreground">{p.instruction}</div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Setup({
  label,
  unit,
  value,
  onChange,
  disabled,
}: {
  label: string
  unit: string
  value: number
  onChange: (v: number) => void
  disabled?: boolean
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="mb-1 flex items-baseline justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      <input
        type="number"
        inputMode="decimal"
        min={1}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Math.max(1, Number(e.target.value)))}
        className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none disabled:opacity-60"
      />
    </div>
  )
}
