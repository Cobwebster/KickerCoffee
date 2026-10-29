'use client'

import { useState } from 'react'

const COFFEES = [
  { id: 'double', label: 'Double espresso', mg: 126, kcal: 6 },
  { id: 'single', label: 'Single espresso', mg: 63, kcal: 3 },
  { id: 'drip', label: 'Brewed coffee (8 oz)', mg: 95, kcal: 2 },
  { id: 'drip-16', label: 'Large drip (16 oz)', mg: 190, kcal: 5 },
  { id: 'coldbrew', label: 'Cold brew (8 oz)', mg: 155, kcal: 5 },
] as const

const MILKS = [
  { id: 'none', label: 'None (powder + coffee only)', kcalPerCup: 0, proteinPerCup: 0 },
  { id: 'skim', label: 'Skim milk', kcalPerCup: 83, proteinPerCup: 8.3 },
  { id: 'two-percent', label: '2% milk', kcalPerCup: 122, proteinPerCup: 8.1 },
  { id: 'whole', label: 'Whole milk', kcalPerCup: 149, proteinPerCup: 7.7 },
  { id: 'hp-dairy', label: 'High-protein dairy (Fairlife-style)', kcalPerCup: 80, proteinPerCup: 13 },
  { id: 'soy', label: 'Soy milk', kcalPerCup: 80, proteinPerCup: 7 },
  { id: 'oat', label: 'Oat milk', kcalPerCup: 120, proteinPerCup: 3 },
  { id: 'almond', label: 'Almond milk (unsweetened)', kcalPerCup: 30, proteinPerCup: 1 },
] as const

const ML_PER_CUP = 240
const KCAL_PER_TSP_SUGAR = 16

function round(n: number, d = 0) {
  const f = 10 ** d
  return Math.round(n * f) / f
}

export function ProteinCoffeeCalculator() {
  const [coffeeId, setCoffeeId] = useState<(typeof COFFEES)[number]['id']>('double')
  const [scoopProtein, setScoopProtein] = useState(24)
  const [scoopKcal, setScoopKcal] = useState(120)
  const [scoops, setScoops] = useState(1)
  const [milkId, setMilkId] = useState<(typeof MILKS)[number]['id']>('skim')
  const [milkMl, setMilkMl] = useState(240)
  const [sugarTsp, setSugarTsp] = useState(0)

  const coffee = COFFEES.find((c) => c.id === coffeeId)!
  const milk = MILKS.find((m) => m.id === milkId)!
  const milkCups = milkMl / ML_PER_CUP

  const protein = round(scoopProtein * scoops + milk.proteinPerCup * milkCups, 1)
  const calories = round(
    coffee.kcal + scoopKcal * scoops + milk.kcalPerCup * milkCups + sugarTsp * KCAL_PER_TSP_SUGAR,
  )
  const caffeine = coffee.mg

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-7">
      <label htmlFor="pc-coffee" className="mb-2 block text-sm font-medium text-foreground">
        Coffee base
      </label>
      <select
        id="pc-coffee"
        value={coffeeId}
        onChange={(e) => setCoffeeId(e.target.value as typeof coffeeId)}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
      >
        {COFFEES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label} — {c.mg} mg caffeine
          </option>
        ))}
      </select>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pc-protein" className="mb-2 block text-sm font-medium text-foreground">
            Protein per scoop (g)
          </label>
          <input
            id="pc-protein"
            type="number"
            min={0}
            max={60}
            value={scoopProtein}
            onChange={(e) => setScoopProtein(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="pc-kcal" className="mb-2 block text-sm font-medium text-foreground">
            Calories per scoop
          </label>
          <input
            id="pc-kcal"
            type="number"
            min={0}
            max={400}
            value={scoopKcal}
            onChange={(e) => setScoopKcal(Math.max(0, Number(e.target.value)))}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <label htmlFor="pc-scoops" className="text-sm font-medium text-foreground">
            Scoops
          </label>
          <span className="text-sm font-semibold text-foreground">{scoops}</span>
        </div>
        <input
          id="pc-scoops"
          type="range"
          min={0.5}
          max={2}
          step={0.5}
          value={scoops}
          onChange={(e) => setScoops(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
      </div>

      <label htmlFor="pc-milk" className="mb-2 mt-5 block text-sm font-medium text-foreground">
        Milk
      </label>
      <select
        id="pc-milk"
        value={milkId}
        onChange={(e) => setMilkId(e.target.value as typeof milkId)}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base font-medium text-foreground outline-none focus:border-accent"
      >
        {MILKS.map((m) => (
          <option key={m.id} value={m.id}>
            {m.label}
          </option>
        ))}
      </select>

      {milkId !== 'none' && (
        <div className="mt-5">
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="pc-milk-ml" className="text-sm font-medium text-foreground">
              Milk amount
            </label>
            <span className="text-sm font-semibold text-foreground">{milkMl} ml</span>
          </div>
          <input
            id="pc-milk-ml"
            type="range"
            min={60}
            max={360}
            step={30}
            value={milkMl}
            onChange={(e) => setMilkMl(Number(e.target.value))}
            className="w-full accent-[var(--accent)]"
          />
        </div>
      )}

      <div className="mt-5">
        <div className="mb-2 flex items-baseline justify-between">
          <label htmlFor="pc-sugar" className="text-sm font-medium text-foreground">
            Extra sugar (tsp)
          </label>
          <span className="text-sm font-semibold text-foreground">{sugarTsp}</span>
        </div>
        <input
          id="pc-sugar"
          type="range"
          min={0}
          max={6}
          value={sugarTsp}
          onChange={(e) => setSugarTsp(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Protein</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-foreground">{protein} g</p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Calories</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-foreground">{calories}</p>
        </div>
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="text-sm text-muted-foreground">Caffeine</p>
          <p className="mt-1 font-serif text-3xl font-semibold text-foreground">{caffeine} mg</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Estimates only — use your powder label when you can. Not medical advice.
      </p>
    </div>
  )
}
