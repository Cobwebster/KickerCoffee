import type { ContentBlock, FaqItem } from './content'

export type FoodGuide = {
  slug: string
  topic: string
  title: string
  metaDescription: string
  excerpt: string
  readTime: string
  updated: string
  image: string
  quickAnswer: string
  intro: string
  /** Featured food recipes to card-link throughout the guide. */
  featuredRecipes: {
    slug: string
    role: string
    coffeeNote: string
  }[]
  body: ContentBlock[]
  faqs: FaqItem[]
  keywords: string[]
}

export const FOOD_GUIDES: FoodGuide[] = [
  {
    slug: 'best-snacks-with-coffee',
    topic: 'Coffee pairings',
    title: 'Best Snacks to Have with Coffee — Sweet, Savory & Healthy Pairings',
    metaDescription:
      'Best snacks with coffee: cookies, brownies, avocado toast, overnight oats, yogurt parfait, and more. Café-style pairings with links to homemade food recipes.',
    excerpt:
      'What to eat with your cup — bakery classics, healthy breakfast jars, and savory lunch plates, with recipes for each.',
    readTime: '12 min',
    updated: '2026-11-26',
    image: '/images/food/chocolate-chip-cookies.webp',
    keywords: [
      'best snacks with coffee',
      'what to eat with coffee',
      'coffee and cookies',
      'coffee pairings food',
      'best food with coffee',
      'coffee snack ideas',
      'breakfast with coffee',
      'dessert with coffee',
    ],
    quickAnswer:
      'The best snacks with coffee are ones that echo or contrast the cup: salted chocolate cookies and brownies with medium–dark coffee, avocado toast or a chicken wrap with brighter filter coffee, and overnight oats or a yogurt parfait with a flat white or drip. Pick sweet, savory, or high-protein — then brew to match.',
    intro:
      'Coffee alone is great. Coffee with the right snack is why cafés exist. The trick is pairing: fat and salt love espresso bitterness, fruit and yogurt love milk drinks, and chocolate loves a chocolatey medium or dark roast. Below is a practical guide to the best snacks to have with coffee — every plate links to a full homemade recipe on Kicker Coffee so you can cook the snack, then brew the cup.',
    featuredRecipes: [
      {
        slug: 'chocolate-chip-cookies',
        role: 'Classic sweet dunk',
        coffeeNote: 'Medium or medium-dark drip; flat white if you want milk + cookie',
      },
      {
        slug: 'salted-caramel-brownies',
        role: 'Afternoon café dessert',
        coffeeNote: 'Americano or darker filter — salt + caramel need bitterness',
      },
      {
        slug: 'chocolate-cupcakes',
        role: 'Celebration / weekend treat',
        coffeeNote: 'Espresso or cortado cuts frosting sweetness',
      },
      {
        slug: 'avocado-toast',
        role: 'Savory brunch snack',
        coffeeNote: 'Bright medium filter or cortado',
      },
      {
        slug: 'overnight-oats',
        role: 'Make-ahead breakfast',
        coffeeNote: 'Medium drip or flat white',
      },
      {
        slug: 'greek-yogurt-parfait',
        role: 'High-protein coffee break',
        coffeeNote: 'Light–medium drip; skip ultra-dark roast',
      },
      {
        slug: 'chicken-wrap',
        role: 'Savory lunch with coffee',
        coffeeNote: 'Batch brew or iced coffee on the side',
      },
      {
        slug: 'bibimbap',
        role: 'Full bowl, still coffee-friendly',
        coffeeNote: 'Clean washed filter coffee or black iced coffee',
      },
    ],
    body: [
      {
        type: 'heading',
        text: 'How to choose a snack for your coffee',
      },
      {
        type: 'paragraph',
        text: 'Match intensity. A delicate light roast next to a fudgy brownie gets lost. A bold dark roast next to avocado toast can taste ashy. As a rule: sweet bakery loves medium-to-dark coffee; savory brunch loves brighter filter or a short milk drink; high-protein bowls love cleaner cups that do not fight spice or acid.',
      },
      {
        type: 'list',
        items: [
          'Sweet + bitter: cookies, brownies, cupcakes with espresso, Americano, or chocolatey drip.',
          'Fatty + bright: avocado toast with citrusy medium roast or a cortado.',
          'Creamy + milky: oats and yogurt parfaits with flat white, latte, or gentle drip.',
          'Savory lunch: wraps and rice bowls with batch brew or iced black coffee — not a dessert mocha.',
        ],
      },
      {
        type: 'heading',
        text: 'Best sweet snacks with coffee (bakery classics)',
      },
      {
        type: 'paragraph',
        text: 'If you typed “best snacks with coffee” because you want the café cookie moment, start here. Salted chocolate chunk cookies are the default dunk: brown sugar chew, melted chocolate, and a pinch of salt that makes medium roast taste sweeter. Bake a tray from our salted chocolate chunk cookies recipe, then brew drip or pour-over while they cool — warm cookie + hot coffee is the pairing people remember.',
      },
      {
        type: 'image',
        src: '/images/food/chocolate-chip-cookies.webp',
        alt: 'Salted chocolate chunk cookies — classic snack with coffee',
        caption: 'Salted chocolate chunk cookies — the classic coffee dunk.',
      },
      {
        type: 'paragraph',
        text: 'Want something denser? Salted caramel brownies bring fudge, caramel, and salt — they need a coffee with enough bitterness to cut the sugar. An Americano or darker filter works better than a delicate light roast. For birthdays and weekend baking, chocolate cupcakes with buttercream are a frosting-forward treat; pair with espresso or a cortado so the cup stays short and bitter enough to reset your palate between bites.',
      },
      {
        type: 'tip',
        text: 'Salt on dessert is a coffee hack. A flaky pinch on cookies or brownies makes drip coffee taste chocolatey instead of thin.',
      },
      {
        type: 'heading',
        text: 'Best healthy snacks with coffee (breakfast jars & toast)',
      },
      {
        type: 'paragraph',
        text: 'Not every coffee break is dessert. Overnight oats are the make-ahead snack that still feels like breakfast: mix at night, grab the jar with your morning drip or flat white. Fruit-forward jars love a brighter medium roast; cocoa or peanut butter jars can handle a darker cup or a side espresso.',
      },
      {
        type: 'image',
        src: '/images/food/overnight-oats.webp',
        alt: 'Overnight oats jar — healthy breakfast snack with coffee',
        caption: 'Overnight oats — prep once, pair with drip or a flat white all week.',
      },
      {
        type: 'paragraph',
        text: 'Greek yogurt parfaits scratch the same itch with more protein: yogurt, fruit, crunch. Keep the coffee clean — light to medium drip — so the cup does not taste burnt next to berries. Avocado toast is the savory brunch snack: fat, salt, lemon, jammy egg. Brew a bright medium filter coffee or a cortado so the drink cuts the richness instead of adding more milk weight.',
      },
      {
        type: 'heading',
        text: 'Best savory snacks and light meals with coffee',
      },
      {
        type: 'paragraph',
        text: 'Coffee is not only a pastry drink. A chicken veggie wrap is a portable lunch that still belongs next to a travel mug of batch brew or iced coffee — savory, herby, and filling without the sugar crash of a muffin. Bibimbap is a bigger plate, but it is one of the best “I need real food with my coffee” options: rice, veg, egg, gochujang heat. Pair with a clean washed filter coffee or black iced coffee so spice and acidity stay bright.',
      },
      {
        type: 'image',
        src: '/images/food/avocado-toast.webp',
        alt: 'Avocado toast with egg — savory coffee brunch snack',
        caption: 'Avocado toast — savory brunch that loves a bright cup.',
      },
      {
        type: 'heading',
        text: 'Quick coffee + snack pairing chart',
      },
      {
        type: 'table',
        caption: 'Start here, then open the linked recipe for full method and coffee notes.',
        headers: ['Snack', 'Coffee style', 'Why it works'],
        rows: [
          ['Chocolate cookies', 'Medium / med-dark drip', 'Salt + chocolate echo roast sweetness'],
          ['Salted caramel brownies', 'Americano / darker filter', 'Bitterness cuts caramel sugar'],
          ['Chocolate cupcakes', 'Espresso or cortado', 'Short bitter reset between frosting bites'],
          ['Avocado toast', 'Bright filter or cortado', 'Acidity cuts fat like lemon'],
          ['Overnight oats', 'Drip or flat white', 'Creamy jar meets creamy or caramel cup'],
          ['Yogurt parfait', 'Light–medium drip', 'Clean cup next to fruit and dairy'],
          ['Chicken wrap', 'Batch brew / iced black', 'Savory lunch without dessert coffee'],
          ['Bibimbap', 'Washed filter / iced black', 'Clean cup keeps spice and veg bright'],
        ],
      },
      {
        type: 'heading',
        text: 'What not to pair (common mistakes)',
      },
      {
        type: 'list',
        items: [
          'Ultra-light fruity pour-over with heavy frosting cupcakes — the coffee disappears.',
          'Very dark oily roast with delicate yogurt and berries — tastes ashy.',
          'Sweet flavored latte plus brownies — double dessert, palate fatigue.',
          'Skipping salt on chocolate snacks — the coffee tastes flatter than it should.',
        ],
      },
      {
        type: 'heading',
        text: 'Build a café moment at home',
      },
      {
        type: 'paragraph',
        text: 'Pick one snack recipe, brew one intentional cup, sit down. That is the whole game. Use our food recipes hub for the full list, or jump straight to the cards above. If you are dialing the drink side, the coffee ratio calculator and brew timer help you repeat the cup that matched last week’s cookies.',
      },
      {
        type: 'quote',
        text: 'The snack should make the coffee taste better — not compete with it.',
      },
    ],
    faqs: [
      {
        question: 'What is the best snack to have with coffee?',
        answer:
          'For most people, a salted chocolate cookie or brownie with medium roast coffee is the classic win. For a healthier break, overnight oats or a Greek yogurt parfait with drip or a flat white. For savory, avocado toast or a chicken wrap.',
      },
      {
        question: 'What food goes well with black coffee?',
        answer:
          'Black coffee loves fat, salt, and chocolate — cookies, brownies, avocado toast, and savory wraps. Very sweet frosting desserts often taste better with a short espresso or cortado than with a huge black mug.',
      },
      {
        question: 'What should I eat with a latte or flat white?',
        answer:
          'Creamy milk drinks pair well with overnight oats, yogurt parfaits, and lightly sweet cookies. Heavy brownies can make a large latte feel like dessert twice — keep the cup small or switch to black coffee.',
      },
      {
        question: 'Are there healthy snacks that still taste good with coffee?',
        answer:
          'Yes. Overnight oats, Greek yogurt parfaits, avocado toast, chicken wraps, and bibimbap are all coffee-friendly without bakery sugar. Brew cleaner, medium-leaning coffee so the cup does not overpower fresh ingredients.',
      },
      {
        question: 'What dessert pairs best with espresso?',
        answer:
          'Chocolate cupcakes, salted caramel brownies, and chocolate chunk cookies. Espresso’s bitterness resets a sweet palate between bites — better than chasing dessert with a sweet flavored latte.',
      },
      {
        question: 'Can I meal-prep coffee snacks for the week?',
        answer:
          'Overnight oats and yogurt parfait components prep well. Cookies and brownies keep in a tin. Wraps are best assembled the morning you eat them so the tortilla does not get soggy.',
      },
    ],
  },
]

export function getFoodGuide(slug: string) {
  return FOOD_GUIDES.find((g) => g.slug === slug)
}
