'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'

const MODES = [
  { id: 'concentrate', label: 'Concentrate', ratio: 8, note: 'Dilute before drinking' },
  { id: 'ready', label: 'Ready to drink', ratio: 15, note: 'Pour straight over ice' },
] as const

const BATCH_PRESETS = [
  { label: '500 ml', water: 500 },
  { label: '800 ml', water: 800 },
  { label: '1 L', water: 1000 },
  { label: '64 oz jar', water: 1893 },
  { label: '2 L', water: 2000 },
]

const STEEP_PRESETS = [
  { label: '12 h', hours: 12 },
  { label: '14 h', hours: 14 },
  { label: '16 h', hours: 16 },
  { label: '18 h', hours: 18 },
]

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

function formatClock(date: Date) {
  const h24 = date.getHours()
  const mm = date.getMinutes()
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12
  const ampm = h24 < 12 ? 'am' : 'pm'
  return `${h12}:${mm.toString().padStart(2, '0')} ${ampm}`
}

function formatDuration(totalSec: number) {
  const s = Math.max(0, Math.floor(totalSec))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const r = s % 60
  if (h > 0) return `${h}h ${m.toString().padStart(2, '0')}m`
  return `${m}:${r.toString().padStart(2, '0')}`
}

export function ColdBrewCalculator() {
  const [modeId, setModeId] = useState<(typeof MODES)[number]['id']>('concentrate')
  const [water, setWater] = useState(1893)
  const [diluteParts, setDiluteParts] = useState(1) // water/milk per 1 part concentrate
  const [serveConcentrateMl, setServeConcentrateMl] = useState(120)
  const [steepHours, setSteepHours] = useState(14)
  const [elapsedSec, setElapsedSec] = useState(0)
  const [running, setRunning] = useState(false)
  const [startedAt, setStartedAt] = useState<Date | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const mode = MODES.find((m) => m.id === modeId)!
  const coffee = water / mode.ratio
  const servings = modeId === 'concentrate' ? (water * (1 + diluteParts)) / 250 : water / 250
  const tbsp = coffee / 5.3

  const drinkMl = serveConcentrateMl * (1 + diluteParts)
  const diluentMl = serveConcentrateMl * diluteParts

  const totalSteepSec = steepHours * 3600
  const remainingSec = Math.max(0, totalSteepSec - elapsedSec)
  const readyAt = useMemo(() => {
    if (!startedAt) {
      const d = new Date()
      d.setSeconds(d.getSeconds() + remainingSec)
      return d
    }
    return new Date(startedAt.getTime() + totalSteepSec * 1000)
  }, [startedAt, remainingSec, totalSteepSec])
  const done = elapsedSec >= totalSteepSec

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setElapsedSec((e) => {
        if (e + 1 >= totalSteepSec) {
          setRunning(false)
          return totalSteepSec
        }
        return e + 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, totalSteepSec])

  function startTimer() {
    if (!startedAt) setStartedAt(new Date(Date.now() - elapsedSec * 1000))
    setRunning(true)
  }

  function pauseTimer() {
    setRunning(false)
  }

  function resetTimer() {
    setRunning(false)
    setElapsedSec(0)
    setStartedAt(null)
  }

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
          <label className="text-sm font-medium text-foreground">Batch water</label>
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
          {BATCH_PRESETS.map((v) => (
            <button
              key={v.label}
              type="button"
              onClick={() => setWater(v.water)}
              className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                water === v.water
                  ? 'border-accent bg-accent/10 text-foreground'
                  : 'border-border text-muted-foreground hover:border-accent/50'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          64 oz mason jar ≈ 1893 ml — tap that preset for a full-jar concentrate or RTD batch.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Coffee (extra coarse)" value={`${round(coffee)} g`} big />
        <Stat label="Water" value={`${round(water)} g`} />
        <Stat label="Tablespoons" value={`≈ ${round(tbsp, 1)}`} />
        <Stat
          label={modeId === 'concentrate' ? 'Approx diluted servings' : 'Approx servings'}
          value={`≈ ${round(servings, 1)}`}
        />
      </div>

      {modeId === 'concentrate' && (
        <div className="mt-6 rounded-xl border border-border bg-background p-4">
          <h3 className="text-sm font-medium text-foreground">
            Dilution calculator (concentrate → drink)
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            How to dilute cold brew: mix concentrate with water or milk. Classic start is 1:1.
          </p>

          <div className="mt-4">
            <div className="mb-2 flex items-baseline justify-between">
              <label htmlFor="cb-dilute" className="text-sm font-medium text-foreground">
                Dilution (1 part concentrate : {diluteParts} part
                {diluteParts === 1 ? '' : 's'} liquid)
              </label>
              <span className="text-sm font-semibold text-foreground">1:{diluteParts}</span>
            </div>
            <input
              id="cb-dilute"
              type="range"
              min={0.5}
              max={3}
              step={0.5}
              value={diluteParts}
              onChange={(e) => setDiluteParts(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { label: '1:0.5 strong', v: 0.5 },
                { label: '1:1 classic', v: 1 },
                { label: '1:2 lighter', v: 2 },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setDiluteParts(p.v)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                    diluteParts === p.v
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'border-border text-muted-foreground hover:border-accent/50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex items-baseline justify-between">
              <label htmlFor="cb-serve" className="text-sm font-medium text-foreground">
                Concentrate per glass
              </label>
              <span className="text-sm font-semibold text-foreground">{serveConcentrateMl} ml</span>
            </div>
            <input
              id="cb-serve"
              type="range"
              min={60}
              max={250}
              step={10}
              value={serveConcentrateMl}
              onChange={(e) => setServeConcentrateMl(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Concentrate" value={`${serveConcentrateMl} ml`} />
            <Stat label="Water / milk" value={`${round(diluentMl)} ml`} />
            <Stat label="Finished drink" value={`≈ ${round(drinkMl)} ml`} big />
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-border bg-background p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-medium text-foreground">Steep timer / ready-at</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Fridge steep 12–18 hours. Start when you mix grounds + water.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {STEEP_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setSteepHours(p.hours)
                  resetTimer()
                }}
                className={`rounded-lg border px-2.5 py-1 text-xs font-medium ${
                  steepHours === p.hours
                    ? 'border-accent bg-accent/10 text-foreground'
                    : 'border-border text-muted-foreground hover:border-accent/50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">
              {done ? 'Ready to strain' : running ? 'Steeping' : 'Ready at'}
            </p>
            <p className="mt-1 font-serif text-3xl font-semibold tabular-nums text-foreground">
              {done ? '0:00' : formatDuration(remainingSec)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {done
                ? 'Strain now — mesh + paper filter'
                : `Ready around ${formatClock(readyAt)}${startedAt ? '' : ' (if you start now)'}`}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => (running ? pauseTimer() : startTimer())}
              disabled={done}
              className="inline-flex items-center gap-1.5 rounded-xl border border-accent bg-accent px-3 py-2 text-sm font-medium text-accent-foreground disabled:opacity-50"
            >
              {running ? <Pause className="size-4" /> : <Play className="size-4" />}
              {running ? 'Pause' : done ? 'Done' : 'Start'}
            </button>
            <button
              type="button"
              onClick={resetTimer}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm font-medium text-muted-foreground hover:border-accent hover:text-foreground"
            >
              <RotateCcw className="size-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Cold brew concentrate ratio is 1:8 by weight; ready-to-drink is ~1:15. Extra-coarse grind,
        fridge 12–18 hours, then strain. Concentrate keeps ~1–2 weeks refrigerated; ready-to-drink
        closer to ~5–7 days. See fridge-life notes below.
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
