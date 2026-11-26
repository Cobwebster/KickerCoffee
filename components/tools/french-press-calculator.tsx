'use client'

import { useEffect, useRef, useState } from 'react'
import { Link } from '@/components/link'
import { Pause, Play, RotateCcw } from 'lucide-react'

const GRAMS_PER_TBSP = 5.3
const GRAMS_PER_SCOOP = 10
const STEEP_SECONDS = 4 * 60
const BLOOM_SECONDS = 30

/** Common French press / cafetière sizes (usable brew volume). */
const PRESS_SIZES = [
  { id: '1-cup', label: '1 cup', water: 250, note: '1 mug' },
  { id: '2-cup', label: '2 cups', water: 500, note: '2 mugs' },
  { id: '16-oz', label: '16 oz', water: 473, note: 'small press' },
  { id: '3-cup', label: '3-cup', water: 350, note: '~12 oz' },
  { id: '4-cup', label: '4-cup', water: 500, note: '~17 oz' },
  { id: '8-cup', label: '8-cup / 1 L', water: 1000, note: '~34 oz' },
  { id: '12-cup', label: '12-cup', water: 1500, note: '~51 oz' },
] as const

const STRENGTHS = [
  { id: 'mild', label: 'Mild', ratio: 16, note: 'Lighter body' },
  { id: 'classic', label: 'Classic', ratio: 15, note: 'Best starting point' },
  { id: 'strong', label: 'Strong', ratio: 14, note: 'Bold & rich' },
] as const

const QUICK_WATER = [
  { label: '250 ml', water: 250 },
  { label: '500 ml', water: 500 },
  { label: '1 L', water: 1000 },
  { label: '16 oz', water: 473 },
]

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

function formatTime(sec: number) {
  const s = Math.max(0, Math.floor(sec))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${r.toString().padStart(2, '0')}`
}

export function FrenchPressCalculator() {
  const [sizeId, setSizeId] = useState<(typeof PRESS_SIZES)[number]['id']>('8-cup')
  const [strengthId, setStrengthId] = useState<(typeof STRENGTHS)[number]['id']>('classic')
  const [customWater, setCustomWater] = useState<number | null>(null)
  const [bloomOn, setBloomOn] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const size = PRESS_SIZES.find((s) => s.id === sizeId) ?? PRESS_SIZES[5]
  const strength = STRENGTHS.find((s) => s.id === strengthId) ?? STRENGTHS[1]
  const water = customWater ?? size.water
  const coffee = water / strength.ratio
  const tbsp = coffee / GRAMS_PER_TBSP
  const scoops = coffee / GRAMS_PER_SCOOP
  const mugs = water / 250
  const bloomWater = round(coffee * 2)

  const totalSeconds = bloomOn ? BLOOM_SECONDS + STEEP_SECONDS : STEEP_SECONDS
  const inBloom = bloomOn && elapsed < BLOOM_SECONDS
  const steepElapsed = bloomOn ? Math.max(0, elapsed - BLOOM_SECONDS) : elapsed
  const done = elapsed >= totalSeconds
  const phaseLabel = done
    ? 'Plunge now'
    : inBloom
      ? 'Bloom'
      : 'Steep'

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setElapsed((e) => {
        if (e + 1 >= totalSeconds) {
          setRunning(false)
          return totalSeconds
        }
        return e + 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, totalSeconds])

  function resetTimer() {
    setRunning(false)
    setElapsed(0)
  }

  const gramsPerLiter = round(1000 / strength.ratio, 0)

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="mb-5 rounded-xl border border-accent/35 bg-accent/10 px-4 py-3.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          French press coffee ratio — grams per liter
        </p>
        <p className="mt-1 font-serif text-2xl font-semibold text-foreground md:text-3xl">
          {gramsPerLiter} g per liter{' '}
          <span className="text-lg font-sans font-medium text-muted-foreground">
            (1:{strength.ratio}
            {strengthId === 'classic' ? ' classic' : ''})
          </span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Classic starting point is <strong className="text-foreground">67 g/L at 1:15</strong> —
          about 17 g per 250 ml mug. Pick your press size below; the dose updates live.
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              French press / cafetière size
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {PRESS_SIZES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSizeId(item.id)
                    setCustomWater(null)
                  }}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    sizeId === item.id && customWater === null
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

          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-1 flex items-baseline justify-between">
              <label className="text-sm font-medium text-foreground">Water</label>
              <span className="text-xs text-muted-foreground">g / ml</span>
            </div>
            <input
              type="number"
              inputMode="decimal"
              min={100}
              step={10}
              value={round(water)}
              onChange={(e) => setCustomWater(Math.max(100, Number(e.target.value)))}
              className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK_WATER.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => setCustomWater(q.water)}
                  className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground hover:border-accent/50"
                >
                  {q.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Leave ~2 cm of headroom under the lid so grounds can bloom. Classic French press
              coffee ratio is 1:15 by weight.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Strength ({strength.label.toLowerCase()} · 1:{strength.ratio})
            </label>
            <div className="grid gap-2 sm:grid-cols-3">
              {STRENGTHS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStrengthId(item.id)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    strengthId === item.id
                      ? 'border-accent bg-accent/10'
                      : 'border-border bg-background hover:border-accent/50'
                  }`}
                >
                  <div className="font-semibold text-foreground">{item.label}</div>
                  <div className="text-xs text-muted-foreground">
                    1:{item.ratio} · {item.note}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-foreground">4-minute steep timer</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Optional 30s bloom, then steep — plunge reminder at the end
                </p>
              </div>
              <label className="inline-flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={bloomOn}
                  onChange={(e) => {
                    setBloomOn(e.target.checked)
                    resetTimer()
                  }}
                  className="size-4 accent-[var(--accent)]"
                />
                Bloom first
              </label>
            </div>

            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {phaseLabel}
                </p>
                <p className="mt-1 font-serif text-4xl font-semibold tabular-nums text-foreground">
                  {done
                    ? '0:00'
                    : inBloom
                      ? formatTime(BLOOM_SECONDS - elapsed)
                      : formatTime(STEEP_SECONDS - steepElapsed)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {bloomOn
                    ? `Total ${formatTime(totalSeconds)} · elapsed ${formatTime(elapsed)}`
                    : `4:00 steep · elapsed ${formatTime(elapsed)}`}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRunning((r) => !r)}
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

            {inBloom && (
              <p className="mt-3 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
                Pour ~{bloomWater} g (~2× dose), stir gently, wait — then fill to {round(water)} g.
              </p>
            )}
            {!inBloom && !done && bloomOn && elapsed >= BLOOM_SECONDS && (
              <p className="mt-3 rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground">
                Fill to {round(water)} g and steep. Break the crust near the end.
              </p>
            )}
            {done && (
              <p className="mt-3 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm font-medium text-foreground">
                Time&apos;s up — plunge slowly, then decant immediately so it doesn&apos;t keep
                extracting.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
          <h2 className="font-serif text-xl font-semibold text-foreground">
            Your French press coffee ratio
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat label="Coffee (coarse)" value={`${round(coffee)} g`} big />
            <Stat label="Water" value={`${round(water)} g`} />
            <Stat label="Tablespoons" value={`≈ ${round(tbsp, 1)}`} />
            <Stat label="Scoops" value={`≈ ${round(scoops, 1)}`} />
            <Stat label="Approx mugs" value={`≈ ${round(mugs, 1)}`} />
            <Stat label="Ratio" value={`1:${strength.ratio}`} />
          </div>

          <div className="mt-5 space-y-2 border-t border-border/60 pt-4 text-sm text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Grind:</span> coarse (like sea salt) —{' '}
              <Link
                href="/tools/grind-size-chart?method=french-press"
                className="text-accent hover:underline"
              >
                open grind chart
              </Link>
            </p>
            <p>
              <span className="font-medium text-foreground">Steep / brew time:</span> 4 minutes
              {bloomOn ? ' (+ optional 30s bloom)' : ''}
            </p>
            <p>
              <span className="font-medium text-foreground">Water temp:</span> ~93–96°C (200–205°F)
            </p>
            <p>
              <span className="font-medium text-foreground">Finish:</span> press slowly, then
              decant immediately
            </p>
            <p>
              <span className="font-medium text-foreground">Muddy / sludge?</span> Grind coarser,
              plunge gently, pour soon — see the FAQ below.
            </p>
          </div>
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
