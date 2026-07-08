'use client'

import { RatioCalculator } from './ratio-calculator'
import { BrewTimer } from './brew-timer'
import { ColdBrewCalculator } from './cold-brew-calculator'
import { EspressoCalculator } from './espresso-calculator'
import { CaffeineCalculator } from './caffeine-calculator'
import { MeasurementConverter } from './measurement-converter'
import { GrindChart } from './grind-chart'
import { WorldCoffeeMap } from './world-coffee-map'
import { CoffeeLabSimulator } from './coffee-lab'

const WIDGETS: Record<string, () => React.JSX.Element> = {
  'coffee-ratio-calculator': RatioCalculator,
  'brew-timer': BrewTimer,
  'cold-brew-calculator': ColdBrewCalculator,
  'espresso-ratio-calculator': EspressoCalculator,
  'caffeine-calculator': CaffeineCalculator,
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
