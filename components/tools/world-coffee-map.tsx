'use client'

import { useEffect, useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps'
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
} from 'lucide-react'
import { Link } from '@/components/link'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

type Belt = 'Africa' | 'Americas' | 'Asia' | 'Caribbean & Middle East'
type Species = 'Arabica' | 'Robusta' | 'Both'

type Origin = {
  id: string
  isoNumeric: string
  name: string
  flag: string
  belt: Belt
  region: string
  coords: [number, number]
  altitude: string
  flavors: string[]
  process: string[]
  brew: string
  body: number
  acidity: number
  sweetness: number
  caffeine: 'Low' | 'Medium' | 'High' | 'Very High'
  species: Species
  varietal: string[]
  harvest: string
  share: string
  notes: string
  funFact: string
  guideHref?: string
}

const ORIGINS: Origin[] = [
  {
    id: 'ET',
    isoNumeric: '231',
    name: 'Ethiopia',
    flag: '🇪🇹',
    belt: 'Africa',
    region: 'East Africa',
    coords: [38.5, 8.5],
    altitude: '1,500 – 2,200 m',
    flavors: ['Blueberry', 'Jasmine', 'Bergamot', 'Lemon', 'Peach'],
    process: ['Natural', 'Washed', 'Honey'],
    brew: 'Pour Over',
    body: 38,
    acidity: 88,
    sweetness: 80,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Heirloom Arabica', 'Typica', 'Gesha'],
    harvest: 'Oct – Jan',
    share: '~5% of world crop; #1 for Arabica diversity',
    notes:
      'The birthplace of coffee. Yirgacheffe, Sidama, and Harrar are the famous regions. Natural-processed lots taste intensely fruity — almost like blueberry jam in citrus. Washed lots are tea-like and floral. Light-roast pour over is the honest way to taste them.',
    funFact:
      'Coffee still grows wild in the forests of Kaffa, where goat herder Kaldi is said to have found it more than 1,000 years ago.',
    guideHref: '/coffee-beans/coffee-bean-origins-guide',
  },
  {
    id: 'CO',
    isoNumeric: '170',
    name: 'Colombia',
    flag: '🇨🇴',
    belt: 'Americas',
    region: 'South America',
    coords: [-75.5, 4.5],
    altitude: '1,200 – 2,200 m',
    flavors: ['Caramel', 'Red Apple', 'Hazelnut', 'Milk Chocolate', 'Orange Zest'],
    process: ['Washed', 'Natural', 'Honey', 'Anaerobic'],
    brew: 'Pour Over / Drip',
    body: 52,
    acidity: 60,
    sweetness: 75,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Caturra', 'Castillo', 'Pink Bourbon', 'Gesha'],
    harvest: 'Oct – Feb (main), Apr – Jun (mitaca)',
    share: '~8% of world crop; #3 producer',
    notes:
      'Washed process and two harvests a year produce a reliably clean, sweet cup. Huila and Nariño lead specialty. High lots of Pink Bourbon and Gesha in Huila and Cauca are a different drink again — floral, tropical, sometimes anaerobic and winey — still Colombia, not a separate country on the map.',
    funFact:
      'Equatorial geography gives Colombia two distinct harvests. Pink Bourbon was once thought to be a mutation; genetic tests treat it as its own variety.',
    guideHref: '/coffee-beans/coffee-bean-origins-guide',
  },
  {
    id: 'BR',
    isoNumeric: '076',
    name: 'Brazil',
    flag: '🇧🇷',
    belt: 'Americas',
    region: 'South America',
    coords: [-46, -16],
    altitude: '800 – 1,200 m',
    flavors: ['Dark Chocolate', 'Peanut', 'Brown Sugar', 'Walnut', 'Dried Fruit'],
    process: ['Natural', 'Pulped Natural', 'Washed'],
    brew: 'Espresso / French Press',
    body: 82,
    acidity: 22,
    sweetness: 68,
    caffeine: 'Medium',
    species: 'Both',
    varietal: ['Bourbon', 'Mundo Novo', 'Catuai', 'Icatu'],
    harvest: 'May – Sep',
    share: '~35–40% of world crop; #1 producer',
    notes:
      'Largest producer on earth. Lower altitudes and natural processing yield low-acid, nutty, chocolatey beans — the backbone of most espresso blends. Minas Gerais and Cerrado do well for consistent lots; specialty naturals from Sul de Minas can be surprisingly sweet.',
    funFact:
      'If Brazilians drank every bean they grow, each person would need about six cups a day. Most of it is exported instead.',
  },
  {
    id: 'GT',
    isoNumeric: '320',
    name: 'Guatemala',
    flag: '🇬🇹',
    belt: 'Americas',
    region: 'Central America',
    coords: [-90.5, 15.5],
    altitude: '1,300 – 2,000 m',
    flavors: ['Dark Chocolate', 'Brown Spice', 'Dried Apple', 'Toffee', 'Smoke'],
    process: ['Washed'],
    brew: 'Pour Over / Drip',
    body: 68,
    acidity: 65,
    sweetness: 60,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Bourbon', 'Caturra', 'Catuai', 'Pache'],
    harvest: 'Dec – Mar',
    share: 'Major Central American specialty origin',
    notes:
      'Eight growing regions shaped by volcanoes and altitude. Antigua — between three volcanoes — is the flagship for chocolatey, spicy, full-bodied cups. Huehuetenango is higher and brighter.',
    funFact:
      'Antigua’s volcanic ash acts like a slow-release fertilizer, which is part of why those beans taste so dense.',
  },
  {
    id: 'CR',
    isoNumeric: '188',
    name: 'Costa Rica',
    flag: '🇨🇷',
    belt: 'Americas',
    region: 'Central America',
    coords: [-84, 10],
    altitude: '1,200 – 1,900 m',
    flavors: ['Honey', 'Peach', 'Citrus', 'Milk Chocolate', 'Brown Sugar'],
    process: ['Honey', 'Washed', 'Natural'],
    brew: 'Pour Over',
    body: 50,
    acidity: 66,
    sweetness: 78,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Caturra', 'Catuai', 'Villa Sarchi'],
    harvest: 'Nov – Mar',
    share: 'Small volume, high specialty share',
    notes:
      'Costa Rica popularized honey process in specialty: fruit sugars left on the parchment, cleaner than a full natural. Tarrazú is the celebrated zone. Expect peach, honey, and citrus rather than heavy earth.',
    funFact:
      'Robusta cultivation is banned here — legally, Costa Rican coffee is Arabica.',
  },
  {
    id: 'KE',
    isoNumeric: '404',
    name: 'Kenya',
    flag: '🇰🇪',
    belt: 'Africa',
    region: 'East Africa',
    coords: [37.5, 0.2],
    altitude: '1,400 – 2,100 m',
    flavors: ['Blackcurrant', 'Grapefruit', 'Tomato', 'Dark Berry', 'Wine'],
    process: ['Washed (Double-Washed)'],
    brew: 'Pour Over',
    body: 55,
    acidity: 95,
    sweetness: 62,
    caffeine: 'High',
    species: 'Arabica',
    varietal: ['SL28', 'SL34', 'Ruiru 11', 'Batian'],
    harvest: 'Oct – Dec (main), Jun – Jul (fly crop)',
    share: 'Small volume, top specialty prices',
    notes:
      'SL28/SL34 plus a long double-wash make one of the loudest cups in coffee: blackcurrant, grapefruit, sometimes tomato. Auction lots from Nyeri and Kirinyaga are what specialty shops mean by “Kenya.”',
    funFact:
      'SL28 and SL34 were bred in the 1930s for drought resistance. The flavor was a side effect.',
  },
  {
    id: 'ID',
    isoNumeric: '360',
    name: 'Indonesia',
    flag: '🇮🇩',
    belt: 'Asia',
    region: 'Southeast Asia',
    coords: [100, 0],
    altitude: '1,000 – 1,700 m',
    flavors: ['Earth', 'Cedar', 'Dark Chocolate', 'Tobacco', 'Mushroom'],
    process: ['Wet-Hulled (Giling Basah)', 'Washed', 'Natural'],
    brew: 'French Press / Drip',
    body: 95,
    acidity: 20,
    sweetness: 45,
    caffeine: 'High',
    species: 'Both',
    varietal: ['Typica', 'Catimor', 'Tim Tim', 'Linie-S'],
    harvest: 'Sep – Mar (Sumatra), Jul – Sep (Java)',
    share: '~6% of world crop; #4 producer',
    notes:
      'Sumatra’s wet-hulling (giling basah) makes the famous low-acid, earthy, syrupy cup. Java is cleaner. Sulawesi sits in between. If you hate bright African coffee, this is usually the origin that converts you.',
    funFact:
      'Kopi luwak comes from here and can sell for hundreds per kilo. Most farmed civet coffee is an animal-welfare problem — skip it.',
  },
  {
    id: 'VN',
    isoNumeric: '704',
    name: 'Vietnam',
    flag: '🇻🇳',
    belt: 'Asia',
    region: 'Southeast Asia',
    coords: [108, 12],
    altitude: '500 – 1,500 m',
    flavors: ['Dark Chocolate', 'Rubber', 'Grain', 'Molasses', 'Dried Fruit'],
    process: ['Natural', 'Dry', 'Washed'],
    brew: 'Phin Filter / Iced / Espresso blend',
    body: 90,
    acidity: 12,
    sweetness: 40,
    caffeine: 'Very High',
    species: 'Robusta',
    varietal: ['Robusta', 'Arabica (limited)', 'Excelsa'],
    harvest: 'Nov – Jan',
    share: '~15–20% of world crop; #2 producer',
    notes:
      'Mostly Robusta — nearly twice the caffeine of Arabica — grown for instant, espresso crema, and cà phê sữa đá. The Central Highlands (Đắk Lắk) dominate volume. Specialty Arabica exists but is not what “Vietnamese coffee” means on a menu.',
    funFact:
      'Vietnam went from almost no export in 1975 to #2 producer by 2000. French colonists planted the first commercial trees in the 1800s.',
    guideHref: '/recipes/vietnamese-iced-coffee',
  },
  {
    id: 'HN',
    isoNumeric: '340',
    name: 'Honduras',
    flag: '🇭🇳',
    belt: 'Americas',
    region: 'Central America',
    coords: [-87, 14.8],
    altitude: '1,000 – 1,700 m',
    flavors: ['Peach', 'Mango', 'Caramel', 'Milk Chocolate', 'Orange'],
    process: ['Washed', 'Natural'],
    brew: 'Pour Over / Drip',
    body: 52,
    acidity: 58,
    sweetness: 72,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Catuai', 'Caturra', 'Bourbon', 'IHCAFE 90'],
    harvest: 'Nov – Mar',
    share: 'Largest Central American producer by volume',
    notes:
      'Copán, Marcala, and Comayagua can be fruit-forward and sweet — often better value than Guatemala at the same grade. Quality climbed fast after rust outbreaks forced farm renewal in the 2010s.',
    funFact:
      'Honduras overtook Guatemala in volume around 2011. Specialty buyers noticed the quality jump a few years later.',
  },
  {
    id: 'MX',
    isoNumeric: '484',
    name: 'Mexico',
    flag: '🇲🇽',
    belt: 'Americas',
    region: 'Central America',
    coords: [-93, 16.5],
    altitude: '900 – 1,500 m',
    flavors: ['Chocolate', 'Almond', 'Mild Citrus', 'Cinnamon', 'Walnut'],
    process: ['Washed'],
    brew: 'Drip / AeroPress',
    body: 45,
    acidity: 40,
    sweetness: 65,
    caffeine: 'Low',
    species: 'Arabica',
    varietal: ['Typica', 'Bourbon', 'Pluma Hidalgo', 'Maragogipe'],
    harvest: 'Nov – Mar',
    share: 'Large domestic market; Chiapas leads export',
    notes:
      'Chiapas, Veracruz, and Oaxaca. Mild, nutty, chocolatey — an everyday drip coffee more than a competition lot. Shade-grown and organic lots are common on US grocery shelves.',
    funFact:
      'Oaxaca grows Maragogipe “elephant beans,” a mutation about three times normal size.',
  },
  {
    id: 'PE',
    isoNumeric: '604',
    name: 'Peru',
    flag: '🇵🇪',
    belt: 'Americas',
    region: 'South America',
    coords: [-76, -8],
    altitude: '1,500 – 2,100 m',
    flavors: ['Floral', 'Citrus', 'Green Apple', 'Mild Caramel', 'Jasmine'],
    process: ['Washed'],
    brew: 'Pour Over / Drip',
    body: 42,
    acidity: 70,
    sweetness: 68,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Typica', 'Bourbon', 'Caturra', 'Pache'],
    harvest: 'Mar – Sep',
    share: 'Top organic exporter some years',
    notes:
      'High farms in Cajamarca and San Martín: clean, bright, delicate. Often cheaper than Colombia for similar washed character. Excellent for light filter roasts if you want florals without Kenya-level punch.',
    funFact:
      'Most Peruvian coffee is grown on plots under 3 hectares — more than 100,000 smallholders.',
  },
  {
    id: 'TZ',
    isoNumeric: '834',
    name: 'Tanzania',
    flag: '🇹🇿',
    belt: 'Africa',
    region: 'East Africa',
    coords: [35.5, -6],
    altitude: '1,400 – 1,800 m',
    flavors: ['Blackberry', 'Plum', 'Dried Citrus', 'Wine', 'Dark Chocolate'],
    process: ['Washed', 'Natural'],
    brew: 'Pour Over',
    body: 56,
    acidity: 76,
    sweetness: 62,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Kent', 'Bourbon', 'N39', 'Arusha'],
    harvest: 'Jul – Dec',
    share: 'Known for Kilimanjaro peaberry lots',
    notes:
      'Kilimanjaro slopes are famous for peaberry — one round seed instead of two flats. Flavor sits between Kenya brightness and chocolate. Southern highlands lots are quieter and cheaper.',
    funFact:
      'About 10% of cherries form peaberries. Kilimanjaro peaberries are among the most collected in East Africa.',
  },
  {
    id: 'IN',
    isoNumeric: '356',
    name: 'India',
    flag: '🇮🇳',
    belt: 'Asia',
    region: 'South Asia',
    coords: [76, 12],
    altitude: '600 – 1,800 m',
    flavors: ['Cardamom', 'Earth', 'Dark Chocolate', 'Cedar', 'Pepper'],
    process: ['Washed', 'Natural', 'Monsooned Malabar'],
    brew: 'Espresso / Filter',
    body: 78,
    acidity: 28,
    sweetness: 50,
    caffeine: 'High',
    species: 'Both',
    varietal: ['S795', 'Cauvery', 'Chandragiri', 'Selection 9'],
    harvest: 'Nov – Feb',
    share: 'Large Robusta + unique monsooned Arabica',
    notes:
      'Monsooned Malabar is India’s signature: beans left in humid west-coast air until they swell, fade in acidity, and taste musty-sweet and low-acid. Classic in espresso blends. Washed Karnataka lots are cleaner and nuttier.',
    funFact:
      'The monsoon process copied what sailing ships used to do accidentally on the voyage to Europe.',
  },
  {
    id: 'YE',
    isoNumeric: '887',
    name: 'Yemen',
    flag: '🇾🇪',
    belt: 'Caribbean & Middle East',
    region: 'Middle East',
    coords: [44.2, 15.3],
    altitude: '1,500 – 2,500 m',
    flavors: ['Wine', 'Dark Dried Fruit', 'Chocolate', 'Tobacco', 'Incense'],
    process: ['Natural (Dry)'],
    brew: 'Pour Over / Ibrik',
    body: 62,
    acidity: 72,
    sweetness: 56,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Udaini', 'Ismaili', 'Dawairi', 'Tuffahi'],
    harvest: 'Nov – Dec',
    share: 'Tiny volume, historic origin of traded coffee',
    notes:
      'Port of Mocha named the mocha flavor people still use. Dry process on rooftops, old varieties, high terraces. Cups can taste like dried fruit, wine, and incense — irregular lots, high prices, real terroir.',
    funFact:
      'Yemen held a trade monopoly for centuries. Exporters boiled or damaged beans so other countries could not plant them.',
  },
  {
    id: 'PA',
    isoNumeric: '591',
    name: 'Panama',
    flag: '🇵🇦',
    belt: 'Americas',
    region: 'Central America',
    coords: [-82.5, 8.6],
    altitude: '1,200 – 1,800 m',
    flavors: ['Jasmine', 'Mango', 'Peach', 'Bergamot', 'Lychee'],
    process: ['Natural', 'Washed', 'Honey'],
    brew: 'Pour Over',
    body: 36,
    acidity: 72,
    sweetness: 85,
    caffeine: 'Low',
    species: 'Arabica',
    varietal: ['Gesha/Geisha', 'Catuai', 'Typica'],
    harvest: 'Dec – Mar',
    share: 'Tiny volume; luxury Gesha auctions',
    notes:
      'Boquete Gesha (Geisha) from Hacienda La Esmeralda and neighbors can auction for $1,000+/kg. Floral, tea-like, tropical. Not a daily driver — a cupping-table origin. Ordinary Catuai from Panama is pleasant and much cheaper.',
    funFact:
      'The 2004 Best of Panama Gesha lot is the moment specialty coffee started behaving like a luxury market.',
  },
  {
    id: 'PH',
    isoNumeric: '608',
    name: 'Philippines',
    flag: '🇵🇭',
    belt: 'Asia',
    region: 'Southeast Asia',
    coords: [123, 8],
    altitude: '700 – 1,500 m',
    flavors: ['Chocolate', 'Nut', 'Brown Sugar', 'Mild Spice', 'Earth'],
    process: ['Washed', 'Natural', 'Honey'],
    brew: 'Drip / AeroPress',
    body: 58,
    acidity: 35,
    sweetness: 62,
    caffeine: 'Very High',
    species: 'Both',
    varietal: ['Barako (Liberica)', 'Excelsa', 'Arabica', 'Robusta'],
    harvest: 'Sep – Feb',
    share: 'Grows all four commercial coffee species',
    notes:
      'One of the few countries with Arabica, Robusta, Liberica, and Excelsa. Barako (Liberica) is the local bold cup — big beans, woody, very caffeinated. Cordillera Arabica is milder.',
    funFact:
      'Most of the world’s Liberica still comes from here. Beans are huge compared with Arabica.',
  },
  {
    id: 'RW',
    isoNumeric: '646',
    name: 'Rwanda',
    flag: '🇷🇼',
    belt: 'Africa',
    region: 'East Africa',
    coords: [29.9, -2],
    altitude: '1,700 – 2,200 m',
    flavors: ['Hibiscus', 'Black Tea', 'Orange', 'Brown Sugar', 'Tamarind'],
    process: ['Washed', 'Natural'],
    brew: 'Pour Over / Drip',
    body: 46,
    acidity: 80,
    sweetness: 70,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Bourbon', 'Jackson', 'Mibirizi'],
    harvest: 'Mar – Jun',
    share: 'Specialty success story; modest volume',
    notes:
      'Elegant, tea-like, floral. Bourbon on high hills, lots of washed lots through washing stations. A quieter Kenya: citrus and hibiscus without as much tomato/blackcurrant punch.',
    funFact:
      'Coffee was part of post-1994 reconstruction. Specialty premiums arrived within about a decade of rebuilding the sector.',
  },
  {
    id: 'HT',
    isoNumeric: '332',
    name: 'Haiti',
    flag: '🇭🇹',
    belt: 'Caribbean & Middle East',
    region: 'Caribbean',
    coords: [-72.3, 19],
    altitude: '600 – 1,500 m',
    flavors: ['Mild Chocolate', 'Spice', 'Earth', 'Mild Fruit', 'Nut'],
    process: ['Washed', 'Natural'],
    brew: 'Drip / French Press',
    body: 55,
    acidity: 45,
    sweetness: 58,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Typica', 'Haitian Blue (Typica variant)'],
    harvest: 'Aug – Mar',
    share: 'Historic giant; small specialty today',
    notes:
      'In the 1700s Haiti supplied a huge share of Europe’s coffee. Today Haitian Bleu from the south is a mild, spiced, smooth cup — hard to find, worth trying if you see it.',
    funFact:
      'Around 1789 Haiti supplied over half the world’s coffee. The 1791 revolution redrew the global supply map.',
  },
  {
    id: 'UG',
    isoNumeric: '800',
    name: 'Uganda',
    flag: '🇺🇬',
    belt: 'Africa',
    region: 'East Africa',
    coords: [32.5, 1.2],
    altitude: '1,200 – 2,200 m',
    flavors: ['Dark Chocolate', 'Stone Fruit', 'Earth', 'Tobacco', 'Brown Sugar'],
    process: ['Washed', 'Natural'],
    brew: 'Espresso / French Press',
    body: 75,
    acidity: 42,
    sweetness: 55,
    caffeine: 'High',
    species: 'Both',
    varietal: ['Robusta (Nganda, Erecta)', 'SL14', 'Bugisu Arabica'],
    harvest: 'Oct – Feb (main), May – Jul (secondary)',
    share: 'Africa’s largest Robusta producer',
    notes:
      'Wild Robusta is native here. Volume is Robusta; the interesting cup is Bugisu Arabica on Mount Elgon — chocolate and stone fruit, fuller than Kenya. Fine in espresso blends.',
    funFact:
      'Global Robusta traces back to plants collected in Ugandan forests. Robusta is now about 40% of world production.',
  },
  {
    id: 'CN',
    isoNumeric: '156',
    name: 'China (Yunnan)',
    flag: '🇨🇳',
    belt: 'Asia',
    region: 'East Asia',
    coords: [101, 24],
    altitude: '1,000 – 2,000 m',
    flavors: ['Brown Sugar', 'Mild Chocolate', 'Dried Fruit', 'Floral', 'Spice'],
    process: ['Washed', 'Natural', 'Honey'],
    brew: 'Pour Over / Drip',
    body: 50,
    acidity: 52,
    sweetness: 65,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Catimor', 'Bourbon', 'Typica', 'Yunnan Arabica'],
    harvest: 'Nov – Mar',
    share: 'Fastest-growing origin this century',
    notes:
      'Yunnan is new on specialty shelves: Catimor-heavy, improving processing, brown sugar and mild chocolate. Not Ethiopia — more Central-America-adjacent. Pu’er coffee sits next to the tea belt.',
    funFact:
      'Near-zero specialty output in 2010; well over 100,000 tonnes a year by the 2020s.',
  },
  {
    id: 'SV',
    isoNumeric: '222',
    name: 'El Salvador',
    flag: '🇸🇻',
    belt: 'Americas',
    region: 'Central America',
    coords: [-88.9, 13.7],
    altitude: '1,200 – 1,800 m',
    flavors: ['Apple', 'Caramel', 'Milk Chocolate', 'Honey', 'Red Fruit'],
    process: ['Honey', 'Washed', 'Natural'],
    brew: 'Pour Over / Espresso',
    body: 58,
    acidity: 55,
    sweetness: 74,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Pacamara', 'Bourbon', 'Pacas'],
    harvest: 'Nov – Mar',
    share: 'Small; Pacamara and honey-process specialist',
    notes:
      'Santa Ana and Apaneca-Ilamatepec volcanoes. Pacamara (Pacas × Maragogipe) is the celebrity variety — big beans, caramel, stone fruit. Honey process is common. Cups are sweet rather than sharp.',
    funFact:
      'Pacamara was bred in El Salvador in the 1950s. It is still one of the few modern varieties people chase by name.',
  },
  {
    id: 'NI',
    isoNumeric: '558',
    name: 'Nicaragua',
    flag: '🇳🇮',
    belt: 'Americas',
    region: 'Central America',
    coords: [-85.8, 13],
    altitude: '1,000 – 1,600 m',
    flavors: ['Cocoa', 'Peanut', 'Orange', 'Brown Sugar', 'Mild Spice'],
    process: ['Washed', 'Natural', 'Honey'],
    brew: 'Drip / Espresso',
    body: 62,
    acidity: 48,
    sweetness: 68,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Caturra', 'Catimor', 'Maragogipe', 'Pacamara'],
    harvest: 'Dec – Mar',
    share: 'Jinotega and Matagalpa dominate export',
    notes:
      'Jinotega and Matagalpa: cocoa, peanut, orange. A solid espresso-blend origin that also produces pretty washed filters. Less flashy than Costa Rica, usually cheaper, very drinkable.',
    funFact:
      'Nicaragua still grows Maragogipe “elephant beans” in pockets — the same oversized mutation as Mexico.',
  },
  {
    id: 'PG',
    isoNumeric: '598',
    name: 'Papua New Guinea',
    flag: '🇵🇬',
    belt: 'Asia',
    region: 'Pacific',
    coords: [144, -6],
    altitude: '1,300 – 2,000 m',
    flavors: ['Tropical Fruit', 'Citrus', 'Floral', 'Dark Chocolate', 'Spice'],
    process: ['Washed', 'Semi-washed'],
    brew: 'Pour Over / Drip',
    body: 64,
    acidity: 68,
    sweetness: 66,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Typica', 'Bourbon', 'Arusha'],
    harvest: 'Apr – Sep',
    share: 'Highland Arabica; Sigri and Western Highlands lots',
    notes:
      'Eastern Highlands and Western Highlands: tropical fruit, citrus, a chocolate finish. Think “Africa-adjacent brightness with more body.” Sigri estate coffee is the name older drinkers still search.',
    funFact:
      'Coffee arrived from Jamaica’s Blue Mountain stock in the 20th century — which is why some cups feel related to Caribbean mildness with Pacific fruit.',
  },
  {
    id: 'JM',
    isoNumeric: '388',
    name: 'Jamaica',
    flag: '🇯🇲',
    belt: 'Caribbean & Middle East',
    region: 'Caribbean',
    coords: [-76.8, 18.1],
    altitude: '600 – 1,700 m',
    flavors: ['Mild Chocolate', 'Nut', 'Herbal', 'Cane Sugar', 'Clean Finish'],
    process: ['Washed'],
    brew: 'Drip / Pour Over',
    body: 48,
    acidity: 42,
    sweetness: 70,
    caffeine: 'Low',
    species: 'Arabica',
    varietal: ['Typica (Blue Mountain)'],
    harvest: 'Aug – Mar',
    share: 'Tiny; Blue Mountain is a GI luxury lot',
    notes:
      'Jamaica Blue Mountain is mild, clean, low-acid, and expensive because of the name and tiny certified zone — not because it tastes like Kenya. Counterfeits are common. On this low-resolution map the island is easy to miss; use the list.',
    funFact:
      'Certified Blue Mountain is a tiny fraction of Jamaican agriculture. A lot of “Blue Mountain blend” coffee is mostly other origins.',
  },
  {
    id: 'BI',
    isoNumeric: '108',
    name: 'Burundi',
    flag: '🇧🇮',
    belt: 'Africa',
    region: 'East Africa',
    coords: [29.9, -3.4],
    altitude: '1,500 – 2,000 m',
    flavors: ['Red Currant', 'Black Tea', 'Citrus', 'Brown Sugar', 'Floral'],
    process: ['Washed', 'Natural'],
    brew: 'Pour Over',
    body: 44,
    acidity: 84,
    sweetness: 72,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Red Bourbon'],
    harvest: 'Mar – Jul',
    share: 'Small; washing-station lots for specialty',
    notes:
      'Neighbor to Rwanda with a similar washed Bourbon profile: tea, citrus, red fruit. Kayanza and Ngozi stations show up on specialty bags. Bright, sweet, lighter-bodied than Kenya.',
    funFact:
      'Almost all export coffee is Arabica Bourbon processed at washing stations rather than on individual farms.',
  },
  {
    id: 'EC',
    isoNumeric: '218',
    name: 'Ecuador',
    flag: '🇪🇨',
    belt: 'Americas',
    region: 'South America',
    coords: [-79, -1.5],
    altitude: '1,200 – 2,000 m',
    flavors: ['Floral', 'Cane Sugar', 'Citrus', 'Green Apple', 'Bergamot'],
    process: ['Washed', 'Natural', 'Honey'],
    brew: 'Pour Over',
    body: 40,
    acidity: 74,
    sweetness: 76,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Typica', 'Bourbon', 'Caturra', 'Sidra', 'Gesha'],
    harvest: 'Year-round pockets (equator)',
    share: 'Small specialty; Galápagos and highland lots',
    notes:
      'Equatorial highlands can produce floral, sugary cups — Sidra and Gesha lots have had competition buzz. Volume is tiny next to Colombia. If you see Ecuador on a menu, it is usually a specialty experiment, not commodity fill.',
    funFact:
      'Being on the equator means some farms pick almost year-round instead of one harvest flush.',
  },
]

const BY_ID: Record<string, Origin> = Object.fromEntries(ORIGINS.map((o) => [o.id, o]))
const ISO_TO_ID: Record<string, string> = Object.fromEntries(
  ORIGINS.map((o) => [o.isoNumeric, o.id]),
)

const BELTS: Belt[] = ['Africa', 'Americas', 'Asia', 'Caribbean & Middle East']

const BELT_FILL: Record<Belt, { base: string; hover: string; selected: string }> = {
  Africa: { base: '#b45309', hover: '#d97706', selected: '#fbbf24' },
  Americas: { base: '#c2410c', hover: '#ea580c', selected: '#fb923c' },
  Asia: { base: '#a16207', hover: '#ca8a04', selected: '#facc15' },
  'Caribbean & Middle East': { base: '#9a3412', hover: '#c2410c', selected: '#fdba74' },
}

const FLAVOR_PALETTE: Record<string, string> = {
  Blueberry: 'bg-indigo-950/60 text-indigo-300 border-indigo-800/40',
  Jasmine: 'bg-pink-950/60 text-pink-300 border-pink-800/40',
  Bergamot: 'bg-violet-950/60 text-violet-300 border-violet-800/40',
  Lemon: 'bg-yellow-950/60 text-yellow-300 border-yellow-800/40',
  Peach: 'bg-orange-950/60 text-orange-300 border-orange-800/40',
  Caramel: 'bg-amber-950/60 text-amber-300 border-amber-800/40',
  Chocolate: 'bg-stone-900/70 text-stone-300 border-stone-700/40',
  'Dark Chocolate': 'bg-stone-900/70 text-stone-300 border-stone-700/40',
  Earth: 'bg-neutral-900/70 text-neutral-400 border-neutral-700/40',
  Tobacco: 'bg-yellow-950/50 text-yellow-600 border-yellow-900/40',
  Wine: 'bg-rose-950/60 text-rose-300 border-rose-800/40',
  Hibiscus: 'bg-fuchsia-950/60 text-fuchsia-300 border-fuchsia-800/40',
  Rose: 'bg-pink-950/60 text-pink-400 border-pink-800/40',
  Mango: 'bg-orange-950/60 text-orange-400 border-orange-800/40',
  default: 'bg-white/5 text-white/60 border-white/10',
}

function flavorClass(f: string) {
  return FLAVOR_PALETTE[f] ?? FLAVOR_PALETTE.default
}

function isoKey(id: string | number) {
  return String(id).padStart(3, '0')
}

type Geo = {
  id: string | number
  rsmKey: string
  properties?: { name?: string; NAME?: string }
}

export function WorldCoffeeMap() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [belt, setBelt] = useState<Belt | 'All'>('All')
  const [zoom, setZoom] = useState(1)
  const [center, setCenter] = useState<[number, number]>([12, 8])
  const [geo, setGeo] = useState<object | null>(null)
  const [geoError, setGeoError] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  const selected = selectedId ? BY_ID[selectedId] : null
  const hovered = hoveredId ? BY_ID[hoveredId] : null

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
    if (!selected) return
    setAnimateIn(false)
    const t = setTimeout(() => setAnimateIn(true), 20)
    return () => clearTimeout(t)
  }, [selected])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ORIGINS.filter((o) => {
      if (belt !== 'All' && o.belt !== belt) return false
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
  }, [query, belt])

  function selectOrigin(id: string, fly = true) {
    const origin = BY_ID[id]
    if (!origin) return
    setSelectedId(id)
    if (fly) {
      setCenter(origin.coords)
      setZoom(3.2)
    }
  }

  function resetView() {
    setZoom(1)
    setCenter([12, 8])
    setSelectedId(null)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#120c08] text-white shadow-2xl">
      <div className="flex flex-col gap-3 border-b border-white/8 px-4 py-3 md:px-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
              {ORIGINS.length} coffee origins
            </span>
          </div>
          <p className="text-xs text-white/35">
            Search or tap a country — small islands are easier from the list.
          </p>
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

        <div className="-mx-1 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:thin]">
          {filtered.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => selectOrigin(o.id)}
              aria-pressed={selectedId === o.id}
              className={`shrink-0 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                selectedId === o.id
                  ? 'border-amber-400 bg-amber-500/20 text-amber-100'
                  : 'border-white/10 bg-white/5 text-white/70 hover:border-amber-700/40 hover:text-white'
              }`}
            >
              <span className="mr-1" aria-hidden="true">
                {o.flag}
              </span>
              {o.name}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-2 py-1 text-xs text-white/40">No origins match that search.</p>
          )}
        </div>
      </div>

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
            Map tiles could not load. Use the origin list above — every country still has a full
            profile.
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
              onMoveEnd={(pos: { coordinates: [number, number]; zoom: number }) => {
                setCenter(pos.coordinates)
                setZoom(pos.zoom)
              }}
            >
              <Geographies geography={geo}>
                {({ geographies }: { geographies: Geo[] }) =>
                  geographies.map((geoItem) => {
                    const originId = ISO_TO_ID[isoKey(geoItem.id)]
                    const origin = originId ? BY_ID[originId] : null
                    const isCoffee = Boolean(origin)
                    const isSelected = originId === selectedId
                    const fill = !origin
                      ? '#1c1209'
                      : isSelected
                        ? BELT_FILL[origin.belt].selected
                        : hoveredId === originId
                          ? BELT_FILL[origin.belt].hover
                          : BELT_FILL[origin.belt].base
                    const countryName = geoItem.properties?.name ?? geoItem.properties?.NAME

                    return (
                      <Geography
                        key={geoItem.rsmKey}
                        geography={geoItem}
                        tabIndex={isCoffee ? 0 : -1}
                        role={isCoffee ? 'button' : undefined}
                        aria-label={origin ? `${origin.name}, ${origin.region}` : countryName}
                        onClick={() => originId && selectOrigin(originId, true)}
                        onMouseEnter={() => originId && setHoveredId(originId)}
                        onMouseLeave={() => setHoveredId(null)}
                        style={{
                          default: {
                            fill,
                            stroke: '#0a0604',
                            strokeWidth: 0.5,
                            outline: 'none',
                            cursor: isCoffee ? 'pointer' : 'default',
                            transition: 'fill 0.15s ease',
                            filter: isSelected ? 'drop-shadow(0 0 6px rgba(251,191,36,0.65))' : 'none',
                          },
                          hover: {
                            fill: origin ? BELT_FILL[origin.belt].hover : '#1c1209',
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
      </div>

      {selected && (
        <div
          className="border-t border-white/8 bg-[#0e0905]"
          style={{
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        >
          <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-0">
            <div className="flex items-center gap-4">
              <span className="text-5xl leading-none drop-shadow-lg" role="img" aria-label={selected.name}>
                {selected.flag}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-2xl font-semibold text-white">{selected.name}</h3>
                  <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-xs text-white/40">
                    {selected.region}
                  </span>
                  <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-xs text-white/40">
                    {selected.species}
                  </span>
                </div>
                <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-white/40">
                  <Mountain className="size-3" />
                  {selected.altitude}
                  <span className="mx-1 text-white/20">·</span>
                  Harvest: {selected.harvest}
                </p>
                <p className="mt-1 text-xs text-amber-200/60">{selected.share}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="shrink-0 rounded-full p-1.5 text-white/30 transition-colors hover:bg-white/8 hover:text-white/70"
              aria-label="Close origin profile"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="grid gap-5 px-5 py-5 md:grid-cols-3">
            <div className="md:col-span-2 flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-white/60">{selected.notes}</p>

              <div className="rounded-xl border border-amber-800/30 bg-amber-950/25 px-4 py-3">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-amber-600">
                  Did you know
                </p>
                <p className="text-xs leading-relaxed text-amber-200/70">{selected.funFact}</p>
              </div>

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

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <Droplets className="size-3" /> Process
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {selected.process.map((p) => (
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
                  <span className="font-medium text-white/80">{selected.brew}</span>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    Varietals
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {selected.varietal.slice(0, 4).map((v) => (
                      <span key={v} className="text-white/60">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

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
                    <span className="tabular-nums font-semibold" style={{ color }}>
                      {value}
                    </span>
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
                    color:
                      selected.caffeine === 'Very High'
                        ? '#f87171'
                        : selected.caffeine === 'High'
                          ? '#fb923c'
                          : selected.caffeine === 'Medium'
                            ? '#fbbf24'
                            : '#86efac',
                  }}
                >
                  {selected.caffeine}
                </span>
              </div>

              {selected.guideHref ? (
                <Link
                  href={selected.guideHref}
                  className="mt-auto flex items-center gap-1.5 rounded-lg border border-amber-700/30 bg-amber-950/30 px-3 py-2 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-900/40"
                >
                  <Coffee className="size-3" />
                  {selected.id === 'VN' ? 'Vietnamese iced coffee recipe' : `Read ${selected.name} in the origins guide`}
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
      )}
    </div>
  )
}
