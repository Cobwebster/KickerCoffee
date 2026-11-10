'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps'
import {
  Mountain,
  Droplets,
  Coffee,
  X,
  ChevronRight,
  Search,
  Minus,
  Plus,
  RotateCcw,
  GitCompareArrows,
  Link2,
  Check,
} from 'lucide-react'
import { Link } from '@/components/link'
import {
  BELTS,
  BELT_FILL,
  COFFEE_ORIGINS,
  ISO_TO_ORIGIN_ID,
  ORIGIN_BY_ID,
  findOriginFromHash,
  matchesCupStyle,
  originSlug,
  type Belt,
  type CupStyle,
  type Origin,
  type Species,
} from '@/lib/coffee-origins'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const CUP_STYLES: { id: CupStyle; label: string }[] = [
  { id: 'All', label: 'Any cup' },
  { id: 'Bright', label: 'Bright & fruity' },
  { id: 'Floral', label: 'Floral & tea-like' },
  { id: 'Chocolate', label: 'Chocolate & nutty' },
  { id: 'Earthy', label: 'Earthy & heavy' },
]

const SPECIES_FILTERS: { id: Species | 'All'; label: string }[] = [
  { id: 'All', label: 'Any species' },
  { id: 'Arabica', label: 'Arabica' },
  { id: 'Robusta', label: 'Robusta' },
  { id: 'Both', label: 'Both grown' },
]

const FLAVOR_PALETTE: Record<string, string> = {
  Blueberry: 'bg-indigo-950/60 text-indigo-300 border-indigo-800/40',
  Jasmine: 'bg-pink-950/60 text-pink-300 border-pink-800/40',
  Bergamot: 'bg-violet-950/60 text-violet-300 border-violet-800/40',
  Lemon: 'bg-yellow-950/60 text-yellow-300 border-yellow-800/40',
  Peach: 'bg-orange-950/60 text-orange-300 border-orange-800/40',
  Caramel: 'bg-amber-950/60 text-amber-300 border-amber-800/40',
  Chocolate: 'bg-stone-900/70 text-stone-300 border-stone-700/40',
  'Dark Chocolate': 'bg-stone-900/70 text-stone-300 border-stone-700/40',
  'Milk Chocolate': 'bg-stone-900/70 text-stone-300 border-stone-700/40',
  Earth: 'bg-neutral-900/70 text-neutral-400 border-neutral-700/40',
  Tobacco: 'bg-yellow-950/50 text-yellow-600 border-yellow-900/40',
  Wine: 'bg-rose-950/60 text-rose-300 border-rose-800/40',
  Hibiscus: 'bg-fuchsia-950/60 text-fuchsia-300 border-fuchsia-800/40',
  Mango: 'bg-orange-950/60 text-orange-400 border-orange-800/40',
  Floral: 'bg-pink-950/60 text-pink-300 border-pink-800/40',
  default: 'bg-white/5 text-white/60 border-white/10',
}

function flavorClass(f: string) {
  return FLAVOR_PALETTE[f] ?? FLAVOR_PALETTE.default
}

function isoKey(id: string | number) {
  return String(id).padStart(3, '0')
}

function caffeineColor(level: Origin['caffeine']) {
  if (level === 'Very High') return '#f87171'
  if (level === 'High') return '#fb923c'
  if (level === 'Medium') return '#fbbf24'
  return '#86efac'
}

function ProfileBars({ origin, compact = false }: { origin: Origin; compact?: boolean }) {
  const rows = [
    { label: 'Acidity', value: origin.acidity, color: '#fbbf24' },
    { label: 'Body', value: origin.body, color: '#92400e' },
    { label: 'Sweetness', value: origin.sweetness, color: '#d97706' },
  ]
  return (
    <div className={compact ? 'flex flex-col gap-2' : 'flex flex-col gap-3'}>
      {rows.map(({ label, value, color }) => (
        <div key={label} className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span className="text-white/50">{label}</span>
            <span className="tabular-nums font-semibold" style={{ color }}>
              {value}
            </span>
          </div>
          <div className={`w-full overflow-hidden rounded-full bg-white/8 ${compact ? 'h-1' : 'h-1.5'}`}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${value}%`,
                backgroundColor: color,
                boxShadow: compact ? undefined : `0 0 6px ${color}60`,
                transition: 'width 0.55s cubic-bezier(0.34,1.56,0.64,1)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function OriginDetail({
  origin,
  onClose,
  onCompareToggle,
  compareActive,
  canCompare,
  onCopyLink,
  copied,
}: {
  origin: Origin
  onClose: () => void
  onCompareToggle: () => void
  compareActive: boolean
  canCompare: boolean
  onCopyLink: () => void
  copied: boolean
}) {
  return (
    <div className="border-t border-white/8 bg-[#0e0905]">
      <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-0">
        <div className="flex items-center gap-4">
          <span className="text-5xl leading-none drop-shadow-lg" role="img" aria-label={origin.name}>
            {origin.flag}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-serif text-2xl font-semibold text-white">{origin.name}</h3>
              <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-xs text-white/40">
                {origin.region}
              </span>
              <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-xs text-white/40">
                {origin.species}
              </span>
            </div>
            <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-white/40">
              <Mountain className="size-3" />
              {origin.altitude}
              <span className="mx-1 text-white/20">·</span>
              Harvest: {origin.harvest}
            </p>
            <p className="mt-1 text-xs text-amber-200/60">{origin.share}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onCopyLink}
            className="rounded-full p-1.5 text-white/30 transition-colors hover:bg-white/8 hover:text-white/70"
            aria-label="Copy link to this origin"
            title="Copy link"
          >
            {copied ? <Check className="size-4 text-amber-400" /> : <Link2 className="size-4" />}
          </button>
          {canCompare && (
            <button
              type="button"
              onClick={onCompareToggle}
              className={`rounded-full p-1.5 transition-colors ${
                compareActive
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'text-white/30 hover:bg-white/8 hover:text-white/70'
              }`}
              aria-label={compareActive ? 'Remove from compare' : 'Add to compare'}
              title="Compare"
            >
              <GitCompareArrows className="size-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-white/30 transition-colors hover:bg-white/8 hover:text-white/70"
            aria-label="Close origin profile"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-5 px-5 py-5 md:grid-cols-3">
        <div className="md:col-span-2 flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-white/60">{origin.notes}</p>

          <div className="rounded-xl border border-amber-800/30 bg-amber-950/25 px-4 py-3">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-amber-600">
              Did you know
            </p>
            <p className="text-xs leading-relaxed text-amber-200/70">{origin.funFact}</p>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
              Typical flavors
            </p>
            <div className="flex flex-wrap gap-1.5">
              {origin.flavors.map((f) => (
                <span
                  key={f}
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${flavorClass(f)}`}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <p className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                <Droplets className="size-3" /> Process
              </p>
              <div className="flex flex-col gap-0.5">
                {origin.process.map((p) => (
                  <span key={p} className="text-white/60">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                <Coffee className="size-3" /> Best brew
              </p>
              <span className="font-medium text-white/80">{origin.brew}</span>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                Varietals
              </p>
              <div className="flex flex-col gap-0.5">
                {origin.varietal.slice(0, 4).map((v) => (
                  <span key={v} className="text-white/60">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Cup profile</p>
          <ProfileBars origin={origin} />
          <div className="mt-1 flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
            <span className="text-xs text-white/40">Caffeine</span>
            <span className="text-xs font-bold" style={{ color: caffeineColor(origin.caffeine) }}>
              {origin.caffeine}
            </span>
          </div>
          {origin.guideHref ? (
            <Link
              href={origin.guideHref}
              className="mt-auto flex items-center gap-1.5 rounded-lg border border-amber-700/30 bg-amber-950/30 px-3 py-2 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-900/40"
            >
              <Coffee className="size-3" />
              {origin.id === 'VN'
                ? 'Vietnamese iced coffee recipe'
                : `Read ${origin.name} in the origins guide`}
              <ChevronRight className="ml-auto size-3" />
            </Link>
          ) : (
            <Link
              href="/coffee-beans/coffee-bean-origins-guide"
              className="mt-auto flex items-center gap-1.5 rounded-lg border border-amber-700/30 bg-amber-950/30 px-3 py-2 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-900/40"
            >
              <Coffee className="size-3" />
              Coffee origins guide
              <ChevronRight className="ml-auto size-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

function ComparePanel({
  a,
  b,
  onClear,
  onFocus,
}: {
  a: Origin
  b: Origin
  onClear: () => void
  onFocus: (id: string) => void
}) {
  const metrics: { key: 'acidity' | 'body' | 'sweetness'; label: string }[] = [
    { key: 'acidity', label: 'Acidity' },
    { key: 'body', label: 'Body' },
    { key: 'sweetness', label: 'Sweetness' },
  ]

  return (
    <div className="border-t border-white/8 bg-[#0e0905] px-5 py-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-serif text-lg font-semibold text-white">Compare origins</h3>
        <button
          type="button"
          onClick={onClear}
          className="text-xs text-white/40 transition-colors hover:text-white/70"
        >
          Clear compare
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[a, b].map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onFocus(o.id)}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-colors hover:border-amber-700/40"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">
                {o.flag}
              </span>
              <div>
                <p className="font-serif text-lg font-semibold text-white">{o.name}</p>
                <p className="text-xs text-white/40">
                  {o.species} · {o.brew}
                </p>
              </div>
            </div>
            <ProfileBars origin={o} compact />
            <div className="mt-3 flex flex-wrap gap-1">
              {o.flavors.slice(0, 3).map((f) => (
                <span key={f} className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/50">
                  {f}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full min-w-[320px] text-left text-xs">
          <thead className="bg-white/[0.03] text-white/40">
            <tr>
              <th className="px-3 py-2 font-medium">Metric</th>
              <th className="px-3 py-2 font-medium">{a.name}</th>
              <th className="px-3 py-2 font-medium">{b.name}</th>
            </tr>
          </thead>
          <tbody className="text-white/70">
            {metrics.map((m) => (
              <tr key={m.key} className="border-t border-white/5">
                <td className="px-3 py-2 text-white/40">{m.label}</td>
                <td className="px-3 py-2 tabular-nums">{a[m.key]}</td>
                <td className="px-3 py-2 tabular-nums">{b[m.key]}</td>
              </tr>
            ))}
            <tr className="border-t border-white/5">
              <td className="px-3 py-2 text-white/40">Caffeine</td>
              <td className="px-3 py-2" style={{ color: caffeineColor(a.caffeine) }}>
                {a.caffeine}
              </td>
              <td className="px-3 py-2" style={{ color: caffeineColor(b.caffeine) }}>
                {b.caffeine}
              </td>
            </tr>
            <tr className="border-t border-white/5">
              <td className="px-3 py-2 text-white/40">Altitude</td>
              <td className="px-3 py-2">{a.altitude}</td>
              <td className="px-3 py-2">{b.altitude}</td>
            </tr>
            <tr className="border-t border-white/5">
              <td className="px-3 py-2 text-white/40">Process</td>
              <td className="px-3 py-2">{a.process.join(', ')}</td>
              <td className="px-3 py-2">{b.process.join(', ')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function WorldCoffeeMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [compareMode, setCompareMode] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [belt, setBelt] = useState<Belt | 'All'>('All')
  const [species, setSpecies] = useState<Species | 'All'>('All')
  const [cupStyle, setCupStyle] = useState<CupStyle>('All')
  const [zoom, setZoom] = useState(1)
  const [center, setCenter] = useState<[number, number]>([12, 8])
  const [geo, setGeo] = useState<object | null>(null)
  const [geoError, setGeoError] = useState(false)
  const [copied, setCopied] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  const selected = selectedId ? ORIGIN_BY_ID[selectedId] : null
  const hovered = hoveredId ? ORIGIN_BY_ID[hoveredId] : null
  const compareA = compareIds[0] ? ORIGIN_BY_ID[compareIds[0]] : null
  const compareB = compareIds[1] ? ORIGIN_BY_ID[compareIds[1]] : null

  useEffect(() => {
    let cancelled = false
    fetch(GEO_URL)
      .then((r) => {
        if (!r.ok) throw new Error('map')
        return r.json()
      })
      .then((data) => {
        if (!cancelled) setGeo(data)
      })
      .catch(() => {
        if (!cancelled) setGeoError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    setHydrated(true)
    const fromHash = findOriginFromHash(window.location.hash)
    if (fromHash) {
      setSelectedId(fromHash.id)
      setCenter(fromHash.coords)
      setZoom(fromHash.id === 'US' || fromHash.id === 'JM' ? 4.5 : 3.2)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (!selectedId) {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search)
      }
      return
    }
    const origin = ORIGIN_BY_ID[selectedId]
    if (!origin) return
    const next = `#${originSlug(origin)}`
    if (window.location.hash !== next) {
      history.replaceState(null, '', next)
    }
  }, [selectedId, hydrated])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return COFFEE_ORIGINS.filter((o) => {
      if (belt !== 'All' && o.belt !== belt) return false
      if (species !== 'All' && o.species !== species) return false
      if (!matchesCupStyle(o, cupStyle)) return false
      if (!q) return true
      const hay = [
        o.name,
        o.region,
        o.belt,
        o.brew,
        o.species,
        ...o.flavors,
        ...o.process,
        ...o.varietal,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    }).sort((a, b) => a.name.localeCompare(b.name))
  }, [query, belt, species, cupStyle])

  function selectOrigin(id: string, fly = true) {
    const origin = ORIGIN_BY_ID[id]
    if (!origin) return

    if (compareMode) {
      setCompareIds((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id)
        if (prev.length >= 2) return [prev[1], id]
        return [...prev, id]
      })
      setSelectedId(id)
    } else {
      setSelectedId(id)
    }

    if (fly) {
      setCenter(origin.coords)
      setZoom(id === 'US' || id === 'JM' || id === 'PA' ? 4.2 : 3.2)
    }
  }

  function resetView() {
    setZoom(1)
    setCenter([12, 8])
    setSelectedId(null)
  }

  function toggleCompareId(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 2) return [prev[1], id]
      return [...prev, id]
    })
  }

  async function copyLink() {
    if (!selected) return
    const url = `${window.location.origin}${window.location.pathname}#${originSlug(selected)}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  const markerOrigin = selected ?? (hovered && !selected ? hovered : null)

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#120c08] text-white shadow-2xl">
      <div className="flex flex-col gap-3 border-b border-white/8 px-4 py-3 md:px-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
              {COFFEE_ORIGINS.length} coffee origins
            </span>
            <span className="text-xs text-white/30">· {filtered.length} shown</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setCompareMode((v) => !v)
              if (compareMode) setCompareIds([])
            }}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              compareMode
                ? 'border-amber-500/60 bg-amber-500/15 text-amber-200'
                : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white/80'
            }`}
          >
            <GitCompareArrows className="size-3.5" />
            {compareMode
              ? `Compare (${compareIds.length}/2)`
              : 'Compare two origins'}
          </button>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/30" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Ethiopia, Gesha, Robusta, honey process…"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-amber-600/50"
            />
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(['All', ...BELTS] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setBelt(item)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  belt === item
                    ? 'border-amber-500/60 bg-amber-500/15 text-amber-200'
                    : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white/80'
                }`}
              >
                {item === 'Caribbean & Middle East' ? 'Caribbean / ME' : item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-1.5">
            {CUP_STYLES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCupStyle(item.id)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  cupStyle === item.id
                    ? 'border-orange-400/50 bg-orange-500/10 text-orange-100'
                    : 'border-white/10 text-white/45 hover:border-white/25 hover:text-white/75'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SPECIES_FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSpecies(item.id)}
                className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  species === item.id
                    ? 'border-stone-300/40 bg-white/10 text-white'
                    : 'border-white/10 text-white/45 hover:border-white/25 hover:text-white/75'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {compareMode && (
          <p className="text-xs text-amber-200/70">
            Pick two origins from the list or map
            {compareA ? ` — ${compareA.name}` : ''}
            {compareB ? ` vs ${compareB.name}` : compareA ? ' + one more' : ''}.
          </p>
        )}

        <div className="-mx-1 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {filtered.map((o) => {
            const inCompare = compareIds.includes(o.id)
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => selectOrigin(o.id)}
                aria-pressed={selectedId === o.id || inCompare}
                className={`shrink-0 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                  selectedId === o.id || inCompare
                    ? 'border-amber-400 bg-amber-500/20 text-amber-100'
                    : 'border-white/10 bg-white/5 text-white/70 hover:border-amber-700/40 hover:text-white'
                }`}
              >
                <span className="mr-1" aria-hidden="true">
                  {o.flag}
                </span>
                {o.name}
              </button>
            )
          })}
          {filtered.length === 0 && (
            <p className="px-2 py-1 text-xs text-white/40">No origins match those filters.</p>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="relative w-full select-none" style={{ minHeight: 280, aspectRatio: '16 / 8' }}>
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 60%, #1a1008 0%, #0a0604 100%)',
            }}
          />

          <div className="absolute right-3 top-3 z-10 flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(6, z * 1.35))}
              className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm hover:bg-black/60"
              aria-label="Zoom in"
            >
              <Plus className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, z / 1.35))}
              className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm hover:bg-black/60"
              aria-label="Zoom out"
            >
              <Minus className="size-4" />
            </button>
            <button
              type="button"
              onClick={resetView}
              className="flex size-8 items-center justify-center rounded-lg border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm hover:bg-black/60"
              aria-label="Reset map"
            >
              <RotateCcw className="size-3.5" />
            </button>
          </div>

          {geoError && (
            <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-sm text-white/60">
              Map tiles could not load. Use the origin list — every country still has a full profile.
            </div>
          )}

          {!geo && !geoError && (
            <div className="absolute inset-0 z-10 flex items-center justify-center text-sm text-white/45">
              Loading coffee belt…
            </div>
          )}

          {geo && (
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 130, center: [10, 10] }}
              style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
            >
              <ZoomableGroup
                zoom={zoom}
                center={center}
                minZoom={1}
                maxZoom={6}
                onMoveEnd={(pos) => {
                  setCenter(pos.coordinates)
                  setZoom(pos.zoom)
                }}
              >
                <Geographies geography={geo}>
                  {({ geographies }) =>
                    geographies.map((geoItem) => {
                      const originId = ISO_TO_ORIGIN_ID[isoKey(geoItem.id ?? '')]
                      const origin = originId ? ORIGIN_BY_ID[originId] : null
                      const isCoffee = Boolean(origin)
                      const dimmed =
                        isCoffee &&
                        filtered.length < COFFEE_ORIGINS.length &&
                        !filtered.some((f) => f.id === originId)
                      const isSelected = originId === selectedId || compareIds.includes(originId ?? '')
                      const fill = !origin
                        ? '#1c1209'
                        : dimmed
                          ? '#2a1a0c'
                          : isSelected
                            ? BELT_FILL[origin.belt].selected
                            : hoveredId === originId
                              ? BELT_FILL[origin.belt].hover
                              : BELT_FILL[origin.belt].base
                      const countryName =
                        (geoItem.properties?.name as string | undefined) ??
                        (geoItem.properties?.NAME as string | undefined)

                      return (
                        <Geography
                          key={geoItem.rsmKey}
                          geography={geoItem}
                          tabIndex={isCoffee && !dimmed ? 0 : -1}
                          role={isCoffee ? 'button' : undefined}
                          aria-label={origin ? `${origin.name}, ${origin.region}` : countryName}
                          onClick={() => originId && !dimmed && selectOrigin(originId, true)}
                          onKeyDown={(e) => {
                            if ((e.key === 'Enter' || e.key === ' ') && originId && !dimmed) {
                              e.preventDefault()
                              selectOrigin(originId, true)
                            }
                          }}
                          onMouseEnter={() => originId && !dimmed && setHoveredId(originId)}
                          onMouseLeave={() => setHoveredId(null)}
                          style={{
                            default: {
                              fill,
                              stroke: '#0a0604',
                              strokeWidth: 0.5,
                              outline: 'none',
                              cursor: isCoffee && !dimmed ? 'pointer' : 'default',
                              opacity: dimmed ? 0.35 : 1,
                              transition: 'fill 0.15s ease, opacity 0.15s ease',
                              filter: isSelected
                                ? 'drop-shadow(0 0 6px rgba(251,191,36,0.65))'
                                : 'none',
                            },
                            hover: {
                              fill: origin && !dimmed ? BELT_FILL[origin.belt].hover : fill,
                              stroke: '#0a0604',
                              strokeWidth: 0.5,
                              outline: 'none',
                            },
                            pressed: {
                              fill: origin ? BELT_FILL[origin.belt].selected : '#1c1209',
                              outline: 'none',
                            },
                          }}
                        />
                      )
                    })
                  }
                </Geographies>
                {markerOrigin && (
                  <Marker coordinates={markerOrigin.coords}>
                    <circle r={4 / zoom} fill="#fbbf24" stroke="#120c08" strokeWidth={1 / zoom} />
                    <circle
                      r={9 / zoom}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth={1 / zoom}
                      opacity={0.55}
                    />
                  </Marker>
                )}
              </ZoomableGroup>
            </ComposableMap>
          )}

          {(hovered || (!selected && !hovered)) && (
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
              <span className="rounded-full border border-amber-700/40 bg-amber-950/70 px-4 py-1.5 text-xs font-medium text-amber-200 backdrop-blur-sm">
                {hovered
                  ? `${hovered.flag} ${hovered.name} · ${hovered.region}`
                  : 'Click a colored country, or pick one from the list'}
              </span>
            </div>
          )}
        </div>

        <aside className="hidden max-h-[420px] overflow-y-auto border-l border-white/8 bg-[#0e0905]/80 lg:block">
          <p className="sticky top-0 z-[1] border-b border-white/8 bg-[#0e0905] px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
            Browse ({filtered.length})
          </p>
          <ul className="flex flex-col">
            {filtered.map((o) => {
              const active = selectedId === o.id || compareIds.includes(o.id)
              return (
                <li key={o.id}>
                  <button
                    type="button"
                    onClick={() => selectOrigin(o.id)}
                    className={`flex w-full items-start gap-2 border-b border-white/5 px-3 py-2.5 text-left transition-colors ${
                      active ? 'bg-amber-500/10' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <span className="mt-0.5 text-base" aria-hidden="true">
                      {o.flag}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-white/90">
                        {o.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-white/35">
                        {o.flavors.slice(0, 2).join(' · ')} · acid {o.acidity}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </aside>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/8 px-4 py-2 text-[10px] uppercase tracking-wide text-white/35 md:px-5">
        {BELTS.map((b) => (
          <span key={b} className="inline-flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-sm"
              style={{ backgroundColor: BELT_FILL[b].base }}
              aria-hidden="true"
            />
            {b}
          </span>
        ))}
        <span className="text-white/25">Hawaii / Kona — open from the list</span>
      </div>

      {compareA && compareB ? (
        <ComparePanel
          a={compareA}
          b={compareB}
          onClear={() => {
            setCompareIds([])
            setCompareMode(false)
          }}
          onFocus={(id) => selectOrigin(id, true)}
        />
      ) : selected ? (
        <OriginDetail
          origin={selected}
          onClose={() => setSelectedId(null)}
          onCompareToggle={() => {
            setCompareMode(true)
            toggleCompareId(selected.id)
          }}
          compareActive={compareIds.includes(selected.id)}
          canCompare
          onCopyLink={copyLink}
          copied={copied}
        />
      ) : null}
    </div>
  )
}
