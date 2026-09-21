'use client'

import { useMemo, useState } from 'react'

const DRINKS = [
  { id: 'black-8', label: 'Black coffee (8 oz)', kcal: 2, note: 'Brewed, no milk/sugar' },
  { id: 'black-12', label: 'Black coffee (12 oz)', kcal: 3, note: 'Brewed, no milk/sugar' },
  { id: 'black-16', label: 'Black coffee (16 oz)', kcal: 5, note: 'Brewed, no milk/sugar' },
  { id: 'espresso', label: 'Espresso (1 shot)', kcal: 3, note: 'Straight shot' },
  { id: 'americano', label: 'Americano (12 oz)', kcal: 5, note: 'Espresso + water' },
  { id: 'coldbrew', label: 'Cold brew black (12 oz)', kcal: 5, note: 'Unsweetened' },
  { id: 'splash-milk', label: 'Coffee + splash of milk (8 oz)', kcal: 20, note: '~1 tbsp whole milk' },
  { id: 'latte', label: 'Caffè latte (12 oz)', kcal: 150, note: 'Typical café milk drink' },
  { id: 'cappuccino', label: 'Cappuccino (8 oz)', kcal: 80, note: 'Typical café milk drink' },
  { id: 'mocha', label: 'Mocha (12 oz)', kcal: 290, note: 'Chocolate + milk; brands vary' },
  { id: 'sweet-iced', label: 'Sweet iced coffee (16 oz)', kcal: 120, note: 'With sugar/syrup; brands vary' },
] as const

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function CoffeeCaloriesCalculator() {
  const [drinkId, setDrinkId] = useState<(typeof DRINKS)[number]['id']>('black-8')
  const [servings, setServings] = useState(2)
  const [extraSugarTsp, setExtraSugarTsp] = useState(0)
  const [extraMilkTbsp, setExtraMilkTbsp] = useState(0)

  const drink = DRINKS.find((d) => d.id === drinkId)!
  const sugarKcal = extraSugarTsp * 16
  const milkKcal = extraMilkTbsp * 9
  const perCup = drink.kcal + sugarKcal + milkKcal
  const total = perCup * servings

  const comparison = useMemo(() => {
    return DRINKS.filter((d) => d.id.startsWith('black') || d.id === 'latte' || d.id === 'mocha').map(
      (d) => ({
        ...d,
        day: d.kcal * servings,
      }),
    )
  }, [servings])

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <label htmlFor="cal-drink" className="mb-2 block text-sm font-medium text-foreground">
        Drink
      </label>
      <select
        id="cal-drink"
        value={drinkId}
        onChange={(e) => setDrinkId(e.target.value as typeof drinkId)}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
      >
        {DRINKS.map((d) => (
          <option key={d.id} value={d.id}>
            {d.label} — ~{d.kcal} kcal
          </option>
        ))}
      </select>
      <p className="mt-2 text-sm text-muted-foreground">{drink.note}</p>

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
              Extra milk (tbsp)
            </label>
            <span className="text-sm font-semibold text-foreground">{extraMilkTbsp}</span>
          </div>
          <input
            id="cal-milk"
            type="range"
            min={0}
            max={8}
            value={extraMilkTbsp}
            onChange={(e) => setExtraMilkTbsp(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
          <p className="mt-1 text-xs text-muted-foreground">~9 kcal per tbsp whole milk</p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Per serving</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-foreground">{round(perCup)} kcal</p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Per day ({servings}×)</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-foreground">{round(total)} kcal</p>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[280px] text-left text-sm">
          <caption className="border-b border-border bg-background px-4 py-2 text-left text-xs text-muted-foreground">
            Same servings compared (base drink only — no extra sugar/milk sliders)
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
        Estimates for orientation only. Café recipes and milk types vary widely.
      </p>
    </div>
  )
}
