const GRINDS = [
  {
    size: 'Extra fine',
    like: 'Powdered sugar',
    methods: 'Turkish coffee',
    dots: 1,
  },
  {
    size: 'Fine',
    like: 'Table salt',
    methods: 'Espresso, Moka pot',
    dots: 2,
  },
  {
    size: 'Medium-fine',
    like: 'Fine sand',
    methods: 'Pour over (V60), AeroPress',
    dots: 3,
  },
  {
    size: 'Medium',
    like: 'Coarse sand',
    methods: 'Drip machine, Kalita Wave',
    dots: 4,
  },
  {
    size: 'Medium-coarse',
    like: 'Rough sand',
    methods: 'Chemex, Clever dripper',
    dots: 5,
  },
  {
    size: 'Coarse',
    like: 'Sea salt',
    methods: 'French press, percolator',
    dots: 6,
  },
  {
    size: 'Extra coarse',
    like: 'Peppercorns',
    methods: 'Cold brew, cowboy coffee',
    dots: 7,
  },
]

export function GrindChart() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="hidden grid-cols-[1.2fr_1fr_1.6fr_auto] gap-4 border-b border-border bg-secondary px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:grid">
        <span>Grind size</span>
        <span>Feels like</span>
        <span>Best for</span>
        <span>Coarseness</span>
      </div>
      <ul className="divide-y divide-border">
        {GRINDS.map((g) => (
          <li
            key={g.size}
            className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[1.2fr_1fr_1.6fr_auto] sm:items-center sm:gap-4"
          >
            <span className="font-semibold text-foreground">{g.size}</span>
            <span className="text-sm text-muted-foreground">{g.like}</span>
            <span className="text-sm text-muted-foreground">{g.methods}</span>
            <span className="mt-1 flex items-center gap-1 sm:mt-0" aria-hidden="true">
              {Array.from({ length: 7 }).map((_, i) => (
                <span
                  key={i}
                  className={`rounded-full ${
                    i < g.dots ? 'bg-accent' : 'bg-border'
                  }`}
                  style={{ width: 4 + i * 1.5, height: 4 + i * 1.5 }}
                />
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
