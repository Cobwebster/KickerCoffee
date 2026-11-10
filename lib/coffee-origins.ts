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
  {
    id: 'US',
    isoNumeric: '840',
    name: 'Hawaii (USA)',
    flag: '🇺🇸',
    belt: 'Americas',
    region: 'Pacific / USA',
    coords: [-155.5, 19.6],
    altitude: '200 – 900 m (Kona)',
    flavors: ['Nut', 'Brown Sugar', 'Mild Chocolate', 'Clean', 'Butter'],
    process: ['Washed', 'Natural'],
    brew: 'Drip / Pour Over',
    body: 50,
    acidity: 38,
    sweetness: 72,
    caffeine: 'Low',
    species: 'Arabica',
    varietal: ['Typica (Kona)', 'Catuai'],
    harvest: 'Aug – Jan',
    share: 'Tiny; Kona is a GI luxury lot',
    notes:
      'Kona on the Big Island is mild, clean, low-acid, and expensive for the name — similar story to Jamaica Blue Mountain. Counterfeits and “Kona blends” (mostly other origins) are common. Other Hawaiian islands grow coffee too, but Kona is what people search.',
    funFact:
      'Coffee arrived in Hawaii in the 1820s. True Kona must be grown in a narrow belt on the slopes of Hualālai and Mauna Loa.',
  },
  {
    id: 'BO',
    isoNumeric: '068',
    name: 'Bolivia',
    flag: '🇧🇴',
    belt: 'Americas',
    region: 'South America',
    coords: [-65.5, -16.5],
    altitude: '1,500 – 2,200 m',
    flavors: ['Stone Fruit', 'Caramel', 'Floral', 'Citrus', 'Milk Chocolate'],
    process: ['Washed', 'Natural'],
    brew: 'Pour Over / Drip',
    body: 48,
    acidity: 68,
    sweetness: 74,
    caffeine: 'Medium',
    species: 'Arabica',
    varietal: ['Caturra', 'Catuai', 'Typica'],
    harvest: 'Jun – Oct',
    share: 'Small specialty; Yungas and Caranavi',
    notes:
      'High Andean farms in Caranavi and the Yungas produce sweet, clean washed cups — stone fruit and caramel without Kenya-level punch. Volume is tiny next to Brazil or Peru, so when Bolivia shows up on a specialty menu it is usually a carefully sourced lot.',
    funFact:
      'Bolivia is one of the highest coffee-growing countries in the Americas. Thin air and cool nights slow cherry ripening.',
  },
  {
    id: 'TH',
    isoNumeric: '764',
    name: 'Thailand',
    flag: '🇹🇭',
    belt: 'Asia',
    region: 'Southeast Asia',
    coords: [99.5, 18.5],
    altitude: '800 – 1,500 m',
    flavors: ['Chocolate', 'Spice', 'Mild Fruit', 'Tobacco', 'Brown Sugar'],
    process: ['Washed', 'Natural', 'Honey'],
    brew: 'Drip / Espresso',
    body: 66,
    acidity: 36,
    sweetness: 58,
    caffeine: 'High',
    species: 'Both',
    varietal: ['Catimor', 'Typica', 'Robusta'],
    harvest: 'Nov – Mar',
    share: 'Growing specialty scene in the north',
    notes:
      'Northern highlands around Chiang Mai and Chiang Rai: chocolatey, spicy cups with rising washed and honey lots. Historically more Robusta and domestic coffee culture than export specialty — that is changing as Thai cafés and exporters chase quality.',
    funFact:
      'The Thai royal project that encouraged highland farmers to plant coffee instead of opium helped seed today’s northern coffee belt.',
  },

]


export type { Belt, Species, Origin }

export const COFFEE_ORIGINS = ORIGINS

export const ORIGIN_BY_ID: Record<string, Origin> = Object.fromEntries(
  ORIGINS.map((o) => [o.id, o]),
)

/** Skip Hawaii — ISO 840 is the entire USA and would paint the whole country. */
export const ISO_TO_ORIGIN_ID: Record<string, string> = Object.fromEntries(
  ORIGINS.filter((o) => o.id !== 'US' && o.isoNumeric).map((o) => [o.isoNumeric, o.id]),
)

export const BELTS: Belt[] = ['Africa', 'Americas', 'Asia', 'Caribbean & Middle East']

export const BELT_FILL: Record<Belt, { base: string; hover: string; selected: string }> = {
  Africa: { base: '#b45309', hover: '#d97706', selected: '#fbbf24' },
  Americas: { base: '#c2410c', hover: '#ea580c', selected: '#fb923c' },
  Asia: { base: '#a16207', hover: '#ca8a04', selected: '#facc15' },
  'Caribbean & Middle East': { base: '#9a3412', hover: '#c2410c', selected: '#fdba74' },
}

export type CupStyle = 'All' | 'Bright' | 'Chocolate' | 'Earthy' | 'Floral'

export function matchesCupStyle(o: Origin, style: CupStyle): boolean {
  if (style === 'All') return true
  if (style === 'Bright') return o.acidity >= 72
  if (style === 'Chocolate') {
    return (
      o.body >= 55 &&
      o.acidity <= 58 &&
      o.flavors.some((f) => /chocolate|cocoa|nut|caramel|peanut|walnut|almond/i.test(f))
    )
  }
  if (style === 'Earthy') {
    return (
      o.flavors.some((f) => /earth|cedar|tobacco|mushroom|rubber|pepper/i.test(f)) ||
      /wet-hull|monsoon/i.test(o.process.join(' '))
    )
  }
  if (style === 'Floral') {
    return o.flavors.some((f) => /floral|jasmine|bergamot|hibiscus|tea|lychee/i.test(f))
  }
  return true
}

export function originSlug(o: Origin): string {
  return o.name
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function findOriginFromHash(hash: string): Origin | undefined {
  const h = hash.replace(/^#/, '').trim().toLowerCase()
  if (!h) return undefined
  return (
    ORIGINS.find((o) => o.id.toLowerCase() === h) ||
    ORIGINS.find((o) => originSlug(o) === h) ||
    ORIGINS.find((o) => o.name.toLowerCase() === h)
  )
}
