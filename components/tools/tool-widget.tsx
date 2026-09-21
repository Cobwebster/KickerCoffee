'use client'

import { RatioCalculator } from './ratio-calculator'
import { DripCoffeeCalculator } from './drip-coffee-calculator'
import { FrenchPressCalculator } from './french-press-calculator'
import { IcedCoffeeCalculator } from './iced-coffee-calculator'
import { BrewTimer } from './brew-timer'
import { ColdBrewCalculator } from './cold-brew-calculator'
import { EspressoCalculator } from './espresso-calculator'
import { CaffeineCalculator } from './caffeine-calculator'
import { CoffeeCaloriesCalculator } from './coffee-calories-calculator'
import { CaffeineHalfLifeCalculator } from './caffeine-half-life-calculator'
import { MeasurementConverter } from './measurement-converter'
import { GrindChart } from './grind-chart'
import { WorldCoffeeMap } from './world-coffee-map'
import { CoffeeLabSimulator } from './coffee-lab'

const WIDGETS: Record<string, () => React.JSX.Element> = {
  'coffee-ratio-calculator': RatioCalculator,
  'drip-coffee-calculator': DripCoffeeCalculator,
  'french-press-calculator': FrenchPressCalculator,
  'iced-coffee-calculator': IcedCoffeeCalculator,
  'brew-timer': BrewTimer,
  'cold-brew-calculator': ColdBrewCalculator,
  'espresso-ratio-calculator': EspressoCalculator,
  'caffeine-calculator': CaffeineCalculator,
  'coffee-calories-calculator': CoffeeCaloriesCalculator,
  'caffeine-half-life-calculator': CaffeineHalfLifeCalculator,
  'coffee-measurement-converter': MeasurementConverter,
  'grind-size-chart': GrindChart,
  'world-coffee-map': WorldCoffeeMap,
  'coffee-lab': CoffeeLabSimulator,
}

export function ToolWidget({ slug }: { slug: string }) {
  const Widget = WIDGETS[slug]
  if (!Widget) return null
  return <Widget />
}
