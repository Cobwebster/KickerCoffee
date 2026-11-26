'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react'

type ProfileId = 'v60' | 'chemex' | 'kalita' | 'switch'

type Phase = {
  name: string
  start: number
  end: number
  targetPct: number
  instruction: string
}

const PROFILES: {
  id: ProfileId
  label: string
  tempNote: string
  blurb: string
  defaultDose: number
  defaultRatio: number
  build: (dose: number, ratio: number) => Phase[]
}[] = [
  {
    id: 'v60',
    label: 'V60 (3 pour)',
    tempNote: 'Water ~93–96°C (200–205°F). Fresh light roasts like the hotter end.',
    blurb: 'Classic bloom + two pours. Target ~2:30–3:30 total for a single cup.',
    defaultDose: 20,
    defaultRatio: 16,
    build: (dose, ratio) => {
      const total = dose * ratio
      const bloom = Math.round(dose * 2)
      const firstTarget = Math.round(total * 0.6)
      return [
        {
          name: 'Bloom',
          start: 0,
          end: 45,
          targetPct: bloom / total,
          instruction: `Pour ${bloom} g (~2× dose) to wet all grounds. Wait for CO₂ to release.`,
        },
        {
          name: 'First pour',
          start: 45,
          end: 75,
          targetPct: firstTarget / total,
          instruction: `Spiral up to ${firstTarget} g total.`,
        },
        {
          name: 'Second pour',
          start: 75,
          end: 105,
          targetPct: 1,
          instruction: `Top up to ${Math.round(total)} g in the center.`,
        },
        {
          name: 'Drawdown',
          start: 105,
          end: 195,
          targetPct: 1,
          instruction: 'Stop pouring. Let it drain, swirl, and serve.',
        },
      ]
    },
  },
  {
    id: 'chemex',
    label: 'Chemex',
    tempNote: 'Water ~92–96°C. Thick filters run slower — don’t chase V60 times.',
    blurb: 'Longer bloom and slower pours for a cleaner, tea-like cup.',
    defaultDose: 30,
    defaultRatio: 16,
    build: (dose, ratio) => {
      const total = dose * ratio
      const bloom = Math.round(dose * 2.5)
      const mid = Math.round(total * 0.55)
      return [
        {
          name: 'Bloom',
          start: 0,
          end: 50,
          targetPct: bloom / total,
          instruction: `Pour ${bloom} g and bloom ~45–50 s. Chemex beds are deeper.`,
        },
        {
          name: 'Main pour',
          start: 50,
          end: 140,
          targetPct: mid / total,
          instruction: `Steady pour to ~${mid} g. Keep the bed flat.`,
        },
        {
          name: 'Finish pour',
          start: 140,
          end: 190,
          targetPct: 1,
          instruction: `Reach ${Math.round(total)} g. Avoid drowning the walls.`,
        },
        {
          name: 'Drawdown',
          start: 190,
          end: 310,
          targetPct: 1,
          instruction: 'Drawdown often lands ~4–5+ min total. If slower, grind coarser.',
        },
      ]
    },
  },
  {
    id: 'kalita',
    label: 'Kalita Wave',
    tempNote: 'Water ~92–95°C. Flat bed = more even extraction than cone drippers.',
    blurb: 'Pulse pours over a flat bed. Slightly coarser than V60 medium-fine.',
    defaultDose: 21,
    defaultRatio: 16,
    build: (dose, ratio) => {
      const total = dose * ratio
      const bloom = Math.round(dose * 2)
      const p1 = Math.round(total * 0.4)
      const p2 = Math.round(total * 0.7)
      return [
        {
          name: 'Bloom',
          start: 0,
          end: 40,
          targetPct: bloom / total,
          instruction: `Pour ${bloom} g to wet evenly. Short bloom is fine on Wave.`,
        },
        {
          name: 'Pulse 1',
          start: 40,
          end: 70,
          targetPct: p1 / total,
          instruction: `Pulse to ${p1} g. Center pours keep the bed flat.`,
        },
        {
          name: 'Pulse 2',
          start: 70,
          end: 100,
          targetPct: p2 / total,
          instruction: `Pulse to ${p2} g.`,
        },
        {
          name: 'Pulse 3',
          start: 100,
          end: 130,
          targetPct: 1,
          instruction: `Final pulse to ${Math.round(total)} g.`,
        },
        {
          name: 'Drawdown',
          start: 130,
          end: 210,
          targetPct: 1,
          instruction: 'Let it drain. Target ~3:00–3:30 total for most cups.',
        },
      ]
    },
  },
  {
    id: 'switch',
    label: 'Hario Switch',
    tempNote: 'Water ~93–96°C. Immersion first, then open for drawdown.',
    blurb: 'Closed bloom/steep, then open the switch for a hybrid immersion-pour-over.',
    defaultDose: 20,
    defaultRatio: 15,
    build: (dose, ratio) => {
      const total = dose * ratio
      const bloom = Math.round(dose * 2)
      return [
        {
          name: 'Bloom (closed)',
          start: 0,
          end: 45,
          targetPct: bloom / total,
          instruction: `Switch closed. Pour ${bloom} g and swirl gently.`,
        },
        {
          name: 'Fill (closed)',
          start: 45,
          end: 75,
          targetPct: 1,
          instruction: `Still closed — fill to ${Math.round(total)} g. Steep.`,
        },
        {
          name: 'Steep',
          start: 75,
          end: 135,
          targetPct: 1,
          instruction: 'Keep closed ~1 minute. Agitate lightly if the bed looks dry on top.',
        },
        {
          name: 'Open & drawdown',
          start: 135,
          end: 210,
          targetPct: 1,
          instruction: 'Open the switch. Drawdown should finish clean; grind coarser if it stalls.',
        },
      ]
    },
  },
]

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function playBeep() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = 880
    gain.gain.value = 0.04
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18)
    osc.stop(ctx.currentTime + 0.2)
    window.setTimeout(() => ctx.close(), 300)
  } catch {
    /* ignore autoplay / unsupported */
  }
}

export function BrewTimer() {
  const [profileId, setProfileId] = useState<ProfileId>('v60')
  const profile = PROFILES.find((p) => p.id === profileId)!
  const [dose, setDose] = useState(profile.defaultDose)
  const [ratio, setRatio] = useState(profile.defaultRatio)
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [beepOn, setBeepOn] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const lastPhaseRef = useRef<string | null>(null)

  const phases = profile.build(dose, ratio)
  const total = dose * ratio
  const finish = phases[phases.length - 1].end
  const active = phases.find((p) => elapsed >= p.start && elapsed < p.end) ?? null
  const targetWeight = active ? Math.round(total * active.targetPct) : Math.round(total)
  const done = elapsed >= finish

  useEffect(() => {
    if (running || elapsed > 0) return
    setDose(profile.defaultDose)
    setRatio(profile.defaultRatio)
  }, [profileId]) // eslint-disable-line react-hooks/exhaustive-deps

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

  useEffect(() => {
    const name = done ? 'Done' : active?.name ?? null
    if (!name) return
    if (lastPhaseRef.current && lastPhaseRef.current !== name && beepOn) {
      playBeep()
    }
    lastPhaseRef.current = name
  }, [active?.name, done, beepOn])

  function reset() {
    setRunning(false)
    setElapsed(0)
    lastPhaseRef.current = null
  }

  function selectProfile(id: ProfileId) {
    if (running || elapsed > 0) return
    setProfileId(id)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <p className="mb-2 text-sm font-medium text-foreground">Brewer profile</p>
      <div className="flex flex-wrap gap-2">
        {PROFILES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => selectProfile(p.id)}
            disabled={running || elapsed > 0}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${
              profileId === p.id
                ? 'border-accent bg-accent text-accent-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-accent/50'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{profile.blurb}</p>
      <p className="mt-1.5 rounded-lg border border-accent/20 bg-accent/10 px-3 py-2 text-xs leading-relaxed text-foreground">
        Water temp: {profile.tempNote}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
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
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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
          <button
            type="button"
            onClick={() => setBeepOn((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            aria-pressed={beepOn}
          >
            {beepOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            {beepOn ? 'Beep on' : 'Beep off'}
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
