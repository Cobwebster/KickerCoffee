'use client'

import { useMemo, useState } from 'react'

const DRINKS = [
  { id: 'black-8', label: 'Black coffee (8 oz)', kcal: 2, note: 'Brewed, no milk/sugar' },
  { id: 'black-12', label: 'Black coffee (12 oz)', kcal: 3, note: 'Brewed, no milk/sugar' },
  { id: 'black-16', label: 'Black coffee (16 oz)', kcal: 5, note: 'Brewed, no milk/sugar' },
  { id: 'espresso', label: 'Espresso (1 shot)', kcal: 3, note: 'Straight shot' },
  { id: 'americano', label: 'Americano (12 oz)', kcal: 5, note: 'Espresso + water' },
  { id: 'coldbrew', label: 'Cold brew black (12 oz)', kcal: 5, note: 'Unsweetened' },
  { id: 'latte', label: 'Caffè latte base (12 oz milk drink)', kcal: 0, note: 'Build milk with the milk type control' },
  { id: 'cappuccino', label: 'Cappuccino base (8 oz)', kcal: 0, note: 'Small milk drink — set milk tbsp below' },
  { id: 'mocha', label: 'Mocha base (12 oz)', kcal: 120, note: 'Chocolate sauce ballpark; milk separate' },
  { id: 'sweet-iced', label: 'Sweet iced coffee base (16 oz)', kcal: 40, note: 'Light syrup base; add sugar as needed' },
  { id: 'custom', label: 'Custom base drink', kcal: 0, note: 'Enter café nutrition or label kcal' },
] as const

const MILKS = [
  { id: 'whole', label: 'Whole milk', kcalPerTbsp: 9 },
  { id: 'two-percent', label: '2% milk', kcalPerTbsp: 7.5 },
  { id: 'skim', label: 'Skim milk', kcalPerTbsp: 5.5 },
  { id: 'oat', label: 'Oat milk (barista-ish)', kcalPerTbsp: 8 },
  { id: 'almond', label: 'Almond milk (unsweetened)', kcalPerTbsp: 2.5 },
] as const

/** Default milk volume (tbsp) when picking milk-forward drinks */
const DEFAULT_MILK: Partial<Record<(typeof DRINKS)[number]['id'], number>> = {
  latte: 14, // ~210 ml
  cappuccino: 8,
  mocha: 12,
}

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function CoffeeCaloriesCalculator() {
  const [drinkId, setDrinkId] = useState<(typeof DRINKS)[number]['id']>('black-8')
  const [customBase, setCustomBase] = useState(150)
  const [servings, setServings] = useState(2)
  const [extraSugarTsp, setExtraSugarTsp] = useState(0)
  const [milkId, setMilkId] = useState<(typeof MILKS)[number]['id']>('whole')
  const [extraMilkTbsp, setExtraMilkTbsp] = useState(0)

  const drink = DRINKS.find((d) => d.id === drinkId)!
  const milk = MILKS.find((m) => m.id === milkId)!
  const baseKcal = drinkId === 'custom' ? customBase : drink.kcal
  const sugarKcal = extraSugarTsp * 16
  const milkKcal = extraMilkTbsp * milk.kcalPerTbsp
  const perCup = baseKcal + sugarKcal + milkKcal
  const total = perCup * servings

  function onDrinkChange(id: (typeof DRINKS)[number]['id']) {
    setDrinkId(id)
    if (DEFAULT_MILK[id] != null) {
      setExtraMilkTbsp(DEFAULT_MILK[id]!)
    } else if (id.startsWith('black') || id === 'espresso' || id === 'americano' || id === 'coldbrew') {
      setExtraMilkTbsp(0)
    }
  }

  const comparison = useMemo(() => {
    const rows = [
      { id: 'black-8', label: 'Black coffee (8 oz)' },
      { id: 'latte-home', label: `Homemade latte-ish (${milk.label})` },
      { id: 'mocha', label: 'Mocha-ish + same extras' },
      { id: 'starbucks-ish', label: 'Chain-style sweet latte ballpark' },
    ] as const

    return rows.map((row) => {
      let day = 0
      if (row.id === 'black-8') {
        day = (2 + sugarKcal + milkKcal) * servings
      } else if (row.id === 'latte-home') {
        const milkTbsp = Math.max(extraMilkTbsp, 12)
        day = (3 + sugarKcal + milkTbsp * milk.kcalPerTbsp) * servings
      } else if (row.id === 'mocha') {
        day = (120 + sugarKcal + Math.max(extraMilkTbsp, 10) * milk.kcalPerTbsp) * servings
      } else {
        // Rough chain grande latte with syrup ~190–250; use 220 + extras
        day = (220 + sugarKcal) * servings
      }
      return { ...row, day }
    })
  }, [extraMilkTbsp, milk.kcalPerTbsp, milk.label, milkKcal, servings, sugarKcal])

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <label htmlFor="cal-drink" className="mb-2 block text-sm font-medium text-foreground">
        Drink
      </label>
      <select
        id="cal-drink"
        value={drinkId}
        onChange={(e) => onDrinkChange(e.target.value as typeof drinkId)}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
      >
        {DRINKS.map((d) => (
          <option key={d.id} value={d.id}>
            {d.id === 'custom' ? d.label : `${d.label}${d.kcal ? ` — ~${d.kcal} kcal base` : ''}`}
          </option>
        ))}
      </select>
      <p className="mt-2 text-sm text-muted-foreground">{drink.note}</p>

      {drinkId === 'custom' && (
        <div className="mt-4">
          <label htmlFor="cal-custom" className="mb-2 block text-sm font-medium text-foreground">
            Custom base calories
          </label>
          <input
            id="cal-custom"
            type="number"
            min={0}
            max={800}
            value={customBase}
            onChange={(e) => setCustomBase(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
          />
        </div>
      )}

      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <label htmlFor="cal-servings" className="text-sm font-medium text-foreground">
            Servings per day
          </label>
          <span className="text-sm font-semibold text-foreground">{servings}</span>
        </div>
        <input
          id="cal-servings"
          type="range"
          min={1}
          max={6}
          value={servings}
          onChange={(e) => setServings(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
      </div>

      <label htmlFor="cal-milk-type" className="mb-2 mt-5 block text-sm font-medium text-foreground">
        Milk type
      </label>
      <select
        id="cal-milk-type"
        value={milkId}
        onChange={(e) => setMilkId(e.target.value as typeof milkId)}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
      >
        {MILKS.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label} (~{m.kcalPerTbsp} kcal/tbsp)
          </option>
        ))}
      </select>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="cal-sugar" className="text-sm font-medium text-foreground">
              Extra sugar (tsp)
            </label>
            <span className="text-sm font-semibold text-foreground">{extraSugarTsp}</span>
          </div>
          <input
            id="cal-sugar"
            type="range"
            min={0}
            max={6}
            value={extraSugarTsp}
            onChange={(e) => setExtraSugarTsp(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="mt-1 text-xs text-muted-foreground">~16 kcal per teaspoon</p>
        </div>
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="cal-milk" className="text-sm font-medium text-foreground">
              Milk amount (tbsp)
            </label>
            <span className="text-sm font-semibold text-foreground">{extraMilkTbsp}</span>
          </div>
          <input
            id="cal-milk"
            type="range"
            min={0}
            max={20}
            value={extraMilkTbsp}
            onChange={(e) => setExtraMilkTbsp(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            ~{milk.kcalPerTbsp} kcal per tbsp · 1 cup ≈ 16 tbsp
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Per serving</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-foreground">{round(perCup)} kcal</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Base {round(baseKcal)} + sugar {round(sugarKcal)} + milk {round(milkKcal)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Per day ({servings}×)</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-foreground">{round(total)} kcal</p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[280px] text-left text-sm">
          <caption className="border-b border-border bg-background px-4 py-2 text-left text-xs text-muted-foreground">
            Same servings — comparison includes your sugar slider and milk type (homemade vs
            chain-ish ballpark)
          </caption>
          <thead>
            <tr className="border-b border-border bg-background">
              <th className="px-4 py-2 font-medium">Drink</th>
              <th className="px-4 py-2 font-medium">Day total</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0">
                <td className="px-4 py-2 text-foreground">{row.label}</td>
                <td className="px-4 py-2 font-medium text-foreground">{round(row.day)} kcal</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Estimates for orientation only. Café recipes and milk brands vary widely — use Custom base
        when you have a nutrition label.
      </p>
    </div>
  )
}
