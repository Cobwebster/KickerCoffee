export type NavItem = { label: string; href: string; description: string }

/** Top nav — kept out of `lib/content.ts` so client chrome does not pull the whole content module. */
export const NAV: NavItem[] = [
  {
    label: 'Brewing Guides',
    href: '/brewing-guides',
    description: 'Step-by-step recipes for every brew method.',
  },
  {
    label: 'Recipes',
    href: '/recipes',
    description: 'Iced lattes, cappuccinos, and café drinks at home.',
  },
  {
    label: 'Food Recipes',
    href: '/food-recipes',
    description: 'Breakfast, bakery, and healthy plates with real photos.',
  },
  {
    label: 'Gear & Setups',
    href: '/gear',
    description: 'Reviews and curated kits for every budget.',
  },
  {
    label: 'Beans & Roasts',
    href: '/coffee-beans',
    description: 'Learn origins, roast levels, and tasting.',
  },
  {
    label: 'Calculators',
    href: '/tools',
    description: 'Ratio calculator, brew timer, and more.',
  },
]
