'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/components/link'
import { Plus, Trash2 } from 'lucide-react'

const DRINKS = [
  { id: 'brewed', label: 'Brewed / drip (8 oz)', mg: 95 },
  { id: 'latte', label: 'Latte (2 shots)', mg: 126 },
  { id: 'espresso', label: 'Espresso (1 shot)', mg: 63 },
  { id: 'double', label: 'Double espresso', mg: 126 },
  { id: 'coldbrew', label: 'Cold brew (8 oz)', mg: 155 },
  { id: 'drip-large', label: 'Large drip (16 oz)', mg: 190 },
  { id: 'soda', label: 'Cola / soda (12 oz)', mg: 34 },
  { id: 'instant', label: 'Instant coffee (8 oz)', mg: 62 },
  { id: 'decaf', label: 'Decaf (8 oz)', mg: 3 },
  { id: 'energy', label: 'Energy drink (typical)', mg: 160 },
] as const

type DrinkId = (typeof DRINKS)[number]['id'] | 'custom'

const CUSTOM_PRESETS = [
  { mg: 40, label: 'Tea' },
  { mg: 80, label: 'Red Bull 8.4 oz' },
  { mg: 150, label: 'Energy drink' },
  { mg: 200, label: 'Monster 16 oz' },
  { mg: 300, label: 'Pre-workout' },
] as const

const SAFE_LIMIT = 400
const MG_PER_KG = 3

type StackItem = { id: string; drinkId: DrinkId; label: string; mg: number; qty: number }

function round(n: number, d = 1) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

function clampMg(n: number) {
  if (!Number.isFinite(n)) return 0
  return Math.min(1000, Math.max(0, Math.round(n)))
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function CaffeineCalculator() {
  const [mode, setMode] = useState<'intake' | 'from-mg' | 'by-weight'>('intake')
  const [drinkId, setDrinkId] = useState<DrinkId>('brewed')
  const [customMg, setCustomMg] = useState(80)
  const [qty, setQty] = useState(1)
  const [stack, setStack] = useState<StackItem[]>([
    { id: uid(), drinkId: 'brewed', label: 'Brewed / drip (8 oz)', mg: 95, qty: 1 },
  ])
  const [targetMg, setTargetMg] = useState(155)
  const [weightKg, setWeightKg] = useState(70)

  const total = useMemo(
    () => stack.reduce((sum, item) => sum + item.mg * item.qty, 0),
    [stack],
  )
  const pct = Math.min(100, (total / SAFE_LIMIT) * 100)
  const over = total > SAFE_LIMIT

  const fromMg = useMemo(() => {
    return DRINKS.filter((d) => d.id !== 'decaf').map((d) => ({
      ...d,
      cups: d.mg > 0 ? targetMg / d.mg : 0,
    }))
  }, [targetMg])

  const weightLimit = round(weightKg * MG_PER_KG, 0)
  const weightCups = weightLimit / 95

  function addToStack() {
    const preset = drinkId === 'custom' ? null : DRINKS.find((d) => d.id === drinkId)!
    const mg = drinkId === 'custom' ? customMg : preset!.mg
    const label = drinkId === 'custom' ? `Custom (${mg} mg)` : preset!.label
    setStack((prev) => {
      const existing = prev.find((x) => x.drinkId === drinkId && x.mg === mg)
      if (existing) {
        return prev.map((x) =>
          x.id === existing.id ? { ...x, qty: x.qty + qty } : x,
        )
      }
      return [...prev, { id: uid(), drinkId, label, mg, qty }]
    })
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <div className="mb-5 flex flex-wrap gap-2">
        {(
          [
            { id: 'intake', label: 'Daily stack' },
            { id: 'from-mg', label: 'mg → cups' },
            { id: 'by-weight', label: 'By body weight' },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id)}
            className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
              mode === item.id
                ? 'border-accent bg-accent text-accent-foreground'
                : 'border-border bg-background text-muted-foreground hover:border-accent/50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {mode === 'intake' && (
        <>
          <p className="mb-3 text-sm text-muted-foreground">
            Stack different drinks in one session — espresso + latte + soda — not just one type ×
            servings.
          </p>

          <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <select
              value={drinkId}
              onChange={(e) => setDrinkId(e.target.value as DrinkId)}
              className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground outline-none focus:border-accent"
              aria-label="Drink to add"
            >
              {DRINKS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label} — {d.mg} mg
                </option>
              ))}
              <option value="custom">Custom drink — enter mg</option>
            </select>
            <input
              type="number"
              min={1}
              max={12}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="w-20 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground outline-none focus:border-accent"
              aria-label="Quantity"
            />
            <button
              type="button"
              onClick={addToStack}
              className="inline-flex items-center justify-center gap-1 rounded-xl border border-accent bg-accent px-3 py-2.5 text-sm font-medium text-accent-foreground"
            >
              <Plus className="size-4" />
              Add
            </button>
          </div>

          {drinkId === 'custom' && (
            <div className="mt-3 rounded-xl border border-border bg-background p-4">
              <label htmlFor="custom-mg" className="mb-1 block text-sm font-medium text-foreground">
                Caffeine per serving (mg)
              </label>
              <input
                id="custom-mg"
                type="number"
                inputMode="numeric"
                min={0}
                max={1000}
                value={customMg}
                onChange={(e) => setCustomMg(clampMg(Number(e.target.value)))}
                className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {CUSTOM_PRESETS.map((p) => (
                  <button
                    key={p.mg}
                    type="button"
                    onClick={() => setCustomMg(p.mg)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                      customMg === p.mg
                        ? 'border-accent bg-accent/10 text-foreground'
                        : 'border-border text-muted-foreground hover:border-accent/50'
                    }`}
                  >
                    {p.label} ({p.mg})
                  </button>
                ))}
              </div>
            </div>
          )}

          <ul className="mt-4 flex flex-col gap-2">
            {stack.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm"
              >
                <span className="min-w-0 flex-1 text-foreground">
                  <span className="font-medium">{item.qty}×</span> {item.label}{' '}
                  <span className="text-muted-foreground">
                    ({item.mg} mg → {item.mg * item.qty} mg)
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setStack((prev) =>
                      prev
                        .map((x) =>
                          x.id === item.id ? { ...x, qty: Math.max(0, x.qty - 1) } : x,
                        )
                        .filter((x) => x.qty > 0),
                    )
                  }
                  className="rounded-lg border border-border px-2 py-0.5 text-xs text-muted-foreground hover:border-accent"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setStack((prev) =>
                      prev.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x)),
                    )
                  }
                  className="rounded-lg border border-border px-2 py-0.5 text-xs text-muted-foreground hover:border-accent"
                  aria-label="Increase quantity"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setStack((prev) => prev.filter((x) => x.id !== item.id))}
                  className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
                  aria-label="Remove drink"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl bg-secondary p-6 text-center">
            <div className="text-sm text-muted-foreground">Estimated daily caffeine</div>
            <div className="mt-1 text-5xl font-semibold text-foreground">{total} mg</div>
            <div className="mt-1 text-sm text-muted-foreground">
              {stack.length === 0
                ? 'Add drinks to build a stack'
                : `${stack.length} drink type${stack.length === 1 ? '' : 's'} stacked`}
            </div>
            <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-background">
              <div
                className={`h-full rounded-full transition-all ${over ? 'bg-destructive' : 'bg-accent'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {Math.round((total / SAFE_LIMIT) * 100)}% of the {SAFE_LIMIT} mg daily guideline for
              most adults
            </div>
            {over && (
              <p className="mt-3 text-sm font-medium text-destructive">
                Above the general 400 mg guideline — consider cutting back.
              </p>
            )}
            {total > 0 && total <= 200 && (
              <p className="mt-3 text-sm text-muted-foreground">
                ~{total} mg is a moderate day for many adults (200 mg is often fine; sensitivity
                varies).
              </p>
            )}
          </div>

          <div className="mt-4 overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[260px] text-left text-sm">
              <caption className="border-b border-border bg-background px-4 py-2 text-left text-xs text-muted-foreground">
                Quick compare — caffeine in latte vs drip vs cold brew
              </caption>
              <thead>
                <tr className="border-b border-border bg-secondary/40">
                  <th className="px-4 py-2 font-medium">Drink</th>
                  <th className="px-4 py-2 font-medium">Approx caffeine</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Drip / brewed 8 oz', '95 mg'],
                  ['Latte (2 shots)', '126 mg'],
                  ['Cold brew 8 oz', '155 mg'],
                  ['Large drip 16 oz', '190 mg'],
                  ['Cola 12 oz', '~34 mg'],
                ].map(([drink, mg]) => (
                  <tr key={drink} className="border-b border-border last:border-0">
                    <td className="px-4 py-2 text-foreground">{drink}</td>
                    <td className="px-4 py-2 font-medium text-foreground">{mg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            When will it wear off?{' '}
            <Link
              href="/tools/caffeine-day-planner"
              className="font-medium text-accent hover:underline"
            >
              Caffeine tracker & calendar
            </Link>
            {' · '}
            <Link
              href="/tools/caffeine-half-life-calculator"
              className="font-medium text-accent hover:underline"
            >
              Half-life timeline
            </Link>
          </p>
        </>
      )}

      {mode === 'from-mg' && (
        <>
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-1 flex items-baseline justify-between">
              <label className="text-sm font-medium text-foreground">Caffeine amount</label>
              <span className="text-xs text-muted-foreground">mg</span>
            </div>
            <input
              type="number"
              inputMode="decimal"
              min={1}
              value={targetMg}
              onChange={(e) => setTargetMg(Math.max(1, Number(e.target.value)))}
              className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {[80, 100, 150, 190, 200, 400].map((mg) => (
                <button
                  key={mg}
                  type="button"
                  onClick={() => setTargetMg(mg)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                    targetMg === mg
                      ? 'border-accent bg-accent/10 text-foreground'
                      : 'border-border text-muted-foreground hover:border-accent/50'
                  }`}
                >
                  {mg} mg
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Quick mg → cups: 80 ≈ 0.8 drip · 100 ≈ 1 cup · 150 ≈ 1.6 · 190 ≈ 2 / large drip · 200 ≈
              2 cups · 400 ≈ 4 cups (daily guide).
            </p>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            How many cups is {targetMg} mg of caffeine?
            {targetMg === 80
              ? ' (~0.8 × 8 oz drip, or a bit more than one espresso shot.)'
              : targetMg === 100
                ? ' (~one 8 oz drip cup.)'
                : targetMg === 150
                  ? ' (~1.6 drip cups, or almost one cold brew.)'
                  : targetMg === 190
                    ? ' (~two drip cups, or one large 16 oz drip.)'
                    : targetMg === 200
                      ? ' (common “is that a lot?” checkpoint — often ~2 drip cups.)'
                      : targetMg === 400
                        ? ' (~four 8 oz drip cups — typical adult daily upper guide.)'
                        : ''}
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {fromMg.map((d) => (
              <div key={d.id} className="rounded-xl border border-border bg-secondary p-4">
                <div className="text-xs text-muted-foreground">{d.label}</div>
                <div className="mt-1 text-xl font-semibold text-foreground">
                  ≈ {round(d.cups, 1)} servings
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {mode === 'by-weight' && (
        <>
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="mb-1 flex items-baseline justify-between">
              <label className="text-sm font-medium text-foreground">Body weight</label>
              <span className="text-xs text-muted-foreground">kg</span>
            </div>
            <input
              type="number"
              inputMode="decimal"
              min={30}
              max={200}
              value={weightKg}
              onChange={(e) => setWeightKg(Math.max(30, Number(e.target.value)))}
              className="w-full bg-transparent text-2xl font-semibold text-foreground outline-none"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Uses a rough ~{MG_PER_KG} mg per kg guideline some people use alongside the standard
              400 mg adult limit. Not medical advice.
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-secondary p-6 text-center">
            <div className="text-sm text-muted-foreground">Estimated personal daily ballpark</div>
            <div className="mt-1 text-5xl font-semibold text-foreground">{weightLimit} mg</div>
            <div className="mt-2 text-sm text-muted-foreground">
              About {round(weightCups, 1)} cups of brewed coffee (95 mg each). Cap at {SAFE_LIMIT}{' '}
              mg for most healthy adults unless a clinician says otherwise.
            </div>
          </div>
        </>
      )}
    </div>
  )
}
