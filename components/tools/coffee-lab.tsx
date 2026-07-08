'use client'

import { useState, useEffect, useRef } from 'react'

type Bean =
  | 'Ethiopia' | 'Colombia' | 'Brazil' | 'Guatemala' | 'Kenya'
  | 'Panama' | 'Indonesia' | 'Yemen' | 'Rwanda' | 'Honduras'

type BrewMethod = 'Pour Over' | 'French Press' | 'Espresso' | 'AeroPress' | 'Cold Brew'

type Profile = {
  acidity: number
  sweetness: number
  bitterness: number
  body: number
  aroma: number
}

type BrewResult = {
  profile: Profile
  extraction: number
  notes: string[]
  verdict: string
  verdictType: 'good' | 'warn'
  roastColor: string
}

const BEAN_BASE: Record<Bean, { acidity: number; sweetness: number; aroma: number }> = {
  Ethiopia:  { acidity: 85, sweetness: 75, aroma: 92 },
  Colombia:  { acidity: 60, sweetness: 82, aroma: 72 },
  Brazil:    { acidity: 24, sweetness: 70, aroma: 56 },
  Guatemala: { acidity: 54, sweetness: 64, aroma: 66 },
  Kenya:     { acidity: 96, sweetness: 58, aroma: 86 },
  Panama:    { acidity: 72, sweetness: 88, aroma: 94 },
  Indonesia: { acidity: 20, sweetness: 50, aroma: 62 },
  Yemen:     { acidity: 68, sweetness: 55, aroma: 78 },
  Rwanda:    { acidity: 78, sweetness: 72, aroma: 82 },
  Honduras:  { acidity: 56, sweetness: 74, aroma: 68 },
}

const BEAN_EMOJI: Record<Bean, string> = {
  Ethiopia: '🇪🇹', Colombia: '🇨🇴', Brazil: '🇧🇷',
  Guatemala: '🇬🇹', Kenya: '🇰🇪', Panama: '🇵🇦',
  Indonesia: '🇮🇩', Yemen: '🇾🇪', Rwanda: '🇷🇼', Honduras: '🇭🇳',
}

const BEAN_NOTES: Record<Bean, string[]> = {
  Ethiopia:  ['Blueberry', 'Jasmine', 'Bergamot', 'Lemon', 'Peach'],
  Colombia:  ['Caramel', 'Red Apple', 'Hazelnut', 'Milk Chocolate'],
  Brazil:    ['Dark Chocolate', 'Peanut', 'Brown Sugar', 'Walnut'],
  Guatemala: ['Cocoa', 'Brown Spice', 'Toffee', 'Dried Fruit'],
  Kenya:     ['Blackcurrant', 'Grapefruit', 'Tomato', 'Blackberry'],
  Panama:    ['Jasmine', 'Mango', 'Lychee', 'Peach'],
  Indonesia: ['Cedar', 'Earth', 'Tobacco', 'Dark Chocolate'],
  Yemen:     ['Wine', 'Dried Fruit', 'Incense', 'Chocolate'],
  Rwanda:    ['Hibiscus', 'Orange', 'Black Tea', 'Brown Sugar'],
  Honduras:  ['Peach', 'Mango', 'Caramel', 'Milk Chocolate'],
}

function calcResult(
  bean: Bean,
  roast: number,
  grind: number,
  temp: number,
  ratio: number,
  method: BrewMethod,
): BrewResult {
  const base = BEAN_BASE[bean]

  const roastBitter = roast * 0.5
  const roastAcid   = base.acidity - roast * 0.6
  const roastSweet  = roast < 40
    ? base.sweetness - (40 - roast) * 0.3
    : roast > 70
    ? base.sweetness - (roast - 70) * 0.4
    : base.sweetness

  const grindExtract = 100 - grind * 0.7
  const grindBitter  = grind < 30 ? roastBitter + (30 - grind) * 0.5 : roastBitter
  const grindSour    = grind > 70 ? (grind - 70) * 0.6 : 0

  const tempBoost  = (temp - 85) * 0.8
  const tempBitter = roast > 60 ? (temp - 90) * 0.4 : 0

  const ratioScale = ((ratio - 13) / 5) * 100
  const ratioBody  = 80 - ratioScale * 0.4

  const methodMod: Record<BrewMethod, { body: number; bitter: number; acid: number }> = {
    'Pour Over':    { body: 0,   bitter: 0,    acid: 5   },
    'French Press': { body: 20,  bitter: 8,    acid: -5  },
    Espresso:       { body: 30,  bitter: 15,   acid: 5   },
    AeroPress:      { body: 10,  bitter: 5,    acid: 0   },
    'Cold Brew':    { body: 15,  bitter: -20,  acid: -25 },
  }
  const mod = methodMod[method]

  const clamp = (v: number) => Math.max(5, Math.min(98, v))
  const acidity    = clamp(roastAcid + tempBoost * 0.3 + grindSour * -0.5 + mod.acid)
  const sweetness  = clamp(roastSweet - grindSour * 0.4 + (method === 'Cold Brew' ? 15 : 0))
  const bitterness = clamp(grindBitter + tempBitter + mod.bitter + (roast > 80 ? 10 : 0))
  const body       = clamp(ratioBody + mod.body + roast * 0.15)
  const aroma      = clamp(base.aroma - roast * 0.1 + temp * 0.2 - 15)

  const extraction = clamp(
    grindExtract * 0.4 + (temp - 85) * 1.2
    + (method === 'Espresso' ? 10 : 0)
    + (method === 'Cold Brew' ? -15 : 0)
  )

  const allNotes = BEAN_NOTES[bean]
  const notes = roast < 35 ? allNotes.slice(0, 3) : roast < 65 ? allNotes.slice(1, 3) : ['Dark Chocolate', 'Caramel', 'Smoke'].slice(0, 2)

  const underExtracted = extraction < 35
  const overExtracted  = extraction > 78
  const tooBitter      = bitterness > 72 && !underExtracted
  const tooAcid        = acidity > 85 && !overExtracted

  const verdict = underExtracted
    ? 'Under-extracted — sour, hollow, thin. Try finer grind or bump the temperature.'
    : overExtracted
    ? 'Over-extracted — bitter, harsh, astringent. Try coarser grind or lower temperature.'
    : tooBitter
    ? 'Bitterness is dominant. Pull back on roast level or drop brew temperature a few degrees.'
    : tooAcid
    ? 'Very high acidity. Try a medium roast or lower water temperature to soften the brightness.'
    : 'Well-balanced extraction. Dialed in — this should taste excellent.'

  const verdictType: 'good' | 'warn' = (!underExtracted && !overExtracted && !tooBitter && !tooAcid) ? 'good' : 'warn'

  const roastColor =
    roast < 28 ? '#d4a96a'
    : roast < 50 ? '#a0622e'
    : roast < 72 ? '#6b3520'
    : '#2c1508'

  return { profile: { acidity, sweetness, bitterness, body, aroma }, extraction, notes, verdict, verdictType, roastColor }
}

// ── Animated bar ──────────────────────────────────────────────────────────────
function AnimatedBar({ label, value, color, delay = 0 }: { label: string; value: number; color: string; delay?: number }) {
  const [displayed, setDisplayed] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setDisplayed(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-white/60">{label}</span>
        <span className="tabular-nums font-semibold" style={{ color }}>{Math.round(displayed)}</span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/8">
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${displayed}%`,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}50`,
            transition: 'width 0.8s cubic-bezier(0.34,1.3,0.64,1)',
          }}
        />
      </div>
    </div>
  )
}

// ── Slider ────────────────────────────────────────────────────────────────────
function Slider({
  label, sub, min, max, value, onChange, leftLabel, rightLabel, step = 1,
}: {
  label: string; sub?: string; min: number; max: number; value: number; step?: number
  onChange: (v: number) => void; leftLabel: string; rightLabel: string
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-semibold text-white/70">{label}</span>
        <span className="text-xs tabular-nums font-bold text-amber-400">
          {value}{sub ?? ''}
        </span>
      </div>
      <div className="relative h-7 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-white/8">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-amber-600"
            style={{ width: `${pct}%`, transition: 'width 0.1s' }}
          />
        </div>
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full cursor-pointer appearance-none bg-transparent
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:size-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-amber-400
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-amber-300
            [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(251,191,36,0.5)]
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:size-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-amber-400
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-amber-300"
          aria-label={label}
        />
      </div>
      <div className="flex justify-between text-[10px] text-white/25">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  )
}

// ── Brew cup SVG (animated steam) ─────────────────────────────────────────────
function BrewCup({ color, active }: { color: string; active: boolean }) {
  return (
    <div className="relative flex items-center justify-center" aria-hidden="true">
      <div
        className="size-16 rounded-full border-4 border-white/10 shadow-inner transition-colors duration-700"
        style={{ background: color }}
      />
      {active && (
        <div className="absolute -top-5 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-px rounded-full bg-white/30"
              style={{
                height: '18px',
                animationName: 'steam-rise',
                animationDuration: '1.4s',
                animationDelay: `${i * 0.3}s`,
                animationTimingFunction: 'ease-out',
                animationIterationCount: 'infinite',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Chip button ───────────────────────────────────────────────────────────────
function ChipButton({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
        active
          ? 'border-amber-600 bg-amber-900/50 text-amber-300 shadow-[0_0_8px_rgba(217,119,6,0.3)]'
          : 'border-white/10 bg-white/4 text-white/40 hover:border-amber-800/60 hover:text-white/70'
      }`}
    >
      {label}
    </button>
  )
}

// ── Extraction zone indicator ──────────────────────────────────────────────────
function ExtractionMeter({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setDisplayed(value), 50)
    return () => clearTimeout(t)
  }, [value])

  const zone =
    displayed < 35 ? { label: 'Under', color: '#60a5fa' }
    : displayed > 78 ? { label: 'Over', color: '#f87171' }
    : { label: 'Ideal', color: '#4ade80' }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-white/50">Extraction</span>
        <span className="tabular-nums font-bold" style={{ color: zone.color }}>
          {Math.round(displayed)}% — {zone.label}
        </span>
      </div>
      {/* Track with zones */}
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/8">
        {/* Ideal zone highlight */}
        <div
          className="absolute inset-y-0 bg-green-500/10"
          style={{ left: '35%', width: '43%' }}
        />
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
          style={{
            width: `${displayed}%`,
            background: zone.color,
            boxShadow: `0 0 8px ${zone.color}60`,
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-white/25">
        <span>Under</span>
        <span className="text-green-500/50">Ideal 35–78%</span>
        <span>Over</span>
      </div>
    </div>
  )
}

const METHODS: BrewMethod[] = ['Pour Over', 'French Press', 'Espresso', 'AeroPress', 'Cold Brew']
const BEANS: Bean[] = ['Ethiopia', 'Colombia', 'Brazil', 'Guatemala', 'Kenya', 'Panama', 'Indonesia', 'Yemen', 'Rwanda', 'Honduras']

export function CoffeeLabSimulator() {
  const [bean, setBean]       = useState<Bean>('Ethiopia')
  const [roast, setRoast]     = useState(30)
  const [grind, setGrind]     = useState(40)
  const [temp, setTemp]       = useState(93)
  const [ratio, setRatio]     = useState(16)
  const [method, setMethod]   = useState<BrewMethod>('Pour Over')
  const [brewing, setBrewing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult]   = useState<BrewResult | null>(null)
  const intervalRef           = useRef<ReturnType<typeof setInterval> | null>(null)

  function brew() {
    if (brewing) return
    setBrewing(true)
    setResult(null)
    setProgress(0)
    let p = 0
    intervalRef.current = setInterval(() => {
      p += Math.random() * 14 + 5
      setProgress(Math.min(p, 100))
      if (p >= 100) {
        clearInterval(intervalRef.current!)
        setResult(calcResult(bean, roast, grind, temp, ratio, method))
        setBrewing(false)
      }
    }, 70)
  }

  const roastLabel = roast < 33 ? 'Light' : roast < 66 ? 'Medium' : 'Dark'
  const roastColor = result?.roastColor ?? (
    roast < 28 ? '#d4a96a' : roast < 50 ? '#a0622e' : roast < 72 ? '#6b3520' : '#2c1508'
  )

  return (
    <>
      {/* keyframes for steam */}
      <style>{`
        @keyframes steam-rise {
          0% { opacity: 0; transform: translateY(0) scaleX(1); }
          40% { opacity: 0.5; }
          100% { opacity: 0; transform: translateY(-14px) scaleX(2); }
        }
      `}</style>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#100b07] text-white shadow-2xl">

        {/* Top bar */}
        <div className="flex items-center gap-3 border-b border-white/8 px-5 py-3.5">
          <span className="size-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">
            Coffee Lab — Brew Simulator
          </span>
        </div>

        <div className="grid md:grid-cols-[1fr_1px_1fr]">

          {/* ── LEFT: Controls ── */}
          <div className="flex flex-col gap-5 p-6">

            {/* Bean selector */}
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Bean Origin</p>
              <div className="grid grid-cols-5 gap-1.5">
                {BEANS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBean(b)}
                    className={`flex flex-col items-center gap-0.5 rounded-xl border p-2 transition-all duration-150 ${
                      bean === b
                        ? 'border-amber-600 bg-amber-900/40 shadow-[0_0_10px_rgba(217,119,6,0.2)]'
                        : 'border-white/8 bg-white/3 hover:border-amber-800/50'
                    }`}
                    aria-pressed={bean === b}
                    aria-label={b}
                  >
                    <span className="text-base leading-none">{BEAN_EMOJI[b]}</span>
                    <span className={`text-[9px] font-semibold leading-tight ${bean === b ? 'text-amber-300' : 'text-white/30'}`}>
                      {b.length > 8 ? b.slice(0, 7) + '…' : b}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brew method */}
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Brew Method</p>
              <div className="flex flex-wrap gap-1.5">
                {METHODS.map((m) => (
                  <ChipButton key={m} label={m} active={method === m} onClick={() => setMethod(m)} />
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/6" />

            {/* Sliders */}
            <div className="flex flex-col gap-4">
              <Slider
                label="Roast Level" sub={` (${roastLabel})`}
                min={0} max={100} value={roast} onChange={setRoast}
                leftLabel="Light" rightLabel="Dark"
              />
              <Slider
                label="Grind Size"
                min={0} max={100} value={grind} onChange={setGrind}
                leftLabel="Fine (espresso)" rightLabel="Coarse (cold brew)"
              />
              <Slider
                label="Temperature" sub="°C"
                min={80} max={100} value={temp} onChange={setTemp}
                leftLabel="80°C" rightLabel="100°C"
              />
              <Slider
                label="Ratio" sub={` (1:${ratio})`}
                min={13} max={18} step={1} value={ratio} onChange={setRatio}
                leftLabel="1:13 strong" rightLabel="1:18 light"
              />
            </div>

            {/* Brew button */}
            <button
              onClick={brew}
              disabled={brewing}
              className="relative mt-1 overflow-hidden rounded-xl border border-amber-700/40 bg-amber-900/30 px-6 py-3 font-bold text-amber-300 transition-all hover:bg-amber-800/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {brewing ? (
                <>
                  <span className="relative z-10 text-sm">Brewing… {Math.round(progress)}%</span>
                  <span
                    className="absolute inset-y-0 left-0 rounded-xl bg-amber-700/20 transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  />
                </>
              ) : (
                <span className="text-sm">Brew Coffee</span>
              )}
            </button>
          </div>

          {/* Divider line */}
          <div className="hidden md:block bg-white/8" />

          {/* ── RIGHT: Results ── */}
          <div className="flex flex-col gap-5 p-6">

            {/* Header */}
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Taste Profile</p>
              {result && (
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold text-white/40">
                  {bean} · {roastLabel} Roast · {method}
                </span>
              )}
            </div>

            {/* Empty state */}
            {!result && !brewing && (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-14 text-center">
                <div className="relative">
                  <div
                    className="size-16 rounded-full border-2 border-white/10"
                    style={{ background: roastColor, transition: 'background 0.4s' }}
                  />
                  <div className="absolute -inset-2 rounded-full border border-white/5 animate-pulse" />
                </div>
                <p className="text-sm text-white/30">Adjust your variables and brew</p>
                <p className="text-xs text-white/20">
                  {BEAN_EMOJI[bean]} {bean} · {roastLabel} Roast · {method}
                </p>
              </div>
            )}

            {/* Brewing animation */}
            {brewing && (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 py-14">
                <div className="relative size-20">
                  <div className="absolute inset-0 rounded-full border-2 border-white/8" />
                  <div
                    className="absolute inset-0 rounded-full border-2 border-amber-500 border-t-transparent animate-spin"
                    style={{ borderWidth: '2px' }}
                  />
                  <div
                    className="absolute inset-3 rounded-full"
                    style={{
                      background: roastColor,
                      transition: 'background 0.4s',
                      animation: 'pulse 1s ease-in-out infinite',
                    }}
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-sm font-semibold text-amber-400">Extracting…</p>
                  <p className="text-xs text-white/30">{method} · {temp}°C · 1:{ratio}</p>
                </div>
              </div>
            )}

            {/* Results */}
            {result && !brewing && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">

                {/* Cup preview */}
                <div className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/3 px-4 py-3">
                  <BrewCup color={result.roastColor} active={true} />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold text-white/80">
                      {bean} · {roastLabel} Roast
                    </p>
                    <p className="text-xs text-white/40">{method} · 1:{ratio} · {temp}°C</p>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {result.notes.map((n) => (
                        <span key={n} className="rounded-full bg-amber-950/60 border border-amber-800/30 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Extraction */}
                <ExtractionMeter value={result.extraction} />

                {/* Profile bars */}
                <div className="flex flex-col gap-2.5">
                  <AnimatedBar label="Acidity"    value={result.profile.acidity}    color="#fbbf24" delay={0}   />
                  <AnimatedBar label="Sweetness"  value={result.profile.sweetness}  color="#f59e0b" delay={80}  />
                  <AnimatedBar label="Bitterness" value={result.profile.bitterness} color="#92400e" delay={160} />
                  <AnimatedBar label="Body"       value={result.profile.body}       color="#78716c" delay={240} />
                  <AnimatedBar label="Aroma"      value={result.profile.aroma}      color="#c084fc" delay={320} />
                </div>

                {/* Verdict */}
                <div
                  className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${
                    result.verdictType === 'good'
                      ? 'border-green-700/30 bg-green-950/25 text-green-300'
                      : 'border-amber-700/30 bg-amber-950/25 text-amber-300'
                  }`}
                >
                  {result.verdict}
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </>
  )
}
