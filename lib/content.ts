import type { AffiliateProduct } from './amazon'
import {
  TRENDING_BEAN_ARTICLES,
  TRENDING_BREW_GUIDES,
  TRENDING_TOOL_CONTENT,
  TRENDING_TOOLS,
} from './trending-guides'

export { SITE } from './site'
export { NAV, type NavItem } from './nav'

/* ----------------------------- Shared types ----------------------------- */

export type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'steps'; items: string[] }
  | { type: 'tip'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'table'; caption?: string; headers: string[]; rows: string[][] }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type FaqItem = { question: string; answer: string }

export type AnswerTable = {
  title: string
  caption?: string
  headers: string[]
  rows: string[][]
}

/** Analytics-informed order for tools hub + homepage (GA page views). */
export const TOOL_POPULARITY_ORDER: string[] = [
  'caffeine-day-planner',
  'caffeine-calculator',
  'drip-coffee-calculator',
  'coffee-measurement-converter',
  'cold-brew-calculator',
  'world-coffee-map',
  'caffeine-half-life-calculator',
  'coffee-lab',
  'hydration-calculator',
  'french-press-calculator',
  'coffee-ratio-calculator',
  'grind-size-chart',
  'coffee-calories-calculator',
  'protein-coffee-calculator',
  'iced-coffee-calculator',
  'espresso-ratio-calculator',
  'brew-timer',
]

export function sortToolsByPopularity<T extends { slug: string }>(tools: T[]): T[] {
  return [...tools].sort((a, b) => {
    const ai = TOOL_POPULARITY_ORDER.indexOf(a.slug)
    const bi = TOOL_POPULARITY_ORDER.indexOf(b.slug)
    const av = ai === -1 ? 999 : ai
    const bv = bi === -1 ? 999 : bi
    return av - bv
  })
}

/* ----------------------------- Brewing guides ----------------------------- */

export type BrewGuide = {
  slug: string
  method: string
  title: string
  metaDescription: string
  excerpt: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  brewTime: string
  ratio: string
  grind: string
  yield: string
  updated: string
  image: string
  intro: string
  body: ContentBlock[]
  faqs: FaqItem[]
  /** Short SERP-style answer shown above the fold for CTR. */
  quickAnswer?: string
}

export const BREW_GUIDES: BrewGuide[] = [
  {
    slug: 'how-to-make-pour-over-coffee',
    method: 'Pour Over',
    title: 'How to Make Pour Over Coffee (V60) — 1:16 Ratio & Pour Schedule',
    metaDescription:
      'How to make pour over coffee on a V60: 1:16 ratio (20 g to 320 g), medium-fine grind, 30–45s bloom, finish by 3:00–3:30. Step-by-step home recipe.',
    excerpt:
      'A clean, bright, repeatable V60 cup — exact ratio, grind, bloom, and pour schedule.',
    difficulty: 'Beginner',
    brewTime: '3–4 min',
    ratio: '1:16 (60 g/L)',
    grind: 'Medium-fine',
    yield: '1–2 cups',
    updated: '2026-11-10',
    image: '/images/pour-over-hero.webp',
    quickAnswer:
      'Use a 1:16 coffee-to-water ratio (20 g coffee to 320 g water), medium-fine grind, 96°C / 205°F water, a 30–45 second bloom, then finish around 3:00–3:30 total.',
    intro:
      'Pour over is the best way to learn how variables like grind, water temperature, and pour speed shape flavor. With a single dripper, a filter, and a scale you can brew a café-quality cup that highlights the bright, delicate notes of a good single-origin coffee.',
    body: [
      { type: 'heading', text: 'What you need' },
      {
        type: 'list',
        items: [
          'A pour over dripper (Hario V60, Kalita Wave, or Origami)',
          'Paper filters that fit your dripper',
          '20 g of fresh coffee beans (about 3 tablespoons)',
          'A burr grinder set to medium-fine',
          'A gooseneck kettle and a digital scale with a timer',
          '320 g of filtered water at 96°C / 205°F',
        ],
      },
      { type: 'heading', text: 'Step-by-step pour over recipe' },
      {
        type: 'steps',
        items: [
          'Boil water and let it settle to about 96°C (205°F).',
          'Fold the filter seam and place it in the dripper. Rinse it with hot water to remove papery taste and preheat the vessel, then discard the rinse water.',
          'Grind 20 g of coffee to medium-fine (like table salt) and add it to the filter. Shake flat and make a small well in the center.',
          'Start your timer. Pour 40–60 g of water to wet all the grounds and let it "bloom" for 30–45 seconds. You will see the coffee puff up as CO₂ escapes.',
          'Pour in slow, steady spirals up to 160 g by 1:15, keeping the water level below the rim.',
          'Pour again up to 320 g total by about 1:45, staying in the center to avoid channeling.',
          'Let it draw down completely. Total brew time should land around 3:00–3:30.',
          'Swirl the carafe, pour, and enjoy.',
        ],
      },
      {
        type: 'tip',
        text: 'If your brew finishes too fast (under 2:30) and tastes sour, grind finer. If it takes too long (over 4:00) and tastes bitter, grind coarser. Adjust one variable at a time.',
      },
      { type: 'heading', text: 'Dialing in your cup' },
      {
        type: 'paragraph',
        text: 'The three levers that matter most are grind size, ratio, and water temperature. Start with a 1:16 ratio (like 20 g coffee to 320 g water), then adjust grind to control brew time. Lighter roasts like hotter water and finer grinds; darker roasts prefer slightly cooler water and coarser grinds.',
      },
      { type: 'heading', text: 'How pour over should taste when it is dialed in' },
      {
        type: 'paragraph',
        text: 'A well-brewed pour over tastes layered and transparent. You should be able to notice sweetness first, then the acidity and aroma that make the coffee distinct. African coffees often show citrus, berries, or florals, while washed Central American coffees tend to lean toward caramel, stone fruit, and cocoa. If every cup tastes generically sharp or drying, the extraction is usually too aggressive or the water quality is muting the coffee.',
      },
      { type: 'heading', text: 'Best beans and water for V60 brewing' },
      {
        type: 'paragraph',
        text: 'Pour over rewards coffees with clarity, so freshly roasted single-origin beans are often the best fit. Aim to brew coffee between 7 and 30 days off roast, and use filtered water rather than distilled or very hard tap water. Water that is too soft makes the cup taste hollow; water with heavy mineral content flattens acidity and can turn bright coffees chalky. If your kettle leaves a lot of scale behind, your brew water is probably holding the cup back.',
      },
      { type: 'heading', text: 'Common pour over mistakes' },
      {
        type: 'list',
        items: [
          'Pouring too aggressively and collapsing the coffee bed, which causes channeling and uneven extraction.',
          'Ignoring brew weight and using volume instead of a scale, which makes consistency nearly impossible.',
          'Letting the slurry get too low between pours, which cools the brewer and creates astringency.',
          'Using stale coffee that no amount of technique can rescue.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the best coffee-to-water ratio for pour over?',
        answer:
          'A 1:16 ratio (1 gram of coffee for every 16 grams of water) is the sweet spot for most pour overs. For a 20 g dose, use 320 g of water. Go to 1:15 for a stronger cup or 1:17 for a lighter, more tea-like brew.',
      },
      {
        question: 'What grind size should I use for pour over?',
        answer:
          'Use a medium-fine grind, roughly the texture of table salt. If the brew drains too quickly, grind finer; if it stalls, grind coarser.',
      },
      {
        question: 'Why do you bloom the coffee?',
        answer:
          'Blooming lets trapped CO₂ escape so water can evenly saturate the grounds. Skipping the bloom leads to uneven extraction and a thinner, less sweet cup.',
      },
      {
        question: 'What water temperature for pour over coffee?',
        answer:
          'Aim for 93–96°C (200–205°F). Light roasts like the hotter end; dark roasts often taste cleaner a few degrees cooler. If you only have a boiling kettle, wait about 30 seconds off the boil.',
      },
      {
        question: 'How long should a V60 pour over take?',
        answer:
          'About 2:30–3:30 total including the bloom. Faster and sour usually means grind finer; slower and bitter means grind coarser. Keep pours gentle so you do not dig channels in the bed.',
      },
      {
        question: 'Why does my pour over taste sour?',
        answer:
          'Sourness usually means under-extraction: grind too coarse, water too cool, or brew time too short. Grind a little finer and make sure you bloom for a full 30–45 seconds.',
      },
    ],
  },
  {
    slug: 'french-press-coffee-ratio-and-method',
    method: 'French Press',
    title: 'French Press Coffee Ratio Grams per Liter — 67 g/L (1:15) Chart',
    metaDescription:
      'French press coffee ratio grams per liter: 67 g coffee per litre water (1:15). Per-cup chart, coarse grind, 4-minute steep, and free calculator.',
    excerpt:
      'French press coffee ratio: 67 grams per liter (1:15). Per-cup chart, coarse grind, and a clean 4-minute steep.',
    difficulty: 'Beginner',
    brewTime: '4–5 min',
    ratio: '1:15 (67 g/L)',
    grind: 'Coarse',
    yield: '3–4 cups',
    updated: '2026-11-10',
    image: '/images/french-press-hero.webp',
    quickAnswer:
      'French press coffee ratio in grams per liter: 67 g coffee per litre of water (1:15). That is about 17 g per 250 ml mug. Coarse grind, steep 4 minutes, press gently, and decant immediately.',
    intro:
      'The French press (or cafetière) is immersion brewing at its simplest. Because the metal mesh filter lets natural oils through, it produces a heavier, richer body than paper-filtered methods. There is no pour technique to master and no specialized equipment beyond a press and a scale — making it one of the most forgiving ways to brew genuinely great coffee at home. If you searched “French press coffee ratio grams per liter,” start at 67 g/L and adjust from taste.',
    body: [
      { type: 'heading', text: 'French press coffee ratio grams per liter' },
      {
        type: 'paragraph',
        text: 'The classic answer is 67 grams of coffee per liter of water — a 1:15 ratio by weight. Mild drinkers often prefer ~63 g/L (1:16); bold cups land near ~71 g/L (1:14). Use the free French press calculator to scale those grams-per-liter targets to any press size.',
      },
      { type: 'heading', text: 'What you need' },
      {
        type: 'list',
        items: [
          'A French press (this recipe scales for a 1-liter / 34 oz press)',
          '55 g of freshly ground coffee beans',
          'A burr grinder set to coarse (like raw cane sugar)',
          '830 g of filtered water at 96°C / 205°F',
          'A digital scale and a timer',
        ],
      },
      { type: 'heading', text: 'Step-by-step French press method' },
      {
        type: 'steps',
        items: [
          'Coarsely grind 55 g of coffee (aim for a texture like coarse sea salt — no fine dust) and add it to a dry, pre-warmed press.',
          'Start your timer and pour in all 830 g of hot water in one slow, steady pour, saturating every ground.',
          'At 1:00, break the crust that forms on the surface with a spoon, stir once, then scoop off any foam or floating grounds.',
          'Place the lid on with the plunger pulled fully up. Do not press yet — this traps heat and keeps grounds submerged.',
          'At 4:00, press the plunger down slowly and steadily to just below the waterline. It should take about 20 seconds of light pressure.',
          'Immediately pour or decant every drop into a carafe or mugs. Leaving coffee on the grounds keeps extracting and turns bitter fast.',
        ],
      },
      {
        type: 'tip',
        text: 'Pre-warm your French press with a splash of hot water before adding grounds. It stabilizes brew temperature and helps the coffee hit the intended extraction.',
      },
      { type: 'heading', text: 'French press coffee ratio per cup chart' },
      {
        type: 'paragraph',
        text: 'How to make French press coffee starts with dose. Use this 1:15 chart (classic strength), coarse grind, and a 4-minute steep. For mild use 1:16; for strong use 1:14 — or open the calculator for exact grams.',
      },
      {
        type: 'table',
        caption: 'Classic French press / cafetière ratio ≈ 1:15 by weight',
        headers: ['Serving', 'Water', 'Coffee', 'Tablespoons', 'Steep'],
        rows: [
          ['1 cup / mug', '250 ml', '17 g', '~3 tbsp', '4 min'],
          ['2 cups', '500 ml', '33 g', '~6 tbsp', '4 min'],
          ['16 oz press', '473 ml', '32 g', '~6 tbsp', '4 min'],
          ['8-cup / 1 litre', '1000 ml', '67 g', '~13 tbsp', '4 min'],
          ['12-cup', '1500 ml', '100 g', '~19 tbsp', '4 min'],
        ],
      },
      { type: 'heading', text: 'Why grind size matters more than anything else' },
      {
        type: 'paragraph',
        text: 'A coarse, even grind is the single most important variable in French press. Too fine and the mesh filter cannot catch the particles — you end up with a muddy, gritty cup that is also bitter because the small grounds over-extract. A truly coarse grind (coarser than most people expect) produces a clean, sweet cup with no silt at the bottom.',
      },
      { type: 'heading', text: 'How to troubleshoot your cup' },
      {
        type: 'list',
        items: [
          'Bitter and harsh: grind coarser, shorten steep by 30 seconds, or reduce the dose slightly.',
          'Weak and sour: grind finer (but not too fine), increase dose to 1:14, or make sure all grounds were saturated at the start.',
          'Gritty or muddy: your grind is too fine, or the plunger mesh needs cleaning.',
          'Flat and dull: check your coffee freshness — stale beans produce flat cups regardless of method.',
        ],
      },
      {
        type: 'quote',
        text: '"The French press is the most honest brewer. It shows you exactly what the coffee is. There is nowhere to hide a bad grind or a stale bean."',
      },
      { type: 'heading', text: 'What coffees shine in a French press' },
      {
        type: 'paragraph',
        text: 'French press emphasizes body, texture, and roast character, so coffees with chocolate, nut, spice, and ripe fruit notes perform especially well. Natural-process coffees can taste plush and jammy, while medium roasts often land in the sweet spot between richness and clarity. Very dark roasts can work, but they need slightly cooler water and shorter steeping to avoid an ashy finish.',
      },
      { type: 'heading', text: 'How to make French press cleaner without losing body' },
      {
        type: 'paragraph',
        text: 'If you like the richness of French press but dislike sediment, wait 5 to 8 minutes after breaking the crust before plunging. During that rest, many fine particles settle to the bottom. Press only the top half of the brew or pour gently through a small mesh strainer into your mug. You still get the oils and weight of immersion coffee, but with less grit in the final cup.',
      },
      {
        type: 'tip',
        text: 'Want the math done for you? Open the French Press Coffee Ratio Calculator under Tools — pick a 3-, 4-, 8-, or 12-cup press and get exact grams for mild, classic, or strong. Then come back here for the full technique.',
      },
      { type: 'heading', text: 'French press workflow for busy mornings' },
      {
        type: 'list',
        items: [
          'Measure and pre-grind beans the night before only if you must; whole-bean freshness is still better.',
          'Heat water while the press pre-warms so you are not waiting for the glass to catch up.',
          'Decant into an insulated carafe immediately after pressing if you want to sip over 20 to 30 minutes.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the French press coffee ratio?',
        answer:
          'The classic French press coffee ratio is 1:15 by weight — one gram of coffee to 15 grams of water (about 67 g per litre). Use 1:14 for stronger or 1:16 for milder. That is also the standard cafetière coffee ratio.',
      },
      {
        question: 'What is the cafetière coffee ratio?',
        answer:
          'Cafetière is another name for French press. Use the same 1:15 coffee-to-water ratio, coarse grind, and about a 4-minute steep. For one mug (250 ml) that is roughly 17 g of coffee.',
      },
      {
        question: 'How much coffee for French press?',
        answer:
          'For one 250 ml mug at 1:15, use about 17 g (~3 tablespoons). For an 8-cup / 1 litre press, use about 67 g. Our French press calculator sizes any press instantly.',
      },
      {
        question: 'What is the best French press coffee-to-water ratio?',
        answer:
          'A 1:15 ratio is the ideal starting point — about 55 g of coffee per 830 g of water in a 1-liter press. Use 1:14 for a bolder, stronger cup or 1:16 for something lighter. The SCA recommends 55–60 g per liter for most immersion methods.',
      },
      {
        question: 'What is the French press coffee technique?',
        answer:
          'Use a coarse grind, bloom briefly with hot water just off the boil, fill to your target weight, steep about 4 minutes, break the crust, skim foam, then press slowly and decant immediately. The technique is immersion — no pour-over spiral required — so grind size and steep time matter most.',
      },
      {
        question: 'How long should French press steep?',
        answer:
          'Four minutes is the classic steep time and works well for most coffees and grind sizes. Steeping longer extracts more — which can mean more depth or more bitterness depending on grind. Decant immediately after pressing; never let it sit.',
      },
      {
        question: 'Can I use pre-ground coffee in a French press?',
        answer:
          'Yes, but look for coffee labeled "coarse grind" or "French press grind." Standard pre-ground coffee is usually a medium grind designed for drip machines — it will over-extract and leave silt in your cup.',
      },
      {
        question: 'Why is my French press coffee bitter?',
        answer:
          'Bitterness in French press almost always comes from one of three things: grind too fine (most common), steep time too long, or water too hot. Start by going coarser on the grind.',
      },
    ],
  },
  {
    slug: 'how-to-use-aeropress',
    method: 'AeroPress',
    title: 'How to Use an AeroPress — Ratio (1:15), Grind & Standard vs Inverted',
    metaDescription:
      'How to use an AeroPress: 15 g coffee to 240 g water (~1:15), medium-fine grind, standard and inverted methods, iced recipe, and troubleshooting sour or bitter cups.',
    excerpt:
      'Compact, travel-friendly, and forgiving. Standard and inverted AeroPress recipes with the exact ratio and grind to start.',
    difficulty: 'Beginner',
    brewTime: '1–2 min',
    ratio: '1:14 to 1:16',
    grind: 'Medium-fine',
    yield: '1 cup',
    updated: '2026-11-10',
    image: '/images/aeropress-hero.webp',
    quickAnswer:
      'Start with 15 g medium-fine coffee and 240 g water at ~90°C (about 1:15). Stir, steep ~1 minute, press 20–30 seconds. Use the standard method first; try inverted once you want a longer steep with zero drip-through.',
    intro:
      'The AeroPress combines immersion and pressure into one of the most versatile coffee brewers ever made. It uses gentle air pressure and a short steep to produce a clean, smooth, low-acidity cup. It is nearly indestructible, cleans in 15 seconds, and goes from kitchen to camping trip without complaints. There are two popular styles — standard and inverted — and both are worth knowing.',
    body: [
      { type: 'heading', text: 'Standard method (recommended to start)' },
      {
        type: 'steps',
        items: [
          'Place a paper filter in the cap, rinse it with hot water to remove papery taste, and screw the cap onto the chamber.',
          'Set the assembled AeroPress on a sturdy, heat-safe mug and add 15 g of medium-fine ground coffee.',
          'Pour in 240 g of water at 90°C (195°F) — off the boil by about 30 seconds is close enough.',
          'Stir vigorously 3 times to ensure all grounds are saturated.',
          'Insert the plunger just enough to create a seal (this prevents drip-through).',
          'Steep for 1 minute, then press down slowly and steadily over 20–30 seconds. Stop when you hear a hiss — that is air, not more coffee.',
        ],
      },
      { type: 'heading', text: 'Inverted method (more control, more mess risk)' },
      {
        type: 'paragraph',
        text: 'The inverted method flips the AeroPress upside down so coffee cannot drip through during steeping. This gives you full control over steep time and is preferred by many enthusiasts for a more consistent extraction.',
      },
      {
        type: 'steps',
        items: [
          'Push the plunger about 1 cm into the chamber and set it plunger-side down on your counter.',
          'Add 15 g of medium-fine coffee and 240 g of water at 90°C. Stir gently.',
          'Steep for 1–1:30 minutes.',
          'Place a rinsed filter in the cap, screw it on, and carefully flip the AeroPress onto your mug in one smooth motion.',
          'Press down steadily for 20–30 seconds.',
        ],
      },
      {
        type: 'tip',
        text: 'Lower water temperature (around 80–85°C) tames bitterness in darker roasts and highlights sweetness. For light, fruity roasts, go closer to 94°C to fully develop the complexity.',
      },
      { type: 'heading', text: 'AeroPress recipe variations' },
      {
        type: 'list',
        items: [
          'Espresso-style concentrate: 20 g coffee, 60 g water at 95°C, fine grind, press immediately after stirring. Dilute or add milk to taste.',
          'Cold brew style: coarse grind, room-temperature water, steep 2–3 minutes, press over ice.',
          'Lungo: 15 g coffee, 300 g water at 88°C, medium grind, 2-minute steep. A lighter, longer cup.',
        ],
      },
      { type: 'heading', text: 'Troubleshooting your AeroPress' },
      {
        type: 'list',
        items: [
          'Pressing is too hard: grind is too fine or you are pressing too fast. Slow down and go coarser.',
          'Coffee drips before you press: cap is not tight, or grind is too coarse. Tighten the cap or go finer.',
          'Sour cup: grind finer, increase water temperature, or extend steep time slightly.',
          'Bitter cup: grind coarser, lower water temperature, or reduce steep time.',
        ],
      },
      { type: 'heading', text: 'Why the AeroPress is so forgiving' },
      {
        type: 'paragraph',
        text: 'The AeroPress combines a short immersion phase with light pressure, which means it can produce balanced coffee across a surprisingly wide range of grind sizes and recipes. You are less likely to get the harsh over-extraction of a neglected French press or the channeling issues of pour over. That makes it ideal for beginners, travel, office brewing, and anyone working with a grinder that is good but not perfect.',
      },
      { type: 'heading', text: 'Choosing beans for AeroPress' },
      {
        type: 'paragraph',
        text: 'Because the AeroPress can be brewed hot and fast or cooler and longer, it handles almost any roast level well. Light roasts come through especially sweet with a higher temperature and a slightly longer steep. Medium roasts are the safest all-round pick if you want a smooth cup with low bitterness. For dark roasts, drop the water temperature and keep the press gentle to avoid a smoky finish.',
      },
      { type: 'heading', text: 'AeroPress habits that improve consistency' },
      {
        type: 'list',
        items: [
          'Use the same mug and setup each time so the chamber sits level and stable during the brew.',
          'Press with steady, moderate force rather than trying to squeeze every last drop quickly.',
          'Rinse the rubber plunger seal regularly; old oils can add stale flavors over time.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is AeroPress coffee espresso?',
        answer:
          'No. A true espresso machine operates at 9 bars of pressure; the AeroPress produces roughly 0.5–0.75 bars. It makes a concentrated, smooth coffee that can stand in for espresso in milk drinks, but it will not produce crema and the flavor profile is different.',
      },
      {
        question: 'What grind size is best for AeroPress?',
        answer:
          'Medium-fine is the best all-purpose starting point — similar to table salt. Finer grinds with shorter steeps make a punchier, more intense cup. Coarser grinds with longer steeps produce a smoother, more rounded result. The AeroPress is unusually forgiving across a wide range.',
      },
      {
        question: 'What is the best AeroPress ratio?',
        answer:
          'Start around 1:14 to 1:16 — for example 15–17 g coffee to 220–250 g water for a mug-sized cup. For a concentrate you will dilute or add milk, use less water (closer to 1:10–1:12).',
      },
      {
        question: 'Standard or inverted AeroPress — which is better?',
        answer:
          'Standard is easier and less risky — nothing to spill. Inverted gives you slightly more control over steep time because there is no drip-through. Start with standard and try inverted once you are comfortable.',
      },
      {
        question: 'Can you use the AeroPress for iced coffee?',
        answer:
          'Absolutely. Brew a concentrate (short steep, less water) directly over a glass full of ice. The rapid chilling preserves bright, sweet flavor without diluting the coffee too much.',
      },
      {
        question: 'How do you make AeroPress for 2 cups?',
        answer:
          'Use about 30–34 g coffee and 450–500 g water (still ~1:14–1:16), or brew two back-to-back single cups for better extraction. Overfilling one chamber often under-extracts — two quick brews taste cleaner.',
      },
    ],
  },
  {
    slug: 'how-to-pull-espresso-shot',
    method: 'Espresso',
    title: 'How to Pull Espresso at Home — 18g In, 36g Out (1:2) in 25–30s',
    metaDescription:
      'How to pull espresso at home: 18 g in / 36 g out (1:2), fine grind, tamp, 25–30 second shot. Fix sour, bitter, and channeling — plus ristretto vs lungo.',
    excerpt:
      'Dial in a double shot: dose, grind, tamp, and stop by weight at a 1:2 brew ratio.',
    difficulty: 'Advanced',
    brewTime: '25–30 sec',
    ratio: '1:2 (18 g in, 36 g out)',
    grind: 'Fine',
    yield: '1 double shot',
    updated: '2026-11-10',
    image: '/images/espresso-hero.webp',
    quickAnswer:
      'Dose 18 g, tamp evenly, pull to 36 g liquid (1:2) in about 25–30 seconds. Sour and fast → grind finer. Bitter and slow → grind coarser. Change grind before you change dose.',
    intro:
      'Espresso forces hot water through finely-ground, compacted coffee at around 9 bars of pressure in 25–30 seconds, producing a concentrated, syrupy shot layered with crema. It is the most demanding brew method — tiny grind changes have outsized effects — but once you understand the brew ratio as your guiding variable, dialing in any espresso becomes a logical, repeatable process rather than guesswork.',
    body: [
      { type: 'heading', text: 'Understanding the espresso brew ratio' },
      {
        type: 'paragraph',
        text: 'Modern espresso is defined by the relationship between your dry coffee dose and the liquid yield in your cup. A standard "normale" is 1:2 — for example, 18 g of coffee in produces 36 g of liquid espresso out. Ristretto shots run shorter (1:1 to 1:1.5) for a sweeter, more viscous result. Lungo shots run longer (1:3 or more) for a lighter, more tea-like extraction. Brew ratio, not shot time, is the number to lock in first.',
      },
      { type: 'heading', text: 'Step-by-step espresso dial-in' },
      {
        type: 'steps',
        items: [
          'Set your grinder to fine and purge it with a few grams of coffee to clear old grounds.',
          'Dose 18 g of coffee into a clean, dry portafilter basket. Use a distribution tool or tap to level the grounds.',
          'Tamp straight down with firm, even pressure — about 15–20 kg. Consistency matters more than force.',
          'Rinse (flush) the group head for 2–3 seconds to clear residual grounds and stabilize temperature.',
          'Lock the portafilter in and start your shot and scale simultaneously.',
          'Stop extraction at 36 g of yield. Note the total time.',
          'Taste before adjusting. Sour and under 25 seconds: grind finer. Bitter and over 35 seconds: grind coarser.',
        ],
      },
      {
        type: 'tip',
        text: 'Keep a shot log: grind setting, dose, yield, time, and tasting notes. One variable per adjustment. Your grinder may need several iterations to settle into a new setting — do not chase a single shot.',
      },
      { type: 'heading', text: 'What the crema tells you' },
      {
        type: 'paragraph',
        text: 'Crema forms when CO₂ dissolves into the espresso under pressure and releases on the way out. A thick, tiger-striped crema is a sign of fresh beans and good extraction. Very pale crema suggests old, stale beans or under-extraction. Very dark crema that disappears quickly can indicate over-extraction or too-fresh beans (under 4 days off roast). Crema is a clue, not the goal — taste always wins.',
      },
      { type: 'heading', text: 'Common espresso problems and fixes' },
      {
        type: 'list',
        items: [
          'Shot runs fast (under 20 s, thin yield): grind finer, check tamp evenness, ensure dose is correct.',
          'Shot runs slow (over 40 s, choked): grind coarser, check for clumps in the puck, try a lower dose.',
          'Bitter, harsh finish: over-extracted — grind coarser or reduce yield ratio.',
          'Sour, hollow, thin body: under-extracted — grind finer or increase yield slightly.',
          'Channeling (pale streaks in crema): uneven distribution or tamp. Slow down puck prep.',
          'Watery, weak shot: dose is too low or grind is too coarse for the machine.',
        ],
      },
      { type: 'heading', text: 'What changes most when you switch beans' },
      {
        type: 'paragraph',
        text: 'New coffees often require more adjustment than home baristas expect. Dense light roasts usually want a finer grind and sometimes a slightly longer ratio to open up sweetness. Medium-dark blends built for espresso often run faster and can become bitter if you chase the same shot time too aggressively. Humidity and bean age also matter: espresso that ran perfectly three days ago may need a finer setting today as the beans degas and dry out.',
      },
      { type: 'heading', text: 'Milk drink espresso vs straight-shot espresso' },
      {
        type: 'paragraph',
        text: 'If you mostly make cappuccinos or lattes, you can aim for a slightly more concentrated, higher-body shot so the coffee still cuts through milk. Straight espresso usually benefits from a more open extraction with cleaner acidity and a longer finish. Knowing which drink you care about changes how you judge the shot. A shot that feels slightly intense on its own can be perfect once milk is involved.',
      },
      { type: 'heading', text: 'Daily espresso maintenance that improves flavor' },
      {
        type: 'list',
        items: [
          'Brush old grounds from the group head and wipe the basket dry before each shot.',
          'Backflush on schedule and descale according to your machine manufacturer, especially with hard water.',
          'Purge the steam wand immediately after milk drinks so stale milk residue never reaches the next cup.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long should a perfect espresso shot take?',
        answer:
          'A standard double shot (18 g in, 36 g out) should take about 25–30 seconds to pull, not counting any pre-infusion. Use time as a diagnostic tool, but always let taste be the final decision. Some coffees taste best at 28 seconds, others at 35.',
      },
      {
        question: 'Do I need a special grinder for espresso?',
        answer:
          'Yes — this is the most important gear decision for home espresso. Espresso requires a fine, highly consistent grind with small, precise adjustment steps. A dedicated espresso burr grinder with stepless or micro-stepped adjustment makes dialing in far easier. A drip coffee grinder simply cannot resolve the fine adjustments espresso requires.',
      },
      {
        question: 'What is the best espresso dose?',
        answer:
          'Most home espresso baskets are designed for 14–18 g for a double shot. Weigh your basket capacity and fill to within a gram. The dose is set by your basket; the ratio is set by how long you run the shot.',
      },
      {
        question: 'What is the best espresso ratio?',
        answer:
          'Start at 1:2 (dose:yield) — for example 18 g in, 36 g out. Go shorter (~1:1.5) for a denser ristretto or longer (~1:2.5–1:3) for lighter single origins. Use a scale under the cup so you stop by weight, not volume.',
      },
      {
        question: 'Why does my espresso taste sour?',
        answer:
          'Sourness in espresso means under-extraction — water passed through the puck too quickly or the grounds were too coarse to extract properly. Grind finer by one or two clicks and pull the shot again.',
      },
      {
        question: 'Why does my espresso taste bitter?',
        answer:
          'Bitterness usually means over-extraction: grind too fine, shot too long, or temperature too high. Grind coarser slightly, or stop the shot earlier (lower yield) while keeping the same dose.',
      },
      {
        question: 'What are the best coffee beans for espresso?',
        answer:
          'For classic milk drinks, choose a fresh medium to medium-dark blend with chocolate and caramel notes — often Brazilian or Latin American lots. For modern straight espresso, try a fresh light-medium single origin and use a longer ratio (around 1:2.5). Freshness matters more than the word “espresso” on the bag.',
      },
      {
        question: 'What is a flat white coffee?',
        answer:
          'A flat white is a double espresso (or ristretto pair) topped with a thin layer of microfoam milk — less foam than a cappuccino, stronger coffee taste than a latte. Ratio is roughly 1:3–1:4 espresso to milk in a small cup.',
      },
    ],
  },
  {
    slug: 'cold-brew-coffee-recipe',
    method: 'Cold Brew',
    title: 'Cold Brew Coffee Ratio (1:8) — Overnight Concentrate Recipe',
    metaDescription:
      'Cold brew coffee ratio 1:8 for concentrate (or 1:15 ready-to-drink). Overnight recipe, extra-coarse grind, dilution, fridge life, and a free calculator.',
    excerpt:
      'Smooth, low-acid cold brew: 1:8 concentrate, steep overnight, dilute, drink all week.',
    difficulty: 'Beginner',
    brewTime: '12–18 hrs',
    ratio: '1:8 concentrate',
    grind: 'Coarse',
    yield: '4–6 cups',
    updated: '2026-11-10',
    image: '/images/cold-brew-hero.webp',
    quickAnswer:
      'For concentrate use a 1:8 cold brew coffee ratio (e.g. 100 g coffee to 800 g water). Steep coarse grounds 12–18 hours in the fridge, filter, then dilute about 1:1 to drink.',
    intro:
      'Cold brew steeps coarse coffee in cool water for 12–18 hours. Because no heat is involved, it extracts fewer acids and bitter compounds than any hot-brew method — producing a naturally sweet, mellow concentrate with about 60–70% less acidity than drip coffee. One batch kept in the fridge gives you café-quality iced coffee for a full week.',
    body: [
      { type: 'heading', text: 'What you need' },
      {
        type: 'list',
        items: [
          'A large jar, pitcher, or dedicated cold brew maker (at least 1 liter)',
          '100 g of coffee beans (medium-dark or dark roast works best)',
          'A burr grinder set to extra coarse — like cracked peppercorns',
          '800 g of cold, filtered water',
          'A fine-mesh strainer and a paper coffee filter for straining',
        ],
      },
      { type: 'heading', text: 'Step-by-step cold brew recipe' },
      {
        type: 'steps',
        items: [
          'Coarsely grind 100 g of coffee. The grind should be noticeably coarser than French press — almost chunky. Fine grounds over-extract during a long steep and turn bitter.',
          'Add the grounds to your jar and pour in 800 g of cold, filtered water. Stir well to ensure every ground is saturated.',
          'Cover with a lid or plastic wrap and place in the fridge. Steep for 12–18 hours. Taste at 12 hours — if it is too mild, steep to 15 or 18 hours.',
          'Strain through a fine-mesh sieve into a clean jar. For a crystal-clear result, strain a second time through a paper coffee filter.',
          'Cap and refrigerate your concentrate. It keeps for up to 2 weeks.',
          'To serve: pour 100–120 ml of concentrate over a glass of ice, then add an equal amount of water or milk. Adjust to taste.',
        ],
      },
      {
        type: 'tip',
        text: 'Room-temperature steeping cuts the time to 8–12 hours and gives a slightly brighter, more acidic flavor. Refrigerator steeping is slower but more forgiving — you can leave it overnight without worrying about over-extracting.',
      },
      { type: 'heading', text: 'Concentrate vs ready-to-drink' },
      {
        type: 'paragraph',
        text: 'The recipe above makes a concentrate (1:8 ratio) that you dilute before drinking. If you prefer to pour straight over ice with no mixing, use a 1:15 ratio instead — 67 g of coffee to 1 liter of water, steeped for the same time. The ready-to-drink version is less concentrated and more delicate, but takes up more fridge space per serving.',
      },
      { type: 'heading', text: 'Cold brew serving ideas' },
      {
        type: 'list',
        items: [
          'Classic iced cold brew: 1 part concentrate, 1 part water or oat milk, over ice.',
          'Cold brew latte: 1 part concentrate, 2 parts milk (any kind), no ice needed if concentrate is cold.',
          'Cold brew tonic: 1 part concentrate, 2 parts tonic water over ice. Add a citrus slice.',
          'Frozen concentrate cubes: freeze concentrate in an ice tray and add to hot coffee or milk for an instant iced drink that never dilutes.',
        ],
      },
      { type: 'heading', text: 'Which coffees make the best cold brew' },
      {
        type: 'paragraph',
        text: 'Cold brew tends to mute acidity and highlight sweetness, cocoa, and low-toned fruit, so chocolatey medium roasts and fuller-bodied naturals usually perform best. Very bright, floral coffees can taste muted after a long cold extraction. If you want more liveliness in the final glass, choose a medium roast with red-fruit notes rather than the darkest bag on the shelf.',
      },
      { type: 'heading', text: 'How steep time changes the flavor' },
      {
        type: 'paragraph',
        text: 'The first 8 to 10 hours build sweetness and body. The hours after that mostly deepen the concentration and pull more woody or dark-chocolate notes. That is why many batches taste best around 14 to 16 hours rather than at the full 18. If your coffee is already naturally heavy, a shorter steep can taste cleaner and more refreshing over ice.',
      },
      { type: 'heading', text: 'Cold brew storage mistakes to avoid' },
      {
        type: 'list',
        items: [
          'Storing concentrate in an unsealed pitcher, which lets it oxidize and pick up fridge odors.',
          'Keeping the grounds in the liquid after the steep is finished, which continues extraction and adds bitterness.',
          'Diluting the whole batch at once when you only need a glass at a time, which shortens freshness.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the best ratio for cold brew concentrate?',
        answer:
          'Use 1:8 coffee to water by weight for a concentrate — for example 100 g coffee to 800 g water — then dilute 1:1 with water or milk when serving. For ready-to-drink cold brew, use 1:15 and skip the dilution step.',
      },
      {
        question: 'Is cold brew stronger than regular coffee?',
        answer:
          'The undiluted concentrate is much stronger. Once diluted to a 1:1 ratio, the caffeine per cup is similar to hot drip coffee — though cold brew often tastes smoother and sweeter, which can make it easy to drink more than you intend.',
      },
      {
        question: 'How long to steep cold brew?',
        answer:
          '12–18 hours in the fridge is the usual window. Under 10 hours often tastes weak; past 24 hours can turn woody or bitter, especially with a grind that is too fine.',
      },
      {
        question: 'Why is my cold brew bitter?',
        answer:
          'Bitterness in cold brew usually means the steep was too long or the grind was too fine. Try a coarser grind first, and limit steep time to 18 hours maximum. Very fine grounds can over-extract even at cold temperatures over long periods.',
      },
      {
        question: 'How long does cold brew last in the fridge?',
        answer:
          'Properly stored cold brew concentrate keeps for up to 2 weeks. Ready-to-drink (diluted) cold brew is best within 7 days. Always store sealed in the fridge — cold brew exposed to air stales quickly.',
      },
      {
        question: 'What is the cold brew coffee ratio for ready to drink?',
        answer:
          'About 1:15 coffee to water by weight — similar to a strong iced coffee you can pour straight over ice without diluting. Use the cold brew calculator to scale any jar size.',
      },
    ],
  },
  {
    slug: 'moka-pot-coffee-guide',
    method: 'Moka Pot',
    title: 'How to Use a Moka Pot — Grind, Heat & No Bitter Coffee',
    metaDescription:
      'How to use a Moka pot: fill the basket (no tamp), medium-fine grind, start with hot water, low heat, pull off at the first gurgle. Fix bitter, weak, or spurting stovetop coffee.',
    excerpt:
      'Italian stovetop coffee that tastes bold — not burnt. Heat, grind, and timing that actually work.',
    difficulty: 'Intermediate',
    brewTime: '5 min',
    ratio: 'Fill the basket',
    grind: 'Fine-medium',
    yield: '2–3 cups',
    updated: '2026-11-10',
    image: '/images/moka-pot-hero.webp',
    quickAnswer:
      'Fill the basket level (do not tamp), use medium-fine grind, put hot water in the base just below the valve, and brew on the lowest heat. Remove the pot as soon as coffee flows — the gurgle means stop.',
    intro:
      'The Moka pot is an Italian stovetop brewer that uses steam pressure to force water up through a basket of coffee grounds. Invented in 1933 by Alfonso Bialetti, it remains one of the most popular coffee makers in the world. The result is bold, concentrated, and rich — closer to espresso than drip, without needing an expensive machine. The most common mistake is using too much heat too fast, which scorches the grounds and produces a harsh, burnt-tasting cup.',
    body: [
      { type: 'heading', text: 'What you need' },
      {
        type: 'list',
        items: [
          'A Moka pot (2, 3, or 6-cup — the "cups" are tiny, espresso-sized)',
          'Medium-fine coffee grounds (finer than drip, coarser than espresso)',
          'Filtered water, pre-boiled',
          'A gas or electric stovetop on the lowest setting',
        ],
      },
      { type: 'heading', text: 'Step-by-step Moka pot method' },
      {
        type: 'steps',
        items: [
          'Boil your water separately first — using hot water in the bottom chamber prevents the pot from overheating on the stove while water slowly warms.',
          'Fill the bottom chamber with hot water up to just below the safety valve.',
          'Grind coffee to a medium-fine texture (finer than pour over, coarser than espresso). Fill the funnel basket and level it off. Do not tamp — unlike espresso, tamping causes over-pressure.',
          'Assemble the Moka pot tightly and place it on the lowest possible heat with the lid open so you can watch the coffee emerge.',
          'As soon as coffee begins to flow — it should be a rich, dark stream, not sputtering — remove from heat immediately.',
          'Run the bottom chamber under cold water to stop extraction. Pour immediately.',
        ],
      },
      {
        type: 'tip',
        text: 'The moment you hear a gurgling or sputtering sound is the moment to remove the pot from heat. That sound means water is running out and steam is pushing through — any more heat scorches the final extraction.',
      },
      { type: 'heading', text: 'Why Moka pot coffee is not espresso' },
      {
        type: 'paragraph',
        text: 'Despite the similar appearance, Moka pot coffee brews at around 1–2 bars of pressure compared to the 9 bars of a proper espresso machine. This means no crema, a slightly different extraction chemistry, and a flavor that tends toward bold and bitter rather than sweet and syrupy. It is a great, affordable espresso alternative — especially for milk-based drinks like lattes and cappuccinos — but it is a different thing.',
      },
      { type: 'heading', text: 'Moka pot troubleshooting' },
      {
        type: 'list',
        items: [
          'Bitter, burnt taste: heat was too high or you let it brew too long. Use pre-boiled water and remove from heat as soon as coffee appears.',
          'Coffee is weak or watery: grind too coarse, basket not filled, or you used cold water in the base.',
          'Coffee barely comes out, then spurts: grind too fine — it is choking the flow. Go one step coarser.',
          'Metallic taste: rinse the pot with hot water before each use, and run a few dummy batches with cheap coffee when the pot is new.',
        ],
      },
      { type: 'heading', text: 'Best coffee styles for Moka pot' },
      {
        type: 'paragraph',
        text: 'Moka pots suit coffees with lower acidity and more developed sugars because the brew is intense and concentrated. Brazilian coffees, classic Italian-style blends, and chocolate-forward medium-dark roasts tend to taste full and comforting. If you use very light beans, expect a sharper and more aggressive cup unless you manage heat extremely carefully.',
      },
      { type: 'heading', text: 'How to use Moka pot coffee in drinks' },
      {
        type: 'paragraph',
        text: 'A good Moka pot brew is excellent as a base for cappuccino-style drinks, iced milk drinks, or even an improvised Americano. Because it is stronger than drip but lighter than espresso, it balances well with 120 to 180 ml of hot water or a modest amount of steamed milk. This is one reason it remains a favorite in homes that want espresso-like drinks without the cost or maintenance of a machine.',
      },
      { type: 'heading', text: 'Cleaning and care for better flavor' },
      {
        type: 'list',
        items: [
          'Disassemble the pot after it cools and rinse every part so old coffee oils do not build up and turn rancid.',
          'Replace the rubber gasket when it hardens or cracks; worn seals reduce pressure and hurt extraction.',
          'Never store the pot sealed shut while damp, because trapped moisture can create off smells inside the chambers.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is Moka pot coffee the same as espresso?',
        answer:
          'Not quite. Moka pots brew at 1–2 bars of pressure while espresso machines operate at 9 bars. The result is strong and concentrated but without true crema. It is an excellent, affordable way to make bold coffee for milk drinks.',
      },
      {
        question: 'What size Moka pot should I buy?',
        answer:
          'Moka pot "cups" are about 60 ml each — espresso-sized. A 3-cup makes about 180 ml of concentrate, enough for 1–2 drinks. The pots only work well when filled to the correct level, so buy the size that matches how many people you are brewing for.',
      },
      {
        question: 'Can I use any coffee in a Moka pot?',
        answer:
          'Any coffee works, but medium-dark to dark roasts suit the method best. The pressure and heat tend to amplify bitterness in very light roasts. Look for beans with chocolate, nut, and caramel notes.',
      },
      {
        question: 'Do I need to clean my Moka pot with soap?',
        answer:
          'Rinse with hot water only. Soap removes the seasoning that builds up inside and can leave residue that affects flavor. Dry it fully before storing to prevent oxidation on aluminum models.',
      },
      {
        question: 'What grind size for a Moka pot?',
        answer:
          'Medium-fine — finer than drip, coarser than espresso. Too fine and the pot spurts or stalls; too coarse and the coffee tastes thin.',
      },
    ],
  },
  {
    slug: 'coffee-brewing-ratios-and-grind-size-chart',
    method: 'All Methods',
    title: 'Coffee Brewing Ratios & Grind Size Chart (Every Method)',
    metaDescription:
      'Coffee brewing ratio and grind size chart for pour over, French press, espresso, cold brew, AeroPress, drip, and Moka pot. Golden ratio, times, and how to fix sour or bitter coffee.',
    excerpt:
      'One chart for coffee-to-water ratios and grind sizes across every home brew method — plus what to change when the cup is off.',
    difficulty: 'Beginner',
    brewTime: '1–18 hrs',
    ratio: '1:15–1:17 filter · 1:2 espresso',
    grind: 'See chart by method',
    yield: 'Any batch size',
    updated: '2026-11-10',
    image: '/images/home-hero.webp',
    quickAnswer:
      'Most filter coffee starts at 1:16 (about 15–16 g per 250 ml mug). French press ~1:15, pour over/drip 1:16–1:17, cold brew concentrate ~1:8, espresso ~1:2 (18 g in / 36 g out). Match grind to contact time: coarse for French press and cold brew, medium for drip, medium-fine for pour over and AeroPress, fine for espresso.',
    intro:
      'People search “coffee ratio” and “grind size chart” for the same reason: every method page online uses slightly different numbers. This guide is the single starting table we use across KickerCoffee — then links into the full recipes when you are ready to brew. Ratios are by weight (grams of coffee to grams of water). One millilitre of water ≈ one gram.',
    body: [
      { type: 'heading', text: 'Coffee-to-water ratio chart' },
      {
        type: 'table',
        caption: 'Start here, then adjust ±1 ratio step for taste. Espresso is dose:yield, not mug strength.',
        headers: ['Method', 'Ratio', 'Example', 'Full guide'],
        rows: [
          ['Pour over (V60)', '1:16', '20 g → 320 g water', 'Pour over guide'],
          ['Drip machine', '1:16–1:17', '60–62 g per litre', 'Drip calculator'],
          ['French press', '1:15', '30 g → 450 g water', 'French press guide'],
          ['AeroPress', '1:14–1:16', '15 g → 240 g water', 'AeroPress guide'],
          ['Espresso', '1:2', '18 g in → 36 g out', 'Espresso guide'],
          ['Cold brew concentrate', '1:8', '100 g → 800 g water', 'Cold brew guide'],
          ['Cold brew ready-to-drink', '1:15', 'Same as filter strength', 'Cold brew guide'],
          ['Moka pot', 'Fill basket', 'Level grounds, no tamp', 'Moka pot guide'],
          ['Iced (flash brew)', 'Strong hot onto ice', 'Brew ~40% as ice', 'Iced coffee tool'],
        ],
      },
      {
        type: 'paragraph',
        text: 'The SCA “golden cup” ballpark is about 55 g coffee per litre of water (~1:18). Most home drinkers prefer a little stronger — 1:15 to 1:17 — especially for immersion methods. Use the coffee ratio calculator if you think in mugs, litres, or tablespoons instead of ratios.',
      },
      { type: 'heading', text: 'Coffee grind size chart' },
      {
        type: 'table',
        caption: 'Texture beats “click number” — grinders are not standardized.',
        headers: ['Method', 'Grind', 'Feels like', 'Contact time'],
        rows: [
          ['Turkish', 'Extra fine', 'Powdered sugar', 'Minutes to foam'],
          ['Espresso', 'Fine', 'Table flour / fine sugar', '25–30 seconds'],
          ['Moka pot', 'Fine–medium', 'Between espresso and drip', '~5 minutes'],
          ['AeroPress', 'Medium-fine', 'Table salt', '1–2 minutes'],
          ['Pour over (V60)', 'Medium-fine', 'Table salt', '2:30–3:30'],
          ['Drip / Kalita', 'Medium', 'Sand', '4–6 minutes'],
          ['Chemex', 'Medium-coarse', 'Rough sand', '4–5 minutes'],
          ['French press', 'Coarse', 'Sea salt / breadcrumbs', '4 minutes'],
          ['Cold brew', 'Extra coarse', 'Peppercorns', '12–18 hours'],
        ],
      },
      {
        type: 'tip',
        text: 'Longer contact → coarser grind. Shorter contact → finer grind. If you only change one thing when coffee tastes wrong, change grind size first.',
      },
      { type: 'heading', text: 'How much coffee per cup? (quick math)' },
      {
        type: 'list',
        items: [
          '1 mug (250 ml) at 1:16 ≈ 15–16 g coffee (~2 rounded tbsp whole beans).',
          '2 mugs (500 ml) at 1:16 ≈ 31 g.',
          '1 litre at 1:16 ≈ 62 g; at 1:15 ≈ 67 g (classic French press litre).',
          'Coffee-maker “cups” are often 5 oz — use the drip calculator so 12 cups is not 12 mugs.',
        ],
      },
      { type: 'heading', text: 'Sour vs bitter — what the chart cannot fix alone' },
      {
        type: 'paragraph',
        text: 'Ratio sets strength (how concentrated the drink is). Extraction sets balance (sour vs bitter vs sweet). You can have a strong sour cup (too much coffee, too coarse) or a weak bitter cup (too little coffee, too fine). When the cup is off:',
      },
      {
        type: 'list',
        items: [
          'Sour, thin, salty → under-extracted: grind finer, hotter water, or longer time.',
          'Bitter, drying, hollow → over-extracted: grind coarser, cooler water, or shorter time.',
          'Weak but balanced → use more coffee (stronger ratio) or less water.',
          'Harsh and muddy (French press) → coarser grind, shorter steep, decant fully after plunging.',
        ],
      },
      { type: 'heading', text: 'Filter vs espresso vs cold brew — pick a lane' },
      {
        type: 'paragraph',
        text: 'Filter methods (pour over, drip, French press, AeroPress) share the same ratio language. Espresso uses dose:yield because the “cup” is a 30–40 g shot. Cold brew concentrates look extreme (1:8) until you dilute — compare diluted strength to drip, not concentrate to concentrate. Moka sits between drip and espresso: fill the basket, control heat, do not chase a 1:2 shot time.',
      },
      { type: 'heading', text: 'Water temperature cheat sheet' },
      {
        type: 'list',
        items: [
          'Most filter: 92–96°C (198–205°F). Light roasts like the hot end.',
          'AeroPress: often 85–92°C — cooler for dark roasts.',
          'Espresso: machine-set, typically ~93°C at the group.',
          'Cold brew: fridge-cold; time replaces heat.',
          'Moka: start with hot water in the base so the pot spends less time on the burner.',
        ],
      },
      { type: 'heading', text: 'Which method should you brew today?' },
      {
        type: 'table',
        caption: 'Match the tool to the job, not the Instagram aesthetic.',
        headers: ['You want…', 'Brew this'],
        rows: [
          ['Clearest single-origin flavors', 'Pour over'],
          ['Set-and-forget pot for guests', 'Drip machine'],
          ['Full body, easy technique', 'French press'],
          ['Travel / office / one mug fast', 'AeroPress'],
          ['Milk drinks (latte, flat white)', 'Espresso (or Moka + milk)'],
          ['Low-acid iced coffee for the week', 'Cold brew concentrate'],
          ['Bold stovetop without a machine', 'Moka pot'],
        ],
      },
      {
        type: 'tip',
        text: 'Open the free grind size chart tool for a visual scale, or the ratio calculator to size any batch. The method guides above are the deep recipes — this page is the map.',
      },
    ],
    faqs: [
      {
        question: 'What is the best coffee-to-water ratio?',
        answer:
          'For most drip and pour over, start at 1:16. French press often tastes better at 1:15. Espresso is usually 1:2 by weight (dose to yield). Adjust after you taste — stronger means more coffee, not automatically a finer grind.',
      },
      {
        question: 'What grind size should I use for coffee?',
        answer:
          'Match grind to brew time: coarse for French press and cold brew, medium for drip, medium-fine for pour over and AeroPress, fine for espresso. If the cup is sour, go finer; if bitter, go coarser.',
      },
      {
        question: 'What is the golden ratio for coffee?',
        answer:
          'Roughly 55 g of coffee per litre of water (~1:18), from SCA-style guidelines. Many home brewers land happier around 1:15–1:17 for a richer mug.',
      },
      {
        question: 'How much coffee for one cup?',
        answer:
          'For a 250 ml mug at 1:16, use about 15–16 g of coffee. That is roughly two rounded tablespoons of whole beans — weigh when you can.',
      },
      {
        question: 'Is espresso ratio the same as drip ratio?',
        answer:
          'No. Espresso ratios are dose:yield (e.g. 18 g in, 36 g out). Drip ratios are coffee:brew water for a full mug. Do not brew drip at 1:2.',
      },
      {
        question: 'Why does my coffee taste bitter even at the right ratio?',
        answer:
          'Ratio controls strength; grind and time control extraction. Bitter usually means too fine, too hot, or too long. Coarsen the grind or shorten the brew before you water the coffee down.',
      },
    ],
  },
  {
    slug: 'best-coffee-brewing-methods-compared',
    method: 'All Methods',
    title: 'Best Coffee Brewing Methods Compared — Differences That Matter',
    metaDescription:
      'Best coffee brewing methods and their differences: pour over vs French press vs drip vs espresso vs cold brew vs AeroPress — taste, time, skill, and who each suits.',
    excerpt:
      'What actually differs between pour over, French press, drip, espresso, cold brew, and AeroPress — not just another ratio chart.',
    difficulty: 'Beginner',
    brewTime: '1–18 hrs',
    ratio: 'See method',
    grind: 'See method',
    yield: '1 cup–batch',
    updated: '2026-11-26',
    image: '/images/home-hero.webp',
    quickAnswer:
      'The best coffee brewing method depends on what you want: pour over for clarity, French press for body, drip for set-and-forget, espresso for milk drinks, cold brew for low-acid iced batches, AeroPress for one fast mug. Differences are taste, time, grind, and cleanup — not “which is correct.”',
    intro:
      'Searches for “best coffee brewing methods and their differences” usually want a decision guide, not another 1:16 table. Methods extract the same beans with different contact time, filter type, and pressure. That changes body, clarity, bitterness, and how much skill you need before the cup tastes good. Use this page to pick a lane, then jump into the matching recipe or calculator.',
    body: [
      { type: 'heading', text: 'Coffee brewing methods compared (quick chart)' },
      {
        type: 'table',
        caption: 'Start with the job you want the cup to do.',
        headers: ['Method', 'Cup style', 'Time', 'Skill', 'Best if you…'],
        rows: [
          ['Pour over (V60)', 'Clean, bright, aromatic', '3–4 min', 'Medium', 'Want origin flavors clear'],
          ['Drip machine', 'Balanced, consistent', '5–10 min', 'Low', 'Brew for a household'],
          ['French press', 'Full body, rich oils', '4–5 min', 'Low', 'Want easy immersion'],
          ['AeroPress', 'Flexible, clean-ish', '2–3 min', 'Low–med', 'Travel or one mug fast'],
          ['Espresso', 'Concentrated, syrupy', '25–35 s', 'High', 'Make lattes / cappuccinos'],
          ['Moka pot', 'Bold stovetop', '5–8 min', 'Medium', 'Want espresso-ish without a machine'],
          ['Cold brew', 'Smooth, low-acid iced', '12–18 hrs', 'Low', 'Batch iced coffee for the week'],
        ],
      },
      { type: 'heading', text: 'Pour over vs French press vs drip' },
      {
        type: 'list',
        items: [
          'Pour over: paper filter strips oils and fines → lighter body, more aroma. You control bloom and pours.',
          'French press: metal mesh keeps oils → heavier mouthfeel, more sediment risk if grind is too fine.',
          'Drip: same idea as pour over with less technique; machine spray and basket grind matter more than pour patterns.',
        ],
      },
      {
        type: 'paragraph',
        text: 'If your beans taste amazing as pour over but muddy in a press, check grind first (press needs coarse). If drip tastes flat, dose and grind usually beat buying a new machine.',
      },
      { type: 'heading', text: 'Espresso vs everything else' },
      {
        type: 'paragraph',
        text: 'Espresso is not “strong drip.” It uses fine grind and ~9 bars of pressure to extract a small yield (often 1:2 dose:yield) in ~25–35 seconds. That concentrate is the base for cappuccino, latte, and iced latte. Moka pot is the home bridge: higher strength than drip, far less pressure than espresso.',
      },
      { type: 'heading', text: 'Cold brew vs iced coffee (flash brew)' },
      {
        type: 'list',
        items: [
          'Cold brew: long cold steep → smoother, lower perceived acidity, often higher caffeine per ounce if concentrated.',
          'Japanese / flash iced coffee: hot brew onto ice → brighter aromatics, tastes closer to hot pour over.',
          'Neither replaces the other — pick smooth batch vs bright glass.',
        ],
      },
      { type: 'heading', text: 'Which brewing method should you learn first?' },
      {
        type: 'table',
        headers: ['Your situation', 'Start here', 'Next step'],
        rows: [
          ['Absolute beginner, one mug', 'AeroPress or French press', 'Pour over when you want more clarity'],
          ['Family / guests every morning', 'Drip machine', 'French press calculator for weekends'],
          ['Milk drinks are the goal', 'Espresso (or Moka)', 'Cappuccino / iced latte recipes'],
          ['Iced coffee all week', 'Cold brew concentrate', 'Iced coffee calculator for flash brew'],
          ['Showcasing fancy light-roast beans', 'Pour over', 'Ratio + grind chart'],
        ],
      },
      {
        type: 'tip',
        text: 'There is no single “best” method. The best method is the one you will actually use with a scale, fresh beans, and a grind that matches the brew time.',
      },
      { type: 'heading', text: 'Tools that make method-hopping painless' },
      {
        type: 'list',
        items: [
          'Coffee ratio calculator — size any batch once you pick a ratio.',
          'Grind size chart — match texture to method before you blame the beans.',
          'French press / drip / cold brew / espresso calculators — method-specific doses and timers.',
          'Full ratio + grind chart guide — one table for every home method.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What are the best coffee brewing methods and their differences?',
        answer:
          'Pour over is clearest, French press is fullest-bodied, drip is easiest for batches, espresso is concentrated for milk drinks, cold brew is smooth iced coffee, AeroPress is the flexible one-mug tool. Differences come from filter type, contact time, and pressure — not from a universal “best.”',
      },
      {
        question: 'Is pour over better than French press?',
        answer:
          'Better for clarity and aroma, not for body. French press keeps oils the paper filter removes. Choose based on the cup you want, not prestige.',
      },
      {
        question: 'What is the easiest coffee brewing method for beginners?',
        answer:
          'French press or AeroPress: few moving parts, forgiving timing, and clear “too fine / too coarse” fixes. Drip is easiest if you already own a decent machine and weigh the dose.',
      },
      {
        question: 'Do I need espresso to make café drinks?',
        answer:
          'True cappuccinos and lattes want espresso (or a strong Moka/AeroPress stand-in). Filter coffee plus milk is a different drink — still good, just not the same ratio or texture.',
      },
      {
        question: 'Which method has the most caffeine?',
        answer:
          'Per ounce, espresso and many cold brew concentrates are high. Per mug, a large drip or French press often delivers more total milligrams because you drink more liquid. Use the caffeine calculator for real stacks.',
      },
    ],
  },
  {
    slug: 'coffee-brewing-tips',
    method: 'All Methods',
    title: 'Coffee Brewing Tips That Fix Weak, Sour & Bitter Cups',
    metaDescription:
      'Coffee brewing tips for home: weigh your dose, match grind to method, fix sour vs bitter, water temperature, and which free calculator to open next.',
    excerpt:
      'Practical coffee brewing tips — the five habits that fix most home cups — then the right tool for each fix.',
    difficulty: 'Beginner',
    brewTime: '2–5 min',
    ratio: '1:15–1:17 filter',
    grind: 'Match the method',
    yield: 'Any',
    updated: '2026-11-26',
    image: '/images/home-hero.webp',
    quickAnswer:
      'Weigh coffee and water, grind for the method (coarse press, medium drip, fine espresso), brew hot enough (~93–96°C for filter), and change one variable at a time. Sour → finer/longer; bitter → coarser/shorter.',
    intro:
      'Most “coffee brewing tips” lists bury you in gadgets. These are the habits that move the needle on a normal Tuesday — then links into the calculators and method guides so you can apply them immediately.',
    body: [
      { type: 'heading', text: '1. Weigh the dose (scoops lie)' },
      {
        type: 'paragraph',
        text: 'A “tablespoon” of light roast vs dark roast is not the same coffee mass. Start filter coffee around 1:16 (about 15–16 g per 250 ml mug) or French press at 1:15 (67 g per litre). Open the ratio calculator or measurement converter when you are scaling up.',
      },
      { type: 'heading', text: '2. Match grind to contact time' },
      {
        type: 'list',
        items: [
          'Coarse: French press, cold brew',
          'Medium: drip basket',
          'Medium-fine: pour over, AeroPress',
          'Fine: espresso',
        ],
      },
      {
        type: 'paragraph',
        text: 'Wrong grind is the #1 reason a “correct ratio” still tastes wrong. Use the grind size chart, then adjust one click at a time.',
      },
      { type: 'heading', text: '3. Fix sour vs bitter before you change beans' },
      {
        type: 'table',
        headers: ['Cup tastes…', 'Likely cause', 'Try first'],
        rows: [
          ['Sour / thin / fast', 'Under-extracted', 'Grind finer or brew a bit longer / hotter'],
          ['Bitter / harsh / ashy', 'Over-extracted', 'Grind coarser or shorten contact time'],
          ['Weak but not sour', 'Under-dosed', 'Add coffee (stronger ratio), not only finer grind'],
          ['Muddy French press', 'Too fine + hard plunge', 'Coarser grind, gentle press, decant'],
        ],
      },
      { type: 'heading', text: '4. Water temperature and freshness' },
      {
        type: 'paragraph',
        text: 'Filter coffee likes roughly 92–96°C (198–205°F). Boiling-straight-onto-dark-roast can taste harsh; lukewarm water under-extracts. Buy beans with a roast date and finish the bag in a few weeks — stale coffee tastes flat no matter how perfect your pour is.',
      },
      { type: 'heading', text: '5. Pick the method for the job' },
      {
        type: 'paragraph',
        text: 'Clarity → pour over. Body → French press. Batch → drip or cold brew. Milk drinks → espresso. Read the brewing methods comparison if you are still choosing gear, then open the matching guide.',
      },
      {
        type: 'tip',
        text: 'Change one variable per brew. If you change grind, dose, and time together, you will not know what fixed the cup.',
      },
    ],
    faqs: [
      {
        question: 'What are the most important coffee brewing tips?',
        answer:
          'Weigh dose and water, grind for the method, keep filter water near 93–96°C, and diagnose sour vs bitter before buying new beans. Those four beat most gadget upgrades.',
      },
      {
        question: 'How do I make coffee less bitter?',
        answer:
          'Grind coarser, shorten brew time, or drop water temperature slightly. If it is still harsh, the roast may be very dark or the beans stale.',
      },
      {
        question: 'How do I make coffee less sour?',
        answer:
          'Grind finer, extend contact time, or use hotter water. Confirm you are not under-dosing a large mug with a tiny scoop.',
      },
      {
        question: 'Should I bloom my coffee?',
        answer:
          'For pour over and often French press, yes — wet the grounds with ~2× their weight in water for 30–45 seconds so CO₂ escapes and the bed saturates evenly.',
      },
    ],
  },
  ...TRENDING_BREW_GUIDES,
]

/* ----------------------------- Gear & setups ----------------------------- */

export type GearItem = {
  slug: string
  category: 'Grinder' | 'Brewer' | 'Kettle' | 'Scale' | 'Espresso Machine'
  name: string
  title: string
  metaDescription: string
  excerpt: string
  priceRange: string
  bestFor: string
  rating: number
  updated: string
  image: string
  intro: string
  pros: string[]
  cons: string[]
  body: ContentBlock[]
  faqs: FaqItem[]
  /** Short SERP-style answer shown above the fold for CTR. */
  quickAnswer?: string
  /** Amazon product picks — tag via NEXT_PUBLIC_AMAZON_TAG. */
  picks?: AffiliateProduct[]
}

export const GEAR: GearItem[] = [
  {
    slug: 'best-burr-coffee-grinders',
    category: 'Grinder',
    name: 'Burr Coffee Grinders',
    title: 'Best Burr Coffee Grinders 2026 — Budget, Hand & Espresso Picks',
    metaDescription:
      'Best burr coffee grinders 2026: Capresso Infinity, Timemore C3, and Baratza Sette 30 compared. Why a burr grinder beats a blade — and what to buy first.',
    excerpt:
      'The single most important upgrade for better coffee. Best cheap, affordable, and premium burr coffee grinders.',
    priceRange: '$40–$700',
    bestFor: 'Everyone — upgrade this first',
    rating: 4.8,
    updated: '2026-11-10',
    image: '/images/grinder-hero.webp',
    quickAnswer:
      'Buy a burr grinder (not a blade) first. For most filter coffee, a solid hand or entry electric burr in the roughly $40–$150 range is enough; espresso needs finer, more precise adjustment.',
    intro:
      'If you only upgrade one thing, make it your grinder. A quality burr grinder produces uniform particles for even extraction — something a blade grinder simply cannot do. Uniform grounds are the foundation of every great cup.',
    pros: [
      'Uniform grind size for even extraction',
      'Adjustable settings for every brew method',
      'Dramatically improves flavor over pre-ground coffee',
    ],
    cons: ['Good models are an investment', 'Electric grinders take up counter space'],
    body: [
      { type: 'heading', text: 'Why burr over blade?' },
      {
        type: 'paragraph',
        text: 'Blade grinders chop beans unevenly, creating a mix of dust and boulders that extract at different rates — the number one cause of muddy, bitter, and sour flavors in the same cup. Burr grinders crush beans between two abrasive surfaces set a precise distance apart, producing consistent particles.',
      },
      { type: 'heading', text: 'How to choose' },
      {
        type: 'list',
        items: [
          'Filter only? A quality hand grinder or entry electric is plenty.',
          'Espresso? You need fine, stepless (or micro-stepped) adjustment.',
          'Both? Look for a versatile grinder with a wide range.',
        ],
      },
      {
        type: 'tip',
        text: 'Buy the best grinder you can afford before spending big on a brewer. A great grinder with a cheap dripper beats a cheap grinder with an expensive machine.',
      },
    ],
    faqs: [
      {
        question: 'Do burr grinders really make better coffee than blade grinders?',
        answer:
          'Yes. Burr grinders produce much more uniform particles, which extract evenly and taste cleaner, sweeter, and less muddy. Blade grinders create a mix of powder and large chunks, so the same cup can taste bitter and sour at once.',
      },
      {
        question: 'What is a burr grinder?',
        answer:
          'A burr grinder crushes beans between two abrasive surfaces (flat or conical burrs) set a fixed distance apart, producing an even grind size. That consistency is why specialty coffee recipes assume a burr grinder, not a spinning blade.',
      },
      {
        question: 'How much should I spend on a coffee grinder?',
        answer:
          'For filter coffee, a good hand grinder or entry-level electric grinder in the roughly $40 to $150 range is enough to make a real difference. Espresso demands tighter grind control, so serious espresso grinders usually start higher. If you only upgrade one piece of coffee gear, make it the grinder.',
      },
      {
        question: 'What grinder should I buy for both espresso and pour over?',
        answer:
          'Look for a grinder with a wide grind range and precise adjustment steps or stepless control. Many grinders handle filter coffee well but become frustrating for espresso because the adjustment jumps are too large. If espresso is important, buy for espresso first and let the grinder\'s filter range be a bonus.',
      },
      {
        question: 'Is a hand grinder good enough for everyday coffee?',
        answer:
          'For one or two cups a day, yes. A quality hand grinder can outperform a cheap electric grinder at the same price. The tradeoff is convenience: grinding for large batches or espresso every morning gets tiring fast.',
      },
      {
        question: 'How do you clean a coffee grinder?',
        answer:
          'Unplug electric grinders. Wipe the hopper, run dry rice or grinder cleaning tablets through burrs if the maker allows it, brush burrs with a soft brush, and wipe oily residue with a dry cloth — avoid soaking burrs in water. Empty old grounds before every new bag so stale fines do not flavor the next brew.',
      },
      {
        question: 'Ceramic vs steel burrs — which is better?',
        answer:
          'Steel burrs are sharper and more common in higher-end grinders; they cut cleanly and stay precise. Ceramic burrs stay sharp a long time and run cooler, but can chip if a stone hits them. For most home buyers, burr quality and alignment matter more than the material label alone.',
      },
    ],
    picks: [
      {
        name: 'Capresso Infinity Conical Burr Grinder',
        asin: 'B0000AR7TC',
        affiliateUrl: 'https://link.amazon/B05yyYHJy',
        tier: 'Budget',
        priceHint: 'Often ~$100–130',
        why: 'Cheapest electric burr that still beats a blade for drip and French press. Not ideal for serious espresso.',
      },
      {
        name: 'TIMEMORE Chestnut C3 Hand Grinder',
        asin: 'B0CNDBVVDG',
        affiliateUrl: 'https://link.amazon/B07xJN4Wy',
        tier: 'Best overall',
        priceHint: 'Often ~$70–90',
        why: 'Best value upgrade for pour over / AeroPress. Consistent conical burrs without a big electric footprint.',
      },
      {
        name: 'Baratza Sette 30',
        asin: 'B075G11F9N',
        affiliateUrl: 'https://link.amazon/B01Bbc0sF',
        tier: 'Premium',
        priceHint: 'Often ~$300',
        why: 'Dedicated espresso-first workflow (timed dosing, portafilter arms). Pair with a Bambino-class machine.',
      },
    ],
  },
  {
    slug: 'best-gooseneck-kettles',
    category: 'Kettle',
    name: 'Gooseneck Kettles',
    title: 'Best Gooseneck Kettles 2026 — Pour Over Electric & Stovetop',
    metaDescription:
      'Best gooseneck kettles 2026 for pour over: Hario Buono, Bonavita, and Fellow Stagg EKG compared. Variable-temp electric vs stovetop — what to buy.',
    excerpt:
      'Precise pouring is half the battle in pour over. Our favorite variable-temperature gooseneck kettles.',
    priceRange: '$35–$180',
    bestFor: 'Pour over and drip enthusiasts',
    rating: 4.6,
    updated: '2026-11-10',
    image: '/images/kettle-hero.webp',
    quickAnswer:
      'A gooseneck spout matters more than brand. For pour over weekly, a variable-temp electric (Bonavita or Fellow Stagg) is worth it; a Hario Buono stovetop is the budget path.',
    intro:
      'A gooseneck kettle gives you slow, precise control over where and how fast water hits the coffee bed. Variable-temperature models let you match water heat to roast level, which is a genuine flavor upgrade for light roasts.',
    pros: [
      'Precise flow control for even saturation',
      'Variable temperature models suit any roast',
      'Also great for tea',
    ],
    cons: ['Electric versions cost more', 'Another countertop appliance'],
    body: [
      { type: 'heading', text: 'What to look for in a gooseneck kettle' },
      {
        type: 'list',
        items: [
          'A thin, tapered gooseneck spout for a slow, controllable stream',
          'Variable temperature control — ideally adjustable to the degree',
          'A hold/keep-warm function for back-to-back brews or long pour sessions',
          'A comfortable, well-balanced handle with a heat-resistant grip',
          'At least 600 ml capacity (1 liter is more practical for larger brews)',
        ],
      },
      { type: 'heading', text: 'Does temperature actually matter?' },
      {
        type: 'paragraph',
        text: 'Yes — significantly for light roasts. Light roasts contain more undeveloped aromatic compounds that need higher water temperatures (93–96°C) to extract fully. Brewing them with water that is too cool produces a grassy, sour, underdeveloped cup. Medium and dark roasts are more forgiving and often taste better slightly cooler (88–92°C) to avoid bitterness. Variable temperature lets you match the roast, which is a real flavor upgrade.',
      },
      { type: 'heading', text: 'Gooseneck vs standard kettle' },
      {
        type: 'paragraph',
        text: 'A standard kettle pours in a wide, fast stream that disturbs the coffee bed, causes uneven saturation, and makes the pour weight hard to control. A gooseneck lets you pour slowly in a spiral pattern that saturates grounds evenly — the core technique behind good pour over. It sounds minor until you compare two cups side by side.',
      },
      {
        type: 'tip',
        text: 'If you brew pour over more than a few times per week, a variable-temperature electric gooseneck is one of the highest-value gear upgrades you can make for under $100.',
      },
    ],
    faqs: [
      {
        question: 'Do I really need a gooseneck kettle for pour over coffee?',
        answer:
          'If you want repeatable pour over results, it helps a lot. A gooseneck kettle gives you much better control over flow rate and where the water lands, which improves saturation and reduces channeling. You can make coffee with a regular kettle, but it is harder to be precise.',
      },
      {
        question: 'Is variable temperature worth paying for in a coffee kettle?',
        answer:
          'Usually yes, especially if you brew different roast levels. Light roasts benefit from hotter water, while darker roasts often taste smoother a few degrees cooler. Variable temperature also saves time if you brew coffee and tea from the same kettle.',
      },
      {
        question: 'What size gooseneck kettle is best for home brewing?',
        answer:
          'Around 600 ml to 1 liter is the sweet spot for most home brewers. Smaller kettles are nimble for single cups, while 1-liter models are more practical if you brew larger V60s, Chemex batches, or multiple drinks back to back.',
      },
      {
        question: 'Can I use a stovetop gooseneck kettle instead of an electric one?',
        answer:
          'Absolutely. A stovetop gooseneck still gives you the pouring control that matters most. Electric kettles mainly add speed, convenience, and precise temperature control.',
      },
    ],
    picks: [
      {
        name: 'Hario V60 Buono Gooseneck Kettle (1.2 L)',
        asin: 'B079ZYN4KL',
        affiliateUrl: 'https://link.amazon/B06K86WGa',
        tier: 'Budget',
        priceHint: 'Often ~$50–60',
        why: 'Stovetop classic. Excellent spout control without another plug on the counter.',
      },
      {
        name: 'Bonavita 1.0 L Variable Temperature Gooseneck',
        asin: 'B08C9DR1JQ',
        tier: 'Best overall',
        priceHint: 'Often ~$80–110',
        why: 'Degree control, hold mode, and a real gooseneck — the practical daily driver for pour over.',
      },
      {
        name: 'Fellow Stagg EKG Electric Gooseneck',
        asin: 'B077JBQZPX',
        affiliateUrl: 'https://link.amazon/B0iaF95YO',
        tier: 'Premium',
        priceHint: 'Often ~$150–170',
        why: 'Best-in-class pour feel and to-the-degree control. Pay for design + workflow polish.',
      },
      {
        name: 'Fellow Stagg EKG Pro',
        asin: 'B0BBP8GW9C',
        tier: 'Premium',
        priceHint: 'Often ~$200',
        why: 'EKG features plus a fuller display and scheduling if you want the nicer UI.',
      },
    ],
  },
  {
    slug: 'best-coffee-scales',
    category: 'Scale',
    name: 'Coffee Scales',
    title: 'Best Coffee Scales 2026 — Timer Scales for Pour Over & Espresso',
    metaDescription:
      'Best coffee scales with timers 2026: Greater Goods, OXO Brew, and Timemore Black Mirror compared. Why 0.1 g resolution and fast response matter.',
    excerpt:
      'Consistency starts with weighing. The best coffee scales with timers for repeatable brews.',
    priceRange: '$15–$150',
    bestFor: 'Anyone chasing consistency',
    rating: 4.5,
    updated: '2026-11-10',
    image: '/images/scale-hero.webp',
    quickAnswer:
      'Any 0.1 g scale with a timer beats scooping. Greater Goods or OXO for most people; Timemore Black Mirror if you want a dedicated coffee scale look and rechargeable battery.',
    intro:
      'Scooping coffee by volume is wildly inconsistent because beans vary in size and density. A scale lets you weigh a precise dose and track water in real time, so a great cup becomes a repeatable cup.',
    pros: [
      'Repeatable ratios every brew',
      'Built-in timers track extraction',
      'Affordable entry point',
    ],
    cons: ['Cheap scales can be slow to respond', 'Espresso needs a fast, small-footprint model'],
    body: [
      { type: 'heading', text: 'Features that actually matter' },
      {
        type: 'list',
        items: [
          '0.1 g resolution for espresso; 1 g resolution is fine for filter and French press',
          'A fast response rate (refresh rate) — slow scales lag behind your pour and cause overshooting',
          'A built-in timer so you can track brew time without a separate device',
          'Auto-tare (zeroing) when you place a vessel on it',
          'Water resistance or splash-proofing for the inevitable spills',
          'A small footprint if you plan to use it under an espresso portafilter',
        ],
      },
      { type: 'heading', text: 'Why weighing beats scooping' },
      {
        type: 'paragraph',
        text: 'A tablespoon of medium-roast ground coffee weighs about 5–6 g. A tablespoon of coarsely ground light roast might weigh 4 g. A tablespoon of compacted dark roast can hit 7 g. That is a 75% range of variation from the same scoop — enough to mean the difference between a great cup and a frustrating one. Weighing eliminates this variable entirely. Once you start using a scale it is hard to go back.',
      },
      { type: 'heading', text: 'Budget vs premium scales' },
      {
        type: 'paragraph',
        text: 'A basic $15–$25 kitchen scale works for filter coffee. For pour over and espresso, invest $50–$80 in a dedicated coffee scale with a fast response rate and a built-in timer. The fast response rate is the critical difference — cheap kitchen scales often lag 2–3 seconds behind, which makes controlling pour weight nearly impossible.',
      },
      {
        type: 'tip',
        text: 'For espresso, use a scale that fits under your portafilter. Most portafilters sit about 3–4 cm off the drip tray — thin-profile scales like the Acaia Lunar or Timemore Black Mirror Nano are designed for this.',
      },
    ],
    faqs: [
      {
        question: 'Do I need a coffee scale or will a normal kitchen scale work?',
        answer:
          'A normal kitchen scale works for basic brewing, especially French press or batch brew. Dedicated coffee scales become worthwhile when you need faster response, a built-in timer, or a small footprint for espresso. The key is weighing your coffee and water somehow, not guessing by volume.',
      },
      {
        question: 'What resolution should a coffee scale have?',
        answer:
          'For pour over, drip, and French press, 1-gram resolution is acceptable, though 0.1 gram is nicer. For espresso, 0.1-gram resolution is strongly preferred because small dose and yield changes have a big effect on the shot.',
      },
      {
        question: 'Why do coffee scales need fast response time?',
        answer:
          'If the display lags behind your pour by a second or two, you will overshoot your target weight constantly. That is annoying in pour over and especially costly in espresso, where a couple extra grams can change the balance of the shot.',
      },
      {
        question: 'Is a timer on a coffee scale actually useful?',
        answer:
          'Yes. Brew time and brew weight work together, so having both in one place makes it easier to repeat recipes and troubleshoot bad cups. It is not mandatory, but once you use one, it is hard to go back.',
      },
    ],
    picks: [
      {
        name: 'Greater Goods Coffee Scale with Timer',
        asin: 'B0CGCZMPKW',
        affiliateUrl: 'https://link.amazon/B03CBn8Up',
        tier: 'Budget',
        priceHint: 'Often ~$25–35',
        why: '0.1 g resolution, timer, silicone cover — enough for pour over and most home espresso.',
      },
      {
        name: 'OXO Brew Precision Coffee Scale with Timer',
        asin: 'B07MVRZR9W',
        affiliateUrl: 'https://link.amazon/B0aTCebcF',
        tier: 'Best overall',
        priceHint: 'Often ~$50',
        why: 'Fast response, clear display, durable everyday scale that also works outside coffee.',
      },
      {
        name: 'TIMEMORE Black Mirror Basic Plus',
        asin: 'B097Q569SJ',
        affiliateUrl: 'https://link.amazon/B03OWF9Jq',
        tier: 'Premium',
        priceHint: 'Often ~$50–70',
        why: 'Dedicated coffee aesthetic, USB-C recharge, auto-timing modes. Great on a pour-over station.',
      },
    ],
  },
]

export type Setup = {
  slug: string
  title: string
  metaDescription: string
  excerpt: string
  budget: string
  level: string
  image: string
  intro: string
  /** Short SERP-style answer shown above the fold. */
  quickAnswer?: string
  updated?: string
  /** Long-form buying advice — keeps setup pages out of thin-content territory. */
  body?: ContentBlock[]
  items: {
    name: string
    why: string
    asin?: string
    affiliateUrl?: string
    priceHint?: string
  }[]
  faqs: FaqItem[]
}

export const SETUPS: Setup[] = [
  {
    slug: 'beginner-home-coffee-setup',
    title: 'The Best Beginner Home Coffee Setup Under $200 (2026)',
    metaDescription:
      'Best beginner home coffee setup under $200 (2026): Timemore C3 grinder, V60, Hario Buono kettle, coffee scale, and medium-roast beans — shoppable Amazon kit with buy order and first-week brewing tips.',
    excerpt: 'Everything a first-timer needs to brew genuinely great coffee, without overspending.',
    budget: 'Under $200',
    level: 'Rookie',
    image: '/images/setup-beginner-hero.webp',
    updated: '2026-11-10',
    quickAnswer:
      'Spend most of your budget on a burr grinder, then add a simple pour-over (or AeroPress), a gooseneck kettle, a 0.1 g scale, and fresh medium-roast whole beans. That under-$200 kit beats a cheap espresso machine with a blade grinder.',
    intro:
      'You do not need an expensive machine to make delicious coffee. This starter kit prioritizes the things that actually move the needle: a burr grinder, a simple forgiving brew method, a way to weigh ratios, controlled pouring, and fresh whole beans. Buy in that order if you are spreading purchases across a few paychecks.',
    body: [
      { type: 'heading', text: 'Why this kit (and not a $99 espresso machine)' },
      {
        type: 'paragraph',
        text: 'Entry espresso machines look impressive in product photos, but they usually ship with a weak built-in grinder or assume you already own a good one. Uneven grounds make sour-bitter shots no matter how pretty the steam wand is. Filter coffee with a solid hand grinder teaches you grind, ratio, and time — skills that transfer the day you do buy espresso gear. This kit is designed so every dollar buys control you will feel in the cup.',
      },
      { type: 'heading', text: 'Buy order if you cannot purchase everything at once' },
      {
        type: 'list',
        items: [
          'Week 1: Timemore C3 + medium-roast whole beans. Grind fresh into whatever brewer you already own.',
          'Week 2: Scale with timer. Switch from scoops to grams — your cups stop swinging wildly.',
          'Week 3: V60 (or AeroPress) + filters. Learn a repeatable recipe.',
          'Week 4: Gooseneck kettle. Pour control is the last big pour-over upgrade before an electric temp kettle.',
        ],
      },
      { type: 'heading', text: 'Your first week of brewing' },
      {
        type: 'paragraph',
        text: 'Use a 1:16 ratio as the default (for example 20 g coffee to 320 g water). Medium-fine for V60, slightly coarser for AeroPress. Bloom 30–45 seconds with ~2× the dose in water, then finish pours by about 3:00–3:30 on a V60. If the cup tastes sour and thin, grind finer or pour slower. If it tastes harsh and drying, grind coarser or shorten contact time. Change one variable at a time for three brews before you blame the beans.',
      },
      {
        type: 'tip',
        text: 'Pair this kit with our pour over guide and the ratio calculator. The gear only works if you stop guessing dose by the tablespoon.',
      },
      { type: 'heading', text: 'Common beginner mistakes this setup prevents' },
      {
        type: 'list',
        items: [
          'Buying a blade grinder “for now” — it creates fines and boulders that taste muddy forever.',
          'Skipping the scale — two scoops of different beans are not the same recipe.',
          'Pouring from a wide kitchen kettle — channeling and uneven extraction on V60.',
          'Using pre-ground grocery coffee — aroma is already gone before the first brew.',
          'Upgrading the dripper before the grinder — prettier plastic does not fix grind distribution.',
        ],
      },
      { type: 'heading', text: 'When to upgrade next' },
      {
        type: 'paragraph',
        text: 'After a month of consistent cups, the highest-value upgrades are usually an electric variable-temp gooseneck (Fellow Stagg or Bonavita) if you pour over daily, or a dedicated espresso path (see the pro espresso setup) if milk drinks are the goal. Do not buy both at once — pick the drink you make five mornings a week.',
      },
    ],
    items: [
      {
        name: 'TIMEMORE Chestnut C3 hand grinder',
        why: 'Uniform grounds are the #1 flavor upgrade — and this hand grinder punches above its price.',
        asin: 'B0CNDBVVDG',
        affiliateUrl: 'https://link.amazon/B07xJN4Wy',
        priceHint: '~$70–90',
      },
      {
        name: 'Hario V60 Plastic 02',
        why: 'Forgiving, durable, cheap pour-over cone for 1–2 cups.',
        asin: 'B006IKMUIG',
        priceHint: '~$13',
      },
      {
        name: 'AeroPress Original (optional second brewer)',
        why: 'Travel-proof and nearly impossible to mess up — great backup to the V60.',
        asin: 'B0018RY8H0',
        priceHint: '~$40',
      },
      {
        name: 'Hario Buono gooseneck kettle',
        why: 'Precise pouring without buying an electric kettle yet.',
        asin: 'B079ZYN4KL',
        affiliateUrl: 'https://link.amazon/B06K86WGa',
        priceHint: '~$50–60',
      },
      {
        name: 'Greater Goods coffee scale with timer',
        why: 'Makes ratios repeatable from day one at a beginner price.',
        asin: 'B0CGCZMPKW',
        affiliateUrl: 'https://link.amazon/B03CBn8Up',
        priceHint: '~$30',
      },
      {
        name: 'Kicking Horse Three Sisters (medium roast beans)',
        why: 'Fresh whole beans complete the kit — medium roast is the easiest place to start tasting.',
        asin: 'B0027Z5J6G',
        affiliateUrl: 'https://link.amazon/B03JCW6ul',
        priceHint: '~$30–40 / 2.2 lb',
      },
    ],
    faqs: [
      {
        question: 'What is the best beginner home coffee setup?',
        answer:
          'The best beginner setup puts most of the budget into a burr grinder, then pairs it with a simple brewer, a kettle, a scale, and fresh whole beans. That combination improves grind quality, consistency, and brew control without forcing you into expensive espresso gear too early.',
      },
      {
        question: 'Can I make great coffee at home without an expensive machine?',
        answer:
          'Yes. For most people, a good grinder plus a simple brewer like a V60, AeroPress, or French press produces better coffee than a flashy machine paired with a poor grinder. Technique and fresh beans matter more than status gear.',
      },
      {
        question: 'Should beginners start with espresso or filter coffee?',
        answer:
          'Filter coffee is usually the better place to start. It is cheaper, easier to learn, and more forgiving when your grinder or technique is not perfect. Espresso is rewarding, but it is the most demanding and expensive branch of home coffee.',
      },
      {
        question: 'What is the first upgrade after a beginner coffee setup?',
        answer:
          'If your grinder is already solid, the next step is often a variable-temperature electric gooseneck or a faster, more precise scale. Upgrades should remove a real bottleneck — sour cups from uneven pours, or inconsistent dose — not just add counter clutter.',
      },
      {
        question: 'Is a hand grinder good enough for daily coffee?',
        answer:
          'For one or two cups a day, yes. A quality hand grinder like the Timemore C3 can outperform cheap electric grinders at the same price. Switch to electric when you brew large batches every morning or start chasing espresso fineness.',
      },
      {
        question: 'Do I need both a V60 and an AeroPress?',
        answer:
          'No. Start with one. V60 teaches pour control and clarity; AeroPress is more forgiving and travel-friendly. Add the second only if you want variety after your primary method feels automatic.',
      },
      {
        question: 'How much should I budget for beans each month?',
        answer:
          'Plan on roughly one to two bags per person depending on cup size. A 2.2 lb medium roast like Three Sisters stretches further than tiny specialty bags while you learn. Freshness still beats buying bulk that sits for months.',
      },
    ],
  },
  {
    slug: 'pro-espresso-setup',
    title: 'Pro Home Espresso Setup 2026 — Bambino, Sette & Scale',
    metaDescription:
      'Pro home espresso setup 2026: Breville Bambino Plus, Baratza Sette 30, OXO scale, and espresso beans. Dial-in workflow, dose/yield targets, and when to upgrade — not just a shopping list.',
    excerpt: 'Café-quality shots at home. The machine, grinder, and accessories serious enthusiasts choose.',
    budget: '$1,500+',
    level: 'Enthusiast',
    image: '/images/setup-espresso-hero.webp',
    updated: '2026-11-10',
    quickAnswer:
      'Pair a temperature-capable machine (Bambino Plus class) with a dedicated espresso grinder (Sette 30), a fast 0.1 g scale, and a forgiving medium espresso roast. Spend on the grinder before chasing dual boilers.',
    intro:
      'When you are ready to chase espresso seriously, the grinder matters as much as the machine. This setup pairs a fast heat-up machine with a dedicated espresso grinder, a scale for dose and yield, and a forgiving espresso roast to dial in on — so you learn extraction instead of guessing.',
    body: [
      { type: 'heading', text: 'Why this stack works' },
      {
        type: 'paragraph',
        text: 'Home espresso fails most often because the grind cannot resolve tiny changes. A Bambino-class machine can pull excellent shots when the puck is even and the dose/yield are weighed. The Baratza Sette 30 is built for espresso workflow (timed dosing, portafilter-friendly), and the OXO scale turns “looks about right” into grams in / grams out. Lavazza Espresso or Super Crema give you a stable, widely available bean while you learn — save ultra-light single origins for after your dial-in muscle memory exists.',
      },
      { type: 'heading', text: 'Dial-in targets for week one' },
      {
        type: 'list',
        items: [
          'Dose: start around 18 g in a double basket (match your basket; do not overdose a small basket).',
          'Yield: aim for roughly 1:2 (18 g in → ~36 g out) in about 25–32 seconds from pump start.',
          'If the shot gushes fast and tastes sour/salty: grind finer or dose up slightly.',
          'If the shot chokes or tastes harsh/bitter: grind coarser or shorten the ratio.',
          'Change grind first. Only change dose or yield after three consistent shots at one setting.',
        ],
      },
      { type: 'heading', text: 'Workflow that keeps shots consistent' },
      {
        type: 'paragraph',
        text: 'Weigh beans into the portafilter or dosing cup, distribute evenly (WDT tool or a simple needle if you add one later), tamp level with consistent pressure, flush the group briefly, then pull onto the scale. Log grind setting, dose, yield, and time for a week. Humidity and bean age drift — yesterday’s perfect setting can run fast today as beans dry out.',
      },
      {
        type: 'tip',
        text: 'Use the espresso ratio calculator on KickerCoffee to lock a target before you chase taste. Numbers first, then nudge grind.',
      },
      { type: 'heading', text: 'Milk drinks vs straight espresso' },
      {
        type: 'paragraph',
        text: 'The Bambino Plus auto-textures milk well enough for daily lattes. If you mostly drink milk drinks, a slightly darker or chocolate-forward espresso blend hides small dial-in errors. If you drink straight shots, expect to spend more time on distribution and grind — and consider upgrading the grinder before the machine when you outgrow the Sette’s resolution.',
      },
      { type: 'heading', text: 'What this setup is not' },
      {
        type: 'list',
        items: [
          'Not a dual-boiler café clone — back-to-back six-drink parties will stress a single-boiler/thermojet workflow.',
          'Not a substitute for water quality — hard water scales machines; very soft water tastes hollow.',
          'Not “set and forget” — espresso is a skill. Budget practice bags, not only gear.',
        ],
      },
      { type: 'heading', text: 'Next upgrades (only when needed)' },
      {
        type: 'paragraph',
        text: 'Bottomless portafilter for diagnosing channeling, a precision basket, then either a stronger grinder or a dual-boiler/heat-exchanger if milk volume and temperature stability become the bottleneck. Skip novelty gadgets until dose, yield, and distribution are boringly consistent.',
      },
    ],
    items: [
      {
        name: 'Breville Bambino Plus',
        why: 'Fast heat-up, 54 mm portafilter, and auto milk texturing — serious espresso without a dual-boiler footprint.',
        asin: 'B08ZK15YNK',
        priceHint: '~$500',
      },
      {
        name: 'Baratza Sette 30 espresso grinder',
        why: 'Dedicated espresso grind speed and timed dosing. Spend here before upgrading the machine again.',
        asin: 'B075G11F9N',
        affiliateUrl: 'https://link.amazon/B01Bbc0sF',
        priceHint: '~$300',
      },
      {
        name: 'OXO Brew coffee scale with timer',
        why: 'Weigh dose and yield. Espresso without a scale is guessing.',
        asin: 'B07MVRZR9W',
        affiliateUrl: 'https://link.amazon/B0aTCebcF',
        priceHint: '~$50',
      },
      {
        name: 'Lavazza Espresso 100% Arabica whole bean',
        why: 'Forgiving medium espresso roast for dialing shots — floral/fruit notes without ultra-light drama.',
        asin: 'B00P0ZMWEC',
        affiliateUrl: 'https://link.amazon/B04q1U4fp',
        priceHint: '~$20–28 / 2.2 lb',
      },
    ],
    faqs: [
      {
        question: 'What is the best home espresso setup for serious enthusiasts?',
        answer:
          'A strong enthusiast setup usually combines a temperature-capable machine, a dedicated espresso grinder, and a scale for dose and yield. The grinder is just as important as the machine because espresso depends on tiny grind adjustments.',
      },
      {
        question: 'Should I spend more on the espresso machine or the grinder?',
        answer:
          'If you have to prioritize, spend more on the grinder once the machine is competent and temperature-stable. A premium machine cannot rescue an inconsistent espresso grind, but a great grinder can make a modest machine perform far better.',
      },
      {
        question: 'Do I need a dual-boiler machine at home?',
        answer:
          'Not everyone does. Dual-boiler machines help most if you make milk drinks often, want tighter temperature control, or pull several drinks back to back. For occasional straight espresso, a Bambino-class machine is enough while you learn.',
      },
      {
        question: 'What accessories actually matter for espresso consistency?',
        answer:
          'A good scale, a tamper that fits your basket, and even distribution matter far more than novelty gadgets. A bottomless portafilter is useful later because it shows channeling immediately.',
      },
      {
        question: 'What coffee-to-water ratio should I use for espresso?',
        answer:
          'Start around 1:2 (for example 18 g coffee to 36 g liquid espresso) in roughly 25–32 seconds. Adjust grind before you abandon the ratio. Our espresso ratio calculator helps you lock targets.',
      },
      {
        question: 'Why do my shots taste different every day?',
        answer:
          'Beans age, humidity changes, and tiny grind drifts stack up. Weigh every shot, note the grind setting, and expect to nudge finer as a bag opens and degasses. Inconsistency usually means unmeasured dose — not a broken machine.',
      },
    ],
  },
]

/* ----------------------------- Bean affiliate picks ----------------------------- */

/** Whole-bean Amazon picks to affiliate across gear, beans, and brew pages. */
export const BEAN_PICKS: AffiliateProduct[] = [
  {
    name: 'Kicking Horse Three Sisters (Medium Roast)',
    asin: 'B0027Z5J6G',
    affiliateUrl: 'https://link.amazon/B03JCW6ul',
    tier: 'Best overall',
    roast: 'Medium',
    priceHint: 'Often ~$30–40 / 2.2 lb',
    why: 'Organic medium roast with cocoa and stone-fruit notes — the easiest everyday bag while you learn your palate.',
  },
  {
    name: 'Lavazza Espresso 100% Arabica',
    asin: 'B00P0ZMWEC',
    affiliateUrl: 'https://link.amazon/B04q1U4fp',
    tier: 'Essential',
    roast: 'Espresso',
    priceHint: 'Often ~$20–28 / 2.2 lb',
    why: 'All-Arabica medium roast for espresso, moka, or drip when you want a softer, less robusta-forward cup.',
  },
  {
    name: 'Lavazza Super Crema Whole Bean',
    asin: 'B0BBQH5XYJ',
    tier: 'Essential',
    roast: 'Espresso',
    priceHint: 'Often ~$25–35 / 2.2 lb',
    why: 'Creamy medium espresso roast that dials easily on home machines — Arabica/Robusta blend with rich crema.',
  },
  {
    name: 'Death Wish Organic Dark Roast',
    asin: 'B006CNTR6W',
    affiliateUrl: 'https://link.amazon/B04NE75BF',
    tier: 'Premium',
    roast: 'Dark',
    priceHint: 'Often ~$16–20 / 16 oz',
    why: 'High-caffeine Arabica + Robusta dark roast for bold cups — pair with the caffeine tracker so you do not overshoot sleep.',
  },
  {
    name: 'Counter Culture Forty Six Blend',
    asin: 'B07N3FZGGL',
    affiliateUrl: 'https://link.amazon/B0b64IdV8',
    tier: 'Premium',
    roast: 'Dark',
    priceHint: 'Often ~$18–22 / 12 oz',
    why: 'Specialty dark blend (chocolate, smoke, full body) when you want roaster-level quality still available on Amazon.',
  },
  {
    name: "Peet's Decaf Major Dickason's Blend",
    asin: 'B0D14Z388K',
    affiliateUrl: 'https://link.amazon/B06hB51cp',
    tier: 'Best overall',
    roast: 'Decaf',
    priceHint: 'Often ~$18–22 / two 10.5 oz bags',
    why: 'Water-processed dark-roast decaf with real body — the bag people grab when they want evening coffee without the buzz.',
  },
]

export function getBeanPicks(opts?: { roast?: AffiliateProduct['roast']; limit?: number }) {
  let list = BEAN_PICKS
  if (opts?.roast) list = list.filter((p) => p.roast === opts.roast)
  if (opts?.limit) list = list.slice(0, opts.limit)
  return list
}

/* ----------------------------- Beans & roasts ----------------------------- */

export type BeanArticle = {
  slug: string
  topic: string
  title: string
  metaDescription: string
  excerpt: string
  readTime: string
  updated: string
  image: string
  intro: string
  body: ContentBlock[]
  faqs: FaqItem[]
  /** Short SERP-style answer shown above the fold for CTR. */
  quickAnswer?: string
}

export const BEAN_ARTICLES: BeanArticle[] = [
  {
    slug: 'coffee-roast-levels-explained',
    topic: 'Roasting',
    title: 'Types of Coffee Roast Explained — Light vs Medium vs Dark',
    metaDescription:
      'Types of coffee roast explained: light vs medium vs dark, what each tastes like, does dark roast have more caffeine, and how to brew each roast level.',
    excerpt:
      'Types of coffee roast: light, medium, and dark — flavor, acidity, body, and the caffeine myth.',
    readTime: '14 min',
    updated: '2026-11-26',
    image: '/images/roast-levels-hero.webp',
    quickAnswer:
      'There are three main types of coffee roast: light (bright, origin-forward), medium (balanced sweetness), and dark (bold, low-acid, roast-driven). “Roast level” is how far the beans were taken through that spectrum.',
    intro:
      'Roast level is one of the biggest factors in how your coffee tastes — often more than people expect. Green coffee starts grassy and vegetal; roasting develops sweetness, aroma, and body while gradually trading origin character for roast flavor. Understanding light vs medium vs dark roast helps you buy bags you will actually enjoy and brew them in a way that matches how the beans were roasted.',
    body: [
      { type: 'heading', text: 'What “roast of coffee” actually means' },
      {
        type: 'paragraph',
        text: 'Coffee roast level describes how far green beans were taken through the roasting process. Heat drives off moisture, triggers Maillard reactions (browning and nutty-caramel flavors), caramelizes sugars, and eventually cracks the bean as internal pressure builds. Stop early and you keep bright acids and floral or fruity notes from the origin. Roast longer and those notes fade while chocolate, toast, smoke, and bittersweet roast flavors take over. The same Ethiopian or Colombian lot can taste like two different coffees depending on whether it was pulled as a light roast or pushed toward dark.',
      },
      {
        type: 'list',
        items: [
          'Light roast: stopped soon after first crack — highest origin character, brightest acidity, lightest body.',
          'Medium roast: between first and second crack — balance of sweetness, body, and origin flavor.',
          'Dark roast: at or past second crack — bold roast flavor, low acidity, heavier body, less origin nuance.',
        ],
      },
      { type: 'heading', text: 'First crack, second crack, and what happens in the roaster' },
      {
        type: 'paragraph',
        text: 'As beans heat, water turns to steam and the structure expands until the bean audibly “pops” — first crack. That is the earliest point most drinkable coffee is finished. Continue roasting and oils migrate toward the surface; later, a quieter second crack begins as the cell structure fractures further. Specialty light and medium roasts usually live between first crack and the start of second crack. Traditional dark and French roasts push into or past second crack, which is why those beans often look oily and taste more roasted than fruity.',
      },
      {
        type: 'tip',
        text: 'Bag color alone is a rough guide. Oil on the surface usually means a darker roast, but lighting and packaging photos can mislead. Taste notes (“blueberry,” “caramel,” “smoke”) and brew behavior are more trustworthy than a single word on the label.',
      },
      { type: 'heading', text: 'Light roast coffee' },
      {
        type: 'paragraph',
        text: 'Light roasts are pulled shortly after first crack. The bean stays denser, the surface is usually dry (not oily), and the cup keeps more of what the farm grew: florals, citrus, berry, tea-like acidity, and a lighter body. Specialty roasters love light roasts for single-origin pour overs because the roast does not bury the origin. That brightness is a feature, not a flaw — but if you expect grocery-store “breakfast blend” comfort, a light Ethiopian can taste sharp or sour until you adjust grind and water temperature.',
      },
      {
        type: 'list',
        items: [
          'Flavor: jasmine, bergamot, berry, stone fruit, honey, citrus — depending on origin and process.',
          'Acidity: high and lively; body: light to medium-light.',
          'Best brew methods: pour over, drip, AeroPress; also excellent as modern light-roast espresso if you dial carefully.',
          'Brew tips: hotter water (~93–96°C / 200–205°F), slightly finer grind, sometimes a touch more dose or longer contact time.',
        ],
      },
      { type: 'heading', text: 'Medium roast coffee' },
      {
        type: 'paragraph',
        text: 'Medium roast is the crowd-pleaser and the best starting point for most home brewers. Enough development softens sharp acids and builds caramelized sweetness, while enough origin character remains that a Colombian still tastes different from a Brazilian. Expect milk chocolate, caramel, hazelnut, red apple, and brown sugar more often than extreme florals or heavy smoke. Medium roasts forgive small grind mistakes and work across drip machines, French press, pour over, and many espresso setups.',
      },
      {
        type: 'list',
        items: [
          'Flavor: caramel, chocolate, nuts, mild fruit, balanced sweetness.',
          'Acidity: moderate; body: medium.',
          'Best brew methods: almost everything — drip, French press, pour over, AeroPress, moka pot, espresso.',
          'Brew tips: start with a standard 1:16 filter ratio (or 1:15 for French press) and adjust grind before changing everything else.',
        ],
      },
      {
        type: 'paragraph',
        text: 'Light roast vs medium roast is the comparison people search most. If light tastes too bright or “tea-like,” step to medium before jumping to dark. You will keep sweetness and complexity without the smoky finish of a French roast.',
      },
      { type: 'heading', text: 'Medium-dark and dark roast coffee' },
      {
        type: 'paragraph',
        text: 'Dark roasts continue toward or past second crack. Sugars carbonize further, acidity drops, body increases, and origin notes fade behind dark chocolate, toast, spice, and sometimes smoke or char. Beans may look oily. Traditional espresso blends, diner coffee, and many grocery dark roasts live here because the flavor is bold, low-acid, and cuts through milk. Medium vs dark roast is mostly about how much roast flavor you want versus how much origin character you want to keep.',
      },
      {
        type: 'list',
        items: [
          'Flavor: dark chocolate, molasses, toast, spice, smoke; less fruit and floral detail.',
          'Acidity: low; body: medium-full to full.',
          'Best brew methods: espresso, moka pot, French press, milk drinks; also fine as drip if you like bold cups.',
          'Brew tips: slightly cooler water (~88–92°C), coarser grind than you would use for a light roast, avoid over-extracting into ashiness.',
        ],
      },
      { type: 'heading', text: 'Common roast names on the bag' },
      {
        type: 'paragraph',
        text: 'Roasters use marketing names that sit on the same light–medium–dark spectrum. They are not standardized, but these are the usual meanings:',
      },
      {
        type: 'list',
        items: [
          'Cinnamon / Light City / New England: very light — often just into first crack.',
          'City / City+: light to light-medium specialty territory.',
          'Full City / Full City+: medium to medium-dark; common for espresso-leaning roasts.',
          'Vienna: medium-dark, starting to show oil and roast sweetness.',
          'French roast: very dark, oily, low acidity, dominant roast flavor.',
          'Italian roast: typically as dark or darker than French — heavy roast character.',
          'Blond roast (popularized by some chains): a light-leaning roast marketed as milder; treat it like a light or light-medium when you brew.',
        ],
      },
      { type: 'heading', text: 'Does dark roast have more caffeine?' },
      {
        type: 'paragraph',
        text: 'No — not in any meaningful everyday sense. Roast level has only a tiny effect on caffeine. By weight, dark and light are nearly identical (dark can be microscopically higher because more mass is lost as moisture and chaff). By scoop or tablespoon, light roast is denser, so a scooped light roast can deliver slightly more caffeine. Brew method and dose matter far more: a big cold brew or a large drip mug will out-caffeinate a small dark espresso shot every time.',
      },
      {
        type: 'tip',
        text: 'When people say dark roast is “stronger,” they usually mean flavor intensity or bitterness — not milligrams of caffeine. Use a caffeine calculator if you are tracking intake by drink size.',
      },
      { type: 'heading', text: 'How roast level changes brewing' },
      {
        type: 'paragraph',
        text: 'Roast level changes density and solubility. Light roasts are harder and less porous, so they need more extraction help: hotter water, finer grind, or longer contact. Dark roasts are more brittle and extract easily, so the same recipe can turn bitter or ashy — back off temperature, grind a bit coarser, or shorten brew time. If you brew every roast with one frozen recipe, you are not tasting the roast fairly.',
      },
      {
        type: 'list',
        items: [
          'Light: hotter water, finer grind, watch for sour under-extraction — grind finer before adding a ton more coffee.',
          'Medium: standard recipes work; adjust grind first when taste is off.',
          'Dark: cooler water, coarser grind, do not over-steep French press or over-fine espresso.',
          'Espresso: light roasts often like longer ratios (e.g. 1:2.5); classic dark blends often sit near 1:2.',
        ],
      },
      { type: 'heading', text: 'Best roast for each brew method' },
      {
        type: 'list',
        items: [
          'Pour over / V60: light to medium — clarity shows origin; light shines if you like brightness.',
          'Drip coffee maker: medium — most forgiving for automatic machines.',
          'French press / cafetière: medium to medium-dark — body and oils suit immersion; light works if you like tea-like cups.',
          'Cold brew: medium-dark to dark — long steeps can make light roasts taste grassy; chocolatey darks go smooth.',
          'Espresso: any level can work; traditional milk drinks often use medium-dark; modern specialty shops push light-medium single origins.',
          'Moka pot: medium-dark to dark — heat and pressure amplify bitterness in very light roasts.',
        ],
      },
      { type: 'heading', text: 'How to choose the right roast for your taste' },
      {
        type: 'list',
        items: [
          'Choose light roast if you enjoy floral, fruity, tea-like coffees and mostly brew pour over or filter coffee.',
          'Choose medium roast if you want the widest brewing flexibility and a balance of sweetness, body, and acidity.',
          'Choose dark roast if you prefer low-acid, bold coffee or mainly make milk drinks, moka pot coffee, or traditional espresso.',
          'Not sure? Buy a medium single origin and a light roast from the same shop, brew both with the same method, and taste side by side.',
        ],
      },
      { type: 'heading', text: 'Roast labels can be inconsistent' },
      {
        type: 'paragraph',
        text: 'One roaster’s medium can be another’s light-medium. Grocery brands often roast darker overall than specialty cafés using the same words. European “medium” and U.S. chain “blonde” do not map cleanly either. Read tasting notes, look at the roast date (not only best-by), and judge by the cup: if a labeled medium tastes smoky and oily, brew it like a dark roast. If a “dark” specialty bag still tastes fruity and dry on the surface, treat it closer to medium.',
      },
      { type: 'heading', text: 'Buying tips that beat the label' },
      {
        type: 'list',
        items: [
          'Prefer a roast date within the last few weeks for filter coffee; espresso blends are often best after a short rest.',
          'Match roast to method: do not force a very light Nordic-style roast through a coarse French press recipe without adjusting grind and temperature.',
          'For milk drinks, medium-dark often cuts through better than delicate light roasts.',
          'If acidity bothers your stomach, medium-dark or dark and cold brew are usually gentler than light filter coffee — though individual tolerance varies.',
        ],
      },
      {
        type: 'quote',
        text: 'Roast level is a dial, not a moral ranking. Light is not “better” and dark is not “worse” — they are different tools for different cups.',
      },
    ],
    faqs: [
      {
        question: 'What are the types of coffee roasts?',
        answer:
          'The three main types of coffee roasts are light, medium, and dark. Light roasts taste bright and fruity, medium roasts balance sweetness and acidity, and dark roasts are bold, low-acid, and roast-forward. Labels like medium-dark, Full City, Vienna, French roast, and blond roast sit along that same spectrum.',
      },
      {
        question: 'What is the roast of coffee?',
        answer:
          'Roast of coffee means how long and how dark the green beans were roasted. Light stops soon after first crack; medium balances origin and roast sweetness between cracks; dark goes toward or past second crack, trading origin nuance for bold, roasty flavors.',
      },
      {
        question: 'What is first crack and second crack?',
        answer:
          'First crack is an audible popping when the bean expands early in roasting — the start of most drinkable light roasts. Second crack happens later as the structure breaks down further; dark and French roasts are finished around or after this stage and often look oilier.',
      },
      {
        question: 'Which roast has the most caffeine?',
        answer:
          'They are nearly identical. Roast level has a minimal effect on caffeine. Any difference comes down to whether you measure by weight (dark slightly higher) or by scoop (light slightly higher because the beans are denser).',
      },
      {
        question: 'Is dark roast stronger than light roast?',
        answer:
          '"Strong" usually refers to flavor intensity, not caffeine. Dark roasts taste bolder and more bitter, but light roasts can be just as caffeinated and often more acidic and complex.',
      },
      {
        question: 'What does French roast mean?',
        answer:
          'French roast is a very dark roast — oily beans, low acidity, and dominant roast flavors like dark chocolate, smoke, and char. Origin character is mostly gone. Brew a bit cooler and coarser if it tastes ashy.',
      },
      {
        question: 'What is a blond roast?',
        answer:
          'Blond roast is a light or light-medium style popularized by some coffee chains. Expect a milder, less roasty cup than a traditional dark breakfast blend. Brew it like a light roast: hotter water and a bit finer grind if it tastes sour.',
      },
      {
        question: 'Is medium roast the best for beginners?',
        answer:
          'Usually yes. Medium roast is the most forgiving across drip, pour over, French press, and espresso, with balanced sweetness and acidity. Start there, then explore lighter or darker once you know what you like.',
      },
      {
        question: 'Light roast vs medium roast — what is the difference?',
        answer:
          'Light roast tastes brighter and more origin-driven (floral, fruity, higher acidity). Medium roast adds caramel and chocolate sweetness with milder acidity and more body. If light tastes too sharp, step to medium before jumping to dark.',
      },
      {
        question: 'Medium vs dark roast coffee — which should I buy?',
        answer:
          'Choose medium for everyday balance and versatility. Choose dark if you want low acidity, bold roast flavors, and milk drinks. Dark roast is not “stronger” in caffeine — it just tastes more roasted.',
      },
      {
        question: 'What roast is best for French press?',
        answer:
          'Medium to medium-dark suits French press body and oils especially well. Light roast works if you like a cleaner, tea-like immersion cup — just grind coarse and do not under-extract. Dark roast gives a bold, low-acid press if that is your preference.',
      },
      {
        question: 'What roast is best for cold brew?',
        answer:
          'Medium-dark to dark usually produces the smoothest overnight cold brew. Very light roasts can taste grassy or thin after a 12–18 hour steep. Chocolatey, nutty lots shine as concentrate.',
      },
      {
        question: 'Why does my light roast taste sour?',
        answer:
          'Often under-extraction, not “bad” acidity. Grind a little finer, use hotter water (93–96°C), and make sure brew time is long enough for the method. True light-roast fruit acidity is pleasant; sour saltiness means you need more extraction.',
      },
      {
        question: 'Why does my dark roast taste burnt?',
        answer:
          'It may be roasted very dark, stale, or over-extracted. Try cooler water, a coarser grind, and a shorter contact time. If every dark bag from that brand tastes ashy, look for a medium-dark instead of French or Italian roast.',
      },
    ],
  },
  {
    slug: 'coffee-bean-origins-guide',
    topic: 'Origins',
    title: 'Coffee Bean Origins by Country — Compare Ethiopia, Colombia, Brazil',
    metaDescription:
      'How do coffee beans from different countries compare? Side-by-side origin chart for Ethiopia, Colombia, Brazil, Kenya, Sumatra + flavor, process, and buying tips.',
    excerpt:
      'How coffee beans from different countries compare — Ethiopia to Brazil — with a side-by-side flavor chart.',
    readTime: '12 min',
    updated: '2026-11-26',
    image: '/images/origins-hero.webp',
    quickAnswer:
      'Coffee beans from different countries compare mainly on acidity, body, and aroma: Ethiopia often fruity/floral, Colombia balanced caramel-sweet, Brazil chocolate/nutty and low-acid, Kenya bright and currant-like, Sumatra earthy and full. Origin matters as much as roast.',
    intro:
      'Where coffee grows — the soil, altitude, climate, varietal, and processing method — shapes its flavor as much as the roast. Coffee only thrives in the "Bean Belt" between the Tropics of Cancer and Capricorn, where warm days, cool nights, and seasonal rainfall let cherries ripen slowly and develop complex sugars. Learning regional flavor profiles helps you shop for beans you will love and understand why the same roast tastes completely different from one country to the next.',
    body: [
      { type: 'heading', text: 'How do coffee beans from different countries compare?' },
      {
        type: 'paragraph',
        text: 'Use this chart as a buying map, not a rigid rulebook. Processing (washed vs natural) and roast level can push any origin brighter or darker — but country still sets the baseline tendency.',
      },
      {
        type: 'table',
        caption: 'Typical cup tendencies at light–medium roast. Open the world coffee map to compare any two origins live.',
        headers: ['Country', 'Acidity', 'Body', 'Common flavors', 'Best for'],
        rows: [
          ['Ethiopia', 'High', 'Light–medium', 'Berry, jasmine, citrus, peach', 'Pour over, filter'],
          ['Kenya', 'Very high', 'Medium', 'Blackcurrant, grapefruit, winey', 'Pour over, modern espresso'],
          ['Colombia', 'Medium', 'Medium', 'Caramel, red apple, chocolate', 'Everyday drip / espresso'],
          ['Brazil', 'Low', 'Full', 'Chocolate, nuts, peanut', 'Espresso blends, milk drinks'],
          ['Guatemala', 'Medium', 'Medium–full', 'Cocoa, spice, stone fruit', 'Filter + espresso'],
          ['Sumatra', 'Low', 'Full / syrupy', 'Earth, cedar, dark chocolate', 'French press, espresso'],
          ['Vietnam', 'Low', 'Heavy', 'Bold, woody (often Robusta)', 'Phin / iced milk coffee'],
        ],
      },
      {
        type: 'tip',
        text: 'Want a live side-by-side? Open the world coffee map, tap Compare, and pick two countries — altitude, process, and cup bars update together.',
      },
      { type: 'heading', text: 'The Coffee Belt and why geography matters' },
      {
        type: 'paragraph',
        text: 'Nearly all commercial coffee is grown within roughly 1,000 km of the equator, across more than 70 countries. Two species dominate: Arabica (about 60% of global production) thrives at higher altitudes and delivers sweeter, more aromatic cups; Robusta (about 40%) grows at lower elevations, tolerates heat and disease better, and produces a heavier, more bitter cup with nearly twice the caffeine. Altitude is one of the biggest flavor levers — beans grown above 1,500 m mature more slowly, developing higher acidity and more nuanced fruit notes, while lower-grown coffees tend toward chocolate, nuts, and body.',
      },
      {
        type: 'list',
        items: [
          'Brazil produces roughly 40% of the world\'s coffee — mostly low-altitude Arabica and Robusta used in espresso blends.',
          'Vietnam is the second-largest producer (~15% of global output), growing primarily Robusta for instant coffee and Vietnamese phin-filter brews.',
          'Colombia, Ethiopia, and Honduras are among the top specialty Arabica exporters prized by third-wave roasters.',
          'Ethiopia is widely considered the birthplace of coffee; wild Arabica still grows in the forests of Kaffa.',
        ],
      },
      { type: 'heading', text: 'East Africa' },
      {
        type: 'paragraph',
        text: 'East African coffees are the benchmark for bright, expressive cups. High altitude, volcanic soil, and distinctive heirloom or research-bred varietals (like Kenya\'s SL28 and SL34) produce intense acidity and vivid fruit character that specialty roasters often showcase at light roast levels.',
      },
      {
        type: 'list',
        items: [
          'Ethiopia (1,500–2,200 m): The origin of coffee. Yirgacheffe, Sidama, and Harrar are the famous regions. Washed Ethiopians taste like jasmine, bergamot, and lemon; natural-processed lots can taste strikingly like blueberry and peach. Heirloom Arabica varietals and Gesha make Ethiopia the most diverse origin on earth.',
          'Kenya (1,400–2,100 m): Known for blackcurrant, grapefruit, and wine-like complexity. Kenya\'s 72-hour double-washed process and SL28/SL34 varietals create one of the world\'s most distinctive cups — intensely fruity with high acidity. Main harvest runs October through December.',
          'Rwanda & Burundi: Smaller producers gaining specialty recognition for red apple, black tea, and floral notes with clean, sweet acidity — often excellent value compared to Kenya.',
        ],
      },
      {
        type: 'tip',
        text: 'If you love fruity, tea-like pour overs, start with a washed Ethiopian Yirgacheffe or a Kenyan AA. Try them at light roast before moving to naturals, which can taste almost like fruit juice.',
      },
      { type: 'heading', text: 'Central America' },
      {
        type: 'paragraph',
        text: 'Central American coffees sit in the sweet spot between African brightness and South American body. Volcanic soil, high altitude, and meticulous washed processing produce clean, balanced cups that work beautifully as pour overs, drip, and single-origin espresso.',
      },
      {
        type: 'list',
        items: [
          'Guatemala (1,300–2,000 m): Eight distinct growing regions shaped by volcanoes and lakes. Antigua — nestled between three volcanoes — produces full-bodied cups with dark chocolate, brown spice, and toffee. Huehuetenango offers brighter stone fruit at even higher altitude.',
          'Costa Rica (1,200–1,900 m): A specialty pioneer and the only Central American country to legally ban Robusta. Tarrazu is the flagship region. Costa Rica popularized honey processing — a middle path between washed clarity and natural fruitiness — yielding honey, peach, and brown sugar notes.',
          'Honduras (1,000–1,700 m): Now Central America\'s largest producer by volume. Copán, Marcala, and Comayagua deliver sweet, fruit-forward cups (peach, mango, caramel) that offer excellent quality for the price.',
          'Mexico (900–1,500 m): Chiapas, Veracruz, and Oaxaca produce mild, approachable coffees with chocolate, almond, and subtle spice — great everyday drinkers. Oaxaca is home to the rare Maragogipe "elephant bean," three times the size of a normal coffee seed.',
        ],
      },
      { type: 'heading', text: 'South America' },
      {
        type: 'paragraph',
        text: 'South America is the backbone of global coffee supply. Profiles range from Brazil\'s low-acid, nutty heaviness to Colombia\'s clean sweetness and Peru\'s bright, organic-friendly high-altitude lots.',
      },
      {
        type: 'list',
        items: [
          'Colombia (1,200–1,800 m): One of the only countries with two harvest seasons per year (main crop October–February, "mitaca" April–June) thanks to its equatorial geography. Huila and Nariño are the most prized specialty regions. Expect caramel, red apple, hazelnut, and milk chocolate in a reliably clean, sweet cup.',
          'Brazil (800–1,200 m): Lower altitudes and natural or pulped-natural processing yield low-acid, heavy-bodied coffees with dark chocolate, peanut, and brown sugar. Brazil\'s beans form the foundation of most commercial espresso blends worldwide.',
          'Peru (1,500–2,100 m): High-altitude farms in Cajamarca and Cusco produce bright, clean cups with citrus and floral notes. Peru is a major source of certified organic and Fair Trade coffee.',
        ],
      },
      { type: 'heading', text: 'Asia & the Pacific' },
      {
        type: 'paragraph',
        text: 'Asian and Pacific coffees often break the "bright and fruity" mold. Heavy rainfall, lower acidity targets, and unique processing methods — especially Indonesia\'s wet-hulling (Giling Basah) — produce bold, savory cups with enormous body.',
      },
      {
        type: 'list',
        items: [
          'Indonesia — Sumatra, Java, Sulawesi (1,000–1,700 m): Wet-hulled processing creates the famous low-acid, earthy, syrupy profile with cedar, dark chocolate, and herbal notes. Java tends cleaner and more refined than Sumatra\'s bold, mushroom-and-tobacco character.',
          'Vietnam (500–1,500 m): Built by French colonists in the 19th century, Vietnam went from negligible production in 1975 to the world\'s #2 producer by 2000. Nearly all output is Robusta — dark chocolate, grain, and molasses notes with very high caffeine. Vietnamese iced coffee (cà phê sữa đá) brewed through a phin filter over condensed milk is the iconic preparation.',
          'India — Malabar Coast: Monsooned Malabar is a unique process where beans are exposed to monsoon winds, swelling and mellowing into a low-acid, spicy, woody cup unlike anything else.',
          'Papua New Guinea: Grown on small highland farms (1,400–1,900 m), PNG coffee offers bright acidity with tropical fruit and a clean, sweet finish — a hidden gem in specialty markets.',
        ],
      },
      { type: 'heading', text: 'How processing changes what you taste' },
      {
        type: 'paragraph',
        text: 'Origin sets the potential; processing unlocks it. The same Ethiopian bean can taste completely different depending on how the cherry is handled after harvest.',
      },
      {
        type: 'list',
        items: [
          'Washed (wet): Cherry skin and mucilage are removed before drying. Produces the cleanest, brightest cups — the standard for Kenya, Colombia, and most Central American specialty coffee.',
          'Natural (dry): Whole cherries dry in the sun before de-pulping. Fermentation inside the fruit adds intense berry, wine, and tropical fruit flavors. Common in Ethiopia and Brazil.',
          'Honey: Some mucilage is left on the bean during drying. Sits between washed and natural — more sweetness and body with moderate clarity. Costa Rica is the classic example.',
          'Wet-hulled (Giling Basah): Unique to Indonesia. Beans are hulled while still partially wet, creating the heavy body and earthy character Sumatra is known for.',
        ],
      },
      { type: 'heading', text: 'How to choose beans by origin' },
      {
        type: 'list',
        items: [
          'Want bright, fruity, tea-like? → Ethiopia (natural or washed), Kenya, Rwanda.',
          'Want balanced, sweet, everyday? → Colombia, Guatemala, Honduras, Costa Rica.',
          'Want chocolate, nuts, low acidity? → Brazil, Mexico, Sumatra.',
          'Want bold body for milk drinks? → Brazil, Sumatra, Vietnam (Robusta blends).',
          'New to specialty? → Start with a medium-roast Colombian or Guatemalan before exploring African naturals.',
        ],
      },
      {
        type: 'tip',
        text: 'Look for a roast date (not just a "best by" date) and buy whole beans from a roaster who lists the country, region, and processing method. "Single origin" on the bag means one place — but "Ethiopia" alone is broad; "Ethiopia Yirgacheffe, washed, 1,900 m" tells you much more about what is in the cup.',
      },
      { type: 'heading', text: 'How to read an origin label on a coffee bag' },
      {
        type: 'paragraph',
        text: 'A useful coffee label tells you more than the country name. The strongest labels include country, region, farm or washing station, altitude, processing method, and sometimes varietal. Country tells you the broad flavor family. Region narrows climate and soil. Process hints at whether the cup will lean clean and bright or fruity and heavy. Altitude suggests density and acidity. Once you learn to read those pieces together, buying coffee becomes much less random.',
      },
      { type: 'heading', text: 'Origin is not destiny' },
      {
        type: 'paragraph',
        text: 'Origin creates a flavor tendency, not a guarantee. A natural-processed Brazilian coffee can taste fruitier than a washed Guatemalan. A dark roast can hide the floral character that made an Ethiopian bean special in the first place. Roasting skill, processing quality, storage, and brew method all shape the final cup. Use origin as a map, not as a rigid rulebook.',
      },
      { type: 'heading', text: 'Smart buying tips for exploring origins' },
      {
        type: 'list',
        items: [
          'Buy smaller bags when trying a new region so you can compare more coffees without being stuck with one profile.',
          'Keep your brew method consistent when tasting origins side by side; otherwise the brewer changes as much as the bean.',
          'Start with washed coffees if you want to learn regional differences clearly. Natural coffees can be delicious, but the fruit-driven process can dominate the origin signal.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How do coffee beans from different countries compare?',
        answer:
          'Ethiopia tends fruity/floral and high-acid; Colombia is balanced caramel-sweet; Brazil is chocolatey and low-acid; Kenya is bright and currant-like; Sumatra is earthy and full-bodied. Use the comparison chart above or the world coffee map’s Compare mode for a live side-by-side.',
      },
      {
        question: 'What does "single origin" mean?',
        answer:
          'Single origin means the coffee comes from one place — a single country, region, or even farm — rather than a blend of multiple sources. It highlights the distinctive flavors of that origin. A bag labeled "Ethiopia" is single origin at the country level; "Ethiopia Yirgacheffe, Kochere Washing Station" narrows it further to a specific micro-region.',
      },
      {
        question: 'Why does Ethiopian coffee taste like blueberries?',
        answer:
          'The blueberry note is most common in natural-processed Ethiopian coffees, especially from Sidama and Harrar. During dry processing, sugars and fruit compounds ferment inside the cherry skin, infusing the bean with intense berry flavors. Washed Ethiopians from Yirgacheffe tend toward jasmine and citrus instead.',
      },
      {
        question: 'What is the difference between Arabica and Robusta?',
        answer:
          'Arabica (Coffea arabica) grows at 900–2,200 m, has about 1.2% caffeine, and tastes sweeter and more complex — it makes up most specialty coffee. Robusta (Coffea canephora) grows at lower altitudes, has roughly 2.2% caffeine, and tastes earthier, grainier, and more bitter. Vietnam, Uganda, and parts of Brazil grow significant Robusta; most Central American and East African specialty coffee is 100% Arabica.',
      },
      {
        question: 'Does altitude really affect coffee flavor?',
        answer:
          'Yes. Higher altitude means cooler temperatures and slower cherry ripening, which allows more complex sugars and acids to develop. Coffees above 1,500 m typically show brighter acidity and more nuanced fruit and floral notes. Below 1,000 m, cherries ripen faster and cups tend toward chocolate, nuts, and heavier body — which is why Brazilian and Vietnamese coffees taste fundamentally different from Kenyan or Ethiopian lots.',
      },
      {
        question: 'Which origin is best for espresso?',
        answer:
          'There is no single best origin — it depends on the style. Brazilian beans are classic for crema and chocolate sweetness in blends. Colombians and Guatemalans work beautifully as single-origin espresso with caramel and nut notes. Africans at light roast can make stunning, fruity "modern" espresso but may be too bright for traditional dark-roast milk drinks. Most café espresso blends combine Brazilian body with a brighter Central American or African component.',
      },
    ],
  },
  {
    slug: 'how-to-store-coffee-beans',
    topic: 'Freshness',
    title: 'How to Store Coffee Beans — Keep Them Fresh (Fridge Myth)',
    metaDescription:
      'Best way to store coffee beans: opaque airtight container, cool pantry, away from light and heat. How long beans stay fresh — and why the fridge is a bad idea.',
    excerpt:
      'Air, light, heat, and moisture kill freshness. The best way to store coffee beans is simple — and it is not the fridge.',
    readTime: '7 min',
    updated: '2026-11-10',
    image: '/images/storage-hero.webp',
    quickAnswer:
      'Store whole beans in an opaque, airtight container at room temperature away from the stove and sunlight. Buy what you will finish in 2–4 weeks. Skip the fridge; freeze only long-term portions you will not thaw repeatedly.',
    intro:
      'Freshly roasted coffee is at its best within a few weeks. The four enemies of freshness are oxygen, light, heat, and moisture. Store beans correctly and every cup tastes noticeably better.',
    body: [
      { type: 'heading', text: 'The rules of storage' },
      {
        type: 'list',
        items: [
          'Buy whole beans and grind just before brewing.',
          'Keep beans in an opaque, airtight container.',
          'Store at room temperature, away from the stove and sunlight.',
          'Buy in amounts you will use within 2–4 weeks of the roast date.',
        ],
      },
      {
        type: 'tip',
        text: 'You can freeze beans for long-term storage in airtight, single-dose portions. Freeze once, and grind straight from frozen — do not repeatedly thaw and refreeze.',
      },
      { type: 'heading', text: 'What actually makes coffee go stale' },
      {
        type: 'paragraph',
        text: 'Staling is mostly oxidation. Once roasted, coffee contains volatile aromatics and oils that react with oxygen and gradually disappear or turn flat. Heat speeds this up. Light damages those same compounds. Moisture is dangerous because it encourages flavor loss and lets beans absorb odors from the environment. Ground coffee stales fastest of all because grinding massively increases the surface area exposed to air.',
      },
      { type: 'heading', text: 'When freezing coffee is worth it' },
      {
        type: 'paragraph',
        text: 'Freezing makes sense when you buy more coffee than you can drink in three or four weeks or when you want to preserve a rare bag at peak quality. Split the bag into airtight portions before freezing so each portion only gets opened once. For everyday coffee you will finish soon, room-temperature storage in a good container is simpler and usually just as effective.',
      },
      { type: 'heading', text: 'Storage mistakes that quietly ruin good beans' },
      {
        type: 'list',
        items: [
          'Keeping beans in a clear jar on the counter where light and heat hit them every day.',
          'Buying large warehouse-size bags to save money, then drinking stale coffee for two months.',
          'Scooping from the bag over a steaming brewer or kettle, which adds moisture to the beans over time.',
          'Grinding a full week\'s worth of coffee in advance for convenience.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the best way to store coffee beans?',
        answer:
          'Keep whole beans in an opaque, airtight container in a cool pantry away from light, heat, and moisture. Grind just before brewing. Buy amounts you will finish in 2–4 weeks. Do not store coffee in the fridge.',
      },
      {
        question: 'Should I store coffee in the fridge?',
        answer:
          'No. The fridge is humid and full of odors that coffee readily absorbs, plus temperature swings cause condensation. A cool, dark cupboard is far better.',
      },
      {
        question: 'How long do coffee beans stay fresh?',
        answer:
          'Whole beans are best from about 4 days to 4 weeks after roasting. Once ground, coffee stales within minutes to hours, which is why grinding fresh matters so much.',
      },
      {
        question: 'Can you freeze coffee beans?',
        answer:
          'Yes for longer storage. Portion into airtight bags or jars, freeze once, and grind straight from frozen. Do not thaw and refreeze — condensation ruins freshness.',
      },
      {
        question: 'Should coffee be stored in the freezer or pantry?',
        answer:
          'Pantry (cool, dark, airtight) is best for beans you will finish in 2–4 weeks. Freeze only what you will not use soon, in single-dose airtight portions.',
      },
      {
        question: 'Do coffee beans go bad?',
        answer:
          'They rarely become unsafe, but they go stale. Oils can smell rancid after months, and flavor fades within weeks of roasting. Always check the roast date, not just a “best by” stamp.',
      },
      {
        question: 'Is an airtight container enough for coffee storage?',
        answer:
          'Airtight helps, but also keep beans away from light, heat, and moisture. Opaque canisters beat clear jars on the counter next to the stove. Buy amounts you will drink while they are still fresh.',
      },
    ],
  },
  {
    slug: 'is-black-coffee-bad-for-you',
    topic: 'Health',
    title: 'Is Black Coffee Bad for You? Benefits, Risks & When to Cut Back',
    metaDescription:
      'Is black coffee bad for you? What research says about black coffee benefits and side effects, caffeine limits, stomach issues, sleep, and who should drink less.',
    excerpt:
      'Black coffee is not “bad” for most healthy adults — but dose, timing, and your body decide whether it helps or hurts.',
    readTime: '10 min',
    updated: '2026-09-21',
    image: '/images/home-hero.webp',
    intro:
      '“Is black coffee bad for you?” is one of the most-searched coffee questions online — usually after a jittery morning, poor sleep, or a stomach that does not love straight espresso. Short answer: for most healthy adults, moderate black coffee is linked with neutral-to-positive outcomes in large studies. Problems usually come from too much caffeine, drinking it too late, or pairing it with a sensitive stomach or anxiety. This guide separates myth from evidence and flags when cutting back makes sense. It is general information, not medical advice.',
    body: [
      { type: 'heading', text: 'What “black coffee” actually means' },
      {
        type: 'paragraph',
        text: 'Black coffee is coffee with no milk, cream, sugar, syrup, or flavor shots — just brewed coffee (or espresso) and water. That keeps calories near zero and removes the sugar load of many café drinks. It does not remove caffeine, natural acids, or bitter compounds. So “healthier than a caramel latte” is usually true for calories; “harmless at any dose” is not.',
      },
      {
        type: 'list',
        items: [
          'Typical 8 oz black drip: ~2 calories, ~95 mg caffeine.',
          'Espresso shot: ~3 calories, ~63 mg caffeine.',
          'Large 16 oz black drip: still nearly calorie-free, but ~190 mg caffeine.',
        ],
      },
      { type: 'heading', text: 'What research generally finds' },
      {
        type: 'paragraph',
        text: 'Observational studies (not perfect proof of cause) often associate regular coffee drinking with lower risk of type 2 diabetes, some liver diseases, and Parkinson’s disease, plus modest cardiovascular associations at moderate intake. Coffee also delivers polyphenols (antioxidant plant compounds). Benefits are usually seen around 2–4 cups a day for adults who tolerate caffeine — not from slamming six large cold brews.',
      },
      {
        type: 'tip',
        text: 'Most healthy-adult guidelines cite about 400 mg of caffeine per day as a reasonable upper limit — roughly three to four 8 oz coffees. Pregnancy guidance is lower (often ~200 mg). Always follow your clinician if you have a condition or take medication that interacts with caffeine.',
      },
      { type: 'heading', text: 'When black coffee can feel “bad”' },
      {
        type: 'list',
        items: [
          'Sleep: caffeine’s half-life is about 5–6 hours. An afternoon cup can still be active at bedtime.',
          'Anxiety and jitters: caffeine is a stimulant; high doses amplify heart rate and nervousness in sensitive people.',
          'Stomach and reflux: coffee can relax the lower esophageal sphincter and increase acid for some people — black coffee is not gentler just because it has no milk.',
          'Empty stomach: some people get nausea or reflux; others feel fine. Listen to your body.',
          'Bone and mineral myths: moderate coffee is not a major calcium thief if your diet is otherwise solid; extreme intake plus poor diet is a different story.',
          'Dependency: withdrawal headaches are real when you skip your usual dose.',
        ],
      },
      { type: 'heading', text: 'Black coffee vs coffee with milk or sugar' },
      {
        type: 'paragraph',
        text: 'From a calorie and sugar standpoint, black coffee wins. A splash of milk adds modest protein and calories; large sweetened drinks can add as much sugar as dessert. If “is black coffee bad for you” is really “is my morning coffee wrecking my goals,” check additives first, then caffeine timing and total milligrams.',
      },
      { type: 'heading', text: 'Who should be more careful' },
      {
        type: 'list',
        items: [
          'People who are pregnant or trying to conceive (follow obstetric caffeine limits).',
          'Anyone with uncontrolled anxiety, panic disorders, or caffeine-triggered palpitations.',
          'People with significant GERD or ulcers who notice flares after coffee.',
          'Those on medications that interact with caffeine (ask a pharmacist or doctor).',
          'Kids and teens — lower body weight means lower safe caffeine budgets.',
        ],
      },
      { type: 'heading', text: 'Practical takeaway' },
      {
        type: 'paragraph',
        text: 'Black coffee is not inherently bad. Keep total caffeine in a sensible range, stop caffeine earlier in the day if sleep suffers, and switch to lower-acid methods (often cold brew or darker roast) or food with your cup if your stomach complains. If symptoms are severe or new, get personal medical advice rather than reverse-engineering Reddit threads.',
      },
    ],
    faqs: [
      {
        question: 'Is black coffee bad for you every day?',
        answer:
          'Daily black coffee at moderate caffeine levels is fine for most healthy adults and is even linked with some positive health associations. “Every day” becomes a problem when dose is very high, sleep collapses, anxiety spikes, or you have a medical reason to limit caffeine.',
      },
      {
        question: 'Does black coffee burn fat or help weight loss?',
        answer:
          'Caffeine can slightly raise alertness and short-term metabolism, and black coffee has almost no calories — useful if it replaces sugary drinks. It is not a fat-burning shortcut. Weight change still depends on overall diet and activity.',
      },
      {
        question: 'Is black coffee bad for your heart?',
        answer:
          'For most people, moderate coffee is not considered harmful to heart health and some studies associate it with lower cardiovascular risk. Palpitations, very high intake, or existing heart conditions are reasons to talk with a clinician rather than self-dose upward.',
      },
      {
        question: 'Is black coffee acidic and bad for teeth?',
        answer:
          'Coffee is acidic and can stain enamel over time. Rinse with water after drinking, wait before brushing right after acidic drinks, and keep sugar out of the cup. Acidity alone does not mean you must quit coffee.',
      },
      {
        question: 'How much black coffee is safe per day?',
        answer:
          'A common adult guideline is up to about 400 mg of caffeine daily — often three to four 8 oz cups, depending on brew strength. Use a caffeine calculator if you drink large cups, espresso, or cold brew, which can pack more milligrams than you expect.',
      },
    ],
  },
  {
    slug: 'is-coffee-good-for-you',
    topic: 'Health',
    title: 'Is Coffee Good for You? Evidence-Based Benefits (and Limits)',
    metaDescription:
      'Is coffee good for you? Evidence-based coffee health benefits — energy, antioxidants, diabetes and liver associations — plus caffeine limits and who should go easy.',
    excerpt:
      'Coffee can be part of a healthy routine for many adults — here is what the evidence actually supports, and what it does not.',
    readTime: '12 min',
    updated: '2026-10-29',
    image: '/images/roast-levels-hero.webp',
    intro:
      'People ask “is coffee good for you?” for the same reason they ask if it is bad: mixed headlines. The honest middle: coffee is a complex plant beverage with caffeine and polyphenols. For many healthy adults, moderate intake looks compatible with — and sometimes associated with — better long-term outcomes. It is not a superfood miracle, and more is not always better.',
    body: [
      { type: 'heading', text: 'Documented upsides people care about' },
      {
        type: 'list',
        items: [
          'Alertness and reaction time: caffeine blocks adenosine receptors; that is the reliable, short-term benefit.',
          'Antioxidant polyphenols: coffee is a major source of these compounds in many Western diets.',
          'Type 2 diabetes: many cohort studies link regular coffee with lower risk (correlation, not a prescription).',
          'Liver health markers: observational data often favor coffee drinkers for certain liver outcomes.',
          'Parkinson’s disease: caffeine intake has been associated with lower risk in multiple studies.',
          'Everyday performance: better focus for tasks that reward wakefulness — if you are not overdosed into jitters.',
        ],
      },
      { type: 'heading', text: 'What coffee does not magically do' },
      {
        type: 'paragraph',
        text: 'Coffee will not cancel a poor sleep schedule, replace vegetables, or detox your liver overnight. “Bulletproof”-style claims and extreme fasting-plus-espresso protocols are marketing more often than medicine. Benefits in studies usually reflect habitual moderate drinking inside an otherwise normal lifestyle.',
      },
      { type: 'heading', text: 'Brew style and additives change the picture' },
      {
        type: 'paragraph',
        text: 'Black filter coffee keeps calories minimal. Paper filters also trap some cafestol and kahweol (compounds in coffee oils that can raise LDL cholesterol in sensitive people). Unfiltered methods — French press, boiled coffee, some espresso — let more of those oils through. Milk and sugar are fine in moderation; syrup-heavy drinks behave more like dessert.',
      },
      {
        type: 'tip',
        text: 'If cholesterol is a concern and you drink a lot of unfiltered coffee, talk with your clinician — switching some cups to paper-filtered drip is a common practical tweak.',
      },
      { type: 'heading', text: 'How to get the upsides with fewer downsides' },
      {
        type: 'steps',
        items: [
          'Stay near or under ~400 mg caffeine/day unless advised otherwise.',
          'Stop caffeine 8+ hours before bed if sleep is fragile (or earlier if you are a slow metabolizer).',
          'Prefer quality beans and clean water — stale oily coffee tastes worse and invites bigger sugar “fixes.”',
          'Pair coffee with food if empty-stomach cups cause reflux or nausea.',
          'Use our caffeine and half-life tools to see how your real drinks add up across the day.',
        ],
      },
      { type: 'heading', text: 'What “moderate” looks like in real drinks' },
      {
        type: 'paragraph',
        text: 'Headlines that say “three cups” assume small home mugs. A 16 oz café drip can be two of those cups in one hand. Cold brew concentrate drunk straight can overshoot faster than espresso. The health associations in observational studies cluster around habitual, moderate caffeine — not a venti-plus-energy-drink stack.',
      },
      {
        type: 'table',
        caption: 'Same “two drinks” can be a safe day or a rough day.',
        headers: ['Pattern', 'Approx caffeine', 'How it usually feels'],
        rows: [
          ['Two 8 oz home drips', '~190 mg', 'Typical moderate day for many adults'],
          ['One 16 oz drip + a double espresso', '~300 mg+', 'Still under 400 mg for many, late timing matters'],
          ['Large cold brew + energy drink', 'often 400 mg+', 'Easy to overshoot sleep and jitters'],
        ],
      },
      { type: 'heading', text: 'Decaf, half-caf, and who benefits' },
      {
        type: 'paragraph',
        text: 'If the plant compounds are what you want and caffeine is the problem, decaf is the practical swap — not mushroom marketing by default. Half-caf (mix regular and decaf beans, or alternate cups) is how a lot of people keep the ritual past 2 p.m. Pregnant people and those with panic-prone caffeine responses should follow clinician limits, not internet cup counts.',
      },
      { type: 'heading', text: 'How to read coffee health news' },
      {
        type: 'list',
        items: [
          'Observational studies show associations, not “coffee caused this.” People who drink coffee also differ in smoking, exercise, and diet.',
          'Industry-funded and tiny studies get outsized headlines. Prefer large cohorts and reviews over a single mouse paper.',
          'Adding butter, MCT oil, or six pumps of syrup changes the drink you are studying.',
          'This page is general information, not medical advice or a reason to start drinking coffee if you hate it.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is coffee good for you every morning?',
        answer:
          'For many adults, a morning coffee habit is compatible with good health — especially if it replaces sugary sodas and does not wreck sleep. Morning timing is usually better than late-day caffeine for sleep quality.',
      },
      {
        question: 'Does coffee have antioxidants?',
        answer:
          'Yes. Coffee contains polyphenols that act as antioxidants in the diet. That is one reason researchers study coffee beyond caffeine alone.',
      },
      {
        question: 'Is decaf still healthy?',
        answer:
          'Decaf keeps many of the plant compounds with far less caffeine, so it can be a smart swap if caffeine bothers you. Decaf is not completely caffeine-free (often a few milligrams per cup).',
      },
      {
        question: 'How many cups of coffee a day is healthy?',
        answer:
          'Many adults do well at 2–4 typical cups, staying under roughly 400 mg of caffeine. Cup size and brew strength matter more than the number printed on the mug.',
      },
      {
        question: 'Is unfiltered coffee less healthy than drip?',
        answer:
          'Unfiltered methods let through more cafestol, which can raise LDL in some people who drink a lot of it. Paper-filtered drip traps more of those oils. If cholesterol is a concern, talk with a clinician rather than guessing from brew method alone.',
      },
      {
        question: 'Does adding milk cancel coffee’s benefits?',
        answer:
          'A splash of milk does not wipe out the drink. Large sugary milk drinks change calories and blood-sugar load more than they cancel polyphenols. Black vs latte is mostly a calorie and satiety question.',
      },
    ],
  },
  {
    slug: 'does-coffee-dehydrate-you',
    topic: 'Health',
    title: 'Does Coffee Dehydrate You? Caffeine, Fluid Balance & Myths',
    metaDescription:
      'Does coffee dehydrate you? Why moderate coffee still counts toward fluids, when caffeine’s mild diuretic effect matters, and how much water to drink with coffee.',
    excerpt:
      'Coffee is a mild diuretic, but your morning mug still contributes to hydration for most regular drinkers.',
    readTime: '10 min',
    updated: '2026-10-29',
    image: '/images/pour-over-hero.webp',
    intro:
      'The old advice — “coffee does not count as water” — is mostly outdated for people who drink coffee regularly. Caffeine has a mild diuretic effect, but the fluid in the cup usually more than offsets it at typical doses. Extreme intake, heat, alcohol, or illness change the math.',
    body: [
      { type: 'heading', text: 'What the science suggests' },
      {
        type: 'paragraph',
        text: 'Controlled studies find that moderate coffee intake hydrates similarly to water in habitual caffeine users. The body adapts; the dramatic “coffee empties you out” effect is overstated for 1–4 normal cups. Very high caffeine doses or people who rarely drink caffeine may notice more urine output.',
      },
      { type: 'heading', text: 'When dehydration risk is real' },
      {
        type: 'list',
        items: [
          'You rely on coffee alone during hard exercise or hot weather without extra water.',
          'You stack energy drinks, pre-workouts, and coffee into huge caffeine totals.',
          'You have vomiting, diarrhea, or fever — then prioritize oral rehydration, not espresso.',
          'You use coffee to skip meals and fluids all day.',
        ],
      },
      { type: 'heading', text: 'Practical hydration habits with coffee' },
      {
        type: 'steps',
        items: [
          'Count your coffee toward daily fluids, but still drink water across the day.',
          'Match large cold brew or multiple espresso sessions with extra water if your mouth feels dry or urine is very dark.',
          'After sweaty workouts, prioritize water or an electrolyte drink; coffee is optional, not your recovery plan.',
        ],
      },
      {
        type: 'tip',
        text: 'Dry mouth after coffee is often from caffeine plus bitter compounds and mouth breathing — not proof you are clinically dehydrated. Still, a glass of water beside the mug is an easy habit. Use the hydration calculator (height, weight, glasses so far) if you want a personal daily target — it is an estimate, not a lab test.',
      },
      { type: 'heading', text: 'Why the myth stuck' },
      {
        type: 'paragraph',
        text: 'Caffeine can increase urine output a little, especially in people who rarely use it. Older advice treated that as “coffee does not count.” Later controlled work on habitual drinkers found that moderate coffee hydrated about as well as water. Your kidneys adapt. A first-time 400 mg day on an empty stomach in the heat is not the same as your weekday two drips.',
      },
      { type: 'heading', text: 'Coffee vs water vs sports drink' },
      {
        type: 'table',
        caption: 'For a normal indoor day — not a marathon.',
        headers: ['Situation', 'What to drink'],
        rows: [
          ['Desk day, 1–3 coffees', 'Coffee counts; still sip water'],
          ['Long run / hot warehouse shift', 'Water or electrolytes first; coffee is extra'],
          ['Hangover / stomach bug', 'Oral rehydration; skip stacking espresso'],
          ['You only drank coffee since breakfast', 'Add water — coffee is fluid, not a full day’s plan'],
        ],
      },
      { type: 'heading', text: 'How much extra water with coffee?' },
      {
        type: 'paragraph',
        text: 'There is no law that every espresso needs a chaser glass. A useful default is: drink to thirst, keep urine pale straw, and if you have three large caffeinated drinks before noon, put a bottle on the desk. People who get headaches they blame on “coffee dehydration” are often also under-eating, hungover, or sleeping five hours.',
      },
      { type: 'heading', text: 'What actually dehydrates you faster' },
      {
        type: 'list',
        items: [
          'Alcohol (the real diuretic in the “coffee then wine” night).',
          'Heavy sweating without replacing fluids.',
          'High-sugar energy drinks on top of coffee in heat.',
          'Ignoring thirst because you are “only allowed water at meals.”',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does coffee dehydrate you?',
        answer:
          'Not in a meaningful way for most people drinking moderate amounts. Coffee provides fluid; caffeine’s diuretic effect is mild, especially if you drink coffee regularly.',
      },
      {
        question: 'Does coffee count as water intake?',
        answer:
          'Yes for hydration accounting in healthy adults at typical intakes. It should not be your only fluid if you are sweating heavily or sick.',
      },
      {
        question: 'Should I drink a glass of water with every coffee?',
        answer:
          'It is a good habit for comfort and overall fluid goals, but it is not required to “cancel” dehydration from a normal cup.',
      },
      {
        question: 'Does espresso dehydrate you more than drip?',
        answer:
          'Per ounce espresso is stronger in caffeine, but a single shot is a small volume of fluid. A large drip often has more total water and sometimes more total caffeine. Neither is a special dehydrator at normal doses.',
      },
      {
        question: 'How much water should I drink if I drink coffee?',
        answer:
          'Use a body-size target (about 30–35 ml fluid per kg, all drinks included) and count coffee toward it. The hydration calculator turns height, weight, and glasses so far into an estimate.',
      },
    ],
  },
  {
    slug: 'coffee-on-an-empty-stomach',
    topic: 'Health',
    title: 'Coffee on an Empty Stomach: What Happens & How to Soften It',
    metaDescription:
      'Is coffee on an empty stomach bad? Why some people get acid, jitters, or nausea, and simple fixes — food, roast, brew method, and timing.',
    excerpt:
      'Empty-stomach coffee is fine for many people and rough for others — here is why, and how to make mornings gentler.',
    readTime: '11 min',
    updated: '2026-10-29',
    image: '/images/espresso-hero.webp',
    intro:
      'Is coffee on an empty stomach bad? It depends on your gut, caffeine sensitivity, and brew. Coffee stimulates acid production and can relax the valve that keeps stomach contents down — so fasting cups amplify reflux or nausea for some people. Others drink espresso before breakfast for years with no issue. Treat symptoms as data, not a universal rule.',
    body: [
      { type: 'heading', text: 'What can happen on an empty stomach' },
      {
        type: 'list',
        items: [
          'Stronger awareness of caffeine (faster “hit,” sometimes more jitters).',
          'Heartburn or sour stomach if you are reflux-prone.',
          'Nausea, especially with large, hot, acidic light-roast cups.',
          'A louder cortisol-and-caffeine wake-up if you were already stressed or underslept.',
        ],
      },
      { type: 'heading', text: 'Ways to keep the ritual without the burn' },
      {
        type: 'steps',
        items: [
          'Eat a few bites of food first — yogurt, toast, banana, or leftover dinner all count.',
          'Try a darker roast or cold brew; many people find them easier than bright light-roast pour overs.',
          'Shrink the first cup; save the second for after breakfast.',
          'Avoid slamming espresso on a completely empty stomach if you already know reflux is your pattern.',
          'Skip adding lots of sugar on an empty stomach if that spikes energy then crashes you.',
        ],
      },
      {
        type: 'tip',
        text: 'If empty-stomach coffee reliably causes pain, vomiting, or black stools, stop experimenting online and see a clinician — that is beyond “tweak your roast.”',
      },
      { type: 'heading', text: 'Fasting and “bulletproof” coffee notes' },
      {
        type: 'paragraph',
        text: 'Black coffee is often allowed in intermittent fasting protocols because it has negligible calories, but fasting rules vary by goal (autophagy claims vs calorie window vs medical fasting). Butter or oil coffee breaks a fast by calories. If fasting makes acid worse, prioritize gut comfort over dogma.',
      },
      { type: 'heading', text: 'Why empty-stomach coffee hits harder' },
      {
        type: 'paragraph',
        text: 'With no food in the pipeline, caffeine absorbs a bit faster for some people, stomach acid has nothing to work on except the drink, and a bright light roast has more perceived acidity. Cortisol is already high in the early morning; stacking a huge cold brew on four hours of sleep can feel like panic even if the same drink is fine after eggs. None of this means coffee “destroys stomach lining” for everyone — that phrase is internet folklore.',
      },
      { type: 'heading', text: 'Brew methods that are often gentler' },
      {
        type: 'table',
        caption: 'Individual guts vary — this is a starting map, not a medical ranking.',
        headers: ['Method', 'Why it may feel easier', 'Watch-out'],
        rows: [
          ['Cold brew', 'Lower perceived acidity for many people', 'Can be very high caffeine if undiluted'],
          ['Darker drip / espresso with milk', 'Less bright acid, milk buffers', 'Milk drinks are not “empty stomach” if you care about fasting calories'],
          ['Small espresso after a few bites', 'Lower volume of acid', 'Still a stimulant hit'],
          ['Light-roast V60, huge mug, no food', 'Highest “sharp” risk for reflux-prone drinkers', 'Common morning mistake'],
        ],
      },
      { type: 'heading', text: 'A simple two-week test' },
      {
        type: 'steps',
        items: [
          'Week A: coffee after 150–300 calories of food (toast, yogurt, leftover rice).',
          'Week B: same coffee, same time, empty stomach.',
          'Note reflux, nausea, jitters, and 11 a.m. crash. Keep grind and dose identical.',
          'If week A is clearly better, stop arguing with influencers — eat first.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is it bad to drink coffee on an empty stomach?',
        answer:
          'Not automatically. Many people tolerate it. If you get reflux, nausea, or anxiety spikes, eat first or change brew strength and roast. Persistent pain deserves medical advice.',
      },
      {
        question: 'Does coffee on an empty stomach raise cortisol dangerously?',
        answer:
          'Caffeine can raise alertness hormones temporarily. For healthy adults that is usually a short-lived effect, not a proven long-term “adrenal crash.” If you feel wired-and-tired, fix sleep and dose before chasing hormone hacks.',
      },
      {
        question: 'What should I eat before coffee?',
        answer:
          'Anything gentle you actually eat: toast, oats, eggs, yogurt, or fruit. The goal is a little buffer, not a perfect macro meal.',
      },
      {
        question: 'Does cold brew hurt less on an empty stomach?',
        answer:
          'Many people find cold brew less sharp because it extracts fewer acids. It can still carry a lot of caffeine. If reflux is your issue, it may help; if jitters are the issue, watch the milligrams.',
      },
      {
        question: 'Can I drink coffee while intermittent fasting?',
        answer:
          'Black coffee is usually allowed in calorie-window fasting. If it wrecks your stomach, the protocol is not worth the pain. Cream, butter, and protein powder break a fast by calories.',
      },
    ],
  },
  {
    slug: 'how-much-coffee-is-too-much',
    topic: 'Health',
    title: 'How Much Coffee Is Too Much? Daily Limits by Situation',
    metaDescription:
      'How much coffee is too much? Adult 400 mg caffeine guideline, pregnancy limits, signs you are overdoing it, and how large cups and cold brew change the count.',
    excerpt:
      'Cup counts lie — milligrams matter. Here is how to tell when coffee intake is too high for you.',
    readTime: '12 min',
    updated: '2026-10-29',
    image: '/images/french-press-hero.webp',
    intro:
      '“How much coffee is too much?” cannot be answered with a single mug count. An 8 oz home drip and a 20 oz café cold brew are different drugs in different costumes. Use caffeine milligrams, your symptoms, and your life stage — then adjust.',
    body: [
      { type: 'heading', text: 'Common adult guideline' },
      {
        type: 'paragraph',
        text: 'Health authorities often cite up to about 400 mg of caffeine per day for healthy adults as a amount not generally associated with negative effects. That is roughly four 8 oz brewed coffees at ~95 mg each — or fewer drinks if they are large, espresso-heavy, or cold-brew strong.',
      },
      {
        type: 'table',
        caption: 'Rough caffeine math (averages vary by brand and recipe).',
        headers: ['Drink', 'Typical serving', 'Approx caffeine'],
        rows: [
          ['Brewed drip', '8 oz', '95 mg'],
          ['Large drip', '16 oz', '190 mg'],
          ['Espresso', '1 shot', '63 mg'],
          ['Cold brew', '8 oz', '100–200 mg'],
          ['Energy drink', '16 oz', '150–300 mg'],
        ],
      },
      { type: 'heading', text: 'Signs you may be over your personal limit' },
      {
        type: 'list',
        items: [
          'Insomnia or 3 a.m. wake-ups after afternoon coffee',
          'Restlessness, tremor, or racing heart',
          'Worsening anxiety or panic feelings',
          'Stomach pain, reflux flares, or lost appetite',
          'Needing ever-larger doses just to feel normal',
          'Headaches on days you skip coffee (tolerance/withdrawal cycle)',
        ],
      },
      { type: 'heading', text: 'Special situations' },
      {
        type: 'list',
        items: [
          'Pregnancy: many guidelines suggest around 200 mg caffeine/day or less — confirm with your obstetric provider.',
          'Teens: lower body weight → lower budget; energy drinks plus coffee add up fast.',
          'Slow caffeine metabolizers (genetics, some medications): the same cup lasts longer — earlier cutoffs help.',
          'Heart rhythm issues or severe anxiety: get individualized advice; online averages are not enough.',
        ],
      },
      { type: 'heading', text: 'How to cut back without misery' },
      {
        type: 'steps',
        items: [
          'Swap one regular cup for half-caf or decaf each week.',
          'Shrink cup size before cutting cup count.',
          'Move the last caffeinated drink earlier by 60–90 minutes.',
          'Use our caffeine calculator to map your real week, not your aspirational “two small cups.”',
        ],
      },
      { type: 'heading', text: 'Cup size is the trap' },
      {
        type: 'paragraph',
        text: '“I only have two coffees” is how people hide a 400 mg morning. Home mugs, café “mediums,” and travel tumblers are not standardized. Weigh or read caffeine posts when you can. If you use our caffeine calculator, log the actual drink size — 8 oz vs 16 oz doubles drip milligrams.',
      },
      { type: 'heading', text: 'Tolerance is not the same as safety' },
      {
        type: 'paragraph',
        text: 'You can feel “fine” on 500 mg because you are used to it and still sleep poorly, grind your teeth, or live on antacids. Feeling wired is a late signal. Sleep quality, resting heart rate, and afternoon anxiety are earlier ones. Cutting 20% for two weeks is a better experiment than quitting cold turkey and declaring coffee evil when withdrawal hits.',
      },
      { type: 'heading', text: 'Stacking coffee with other caffeine' },
      {
        type: 'list',
        items: [
          'Pre-workout, energy drinks, caffeine pills, and strong tea all count toward the same 400 mg ballpark.',
          'Chocolate and some pain relievers add a little; they rarely matter until you are already near the line.',
          'Decaf plus three energy drinks is still a caffeine problem.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How much coffee is too much in a day?',
        answer:
          'For many healthy adults, regularly exceeding about 400 mg of caffeine is a practical “too much” line — sooner if you get sleep loss, jitters, or reflux. Count milligrams, not just mugs.',
      },
      {
        question: 'Is 3 cups of coffee a day too much?',
        answer:
          'Three 8 oz cups are often fine (~285 mg). Three large café drinks might blow past 400 mg. Size and brew method decide.',
      },
      {
        question: 'Is 6 cups of coffee a day too much?',
        answer:
          'Often yes for caffeine — six typical drip cups can land near or above 500–600 mg. Some people tolerate it; many pay in sleep and anxiety. Track symptoms and total mg.',
      },
      {
        question: 'Can you overdose on coffee?',
        answer:
          'Caffeine overdose is possible at very high intakes (especially powders and energy products). Classic coffee cups make extreme overdose harder but not impossible when combined with other stimulants. Severe symptoms need emergency care.',
      },
      {
        question: 'Is 200 mg of caffeine a day too much?',
        answer:
          'For most healthy adults, 200 mg is a moderate day — about two 8 oz drips. It is a common pregnancy-related cap; if you are pregnant, follow your obstetric clinician, not a general adult 400 mg line.',
      },
      {
        question: 'How do I know my personal caffeine limit?',
        answer:
          'Track milligrams, sleep, and jitters for a week. The useful limit is the highest intake that still lets you sleep and stay calm — which may be well under 400 mg.',
      },
    ],
  },
  {
    slug: 'coffee-and-anxiety',
    topic: 'Health',
    title: 'Coffee and Anxiety: Why Caffeine Can Spike Nerves (and What Helps)',
    metaDescription:
      'Does coffee cause anxiety? How caffeine mimics panic symptoms, who is most sensitive, and practical ways to keep coffee without the jitters.',
    excerpt:
      'Caffeine can mimic anxiety symptoms — here is how to tell the difference and dial coffee back without quitting cold turkey.',
    readTime: '11 min',
    updated: '2026-10-29',
    image: '/images/cold-brew-hero.webp',
    intro:
      'Does coffee cause anxiety? It can trigger or amplify anxious feelings in sensitive people because caffeine raises heart rate, sharpens alertness, and can cause tremor — the same body signals many brains read as danger. That does not mean coffee “creates” an anxiety disorder by itself, but it is a common and fixable aggravator.',
    body: [
      { type: 'heading', text: 'Why coffee can feel like anxiety' },
      {
        type: 'paragraph',
        text: 'Caffeine blocks adenosine (sleepiness) and increases catecholamine signaling. Result: more awake, sometimes more wired. If you already run hot on stress, a double espresso on no sleep is rocket fuel. Panic attacks and caffeine overstimulation can feel similar (racing heart, chest tightness, restlessness), which is why clinicians often ask about caffeine intake.',
      },
      { type: 'heading', text: 'Who notices it most' },
      {
        type: 'list',
        items: [
          'People with anxiety or panic disorders',
          'Slow caffeine metabolizers',
          'Anyone stacking coffee with energy drinks or pre-workout',
          'New or returning drinkers with low tolerance',
          'People drinking coffee late while sleep-deprived',
        ],
      },
      { type: 'heading', text: 'Practical dials that help' },
      {
        type: 'steps',
        items: [
          'Cap daily caffeine and spread it — two smaller cups beat one massive cold brew for some people.',
          'Eat with coffee; empty-stomach hits feel sharper.',
          'Switch the afternoon cup to half-caf or decaf.',
          'Try a lower-caffeine method day (smaller espresso drink vs huge drip).',
          'Protect sleep; anxiety and caffeine interact viciously when you are exhausted.',
          'If cutting back, taper over 1–2 weeks to reduce withdrawal headaches.',
        ],
      },
      {
        type: 'tip',
        text: 'Track one week: note coffee timing, approximate mg, sleep, and anxiety peaks. Patterns jump out faster than guessing.',
      },
      { type: 'heading', text: 'When to get help beyond coffee tweaks' },
      {
        type: 'paragraph',
        text: 'If anxiety is constant, panic attacks are frequent, or cutting caffeine does nothing, treat that as a mental-health and medical issue — not a brewing problem. Coffee adjustments are a lever, not therapy or medication.',
      },
      { type: 'heading', text: 'Caffeine anxiety vs a panic attack' },
      {
        type: 'paragraph',
        text: 'Caffeine overstimulation often peaks 30–90 minutes after a big dose: shaky hands, restlessness, “I need to walk it off.” Panic can include fear of dying, going crazy, or losing control, and it can happen with little caffeine. They overlap in the body. If cutting caffeine for two weeks barely changes attacks, you are not looking at a brewing problem.',
      },
      { type: 'heading', text: 'A taper that usually beats cold turkey' },
      {
        type: 'steps',
        items: [
          'Write down every caffeinated drink for three days (size, not “a coffee”).',
          'Cut about 25% — smaller cups or one drink swapped to half-caf.',
          'Hold that for four to five days so withdrawal headaches settle.',
          'Repeat until mornings feel alert without the chest-tight first hour.',
          'Keep one enjoyable cup if you want the ritual; anxiety care can coexist with coffee.',
        ],
      },
      { type: 'heading', text: 'Brewing choices that often feel calmer' },
      {
        type: 'list',
        items: [
          'Paper-filtered drip instead of a huge unfiltered concentrate.',
          'Smaller espresso drinks rather than a 20 oz cold brew.',
          'Food first; see the empty-stomach guide.',
          'Last caffeine before mid-afternoon if sleep is fragile — poor sleep feeds anxiety tomorrow.',
        ],
      },
      { type: 'heading', text: 'When coffee is not the main story' },
      {
        type: 'paragraph',
        text: 'Nicotine, skipped meals, hanging over, thyroid issues, and some medications mimic or amplify the same shaky feeling. If you already drink one small morning coffee and still have daily panic, shrinking the cup will not be enough. Mention caffeine to a clinician so they do not assume you drink six energy drinks — and so they do not ignore a real anxiety disorder because you also like espresso.',
      },
      {
        type: 'tip',
        text: 'Do not use more coffee to “push through” an anxious morning. That is how a 95 mg drip becomes a 300 mg spiral. Walk, water, food, then decide if you even want the second cup.',
      },
    ],
    faqs: [
      {
        question: 'Does coffee cause anxiety?',
        answer:
          'Caffeine can cause anxious symptoms or worsen existing anxiety, especially at high doses. It is a common trigger, but lasting anxiety disorders have broader causes and deserve proper care.',
      },
      {
        question: 'Can decaf still make you anxious?',
        answer:
          'Usually much less, because caffeine is the main driver. Decaf still has a little caffeine and the ritual can feel stimulating, but most people sensitive to coffee tolerate decaf far better.',
      },
      {
        question: 'How long until caffeine anxiety wears off?',
        answer:
          'Caffeine’s half-life is about 5–6 hours for many adults, so a big dose can affect you for much of the day. Our caffeine half-life calculator estimates when levels drop.',
      },
      {
        question: 'Should I quit coffee if I have anxiety?',
        answer:
          'Not automatically. Many people do better with a lower dose and earlier cutoff. If panic is frequent, get proper care and mention caffeine so your clinician can factor it in.',
      },
      {
        question: 'Is cold brew better for anxiety than espresso?',
        answer:
          'Not if the milligrams are higher. Cold brew can be calmer in acidity but worse in total caffeine. Compare serving size, not the word “cold.”',
      },
    ],
  },
  {
    slug: 'best-decaf-coffee',
    topic: 'Decaf',
    title: 'Best Decaf Coffee 2026 — How to Buy Decaf That Still Tastes Like Coffee',
    metaDescription:
      'Best decaf coffee 2026: Swiss Water vs chemical process, how much caffeine is left, brewing tips, and a water-processed Peet’s Major Dickason’s pick that actually tastes bold.',
    excerpt:
      'Decaf does not have to taste like brown water. How processing works, what “good decaf” means, and a dark-roast pick worth buying.',
    readTime: '12 min',
    updated: '2026-11-10',
    image: '/images/roast-levels-hero.webp',
    quickAnswer:
      'Good decaf starts with quality beans and a gentle decaf process (Swiss Water / water process preferred by many specialty buyers), then a roast that still has body. Expect about 2–15 mg caffeine per 8 oz cup — not zero — and brew it like real coffee with a scale and fresh grind when you can.',
    intro:
      'Plenty of people search “best decaf coffee” after a bad bag taught them the wrong lesson: that decaf means thin, papery, and pointless. That is usually bad green coffee or an old roast — not an iron law of chemistry. Modern water-processed decafs can taste rich and chocolatey; you just have to buy and brew them with the same standards you use for regular beans.',
    body: [
      { type: 'heading', text: 'What “good decaf” actually means' },
      {
        type: 'paragraph',
        text: 'Decaffeination removes most caffeine from green coffee before roasting. The cup still depends on origin, roast development, freshness, and brew method. If a roaster starts with mediocre beans, stripping caffeine will not invent sweetness. Look for: a named process (Swiss Water or other water process is a common preference), a roast date or at least a clear brand with high turnover, and tasting notes that sound like coffee — chocolate, nut, caramel — not apologetic marketing.',
      },
      { type: 'heading', text: 'How much caffeine is left in decaf?' },
      {
        type: 'paragraph',
        text: 'Decaf is not caffeine-free. An 8 oz cup of decaf often lands around 2–15 mg of caffeine, versus roughly 70–140+ mg for many regular brewed coffees depending on strength. Sensitive people can still notice stacked afternoon decafs, chocolate, and tea. If sleep is the goal, treat decaf as “very low,” not “safe to pound at 10 p.m. with no math.” Our caffeine calculator has a decaf preset for a conservative daily total.',
      },
      {
        type: 'list',
        items: [
          'Regulations generally require decaf to have most caffeine removed — not every milligram.',
          'Darker roasts do not “remove more caffeine” in a meaningful way; process does the heavy lifting.',
          'Espresso-sized decaf shots are small volume but can still add up across a milk-drink habit.',
        ],
      },
      { type: 'heading', text: 'Swiss Water / water process vs solvent process' },
      {
        type: 'paragraph',
        text: 'Broadly, caffeine can be removed with water-based methods (often marketed as Swiss Water Process) or with solvent-assisted methods. Many specialty buyers prefer water process for flavor and marketing clarity. Solvent-processed coffees can still taste excellent when the green coffee and roast are strong — do not panic at the word “process,” but do read the bag if you have a preference. Peet’s highlights natural water processing on its decaf Major Dickason’s line; Kicking Horse and others also sell Swiss Water dark decafs if you want whole-bean organic options.',
      },
      { type: 'heading', text: 'Why so much decaf tastes bad (and how to avoid it)' },
      {
        type: 'list',
        items: [
          'Stale stock: low-turnover grocery decaf can sit forever. Prefer brands that sell quickly or show roast dating.',
          'Under-dosing: people brew decaf weaker “because it is evening.” Use a normal ratio; weakness tastes papery.',
          'Wrong grind: pre-ground is convenient but ages fast. Whole bean + burr grinder still wins for aroma.',
          'Expecting light-roast fireworks: many crowd-pleasing decafs are medium-dark for body. That is a feature for evening cups.',
        ],
      },
      { type: 'heading', text: 'Our Amazon pick for bold decaf' },
      {
        type: 'paragraph',
        text: 'Peet’s Decaf Major Dickason’s Blend is the practical recommendation for people who want dark-roast body without the caffeine load of regular Major D. It is water-processed, widely available, and tastes like a real dinner coffee rather than a compromise. The listing we link is ground (handy for drip); if you own a grinder, also check for whole-bean decaf versions when stock allows — grind freshness still matters.',
      },
      {
        type: 'tip',
        text: 'Brew decaf at a normal 1:15–1:17 filter ratio. If it tastes hollow, grind a bit finer or raise dose before you assume “all decaf is bad.”',
      },
      { type: 'heading', text: 'Who should switch to decaf (or half-caf)' },
      {
        type: 'paragraph',
        text: 'Afternoon anxiety, fragile sleep, pregnancy limits from a clinician, reflux that worsens with caffeine, or a simple desire to keep the ritual after your cutoff time. Half-caf (mix regular and decaf beans, or alternate cups) is often easier than quitting cold turkey. Pair evening decaf with the caffeine tracker so your morning regular cups still leave room under your bedtime target.',
      },
      { type: 'heading', text: 'Brewing tips by method' },
      {
        type: 'list',
        items: [
          'Drip / pour over: same recipe as regular medium-dark coffee; filtered water; do not starve the dose.',
          'French press: coarse grind, 1:15, full immersion — dark decaf shines here.',
          'Espresso: dial like regular; expect slightly different behavior bag to bag. Weigh dose and yield.',
          'Moka pot: medium-fine, fill the basket level — chocolate-forward decafs work well.',
        ],
      },
      {
        type: 'paragraph',
        text: 'This is general coffee education, not medical advice. Caffeine sensitivity and pregnancy guidelines belong in a conversation with your clinician — especially if you are using decaf to manage symptoms.',
      },
    ],
    faqs: [
      {
        question: 'What is the best decaf coffee?',
        answer:
          'The best decaf starts with good beans and a clear process (many people prefer Swiss Water / water process), then a roast with real body. Peet’s Decaf Major Dickason’s is a strong widely available dark-roast option; specialty water-process bags from local roasters can be even better when fresh.',
      },
      {
        question: 'Does decaf coffee have caffeine?',
        answer:
          'Yes. Decaf usually has about 2–15 mg per 8 oz cup — far less than regular coffee, but not zero. Sensitive sleepers should still count stacked cups.',
      },
      {
        question: 'Is Swiss Water Process decaf better?',
        answer:
          'Many specialty buyers prefer water-based processes for flavor and labeling clarity. Excellent cups exist from other processes too — freshness and roast quality matter as much as the method name on the bag.',
      },
      {
        question: 'Why does my decaf taste weak or papery?',
        answer:
          'Often stale beans, too little dose, or too coarse a grind. Brew decaf with a normal coffee-to-water ratio and buy fresher bags. Darker, chocolate-forward decafs also hide thinness better than pale, underdeveloped ones.',
      },
      {
        question: 'Can I drink decaf at night?',
        answer:
          'Most people can, because the caffeine load is low. If you are extremely sensitive, keep the last cup earlier or switch to herbal tea — a little caffeine plus the warm ritual can still feel stimulating.',
      },
      {
        question: 'Is decaf healthier than regular coffee?',
        answer:
          'Not automatically. You lose most of the caffeine stimulation (good or bad depending on your goals) while keeping many of coffee’s plant compounds. For sleep and anxiety, lower caffeine often helps; for athletic alertness, regular coffee may be the point. This is not medical advice.',
      },
    ],
  },
  ...TRENDING_BEAN_ARTICLES,
]

/* ----------------------------- Tools & calculators ----------------------------- */

export type ToolMeta = {
  slug: string
  name: string
  title: string
  metaDescription: string
  excerpt: string
  /** lucide-react icon name */
  icon:
    | 'Scale'
    | 'Timer'
    | 'Snowflake'
    | 'Coffee'
    | 'Zap'
    | 'Ruler'
    | 'Beaker'
    | 'Droplets'
  category: 'Calculator' | 'Timer' | 'Reference'
  keywords: string[]
  faqs: FaqItem[]
}

export const TOOLS: ToolMeta[] = [
  {
    slug: 'coffee-ratio-calculator',
    name: 'Coffee Ratio Calculator',
    title: 'Coffee to Water Ratio Chart & Calculator — Golden Ratio',
    metaDescription:
      'Golden ratio coffee (~1:16) calculator with V60, French press, AeroPress, and batch-brew presets. Printable coffee to water ratio chart + grind chart link.',
    excerpt:
      'Method presets snap the ratio slider. Printable coffee-to-water chart, plus grind links for ratio + grind dial-in.',
    icon: 'Scale',
    category: 'Calculator',
    keywords: [
      'golden ratio coffee',
      'coffee to water ratio chart',
      'coffee to water ratio',
      'coffee ratio calculator',
      'how much coffee per cup',
      'how much coffee for 2 cups',
      '1:16 coffee ratio',
      'v60 coffee ratio',
      'french press coffee ratio',
    ],
    faqs: [
      {
        question: 'What is the golden ratio for coffee?',
        answer:
          'The “golden ratio” is roughly 1:15 to 1:18 — one gram of coffee for every 15 to 18 grams of water. A 1:16 ratio (about 62 g per liter) is the most popular all-purpose starting point. Tap V60 / pour over above to snap the slider to 1:16.',
      },
      {
        question: 'Where is the coffee to water ratio chart?',
        answer:
          'Use the printable method chart on this page — V60, Chemex, French press, AeroPress, batch drip, cold brew, and espresso starting ratios with coffee per 250 ml and grind cues. Hit Print chart to save a copy.',
      },
      {
        question: 'How much coffee do I use per cup?',
        answer:
          'A standard mug is about 250 ml (250 g) of water. At a 1:16 ratio that is roughly 15–16 g of coffee, or about 2 slightly rounded tablespoons of whole beans.',
      },
      {
        question: 'How much coffee for 2 cups?',
        answer:
          'For two 250 ml mugs (500 g water) at 1:16, use about 31 g of coffee. At 1:15 (stronger), use about 33 g. Weigh both coffee and water when you can — “cups” on machines are often only 5 oz.',
      },
      {
        question: 'What ratio should I use for French press vs pour over?',
        answer:
          'Pour over / V60: 1:16–1:17. French press: often 1:15. AeroPress: commonly 1:12–1:15. Batch drip: ~1:16–1:17. Use the method presets to snap the slider, then open the grind chart so ratio and grind move together.',
      },
      {
        question: 'Is coffee ratio by weight or volume?',
        answer:
          'By weight. “1:16” means 1 gram of coffee to 16 grams of water (1 ml of water ≈ 1 g). Tablespoons are only an approximation because roast level and grind change how densely coffee packs.',
      },
      {
        question: 'Why does my coffee taste weak even at 1:16?',
        answer:
          'Weak flavor is often under-extraction, not only ratio — grind too coarse, water too cool, or brew time too short. Try grinding a bit finer (see the grind size chart) before dropping to 1:15.',
      },
    ],
  },
  {
    slug: 'drip-coffee-calculator',
    name: 'Drip Coffee Calculator',
    title: 'Drip Coffee Calculator — 12-Cup Maker, Scoops & Carafe Presets',
    metaDescription:
      'How much coffee for a 12 cup coffee maker? Custom water ml/L, Mr. Coffee & Cuisinart carafe presets, coffee scoops per pot, and drip too-weak troubleshooting.',
    excerpt:
      'Cup count or custom carafe water, Mr. Coffee / Cuisinart full-carafe presets, scoops per pot, and weak/strong fixes.',
    icon: 'Scale',
    category: 'Calculator',
    keywords: [
      'how much coffee for 12 cup coffee maker',
      'coffee scoops per pot',
      'drip coffee too weak',
      'drip coffee calculator',
      'how much coffee for 12 cups',
      'how much coffee for 8 cups',
      'mr coffee ratio',
      'cuisinart coffee maker ratio',
      'drip coffee ratio',
    ],
    faqs: [
      {
        question: 'How much coffee for a 12 cup coffee maker?',
        answer:
          'For a standard 12-cup maker (5 oz machine cups, ~1.77 L water), start around 107 g of coffee at 1:16.5 — about 11 level scoops or 20 tablespoons. Tap 12 cups or the Mr. Coffee 12-cup carafe preset above.',
      },
      {
        question: 'How many coffee scoops per pot?',
        answer:
          'At standard strength: ~3.5 scoops for 4 cups, ~7 for 8 cups, ~9 for 10 cups, ~11 for 12 cups (level ~10 g scoops). See the pot-size table on this page — “one scoop per cup” assumes tiny machine cups, not mugs.',
      },
      {
        question: 'Why is my drip coffee too weak?',
        answer:
          'Usually under-dosing or grind too coarse. Switch to Strong (1:15.5), add ~10% more coffee, or grind a notch finer. Confirm you are not treating 12 machine cups as 12 full mugs. Descale if every pot tastes flat.',
      },
      {
        question: 'How much coffee for 8 cups in a coffee maker?',
        answer:
          'For 8 machine cups, about 71–75 g coffee with ~1.2 L water. Prefer a stronger pot? Use the Strong preset or the custom water field.',
      },
      {
        question: 'What is the best drip coffee ratio?',
        answer:
          '1:16 to 1:17 for most machines. This calculator’s Standard is 1:16.5; Light 1:17.5; Strong 1:15.5.',
      },
      {
        question: 'Why does a coffee maker cup not equal a normal mug?',
        answer:
          'Most makers define one cup as 5 ounces, not 8. That is why a “12-cup” carafe is closer to 6–8 mugs. Use cup mode or carafe/ml mode accordingly.',
      },
      {
        question: 'How many tablespoons of coffee for 12 cups?',
        answer:
          'About 20–21 tablespoons (~106–113 g) at standard strength. Grams are more reliable when you can weigh.',
      },
    ],
  },
  {
    slug: 'french-press-calculator',
    name: 'French Press Calculator',
    title: 'French Press Calculator — 67 g per Liter (1:15) + 4-Min Timer',
    metaDescription:
      'French press coffee ratio grams per liter: 67 g/L at 1:15. How much coffee for 1 liter / cafetière, 4-min steep timer, bloom option, muddy-cup fixes.',
    excerpt:
      '67 g coffee per liter (1:15) — size any French press / cafetière, then run the 4-minute steep timer.',
    icon: 'Coffee',
    category: 'Calculator',
    keywords: [
      'french press coffee ratio grams per liter',
      '67g per liter french press',
      'french press 1 liter how much coffee',
      'cafetiere ratio',
      'french press muddy',
      'french press coffee ratio',
      'french press ratio',
      'french press calculator',
      'cafetiere coffee ratio',
      'how much coffee for french press',
      '1 litre french press',
      'french press steep time',
    ],
    faqs: [
      {
        question: 'What is the French press coffee ratio in grams per liter?',
        answer:
          'Classic French press is about 67 grams of coffee per liter of water (1:15 by weight). That is ~17 g per 250 ml mug. Use 1:14 (~71 g/L) for stronger or 1:16 (~63 g/L) for milder.',
      },
      {
        question: 'What is the best French press coffee ratio?',
        answer:
          'A 1:15 coffee-to-water ratio is the classic French press starting point — about 67 grams of coffee per liter of water. Use 1:14 for a stronger cup or 1:16 for something lighter and more tea-like.',
      },
      {
        question: 'French press 1 liter — how much coffee?',
        answer:
          'For a 1 L / 8-cup French press at 1:15, use about 67 g of coarse coffee (~12–13 tablespoons or 6–7 scoops). Tap the 8-cup / 1 L preset above for grams by strength.',
      },
      {
        question: 'How much coffee for 1 cup French press?',
        answer:
          'For one 250 ml mug at 1:15, use about 17 g of coarse coffee (~3 tablespoons). That is the simplest “french press coffee ratio per cup” starting point.',
      },
      {
        question: 'How much coffee for 2 cups French press?',
        answer:
          'For two mugs (500 g water) at 1:15, use about 33 g of coffee (~6 tablespoons or 3 scoops). At mild 1:16 use ~31 g; at strong 1:14 use ~36 g.',
      },
      {
        question: 'What is the cafetière ratio?',
        answer:
          'Cafetière is another name for French press. Use the same 1:15 coffee-to-water ratio (67 g per litre), coarse grind, and about a 4-minute steep — use the built-in timer for the plunge reminder.',
      },
      {
        question: 'What grind size and steep time for French press?',
        answer:
          'Use a coarse grind (like sea salt) and steep for about 4 minutes. Optional: bloom 30 seconds with ~2× the dose in water, then fill and steep. Too fine → bitter and muddy. See the grind size chart (French press filter).',
      },
      {
        question: 'Why is my French press muddy or full of sludge?',
        answer:
          'Muddy / sludge cups usually mean the grind is too fine, you plunged too hard (forcing fines through the mesh), or you left coffee sitting on the grounds. Grind coarser, press gently, and decant immediately. Open the grind size chart for the French press row, or strain once through a fine mesh if you hate sediment.',
      },
      {
        question: 'Is French press coffee stronger than drip?',
        answer:
          'It often tastes stronger because the metal filter lets oils through and many people brew French press at a slightly stronger ratio (1:15 vs 1:16–1:17 for drip). Caffeine per ounce is similar if the dose is similar — body and mouthfeel are what feel “stronger.”',
      },
    ],
  },
  {
    slug: 'iced-coffee-calculator',
    name: 'Iced Coffee Calculator',
    title: 'Japanese Iced Coffee Ratio — Flash Brew vs Cold Brew Calculator',
    metaDescription:
      'Japanese iced coffee ratio & flash brew vs cold brew: custom glass ml/oz, iced latte from concentrate with milk volume, and fixes when ice melts too fast.',
    excerpt:
      'Flash brew, chill, or concentrate — custom glass sizes, optional milk for iced latte mode, and recipe links for latte / shaken espresso.',
    icon: 'Snowflake',
    category: 'Calculator',
    keywords: [
      'japanese iced coffee ratio',
      'flash brew vs cold brew',
      'iced coffee melting too fast',
      'how to make iced coffee',
      'japanese iced coffee',
      'iced drip coffee ratio',
      'flash brew coffee',
      'iced latte from concentrate',
    ],
    faqs: [
      {
        question: 'What is the Japanese iced coffee ratio?',
        answer:
          'Think in final drink weight. A common flash-brew approach uses about a 1:10 coffee-to-final-drink ratio with ~40% of the glass as ice and the rest as hot brew water. Pick Japanese iced above and set your glass (including custom ml/oz) for exact grams.',
      },
      {
        question: 'Flash brew vs cold brew — what’s the difference?',
        answer:
          'Flash brew (Japanese iced) is hot extraction onto ice — bright and aromatic in minutes. Cold brew is a long cold steep (usually 12–18 hours) — smoother and lower-acid. They are not interchangeable recipes; use this calculator for flash/iced styles and the cold brew calculator for overnight concentrate.',
      },
      {
        question: 'Why is my iced coffee melting too fast / tasting watery?',
        answer:
          'Ice melted before you drank it, or you used leftover hot coffee without accounting for dilution. Pre-chill the glass, use larger cubes, brew stronger (Japanese or concentrate mode), or switch to iced-latte-from-concentrate and set milk so coffee+ice still has enough strength. Don’t pour a 1:16 hot brew straight over a full glass of ice.',
      },
      {
        question: 'How do you make iced coffee?',
        answer:
          'Brightest: Japanese iced (flash brew onto weighed ice). Convenient: brew hot at 1:16 and chill. Milk drinks: concentrate or iced-latte mode with a milk volume. Overnight cold brew is a separate method.',
      },
      {
        question: 'Can I make an iced latte from concentrate?',
        answer:
          'Yes — choose “Iced latte from concentrate,” set glass size and milk volume, then brew the listed coffee/water onto the ice and top with cold milk. Pair with our iced latte or shaken espresso recipes for café-style builds.',
      },
      {
        question: 'Is iced coffee the same as cold brew?',
        answer:
          'No. Iced coffee is usually hot-brewed then cooled (or flash-brewed onto ice). Cold brew steeps coarse grounds in cold water for 12–18 hours.',
      },
    ],
  },
  {
    slug: 'brew-timer',
    name: 'Pour Over Brew Timer',
    title: 'Pour Over Brew Timer — V60, Chemex, Kalita & Switch',
    metaDescription:
      'Free V60 brew timer with Chemex, Kalita Wave, and Switch profiles. Guided bloom & 3-pour schedule, optional beep on phase change, and water temp notes.',
    excerpt:
      'Guided pour-over timer with V60, Chemex, Kalita, and Switch profiles — bloom prompts, target weights, and optional phase beeps.',
    icon: 'Timer',
    category: 'Timer',
    keywords: [
      'v60 brew timer',
      'pour over bloom time',
      '3 pour v60 recipe',
      'pour over timer',
      'chemex brew timer',
      'kalita wave timer',
      'coffee bloom timer',
    ],
    faqs: [
      {
        question: 'How long should a pour over take?',
        answer:
          'A single-cup V60 usually finishes between 2:30 and 3:30 total, including a 30–45 second bloom. Chemex often runs longer because of thicker filters. If it drains much faster grind finer; much slower, grind coarser.',
      },
      {
        question: 'What is a 3 pour V60 recipe?',
        answer:
          'A classic 3-pour V60 is bloom + two main pours: wet the bed (~2× dose), wait 30–45 seconds, pour to about 60% of total water, then top up to full weight and let it draw down. Pick the V60 (3 pour) profile in the timer for live targets.',
      },
      {
        question: 'What is the bloom?',
        answer:
          'The bloom is the first small pour that wets all the grounds and lets trapped CO₂ escape for 30–45 seconds. It leads to a more even extraction and a sweeter cup.',
      },
      {
        question: 'How long should I bloom coffee? (pour over bloom time)',
        answer:
          'Bloom for 30–45 seconds with about 2–3× the coffee dose in water (for 20 g coffee, pour 40–60 g). Fresh light roasts often bloom vigorously and benefit from the full 45 seconds.',
      },
      {
        question: 'What water temperature for pour over?',
        answer:
          'Use about 93–96°C (200–205°F) for most light and medium roasts. Darker roasts can taste cleaner a bit cooler, around 88–92°C. Each profile in the timer shows a water temp note — Chemex and Switch often sit in a similar range.',
      },
      {
        question: 'Why is my pour over bitter?',
        answer:
          'Bitterness usually means over-extraction: grind too fine, pours too slow, or water too hot. Grind coarser by a click or two, keep total brew time under ~3:30 on V60, and avoid drowning the bed with aggressive pours.',
      },
      {
        question: 'Why is my pour over sour?',
        answer:
          'Sourness usually means under-extraction: grind too coarse, water too cool, or the brew finishes too fast. Grind finer, keep water near 93–96°C, and aim for a full bloom plus enough contact time. A bitter-vs-sour taste checklist pairs well with the grind size chart.',
      },
      {
        question: 'Chemex vs V60 vs Kalita vs Switch — which timer profile?',
        answer:
          'V60 is conical and fast (classic 3 pour). Chemex is slower and cleaner with thick paper. Kalita Wave is flatter and more forgiving. Hario Switch adds immersion — bloom/steep with the valve closed, then open to drain. Pick the matching profile so pour timing matches the dripper.',
      },
    ],
  },
  {
    slug: 'cold-brew-calculator',
    name: 'Cold Brew Calculator',
    title: 'Cold Brew Concentrate Ratio — Dilute, 64 oz Jar & Steep Timer',
    metaDescription:
      'Cold brew concentrate ratio 1:8, how to dilute cold brew to RTD, 64 oz mason jar batches, steep timer with ready-at clock, and fridge-life tips.',
    excerpt:
      '1:8 concentrate or 1:15 RTD, dilution calculator, 64 oz jar preset, and a steep timer that shows when it’s ready.',
    icon: 'Snowflake',
    category: 'Calculator',
    keywords: [
      'cold brew concentrate ratio',
      'how to dilute cold brew',
      'cold brew for 64 oz mason jar',
      'cold brew ratio',
      'cold brew coffee ratio',
      'cold brew calculator',
      'cold brew 64 oz',
      'how long to steep cold brew',
      'cold brew water ratio',
    ],
    faqs: [
      {
        question: 'What is the cold brew concentrate ratio?',
        answer:
          '1:8 by weight — one part coffee to eight parts water. That makes a concentrate you dilute later (classic start ~1:1 with water or milk). Ready-to-drink batches use about 1:15 instead.',
      },
      {
        question: 'How do you dilute cold brew concentrate?',
        answer:
          'Start 1:1 — equal parts concentrate and water or milk. Prefer stronger? Try 1:0.5. Lighter? 1:2. Use the dilution calculator above: set concentrate per glass and dilution ratio to see finished drink volume.',
      },
      {
        question: 'Cold brew for a 64 oz mason jar — how much coffee?',
        answer:
          '64 oz ≈ 1893 ml of water. At concentrate 1:8 use ~237 g extra-coarse coffee; at ready-to-drink 1:15 use ~126 g. Tap the 64 oz jar preset above.',
      },
      {
        question: 'What is the best cold brew ratio?',
        answer:
          'Use about 1:8 for concentrate you dilute later, or 1:15 for a ready-to-drink batch. This calculator handles both plus dilution math.',
      },
      {
        question: 'How long should cold brew steep?',
        answer:
          'Steep coarse grounds in the fridge for 12–18 hours. Overnight (~12–14 h) works for most kitchens. Use the steep timer for a ready-at clock. Past ~24 hours it can turn bitter.',
      },
      {
        question: 'How long does cold brew last in the fridge?',
        answer:
          'Strained concentrate usually keeps about 1–2 weeks refrigerated in a sealed jar. Ready-to-drink (already diluted) is best within ~5–7 days. Freeze concentrate cubes for longer storage. Discard if it smells off or tastes sour/fermented.',
      },
      {
        question: 'Is cold brew the same as iced drip coffee ratio?',
        answer:
          'No. Cold brew is a long cold steep (usually 1:8 concentrate). Iced drip / Japanese iced is hot brew over ice. Use this tool for true cold brew; use the iced coffee calculator for flash brew.',
      },
      {
        question: 'What grind size for cold brew coffee?',
        answer:
          'Extra coarse — like cracked peppercorns. A medium grind over a 12-hour steep turns bitter, cloudy, and hard to filter.',
      },
    ],
  },
  {
    slug: 'espresso-ratio-calculator',
    name: 'Espresso Ratio Calculator',
    title: 'Espresso Ratio Calculator — 18g in 36g out + Shot Timer',
    metaDescription:
      '18g in 36g out espresso calculator with shot timer. Ristretto vs normale vs lungo, sour espresso fixes, and dial-in troubleshooting — then make a cappuccino or cortado.',
    excerpt:
      'Dose in, yield out, and a start/stop shot timer — plus ristretto/normale/lungo presets and sour/bitter dial-in tips.',
    icon: 'Coffee',
    category: 'Calculator',
    keywords: [
      '18g in 36g out',
      'ristretto vs normale',
      'sour espresso fix',
      'espresso ratio',
      'espresso brew ratio calculator',
      'dose to yield espresso',
      'ristretto vs lungo',
      'espresso shot timer',
    ],
    faqs: [
      {
        question: 'What does 18g in 36g out mean?',
        answer:
          'Dose 18 grams of dry coffee into the portafilter and stop the shot when 36 grams of liquid espresso are in the cup — a classic 1:2 (normale) brew ratio. Weigh both with a scale; use the shot timer next to yield as a guide, not a law.',
      },
      {
        question: 'What is ristretto vs normale?',
        answer:
          'Normale is about 1:2 (e.g. 18 in / 36 out). Ristretto is shorter — about 1:1.5 (e.g. 18 in / 27 out) — thicker and more intense. Lungo is longer (about 1:3+) with lighter body and more bitterness risk. Same dose, different yield.',
      },
      {
        question: 'How do I fix sour espresso?',
        answer:
          'Sour and fast usually means under-extraction: grind finer, or let the shot run a little longer (higher ratio). Check channeling and dose distribution too. See the dial-in table on this page — change one variable at a time.',
      },
      {
        question: 'What is a normal espresso ratio?',
        answer:
          'A normale shot is 1:2 — for example 18 g in, 36 g out, in about 25–30 seconds. Ristretto is 1:1–1:1.5 and lungo is 1:3 or more.',
      },
      {
        question: 'How long should an espresso shot take?',
        answer:
          'Most 1:2 double shots land around 25–30 seconds, not counting pre-infusion. Start the on-page shot timer with the pump. Taste and yield matter more than hitting exactly 28 seconds.',
      },
      {
        question: 'How do I fix a bitter shot?',
        answer:
          'Bitter and slow usually means over-extraction: grind coarser, or cut the shot shorter (lower ratio). Keep dose constant while you dial.',
      },
    ],
  },
  {
    slug: 'caffeine-day-planner',
    name: 'Caffeine Tracker',
    title: 'Caffeine Tracker & Calendar — Log Intake, Cut Down & See Weekly Trends',
    metaDescription:
      'Free caffeine tracker with a calendar: log drinks or mg by day (saved in your browser), set a cut-down goal, graph weekly/monthly trends, and keep a bedtime cutoff.',
    excerpt:
      'Calendar caffeine tracker: log drinks or custom mg per day in local storage, set a reduce-intake goal, and see weekly/monthly trend charts.',
    icon: 'Zap',
    category: 'Calculator',
    keywords: [
      'caffeine tracker',
      'caffeine calendar',
      'how to reduce caffeine intake',
      'caffeine intake tracker',
      'daily caffeine tracker',
      'cut down on caffeine',
      'what time should I stop drinking coffee',
      'caffeine at night',
      '400mg caffeine day',
      'caffeine day planner',
      'when to stop drinking coffee',
      'caffeine sleep cutoff',
      'lower caffeine gradually',
    ],
    faqs: [
      {
        question: 'How do I track caffeine intake for free?',
        answer:
          'Use this caffeine calendar tracker: add a drink preset or custom milligrams for any day. Totals save in your browser’s local storage — no account. Open the calendar to edit past days and the Trends chart for week/month averages.',
      },
      {
        question: 'How can I reduce my caffeine intake?',
        answer:
          'Set a cut-down goal (200, 100, or 50 mg/day presets), log every cup, and watch the 7-day average fall. Drop ~25–50 mg every few days instead of quitting cold turkey — swap one regular for half-caf or tea and keep your bedtime cutoff.',
      },
      {
        question: 'What time should I stop drinking coffee?',
        answer:
          'A common sleep-friendly buffer is about 8–10 hours before bed. Set bedtime and cutoff hours in the tracker — drinks after that time are flagged. Pair with our coffee and anxiety guide if evenings feel wired.',
      },
      {
        question: 'Is my caffeine log private?',
        answer:
          'Yes on our side: entries stay in this browser only via local storage and are not uploaded. Export CSV if you want a backup. Clearing site data or switching devices will not carry the log over.',
      },
      {
        question: 'What is a good daily caffeine goal when cutting back?',
        answer:
          'Many people start near ~200 mg (about two drip cups), then step toward 100 or 50 mg. The Standard 400 mg option is a common upper guide for healthy adults — not a target. Pregnancy and medical limits need your clinician’s advice.',
      },
      {
        question: 'How do weekly and monthly caffeine trends work?',
        answer:
          'Bars show milligrams per day vs your goal line. The summary cards show this week’s average on logged days, percent change vs last week, month average, and an under-goal streak so tapering is visible.',
      },
      {
        question: 'Can I log custom milligrams instead of a drink?',
        answer:
          'Yes — choose Custom mg, enter the number from a label or our caffeine calculator, and log it to the selected calendar day with a time.',
      },
    ],
  },
  {
    slug: 'caffeine-calculator',
    name: 'Caffeine Calculator',
    title: 'Caffeine Calculator — mg to Cups (80, 100, 150, 190, 200, 400)',
    metaDescription:
      'Caffeine calculator: convert 80–400 mg to cups of coffee, stack latte vs drip vs cold brew, and see if 200 mg is a lot. Free daily intake tool.',
    excerpt:
      'mg → cups presets (80, 100, 150, 190, 200, 400), multi-drink daily stack, and latte vs drip vs cold brew compares.',
    icon: 'Zap',
    category: 'Calculator',
    keywords: [
      'caffeine mg to cups',
      '80 mg caffeine how many cups',
      '100 mg caffeine cups',
      '150 mg caffeine',
      '190 mg caffeine',
      '200 mg caffeine how many cups',
      '400 mg caffeine cups',
      'caffeine in latte vs drip',
      'is 200mg a lot',
      'caffeine in cold brew',
      'caffeine calculator',
      'how much caffeine in coffee',
      'daily caffeine intake calculator',
      'caffeine in espresso',
      'daily caffeine limit',
    ],
    faqs: [
      {
        question: 'How many cups of coffee is 80 mg of caffeine?',
        answer:
          'About 0.8 cups of 8 oz brewed coffee (~95 mg each), or a bit more than one espresso shot (~63 mg). Use mg → cups mode and tap 80 mg.',
      },
      {
        question: 'How many cups of coffee is 100 mg of caffeine?',
        answer:
          'Roughly one 8 oz drip cup (~95 mg). A double espresso latte (~126 mg) is a bit more. Tap 100 mg in mg → cups.',
      },
      {
        question: 'How many cups of coffee is 150 mg of caffeine?',
        answer:
          'About 1.6 drip cups, or almost one 8 oz cold brew (~155 mg). Close to a strong single large café coffee.',
      },
      {
        question: 'How many cups of coffee is 190 mg of caffeine?',
        answer:
          'About two 8 oz drip cups, or one large 16 oz drip (~190 mg). That is a common “big coffee” day starter.',
      },
      {
        question: 'How many cups of coffee is 200 mg of caffeine?',
        answer:
          'About two 8 oz brewed coffees. For many adults that is a moderate day — not “a lot” unless you are sensitive, pregnant, or sleep-fragile. Not medical advice.',
      },
      {
        question: 'How many cups of coffee is 400 mg of caffeine?',
        answer:
          'About four 8 oz drip cups — the widely cited upper daily guideline for many healthy adults. Stack mixed drinks here so espresso + latte + soda do not hide under “four coffees.”',
      },
      {
        question: 'How much caffeine is in a latte vs drip?',
        answer:
          'A typical 8 oz drip/brewed coffee is ~95 mg. A latte built on a double espresso is ~126 mg — often more than one drip cup, even though it tastes milky. Large 16 oz drip (~190 mg) beats most two-shot lattes. Stack both in Daily stack mode to see a real day.',
      },
      {
        question: 'Is 200 mg of caffeine a lot?',
        answer:
          'For many healthy adults, 200 mg is a moderate day — about two 8 oz drip cups or a strong cold brew plus a bit more. The common upper guideline is ~400 mg/day. Sensitive people, pregnancy, and anxiety can make 200 mg feel like a lot. Not medical advice.',
      },
      {
        question: 'How much caffeine is in cold brew?',
        answer:
          'An 8 oz ready-to-drink cold brew often lands around ~155 mg — higher than a typical drip mug. Concentrate poured strong can go higher; always check dilution. Add cold brew to the stack above.',
      },
      {
        question: 'How many cups of coffee is 155 mg of caffeine?',
        answer:
          'About one 8 oz cold brew (~155 mg) or roughly 1.5–1.6 cups of brewed coffee (~95 mg each). Use mg → cups mode.',
      },
      {
        question: 'How much caffeine is in espresso vs coffee?',
        answer:
          'Per ounce, espresso is stronger (~63 mg/shot). Per serving, an 8 oz drip (~95 mg) often beats one shot; a double (~126 mg) is closer to a full mug or latte.',
      },
      {
        question: 'What is the safe daily caffeine limit?',
        answer:
          'Most healthy adults can have up to about 400 mg per day. Stack mixed drinks here so espresso + latte + soda do not hide under “two coffees.”',
      },
      {
        question: 'When will the caffeine wear off?',
        answer:
          'Caffeine’s half-life is often ~5–6 hours. Use the caffeine half-life calculator for a timeline, or the caffeine tracker for a calendar log and bedtime cutoffs.',
      },
      {
        question: 'Can I calculate caffeine by body weight?',
        answer:
          'Some people use ~3 mg per kg as a ballpark under the 400 mg ceiling. The By body weight mode does that math — not medical advice.',
      },
      {
        question: 'How much caffeine is in decaf coffee?',
        answer:
          'Decaf is not zero — often 2–15 mg per 8 oz cup. Sensitive people can still notice stacked decafs.',
      },
    ],
  },
  {
    slug: 'coffee-calories-calculator',
    name: 'Coffee Calories Calculator',
    title: 'Coffee Calories Calculator — Latte, Black Coffee & Milk Types',
    metaDescription:
      'Calories in a latte vs black coffee: skim, 2%, whole, oat, or almond milk; custom café base kcal; compare homemade vs chain-style drinks with sugar extras.',
    excerpt:
      'Estimate coffee calories by drink, milk type, and sugar — plus homemade vs chain-style comparison that respects your add-ins.',
    icon: 'Scale',
    category: 'Calculator',
    keywords: [
      'calories in latte',
      'black coffee calories',
      'starbucks latte calories homemade',
      'calories in black coffee',
      'coffee calories calculator',
      'oat milk latte calories',
      'mocha calories',
      'does black coffee have calories',
    ],
    faqs: [
      {
        question: 'How many calories are in black coffee?',
        answer:
          'An 8 oz cup of black coffee has about 2 calories — essentially negligible. Larger black coffees stay near zero unless you add milk, cream, sugar, or syrup.',
      },
      {
        question: 'Does black coffee have calories?',
        answer:
          'Technically yes, but only a couple of calories per cup from dissolved solids. For tracking and weight goals, plain black coffee is usually treated as zero.',
      },
      {
        question: 'How many calories in a latte?',
        answer:
          'A typical homemade 12 oz latte is mostly milk calories — often ~120–180 kcal depending on skim, 2%, whole, oat, or almond. Chain lattes with syrups often land higher. Use the milk type control and comparison table above.',
      },
      {
        question: 'Starbucks latte calories vs homemade?',
        answer:
          'Chain drinks vary by size, milk, and syrup pumps — a sweetened grande-style latte can land near ~200+ kcal before extras. Homemade with measured milk and no syrup is usually lower. Pick Custom base if you have the café nutrition number, then add your sugar slider so the comparison table stays honest.',
      },
      {
        question: 'How many calories does sugar add to coffee?',
        answer:
          'About 16 calories per teaspoon of sugar. Two teaspoons add roughly 32 calories per cup — easy to overlook across multiple drinks. The comparison table includes your sugar slider.',
      },
      {
        question: 'Does oat milk add more calories than dairy?',
        answer:
          'Barista oat milks often rival or exceed 2% dairy per splash. Unsweetened almond milk is usually much lower. Switch the milk type in the calculator — kcal per tablespoon updates automatically.',
      },
      {
        question: 'Is black coffee good for weight loss?',
        answer:
          'Black coffee can help if it replaces sugary drinks and fits your caffeine tolerance. It is not a fat burner on its own. Total diet and sleep still matter more.',
      },
    ],
  },
  {
    slug: 'caffeine-half-life-calculator',
    name: 'Caffeine Half-Life Calculator',
    title: 'Caffeine Half-Life Calculator — How Long Does Caffeine Last?',
    metaDescription:
      'How long does caffeine last? Clock-time mode (drank at 2pm, bed at 11), multi-dose stack, and a remaining-caffeine timeline. Educational estimate — not medical advice.',
    excerpt:
      'Clock-time or hours-since mode, optional multi-dose stack, and a timeline of caffeine still in your system.',
    icon: 'Timer',
    category: 'Calculator',
    keywords: [
      'how long does caffeine last',
      'when does caffeine leave your system',
      'half life of caffeine',
      'caffeine half life',
      'how long does coffee stay in your system',
      'caffeine half life calculator',
      'when does caffeine wear off',
    ],
    faqs: [
      {
        question: 'What is the half-life of caffeine?',
        answer:
          'For many healthy adults, caffeine’s half-life is about 5–6 hours — meaning roughly half the dose is still in your system after that time. Genetics, pregnancy, smoking status, liver health, and some medications can shorten or lengthen it. This calculator is an educational estimate, not a lab test or medical advice.',
      },
      {
        question: 'How long does caffeine last?',
        answer:
          'You may feel peak effects within an hour, but meaningful amounts can remain for 8–12+ hours after a large dose. Use clock-time mode (e.g. drank at 2 pm, bed at 11) to see estimated milligrams left at bedtime.',
      },
      {
        question: 'When does caffeine leave your system?',
        answer:
          'It clears gradually, not all at once. After one half-life (~5–6 hours) about half remains; after two half-lives about a quarter remains. Trace amounts linger longer. The timeline table shows a rough remaining-mg curve.',
      },
      {
        question: 'Can I stack multiple coffees in the half-life calculator?',
        answer:
          'Yes — add optional extra doses with their own times. The “now” and bedtime estimates sum remaining caffeine from the whole stack.',
      },
      {
        question: 'Does pregnancy or smoking change caffeine half-life?',
        answer:
          'Often yes. Pregnancy commonly slows clearance (longer half-life). Smoking can speed caffeine metabolism (shorter half-life). Move the assumed half-life slider to explore — then treat sleep quality as the real feedback. Not medical advice; ask a clinician for personal guidance.',
      },
      {
        question: 'When should I stop drinking coffee to sleep?',
        answer:
          'A common rule is 8+ hours before bed. If you are sensitive, stop by early afternoon. Use clock mode with your real dose and bedtime, or open the caffeine tracker for a calendar log and cutoff.',
      },
    ],
  },
  {
    slug: 'coffee-measurement-converter',
    name: 'Coffee Measurement Converter',
    title: 'Coffee Scoop to Grams & Tablespoon Converter',
    metaDescription:
      'How many grams in a tablespoon of coffee? Toggle whole-bean vs ground density, level vs heaping scoop, expanded conversion table, and why scales beat scoops.',
    excerpt:
      'Grams ↔ tablespoons ↔ scoops with whole-bean vs ground density and level vs heaping scoop toggles.',
    icon: 'Ruler',
    category: 'Reference',
    keywords: [
      'how many grams in a tablespoon of coffee',
      'coffee scoop to grams',
      'coffee grams to tablespoons',
      '20 grams of coffee to tablespoons',
      '1 tbsp of coffee to grams',
      'how many tablespoons in a coffee scoop',
      'tbsp to grams coffee',
      'whole bean vs ground tablespoon',
    ],
    faqs: [
      {
        question: 'How many grams in a tablespoon of coffee?',
        answer:
          'About 5.3 g for a level tablespoon of ground coffee. Whole beans are lighter by volume (~4.5 g level). Heaping spoons can add ~30%. Toggle ground vs bean and level vs heaping above.',
      },
      {
        question: 'Coffee scoop to grams — how much?',
        answer:
          'A standard coffee scoop is about 2 tablespoons. Level ground ≈ 10 g; heaping is more. Whole-bean scoops weigh less for the same volume. Use the conversion table on this page.',
      },
      {
        question: 'How many tablespoons is 20 grams of coffee?',
        answer:
          'About 3.8 level tablespoons of ground coffee (20 ÷ 5.3). Common single-cup pour-over dose — tap the 20 g preset.',
      },
      {
        question: 'How many tablespoons in a coffee scoop?',
        answer:
          'One standard scoop ≈ 2 tablespoons (~6 teaspoons).',
      },
      {
        question: 'How many tablespoons of coffee per cup?',
        answer:
          'For an 8 oz mug at 1:16, about 2 tablespoons (~15–16 g). Machine “cups” (5 oz) need closer to 1–1.5 tablespoons.',
      },
      {
        question: 'Why do scales beat scoops?',
        answer:
          'Roast, grind, and packing change how much coffee fits in a spoon — easy 30–50% dose errors. Grams are repeatable. See the short “why scales beat scoops” section on this page.',
      },
      {
        question: 'How many grams of coffee for 8 cups?',
        answer:
          'Eight 5 oz machine cups need ~70–75 g; eight 8 oz mugs need ~120–125 g. Use the drip coffee calculator for exact pots.',
      },
    ],
  },
  {
    slug: 'grind-size-chart',
    name: 'Grind Size Chart',
    title: 'Coffee Grind Size Chart — Espresso vs Drip, French Press & More',
    metaDescription:
      'Interactive coffee grind size chart: pick espresso, drip, French press, or pour over to highlight grind, micron ranges, and too-fine / too-coarse symptoms.',
    excerpt:
      'Pick a brew method to highlight the right grind, photo-style texture analogies, micron ballparks, and fix-it symptoms.',
    icon: 'Beaker',
    category: 'Reference',
    keywords: [
      'espresso grind vs drip',
      'french press grind size',
      'what does medium grind look like',
      'coffee grind size chart',
      'coffee grind chart',
      'grind size for pour over',
      'espresso grind size',
      'cold brew grind size',
      'coffee grind too fine',
      'aeropress grind size',
    ],
    faqs: [
      {
        question: 'What grind size should I use?',
        answer:
          'Match grind to brew time: espresso is fine, pour over and drip are medium to medium-fine, French press and cold brew are coarse. Use the method picker above to highlight the row and see too-fine / too-coarse symptoms.',
      },
      {
        question: 'What does medium grind look like?',
        answer:
          'Medium grind feels like coarse sand — coarser than table salt, finer than sea salt. It is the usual target for automatic drip and Kalita Wave. Rub a pinch between your fingers; if it looks like powdered sugar you are too fine for drip.',
      },
      {
        question: 'What grind size for pour over coffee?',
        answer:
          'Use medium-fine — about the texture of table salt / fine sand (~500–700 μm ballpark). If the brew finishes under ~2:30 and tastes sour, grind finer. If it stalls past ~4:00 and tastes bitter, grind coarser.',
      },
      {
        question: 'What grind size for French press?',
        answer:
          'Use a coarse grind, like sea salt (~1100–1400 μm). French press steeps about 4 minutes; a fine grind over-extracts, clogs the mesh, and leaves a muddy cup. If your press tastes silty, go coarser before changing the ratio.',
      },
      {
        question: 'What grind size for espresso?',
        answer:
          'Espresso needs a fine grind — closer to powdered sugar or very fine salt (~300–400 μm) — so a ~25–30 second shot at a 1:2 ratio can extract properly. If the shot gushes and tastes sour, grind finer. If it drips slowly and tastes bitter, grind coarser.',
      },
      {
        question: 'Espresso grind vs drip — how different?',
        answer:
          'Espresso is much finer. Drip is medium (sand); espresso is fine enough that water needs pressure to push through the puck in ~25–30 seconds. Espresso fineness in a drip basket clogs and tastes bitter; drip coarseness in espresso gushes and tastes sour. Tap Espresso or Drip in the chart to compare rows.',
      },
      {
        question: 'What grind size for AeroPress?',
        answer:
          'Medium-fine (table salt) is the best all-purpose AeroPress grind. Go finer for a short concentrate; coarser for a longer immersion-style cup.',
      },
      {
        question: 'What grind size for cold brew?',
        answer:
          'Use extra-coarse grounds, similar to cracked peppercorns. Cold brew steeps 12–18 hours; anything medium or finer tends to turn bitter and cloudy.',
      },
      {
        question: 'What grind size for drip coffee makers?',
        answer:
          'Most automatic drip machines want a medium grind — like regular sand (~700–900 μm). Flat-bottom baskets can go slightly coarser; cone filters often prefer slightly finer.',
      },
      {
        question: 'What happens if my grind is wrong?',
        answer:
          'Too fine over-extracts (bitter, harsh, stalled). Too coarse under-extracts (sour, thin, fast). The chart’s “if too fine / too coarse” cards spell out symptoms for the method you picked.',
      },
      {
        question: 'Why does my coffee taste bitter or sour?',
        answer:
          'Bitter and harsh often means too fine. Sour and watery often means too coarse. Confirm the method row on the chart, then adjust one click at a time.',
      },
      {
        question: 'Do I need a burr grinder for accurate grind size?',
        answer:
          'Yes if you care about consistency. Blade grinders make dust + chunks, so the cup can taste bitter and sour at once. Micron ranges on this chart assume burr grinding.',
      },
    ],
  },
  {
    slug: 'world-coffee-map',
    name: 'World Coffee Map Explorer',
    title: 'World Coffee Map — Compare Coffee Beans by Country (29 Origins)',
    metaDescription:
      'How do coffee beans from different countries compare? Interactive map of 29 origins — filter, compare Ethiopia vs Brazil vs Colombia, cup styles, and more.',
    excerpt:
      'Compare coffee beans by country: search, filter, or side-by-side 29 origins with altitude, flavors, and cup profiles.',
    icon: 'Beaker',
    category: 'Reference',
    keywords: [
      'how do coffee beans from different countries compare',
      'compare coffee origins',
      'world coffee map',
      'coffee growing regions',
      'where is coffee grown',
      'ethiopia vs colombia coffee',
      'best coffee origin for espresso',
      'coffee origins map',
      'map of coffee producing countries',
      'coffee bean origins',
      'ethiopia coffee flavor',
      'colombia coffee',
      'kona coffee',
      'arabica vs robusta countries',
    ],
    faqs: [
      {
        question: 'How do coffee beans from different countries compare?',
        answer:
          'Use Compare mode on this map: Ethiopia tends fruity/floral, Colombia caramel-balanced, Brazil chocolatey and low-acid, Kenya bright/currant-like, Sumatra earthy and full. Or read the country comparison chart in our coffee bean origins guide.',
      },
      {
        question: 'Which country produces the most coffee?',
        answer:
          'Brazil is the world\'s largest coffee producer, accounting for roughly 40% of global output. It is followed by Vietnam, Colombia, and Indonesia. Brazil dominates in volume; Ethiopia and Colombia are more celebrated for specialty-grade quality.',
      },
      {
        question: 'Where is coffee grown?',
        answer:
          'Almost all commercial coffee grows in the “coffee belt” between the Tropics of Cancer and Capricorn — Central and South America, Africa, the Middle East, and Southeast Asia, plus a few outliers like Hawaii (Kona). This map covers 29 producing origins with altitude, process, and cup notes.',
      },
      {
        question: 'What is the coffee belt?',
        answer:
          'The "coffee belt" is the band between the Tropics of Cancer and Capricorn (roughly 25°N to 30°S) where coffee plants thrive. It encompasses Central and South America, Africa, the Middle East, and Southeast Asia.',
      },
      {
        question: 'Ethiopia vs Colombia coffee — what’s the difference?',
        answer:
          'Ethiopia (Arabica’s homeland) often tastes floral and fruity — blueberry, jasmine, bergamot — especially as light-roast pour over. Colombia is usually washed, caramel-apple balanced, and a reliable daily drip or espresso component. Use Compare on this map for side-by-side acidity, body, and sweetness.',
      },
      {
        question: 'What is the best coffee origin for espresso?',
        answer:
          'Brazil and many Central American lots (Guatemala, Nicaragua) shine as chocolatey, low-acid espresso bases. Bright Ethiopias can work as single-origin espresso but are punchier and more acidic. Pair origin with roast: medium-dark for classic milk drinks, lighter for filter-style espresso.',
      },
      {
        question: 'Why does coffee taste different from different countries?',
        answer:
          'Altitude, soil, rainfall, temperature, and processing method all shape flavor. Ethiopian naturals taste fruity and floral; Colombian washed beans are clean and balanced; Sumatran wet-hulled beans are earthy and full-bodied.',
      },
      {
        question: 'Where does the best coffee come from?',
        answer:
          'There is no single “best” origin — it depends on taste. Ethiopia and Kenya lead for bright, fruity filter coffee; Colombia and Guatemala for balanced everyday cups; Brazil for chocolatey espresso blends; Sumatra for heavy, earthy body.',
      },
      {
        question: 'What does Ethiopian coffee taste like?',
        answer:
          'Often floral and fruity — jasmine, bergamot, blueberry, peach — especially from Yirgacheffe and Sidama. Natural-processed lots taste jammy; washed lots taste cleaner and tea-like. They shine as light-roast pour overs.',
      },
      {
        question: 'Arabica vs Robusta — which countries grow which?',
        answer:
          'Most specialty origins (Ethiopia, Colombia, Kenya, Costa Rica) grow Arabica. Vietnam grows mostly Robusta. Brazil, Indonesia, India, and Uganda grow both. Arabica tastes sweeter and more complex; Robusta has more caffeine and a heavier, earthier profile.',
      },
      {
        question: 'Is Kona coffee really from Hawaii?',
        answer:
          'True Kona must be grown in a certified belt on Hawaii’s Big Island. “Kona blend” bags can be mostly other origins with a small Kona percentage — check the label. On this map, Hawaii is list-only so the whole USA is not painted as a coffee country.',
      },
      {
        question: 'How do I compare two coffee origins?',
        answer:
          'Turn on Compare, then tap two countries (or chips). You get side-by-side acidity, body, sweetness, caffeine, altitude, and process — plus copy-link and print for Ethiopia vs Colombia style matchups.',
      },
      {
        question: 'How do I use the world coffee map on a phone?',
        answer:
          'Do not try to tap tiny countries. Use search, cup-style filters, or the origin chips (Ethiopia, Vietnam, Jamaica…). If the globe CDN fails, chips and profiles still work offline-friendly.',
      },
    ],
  },
  {
    slug: 'coffee-lab',
    name: 'Coffee Lab Simulator',
    title: 'Coffee Lab Simulator: See How Grind, Ratio & Roast Affect Your Cup',
    metaDescription:
      'An interactive coffee lab simulator. Adjust bean origin, roast level, grind size, water temperature, and brew ratio — and see how each variable changes the taste profile of your cup.',
    excerpt:
      'Dial in bean, roast, grind, temperature, and ratio then hit Brew to see your predicted taste profile.',
    icon: 'Zap',
    category: 'Calculator',
    keywords: [
      'coffee brew simulator',
      'why is my coffee bitter',
      'under extracted coffee',
      'how to fix sour espresso',
      'coffee taste profile',
      'how does grind affect coffee taste',
      'coffee extraction explained',
      'coffee science',
    ],
    faqs: [
      {
        question: 'Why is my coffee bitter?',
        answer:
          'Usually over-extraction: grind too fine, water too hot, brew too long, or a very dark roast. In the lab, bitterness spikes when extraction runs high — hit Brew, then use Apply fix links to coarsen grind or ease the ratio.',
      },
      {
        question: 'What is under-extracted coffee?',
        answer:
          'Under-extracted coffee tastes sour, salty, and thin, without sweetness. Common causes: grind too coarse, brew time too short, dose too low, or water too cool. The simulator flags under-extraction and links to a finer grind and stronger ratio.',
      },
      {
        question: 'How do you fix sour espresso?',
        answer:
          'Sour espresso is often under-extracted: grind finer, raise temperature slightly, or extend shot time toward a normale ~1:2 ratio. Use Apply fix → espresso ratio calculator after a sour lab result, and keep dose steady while you change one variable.',
      },
      {
        question: 'How does grind size affect coffee flavor?',
        answer:
          'Finer grinds extract faster, pulling more compounds from the coffee in the same time. Too fine leads to over-extraction: bitter, harsh, astringent. Too coarse leads to under-extraction: sour, thin, and lacking sweetness.',
      },
      {
        question: 'How does water temperature affect extraction?',
        answer:
          'Higher temperatures extract more compounds faster. Light roasts need 93–96°C to develop fully. Dark roasts can be brewed cooler (88–92°C) to avoid excessive bitterness.',
      },
      {
        question: 'What is the difference between light and dark roast flavor?',
        answer:
          'Light roasts retain more origin character: floral, fruity, acidic, and complex. Dark roasts develop roast-driven flavors: chocolate, caramel, smoke, and low acidity. Medium roasts balance both.',
      },
      {
        question: 'What is over-extracted coffee?',
        answer:
          'Over-extracted coffee tastes bitter, hollow, and drying — like sucking on a tea bag too long. Common causes: grind too fine, brew time too long, or water too hot for the roast.',
      },
      {
        question: 'Which variable should I change first when coffee tastes bad?',
        answer:
          'Change grind size first. It is the fastest fix for bitter vs sour cups. Keep ratio and temperature steady until the grind is in the right ballpark, then fine-tune the rest. The Apply fix buttons deep-link to grind, ratio, and brew timer with sensible presets.',
      },
    ],
  },
  ...TRENDING_TOOLS,
]

/* ----------------------------- Tool long-form SEO content ----------------------------- */

/**
 * Each entry holds the editorial copy rendered below the interactive widget.
 * Sections: intro, howToUse (steps), proTips, whyItMatters.
 * All copy targets high-volume search queries and passes Google's "helpful content" bar.
 */
export const TOOL_CONTENT: Record<
  string,
  {
    intro: string
    howToUse: { step: string; detail: string }[]
    proTips: string[]
    whyItMatters: string
    relatedSlugs: string[]
    answerTables?: AnswerTable[]
    hubSections?: { heading: string; paragraphs: string[] }[]
  }
> = {
  'coffee-ratio-calculator': {
    intro:
      'The coffee-to-water ratio is the biggest lever for cup strength. Golden ratio coffee for most filter methods sits around 1:15–1:18; 1:16 is the all-purpose default (~62 g per litre). This calculator snaps method presets (V60 1:16, French press 1:15, AeroPress, batch brew), embeds a printable coffee-to-water ratio chart, and links the grind chart for “ratio + grind” searches.',
    howToUse: [
      {
        step: 'Snap a method preset',
        detail:
          'Tap V60 / pour over (1:16), French press (1:15), AeroPress (~1:14), batch/drip (~1:16.5), or Chemex (1:16). That moves the slider instantly.',
      },
      {
        step: 'Enter coffee, water, or cups',
        detail:
          'Any field updates the others. Grams and millilitres of water are interchangeable (1 ml ≈ 1 g).',
      },
      {
        step: 'Print the method chart',
        detail:
          'The on-page coffee to water ratio chart lists method, ratio, dose per 250 ml, and grind cue — hit Print chart for a fridge copy.',
      },
      {
        step: 'Open the grind chart',
        detail:
          'Ratio alone will not fix a sour or bitter cup. Use the linked grind size chart for the same method so both dials move together.',
      },
    ],
    proTips: [
      'Weigh water, not just coffee — eyeballing the kettle undoes the math.',
      'Weak at 1:16? Fix grind finer before you drop to 1:15.',
      'Cold brew concentrate is 1:8 — use the cold brew calculator.',
      'Espresso is dose:yield (~1:2) — different scale entirely.',
    ],
    whyItMatters:
      '“Golden ratio coffee” and “coffee to water ratio chart” are evergreen SERPs. Method presets + a printable chart + grind links keep that intent on one page instead of bouncing to a static PDF blog post.',
    relatedSlugs: [
      'brew-timer',
      'grind-size-chart',
      'coffee-measurement-converter',
      'drip-coffee-calculator',
      'iced-coffee-calculator',
    ],
    answerTables: [
      {
        title: 'Quick coffee-to-water ratio chart',
        caption: 'Coffee dose for common mug sizes at popular ratios (water ≈ grams).',
        headers: ['Water', '1:15 (strong)', '1:16 (balanced)', '1:17 (light)'],
        rows: [
          ['250 ml (1 mug)', '17 g', '16 g', '15 g'],
          ['500 ml (2 mugs)', '33 g', '31 g', '29 g'],
          ['750 ml', '50 g', '47 g', '44 g'],
          ['1 liter', '67 g', '62 g', '59 g'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'Ratio + grind together',
        paragraphs: [
          'Search results for coffee ratio often mix with grind questions because both control extraction. Set the method preset here, then open the grind size chart with the matching method filter. Change one variable at a time when the cup tastes off.',
        ],
      },
    ],
  },

  'drip-coffee-calculator': {
    intro:
      'Automatic drip makers label “cups” as ~5 oz while people drink 8–12 oz mugs — hence “how much coffee for 12 cup coffee maker” and “coffee scoops per pot.” This calculator supports cup count or custom water (ml/L), Mr. Coffee / Cuisinart carafe-full presets, a grind reminder chip, a pot-size scoops table, and weak/strong troubleshooting.',
    howToUse: [
      {
        step: 'Choose cups or water/carafe mode',
        detail:
          'Cup count for machine cups or mugs, or Water/carafe for custom ml and full-carafe presets (Mr. Coffee 12-cup, Cuisinart 10/14-cup, etc.).',
      },
      {
        step: 'Set strength',
        detail:
          'Light 1:17.5, Standard 1:16.5, Strong 1:15.5. Too-weak pots usually need Strong or a finer grind — not a second pass on spent grounds.',
      },
      {
        step: 'Read grams, tablespoons, and scoops',
        detail:
          'Grams first. Scoops assume a level ~10 g scoop. Check the pot-size FAQ table for 4–12 cup scoops-per-pot.',
      },
      {
        step: 'Mind the grind chip',
        detail:
          'Medium grind for most baskets. Link through to the drip row on the grind chart when texture is wrong.',
      },
    ],
    proTips: [
      '“One scoop per cup” assumes machine cups — a 12-cup pot is not 12 mugs.',
      'Weak pot? More coffee or finer grind before blaming the beans.',
      'Descale if every batch tastes flat regardless of dose.',
      'Carafe presets are typical usable volumes — check your manual if the basket floods.',
    ],
    whyItMatters:
      'Top-traffic drip queries need carafe reality, scoops-per-pot math, and a weak-coffee fix — not only a cup slider. Custom water + brand presets keep Mr. Coffee and Cuisinart owners on-page.',
    relatedSlugs: [
      'coffee-ratio-calculator',
      'grind-size-chart',
      'coffee-measurement-converter',
      'iced-coffee-calculator',
      'caffeine-calculator',
    ],
    answerTables: [
      {
        title: 'How much coffee for drip (machine cups at 1:16.5)',
        caption:
          'Most Mr. Coffee–style makers use 5 oz “cups.” Grams rounded; tablespoons ≈ 5.3 g each.',
        headers: ['Machine cups', 'Water', 'Coffee', 'Tablespoons', 'Scoops'],
        rows: [
          ['4 cups', '591 ml', '36 g', '6.8', '3.6'],
          ['8 cups', '1.18 L', '72 g', '13.5', '7.2'],
          ['10 cups', '1.48 L', '89 g', '16.9', '8.9'],
          ['12 cups', '1.77 L', '107 g', '20.3', '10.7'],
        ],
      },
    ],
  },

  'french-press-calculator': {
    intro:
      '“French press coffee ratio grams per liter” is a high-intent search with a simple answer: 67 g/L at 1:15. This calculator puts that number above the fold, scales it to any press size (mild/classic/strong), and includes a 4-minute steep timer with optional bloom and plunge reminder — plus muddy-cup grind fixes.',
    howToUse: [
      {
        step: 'Read grams per liter first',
        detail:
          'The banner shows g/L for your strength preset — classic is 67 g per liter (1:15). Mild ~63 g/L; strong ~71 g/L.',
      },
      {
        step: 'Choose your press size',
        detail:
          'Tap 1 cup through 12-cup / 1 L. These match common usable volumes, not confusing lid “cup” markings.',
      },
      {
        step: 'Start the 4-minute timer',
        detail:
          'Optional bloom (30s with ~2× dose), then steep. When time hits zero, plunge slowly and decant immediately.',
      },
      {
        step: 'Fix muddy cups with grind',
        detail:
          'Coarse like sea salt. If the cup is muddy/sludgy, open the grind size chart (French press) and go coarser before changing ratio.',
      },
    ],
    proTips: [
      'French press “cups” on packaging are usually ~4 oz — trust water weight.',
      'Muddy or bitter? Grind coarser before you change the ratio.',
      'Decant immediately after pressing — leaving coffee on the grounds turns it bitter fast.',
      'Use the bloom checkbox if you like a gentler start; skip it for the classic dump-and-steep.',
    ],
    whyItMatters:
      'People search “french press coffee ratio grams per liter,” “1 liter how much coffee,” and “french press muddy” in the same session. Leading with 67 g/L + timer + grind link answers all three without bouncing between tabs.',
    relatedSlugs: [
      'coffee-ratio-calculator',
      'grind-size-chart',
      'coffee-measurement-converter',
      'caffeine-calculator',
    ],
    answerTables: [
      {
        title: 'French press coffee ratio per cup (1:15 classic)',
        caption:
          'How to make French press coffee by size. Coarse grind, ~4 minute steep, then decant.',
        headers: ['Press / serving', 'Water', 'Coffee', 'Tablespoons', 'Scoops'],
        rows: [
          ['1 mug', '250 ml', '17 g', '3.2', '1.7'],
          ['2 mugs', '500 ml', '33 g', '6.3', '3.3'],
          ['16 oz press', '473 ml', '32 g', '6.0', '3.2'],
          ['4-cup (~17 oz)', '500 ml', '33 g', '6.3', '3.3'],
          ['8-cup / 1 L', '1000 ml', '67 g', '12.6', '6.7'],
          ['12-cup', '1500 ml', '100 g', '18.9', '10.0'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'Muddy French press / sludge FAQ',
        paragraphs: [
          'Sediment is normal with a mesh filter, but a muddy cup usually means fines: grind too fine, aggressive plunge, or stirring like a whirlpool. Go coarser (sea salt / breadcrumbs), plunge gently, and pour soon. A second pass through a fine kitchen mesh or paper filter cleans the cup if you hate silt.',
          'Link the grind size chart with method=french-press when you share a fix — texture beats dial numbers.',
        ],
      },
    ],
  },

  'iced-coffee-calculator': {
    intro:
      '“Japanese iced coffee ratio,” “flash brew vs cold brew,” and “iced coffee melting too fast” are the real search intents behind “how to make iced coffee.” Flash brew keeps bright aromatics; cold brew is a different overnight steep. This calculator sizes coffee, hot water, and ice for preset or custom glasses (ml/oz), and adds an iced-latte-from-concentrate mode with milk volume.',
    howToUse: [
      {
        step: 'Pick your iced style',
        detail:
          'Japanese iced for bright cups; chill a normal hot brew for convenience; concentrate-over-ice for tumblers; iced latte from concentrate when you want a milk volume.',
      },
      {
        step: 'Set glass size (including custom ml/oz)',
        detail:
          '12 / 16 / 20 oz presets or Custom. The calculator splits hot brew water and ice so the final drink lands near normal strength.',
      },
      {
        step: 'Add milk if making an iced latte',
        detail:
          'In latte-from-concentrate mode, set milk ml. Coffee+ice fills the rest so dilution stays intentional.',
      },
      {
        step: 'Brew and serve',
        detail:
          'For Japanese iced: grind medium-fine, brew into a vessel packed with the listed ice. Pre-chill the glass if ice melts too fast.',
      },
    ],
    proTips: [
      'Flash brew ≠ cold brew — use the cold brew calculator for overnight concentrate.',
      'Ice melting too fast? Bigger cubes, colder glass, stronger brew ratio.',
      'Follow with iced latte or brown sugar shaken espresso recipes for café builds.',
      'If flash brew tastes weak, bump dose or trim ice ~10%.',
    ],
    whyItMatters:
      'Most watery iced coffee is hot brew dumped on ice without dilution math. Custom glass + milk mode + style comparison keeps summer traffic on-page instead of bouncing to a generic recipe.',
    relatedSlugs: [
      'cold-brew-calculator',
      'coffee-ratio-calculator',
      'drip-coffee-calculator',
      'caffeine-calculator',
    ],
    answerTables: [
      {
        title: 'Flash brew vs cold brew vs chill',
        headers: ['Style', 'Time', 'Ratio idea', 'Taste'],
        rows: [
          ['Japanese iced (flash)', '3–4 min', 'Strong hot onto ice (~1:10)', 'Bright, aromatic'],
          ['Hot then chill', 'Brew + cool', '1:16 hot', 'Clean, mellow'],
          ['Concentrate over ice', '3–4 min', '~1:12 + melt', 'Bold base for milk'],
          ['Cold brew', '12–18 hrs', '1:8 concentrate', 'Smooth, low acid'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'Style comparison and recipe links',
        paragraphs: [
          'Use Japanese iced when you want pour-over clarity on ice. Use concentrate or iced-latte mode when milk is the point. Use cold brew when you want overnight smoothness. Next steps: iced latte recipe, brown sugar shaken espresso, or the cold brew calculator.',
        ],
      },
    ],
  },

  'brew-timer': {
    intro:
      'Pour over is forgiving once you have a pour schedule — and inconsistent when you wing it. This guided timer covers V60 (classic 3 pour), Chemex, Kalita Wave, and Hario Switch profiles with bloom prompts, target scale weights, optional beeps on phase change, and a water temperature note for each dripper.',
    howToUse: [
      {
        step: 'Pick a dripper profile',
        detail:
          'Choose V60, Chemex, Kalita, or Switch. Each profile has different phase timing and a water temp note (usually ~93–96°C for light/medium roasts).',
      },
      {
        step: 'Set dose, ratio, and beep preference',
        detail:
          'Enter coffee dose and brew ratio. Toggle the phase-change beep if you want an audio cue when Bloom → First pour → Second pour → Drawdown flips.',
      },
      {
        step: 'Hit Start at the bloom pour',
        detail:
          'Tap Start as you begin wetting the grounds. Target weights update from your dose and ratio so you can follow along on a scale.',
      },
      {
        step: 'Watch drawdown and taste',
        detail:
          'V60 singles often finish ~2:30–3:30 total. Chemex runs slower. Bitter and stalled → grind coarser; sour and fast → grind finer — then reopen the grind size chart.',
      },
    ],
    proTips: [
      'Bloom with ~2–3× the coffee dose in water and give it 30–45 seconds. Fresh light roasts bloom hard — do not rush this step.',
      'Pour in slow spirals; avoid soaking the paper filter walls (channels water past the bed).',
      'Switch profile: keep the valve closed for immersion, then open to drain — do not force a V60 pour schedule on a closed Switch.',
      'Rinse paper filters with hot water to cut paper taste and preheat the dripper.',
      'Sour vs bitter is usually grind first, then pour aggression — the timer only helps if grind matches the method.',
    ],
    whyItMatters:
      'People search “V60 brew timer,” “pour over bloom time,” and “3 pour V60 recipe” because timing is the missing piece after ratio. Profile-aware prompts beat a generic stopwatch — especially when you bounce between Chemex, Kalita, and Switch.',
    relatedSlugs: ['coffee-ratio-calculator', 'grind-size-chart', 'coffee-measurement-converter'],
  },

  'cold-brew-calculator': {
    intro:
      'Cold brew concentrate ratio is usually 1:8 by weight — strong on purpose so you can dilute to taste. Ready-to-drink sits near 1:15. This calculator sizes any jar (including a 64 oz mason jar), converts concentrate → glass with a dilution tool, and includes an optional steep timer with a ready-at clock.',
    howToUse: [
      {
        step: 'Choose concentrate or ready-to-drink',
        detail:
          'Concentrate (1:8) for flexibility — dilute later. RTD (1:15) to pour straight over ice.',
      },
      {
        step: 'Set batch water (64 oz jar preset included)',
        detail:
          'Tap 500 ml, 1 L, 64 oz jar (~1893 ml), or type your own. Coffee grams update instantly.',
      },
      {
        step: 'Dilute concentrate to a finished drink',
        detail:
          'On concentrate mode, set dilution (classic 1:1) and concentrate per glass to see water/milk and finished volume.',
      },
      {
        step: 'Start the steep timer',
        detail:
          '12–18 hours in the fridge. The ready-at clock shows when to strain. Mesh + paper filter, then refrigerate.',
      },
    ],
    proTips: [
      'Extra-coarse grind only — fines make bitter, muddy concentrate.',
      'Room-temp steep (~8–12 h) is brighter; fridge steep is more forgiving.',
      'Freeze concentrate in ice cubes for longer storage and iced lattes.',
      'Already diluted RTD fades faster than sealed concentrate — see fridge-life below.',
    ],
    whyItMatters:
      '“Cold brew concentrate ratio,” “how to dilute cold brew,” and “cold brew for 64 oz mason jar” are the practical queries behind overnight brew. Dilution math + jar presets + a ready-at timer beat a static recipe card.',
    relatedSlugs: [
      'iced-coffee-calculator',
      'coffee-ratio-calculator',
      'grind-size-chart',
      'caffeine-calculator',
    ],
    answerTables: [
      {
        title: 'How to brew cold brew coffee — ratio chart',
        caption: 'Extra-coarse grind. Fridge steep 12–18 hours (overnight works).',
        headers: ['Batch water', 'Concentrate 1:8', 'Ready-to-drink 1:15', 'Approx servings'],
        rows: [
          ['500 ml', '63 g coffee', '33 g coffee', '2–4'],
          ['800 ml', '100 g coffee', '53 g coffee', '4–6'],
          ['1 L', '125 g coffee', '67 g coffee', '5–8'],
          ['64 oz (1.89 L)', '237 g coffee', '126 g coffee', '10–15'],
        ],
      },
      {
        title: 'How to dilute cold brew concentrate',
        caption: 'Start 1:1, then adjust strength to taste.',
        headers: ['Concentrate', 'Water / milk', 'Finished drink', 'Style'],
        rows: [
          ['120 ml', '60 ml', '~180 ml', '1:0.5 strong'],
          ['120 ml', '120 ml', '~240 ml', '1:1 classic'],
          ['120 ml', '240 ml', '~360 ml', '1:2 lighter'],
          ['180 ml', '180 ml', '~360 ml', 'Tall 1:1'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'Batch fridge-life',
        paragraphs: [
          'After straining, store cold brew in a clean sealed jar in the fridge. Concentrate typically keeps about 1–2 weeks; ready-to-drink (already diluted) is best within about 5–7 days because it has more water and less “density” protecting flavor. Freeze leftover concentrate in ice cube trays for iced drinks later.',
          'Signs it is past its best: sour/fermented smell, visible mold, or a flat cardboard taste. When in doubt, brew a fresh jar — coffee is cheap next to a bad stomach.',
        ],
      },
    ],
  },

  'espresso-ratio-calculator': {
    intro:
      'Espresso defaults to 1:2 — 18 g in, 36 g out — but your palate might want ristretto (~1:1.5) or lungo (~1:3). This calculator shows yield for any dose/ratio, includes a start/stop shot timer next to the yield, and a dial-in troubleshooting table for sour/bitter shots. Then take the shot into a cappuccino or cortado.',
    howToUse: [
      {
        step: 'Choose ristretto, normale, or lungo',
        detail:
          'Presets set 1:1.5 / 1:2 / 1:3. Drag the slider for anything in between.',
      },
      {
        step: 'Enter dose and read yield',
        detail:
          'Dose is dry coffee in the portafilter. Yield is liquid in the cup — stop on the scale when you hit the number (classic 18 in / 36 out).',
      },
      {
        step: 'Start the shot timer with the pump',
        detail:
          'Start/stop next to yield. Most 1:2 doubles land ~25–30 s. Time is a guide; taste wins.',
      },
      {
        step: 'Fix sour or bitter with the table',
        detail:
          'Sour & fast → finer grind or longer ratio. Bitter & slow → coarser or shorter. Change one variable at a time, then practice on milk drinks.',
      },
    ],
    proTips: [
      'Ratio and grind move together — finer slows the shot; coarser speeds it up.',
      '18g in 36g out is a starting normale, not a religion.',
      'Light roasts often like longer ratios (1:2.5–1:3).',
      'After dial-in, use the cappuccino or cortado recipe CTAs on this page.',
    ],
    whyItMatters:
      '“18g in 36g out,” “ristretto vs normale,” and “sour espresso fix” are high-intent dial-in queries. Yield math + a shot timer + a troubleshooting table keeps that intent on one URL — and the recipe CTAs only show when the slug is espresso-ratio-calculator (not the old espresso-calculator typo).',
    relatedSlugs: ['coffee-ratio-calculator', 'caffeine-calculator', 'grind-size-chart'],
    answerTables: [
      {
        title: 'Dial-in troubleshooting',
        caption: 'Change one variable at a time. Keep dose steady while you learn.',
        headers: ['Symptom', 'Likely cause', 'Try first'],
        rows: [
          ['Sour, fast (<20s)', 'Under-extracted / too coarse', 'Grind finer'],
          ['Bitter, slow (>35s)', 'Over-extracted / too fine', 'Grind coarser'],
          ['Thin / hollow', 'Ratio too long for beans', 'Lower ratio (ristretto-ward)'],
          ['Harsh / drying', 'Over-extracted or channeled', 'Coarser or longer ratio carefully'],
          ['Good time, bad taste', 'Distribution / channeling', 'WDT, level tamp, fresh beans'],
        ],
      },
    ],
  },

  'caffeine-day-planner': {
    intro:
      'Most “caffeine calculators” answer one drink. Cutting back needs a calendar: what you drank Monday vs Thursday, whether your week average is falling, and whether late cups still wreck sleep. This caffeine tracker logs drinks or custom milligrams by day in your browser’s local storage, shows a month calendar, graphs weekly/monthly trends against a cut-down goal, flags after-cutoff drinks, and exports CSV. Educational only — not medical advice.',
    howToUse: [
      {
        step: 'Set a daily goal (especially if you are cutting)',
        detail:
          'Pick Standard (~400 mg), Cutting — moderate (200), low (100), taper (50), or a custom cap. The calendar and charts use that line so over-goal days are obvious.',
      },
      {
        step: 'Log drinks or raw mg on any day',
        detail:
          'Tap a calendar day, choose a preset (brewed, espresso, cold brew, tea, energy, decaf…) or Custom mg, set a time, and hit Log. Data saves automatically on this device.',
      },
      {
        step: 'Read the week and month trends',
        detail:
          'Summary cards show today, 7-day average, month average, vs-last-week %, and under-goal streak. Switch Trends between this week and this month bars.',
      },
      {
        step: 'Protect sleep while you taper',
        detail:
          'Set bedtime and cutoff buffer hours. Suggested last-caffeine time updates; late logs are flagged. Export CSV anytime for a backup.',
      },
    ],
    proTips: [
      'Reduce ~25–50 mg every few days — cold turkey often causes headaches and rebound coffee binges.',
      'Watch the 7-day average, not one perfect day. A green streak under goal is the real taper signal.',
      'Cold brew and large café cups hide milligrams — use labels or the caffeine calculator, then log custom mg.',
      'Feeling fine at 9 pm does not mean caffeine is gone — sleep quality often suffers first.',
    ],
    whyItMatters:
      'Searches like “caffeine tracker,” “how to reduce caffeine intake,” “daily caffeine tracker,” and “what time should I stop drinking coffee” need a private log plus trends — not a one-off math toy. Keeping the same /tools/caffeine-day-planner URL preserves existing rankings while the tool matches cut-down intent.',
    relatedSlugs: [
      'caffeine-calculator',
      'caffeine-half-life-calculator',
      'coffee-calories-calculator',
      'hydration-calculator',
    ],
    answerTables: [
      {
        title: 'Rough caffeine by drink (tracker presets)',
        caption: 'Averages for orientation — brands and recipes vary.',
        headers: ['Drink', 'Approx caffeine'],
        rows: [
          ['Brewed coffee 8 oz', '95 mg'],
          ['Large drip 16 oz', '190 mg'],
          ['Espresso shot', '63 mg'],
          ['Double espresso / iced latte (2 shots)', '126 mg'],
          ['Cold brew 8 oz', '155 mg'],
          ['Energy drink (typical)', '160 mg'],
          ['Decaf 8 oz', '~3 mg'],
        ],
      },
      {
        title: 'Simple cut-down ladder',
        headers: ['Phase', 'Daily goal idea', 'Swap idea'],
        rows: [
          ['Baseline week', 'Log only — no cut yet', 'Learn your real average'],
          ['First cut', '~200 mg', 'Drop the largest afternoon cup'],
          ['Steady', '~100 mg', 'One drip or two teas; half-caf second cup'],
          ['Taper', '~50 mg', 'Tea / half-caf / decaf ritual after noon'],
        ],
      },
      {
        title: 'Why timing still matters while tracking',
        headers: ['Pattern', 'What usually happens'],
        rows: [
          ['2 × 95 mg at 8 am only', 'Often fine for a late bedtime'],
          ['95 mg at 8 am + 126 mg at 3 pm', 'Meaningful caffeine may remain at night'],
          ['Under goal but late energy drink', 'Total looks fine; sleep still suffers'],
          ['Week average falling, one spike day', 'Normal — keep logging; don’t abandon the taper'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'How to reduce caffeine without quitting coffee',
        paragraphs: [
          'Track first for a few days so the goal is based on your real stack, not a guess. Then lower the daily cap in steps and replace volume with half-caf, smaller sizes, or tea — keep the mug ritual. The under-goal streak and week-over-week % on this tracker show whether the plan is working.',
          'If anxiety or sleep is the reason you are cutting, pair this log with our coffee and anxiety guide and the caffeine half-life calculator for leftover-mg timelines.',
        ],
      },
      {
        heading: 'Bedtime cutoff explainer',
        paragraphs: [
          'A cutoff is a buffer between your last caffeinated drink and lights-out — often ~8 hours, closer to 10 if you are sensitive. It is not a hard medical rule. Use the suggested time, then adjust from how you actually sleep for a week.',
          'For remaining milligrams hour-by-hour, switch to the caffeine half-life calculator. For daily limits in prose form, see “how much coffee is too much?”',
        ],
      },
    ],
  },

  'caffeine-calculator': {
    intro:
      'People search “80 mg caffeine how many cups,” “200 mg,” and “400 mg” as often as “caffeine calculator.” This tool leads with mg → cups presets (80, 100, 150, 190, 200, 400), stacks mixed drinks against the ~400 mg guideline, compares latte vs drip vs cold brew, and links the caffeine tracker / half-life tools for timing.',
    howToUse: [
      {
        step: 'Tap an mg → cups preset',
        detail:
          '80, 100, 150, 190, 200, or 400 mg converts into drip / latte / cold brew servings instantly (~95 mg per 8 oz drip).',
      },
      {
        step: 'Or build a multi-drink stack',
        detail:
          'Add drip, latte, espresso, cold brew, soda, energy drinks, or custom mg. Quantities stack so mixed days are honest.',
      },
      {
        step: 'Watch the 400 mg bar',
        detail:
          'Total updates live. Orientation only — not medical advice. 200 mg is often moderate; sensitivity varies.',
      },
      {
        step: 'Follow timing links',
        detail:
          'Caffeine tracker for calendar logs and cut-down goals; half-life calculator for “when will it wear off.”',
      },
    ],
    proTips: [
      'A milky latte can still beat a drip mug on caffeine if it is a double shot.',
      'Cold brew 8 oz (~155 mg) is often higher than drip 8 oz (~95 mg).',
      'Half-life ~5–6 hours — afternoon stacks wreck sleep before you feel wired.',
      'Decaf is not zero; stack it if you are sensitive.',
    ],
    whyItMatters:
      'mg-to-cups queries (80–400) plus “latte vs drip” and “is 200 mg a lot” are the growth cluster. Presets + stack math + timing links keep that intent on one page.',
    relatedSlugs: [
      'caffeine-day-planner',
      'caffeine-half-life-calculator',
      'cold-brew-calculator',
      'iced-coffee-calculator',
      'espresso-ratio-calculator',
      'drip-coffee-calculator',
      'coffee-calories-calculator',
    ],
    answerTables: [
      {
        title: 'Caffeine in common coffee drinks',
        caption: 'Typical averages — brands and recipes vary. Decaf is not zero.',
        headers: ['Drink', 'Serving', 'Approx caffeine'],
        rows: [
          ['Brewed drip', '8 oz', '95 mg'],
          ['Latte (2 shots)', '1 drink', '126 mg'],
          ['Large drip', '16 oz', '190 mg'],
          ['Espresso', '1 shot (~1 oz)', '63 mg'],
          ['Cold brew', '8 oz', '155 mg'],
          ['Cola / soda', '12 oz', '~34 mg'],
          ['Decaf coffee', '8 oz', '2–15 mg'],
        ],
      },
      {
        title: 'How many cups is X mg of caffeine?',
        headers: ['Caffeine', '≈ Brewed 8 oz', '≈ Espresso shots', '≈ Cold brew 8 oz'],
        rows: [
          ['130 mg', '1.4 cups', '2.1 shots', '0.8 cups'],
          ['155 mg', '1.6 cups', '2.5 shots', '1.0 cup'],
          ['200 mg', '2.1 cups', '3.2 shots', '1.3 cups'],
          ['400 mg (daily guide)', '4.2 cups', '6.3 shots', '2.6 cups'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'Latte vs drip vs cold brew caffeine',
        paragraphs: [
          'Drip 8 oz ≈ 95 mg. Latte with two shots ≈ 126 mg. Cold brew 8 oz often ≈ 155 mg. Large drip 16 oz ≈ 190 mg. Milk does not cancel caffeine — stack the drinks you actually had.',
        ],
      },
      {
        heading: 'Is 200 mg a lot?',
        paragraphs: [
          'For many healthy adults, 200 mg is a moderate day (~two drip cups). The common upper guide is ~400 mg. If you feel anxious or sleep poorly at 200 mg, that is “a lot” for you — use the caffeine tracker and half-life tools, and talk to a clinician if needed.',
        ],
      },
      {
        heading: 'When will caffeine wear off?',
        paragraphs: [
          'Average half-life is about 5–6 hours. Open the half-life calculator for a timeline or the caffeine tracker for a bedtime cutoff and weekly trends. Feeling fine at 9 pm does not mean sleep quality is fine.',
        ],
      },
    ],
  },

  'coffee-calories-calculator': {
    intro:
      'Searches for “calories in latte,” “black coffee calories,” and “Starbucks latte calories homemade” never die — café menus hide the gap between a nearly zero-calorie black cup and a dessert drink. This calculator supports skim / 2% / whole / oat / almond milk, a custom café base kcal field, sugar extras, and a comparison table that respects those add-ins.',
    howToUse: [
      {
        step: 'Pick a drink or custom base',
        detail:
          'Black sizes stay near zero. Latte / cappuccino / mocha start a milk-forward build. Use Custom base when you have a café nutrition number (handy for chain vs home).',
      },
      {
        step: 'Choose milk type and amount',
        detail:
          'Skim, 2%, whole, oat, or almond — kcal per tablespoon updates automatically. Latte-style presets load a sensible milk volume you can tweak.',
      },
      {
        step: 'Add sugar and servings',
        detail:
          'Each teaspoon of sugar is about 16 kcal. Set servings per day for a realistic daily total.',
      },
      {
        step: 'Read the comparison table',
        detail:
          'Black vs homemade latte-ish vs mocha-ish vs chain-style sweet latte — all using your current sugar slider and milk type so extras are not ignored.',
      },
    ],
    proTips: [
      'Black coffee is the easiest “free” beverage in a calorie budget; syrup and large milk drinks are the trap.',
      'Barista oat milk often rivals 2% dairy; unsweetened almond is usually much lighter.',
      'For a homemade mocha, try our mocha drink recipe after you ballpark calories here.',
      'Chain nutrition PDFs beat guesses — paste that number into Custom base.',
    ],
    whyItMatters:
      'Liquid calories hide in milk type and syrup. Matching “Starbucks vs homemade” intent with honest extras keeps the tool useful beyond a static calorie table.',
    relatedSlugs: [
      'caffeine-calculator',
      'caffeine-half-life-calculator',
      'coffee-measurement-converter',
      'drip-coffee-calculator',
    ],
    answerTables: [
      {
        title: 'Calories in common coffee drinks',
        caption: 'Ballpark averages — recipes and milk types vary.',
        headers: ['Drink', 'Serving', 'Approx calories'],
        rows: [
          ['Black coffee', '8 oz', '~2 kcal'],
          ['Black coffee', '16 oz', '~5 kcal'],
          ['Espresso', '1 shot', '~3 kcal'],
          ['Latte (whole milk ballpark)', '12 oz', '~150 kcal'],
          ['Latte (skim ballpark)', '12 oz', '~100 kcal'],
          ['Mocha', '12 oz', '~290 kcal'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'Chain vs homemade coffee calories',
        paragraphs: [
          'Chain lattes vary by size, milk, and syrup pumps — a sweetened grande-style drink can land near ~200+ kcal before whipped cream. Homemade with weighed milk and no syrup is usually lower. Use Custom base for the café number, then keep your sugar slider on so the comparison table stays honest.',
          'Want the drink, not just the math? Our iced latte and mocha recipe pages walk through home versions you can portion yourself.',
        ],
      },
      {
        heading: 'Why black coffee is almost zero calories',
        paragraphs: [
          'Brewed coffee is mostly water plus a tiny amount of dissolved solids. Without milk or sugar, an 8 oz cup lands around 2 calories — negligible next to flavored café drinks.',
        ],
      },
    ],
  },

  'caffeine-half-life-calculator': {
    intro:
      '“How long does caffeine last?” and “when does caffeine leave your system?” are pharmacokinetics dressed as lifestyle worries. Average half-life in healthy adults is about 5–6 hours — so a 2 pm cold brew can still matter at 11 pm. This tool supports clock-time mode (drank at / bedtime), optional multi-dose stacking, and a remaining-mg timeline. Educational estimate only — not medical advice.',
    howToUse: [
      {
        step: 'Choose clock time or hours-since',
        detail:
          'Clock mode: set when you drank and when you go to bed (e.g. 2 pm → 11 pm). Hours-since mode: slide how long ago the primary dose was.',
      },
      {
        step: 'Pick a dose (and stack more if needed)',
        detail:
          'Use a drink preset or custom mg. Add optional extra doses with their own times so the “now” and bedtime totals reflect a real stack.',
      },
      {
        step: 'Adjust assumed half-life',
        detail:
          'Default ~5.5 h. Pregnancy often lengthens clearance; smoking can shorten it. Move the slider to explore — then trust sleep quality more than the number.',
      },
      {
        step: 'Read the timeline',
        detail:
          'See remaining mg from now across the next several hours, plus rough time until ~50% / 25% / 10% of the primary dose remains.',
      },
    ],
    proTips: [
      'Half-life ≠ “I feel normal.” Alertness fades before caffeine fully clears.',
      'Two coffees four hours apart leave more at bedtime than one morning cup — use the stack.',
      'Smoking / pregnancy / medications change clearance; the disclaimer is there for a reason.',
      'For a calendar log, cut-down goals, and bedtime cutoff, open the caffeine tracker.',
    ],
    whyItMatters:
      'High-intent sleep queries need clock math and caveats, not only a single half-life factoid. Timeline + multi-dose + pregnancy/smoking notes keep the tool honest while feeding the anxiety/sleep content cluster.',
    relatedSlugs: [
      'caffeine-day-planner',
      'caffeine-calculator',
      'coffee-calories-calculator',
      'cold-brew-calculator',
      'espresso-ratio-calculator',
    ],
    answerTables: [
      {
        title: 'Rough remaining caffeine (5.5 h half-life)',
        caption: 'Starting from a 190 mg large drip at hour 0 — single dose.',
        headers: ['Hours later', 'Approx left', '% of dose'],
        rows: [
          ['0 h', '190 mg', '100%'],
          ['3 h', '132 mg', '~70%'],
          ['5.5 h', '95 mg', '50%'],
          ['8 h', '70 mg', '~37%'],
          ['11 h', '48 mg', '25%'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'Timeline FAQ: when caffeine leaves your system',
        paragraphs: [
          'Caffeine does not “leave” at a single moment. After one half-life roughly half remains; after two, about a quarter. Trace amounts linger longer. Use the on-page timeline for a stack-aware curve, and remember subjective “I’m fine” is a poor sleep proxy.',
        ],
      },
      {
        heading: 'Smoking, pregnancy, and half-life caveats (disclaimer)',
        paragraphs: [
          'Pregnancy commonly slows caffeine clearance (longer half-life). Smoking can speed metabolism (shorter half-life). Genetics and medications also matter. This calculator is for education and planning conversations — not diagnosis, dosing advice, or a substitute for clinical guidance.',
        ],
      },
      {
        heading: 'Coffee and anxiety timing',
        paragraphs: [
          'Caffeine’s stimulant window overlaps with anxious body signals. Spacing doses and avoiding huge late boluses helps many people keep coffee without the panic-adjacent feeling — see our coffee and anxiety guide, and use the caffeine tracker for cutoffs and trends.',
        ],
      },
    ],
  },

  'coffee-measurement-converter': {
    intro:
      'Recipes say grams; kitchens use tablespoons and scoops — and density changes with whole bean vs ground, grind size, and level vs heaping. This converter toggles those variables, expands the conversion table, and explains why scales beat scoops for “how many grams in a tablespoon of coffee” and “coffee scoop to grams.”',
    howToUse: [
      {
        step: 'Toggle ground vs whole bean',
        detail:
          'Ground defaults ~5.3 g per level tbsp; whole bean ~4.5 g — beans pack lighter by volume.',
      },
      {
        step: 'Choose level or heaping',
        detail:
          'Heaping adds a rough ~30% in this estimate. Level is the fair comparison to recipe cards.',
      },
      {
        step: 'Enter amount and unit',
        detail:
          'Grams, tablespoons, scoops (2 tbsp), or teaspoons — all four outputs update together.',
      },
      {
        step: 'Use the expanded table',
        detail:
          'Common gram targets (10–100 g) plus 1 tbsp and 1 scoop rows update with your density settings.',
      },
    ],
    proTips: [
      'Standard scoop ≈ 2 tbsp ≈ 10 g level ground — heaping and whole-bean change that fast.',
      '“One scoop per cup” on drip machines assumes tiny cups; check the drip calculator.',
      'Inconsistent cups week to week? Density shifted — weigh instead.',
      'A $10 scale makes every other tool on this site actually repeatable.',
    ],
    whyItMatters:
      'High-intent spoon queries need honest density toggles, not a single magic number. The scales-vs-scoops section converts curiosity into better dosing habits.',
    relatedSlugs: [
      'drip-coffee-calculator',
      'french-press-calculator',
      'coffee-ratio-calculator',
      'caffeine-calculator',
    ],
    answerTables: [
      {
        title: 'Coffee grams to tablespoons (level ground ≈5.3 g/tbsp)',
        caption: 'Standard scoop ≈ 2 tbsp ≈ 10 g. Switch to whole-bean / heaping in the tool for other densities.',
        headers: ['Grams', 'Tablespoons', 'Scoops', 'Teaspoons'],
        rows: [
          ['10 g', '1.9 tbsp', '1.0 scoop', '5.7 tsp'],
          ['15 g', '2.8 tbsp', '1.5 scoops', '8.5 tsp'],
          ['16 g', '3.0 tbsp', '1.6 scoops', '9.1 tsp'],
          ['20 g', '3.8 tbsp', '2.0 scoops', '11.3 tsp'],
          ['30 g', '5.7 tbsp', '3.0 scoops', '17.0 tsp'],
          ['55 g', '10.4 tbsp', '5.5 scoops', '31.1 tsp'],
          ['70 g', '13.2 tbsp', '7.0 scoops', '39.6 tsp'],
          ['100 g', '18.9 tbsp', '10.0 scoops', '56.6 tsp'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'Why scales beat scoops',
        paragraphs: [
          'The same spoon can swing 30–50% by roast, grind, and packing. Level vs heaping is another silent error. Grams remove the guesswork so ratio calculators and drip pot recipes actually match what you brew.',
        ],
      },
    ],
  },

  'grind-size-chart': {
    intro:
      'Grind size controls extraction rate. Finer grinds have more surface area — espresso needs ~25–30 seconds; French press ~4 minutes. This interactive chart lets you pick a method to highlight the matching grind, micron ballpark, photo-style “feels like” analogy, and too-fine / too-coarse symptoms. Pair with the brewing ratios guide so you are not fighting two unknowns.',
    howToUse: [
      {
        step: 'Pick your brew method',
        detail:
          'Tap Espresso, Drip, French press, Pour over, and more. The recommended grind row highlights with micron range and symptom cards.',
      },
      {
        step: 'Match the texture analogy',
        detail:
          'Rub a pinch between your fingers. Espresso ≈ powdered sugar; medium drip ≈ coarse sand; French press ≈ sea salt. Trust texture over a printed dial number.',
      },
      {
        step: 'Use too-fine / too-coarse symptoms',
        detail:
          'Sour & fast → finer. Bitter & stalled → coarser. Change grind before ratio. Espresso reacts to half-clicks; drip may need several steps.',
      },
    ],
    proTips: [
      'Blade grinders make dust + boulders — charts assume burr grinders.',
      'Purge a few grams after changing settings; old grind sits in the chamber.',
      'Micron ranges are approximate — brands differ. Texture wins.',
      'Deep-link with ?method=french-press or ?method=espresso for shareable SEO landing states.',
      'Full ratio + grind table: open the brewing ratios & grind size chart guide.',
    ],
    whyItMatters:
      'Queries like “espresso grind vs drip,” “French press grind size,” and “what does medium grind look like” need method filtering plus tactile analogies — not a static poster. Most bad home coffee is grind first.',
    relatedSlugs: [
      'coffee-ratio-calculator',
      'brew-timer',
      'espresso-ratio-calculator',
      'french-press-calculator',
    ],
    answerTables: [
      {
        title: 'Grind vs what went wrong',
        caption: 'Change grind first. Ratio second.',
        headers: ['Taste / behavior', 'Likely grind issue', 'Move'],
        rows: [
          ['Sour, thin, finishes fast', 'Too coarse / under-extracted', 'Finer'],
          ['Bitter, drying, stalls', 'Too fine / over-extracted', 'Coarser'],
          ['Muddy French press', 'Too fine for mesh', 'Much coarser'],
          ['Espresso gushes <20s', 'Too coarse for basket', 'Finer'],
          ['Espresso chokes >40s', 'Too fine', 'Coarser'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'Method filter: espresso vs drip vs French press',
        paragraphs: [
          'Espresso is fine (~300–400 μm) so pressurized water can extract in ~25–30 seconds. Drip is medium (~700–900 μm) for a longer gravity brew. French press is coarse (~1100–1400 μm) for a 4-minute steep through a mesh filter. Use the picker above to jump between those worlds without scrolling a wall of text.',
        ],
      },
      {
        heading: 'Photo analogies for grind texture',
        paragraphs: [
          'No camera needed: powdered sugar (extra fine / Turkish), table salt (fine espresso), fine sand (pour over), coarse sand (drip / “medium”), sea salt (French press), peppercorns (cold brew). If your grounds look like the wrong pantry item for the method, fix grind before chasing new beans.',
        ],
      },
    ],
  },

  'world-coffee-map': {
    intro:
      'Coffee is a product of place. The same Coffea arabica plant grown at 800 meters in Brazil produces a completely different cup than one grown at 2,000 meters in Ethiopia — and both taste nothing like a Sumatran. Altitude, soil, rainfall, temperature, species (Arabica vs Robusta), and processing after harvest shape flavor in ways no grind setting can fake. This map covers 29 producing origins across the coffee belt — including Hawaii (Kona), Bolivia, and Thailand. Search by name, filter by cup style or species, compare two countries side by side, or deep-link a profile with the share button.',
    howToUse: [
      {
        step: 'Search, filter, or browse the list',
        detail:
          'Type Ethiopia, Gesha, Robusta, or honey process. Filter by belt (Africa / Americas / Asia), cup style (bright, floral, chocolate, earthy), or species. Colored countries on the map are producers. Tiny islands and Hawaii are easier from the chip list or desktop side panel than from the globe.',
      },
      {
        step: 'Open a country profile',
        detail:
          'Tap a country or chip. You get altitude, harvest, flavors, process, varietals, cup bars (acidity / body / sweetness), caffeine level, and a brew that usually suits that origin. The URL hash updates so you can copy a link to Ethiopia, Kenya, etc.',
      },
      {
        step: 'Compare two origins',
        detail:
          'Turn on Compare and pick two countries. Side-by-side bars and a metric table show acidity, body, sweetness, caffeine, altitude, and process — useful when you are stuck between Kenya vs Ethiopia or Brazil vs Sumatra.',
      },
      {
        step: 'Use species + process as buying clues',
        detail:
          'Arabica is the specialty default. Robusta (Vietnam and much of Uganda) is heavier and more caffeinated. Natural processing tends to be fruity and winey; washed is cleaner; honey sits in between; wet-hulled Sumatra is its own earthy category.',
      },
    ],
    proTips: [
      'Single-origin coffees highlight the terroir of one farm or region. Blends balance multiple origins for consistency. For exploring coffee origins, always start with single-origin bags.',
      'Roast level can mask or enhance origin character. Light roasts preserve the most origin flavor — fruity Ethiopian naturals are best enjoyed light. Dark roasts shift character toward roast-driven chocolate and smoke.',
      'The processing method is often listed on specialty coffee bags and is as important as origin for predicting flavor.',
      'If you want high-acidity coffees, filter “Bright & fruity” (Kenya, Ethiopia, Burundi). For low-acid, smooth cups, try chocolate/earthy filters (Brazil, Sumatra, India monsooned).',
      'Luxury labels (Kona, Blue Mountain, Panama Gesha) are tiny GI zones — counterfeits and blends are common. Read the bag, not just the buzzword.',
    ],
    whyItMatters:
      'Understanding origin is the fastest way to reliably buy coffee you will enjoy. Instead of guessing from vague tasting notes on a bag, knowing that you love washed Ethiopian pour overs or low-acid Brazilian espresso means you can walk into any specialty coffee shop and know exactly what to ask for.',
    relatedSlugs: [
      'grind-size-chart',
      'coffee-ratio-calculator',
      'brew-timer',
      'caffeine-calculator',
    ],
    answerTables: [
      {
        title: 'Who grows the coffee (ballpark)',
        caption: 'Shares move year to year. Brazil and Vietnam dominate volume; East Africa dominates specialty menus.',
        headers: ['Origin', 'Typical role', 'Cup in one line'],
        rows: [
          ['Brazil', '#1 volume', 'Low-acid chocolate and nut; espresso backbone'],
          ['Vietnam', '#2 volume, mostly Robusta', 'Heavy, high caffeine; phin and blends'],
          ['Colombia', '#3, washed Arabica', 'Caramel, apple, reliable daily filter'],
          ['Indonesia', 'Wet-hulled Sumatra', 'Earthy, syrupy, low acid'],
          ['Ethiopia', 'Arabica homeland', 'Floral, blueberry, jasmine pour over'],
          ['Kenya', 'Specialty auction lots', 'Blackcurrant, grapefruit, very bright'],
          ['Hawaii (Kona)', 'Tiny GI luxury lot', 'Mild, clean, low acid — watch for blends'],
          ['Panama', 'Gesha auctions', 'Jasmine, tropical, tea-like luxury cups'],
          ['Thailand', 'Rising northern specialty', 'Chocolate, spice; Arabica + Robusta'],
          ['Bolivia', 'High Andean specialty', 'Stone fruit, caramel, clean washed'],
        ],
      },
      {
        title: 'Cup-style shortcuts',
        caption: 'Use the map filters with the same names. These are starting points, not rules.',
        headers: ['If you like…', 'Filter', 'Try first'],
        rows: [
          ['Bright citrus / berry', 'Bright & fruity', 'Kenya, Ethiopia, Burundi, Rwanda'],
          ['Tea-like florals', 'Floral & tea-like', 'Ethiopia, Panama Gesha, Rwanda'],
          ['Chocolate / nut espresso', 'Chocolate & nutty', 'Brazil, Guatemala, Nicaragua'],
          ['Heavy, earthy body', 'Earthy & heavy', 'Indonesia (Sumatra), India, Vietnam'],
        ],
      },
      {
        title: 'Origin vs roast pairing',
        caption: 'Origin sets the ceiling; roast decides how much of it you taste.',
        headers: ['Origin vibe', 'Roast tip', 'Brew next'],
        rows: [
          ['Ethiopia floral / berry', 'Keep light–medium', 'Pour over · ratio 1:16'],
          ['Colombia caramel / apple', 'Medium for daily cups', 'Drip or espresso blend'],
          ['Brazil chocolate / nut', 'Medium–dark for milk drinks', 'Espresso ratio tool'],
          ['Vietnam robusta / phin', 'Dark, chocolatey', 'Iced / Vietnamese recipe'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'Ethiopia vs Colombia (and how to choose)',
        paragraphs: [
          'If you want jasmine, blueberry, and tea-like brightness, start with Ethiopia (or Kenya). If you want caramel, red apple, and a forgiving everyday bag, start with Colombia. Use Compare, then copy the compare link or print the card.',
          'Neither is “better” — they answer different cravings. Light roast preserves Ethiopia’s fireworks; medium roast makes Colombia a workhorse for drip and milk drinks.',
        ],
      },
      {
        heading: 'Best origins for espresso vs filter',
        paragraphs: [
          'Espresso and milk drinks often favor Brazil and chocolatey Central America. Bright East African lots can be stunning as single-origin espresso but will taste sharper in milk. Filter (pour over, drip) is where Ethiopia and Kenya usually win.',
          'Open any origin profile for Brew this origin links into ratio, grind, iced, or espresso tools — then dial taste in Coffee Lab if you want a simulated cup before you waste beans.',
        ],
      },
    ],
  },

  'coffee-lab': {
    intro:
      'Every variable in coffee brewing — grind size, water temperature, brew ratio, roast level, and bean origin — affects extraction, and extraction determines flavor. The problem is that most people change one thing and taste a completely different cup, making it hard to know which variable was responsible. The Coffee Lab Simulator models these relationships interactively: adjust any variable, hit Brew, then use Apply fix links (grind chart, ratio calculator, brew timer, espresso dial-in) when the cup would taste bitter, sour, or under-extracted.',
    howToUse: [
      {
        step: 'Choose your bean origin and brew method',
        detail:
          'Different origins start with different baseline acidity, sweetness, and aroma. Ethiopia starts very acidic and aromatic; Brazil starts low-acid and full-bodied. The brew method modifies body, bitterness, and acidity independently.',
      },
      {
        step: 'Set your roast level',
        detail:
          'Light roasts preserve origin character — floral, fruity, bright. Dark roasts develop roast flavors — chocolate, caramel, smoke — and reduce acidity. Watch how bitterness climbs and acidity drops as you drag the slider right.',
      },
      {
        step: 'Dial in grind, temperature, and ratio',
        detail:
          'Grind is the extraction rate dial: fine grinds extract fast (more bitterness risk), coarse grinds extract slow (sourness risk). Temperature amplifies extraction — especially significant for light roasts. Ratio controls strength and body.',
      },
      {
        step: 'Hit Brew, read the verdict, apply a fix',
        detail:
          'Extraction percentage shows under / ideal / over. Apply fix deep-links to the grind chart, ratio calculator, or espresso tools with presets. Copy the shareable result link to reopen the same dial-in later.',
      },
    ],
    proTips: [
      'The sweet spot for extraction is roughly 55–75% on the simulator scale. Under that and you get sourness and thin body; over it and bitterness dominates.',
      'Cold Brew is the most forgiving method for over-extraction — the low temperature suppresses bitterness significantly. Try a dark roast on coarse grind in Cold Brew mode.',
      'Kenya at light roast with high temperature on Pour Over will show the most extreme acidity spike — accurate to how bright real Kenyan beans can be.',
      'Espresso amplifies everything: more body, more bitterness, and more intensity. A recipe that is slightly over-extracted in pour over becomes very harsh in espresso.',
      'Medium roast is the most forgiving roast level — it sits in the sweetness peak and balances acidity and bitterness for most origins and methods.',
    ],
    whyItMatters:
      'Most coffee guides give you a recipe. This simulator gives you the underlying logic — so when your cup is sour, you understand why finer grind or higher temp will fix it; when it is bitter, you know to go coarser or pull back the temperature. Apply fix turns that logic into the next click on a real calculator.',
    relatedSlugs: ['coffee-ratio-calculator', 'grind-size-chart', 'brew-timer', 'espresso-ratio-calculator'],
    answerTables: [
      {
        title: 'Cup problem → first fix',
        caption: 'Change one variable at a time. Grind first for bitter vs sour.',
        headers: ['What you taste', 'Likely cause', 'Try first'],
        rows: [
          ['Sour, thin, hollow', 'Under-extracted', 'Finer grind or hotter water'],
          ['Bitter, drying, harsh', 'Over-extracted', 'Coarser grind or cooler water'],
          ['Sour espresso shot', 'Under-extracted / too short', 'Finer grind or ~1:2 normale'],
          ['Flat / weak', 'Too much water', 'Stronger ratio (e.g. 1:15)'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'Why is my coffee bitter?',
        paragraphs: [
          'Bitterness usually means you extracted too far — fine grind, long contact time, or scalding water on a dark roast. In the lab, push grind fine and temp high on a dark roast to see bitterness climb, then use Apply fix → grind coarser.',
          'Not all bitterness is a mistake: dark roast and espresso naturally carry more. If the cup is bitter and hollow, that is over-extraction; if it is bitter but sweet and heavy, you may just prefer a lighter roast.',
        ],
      },
      {
        heading: 'Under-extracted and sour coffee',
        paragraphs: [
          'Under-extracted coffee tastes sharp and unfinished — lemony without sweetness. Coarse grind and cool water are the usual culprits. The simulator’s under-extraction verdict links to a finer grind and a slightly stronger ratio.',
          'Sour espresso gets the same logic with a shot-ratio tool: stay near 1:2 normale before you blame the beans.',
        ],
      },
    ],
  },
  ...TRENDING_TOOL_CONTENT,
}

/* ----------------------------- Helpers ----------------------------- */

export function getTool(slug: string) {
  return TOOLS.find((t) => t.slug === slug)
}

export function getToolContent(slug: string) {
  return TOOL_CONTENT[slug] ?? null
}
export function getBrewGuide(slug: string) {
  return BREW_GUIDES.find((g) => g.slug === slug)
}
export function getGearItem(slug: string) {
  return GEAR.find((g) => g.slug === slug)
}
export function getSetup(slug: string) {
  return SETUPS.find((s) => s.slug === slug)
}
export function getBeanArticle(slug: string) {
  return BEAN_ARTICLES.find((a) => a.slug === slug)
}
