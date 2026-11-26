'use client'

import { useEffect, useMemo, useState } from 'react'

const METHODS = [
  { id: 'espresso', label: 'Espresso' },
  { id: 'moka', label: 'Moka pot' },
  { id: 'pour-over', label: 'Pour over / V60' },
  { id: 'aeropress', label: 'AeroPress' },
  { id: 'drip', label: 'Drip machine' },
  { id: 'kalita', label: 'Kalita Wave' },
  { id: 'chemex', label: 'Chemex' },
  { id: 'french-press', label: 'French press' },
  { id: 'cold-brew', label: 'Cold brew' },
  { id: 'turkish', label: 'Turkish' },
] as const

const GRINDS = [
  {
    size: 'Extra fine',
    like: 'Powdered sugar',
    methods: 'Turkish coffee',
    match: ['turkish'],
    microns: '~200 μm',
    tooFine: 'Muddy sludge; bitter if you force pressure methods.',
    tooCoarse: 'Gritty cup that won’t suspend — rare for Turkish.',
    dots: 1,
  },
  {
    size: 'Fine',
    like: 'Table salt',
    methods: 'Espresso, Moka pot',
    match: ['espresso', 'moka'],
    microns: '~300–400 μm',
    tooFine: 'Shot chokes / bitter drip; moka sputters harsh.',
    tooCoarse: 'Sour gushing espresso; thin moka.',
    dots: 2,
  },
  {
    size: 'Medium-fine',
    like: 'Fine sand',
    methods: 'Pour over (V60), AeroPress',
    match: ['pour-over', 'aeropress', 'v60'],
    microns: '~500–700 μm',
    tooFine: 'Stall past ~4:00, bitter / astringent.',
    tooCoarse: 'Finishes under ~2:30, sour and thin.',
    dots: 3,
  },
  {
    size: 'Medium',
    like: 'Coarse sand',
    methods: 'Drip machine, Kalita Wave',
    match: ['drip', 'kalita'],
    microns: '~700–900 μm',
    tooFine: 'Basket clogs, bitter pot.',
    tooCoarse: 'Weak, hollow drip.',
    dots: 4,
  },
  {
    size: 'Medium-coarse',
    like: 'Rough sand',
    methods: 'Chemex, Clever dripper',
    match: ['chemex', 'clever'],
    microns: '~900–1100 μm',
    tooFine: 'Chemex crawls and tastes dry.',
    tooCoarse: 'Tea-like and sour.',
    dots: 5,
  },
  {
    size: 'Coarse',
    like: 'Sea salt',
    methods: 'French press, percolator',
    match: ['french-press', 'percolator'],
    microns: '~1100–1400 μm',
    tooFine: 'Muddy cup, silty mouthfeel.',
    tooCoarse: 'Sour, under-extracted press.',
    dots: 6,
  },
  {
    size: 'Extra coarse',
    like: 'Peppercorns',
    methods: 'Cold brew, cowboy coffee',
    match: ['cold-brew'],
    microns: '~1400–1600+ μm',
    tooFine: 'Bitter, cloudy 12-hour steep.',
    tooCoarse: 'Weak cold brew (rare — usually under-dose).',
    dots: 7,
  },
] as const

export function GrindChart() {
  const [method, setMethod] = useState<string>('pour-over')
  const [hint, setHint] = useState<string | null>(null)

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const m = params.get('method')
      if (m && METHODS.some((x) => x.id === m)) setMethod(m)
      setHint(params.get('hint'))
    } catch {
      /* ignore */
    }
  }, [])

  const activeGrind = useMemo(
    () => GRINDS.find((g) => (g.match as readonly string[]).includes(method)) ?? GRINDS[2],
    [method],
  )

  const hintCopy =
    hint === 'finer'
      ? 'Lab tip: go one step finer than your current setting if the cup tastes sour or thin.'
      : hint === 'coarser'
        ? 'Lab tip: go one step coarser if the cup tastes bitter or drying.'
        : null

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border bg-secondary/40 px-5 py-4">
        <p className="text-sm font-medium text-foreground">Pick your brew method</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethod(m.id)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                method === m.id
                  ? 'border-accent bg-accent text-accent-foreground'
                  : 'border-border bg-background text-muted-foreground hover:border-accent/50'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        {hintCopy && (
          <p className="mt-3 text-sm text-foreground">{hintCopy}</p>
        )}
      </div>

      <div className="border-b border-border bg-accent/10 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">Recommended</p>
        <p className="mt-1 font-serif text-2xl font-semibold text-foreground">{activeGrind.size}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Feels like <span className="font-medium text-foreground">{activeGrind.like}</span>
          {' · '}
          ~{activeGrind.microns.replace('~', '')}
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <p className="text-xs font-semibold text-muted-foreground">If too fine</p>
            <p className="mt-0.5 text-foreground">{activeGrind.tooFine}</p>
          </div>
          <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm">
            <p className="text-xs font-semibold text-muted-foreground">If too coarse</p>
            <p className="mt-0.5 text-foreground">{activeGrind.tooCoarse}</p>
          </div>
        </div>
      </div>

      <div className="hidden grid-cols-[1fr_1fr_1.2fr_0.8fr_auto] gap-4 border-b border-border bg-secondary px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:grid">
        <span>Grind size</span>
        <span>Feels like</span>
        <span>Best for</span>
        <span>Microns</span>
        <span>Coarseness</span>
      </div>
      <ul className="divide-y divide-border">
        {GRINDS.map((g) => {
          const active = (g.match as readonly string[]).includes(method)
          return (
            <li
              key={g.size}
              className={`grid grid-cols-1 gap-1 px-5 py-4 lg:grid-cols-[1fr_1fr_1.2fr_0.8fr_auto] lg:items-center lg:gap-4 ${
                active ? 'bg-accent/10' : ''
              }`}
            >
              <span className="font-semibold text-foreground">
                {g.size}
                {active && (
                  <span className="ml-2 text-xs font-medium text-accent">Your method</span>
                )}
              </span>
              <span className="text-sm text-muted-foreground">{g.like}</span>
              <span className="text-sm text-muted-foreground">{g.methods}</span>
              <span className="text-sm text-muted-foreground">{g.microns}</span>
              <span className="mt-1 flex items-center gap-1 lg:mt-0" aria-hidden="true">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span
                    key={i}
                    className={`rounded-full ${i < g.dots ? 'bg-accent' : 'bg-border'}`}
                    style={{ width: 4 + i * 1.5, height: 4 + i * 1.5 }}
                  />
                ))}
              </span>
            </li>
          )
        })}
      </ul>
      <p className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
        Micron ranges are approximate ballparks for burr grinders — brands differ. Trust texture
        (salt / sand / peppercorn) more than a printed dial number.
      </p>
    </div>
  )
}
