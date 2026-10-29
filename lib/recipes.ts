import type { ContentBlock, FaqItem } from './content'

export type Recipe = {
  slug: string
  name: string
  category: 'Espresso drink' | 'Iced' | 'Classic' | 'Viral'
  title: string
  metaDescription: string
  excerpt: string
  difficulty: 'Beginner' | 'Intermediate'
  time: string
  yield: string
  updated: string
  image: string
  quickAnswer: string
  intro: string
  ingredients: string[]
  steps: string[]
  body: ContentBlock[]
  faqs: FaqItem[]
  relatedSlugs: string[]
}

export const RECIPES: Recipe[] = [
  {
    slug: 'iced-latte',
    name: 'Iced Latte',
    category: 'Iced',
    title: 'Iced Latte Recipe — Ratio, Shots & How to Make One at Home',
    metaDescription:
      'How to make an iced latte at home: espresso-to-milk ratio, ice, no machine options, calories, and how it differs from iced coffee or a shaken espresso.',
    excerpt:
      'Two shots, cold milk, ice — the café iced latte ratio that does not taste like melted water.',
    difficulty: 'Beginner',
    time: '4 min',
    yield: '1 tall glass (12–16 oz)',
    updated: '2026-10-29',
    image: '/images/cold-brew-hero.webp',
    quickAnswer:
      'Pull a double espresso (about 50–60 ml), fill a glass with ice, add 180–240 ml cold milk, then pour the shots over. That is roughly 1:4 espresso to milk. Stir. Sweeten the espresso before the milk if you use syrup.',
    intro:
      'An iced latte is espresso plus cold milk plus ice — not leftover drip dumped on cubes. Searches for “iced latte recipe” spike every warm month because café versions are simple to copy and easy to get watery. The fix is enough espresso, enough ice, and milk that is actually cold.',
    ingredients: [
      '2 espresso shots (50–60 ml), or 50 ml strong Moka / AeroPress concentrate',
      '180–240 ml very cold milk (dairy or barista oat)',
      'Ice, enough to fill the glass',
      'Optional: 1–2 tsp simple syrup, vanilla, or brown sugar, stirred into the hot shots',
    ],
    steps: [
      'Fill a 12–16 oz glass with ice so cubes sit above the halfway line.',
      'Pour in cold milk, leaving ~60 ml of space at the top for espresso.',
      'Pull a double espresso (or brew concentrate). If you are sweetening, stir syrup into the hot shots now.',
      'Pour espresso over the milk and ice. Stir once or twice.',
      'Taste. If it is thin, you need more coffee or less ice melt — not more syrup first.',
    ],
    body: [
      { type: 'heading', text: 'Iced latte ratio' },
      {
        type: 'paragraph',
        text: 'Think 1 part espresso to 3.5–5 parts milk by volume, then ice on top. A double shot into 200 ml milk is the café-standard 12 oz build. A single shot in a 16 oz cup is why homemade iced lattes taste like cold milk. If you only have a Moka pot, treat 50 ml of concentrate as the double.',
      },
      {
        type: 'table',
        caption: 'Milk measured before ice displacement.',
        headers: ['Glass', 'Espresso', 'Milk', 'Result'],
        rows: [
          ['12 oz', '2 shots (60 ml)', '180 ml', 'Coffee-forward, classic'],
          ['16 oz', '2 shots', '240 ml', 'Milder; add a third shot if you have it'],
          ['16 oz', '1 shot', '240 ml', 'Too weak — skip this'],
        ],
      },
      { type: 'heading', text: 'Iced latte vs iced coffee vs cold brew vs shaken espresso' },
      {
        type: 'list',
        items: [
          'Iced latte: espresso + cold milk + ice.',
          'Iced coffee: hot brew cooled or flash-brewed over ice, usually black or lightly milked.',
          'Cold brew: long cold steep; different flavor, often more caffeine per ounce.',
          'Shaken espresso: espresso shaken with ice (and often syrup), topped with a splash of milk — stronger, foamier, less milk than a latte.',
        ],
      },
      { type: 'heading', text: 'No espresso machine' },
      {
        type: 'paragraph',
        text: 'Moka pot, AeroPress inverted with a short brew, or instant espresso powder (about 2 teaspoons in 60 ml hot water) all work. Do not use a full mug of drip as the “shots” unless you reduce it — you will flood the milk. Strong leftover cold brew (60–80 ml) is an acceptable iced “latte-ish” drink but it is not the same as espresso.',
      },
      { type: 'heading', text: 'Ice and watering down' },
      {
        type: 'paragraph',
        text: 'Warm milk plus three cubes is how you get beige soup in ten minutes. Use a cold glass, cold milk, and lots of ice. Pull espresso last so it does not sit and cook the ice before you pour. If you batch for the office, keep shots and milk separate until you drink.',
      },
      { type: 'heading', text: 'Calories and caffeine' },
      {
        type: 'paragraph',
        text: 'Caffeine is basically the shots (~120 mg for a double). Calories are the milk: skim ~80–100 kcal in 200 ml, whole ~120–150, oat barista often similar to 2%. Syrup is extra. An iced latte is not a protein coffee unless you add powder — mix powder into milk first if you go that route.',
      },
      {
        type: 'tip',
        text: 'Sweeten the espresso, not the whole glass. Syrup dissolves in hot coffee; it sinks in cold milk and you get a sugar layer at the bottom.',
      },
    ],
    faqs: [
      {
        question: 'What is the iced latte ratio?',
        answer:
          'About two espresso shots (50–60 ml) to 180–240 ml cold milk, plus ice. That is roughly 1:4 espresso to milk. One shot in a large glass tastes like milk.',
      },
      {
        question: 'Can you make an iced latte without an espresso machine?',
        answer:
          'Yes. Use 50 ml strong Moka pot coffee, AeroPress concentrate, or instant espresso. Cold brew works in a pinch but tastes different.',
      },
      {
        question: 'Is an iced latte the same as iced coffee with milk?',
        answer:
          'No. Iced coffee starts as brewed coffee. An iced latte starts as espresso (or a true concentrate) plus more milk.',
      },
      {
        question: 'How do you keep an iced latte from getting watery?',
        answer:
          'Cold milk, lots of ice, espresso poured last, drink it soon. A third shot in a 16 oz cup also helps if you sip slowly.',
      },
    ],
    relatedSlugs: ['brown-sugar-shaken-espresso', 'spanish-latte', 'mocha'],
  },
  {
    slug: 'cappuccino',
    name: 'Cappuccino',
    category: 'Espresso drink',
    title: 'Cappuccino Recipe — Ratio, Foam & How to Make One at Home',
    metaDescription:
      'How to make a cappuccino at home: traditional 1:1:1 espresso, steamed milk, and foam. Cup size, vs latte and flat white, and no-machine options.',
    excerpt:
      'A real cappuccino is a small drink with a foam cap — not a 16 oz latte with extra bubbles.',
    difficulty: 'Intermediate',
    time: '5 min',
    yield: '1 cup (150–180 ml)',
    updated: '2026-10-29',
    image: '/images/espresso-hero.webp',
    quickAnswer:
      'Traditional cappuccino is about equal parts espresso, steamed milk, and milk foam in a 150–180 ml cup — often a double espresso with a thick, spoonable foam cap. It is foamier than a flat white and much smaller than a café latte.',
    intro:
      '“Cappuccino vs latte” is one of the most-searched drink comparisons because chains blurred the line. A cappuccino is a short, foamy espresso drink. If it arrives in a bucket with a thin skim of bubbles, you were sold a latte. This recipe is the home version that still tastes like coffee.',
    ingredients: [
      '1–2 espresso shots (30–60 ml). A double in a 6 oz cup is the modern default',
      'About 120–150 ml whole milk (easiest foam)',
      'A 150–180 ml cappuccino cup, pre-warmed',
    ],
    steps: [
      'Warm the cup with hot water; dump it out.',
      'Pull espresso into the cup.',
      'Steam milk: stretch longer than a flat white — you want a foam layer you could spoon, not only glossy paint. Stop around 60–65°C.',
      'Tap and swirl so foam and liquid milk are still connected, then pour. Hold back foam with a spoon if you want a defined white cap, then spoon foam on top.',
      'You should see a distinct foam dome. Drink immediately; foam collapses as it sits.',
    ],
    body: [
      { type: 'heading', text: 'Cappuccino ratio' },
      {
        type: 'paragraph',
        text: 'The old 1:1:1 (espresso / milk / foam) is a teaching model, not a lab measurement. In practice: a 6 oz cup, a proper shot or double, and enough foam that the first sip is airy. Wet cappuccino has less foam; dry has more. Neither should fill a pint glass.',
      },
      { type: 'heading', text: 'Cappuccino vs latte vs flat white' },
      {
        type: 'table',
        caption: 'Cup size is the tell.',
        headers: ['Drink', 'Cup', 'Foam'],
        rows: [
          ['Cappuccino', '5–6 oz', 'Thick cap, airy'],
          ['Flat white', '5–6 oz', 'Thin microfoam, velvety, little dry cap'],
          ['Latte', '8–12 oz+', 'Thin layer, mostly steamed milk'],
        ],
      },
      { type: 'heading', text: 'Steaming for foam, not paint' },
      {
        type: 'paragraph',
        text: 'Keep the wand tip near the surface longer than you would for a flat white so you inject more air. Then spin to fold big bubbles in. If you only get soap bubbles, you stretched without spinning. If you get no foam, you buried the wand immediately. Whole dairy is the training-wheels milk; barista oat can work but collapses faster.',
      },
      { type: 'heading', text: 'No steam wand' },
      {
        type: 'paragraph',
        text: 'Heat milk to steaming, then French-press plunge rapidly 20–30 seconds, rest 15 seconds, spoon foam onto espresso and pour the rest. A handheld frother makes wetter foam — still a decent home cappuccino if the cup stays small. Microwave-and-jar-shake is messy but fine for one drink.',
      },
      { type: 'heading', text: 'Calories and caffeine' },
      {
        type: 'paragraph',
        text: 'A double-shot cappuccino is ~120 mg caffeine. Calories track milk volume: a true small cappuccino is often 80–120 kcal with whole milk — less than a 12 oz latte. Cocoa dust on top is optional and not a mocha.',
      },
      {
        type: 'tip',
        text: 'If your “cappuccino” needs a sleeve and a 20-minute commute lid, it was a latte. Use a ceramic cup at home so you do not overfill.',
      },
      { type: 'heading', text: 'Foam troubleshooting' },
      {
        type: 'list',
        items: [
          'Big bubbles, no silk: you stretched too long without spinning. Pour out, rest 10 seconds, swirl harder next time.',
          'No cap: wand was buried the whole time. Listen for a paper-tear at the start.',
          'Burnt milk: too hot. Stop when the pitcher is uncomfortable to hold, not when it screams.',
          'Tastes like a latte: cup was 10+ oz. Buy a 6 oz cappuccino cup; it is the cheapest upgrade.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the cappuccino ratio?',
        answer:
          'Roughly equal espresso, steamed milk, and foam in a 5–6 oz cup. Modern shops often use a double espresso. The drink should stay small.',
      },
      {
        question: 'What is the difference between a cappuccino and a latte?',
        answer:
          'Cappuccino is shorter and foamier. A latte is a longer milk drink with a thin foam layer. Same espresso can make both — the milk volume and texture change the name.',
      },
      {
        question: 'Wet vs dry cappuccino?',
        answer:
          'Wet means more steamed milk, less foam. Dry means more foam, less liquid milk. Dry is harder to drink and cools fast; wet is closer to a small latte.',
      },
      {
        question: 'Can you make a cappuccino with oat milk?',
        answer:
          'Use barista oat and keep the cup small. Foam will be less stable than dairy. Regular drinking oat milk usually will not cap properly.',
      },
    ],
    relatedSlugs: ['cortado', 'mocha', 'iced-latte'],
  },
  {
    slug: 'cortado',
    name: 'Cortado',
    category: 'Espresso drink',
    title: 'Cortado Recipe — Ratio vs Flat White & How to Make One',
    metaDescription:
      'How to make a cortado: espresso-to-milk ratio (about 1:1), small glass, little foam. Cortado vs flat white vs macchiato, plus no-machine options.',
    excerpt:
      'Equal-ish espresso and warm milk in a small glass — stronger than a latte, less foamy than a cappuccino.',
    difficulty: 'Beginner',
    time: '3 min',
    yield: '1 small glass (~120 ml)',
    updated: '2026-10-29',
    image: '/images/espresso-hero.webp',
    quickAnswer:
      'A cortado is a double espresso cut with roughly the same volume of lightly steamed milk — about 50–60 ml espresso and 50–60 ml milk in a ~120 ml glass. Little foam. Stronger and smaller than a flat white.',
    intro:
      'Cortado means “cut” in Spanish: espresso cut with milk to tame the bite without turning it into a breakfast mug. It is one of the best drinks to learn at home because the ratio is honest and the cup is small. If your cortado fills a 12 oz paper cup, it is a latte.',
    ingredients: [
      '2 espresso shots (50–60 ml)',
      '50–70 ml milk, steamed hot but not stretchy-foamy',
      'A small rocks glass or 4 oz libbey-style cortado glass',
    ],
    steps: [
      'Pull a double espresso into the glass.',
      'Steam or heat milk with almost no stretch — you want hot, silky milk, not a cappuccino cap.',
      'Pour milk into the espresso until the volumes look about equal. Stop. Do not fill a bigger glass “to use the milk.”',
      'Drink immediately. There is no lid ritual. This is a two-minute drink.',
    ],
    body: [
      { type: 'heading', text: 'Cortado ratio' },
      {
        type: 'paragraph',
        text: 'Start at 1:1 espresso to milk by volume. Some bars go 1:1.5 if the espresso is a very light roast. If you need a scale: 36 g espresso out, then ~50–60 g milk. The drink should still taste like espresso first.',
      },
      { type: 'heading', text: 'Cortado vs flat white vs macchiato vs gibraltar' },
      {
        type: 'list',
        items: [
          'Cortado: ~1:1, little foam, often a glass, Spanish/Latin café roots.',
          'Flat white: more milk, microfoam you can pour latte art with, 5–6 oz cup.',
          'Espresso macchiato: espresso “stained” with a spoon of foam — much less milk.',
          'Gibraltar: US café name for a similar small milk-and-espresso drink in a Libbey Gibraltar glass.',
        ],
      },
      { type: 'heading', text: 'Milk texture' },
      {
        type: 'paragraph',
        text: 'Do not make cappuccino foam. Heat until the pitcher is hot to the touch, maybe one second of air. Oat barista works if you do not split it — pour espresso into the milk if your shots are very light and acidic. See the oat milk article if it curdles.',
      },
      { type: 'heading', text: 'No machine' },
      {
        type: 'paragraph',
        text: 'Moka pot: 50 ml concentrate in a small glass, equal hot milk. It will not have crema, but the balance teaches the drink. Do not use drip coffee; it is too thin to “cut.”',
      },
      { type: 'heading', text: 'Caffeine and calories' },
      {
        type: 'paragraph',
        text: 'Caffeine ≈ a double espresso (~120 mg). Calories are a splash of milk — often 40–80 kcal. It is a stronger sip than an iced latte and a worse commute drink (no volume).',
      },
      { type: 'heading', text: 'If it tastes like a latte or like straight espresso' },
      {
        type: 'list',
        items: [
          'Too milky: you used an 8 oz cup. Switch to a 4 oz glass and stop pouring sooner.',
          'Too harsh: slightly longer shot, or 10 ml more milk — not a full extra splash that turns it into a flat white.',
          'Sour: under-extracted espresso. Fix grind before adding sugar.',
          'Split oat milk: cooler shots, barista carton, pour espresso into the milk.',
        ],
      },
      {
        type: 'tip',
        text: 'A cortado is a sit-down drink. If you need a travel lid and 16 oz, make an iced latte instead of stretching this recipe.',
      },
    ],
    faqs: [
      {
        question: 'What is a cortado?',
        answer:
          'A small espresso drink cut with roughly equal warm milk and little foam, usually around 120 ml total.',
      },
      {
        question: 'Is a cortado stronger than a flat white?',
        answer:
          'Per sip, yes — less milk in a smaller glass around the same espresso. Total caffeine is similar if both use a double.',
      },
      {
        question: 'Cortado vs macchiato?',
        answer:
          'A macchiato has much less milk (a stain of foam). A cortado is a balanced mini milk drink.',
      },
      {
        question: 'What milk is best for a cortado?',
        answer:
          'Whole dairy is classic. Barista oat works in a small glass. Almond milk usually tastes thin and splits.',
      },
    ],
    relatedSlugs: ['cappuccino', 'spanish-latte', 'mocha'],
  },
  {
    slug: 'spanish-latte',
    name: 'Spanish Latte',
    category: 'Classic',
    title: 'Spanish Latte Recipe — Condensed Milk, Hot or Iced',
    metaDescription:
      'Spanish latte recipe (café con leche condensada): espresso, milk, and condensed milk. Hot and iced ratios, sweetness control, and vs Vietnamese coffee.',
    excerpt:
      'Espresso, steamed milk, and sweetened condensed milk — the Spanish latte that is actually sweet, not a plain latte with a flag.',
    difficulty: 'Beginner',
    time: '5 min',
    yield: '1 glass or cup',
    updated: '2026-10-29',
    image: '/images/home-hero.webp',
    quickAnswer:
      'Stir 20–30 ml sweetened condensed milk with a double espresso, then add 120–180 ml hot or cold milk. For iced, build over ice. Start with 25 ml condensed milk and reduce if it is candy-sweet.',
    intro:
      'A Spanish latte (often café latte condensed-milk style on menus from Madrid to Dubai to Manila) is not “a latte from Spain.” It is espresso plus milk plus sweetened condensed milk. That is why it tastes richer than a vanilla latte made with thin syrup. Vietnamese iced coffee is a cousin that usually skips fresh milk and uses a phin; do not mash the names together.',
    ingredients: [
      '2 espresso shots (or 50 ml strong Moka coffee)',
      '20–30 ml sweetened condensed milk (start at 25 ml)',
      '120–180 ml milk, hot or very cold',
      'Ice if iced',
      'Optional: pinch of cinnamon or a drop of vanilla',
    ],
    steps: [
      'Spoon condensed milk into the cup or glass.',
      'Pull espresso onto it and stir until the condensed milk fully dissolves — no white streaks on the bottom.',
      'Hot: steam milk and pour. Iced: fill glass with ice, add cold milk, then the espresso-condensed mix (or build mix first, then ice and milk).',
      'Taste before adding more condensed milk. It is easier to sweeten than to unsweetened.',
    ],
    body: [
      { type: 'heading', text: 'Spanish latte vs latte vs Vietnamese iced coffee' },
      {
        type: 'list',
        items: [
          'Latte: espresso + steamed milk, sugar optional.',
          'Spanish latte (this recipe): espresso + milk + condensed milk.',
          'Vietnamese cà phê sữa đá: dark robusta-style coffee, condensed milk, ice — usually no fresh milk, phin filter.',
        ],
      },
      { type: 'heading', text: 'Sweetness table' },
      {
        type: 'table',
        caption: 'Condensed milk is the only sweetener you need.',
        headers: ['Condensed milk', 'Taste'],
        rows: [
          ['15 ml', 'Hint of sweet, coffee still loud'],
          ['25 ml', 'Café-standard Spanish latte'],
          ['40 ml+', 'Dessert; easy to overshoot'],
        ],
      },
      { type: 'heading', text: 'Iced Spanish latte' },
      {
        type: 'paragraph',
        text: 'Dissolve condensed milk in hot espresso first. Cold condensed milk is glue. Then ice and cold milk. Two shots in a 12 oz glass or it becomes milkshake-adjacent. Shake in a jar if you want a foamy top without a machine.',
      },
      { type: 'heading', text: 'No espresso machine' },
      {
        type: 'paragraph',
        text: 'Moka pot is the best stand-in. Instant espresso plus condensed milk plus milk still beats a sugary café copy if your shots would have been watery drip. Use a chocolatey medium-dark roast; a floral light roast fights condensed milk.',
      },
      { type: 'heading', text: 'Calories' },
      {
        type: 'paragraph',
        text: 'Condensed milk is dense: ~25 ml is often 80–90 kcal plus the milk. A 12 oz iced Spanish latte can land 200–280 kcal. That is the point of the drink — treat it as a sweet coffee, not a black-coffee health hack.',
      },
      {
        type: 'tip',
        text: 'Rinse the spoon in the espresso so condensed milk does not stay in a clump. Undissolved condensed milk is the #1 homemade failure.',
      },
      { type: 'heading', text: 'Coffee that loves condensed milk' },
      {
        type: 'paragraph',
        text: 'Chocolate, nut, and caramel notes survive sweetness. Berry-bomb light roasts taste confused. A medium-dark espresso blend is the easy button. If all you have is a bag of washed Ethiopia, use less condensed milk (15 ml) so the coffee still shows, or pick the iced latte recipe instead.',
      },
      { type: 'heading', text: 'Make-ahead' },
      {
        type: 'paragraph',
        text: 'You can mix espresso and condensed milk, chill it, and add milk and ice later. Do not mix the fresh milk hours ahead — it tastes tired. Condensed milk tins last in the fridge after opening; cover tightly.',
      },
    ],
    faqs: [
      {
        question: 'What is in a Spanish latte?',
        answer:
          'Espresso, milk, and sweetened condensed milk. Some shops add a dusting of cinnamon. It is not just a latte with Spanish espresso beans.',
      },
      {
        question: 'Is a Spanish latte the same as Vietnamese iced coffee?',
        answer:
          'Both use condensed milk. Vietnamese iced coffee is typically stronger dark coffee over ice without much fresh milk. Spanish latte includes steamed or cold fresh milk.',
      },
      {
        question: 'How much condensed milk in a Spanish latte?',
        answer:
          'Start with 20–30 ml (about 1½–2 tablespoons) for a double-shot drink. Adjust down if it tastes like caramel pudding.',
      },
      {
        question: 'Can I use evaporated milk instead?',
        answer:
          'Evaporated milk is unsweetened. You would need extra sugar and it will not taste the same. Condensed milk is the defining ingredient.',
      },
    ],
    relatedSlugs: ['vietnamese-iced-coffee', 'iced-latte', 'mocha'],
  },
  {
    slug: 'vietnamese-iced-coffee',
    name: 'Vietnamese Iced Coffee',
    category: 'Iced',
    title: 'Vietnamese Iced Coffee Recipe (Cà Phê Sữa Đá)',
    metaDescription:
      'Vietnamese iced coffee recipe: cà phê sữa đá with condensed milk, phin filter or drip/Moka substitute, ratio, ice, and robusta notes.',
    excerpt:
      'Dark coffee, sweetened condensed milk, ice. The phin method plus what to do if you only have a Moka pot.',
    difficulty: 'Beginner',
    time: '8–12 min (phin) / 5 min (Moka)',
    yield: '1 tall glass',
    updated: '2026-10-29',
    image: '/images/cold-brew-hero.webp',
    quickAnswer:
      'Brew a small, strong cup of dark coffee (phin, Moka, or espresso), stir in 2–3 tablespoons sweetened condensed milk until dissolved, then pour over a glass packed with ice. Use a chocolatey dark roast or Vietnamese-style ground coffee if you can.',
    intro:
      'Cà phê sữa đá is one of the most-searched iced coffee recipes on the planet for a reason: it is sweet, strong, and does not taste like a watered latte. Traditional brewing uses a phin (small metal drip filter) and often robusta-heavy coffee. You can get 90% of the way there with a Moka pot and condensed milk if you respect strength and ice.',
    ingredients: [
      '2–3 tbsp (14–20 g) dark roast or Vietnamese-style coffee, medium-fine for phin / Moka grind for Moka',
      '90–120 ml hot water (phin) or a 3-cup Moka pot batch',
      '2–3 tbsp (30–45 ml) sweetened condensed milk',
      'A tall glass packed with ice',
    ],
    steps: [
      'Add condensed milk to the serving glass (or a separate cup if you brew in the phin saucer).',
      'Phin: add coffee to the filter, tap level, place the spreader, bloom with a splash of hot water 30 seconds, then fill. Let it drip 5–8 minutes.',
      'Moka shortcut: brew a strong 3-cup pot, measure ~80–100 ml into the condensed milk.',
      'Stir until the condensed milk fully disappears into the coffee.',
      'Pour over ice. Do not add a huge splash of fresh milk unless you want a different drink (closer to Spanish latte).',
    ],
    body: [
      { type: 'heading', text: 'Why it tastes different from an iced latte' },
      {
        type: 'paragraph',
        text: 'Less fresh milk, more condensed milk, darker roast, often robusta (more crema-like bitterness and caffeine). The ice is a feature: the drip is hot and concentrated so melt is accounted for. If you brew weak drip and add condensed milk, you get sweet brown water.',
      },
      { type: 'heading', text: 'Phin vs Moka vs espresso' },
      {
        type: 'table',
        caption: 'Same condensed milk, different extraction.',
        headers: ['Brewer', 'Use', 'Notes'],
        rows: [
          ['Phin', 'Classic', 'Slow drip, medium-fine, don’t tamp like espresso'],
          ['Moka pot', 'Best shortcut', 'Closest strength without a phin'],
          ['Espresso, 2–3 shots', 'Fast', 'Cleaner than robusta phin; still excellent'],
          ['Cold brew concentrate', 'Emergency', 'Too round and quiet unless very strong'],
        ],
      },
      { type: 'heading', text: 'Robusta and “too bitter”' },
      {
        type: 'paragraph',
        text: 'Traditional cans (Café Du Monde-style chicory blends are a New Orleans cousin, not the same) and Vietnamese robusta can taste harsh if you under-dose condensed milk. If your only beans are a light Ethiopian, this recipe will taste weird — use a dark chocolatey roast instead of forcing origin fruit into condensed milk.',
      },
      { type: 'heading', text: 'Cà phê sữa đá vs cà phê đen đá' },
      {
        type: 'paragraph',
        text: 'Sữa đá is with milk (condensed). Đen đá is black over ice. Make đen đá the same way and skip condensed milk; sweeten with sugar only if you must. Iced black Vietnamese coffee is a different search and a different sweetness problem.',
      },
      { type: 'heading', text: 'Calories and caffeine' },
      {
        type: 'paragraph',
        text: 'Two tablespoons of condensed milk ~120 kcal. Robusta-heavy brews can out-caffeinate a double espresso. Treat it as a dessert coffee. If you want protein, that is a different drink.',
      },
    ],
    faqs: [
      {
        question: 'How do you make Vietnamese iced coffee without a phin?',
        answer:
          'Brew strong Moka pot coffee or 2–3 espresso shots, stir into condensed milk, pour over ice. Keep the coffee volume small and concentrated.',
      },
      {
        question: 'How much condensed milk for Vietnamese iced coffee?',
        answer:
          'Start with 2 tablespoons (30 ml) per serving. Traditional glasses often use more. Stir fully before the ice.',
      },
      {
        question: 'What coffee is best for cà phê sữa đá?',
        answer:
          'Dark, chocolatey, often robusta or a robusta blend. Light fruity specialty coffee fights the condensed milk.',
      },
      {
        question: 'Is Vietnamese iced coffee the same as a Spanish latte?',
        answer:
          'No. Spanish latte adds a lot of fresh milk. Vietnamese iced coffee is coffee + condensed milk + ice, typically without steamed milk.',
      },
    ],
    relatedSlugs: ['spanish-latte', 'iced-latte', 'brown-sugar-shaken-espresso'],
  },
  {
    slug: 'brown-sugar-shaken-espresso',
    name: 'Brown Sugar Shaken Espresso',
    category: 'Viral',
    title: 'Brown Sugar Shaken Espresso Recipe (Iced, Starbucks-Style at Home)',
    metaDescription:
      'Brown sugar shaken espresso recipe: homemade iced shaken espresso with brown sugar syrup, ice, and a splash of oat milk. Ratios, shake method, no machine options.',
    excerpt:
      'Espresso, brown sugar syrup, ice, hard shake, splash of milk. Stronger and foamier than an iced latte.',
    difficulty: 'Beginner',
    time: '6 min (plus syrup)',
    yield: '1 tall glass',
    updated: '2026-10-29',
    image: '/images/espresso-hero.webp',
    quickAnswer:
      'Shake 2–3 espresso shots with 15–25 ml brown sugar syrup and ice for 10–15 seconds. Strain or dump into a glass, top with a splash (30–60 ml) of milk — oat is the usual. Do not fill the glass with milk like a latte.',
    intro:
      'Iced brown sugar shaken espresso became a default café order because it is sweeter than a straight iced americano and stronger than an iced latte. The shake aerates the espresso so you get a light foam; the milk is a float, not the drink. Copying it at home fails when people pour 12 oz of oat milk on two shots and call it shaken.',
    ingredients: [
      '2–3 espresso shots (60–90 ml). Three shots if you use a 16 oz cup',
      '15–25 ml brown sugar syrup (recipe below)',
      'A handful of ice for the shaker, plus ice for the serving glass',
      '30–60 ml milk to finish (barista oat is the typical café choice)',
      'Optional: pinch of cinnamon in the syrup',
    ],
    steps: [
      'Make syrup: 1:1 brown sugar and hot water by weight (e.g. 50 g + 50 g), stir until dissolved, cool. Keeps a week in the fridge.',
      'Fill a jar or cocktail shaker with ice. Add syrup, then hot espresso.',
      'Shake hard 10–15 seconds until the tin or jar is cold and frothy.',
      'Pour everything (or strain) into a serving glass with fresh ice.',
      'Top with a small splash of milk. Stir once if you want it uniform.',
    ],
    body: [
      { type: 'heading', text: 'Shaken espresso vs iced latte' },
      {
        type: 'paragraph',
        text: 'Latte = milk is the volume. Shaken espresso = espresso is the volume, milk is a garnish. If your drink is beige to the brim, you made an iced latte with extra steps. Use three shots in a grande-size glass if you sip slowly.',
      },
      { type: 'heading', text: 'Brown sugar syrup that actually tastes like brown sugar' },
      {
        type: 'paragraph',
        text: 'White simple syrup plus a rumor of molasses is not the same. Use real brown sugar. A pinch of cinnamon in the syrup is closer to chain versions than dumping cinnamon powder on ice, which clumps. Do not boil the syrup into caramel unless you want a different flavor.',
      },
      { type: 'heading', text: 'Shake technique' },
      {
        type: 'list',
        items: [
          'Hot espresso on ice in a sealed jar is enough — you do not need a Boston shaker.',
          'Ten seconds is foam; thirty seconds is watery dilution. Stop when it’s cold.',
          'If you hate ice shards in the glass, strain; if you like it extra cold, dump it all.',
        ],
      },
      { type: 'heading', text: 'Oat milk splash' },
      {
        type: 'paragraph',
        text: 'Barista oat sits on top more nicely than skinny dairy. Regular oat can look broken. Dairy whole milk works and tastes less cereal-like. This is not the place for a full protein scoop unless you mix the powder into the splash of milk first — extra powder in the shaker with hot espresso clumps.',
      },
      { type: 'heading', text: 'No espresso machine' },
      {
        type: 'paragraph',
        text: 'Moka pot concentrate, cooled 20 seconds so it does not explode the ice, then shake. Instant espresso (2–3 tsp in 70 ml water) is a fair weeknight version. Weak drip will not survive the ice.',
      },
      {
        type: 'tip',
        text: 'Syrup into the shaker before espresso so it does not sit in a sticky blob at the bottom of the glass.',
      },
    ],
    faqs: [
      {
        question: 'How do you make a brown sugar shaken espresso at home?',
        answer:
          'Shake espresso with brown sugar syrup and ice, pour over ice, top with a splash of milk. Two or three shots; do not fill the cup with milk.',
      },
      {
        question: 'What is the difference between shaken espresso and iced latte?',
        answer:
          'Shaken espresso is mostly espresso, aerated on ice, with a little milk. An iced latte is mostly milk with espresso on top.',
      },
      {
        question: 'How much brown sugar syrup?',
        answer:
          '15–25 ml for two to three shots. Chain drinks are often sweeter; start low.',
      },
      {
        question: 'Can I use maple syrup instead of brown sugar?',
        answer:
          'Yes, but it tastes like maple, not brown sugar. Same volume is a starting point.',
      },
    ],
    relatedSlugs: ['iced-latte', 'iced-pistachio-latte', 'vietnamese-iced-coffee'],
  },
  {
    slug: 'iced-pistachio-latte',
    name: 'Pistachio Latte',
    category: 'Viral',
    title: 'Pistachio Latte Recipe — Homemade Syrup, Hot or Iced',
    metaDescription:
      'Homemade pistachio latte recipe: pistachio syrup, espresso, and milk. Hot and iced, less sugar than a chain version, no pistachio sauce bottle required.',
    excerpt:
      'Real pistachio syrup plus espresso and milk — how to make the café pistachio latte at home without a pump of mystery sauce.',
    difficulty: 'Beginner',
    time: '15 min (first batch of syrup) / 4 min after',
    yield: '1 drink (syrup makes ~8)',
    updated: '2026-10-29',
    image: '/images/french-press-hero.webp',
    quickAnswer:
      'Simmer chopped pistachios with sugar and water, strain, then use 20–30 ml syrup with a double espresso and 150–200 ml milk. Iced: build over ice. A pinch of salt in the syrup is what makes it taste “pistachio café” instead of generic nut.',
    intro:
      'Pistachio lattes are a recurring chain seasonal (and a 2026 menu staple in more places than winter). Bottle sauces are mostly sugar, color, and a salted topping. A homemade syrup from actual pistachios tastes more like nuts and less like frosting — and you control how sweet the drink is.',
    ingredients: [
      'Syrup: 80 g shelled unsalted pistachios, 80 g sugar, 160 ml water, pinch of salt, optional ¼ tsp almond extract',
      'Drink: 2 espresso shots, 20–30 ml pistachio syrup, 150–200 ml milk',
      'Ice if iced; optional chopped pistachios on top',
    ],
    steps: [
      'Roughly chop pistachios. Simmer with sugar, water, and salt 8–10 minutes. Do not scorch.',
      'Cool 10 minutes, blend briefly if you want more flavor, then strain through a fine mesh or cloth. Refrigerate up to a week.',
      'Hot latte: syrup in the cup, espresso, stir, add steamed milk (flat-white texture if you want it less sweet-milky).',
      'Iced: syrup + espresso in a glass, stir, ice, cold milk.',
      'Taste before adding more syrup. Homemade is less sticky-sweet than chain sauce; you may want 30 ml, not 60.',
    ],
    body: [
      { type: 'heading', text: 'Why homemade beats the bottle' },
      {
        type: 'paragraph',
        text: 'Café pistachio sauce is designed to taste the same in every city and to survive a pump. It is often pistachio-adjacent: vanilla, salt, color. Real pistachios are expensive, so even homemade syrup is a treat — that is expected. If you use only almond extract and green dye, you made a different internet recipe; this one is nuts-first.',
      },
      { type: 'heading', text: 'Hot vs iced' },
      {
        type: 'paragraph',
        text: 'Iced shows pistachio more clearly because you are not competing with as much steamed-milk sweetness. Hot drinks want a slightly darker espresso so the nut does not taste raw. A small 8 oz hot pistachio latte is less cloying than a 16 oz iced with three pumps-equivalent of syrup.',
      },
      { type: 'heading', text: 'Allergies and dairy' },
      {
        type: 'paragraph',
        text: 'Pistachio is a tree nut. Oat milk is the usual café pairing and works iced; barista oat hot if you steam. Cross-contact with other nuts in bulk bins is a real issue if you are cooking for someone with allergies — buy sealed pistachios.',
      },
      { type: 'heading', text: 'Calories' },
      {
        type: 'paragraph',
        text: 'Syrup is sugar plus nuts: 25 ml might be ~40–60 kcal depending how thick you simmered, plus milk. A chain pistachio latte can run 300+ kcal. Homemade with 25 ml syrup and 2% milk in 12 oz is often closer to 180–220.',
      },
      {
        type: 'tip',
        text: 'Salt in the syrup is not optional if you want that “brown buttery” café finish. A tiny pinch. More than that tastes like nuts mixed with seawater.',
      },
    ],
    faqs: [
      {
        question: 'How do you make a pistachio latte at home?',
        answer:
          'Make a simple pistachio syrup (pistachios, sugar, water, salt), then mix 20–30 ml with espresso and milk, hot or iced.',
      },
      {
        question: 'Can I use pistachio butter instead of syrup?',
        answer:
          'Yes — whisk 1 teaspoon pistachio butter into hot espresso, then add milk and a little sugar. It can go grainy; strain if needed.',
      },
      {
        question: 'Does a pistachio latte contain coffee?',
        answer:
          'Yes in this recipe. Crème versions at chains may be pistachio without espresso — that is a different drink.',
      },
      {
        question: 'How long does pistachio syrup last?',
        answer:
          'About 7 days refrigerated. If it smells off or ferments, toss it. Freeze extra in ice cube trays.',
      },
    ],
    relatedSlugs: ['iced-latte', 'mocha', 'brown-sugar-shaken-espresso'],
  },
  {
    slug: 'mocha',
    name: 'Caffè Mocha',
    category: 'Classic',
    title: 'Mocha Recipe — Homemade Caffè Mocha, Hot or Iced',
    metaDescription:
      'How to make a mocha at home: cocoa or chocolate, espresso, and milk. Hot and iced ratios, how not to make it grainy, calories vs a chain mocha.',
    excerpt:
      'Espresso, chocolate, steamed or cold milk. A mocha that tastes like cocoa, not brown sugar water.',
    difficulty: 'Beginner',
    time: '5 min',
    yield: '1 cup or tall glass',
    updated: '2026-10-29',
    image: '/images/espresso-hero.webp',
    quickAnswer:
      'Stir 15–20 g cocoa (or 25–30 g melted dark chocolate) with a double espresso until smooth, then add 150–200 ml steamed or cold milk. Iced: chocolate-espresso first, then ice and milk. Use real cocoa; chocolate syrup is optional, not required.',
    intro:
      'A caffè mocha is a latte with chocolate in it — which means the chocolate has to dissolve and the espresso has to still show up. Chain mochas are often syrup + whipped cream. Homemade with cocoa or a square of dark chocolate is less sweet and more like drinking a thin hot chocolate with coffee, which is the point.',
    ingredients: [
      '2 espresso shots (or 50 ml strong Moka coffee)',
      '1 tbsp (6–8 g) unsweetened cocoa + 1–2 tsp sugar, or 25–30 g dark chocolate',
      '1–2 tbsp hot water to make a paste if using cocoa',
      '150–200 ml milk',
      'Ice if iced; optional whipped cream',
    ],
    steps: [
      'Cocoa method: mix cocoa, sugar, and a splash of hot water into a paste in the cup (no dry lumps).',
      'Chocolate method: chop chocolate in the cup; pour hot espresso over and stir until melted.',
      'Add espresso to the cocoa paste and stir until glossy.',
      'Hot: pour steamed milk. Iced: add ice and cold milk.',
      'Taste. Bitter? More milk or a pinch of sugar. Flat? More espresso, not more syrup.',
    ],
    body: [
      { type: 'heading', text: 'Cocoa vs chocolate vs syrup' },
      {
        type: 'list',
        items: [
          'Unsweetened cocoa: driest, most “mocha,” needs a little sugar.',
          'Dark chocolate (70%): silkier, café-quality if you chop it fine.',
          'Chocolate syrup: easiest, sweetest, tastes most like a chain mocha.',
        ],
      },
      { type: 'heading', text: 'Why homemade mocha goes grainy' },
      {
        type: 'paragraph',
        text: 'Cocoa dumped onto milk without a paste seizes into specks. Always slurry cocoa with hot water or espresso first. Cold milk on cocoa powder is how you get chocolate sand. If you use chocolate bars, the espresso must be hot enough to melt them — wait 15 seconds after the shot if your machine pours lukewarm.',
      },
      { type: 'heading', text: 'Iced mocha' },
      {
        type: 'paragraph',
        text: 'Dissolve chocolate fully while the espresso is hot. Then ice. If you pour syrup in a cold glass first, it sits at the bottom. Two shots in 12 oz or it is chocolate milk.',
      },
      { type: 'heading', text: 'Calories' },
      {
        type: 'paragraph',
        text: 'Cocoa + a bit of sugar is lighter than syrup + whipped cream. A 12 oz homemade mocha with 2% milk might be ~180–250 kcal; a large chain mocha with whip can top 400. Use the coffee calories calculator if you are tracking.',
      },
      {
        type: 'tip',
        text: 'A pinch of salt in the cocoa paste makes cheap cocoa taste more expensive. A drop of vanilla does more than extra sugar.',
      },
      { type: 'heading', text: 'Mocha that still tastes like coffee' },
      {
        type: 'paragraph',
        text: 'If you cannot taste espresso, you either used one weak shot in a 16 oz cup or drowned it in syrup. Two shots, 12 oz, cocoa paste — then whipped cream if you want dessert. White mocha is a different drink (white chocolate); it needs even more espresso because white chocolate is sweeter and has no cocoa bitterness to stand up to milk.',
      },
      { type: 'heading', text: 'Dairy-free mocha' },
      {
        type: 'paragraph',
        text: 'Barista oat plus cocoa paste works. Almond milk plus cocoa often tastes thin and dusty. Soy can curdle in very acidic light-roast shots — darker espresso or mix cocoa into the milk while it is warm, then add coffee.',
      },
    ],
    faqs: [
      {
        question: 'What is a mocha?',
        answer:
          'Espresso, chocolate (cocoa or melted chocolate), and milk. It is a chocolate latte, not a separate brewing method.',
      },
      {
        question: 'How do you make a mocha without an espresso machine?',
        answer:
          'Use strong Moka pot coffee or instant espresso in 50–60 ml water, then the same chocolate and milk steps.',
      },
      {
        question: 'Mocha vs hot chocolate with coffee?',
        answer:
          'Same family. A mocha should still taste like espresso. If you cannot tell coffee is there, you added too much chocolate or too little coffee.',
      },
      {
        question: 'Can I use cocoa powder in an iced mocha?',
        answer:
          'Yes if you make a hot paste with espresso first. Raw cocoa in cold milk will not dissolve.',
      },
    ],
    relatedSlugs: ['iced-latte', 'cappuccino', 'spanish-latte'],
  },
  {
    slug: 'dirty-chai',
    name: 'Dirty Chai',
    category: 'Classic',
    title: 'Dirty Chai Recipe — Chai Latte with Espresso, Hot or Iced',
    metaDescription:
      'Dirty chai recipe: masala chai plus espresso. Hot and iced dirty chai latte ratios, homemade chai vs concentrate, and how strong to make the shot.',
    excerpt:
      'Spiced chai with a shot (or two) of espresso. How to make a dirty chai that is not just pumpkin spice and regret.',
    difficulty: 'Beginner',
    time: '10 min homemade chai / 4 min with concentrate',
    yield: '1 mug or glass',
    updated: '2026-10-29',
    image: '/images/pour-over-hero.webp',
    quickAnswer:
      'Brew a strong masala chai (or heat a unsweetened concentrate), add 1–2 espresso shots, then milk to taste. Classic dirty chai is chai-forward with espresso in the background. Two shots in a small mug if you want it “dirty.”',
    intro:
      'A dirty chai is a chai latte with espresso in it. Cafés often use sweet concentrate and a single shot in a huge cup, which tastes like cinnamon milk. At home you can brew actual tea and spices, control sugar, and decide whether the coffee is a stain or a co-lead.',
    ingredients: [
      'Chai: 1 tsp black tea (or 1 bag) + 200 ml water, 3–4 crushed cardamom pods, small piece cinnamon, 2 cloves, slice of ginger, black peppercorn (optional)',
      '1–2 espresso shots',
      '80–150 ml milk',
      'Sweetener to taste (honey or brown sugar after tasting)',
    ],
    steps: [
      'Simmer spices in water 3 minutes, add tea, steep 2–3 minutes, strain. Should taste strong — milk and espresso will dilute it.',
      'Pull espresso.',
      'Hot: combine chai and espresso in a mug, add steamed milk. Iced: cool chai, ice, espresso, cold milk.',
      'Sweeten last. Chai concentrates are often pre-sweetened; homemade usually needs a little sugar to bloom the spice.',
    ],
    body: [
      { type: 'heading', text: 'Tea first, espresso second' },
      {
        type: 'paragraph',
        text: 'If the cup tastes only like a latte with cinnamon dust, the chai was weak. Brew the tea stronger than you would drink black. Espresso should read as roast and crema behind ginger and cardamom, not as a separate layer of bitterness. Light-roast fruity espresso can clash; a chocolatey medium-dark shot behaves better.',
      },
      { type: 'heading', text: 'Concentrate vs scratch' },
      {
        type: 'list',
        items: [
          'Scratch: best flavor, 10 minutes, you control sugar.',
          'Unsweetened liquid concentrate: fast, still needs milk and a shot.',
          'Sweet café-style syrup: easiest, usually too sweet with two shots — use one shot or cut with extra tea.',
        ],
      },
      { type: 'heading', text: 'Iced dirty chai' },
      {
        type: 'paragraph',
        text: 'Brew chai double-strong because ice melts. Shake chai, espresso, and ice if you want foam without steaming. Oat milk is common; dairy foams hotter. Do not use chai concentrate that already tastes like dessert and then add vanilla syrup.',
      },
      { type: 'heading', text: 'Caffeine' },
      {
        type: 'paragraph',
        text: 'Black tea ~40–50 mg per cup plus espresso 63–126 mg. A two-shot dirty chai can approach a strong coffee’s caffeine with extra tea. Afternoon dirty chais wreck sleep for the same reason extra shots do.',
      },
      {
        type: 'tip',
        text: 'Crush cardamom pods; whole ones in 3 minutes do almost nothing. A pinch of black pepper is more authentic than pumpkin spice mix.',
      },
      { type: 'heading', text: 'When it tastes like a pumpkin latte' },
      {
        type: 'paragraph',
        text: 'You used a sweet café syrup and a single shot in 16 oz of milk. Brew tea stronger, drop the vanilla syrup, add a second shot, and keep the mug around 10 oz. Ginger and cardamom should show up before cinnamon candy does.',
      },
      { type: 'heading', text: 'Caffeine-sensitive version' },
      {
        type: 'paragraph',
        text: 'Use one shot and a smaller mug, or a long steep of decaf espresso plus regular chai (tea still has caffeine). Decaf chai exists but tastes flat; half-caf espresso in full-strength chai is usually better.',
      },
    ],
    faqs: [
      {
        question: 'What is a dirty chai?',
        answer:
          'A chai latte with espresso added. “Dirty” means the shot. Without espresso it is just a chai latte.',
      },
      {
        question: 'How many shots in a dirty chai?',
        answer:
          'One shot in a large milk drink; two shots if you want to taste coffee. Homemade in an 8–10 oz mug, two shots is reasonable.',
      },
      {
        question: 'Can I make dirty chai without an espresso machine?',
        answer:
          'Yes — 30–50 ml strong Moka coffee or instant espresso stirred in. Weak drip disappears behind the spices.',
      },
      {
        question: 'Dirty chai vs chai latte vs regular latte?',
        answer:
          'Chai latte is spiced tea and milk. Latte is espresso and milk. Dirty chai is both in one cup.',
      },
    ],
    relatedSlugs: ['iced-latte', 'cappuccino', 'mocha'],
  },
  {
    slug: 'affogato',
    name: 'Affogato',
    category: 'Classic',
    title: 'Affogato Recipe — Espresso Over Ice Cream',
    metaDescription:
      'How to make an affogato at home: vanilla gelato, hot espresso, pour timing, and variations. Why cheap ice cream melts into soup.',
    excerpt:
      'A scoop of gelato drowned in a hot shot. Dessert and coffee in one bowl if you pour at the right second.',
    difficulty: 'Beginner',
    time: '3 min',
    yield: '1 serving',
    updated: '2026-10-29',
    image: '/images/espresso-hero.webp',
    quickAnswer:
      'Put one firm scoop of vanilla gelato or ice cream in a cold bowl or glass. Pull a hot double espresso and pour it over immediately. Serve at once with a spoon. Do not pre-pour and wait.',
    intro:
      'Affogato al caffè is literally “drowned in coffee.” It is not a milkshake and not an iced latte. The contrast is hot espresso and cold, dense gelato. It fails when the ice cream is icy supermarket foam (melts instantly) or the espresso sits until it is lukewarm. This is the shortest recipe on the site and still easy to mess up.',
    ingredients: [
      '1 generous scoop (80–100 g) vanilla gelato or dense ice cream, very cold',
      '1–2 espresso shots, as hot as you can pull them',
      'Optional: dark chocolate shavings, a few drops of amaretto for adults, pinch of salt',
    ],
    steps: [
      'Chill the serving glass or bowl 10 minutes in the freezer.',
      'Scoop gelato. It should be firm, not soup.',
      'Pull espresso last — do not brew it first and let it die.',
      'Pour espresso over the scoop at the table so the diner sees the melt, not you.',
      'Eat immediately. There is no “let it sit.”',
    ],
    body: [
      { type: 'heading', text: 'Gelato vs ice cream vs whipped cream' },
      {
        type: 'paragraph',
        text: 'Gelato is denser and lower fat-overrun than many US ice creams, so it holds a hot shot longer. A cheap airy ice cream collapses into coffee milk in 20 seconds — still edible, worse texture. Whipped cream is not an affogato; that is espresso con panna.',
      },
      { type: 'heading', text: 'Espresso choice' },
      {
        type: 'paragraph',
        text: 'A chocolatey medium-dark double is the classic drowning liquid. A very light fruity shot can taste like citrus on vanilla, which some people love and others think is wrong. Ristretto is sweeter and less watery. Do not use a mug of drip; you will make iced coffee soup.',
      },
      { type: 'heading', text: 'No espresso machine' },
      {
        type: 'paragraph',
        text: 'Moka pot coffee, as hot as possible, 40–50 ml. Instant espresso in the smallest amount of boiling water also works for a weeknight. Cold brew does not — you lose the hot/cold contrast that is the whole dessert.',
      },
      { type: 'heading', text: 'Variations that still count' },
      {
        type: 'list',
        items: [
          'Fior di latte or sweet cream instead of vanilla.',
          'A teaspoon of cocoa on the scoop before the shot (mocha affogato).',
          'Olive oil and flaky salt — trendy, not traditional, surprisingly good with bitter espresso.',
          'Skip alcohol unless you want a different dessert; the base recipe is non-alcoholic.',
        ],
      },
      { type: 'heading', text: 'Serving size and caffeine' },
      {
        type: 'paragraph',
        text: 'This is dessert for one. A double shot is ~120 mg caffeine at 9 p.m. if you are the kind of person who eats affogato after dinner — plan accordingly. Calories are the scoop plus nothing else unless you add sauce.',
      },
      { type: 'heading', text: 'Why it turned into coffee soup' },
      {
        type: 'list',
        items: [
          'Ice cream sat on the counter while you pulled the shot.',
          'You used a soft, airy supermarket tub instead of dense gelato.',
          'You poured a full mug of drip instead of 40–60 ml espresso.',
          'You assembled it five minutes before serving “so it could meld.” It should not meld.',
        ],
      },
      {
        type: 'tip',
        text: 'Pull the shot onto the scoop at the table. Theater is part of the recipe — and it keeps the espresso hot.',
      },
    ],
    faqs: [
      {
        question: 'What is an affogato?',
        answer:
          'A scoop of gelato or ice cream with hot espresso poured over it. Eat with a spoon. It is a dessert, not a breakfast latte.',
      },
      {
        question: 'Do you stir an affogato?',
        answer:
          'A little, as you eat. Dump-stirring it into a milkshake on purpose misses the hot-and-cold contrast.',
      },
      {
        question: 'Can I use cold brew for affogato?',
        answer:
          'You can, but you lose the point. Hot espresso melting the surface is the texture.',
      },
      {
        question: 'What ice cream is best?',
        answer:
          'Dense vanilla gelato. Very cheap airy ice cream melts too fast. Chocolate ice cream makes a mocha-like version.',
      },
    ],
    relatedSlugs: ['mocha', 'cappuccino', 'cortado'],
  },
]

export function getRecipe(slug: string) {
  return RECIPES.find((r) => r.slug === slug)
}
