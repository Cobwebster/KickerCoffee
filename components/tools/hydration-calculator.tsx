'use client'

import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'kc-hydration-log'

const ACTIVITY = [
  { id: 'desk', label: 'Mostly desk / easy day', mult: 1 },
  { id: 'light', label: 'Walking / light training', mult: 1.2 },
  { id: 'sweat', label: 'Hot day or hard workout', mult: 1.45 },
] as const

type Persisted = {
  day: string
  units: 'metric' | 'imperial'
  sex: 'female' | 'male'
  heightCm: number
  heightFt: number
  heightIn: number
  weightKg: number
  weightLb: number
  waterGlasses: number
  coffeeCups: number
  teaCups: number
  activity: (typeof ACTIVITY)[number]['id']
  workoutBump: boolean
}

function todayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function bsaM2(heightCm: number, weightKg: number) {
  return Math.sqrt((heightCm * weightKg) / 3600)
}

/** Hume–Weyers estimate of total body water (litres). */
function tbwLitres(sex: 'female' | 'male', heightCm: number, weightKg: number) {
  const tbw =
    sex === 'male'
      ? 0.194786 * heightCm + 0.296785 * weightKg - 14.012934
      : 0.344547 * heightCm + 0.183809 * weightKg - 35.270121
  return clamp(tbw, 18, 65)
}

function loadPersisted(): Partial<Persisted> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as Persisted
    if (data.day !== todayKey()) return null
    return data
  } catch {
    return null
  }
}

export function HydrationCalculator() {
  const [ready, setReady] = useState(false)
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric')
  const [sex, setSex] = useState<'female' | 'male'>('female')
  const [heightCm, setHeightCm] = useState(168)
  const [heightFt, setHeightFt] = useState(5)
  const [heightIn, setHeightIn] = useState(6)
  const [weightKg, setWeightKg] = useState(68)
  const [weightLb, setWeightLb] = useState(150)
  const [waterGlasses, setWaterGlasses] = useState(4)
  const [coffeeCups, setCoffeeCups] = useState(2)
  const [teaCups, setTeaCups] = useState(0)
  const [activity, setActivity] = useState<(typeof ACTIVITY)[number]['id']>('desk')
  const [workoutBump, setWorkoutBump] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)

  useEffect(() => {
    const saved = loadPersisted()
    if (saved) {
      if (saved.units) setUnits(saved.units)
      if (saved.sex) setSex(saved.sex)
      if (saved.heightCm != null) setHeightCm(saved.heightCm)
      if (saved.heightFt != null) setHeightFt(saved.heightFt)
      if (saved.heightIn != null) setHeightIn(saved.heightIn)
      if (saved.weightKg != null) setWeightKg(saved.weightKg)
      if (saved.weightLb != null) setWeightLb(saved.weightLb)
      if (saved.waterGlasses != null) setWaterGlasses(saved.waterGlasses)
      if (saved.coffeeCups != null) setCoffeeCups(saved.coffeeCups)
      if (saved.teaCups != null) setTeaCups(saved.teaCups)
      if (saved.activity) setActivity(saved.activity)
      if (saved.workoutBump != null) setWorkoutBump(saved.workoutBump)
    }
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      const payload: Persisted = {
        day: todayKey(),
        units,
        sex,
        heightCm,
        heightFt,
        heightIn,
        weightKg,
        weightLb,
        waterGlasses,
        coffeeCups,
        teaCups,
        activity,
        workoutBump,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      /* ignore */
    }
  }, [
    ready,
    units,
    sex,
    heightCm,
    heightFt,
    heightIn,
    weightKg,
    weightLb,
    waterGlasses,
    coffeeCups,
    teaCups,
    activity,
    workoutBump,
  ])

  const cm = units === 'metric' ? heightCm : heightFt * 30.48 + heightIn * 2.54
  const kg = units === 'metric' ? weightKg : weightLb * 0.453592
  const glassMl = units === 'metric' ? 250 : 240
  const cupMl = units === 'metric' ? 240 : 240

  const result = useMemo(() => {
    const bsa = bsaM2(cm, kg)
    const tbw = tbwLitres(sex, cm, kg)
    const act = ACTIVITY.find((a) => a.id === activity)!.mult
    const sweatExtra = workoutBump ? 1.15 : 1
    const target = clamp(35 * kg * (bsa / 1.73) * act * sweatExtra, 1400, 5500)
    const waterMl = waterGlasses * glassMl
    const coffeeMl = coffeeCups * cupMl
    const teaMl = teaCups * cupMl
    const intake = waterMl + coffeeMl + teaMl
    const pct = target > 0 ? (intake / target) * 100 : 0
    const remaining = Math.max(0, target - intake)
    return {
      bsa: round(bsa, 2),
      tbw: round(tbw, 1),
      target,
      waterMl,
      coffeeMl,
      teaMl,
      intake,
      pct,
      remaining,
      glassesLeft: remaining / glassMl,
    }
  }, [activity, cm, coffeeCups, cupMl, glassMl, kg, sex, teaCups, waterGlasses, workoutBump])

  let status = 'On track for a typical day'
  let bar = 'bg-accent'
  if (result.pct < 55) {
    status = 'Behind — you likely need more fluid today'
    bar = 'bg-destructive'
  } else if (result.pct < 85) {
    status = 'A bit low versus today’s estimate'
    bar = 'bg-accent'
  } else if (result.pct > 160) {
    status = 'Well above target — extra water is not always better'
    bar = 'bg-accent'
  } else if (result.pct > 115) {
    status = 'Ahead of today’s estimated target'
    bar = 'bg-accent'
  }

  const barWidth = Math.min(100, result.pct)

  function flashSaved() {
    setSavedFlash(true)
    window.setTimeout(() => setSavedFlash(false), 1600)
  }

  function clearToday() {
    setWaterGlasses(0)
    setCoffeeCups(0)
    setTeaCups(0)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    flashSaved()
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'metric', label: 'Metric' },
              { id: 'imperial', label: 'US' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setUnits(item.id)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                units === item.id
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-accent/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {savedFlash && (
            <span className="text-xs font-medium text-accent">Saved for today</span>
          )}
          <button
            type="button"
            onClick={() => {
              flashSaved()
            }}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
          >
            Save today
          </button>
          <button
            type="button"
            onClick={clearToday}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
          >
            Reset log
          </button>
        </div>
      </div>
      <p className="mb-5 text-xs text-muted-foreground">
        Today’s glasses auto-save in this browser (clears next calendar day).
      </p>

      <div className="mb-5">
        <p className="mb-2 text-sm font-medium text-foreground">Body (used for height × weight estimate)</p>
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'female', label: 'Female formula' },
              { id: 'male', label: 'Male formula' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSex(item.id)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                sex === item.id
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-accent/50'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Sex only changes the total-body-water equation (Hume). It is not a diagnosis.
        </p>
      </div>

      {units === 'metric' ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="hy-cm" className="mb-2 block text-sm font-medium text-foreground">
              Height (cm)
            </label>
            <input
              id="hy-cm"
              type="number"
              min={120}
              max={220}
              value={heightCm}
              onChange={(e) => setHeightCm(clamp(Number(e.target.value) || 0, 120, 220))}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="hy-kg" className="mb-2 block text-sm font-medium text-foreground">
              Weight (kg)
            </label>
            <input
              id="hy-kg"
              type="number"
              min={35}
              max={200}
              value={weightKg}
              onChange={(e) => setWeightKg(clamp(Number(e.target.value) || 0, 35, 200))}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
            />
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="hy-ft" className="mb-2 block text-sm font-medium text-foreground">
              Height (ft)
            </label>
            <input
              id="hy-ft"
              type="number"
              min={4}
              max={7}
              value={heightFt}
              onChange={(e) => setHeightFt(clamp(Number(e.target.value) || 0, 4, 7))}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="hy-in" className="mb-2 block text-sm font-medium text-foreground">
              Inches
            </label>
            <input
              id="hy-in"
              type="number"
              min={0}
              max={11}
              value={heightIn}
              onChange={(e) => setHeightIn(clamp(Number(e.target.value) || 0, 0, 11))}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="hy-lb" className="mb-2 block text-sm font-medium text-foreground">
              Weight (lb)
            </label>
            <input
              id="hy-lb"
              type="number"
              min={80}
              max={440}
              value={weightLb}
              onChange={(e) => setWeightLb(clamp(Number(e.target.value) || 0, 80, 440))}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
            />
          </div>
        </div>
      )}

      <label htmlFor="hy-act" className="mb-2 mt-5 block text-sm font-medium text-foreground">
        Day type
      </label>
      <select
        id="hy-act"
        value={activity}
        onChange={(e) => setActivity(e.target.value as typeof activity)}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
      >
        {ACTIVITY.map((a) => (
          <option key={a.id} value={a.id}>
            {a.label}
          </option>
        ))}
      </select>

      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-background px-4 py-3">
        <input
          type="checkbox"
          checked={workoutBump}
          onChange={(e) => setWorkoutBump(e.target.checked)}
          className="mt-1 accent-[var(--accent)]"
        />
        <span>
          <span className="block text-sm font-medium text-foreground">
            Extra sweat / workout bump (+15%)
          </span>
          <span className="mt-0.5 block text-xs text-muted-foreground">
            Stacks on day type for a long run, hot commute, or sauna — still a rough estimate, not
            sweat-loss science.
          </span>
        </span>
      </label>

      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <label htmlFor="hy-water" className="text-sm font-medium text-foreground">
            Water you’ve had ({units === 'metric' ? '250 ml' : '8 oz'} glasses)
          </label>
          <span className="text-sm font-semibold text-foreground">{waterGlasses}</span>
        </div>
        <input
          id="hy-water"
          type="range"
          min={0}
          max={16}
          value={waterGlasses}
          onChange={(e) => setWaterGlasses(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <label htmlFor="hy-coffee" className="text-sm font-medium text-foreground">
            Coffee cups (count toward fluids)
          </label>
          <span className="text-sm font-semibold text-foreground">{coffeeCups}</span>
        </div>
        <input
          id="hy-coffee"
          type="range"
          min={0}
          max={8}
          value={coffeeCups}
          onChange={(e) => setCoffeeCups(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <label htmlFor="hy-tea" className="text-sm font-medium text-foreground">
            Tea cups (count toward fluids)
          </label>
          <span className="text-sm font-semibold text-foreground">{teaCups}</span>
        </div>
        <input
          id="hy-tea"
          type="range"
          min={0}
          max={8}
          value={teaCups}
          onChange={(e) => setTeaCups(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Moderate coffee and tea still count as fluid for most regular drinkers. Alcohol is not
          modeled.
        </p>
      </div>

      <div className="mt-6 rounded-2xl bg-secondary p-6 text-center">
        <div className="text-sm text-muted-foreground">Estimated intake vs daily target</div>
        <div className="mt-1 font-serif text-5xl font-semibold text-foreground">
          {round(result.pct, 0)}%
        </div>
        <p className="mt-2 text-sm font-medium text-foreground">{status}</p>
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-background">
          <div className={`h-full rounded-full transition-all ${bar}`} style={{ width: `${barWidth}%` }} />
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">You’ve had</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
            {round(result.intake / 1000, 2)} L
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {round(result.waterMl)} ml water · {round(result.coffeeMl)} ml coffee ·{' '}
            {round(result.teaMl)} ml tea
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Today’s target</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
            {round(result.target / 1000, 2)} L
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            ~{round(result.target / glassMl, 1)} glasses for your size & day
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Still to drink</p>
          <p className="mt-1 font-serif text-2xl font-semibold text-foreground">
            {result.remaining <= 0 ? '0' : round(result.glassesLeft, 1)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {result.remaining <= 0 ? 'Target met' : `glasses (~${round(result.remaining)} ml)`}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Rough adult estimate from weight, height (body-surface scaling), and a Hume total-body-water
        check (~{result.tbw} L TBW, BSA {result.bsa} m²). Not a medical test — urine color, thirst,
        heat, illness, and electrolytes matter more than this bar.
      </p>
    </div>
  )
}
