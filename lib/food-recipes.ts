import type { ContentBlock, FaqItem } from './content'

export type FoodRecipe = {
  slug: string
  name: string
  category: 'Breakfast' | 'Healthy' | 'Bakery' | 'Lunch' | 'Dessert'
  title: string
  metaDescription: string
  excerpt: string
  difficulty: 'Beginner' | 'Intermediate'
  time: string
  prepTime?: string
  cookTime?: string
  yield: string
  updated: string
  image: string
  /** What to brew with this plate, and why the pairing works. */
  coffeePairing: {
    drink: string
    why: string
    alsoTry?: string
  }
  quickAnswer: string
  intro: string
  ingredients: string[]
  steps: string[]
  body: ContentBlock[]
  faqs: FaqItem[]
  relatedSlugs: string[]
  cuisine?: string
  keywords?: string[]
}

export const FOOD_RECIPES: FoodRecipe[] = [
  {
    slug: 'overnight-oats',
    name: 'Overnight Oats',
    category: 'Breakfast',
    title: 'Overnight Oats Recipe — Easy Healthy Breakfast (No Cooking)',
    metaDescription:
      'Overnight oats recipe with rolled oats, milk, and fruit. Make-ahead healthy breakfast, ratios, toppings, and how long they keep in the fridge.',
    excerpt:
      'Mix oats at night, wake up to a creamy jar — the no-cook breakfast that actually sticks.',
    difficulty: 'Beginner',
    time: '5 min + overnight',
    prepTime: '5 min',
    cookTime: '0 min',
    yield: '1 jar (about 350–400 ml)',
    updated: '2026-11-23',
    image: '/images/food/overnight-oats.webp',
    coffeePairing: {
      drink: 'Medium roast drip or a flat white',
      why: 'Overnight oats bring soft sweetness from fruit, maple, and creamy dairy. A medium roast drip echoes caramel and chocolate notes without harsh bitterness, so the jar still tastes like breakfast instead of dessert. A flat white works when you want the same idea in a milk drink — microfoam mirrors the yogurt-oat texture and keeps the cup small enough that it does not drown the oats.',
      alsoTry:
        'If your jar is heavy on berries, brew a brighter medium roast. If you added cocoa or peanut butter, lean darker or add a shot of espresso beside the jar.',
    },
    quickAnswer:
      'Combine ½ cup (45 g) rolled oats, ½ cup (120 ml) milk, ¼ cup (60 g) yogurt, and 1 tsp chia or maple. Stir, chill 6–8 hours, top with berries. Eat cold or warm gently.',
    intro:
      'Overnight oats are the rare healthy breakfast that is also lazy: no stove, scalable for weekday mornings, and flexible enough for both clean bowls and café-style toppings. The base ratio matters more than fancy mix-ins — get that right and the jar never turns gluey or watery.',
    ingredients: [
      '½ cup (45 g) old-fashioned rolled oats (not instant)',
      '½ cup (120 ml) milk of choice (dairy, oat, or almond)',
      '¼ cup (60 g) plain Greek yogurt (optional but creamier)',
      '1 tsp chia seeds or ground flax (optional thickener)',
      '1–2 tsp maple syrup or honey, to taste',
      'Pinch of salt',
      'Toppings: berries, kiwi, banana, nut butter, or granola',
    ],
    steps: [
      'Add oats, milk, yogurt, chia, sweetener, and salt to a jar or bowl. Stir until every oat is wet.',
      'Seal and refrigerate at least 6 hours (overnight is ideal).',
      'In the morning, stir. Loosen with a splash of milk if it seized up.',
      'Add fruit and crunchy toppings right before eating so they stay fresh.',
      'Eat cold, or microwave 30–45 seconds if you prefer it warm.',
    ],
    body: [
      { type: 'heading', text: 'The overnight oats ratio that works' },
      {
        type: 'paragraph',
        text: 'Start at roughly 1:1 oats to liquid by volume (½ cup oats + ½ cup milk), then add yogurt for body. Too much liquid and you get soup; too little and you get paste. Chia or flax absorbs liquid overnight — if you add a full tablespoon of chia, bump the milk by 2–3 tablespoons. Stir once after mixing so dry pockets of oats do not hide at the bottom of the jar.',
      },
      {
        type: 'table',
        caption: 'Scale by jar size.',
        headers: ['Oats', 'Milk', 'Yogurt', 'Result'],
        rows: [
          ['⅓ cup', '⅓ cup', '2 tbsp', 'Small snack jar'],
          ['½ cup', '½ cup', '¼ cup', 'Standard breakfast'],
          ['¾ cup', '¾ cup', '⅓ cup', 'Hungry morning / gym day'],
        ],
      },
      {
        type: 'image',
        src: '/images/food/overnight-oats-2.webp',
        alt: 'Bowls of creamy oatmeal topped with fresh berries and kiwi',
        caption: 'Top fruit right before eating so berries stay bright and kiwi does not weep into the oats.',
      },
      { type: 'heading', text: 'Rolled vs instant vs steel-cut' },
      {
        type: 'paragraph',
        text: 'Old-fashioned rolled oats are the sweet spot: they soften overnight without turning to glue. Instant oats hydrate too fast and taste pasty by morning. Steel-cut oats stay chewy unless you use more liquid and a longer soak, or simmer them briefly first. If your grocery only sells “quick oats,” reduce the soak to 4–5 hours and expect a softer jar.',
      },
      { type: 'heading', text: 'Healthy swaps without wrecking texture' },
      {
        type: 'list',
        items: [
          'Higher protein: use Greek yogurt and/or a scoop of unflavored or vanilla protein stirred in cold.',
          'Lower sugar: skip syrup and rely on ripe banana or berries.',
          'Gluten-free: use certified GF rolled oats.',
          'Dairy-free: oat milk + coconut yogurt works; almond milk runs thinner so keep the chia.',
          'More fiber: add 1 tbsp ground flax or an extra spoon of chia with a splash more milk.',
        ],
      },
      { type: 'heading', text: 'Flavor formulas that do not get boring' },
      {
        type: 'list',
        items: [
          'Berry café: vanilla, strawberries, blueberries, tiny drizzle of honey.',
          'PB banana: peanut butter stirred in cold, banana coins on top.',
          'Apple cinnamon: grated apple, cinnamon, walnuts.',
          'Mocha meal-prep: ½ tsp cocoa + tiny espresso shot cooled, then milk to volume.',
        ],
      },
      { type: 'heading', text: 'How long do overnight oats last?' },
      {
        type: 'paragraph',
        text: 'Base jars keep 3–4 days refrigerated. Add cut fruit the day you eat. If it smells sour or the texture turns slimy, toss it — oats are cheap. Batch four jars on Sunday night and you have weekday breakfasts without another decision.',
      },
      {
        type: 'tip',
        text: 'Pair with coffee: brew while you grab the jar from the fridge. A medium roast drip or flat white cuts the fruit sweetness without fighting cinnamon or maple.',
      },
    ],
    faqs: [
      {
        question: 'Do overnight oats need to be cooked?',
        answer:
          'No. Rolled oats soften in cold liquid overnight. Instant oats get mushy; steel-cut usually stay too chewy unless pre-cooked.',
      },
      {
        question: 'Can I use steel-cut oats for overnight oats?',
        answer:
          'Not as a straight swap. Steel-cut need more liquid and time, or a quick simmer first. Stick to rolled oats for classic jars.',
      },
      {
        question: 'Are overnight oats healthy?',
        answer:
          'They can be — fiber from oats, protein from yogurt, and fruit for micronutrients. Watch syrup, sweetened yogurts, and giant granola piles if you care about sugar.',
      },
      {
        question: 'Why are my overnight oats watery or gluey?',
        answer:
          'Watery means too much liquid or not enough absorbents (chia). Gluey usually means instant oats or too much chia. Reset to the ½ cup oats + ½ cup milk base.',
      },
      {
        question: 'Can I heat overnight oats?',
        answer:
          'Yes. Microwave 30–60 seconds and stir. Add a splash of milk if they thickened too much in the fridge.',
      },
    ],
    relatedSlugs: ['greek-yogurt-parfait', 'avocado-toast', 'chocolate-chip-cookies'],
    cuisine: 'American',
    keywords: ['overnight oats', 'healthy breakfast', 'meal prep oats', 'no cook breakfast'],
  },
  {
    slug: 'avocado-toast',
    name: 'Avocado Toast',
    category: 'Breakfast',
    title: 'Avocado Toast Recipe — Café-Style with Soft-Boiled Egg',
    metaDescription:
      'How to make avocado toast at home: ripe avocado, seeded bread, seasoning, and soft-boiled egg. Café brunch recipe with healthy protein options.',
    excerpt:
      'Crispy seeded toast, fanned avocado, jammy egg — the brunch plate that still feels like real food.',
    difficulty: 'Beginner',
    time: '15 min',
    prepTime: '10 min',
    cookTime: '7 min',
    yield: '1 plate (2 toasts)',
    updated: '2026-11-23',
    image: '/images/food/avocado-toast.webp',
    coffeePairing: {
      drink: 'Bright medium roast filter coffee or a cortado',
      why: 'Avocado is rich and fatty; lemon, salt, and pepper keep it savory. A citrusy medium roast cuts through that fat the way a squeeze of lemon does, so each bite stays fresh instead of heavy. A cortado is the café shortcut: enough espresso bitterness to contrast the toast, enough milk to soften any sharp acidity so it still feels like brunch.',
      alsoTry:
        'Skip ultra-dark bitter roasts — they clash with green avocado flavors. If you add smoked salmon or chili flakes, a straight espresso also works as a short, salty counterpoint.',
    },
    quickAnswer:
      'Toast sturdy bread, smash or fan ½ ripe avocado with salt, pepper, and lemon. Soft-boil an egg 6½–7 minutes, halve it, and serve beside or on the toast.',
    intro:
      'Avocado toast only disappoints when the bread is floppy or the avocado is underripe. Café versions win on toast quality, seasoning, and a protein add-on — usually egg. This is the weekday plate that still photographs like weekend brunch.',
    ingredients: [
      '2 slices sturdy seeded or sourdough bread',
      '1 ripe Hass avocado',
      '½ lemon or lime (juice)',
      'Flaky salt and freshly ground black pepper',
      'Optional: chili flakes, olive oil drizzle',
      '1–2 eggs for soft-boiling (or fried/poached)',
    ],
    steps: [
      'Bring a small pot of water to a boil. Gently lower in eggs and cook 6½–7 minutes for jammy yolks. Transfer to cold water, peel, and halve.',
      'Toast the bread until deep golden and crisp at the edges.',
      'Halve the avocado, remove the pit, and scoop the flesh. Slice for a fan or mash roughly with a fork.',
      'Season with lemon juice, salt, and pepper. Taste — avocado needs salt more than people expect.',
      'Pile or fan avocado on toast. Add chili flakes or olive oil if you want. Plate with the soft-boiled egg.',
    ],
    body: [
      { type: 'heading', text: 'How to pick a ripe avocado' },
      {
        type: 'paragraph',
        text: 'It should yield gently to palm pressure near the stem, not feel mushy or rock-hard. Under the stem cap, green means ready; brown often means bruised. Hard avocados ripen in a paper bag with a banana for a day or two. Buy a mix of ripe and firm so you have toast avocados for several mornings instead of one green panic buy.',
      },
      {
        type: 'image',
        src: '/images/food/avocado-toast-2.webp',
        alt: 'Two slices of mashed avocado toast on whole-grain bread with lemon and cracked pepper',
        caption: 'Simple café style: thick toast, chunky mash, lemon, salt, and pepper — egg optional when you want more protein.',
      },
      { type: 'heading', text: 'Bread matters more than the avocado brand' },
      {
        type: 'list',
        items: [
          'Use thick slices that can hold fat without collapsing.',
          'Seeded whole-grain adds crunch and fiber; sourdough adds flavor.',
          'Toast darker than you think — soft toast becomes soggy under avocado.',
          'Day-old bakery bread toasts better than squishy supermarket sandwich loaves.',
        ],
      },
      { type: 'heading', text: 'Mash vs slices' },
      {
        type: 'paragraph',
        text: 'A fork mash with lemon, salt, and pepper grips the toast and seasons every bite. Neat avocado slices look pretty but slide off and need more seasoning on top. For brunch photos, mash the base and fan a few thin slices over one corner.',
      },
      { type: 'heading', text: 'Healthy upgrades' },
      {
        type: 'paragraph',
        text: 'Egg adds protein. Cottage cheese under the avocado, smoked salmon, or everything-bagel seasoning all work. Chili flakes and a drizzle of olive oil are the café default. Keep portions honest: a whole giant avocado plus thick olive oil pours turns brunch into a calorie bomb.',
      },
      {
        type: 'tip',
        text: 'Coffee pairing: a bright filter coffee or cortado cuts through avocado richness. Avoid ultra-dark bitter roasts that clash with green flavors.',
      },
    ],
    faqs: [
      {
        question: 'How do you keep avocado toast from browning?',
        answer:
          'Lemon or lime juice slows browning. Assemble right before eating. Mashed avocado with acid keeps better in a sealed container for a few hours.',
      },
      {
        question: 'What bread is best for avocado toast?',
        answer:
          'Thick sourdough or seeded whole-grain that toasts crisp. Soft sandwich bread collapses under avocado.',
      },
      {
        question: 'How long to soft-boil an egg for avocado toast?',
        answer:
          'About 6½–7 minutes from boiling for a jammy yolk, depending on egg size and starting temperature. Ice bath makes peeling easier.',
      },
      {
        question: 'Is avocado toast healthy?',
        answer:
          'Avocado brings fiber and unsaturated fat; whole-grain toast and an egg make it a balanced meal. Watch oil pours, huge portions, and bacon add-ons if you are tracking calories.',
      },
    ],
    relatedSlugs: ['overnight-oats', 'greek-yogurt-parfait', 'chicken-wrap'],
    cuisine: 'American',
    keywords: ['avocado toast', 'brunch recipe', 'soft boiled egg toast', 'healthy breakfast'],
  },
  {
    slug: 'greek-yogurt-parfait',
    name: 'Greek Yogurt Parfait',
    category: 'Healthy',
    title: 'Greek Yogurt Parfait — High-Protein Breakfast or Dessert',
    metaDescription:
      'Greek yogurt parfait recipe with strawberries and honey. High-protein breakfast jars, layering tips, and healthy café-style dessert ideas.',
    excerpt:
      'Thick yogurt, honey, and fresh strawberries in a jar — protein-forward and ready in minutes.',
    difficulty: 'Beginner',
    time: '10 min',
    prepTime: '10 min',
    cookTime: '0 min',
    yield: '2 jars',
    updated: '2026-11-23',
    image: '/images/food/greek-yogurt-parfait.webp',
    coffeePairing: {
      drink: 'Espresso or Americano',
      why: 'Greek yogurt parfait is sweet-tart from honey and strawberries on a tangy dairy base. Bitter espresso (or a long Americano) resets your palate between spoonfuls so the honey does not pile up and the berries stay bright. It is the same logic cafés use when they serve a short coffee with a fruit dessert instead of another sweet latte.',
      alsoTry:
        'Want a softer breakfast vibe? Pair with a cappuccino — foam echoes the creamy yogurt. Avoid flavored syrups in the coffee; the parfait already brings the sweetness.',
    },
    quickAnswer:
      'Layer ¾–1 cup Greek yogurt with a drizzle of honey and diced strawberries in a glass. Repeat. Add granola only at serving so it stays crunchy.',
    intro:
      'A yogurt parfait is café dessert energy with breakfast macros if you choose thick Greek yogurt and real fruit. Skip the syrupy “fruit on the bottom” cups — build it yourself in two minutes and control the sugar.',
    ingredients: [
      '2 cups (450–500 g) plain Greek yogurt (2% or full-fat)',
      '2–3 tbsp honey or maple syrup, divided',
      '2 cups diced fresh strawberries',
      'Optional: granola, crushed nuts, vanilla extract, lemon zest',
    ],
    steps: [
      'Stir a little honey and optional vanilla into the yogurt so it is lightly sweet, not dessert-sweet.',
      'Dice strawberries. Toss with a teaspoon of honey if they are tart.',
      'Spoon yogurt into jars, add a fruit layer, then more yogurt, then more fruit on top.',
      'Chill until serving, or eat immediately.',
      'Add granola or nuts at the table so they do not go soggy.',
    ],
    body: [
      { type: 'heading', text: 'Greek yogurt vs regular yogurt' },
      {
        type: 'paragraph',
        text: 'Greek yogurt is strained, so you get more protein and a spoonable texture that layers cleanly. Regular yogurt runs thinner and can weep in jars. If you only have regular, drain it in a fine strainer for 20–30 minutes. Full-fat Greek tastes richer and holds layers better; 2% is a solid everyday middle ground.',
      },
      {
        type: 'image',
        src: '/images/food/yogurt-parfait-2.webp',
        alt: 'Glass jars of creamy yogurt topped with chopped strawberries',
        caption: 'Batch jars for brunch: lightly sweetened yogurt base, macerated strawberries on top, granola at the table.',
      },
      { type: 'heading', text: 'Layering order that looks café-ready' },
      {
        type: 'paragraph',
        text: 'Start with yogurt so the glass has a clean white base, then fruit, then yogurt again, then a generous fruit crown. Press each layer gently with the back of a spoon so you get distinct stripes instead of a swirl. Clear jars sell the recipe as much as flavor does.',
      },
      { type: 'heading', text: 'Make it healthier (or more dessert)' },
      {
        type: 'list',
        items: [
          'Healthy: plain yogurt, measured honey, mostly fruit.',
          'Higher protein: 0% Greek yogurt plus a spoon of chia stirred into the base.',
          'Dessert: whipped cream fold-in, chocolate shavings, cookie crumbs.',
          'Meal-prep: keep fruit and yogurt separate if storing past day one for best texture.',
        ],
      },
      { type: 'heading', text: 'Honey, maple, or nothing' },
      {
        type: 'paragraph',
        text: 'Ripe strawberries often need only a teaspoon of honey for the whole jar. Maple leans breakfast; honey leans café dessert. If fruit is peak-season sweet, skip sweetener in the yogurt and drizzle a little on the top layer only.',
      },
      {
        type: 'tip',
        text: 'Café move: serve in clear jars so the layers show. Same recipe, better presentation.',
      },
    ],
    faqs: [
      {
        question: 'Is a Greek yogurt parfait healthy?',
        answer:
          'It can be a high-protein meal when built with plain yogurt and fruit. Sweetened yogurts and heavy granola turn it into dessert — still fine, just label it honestly.',
      },
      {
        question: 'Can I make yogurt parfaits ahead?',
        answer:
          'Yes for 1–2 days if fruit is sturdy (berries). Add granola at serving. Cut fruit that browns (banana, apple) should go on last.',
      },
      {
        question: 'What fruit works best?',
        answer:
          'Strawberries, blueberries, raspberries, and peaches hold up well. Frozen fruit works if thawed and drained so it does not water down the yogurt.',
      },
      {
        question: 'How much protein is in a Greek yogurt parfait?',
        answer:
          'Roughly 15–25 g per jar depending on yogurt brand and cup size. Check the label — strained Greek varies a lot between stores.',
      },
    ],
    relatedSlugs: ['overnight-oats', 'avocado-toast', 'chocolate-chip-cookies'],
    cuisine: 'American',
    keywords: ['greek yogurt parfait', 'yogurt strawberry jar', 'high protein breakfast', 'healthy dessert'],
  },
  {
    slug: 'chocolate-chip-cookies',
    name: 'Salted Chocolate Chunk Cookies',
    category: 'Bakery',
    title: 'Salted Chocolate Chunk Cookies — Bakery-Style Soft Chewy Recipe',
    metaDescription:
      'Bakery-style salted chocolate chunk cookie recipe: thick, chewy centers, melted dark chocolate, flaky salt. Perfect with coffee.',
    excerpt:
      'Thick, chewy cookies with molten dark chocolate and a flaky salt finish — made for dunking.',
    difficulty: 'Intermediate',
    time: '35 min + chill',
    prepTime: '20 min',
    cookTime: '12 min',
    yield: '12 large cookies',
    updated: '2026-11-23',
    image: '/images/food/chocolate-chip-cookies.webp',
    coffeePairing: {
      drink: 'Espresso, cortado, or dark roast drip',
      why: 'Salted chocolate chunk cookies are sugar, butter, and molten dark chocolate. Bitter coffee cuts that sweetness so the chocolate tastes deeper instead of candy-flat, and flaky salt on the cookie pops against espresso bitterness. A cortado keeps the pairing café-sized; dark drip is the dunking cup when you want a longer sip.',
      alsoTry:
        'A latte softens the contrast if you prefer dessert-with-milk. Skip vanilla syrup in the drink — the cookie already covers sweet and aromatic.',
    },
    quickAnswer:
      'Cream butter and sugars, mix in egg and vanilla, fold dry ingredients and big chocolate chunks. Chill dough 30–60 minutes, scoop large balls, bake at 350°F / 175°C about 11–13 minutes, finish with flaky salt.',
    intro:
      'Thin crisp cookies are fine. These are the other kind: bakery-thick, pull-apart molten centers, and salt on top so they taste expensive. Chill the dough — that single step is why café cookies look different from weeknight sheet-pan cookies.',
    ingredients: [
      '1½ cups (190 g) all-purpose flour',
      '½ tsp baking soda',
      '½ tsp fine salt',
      '½ cup (113 g) unsalted butter, softened',
      '½ cup (100 g) packed brown sugar',
      '¼ cup (50 g) granulated sugar',
      '1 large egg',
      '2 tsp vanilla extract',
      '6–7 oz (170–200 g) dark chocolate, chopped into chunks',
      'Flaky sea salt, for finishing',
    ],
    steps: [
      'Whisk flour, baking soda, and fine salt in a bowl.',
      'Beat butter with both sugars until fluffy, 2–3 minutes. Beat in egg and vanilla.',
      'Mix in dry ingredients on low until just combined. Fold in chocolate chunks.',
      'Scoop large balls (about 3 tbsp). Chill 30–60 minutes (overnight is even better).',
      'Heat oven to 350°F / 175°C. Bake on a lined sheet 11–13 minutes until edges set and centers look slightly underdone.',
      'Sprinkle flaky salt while hot. Cool on the sheet 5 minutes, then move to a rack.',
    ],
    body: [
      { type: 'heading', text: 'Why chilling dough matters' },
      {
        type: 'paragraph',
        text: 'Cold dough spreads less, so cookies stay thick. Flour hydrates and flavors deepen. If you bake straight from mixing, expect flatter, greasier cookies. Overnight chill is even better — the dough firms up and the brown-sugar caramel notes get louder.',
      },
      {
        type: 'image',
        src: '/images/food/cookies-2.webp',
        alt: 'Soft chocolate chip cookies piled in a parchment-lined bowl',
        caption: 'Pull them when centers still look soft — they set on the sheet and stay chewy instead of crisp-all-the-way-through.',
      },
      { type: 'heading', text: 'Chocolate chips vs chunks' },
      {
        type: 'paragraph',
        text: 'Chopped bar chocolate melts into irregular pools. Chips hold shape. For the pull-apart look, use chunks and leave a few pieces poking out of each dough ball. A mix of chips and chopped bar gives both structure and molten pockets.',
      },
      { type: 'heading', text: 'Brown sugar, white sugar, and salt' },
      {
        type: 'paragraph',
        text: 'Brown sugar brings moisture and chew; white sugar helps browning and crisp edges. This recipe leans brown on purpose. Fine salt in the dough seasons the batter; flaky salt on top is for contrast when the cookie hits your tongue with coffee.',
      },
      { type: 'heading', text: 'Scoop size and bake cues' },
      {
        type: 'list',
        items: [
          'Large café scoops (about 3 tbsp) need the full chill and 11–13 minutes.',
          'Edges should look set and lightly golden; centers should still look pale and soft.',
          'Rotate the sheet once if your oven has hot spots.',
          'Sprinkle flaky salt the second they leave the oven so it sticks.',
        ],
      },
      {
        type: 'tip',
        text: 'Pull cookies when centers still look soft. They finish on the hot pan. Overbaking kills the chew.',
      },
    ],
    faqs: [
      {
        question: 'How do you make cookies thick and chewy?',
        answer:
          'Use more brown sugar than white, chill the dough, scoop large balls, and underbake slightly. Baking soda (not too much baking powder) helps spread and browning without cakey lift.',
      },
      {
        question: 'Can I freeze cookie dough?',
        answer:
          'Yes. Freeze scooped balls, then bake from frozen and add 1–2 minutes. Great for fresh cookies with coffee on demand.',
      },
      {
        question: 'What coffee goes with chocolate chip cookies?',
        answer:
          'Espresso or a chocolatey dark drip roast. Milk drinks (latte) also work if you want a softer pairing.',
      },
      {
        question: 'Why did my cookies go flat?',
        answer:
          'Butter was too soft or melted, dough was not chilled, or the baking sheet was warm. Chill longer and use a cool sheet for the next batch.',
      },
    ],
    relatedSlugs: ['salted-caramel-brownies', 'chocolate-cupcakes', 'overnight-oats'],
    cuisine: 'American',
    keywords: ['chocolate chip cookies', 'salted chocolate chunk cookies', 'bakery style cookies', 'cookies with coffee'],
  },
  {
    slug: 'salted-caramel-brownies',
    name: 'Salted Caramel Brownies',
    category: 'Dessert',
    title: 'Salted Caramel Brownies — Fudgy Homemade Recipe',
    metaDescription:
      'Fudgy salted caramel brownies recipe with dark cocoa and flaky salt. Easy homemade dessert that pairs perfectly with espresso.',
    excerpt:
      'Dense chocolate wedges, amber caramel drizzle, and sea salt — espresso’s best friend.',
    difficulty: 'Intermediate',
    time: '45 min',
    prepTime: '15 min',
    cookTime: '30 min',
    yield: '9–12 brownies',
    updated: '2026-11-23',
    image: '/images/food/salted-caramel-brownies.webp',
    coffeePairing: {
      drink: 'Straight espresso or Americano',
      why: 'Salted caramel brownies stack three big flavors: fudgy cocoa, sticky caramel, and sea salt. Espresso bitterness slices through caramel sweetness so the salt stays sharp and the chocolate does not taste muddy. An Americano stretches the same idea into a longer cup for slow plated dessert. Milk-heavy drinks blur the caramel edge — save those for cupcakes.',
      alsoTry:
        'Bloom 1–2 teaspoons instant espresso powder in the brownie batter if you want chocolate that tastes louder without making the dessert taste like mocha.',
    },
    quickAnswer:
      'Melt butter with sugar and cocoa, whisk in eggs and vanilla, fold flour and salt. Bake at 350°F / 175°C until just set. Cool, cut, drizzle caramel, finish with flaky salt.',
    intro:
      'Fudgy brownies want less flour, more fat, and a short bake. Caramel and salt turn them into a plated café dessert instead of a lunchbox square. Serve slightly warm with coffee and you do not need ice cream — though nobody will stop you.',
    ingredients: [
      '½ cup (113 g) unsalted butter',
      '1 cup (200 g) sugar',
      '¾ cup (75 g) unsweetened cocoa powder',
      '2 large eggs',
      '1 tsp vanilla extract',
      '½ cup (65 g) all-purpose flour',
      '¼ tsp fine salt',
      '⅓–½ cup thick caramel sauce (store-bought or homemade)',
      'Flaky sea salt',
    ],
    steps: [
      'Heat oven to 350°F / 175°C. Line an 8-inch (20 cm) square pan with parchment.',
      'Melt butter. Whisk in sugar and cocoa until glossy. Cool 2 minutes so eggs do not scramble.',
      'Whisk in eggs one at a time, then vanilla.',
      'Fold in flour and fine salt until just combined — do not overmix.',
      'Spread in pan. Bake 25–30 minutes until a toothpick finds moist crumbs, not wet batter.',
      'Cool completely for clean cuts (or slightly warm for plated wedges). Drizzle caramel and finish with flaky salt.',
    ],
    body: [
      { type: 'heading', text: 'Fudgy vs cakey brownies' },
      {
        type: 'paragraph',
        text: 'More fat and chocolate, less flour and leavening = fudgy. This recipe skips baking powder on purpose. If your brownies rise like cake, you likely added too much flour or overbaked. Stir until the flour just disappears — overmixing builds gluten and pushes the crumb toward cake.',
      },
      {
        type: 'image',
        src: '/images/food/brownies-2.webp',
        alt: 'Stack of fudgy chocolate brownies with chocolate drizzle',
        caption: 'Cool completely before cutting for clean wedges, then warm slightly and finish with caramel or a chocolate drizzle and flaky salt.',
      },
      { type: 'heading', text: 'Pan size and bake time' },
      {
        type: 'paragraph',
        text: 'An 8-inch square pan keeps these thick. A 9-inch pan spreads the batter thinner — start checking 5 minutes earlier. Dark metal pans brown faster than glass; if the edges look done and the center still jiggles a lot, tent with foil for the last few minutes.',
      },
      { type: 'heading', text: 'Caramel shortcut' },
      {
        type: 'paragraph',
        text: 'A thick jarred caramel works. Warm it slightly so it ribbons. Thin ice-cream syrup runs off — reduce it on the stove or use dulce de leche. Salt after the caramel so the flakes sit on top instead of dissolving into the sauce.',
      },
      { type: 'heading', text: 'Serving like a café dessert' },
      {
        type: 'list',
        items: [
          'Cut into large wedges, not tiny party squares.',
          'Plate one piece, drizzle caramel at the table, finish with salt.',
          'Optional: a tiny scoop of vanilla ice cream if you are not pairing with espresso.',
          'Leftovers keep 3–4 days airtight; rewarm 10–15 seconds so the caramel softens again.',
        ],
      },
      {
        type: 'tip',
        text: 'Coffee pairing tip: drink espresso between bites, not as a chaser drowned in milk, so the caramel stays sharp.',
      },
    ],
    faqs: [
      {
        question: 'How do you know when brownies are done?',
        answer:
          'Edges pull slightly from the pan and a toothpick shows moist crumbs. Liquid batter means underdone; bone-dry crumbs means overbaked.',
      },
      {
        question: 'Can I add espresso powder to brownies?',
        answer:
          'Yes — 1–2 teaspoons instant espresso powder bloomed in the warm butter intensifies chocolate without tasting like coffee.',
      },
      {
        question: 'How do you cut brownies cleanly?',
        answer:
          'Cool completely, then use a sharp knife wiped clean between cuts. Chilling 20 minutes helps if the caramel is sticky.',
      },
      {
        question: 'Can I make salted caramel brownies ahead?',
        answer:
          'Bake a day ahead and add caramel and salt before serving so the topping looks fresh.',
      },
    ],
    relatedSlugs: ['chocolate-chip-cookies', 'chocolate-cupcakes', 'greek-yogurt-parfait'],
    cuisine: 'American',
    keywords: ['salted caramel brownies', 'fudgy brownies', 'brownies with coffee', 'homemade brownies'],
  },
  {
    slug: 'chocolate-cupcakes',
    name: 'Chocolate Cupcakes',
    category: 'Bakery',
    title: 'Chocolate Cupcakes with Buttercream — Easy Homemade Recipe',
    metaDescription:
      'Moist chocolate cupcakes with chocolate buttercream frosting. Easy homemade cupcake recipe for birthdays, coffee dates, and bakery-style trays.',
    excerpt:
      'Soft chocolate cupcakes, piped frosting, chocolate chips on top — bakery trays without the bakery price.',
    difficulty: 'Intermediate',
    time: '40 min',
    prepTime: '20 min',
    cookTime: '18 min',
    yield: '12 cupcakes',
    updated: '2026-11-23',
    image: '/images/food/chocolate-cupcakes.webp',
    coffeePairing: {
      drink: 'Cappuccino or latte',
      why: 'Chocolate cupcakes with buttercream are pure cocoa richness. Steamed milk and foam soften that intensity the way café dessert cases intend — you get chocolate-on-chocolate without a bitter wall. A cappuccino keeps more espresso punch; a latte is gentler if the frosting is very sweet. The hot milk drink also mirrors the soft crumb temperature when cupcakes are served fresh.',
      alsoTry:
        'Decaf cappuccino works for evening dessert. If you used hot coffee in the batter, a milder milk drink avoids stacking too much roast bitterness on top.',
    },
    quickAnswer:
      'Whisk dry ingredients, mix with oil, egg, milk, and vanilla, then hot coffee or water for bloom. Bake at 350°F / 175°C for 16–18 minutes. Frost cooled cupcakes with chocolate buttercream.',
    intro:
      'Homemade chocolate cupcakes fail when the crumb is dry or the frosting is soupy. Oil keeps them moist longer than butter cakes, and a splash of hot coffee blooms the cocoa. Pipe tall swirls only after cupcakes are fully cool.',
    ingredients: [
      '1 cup (125 g) all-purpose flour',
      '1 cup (200 g) sugar',
      '⅓ cup (35 g) unsweetened cocoa powder',
      '1 tsp baking soda',
      '½ tsp baking powder',
      '½ tsp fine salt',
      '1 large egg',
      '½ cup (120 ml) milk',
      '⅓ cup (80 ml) neutral oil',
      '1 tsp vanilla extract',
      '½ cup (120 ml) hot coffee or hot water',
      'Frosting: ½ cup (113 g) soft butter, 1½ cups (180 g) powdered sugar, ¼ cup (25 g) cocoa, 1–2 tbsp milk, pinch salt',
      'Mini chocolate chips, for topping',
    ],
    steps: [
      'Heat oven to 350°F / 175°C. Line a 12-cup muffin tin.',
      'Whisk flour, sugar, cocoa, baking soda, baking powder, and salt.',
      'Whisk egg, milk, oil, and vanilla. Add to dry ingredients and mix until smooth.',
      'Stream in hot coffee; batter will be thin — that is correct.',
      'Fill liners ⅔ full. Bake 16–18 minutes until a toothpick is clean. Cool completely.',
      'Beat frosting ingredients until fluffy. Pipe onto cupcakes and finish with chocolate chips.',
    ],
    body: [
      { type: 'heading', text: 'Why hot coffee in the batter' },
      {
        type: 'paragraph',
        text: 'Hot liquid blooms cocoa for deeper chocolate flavor. Coffee enhances chocolate without making cupcakes taste like mocha unless you add a lot. Water works if you are caffeine-avoiding — use decaf coffee for the same bloom. The batter will look thin after you add the hot liquid; that is what keeps the crumb soft instead of dense.',
      },
      {
        type: 'image',
        src: '/images/food/cupcakes-2.webp',
        alt: 'Chocolate cupcakes with piped chocolate buttercream and mini chocolate chips',
        caption: 'Frost only after cupcakes are fully cool — warm cake melts buttercream into a slide.',
      },
      { type: 'heading', text: 'Fill liners the right amount' },
      {
        type: 'paragraph',
        text: 'Two-thirds full is the bakery default. Overfilled liners mushroom and stick to the pan; underfilled cupcakes look sad and dry out faster. An ice-cream scoop keeps portions even so the tray bakes at the same rate.',
      },
      { type: 'heading', text: 'Frosting that holds a swirl' },
      {
        type: 'list',
        items: [
          'Butter must be soft, not melted.',
          'Add milk a teaspoon at a time.',
          'Beat until light and fluffy — underbeaten frosting looks dull and heavy.',
          'Chill frosting 10 minutes if your kitchen is hot before piping.',
          'Use a large star tip for tall café swirls; a zip-top bag with the corner snipped works in a pinch.',
        ],
      },
      { type: 'heading', text: 'Storage without sad frosting' },
      {
        type: 'paragraph',
        text: 'Frosted cupcakes keep overnight in a covered container at cool room temp. Refrigerate only if your kitchen is hot — then let them sit out 20 minutes before serving so the buttercream softens. Freeze unfrosted cakes tightly wrapped; thaw and frost the day you need them.',
      },
    ],
    faqs: [
      {
        question: 'How do you keep chocolate cupcakes moist?',
        answer:
          'Oil-based batter, do not overbake, and store airtight. Hot coffee in the batter also helps a tender crumb.',
      },
      {
        question: 'Can I make cupcakes ahead?',
        answer:
          'Bake a day ahead and frost the day you serve. Unfrosted cupcakes freeze well for up to a month.',
      },
      {
        question: 'Why are my cupcakes dry?',
        answer:
          'Usually overbaking or too much flour. Start checking at 16 minutes and weigh flour if you can — scooping from the bag packs in extra.',
      },
      {
        question: 'Can I use Dutch-process cocoa?',
        answer:
          'Yes in this recipe because baking soda and baking powder both appear. Natural cocoa also works; flavor will be a bit brighter.',
      },
    ],
    relatedSlugs: ['salted-caramel-brownies', 'chocolate-chip-cookies', 'greek-yogurt-parfait'],
    cuisine: 'American',
    keywords: ['chocolate cupcakes', 'chocolate buttercream cupcakes', 'homemade cupcakes', 'cupcakes with coffee'],
  },
  {
    slug: 'chicken-wrap',
    name: 'Chicken Veggie Wrap',
    category: 'Lunch',
    title: 'Chicken Wrap Recipe — Healthy Grilled Chicken & Veggie Lunch',
    metaDescription:
      'Healthy chicken wrap recipe with grilled chicken, cabbage, carrots, herbs, and creamy sauce. Easy café-style lunch wrap at home.',
    excerpt:
      'Toasted tortilla, grilled chicken, crunchy slaw veggies, and lime crema — lunch that travels.',
    difficulty: 'Beginner',
    time: '25 min',
    prepTime: '15 min',
    cookTime: '10 min',
    yield: '2 wraps',
    updated: '2026-11-23',
    image: '/images/food/chicken-wrap.webp',
    coffeePairing: {
      drink: 'Iced latte or cold brew',
      why: 'A warm chicken wrap with lime, herbs, and creamy sauce is savory and a little rich. Cold coffee is the weekday café combo: chilled sweetness (or clean cold brew bitterness) resets your mouth between bites and keeps lunch from feeling heavy. An iced latte matches the creamy sauce; unsweetened cold brew stays sharper if your wrap already has a lot of sauce.',
      alsoTry:
        'Hot filter coffee works if you skip ice — just keep it medium roast so it does not fight the lime and herbs. Avoid syrupy flavored lattes that turn lunch into dessert.',
    },
    quickAnswer:
      'Season and cook chicken, toss shredded cabbage and carrots with lime and herbs, spread yogurt-mayo sauce on a tortilla, fill, roll tight, and toast the wrap seam-side down.',
    intro:
      'A good chicken wrap is about contrast: warm protein, cold crunch, bright sauce, tortilla toasted so it does not flop. This is healthier than most takeout wraps because you control the sauce and load up vegetables.',
    ingredients: [
      '2 large flour tortillas',
      '2 cups cooked chicken breast, sliced or chopped (grilled or shredded)',
      '1 cup shredded red cabbage',
      '1 cup shredded carrots',
      'Handful fresh cilantro or parsley, chopped',
      'Sauce: 3 tbsp Greek yogurt + 1 tbsp mayo + lime juice + salt + paprika or chili powder',
      'Optional: avocado slices, hot sauce',
    ],
    steps: [
      'Stir sauce ingredients until smooth. Taste for salt and lime.',
      'Toss cabbage, carrots, and herbs with a squeeze of lime and a pinch of salt.',
      'Warm tortillas so they flex without cracking.',
      'Spread sauce down the center, add chicken and slaw, fold sides in, and roll tightly.',
      'Toast seam-side down in a dry skillet 1–2 minutes per side until spotted and warm. Slice on a bias.',
    ],
    body: [
      { type: 'heading', text: 'Meal-prep tips' },
      {
        type: 'paragraph',
        text: 'Keep chicken, slaw, and sauce separate until the morning you eat. Assembled wraps sog out in the fridge. Pack a small sauce container if you assemble at work. Cook a double batch of chicken on Sunday and you have wrap filling plus salad topping for the week.',
      },
      { type: 'heading', text: 'How to roll a wrap that actually holds' },
      {
        type: 'paragraph',
        text: 'Warm the tortilla so it flexes. Spread sauce in a vertical strip, not edge to edge. Load filling in the center third, fold the short sides in, then roll away from you while tucking tightly. Toast seam-side down in a dry skillet — that heat seals the fold the way café presses do.',
      },
      { type: 'heading', text: 'Sauce that tastes like takeout (without the greasiness)' },
      {
        type: 'paragraph',
        text: 'Greek yogurt plus a spoon of mayo gives body without a pure mayo bomb. Lime and paprika keep it bright. If you want spicy, add hot sauce or chipotle to the sauce instead of dumping salsa into the wrap — wet salsa is what makes tortillas tear.',
      },
      { type: 'heading', text: 'Healthier swaps' },
      {
        type: 'list',
        items: [
          'All Greek yogurt sauce (skip mayo) for lower fat.',
          'Whole-wheat or high-fiber tortillas.',
          'Add extra cabbage and go lighter on tortilla size if you want more volume for fewer calories.',
          'Swap half the chicken for black beans for more fiber.',
          'Use leftover grilled vegetables when chicken runs out.',
        ],
      },
      {
        type: 'tip',
        text: 'Weekday café combo: toast the wrap while your iced coffee or cold brew sits on the counter. Eat the wrap warm; drink the coffee cold.',
      },
    ],
    faqs: [
      {
        question: 'How do you keep wraps from falling apart?',
        answer:
          'Do not overfill, warm the tortilla first, fold the sides in before rolling, and toast seam-side down to seal.',
      },
      {
        question: 'Can I use rotisserie chicken?',
        answer:
          'Yes — it is the fastest path. Season with lime and paprika so it does not taste bland next to the slaw.',
      },
      {
        question: 'Are chicken wraps healthy?',
        answer:
          'Homemade ones can be — lean chicken, lots of vegetables, and a yogurt-forward sauce beat most drive-thru wraps loaded with creamy dressings.',
      },
      {
        question: 'What tortillas work best?',
        answer:
          'Large burrito-size flour tortillas roll easiest. Corn tortillas crack unless you use two and keep fillings light.',
      },
    ],
    relatedSlugs: ['bibimbap', 'avocado-toast', 'overnight-oats'],
    cuisine: 'American',
    keywords: ['chicken wrap', 'healthy lunch wrap', 'grilled chicken wrap', 'meal prep wrap'],
  },
  {
    slug: 'bibimbap',
    name: 'Bibimbap',
    category: 'Healthy',
    title: 'Bibimbap Recipe — Korean Rice Bowl with Egg & Gochujang',
    metaDescription:
      'Easy bibimbap recipe at home: rice, sautéed vegetables, fried egg, and gochujang. Korean mixed rice bowl with healthy customizable toppings.',
    excerpt:
      'Colorful bowls of rice, veggies, jammy egg, and gochujang — mix at the table and eat.',
    difficulty: 'Intermediate',
    time: '45 min',
    prepTime: '25 min',
    cookTime: '20 min',
    yield: '2 bowls',
    updated: '2026-11-23',
    image: '/images/food/bibimbap.webp',
    coffeePairing: {
      drink: 'Iced Americano (after the bowl)',
      why: 'Bibimbap is not a traditional coffee pairing — gochujang, sesame, and kimchi want clean contrast, not a latte. An iced Americano after (or beside) the bowl is a modern café habit: cold bitterness cools spice, dilutes residual heat, and clears sesame oil from your palate without adding dairy that can mute chili. Drink it between bites or as the finish once the bowl is mixed.',
      alsoTry:
        'If you want coffee during the meal, keep it black and cold. Sweet milk drinks clash with gochujang; save those for dessert after.',
    },
    quickAnswer:
      'Cook rice, sauté vegetables separately with sesame oil and salt, fry eggs, arrange over rice with kimchi, and serve with gochujang. Mix everything right before eating.',
    intro:
      'Bibimbap literally means mixed rice. The magic is separately seasoned vegetables so each bite stays distinct until you stir in gochujang. It looks like a lot of steps; each veggie only needs a quick pan. This is one of the best healthy “build a bowl” dinners that still feels special.',
    ingredients: [
      '2 cups cooked short-grain or medium-grain rice (warm)',
      '2 eggs',
      '2 cups spinach',
      '1 cup bean sprouts',
      '1 zucchini, matchstick-cut',
      '1 carrot, matchstick-cut',
      'Kimchi, for serving',
      'Sesame oil, soy sauce, salt, sesame seeds, sliced scallions',
      'Gochujang (Korean chili paste), for the table',
      'Optional: sautéed mushrooms or seasoned beef',
    ],
    steps: [
      'Cook rice and keep warm.',
      'Blanch or quickly sauté spinach; squeeze dry and season with sesame oil and salt. Season sprouts similarly.',
      'Sauté zucchini and carrots separately in a lightly oiled pan until just tender; season lightly.',
      'Fry eggs sunny-side up with runny yolks.',
      'Divide rice into bowls. Arrange vegetables in sections. Top with egg, scallions, and sesame seeds. Add kimchi on the side.',
      'Serve with gochujang. Diners mix everything together before eating.',
    ],
    body: [
      { type: 'heading', text: 'Do not skip separate vegetable pans' },
      {
        type: 'paragraph',
        text: 'Dumping all veggies in one skillet makes a green mush. Quick individual sautés keep color and texture — that is the bowl you see in Korean restaurants. Each vegetable only needs a minute or two; line them up and work left to right while rice finishes steaming.',
      },
      {
        type: 'image',
        src: '/images/food/bibimbap-2.webp',
        alt: 'Korean rice bowl with soft egg, vegetables, kimchi, and seasoned meat arranged in sections',
        caption: 'Arrange toppings in sections over warm rice, then mix with gochujang at the table so every bite stays distinct until you stir.',
      },
      { type: 'heading', text: 'Rice that works for bibimbap' },
      {
        type: 'paragraph',
        text: 'Short-grain or medium-grain rice sticks just enough so the mix holds together. Long-grain works in a pinch but feels looser. Fresh warm rice is better than cold leftover rice unless you reheat it with a splash of water so it is steamy again.',
      },
      { type: 'heading', text: 'Gochujang heat control' },
      {
        type: 'paragraph',
        text: 'Start with a teaspoon, mix, then add more. You can loosen gochujang with a few drops of sesame oil and water for a sauce that coats rice evenly. Store-bought gochujang varies a lot in heat and sweetness — taste before you commit to a big spoonful.',
      },
      { type: 'heading', text: 'Protein options beyond the egg' },
      {
        type: 'list',
        items: [
          'Quick sesame-soy mushrooms for a vegetarian bowl.',
          'Thin-sliced beef or leftover bulgogi if you want a heartier dinner.',
          'Crispy tofu cubes tossed in a little soy and sesame oil.',
          'Keep kimchi on the side so spice level stays adjustable per person.',
        ],
      },
      {
        type: 'tip',
        text: 'Leftover bowl tip: keep components separate. Reheat rice and eggs fresh; cold leftover mixed bibimbap gets soggy.',
      },
    ],
    faqs: [
      {
        question: 'What is bibimbap?',
        answer:
          'A Korean rice bowl topped with seasoned vegetables, chili paste (gochujang), and usually an egg or meat. You mix it together before eating.',
      },
      {
        question: 'Is bibimbap healthy?',
        answer:
          'It can be — vegetable-heavy, customizable protein, and controlled oil. The main sodium/sugar levers are soy, kimchi, and how much gochujang you add.',
      },
      {
        question: 'Can I make bibimbap vegetarian?',
        answer:
          'Yes. Skip meat and keep the egg, or use tofu. The vegetables and gochujang carry the dish.',
      },
      {
        question: 'Do I need a stone bowl (dolsot)?',
        answer:
          'No. A regular bowl works. Dolsot bibimbap crisps the bottom rice — nice if you have the cookware, not required for a great weeknight bowl.',
      },
    ],
    relatedSlugs: ['chicken-wrap', 'avocado-toast', 'overnight-oats'],
    cuisine: 'Korean',
    keywords: ['bibimbap', 'korean rice bowl', 'bibimbap recipe', 'gochujang bowl'],
  },
]

export function getFoodRecipe(slug: string) {
  return FOOD_RECIPES.find((r) => r.slug === slug)
}
