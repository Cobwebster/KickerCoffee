'use client'

import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
import { Mountain, Droplets, Coffee, X, ChevronRight } from 'lucide-react'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

type CountryData = {
  name: string
  flag: string
  region: string
  altitude: string
  flavors: string[]
  process: string[]
  brew: string
  body: number       // 0–100
  acidity: number    // 0–100
  sweetness: number  // 0–100
  caffeine: 'Low' | 'Medium' | 'High' | 'Very High'
  varietal: string[]
  harvest: string
  notes: string
  funFact: string
}

const COFFEE_COUNTRIES: Record<string, CountryData> = {
  ET: {
    name: 'Ethiopia', flag: '🇪🇹', region: 'East Africa',
    altitude: '1,500 – 2,200 m',
    flavors: ['Blueberry', 'Jasmine', 'Bergamot', 'Lemon', 'Peach'],
    process: ['Natural', 'Washed', 'Honey'],
    brew: 'Pour Over',
    body: 38, acidity: 88, sweetness: 80, caffeine: 'Medium',
    varietal: ['Heirloom Arabica', 'Typica', 'Gesha'],
    harvest: 'Oct – Jan',
    notes: 'The birthplace of coffee. Yirgacheffe, Sidama, and Harrar are the famous regions. Natural-processed Ethiopian beans taste intensely fruity — almost like blueberry jam dissolved in citrus.',
    funFact: 'Coffee still grows wild in the forests of Kaffa, where goat herder Kaldi legendarily discovered it over 1,000 years ago.',
  },
  CO: {
    name: 'Colombia', flag: '🇨🇴', region: 'South America',
    altitude: '1,200 – 1,800 m',
    flavors: ['Caramel', 'Red Apple', 'Hazelnut', 'Milk Chocolate', 'Orange Zest'],
    process: ['Washed'],
    brew: 'Pour Over / Drip',
    body: 52, acidity: 60, sweetness: 75, caffeine: 'Medium',
    varietal: ['Caturra', 'Castillo', 'Colombia', 'Tabi'],
    harvest: 'Oct – Feb (main), Apr – Jun (mitaca)',
    notes: "Colombia's washed process and two annual harvests produce a reliably clean, sweet, balanced cup. Huila and Nariño are the most prized specialty regions.",
    funFact: 'Colombia is one of the only countries with two distinct harvest seasons per year due to its equatorial geography.',
  },
  BR: {
    name: 'Brazil', flag: '🇧🇷', region: 'South America',
    altitude: '800 – 1,200 m',
    flavors: ['Dark Chocolate', 'Peanut', 'Brown Sugar', 'Walnut', 'Dried Fruit'],
    process: ['Natural', 'Pulped Natural', 'Washed'],
    brew: 'Espresso / French Press',
    body: 82, acidity: 22, sweetness: 68, caffeine: 'Medium',
    varietal: ['Bourbon', 'Mundo Novo', 'Catuai', 'Icatu'],
    harvest: 'May – Sep',
    notes: "The world's largest producer at ~40% of global output. Lower altitudes and natural processing yield low-acid, nutty, chocolatey beans — the backbone of most espresso blends worldwide.",
    funFact: 'Brazil produces so much coffee that if all Brazilian beans were consumed only in Brazil, every person would need to drink ~6 cups per day.',
  },
  GT: {
    name: 'Guatemala', flag: '🇬🇹', region: 'Central America',
    altitude: '1,300 – 2,000 m',
    flavors: ['Dark Chocolate', 'Brown Spice', 'Dried Apple', 'Toffee', 'Smoke'],
    process: ['Washed'],
    brew: 'Pour Over / Drip',
    body: 68, acidity: 65, sweetness: 60, caffeine: 'Medium',
    varietal: ['Bourbon', 'Caturra', 'Catuai', 'Pache'],
    harvest: 'Dec – Mar',
    notes: "Guatemala's eight distinct growing regions each have unique microclimates shaped by volcanoes, lakes, and altitude. Antigua — nestled between three volcanoes — is the flagship region for complex, chocolatey beans.",
    funFact: 'The volcanic soil of Antigua contains ash that acts as a natural slow-release fertiliser, contributing to its distinctively full-bodied beans.',
  },
  CR: {
    name: 'Costa Rica', flag: '🇨🇷', region: 'Central America',
    altitude: '1,200 – 1,900 m',
    flavors: ['Honey', 'Peach', 'Citrus', 'Milk Chocolate', 'Brown Sugar'],
    process: ['Honey', 'Washed', 'Natural'],
    brew: 'Pour Over',
    body: 50, acidity: 66, sweetness: 78, caffeine: 'Medium',
    varietal: ['Caturra', 'Catuai', 'Villa Sarchi'],
    harvest: 'Nov – Mar',
    notes: 'Costa Rica pioneered the honey process in specialty coffee, creating a middle path between the clean brightness of washed and the fruit-forward depth of natural. Tarrazu is the most celebrated growing zone.',
    funFact: "Costa Rica was the first Central American country to embrace specialty coffee and is the only one to have legally banned Robusta cultivation — all coffee grown here is Arabica.",
  },
  KE: {
    name: 'Kenya', flag: '🇰🇪', region: 'East Africa',
    altitude: '1,400 – 2,100 m',
    flavors: ['Blackcurrant', 'Grapefruit', 'Tomato', 'Dark Berry', 'Wine'],
    process: ['Washed (Double-Washed)'],
    brew: 'Pour Over',
    body: 55, acidity: 95, sweetness: 62, caffeine: 'High',
    varietal: ['SL28', 'SL34', 'Ruiru 11', 'Batian'],
    harvest: 'Oct – Dec (main), Jun – Jul (fly crop)',
    notes: "Kenya's SL28 and SL34 varietals and unique 72-hour double-washed process create one of the world's most distinctive cups — intensely fruity, wine-like, and complex. Prized by specialty roasters globally.",
    funFact: 'The SL28 and SL34 varietals were developed by Scott Laboratories in the 1930s specifically for drought resistance — their extraordinary flavor profile was a happy accident.',
  },
  ID: {
    name: 'Indonesia', flag: '🇮🇩', region: 'Southeast Asia',
    altitude: '1,000 – 1,700 m',
    flavors: ['Earth', 'Cedar', 'Dark Chocolate', 'Tobacco', 'Mushroom'],
    process: ['Wet-Hulled (Giling Basah)', 'Washed', 'Natural'],
    brew: 'French Press / Drip',
    body: 95, acidity: 20, sweetness: 45, caffeine: 'High',
    varietal: ['Typica', 'Catimor', 'Tim Tim', 'Linie-S'],
    harvest: 'Sep – Mar (Sumatra), Jul – Sep (Java)',
    notes: "Sumatra, Java, and Sulawesi each produce distinct profiles. Sumatra's unique wet-hulling (Giling Basah) process creates the famous low-acid, earthy, syrupy cup. Java tends toward cleaner and more refined.",
    funFact: "Kopi Luwak — coffee beans passed through a civet cat's digestive tract — originates in Indonesia and sells for up to $600/kg, though ethical concerns around farming practices are widespread.",
  },
  VN: {
    name: 'Vietnam', flag: '🇻🇳', region: 'Southeast Asia',
    altitude: '500 – 1,500 m',
    flavors: ['Dark Chocolate', 'Rubber', 'Grain', 'Molasses', 'Dried Fruit'],
    process: ['Natural', 'Dry', 'Washed'],
    brew: 'Drip / Cold Brew / Phin Filter',
    body: 90, acidity: 12, sweetness: 40, caffeine: 'Very High',
    varietal: ['Robusta', 'Arabica (limited)', 'Excelsa'],
    harvest: 'Nov – Jan',
    notes: "Vietnam is the world's second-largest producer (~15% of global output), mainly growing Robusta which has nearly twice the caffeine of Arabica. Vietnamese iced coffee (cà phê sữa đá) — brewed through a Phin filter over sweetened condensed milk — is iconic.",
    funFact: "Vietnam's coffee industry was built by French colonists in the 19th century. It went from virtually no production in 1975 to #2 in the world by 2000 — one of the fastest agricultural scale-ups in history.",
  },
  HN: {
    name: 'Honduras', flag: '🇭🇳', region: 'Central America',
    altitude: '1,000 – 1,700 m',
    flavors: ['Peach', 'Mango', 'Caramel', 'Milk Chocolate', 'Orange'],
    process: ['Washed', 'Natural'],
    brew: 'Pour Over / Drip',
    body: 52, acidity: 58, sweetness: 72, caffeine: 'Medium',
    varietal: ['Catuai', 'Caturra', 'Bourbon', 'IHCAFE 90'],
    harvest: 'Nov – Mar',
    notes: "Honduras has risen rapidly to become Central America's largest coffee producer. High-altitude farms in Copan, Marcala, and Comayagua produce fruit-forward, sweet, clean beans that are excellent value in specialty markets.",
    funFact: "Honduras only became a serious specialty coffee player after 2011, when it overtook Guatemala in volume. The speed of its quality improvement has surprised the specialty coffee world.",
  },
  MX: {
    name: 'Mexico', flag: '🇲🇽', region: 'Central America',
    altitude: '900 – 1,500 m',
    flavors: ['Chocolate', 'Almond', 'Mild Citrus', 'Cinnamon', 'Walnut'],
    process: ['Washed'],
    brew: 'Drip / AeroPress',
    body: 45, acidity: 40, sweetness: 65, caffeine: 'Low',
    varietal: ['Typica', 'Bourbon', 'Pluma Hidalgo', 'Maragogipe'],
    harvest: 'Nov – Mar',
    notes: "Chiapas, Veracruz, and Oaxaca are the main regions. Mexican coffee tends toward mild, nutty, and chocolatey with subtle spice — one of the most accessible and approachable everyday coffees.",
    funFact: "Oaxaca grows the rare Maragogipe 'elephant bean' — a naturally occurring mutation producing beans three times the size of a normal coffee bean.",
  },
  PE: {
    name: 'Peru', flag: '🇵🇪', region: 'South America',
    altitude: '1,500 – 2,100 m',
    flavors: ['Floral', 'Citrus', 'Green Apple', 'Mild Caramel', 'Jasmine'],
    process: ['Washed'],
    brew: 'Pour Over / Drip',
    body: 42, acidity: 70, sweetness: 68, caffeine: 'Medium',
    varietal: ['Typica', 'Bourbon', 'Caturra', 'Pache'],
    harvest: 'Mar – Sep',
    notes: "Peru's remote high-altitude farms in Cajamarca and San Martin produce clean, bright, delicate beans. Dramatically underrated in the specialty world compared to Colombia and Ethiopia — a great source for complex light roasts.",
    funFact: "Over 100,000 smallholder farmers grow coffee in Peru, with most plots under 3 hectares. The sector is a major economic lifeline for remote Andean communities.",
  },
  TZ: {
    name: 'Tanzania', flag: '🇹🇿', region: 'East Africa',
    altitude: '1,400 – 1,800 m',
    flavors: ['Blackberry', 'Plum', 'Dried Citrus', 'Wine', 'Dark Chocolate'],
    process: ['Washed', 'Natural'],
    brew: 'Pour Over',
    body: 56, acidity: 76, sweetness: 62, caffeine: 'Medium',
    varietal: ['Kent', 'Bourbon', 'N39', 'Arusha'],
    harvest: 'Jul – Dec',
    notes: "Tanzania produces peaberry beans on the slopes of Kilimanjaro — where both seeds inside a coffee cherry fuse into one round bean. Peaberries are believed to concentrate flavor due to their smaller, denser shape.",
    funFact: "About 10% of all coffee cherries produce peaberries — a natural mutation where one seed forms instead of two. Tanzanian peaberries from Kilimanjaro slopes are among the most prized in the world.",
  },
  IN: {
    name: 'India', flag: '🇮🇳', region: 'South Asia',
    altitude: '600 – 1,800 m',
    flavors: ['Cardamom', 'Earth', 'Dark Chocolate', 'Cedar', 'Pepper'],
    process: ['Washed', 'Natural', 'Monsooned Malabar'],
    brew: 'Espresso / Drip / Filter',
    body: 78, acidity: 28, sweetness: 50, caffeine: 'High',
    varietal: ['S795', 'Cauvery', 'Chandragiri', 'Selection 9'],
    harvest: 'Nov – Feb',
    notes: "India produces the world-unique 'Monsooned Malabar' — beans exposed to monsoon winds for 12–16 weeks that swell, lose acidity, and develop an unusual funky, low-acid, musty-sweet character unlike any other origin.",
    funFact: "Monsooned Malabar was discovered accidentally — ships carrying coffee from India to Europe took months, and the beans absorbed humidity during the voyage, transforming their flavor. Roasters replicated the process after modern shipping made it obsolete.",
  },
  YE: {
    name: 'Yemen', flag: '🇾🇪', region: 'Middle East',
    altitude: '1,500 – 2,500 m',
    flavors: ['Wine', 'Dark Dried Fruit', 'Chocolate', 'Tobacco', 'Incense'],
    process: ['Natural (Dry)'],
    brew: 'Pour Over / Ibrik',
    body: 62, acidity: 72, sweetness: 56, caffeine: 'Medium',
    varietal: ['Udaini', 'Ismaili', 'Dawairi', 'Tuffahi'],
    harvest: 'Nov – Dec',
    notes: "Yemen is the original home of traded coffee — the port of Mocha gave its name to the 'mocha' flavor profile still used today. Beans are dry-processed on rooftops using methods unchanged for 500 years.",
    funFact: "For over 200 years, Yemen had a global monopoly on coffee trade, as Arab merchants secretly destroyed or boiled beans before exporting to prevent other countries from growing coffee.",
  },
  PA: {
    name: 'Panama', flag: '🇵🇦', region: 'Central America',
    altitude: '1,200 – 1,800 m',
    flavors: ['Jasmine', 'Mango', 'Peach', 'Bergamot', 'Lychee'],
    process: ['Natural', 'Washed', 'Honey'],
    brew: 'Pour Over',
    body: 36, acidity: 72, sweetness: 85, caffeine: 'Low',
    varietal: ['Gesha/Geisha', 'Catuai', 'Typica'],
    harvest: 'Dec – Mar',
    notes: "Panama's Gesha varietal — grown on Boquete's Hacienda La Esmeralda — is the most expensive coffee in the world, regularly auctioning for $1,000+ per kilogram. Its intensely floral, tea-like profile is unlike anything else in coffee.",
    funFact: "In 2004 the first Gesha lot from La Esmeralda entered the Best of Panama auction and shattered every price record. It is considered the moment specialty coffee became a luxury commodity.",
  },
  PH: {
    name: 'Philippines', flag: '🇵🇭', region: 'Southeast Asia',
    altitude: '700 – 1,500 m',
    flavors: ['Chocolate', 'Nut', 'Brown Sugar', 'Mild Spice', 'Earth'],
    process: ['Washed', 'Natural', 'Honey'],
    brew: 'Drip / AeroPress',
    body: 58, acidity: 35, sweetness: 62, caffeine: 'Very High',
    varietal: ['Barako (Liberica)', 'Excelsa', 'Arabica', 'Robusta'],
    harvest: 'Sep – Feb',
    notes: "The Philippines is one of the only countries growing all four commercially available coffee species: Arabica, Robusta, Liberica, and Excelsa. Barako, a Liberica variety, is prized locally for its bold flavor and intense caffeine content.",
    funFact: "Philippine Barako beans are among the rarest and most caffeinated coffees in the world — Liberica contains nearly twice the caffeine of Arabica, and nearly all global Liberica production comes from the Philippines.",
  },
  CL: {
    name: 'Colombia (Gesha Belt)', flag: '🇨🇱', region: 'South America',
    altitude: '1,700 – 2,200 m',
    flavors: ['Rose', 'Tropical Fruit', 'Citrus Blossom', 'Honey', 'Vanilla'],
    process: ['Washed', 'Natural', 'Honey', 'Anaerobic'],
    brew: 'Pour Over / Cupping',
    body: 40, acidity: 82, sweetness: 88, caffeine: 'Medium',
    varietal: ['Gesha', 'Pink Bourbon', 'Yellow Bourbon'],
    harvest: 'Oct – Dec',
    notes: "Colombia's high-altitude Gesha and Pink Bourbon farms in Huila and Cauca represent the cutting edge of specialty coffee. Anaerobic fermentation is being widely experimented with, producing intensely fruity, wine-like cups.",
    funFact: "Pink Bourbon was initially mistaken for a hybrid or mutation, but genetic testing revealed it is a completely distinct variety — one of the few new coffee varietals identified in the 21st century.",
  },
  RW: {
    name: 'Rwanda', flag: '🇷🇼', region: 'East Africa',
    altitude: '1,700 – 2,200 m',
    flavors: ['Hibiscus', 'Black Tea', 'Orange', 'Brown Sugar', 'Tamarind'],
    process: ['Washed', 'Natural'],
    brew: 'Pour Over / Drip',
    body: 46, acidity: 80, sweetness: 70, caffeine: 'Medium',
    varietal: ['Bourbon', 'Jackson', 'Mibirizi'],
    harvest: 'Mar – Jun',
    notes: "Rwanda produces elegant, tea-like cups with remarkable floral and fruit character. The country rebuilt its entire coffee sector as part of post-1994 reconstruction — now a specialty coffee success story.",
    funFact: "Coffee became central to Rwanda's economic recovery after 1994. The country went from selling commodity-grade coffee at minimal prices to commanding $3–$5/lb premiums for specialty grades within a decade.",
  },
  HT: {
    name: 'Haiti', flag: '🇭🇹', region: 'Caribbean',
    altitude: '600 – 1,500 m',
    flavors: ['Mild Chocolate', 'Spice', 'Earth', 'Mild Fruit', 'Nut'],
    process: ['Washed', 'Natural'],
    brew: 'Drip / French Press',
    body: 55, acidity: 45, sweetness: 58, caffeine: 'Medium',
    varietal: ['Typica', 'Haitian Blue (Typica variant)'],
    harvest: 'Aug – Mar',
    notes: "Haiti once supplied 50% of the world's coffee in the 18th century. Haitian Bleu from the Massif de la Hotte mountains is a prized specialty bean — mild, smooth, and spiced — that supported pre-revolution France's cafe culture.",
    funFact: "At its peak in 1789, Haiti supplied over half the world's coffee — more than any other country in history at that time. The Haitian Revolution of 1791 dramatically reshaped the global coffee supply chain.",
  },
  UG: {
    name: 'Uganda', flag: '🇺🇬', region: 'East Africa',
    altitude: '1,200 – 2,200 m',
    flavors: ['Dark Chocolate', 'Stone Fruit', 'Earth', 'Tobacco', 'Brown Sugar'],
    process: ['Washed', 'Natural'],
    brew: 'Espresso / French Press',
    body: 75, acidity: 42, sweetness: 55, caffeine: 'High',
    varietal: ['Robusta (Nganda, Erecta)', 'SL14', 'Bugisu Arabica'],
    harvest: 'Oct – Feb (main), May – Jul (secondary)',
    notes: "Uganda is Africa's largest Robusta producer and grows some of Africa's finest Arabica on the slopes of Mount Elgon. Bugisu Arabica is particularly prized for its full body and distinctive chocolate-fruit character.",
    funFact: "Wild Robusta coffee originated in Uganda — the entire global Robusta industry traces back to plants collected from Ugandan forests. Robusta now accounts for about 40% of global coffee production.",
  },
  CN: {
    name: 'China (Yunnan)', flag: '🇨🇳', region: 'East Asia',
    altitude: '1,000 – 2,000 m',
    flavors: ['Brown Sugar', 'Mild Chocolate', 'Dried Fruit', 'Floral', 'Spice'],
    process: ['Washed', 'Natural', 'Honey'],
    brew: 'Pour Over / Drip',
    body: 50, acidity: 52, sweetness: 65, caffeine: 'Medium',
    varietal: ['Catimor', 'Bourbon', 'Typica', 'Yunnan Arabica'],
    harvest: 'Nov – Mar',
    notes: "China's Yunnan province is one of the world's newest and fastest-growing specialty coffee regions. Yunnan's diverse microclimates and rapid investment in processing infrastructure are producing surprisingly complex, well-structured coffees.",
    funFact: "China went from near-zero specialty coffee production in 2010 to producing over 100,000 tonnes annually by 2020. It is now the world's fastest-growing origin in both production volume and quality tier.",
  },
}

const ISO_NUMERIC_MAP: Record<string, string> = {
  '231': 'ET', '170': 'CO', '076': 'BR', '320': 'GT', '188': 'CR',
  '404': 'KE', '360': 'ID', '704': 'VN', '340': 'HN', '484': 'MX',
  '604': 'PE', '834': 'TZ', '356': 'IN', '887': 'YE', '591': 'PA',
  '608': 'PH', '152': 'CL', '646': 'RW', '332': 'HT', '800': 'UG',
  '156': 'CN',
}

const FLAVOR_PALETTE: Record<string, string> = {
  Blueberry:       'bg-indigo-950/60 text-indigo-300 border-indigo-800/40',
  Jasmine:         'bg-pink-950/60 text-pink-300 border-pink-800/40',
  Bergamot:        'bg-violet-950/60 text-violet-300 border-violet-800/40',
  Lemon:           'bg-yellow-950/60 text-yellow-300 border-yellow-800/40',
  Peach:           'bg-orange-950/60 text-orange-300 border-orange-800/40',
  Caramel:         'bg-amber-950/60 text-amber-300 border-amber-800/40',
  Chocolate:       'bg-stone-900/70 text-stone-300 border-stone-700/40',
  'Dark Chocolate':'bg-stone-900/70 text-stone-300 border-stone-700/40',
  Earth:           'bg-neutral-900/70 text-neutral-400 border-neutral-700/40',
  Tobacco:         'bg-yellow-950/50 text-yellow-600 border-yellow-900/40',
  Wine:            'bg-rose-950/60 text-rose-300 border-rose-800/40',
  Hibiscus:        'bg-fuchsia-950/60 text-fuchsia-300 border-fuchsia-800/40',
  Rose:            'bg-pink-950/60 text-pink-400 border-pink-800/40',
  Mango:           'bg-orange-950/60 text-orange-400 border-orange-800/40',
  default:         'bg-white/5 text-white/60 border-white/10',
}

function flavorClass(f: string) {
  return FLAVOR_PALETTE[f] ?? FLAVOR_PALETTE.default
}

const TOTAL_ORIGINS = Object.keys(COFFEE_COUNTRIES).length

export function WorldCoffeeMap() {
  const [selected, setSelected] = useState<CountryData | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [animateIn, setAnimateIn] = useState(false)

  useEffect(() => {
    if (selected) {
      setAnimateIn(false)
      const t = setTimeout(() => setAnimateIn(true), 20)
      return () => clearTimeout(t)
    }
  }, [selected])

  function handleClick(geo: { id: string }) {
    const iso2 = ISO_NUMERIC_MAP[geo.id]
    const data = iso2 ? COFFEE_COUNTRIES[iso2] : null
    setSelected(data ?? null)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#120c08] text-white shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
            {TOTAL_ORIGINS} Origins Mapped
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/30">
          <span className="inline-block size-2.5 rounded-sm bg-amber-600/70" />
          Coffee-growing region
          <span className="ml-2 inline-block size-2.5 rounded-sm bg-white/10" />
          Non-producer
        </div>
      </div>

      {/* Map */}
      <div className="relative w-full select-none" style={{ aspectRatio: '16/7' }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, #1a1008 0%, #0a0604 100%)',
          }}
        />
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 130, center: [10, 10] }}
          style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
        >
          <ZoomableGroup>
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: { id: string; rsmKey: string }[] }) =>
                geographies.map((geo) => {
                  const iso2 = ISO_NUMERIC_MAP[geo.id]
                  const isCoffee = Boolean(iso2 && COFFEE_COUNTRIES[iso2])
                  const isHovered = hovered === geo.id
                  const isSelected = selected && iso2 && COFFEE_COUNTRIES[iso2]?.name === selected.name

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleClick(geo)}
                      onMouseEnter={() => isCoffee && setHovered(geo.id)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        default: {
                          fill: isSelected
                            ? '#d97706'
                            : isCoffee
                            ? isHovered ? '#b45309' : '#92400e'
                            : '#1c1209',
                          stroke: '#0a0604',
                          strokeWidth: 0.5,
                          outline: 'none',
                          cursor: isCoffee ? 'pointer' : 'default',
                          transition: 'fill 0.15s ease',
                          filter: isSelected ? 'drop-shadow(0 0 6px rgba(217,119,6,0.7))' : 'none',
                        },
                        hover: {
                          fill: isCoffee ? '#b45309' : '#1c1209',
                          stroke: '#0a0604',
                          strokeWidth: 0.5,
                          outline: 'none',
                        },
                        pressed: {
                          fill: isCoffee ? '#d97706' : '#1c1209',
                          outline: 'none',
                        },
                      }}
                    />
                  )
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {!selected && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
            <span className="animate-pulse rounded-full border border-amber-700/40 bg-amber-950/60 px-4 py-1.5 text-xs font-medium text-amber-400 backdrop-blur-sm">
              Click a highlighted country to explore
            </span>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selected && (
        <div
          className="border-t border-white/8 bg-[#0e0905]"
          style={{
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          {/* Country header */}
          <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-0">
            <div className="flex items-center gap-4">
              <span className="text-5xl leading-none drop-shadow-lg" role="img" aria-label={selected.name}>
                {selected.flag}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-2xl font-semibold text-white">{selected.name}</h3>
                  <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-xs text-white/40">
                    {selected.region}
                  </span>
                </div>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/40">
                  <Mountain className="size-3" />
                  {selected.altitude}
                  <span className="mx-1 text-white/20">·</span>
                  Harvest: {selected.harvest}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="shrink-0 rounded-full p-1.5 text-white/30 transition-colors hover:bg-white/8 hover:text-white/70"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="grid gap-5 px-5 py-5 md:grid-cols-3">
            {/* Left col: notes + fun fact */}
            <div className="md:col-span-2 flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-white/60">{selected.notes}</p>

              {/* Fun fact */}
              <div className="rounded-xl border border-amber-800/30 bg-amber-950/25 px-4 py-3">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-amber-600">
                  Did you know
                </p>
                <p className="text-xs leading-relaxed text-amber-200/70">{selected.funFact}</p>
              </div>

              {/* Flavor tags */}
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
                  Typical flavors
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.flavors.map((f) => (
                    <span
                      key={f}
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${flavorClass(f)}`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Process + Varietal + Brew */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <Droplets className="size-3" /> Process
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {selected.process.map((p) => (
                      <span key={p} className="text-white/60">{p}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <Coffee className="size-3" /> Best Brew
                  </p>
                  <span className="text-white/80 font-medium">{selected.brew}</span>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    Varietals
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {selected.varietal.slice(0, 3).map((v) => (
                      <span key={v} className="text-white/60">{v}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right col: radar-style profile bars */}
            <div className="flex flex-col gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                Cup profile
              </p>

              {[
                { label: 'Acidity', value: selected.acidity, color: '#fbbf24' },
                { label: 'Body', value: selected.body, color: '#92400e' },
                { label: 'Sweetness', value: selected.sweetness, color: '#d97706' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-white/50">{label}</span>
                    <span className="tabular-nums font-semibold" style={{ color }}>{value}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${value}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 6px ${color}60`,
                        transition: 'width 0.6s cubic-bezier(0.34,1.56,0.64,1)',
                      }}
                    />
                  </div>
                </div>
              ))}

              <div className="mt-1 flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
                <span className="text-xs text-white/40">Caffeine</span>
                <span
                  className="text-xs font-bold"
                  style={{
                    color: selected.caffeine === 'Very High' ? '#f87171'
                      : selected.caffeine === 'High' ? '#fb923c'
                      : selected.caffeine === 'Medium' ? '#fbbf24'
                      : '#86efac',
                  }}
                >
                  {selected.caffeine}
                </span>
              </div>

              <a
                href="/tools/coffee-ratio-calculator"
                className="mt-auto flex items-center gap-1.5 rounded-lg border border-amber-700/30 bg-amber-950/30 px-3 py-2 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-900/40"
              >
                <Coffee className="size-3" />
                Brew {selected.name}
                <ChevronRight className="ml-auto size-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
