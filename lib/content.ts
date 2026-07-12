export const SITE = {
  name: 'KickerCoffee',
  domain: 'kickercoffee.com',
  url: 'https://www.kickercoffee.com',
  description:
    'KickerCoffee is your complete coffee resource: step-by-step brewing guides, honest gear reviews, curated home setups, roast education, and free brewing calculators for beginners and experts alike.',
  tagline: 'Everything coffee, from first pour to pro setup.',
}

export type NavItem = { label: string; href: string; description: string }

export const NAV: NavItem[] = [
  {
    label: 'Brewing Guides',
    href: '/brewing-guides',
    description: 'Step-by-step recipes for every brew method.',
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

/* ----------------------------- Shared types ----------------------------- */

export type ContentBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'steps'; items: string[] }
  | { type: 'tip'; text: string }
  | { type: 'quote'; text: string }

export type FaqItem = { question: string; answer: string }

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
}

export const BREW_GUIDES: BrewGuide[] = [
  {
    slug: 'how-to-make-pour-over-coffee',
    method: 'Pour Over',
    title: 'How to Make Pour Over Coffee (V60 Step-by-Step Guide)',
    metaDescription:
      'Learn how to make pour over coffee at home with our step-by-step V60 guide. Get the ideal coffee-to-water ratio, grind size, and pouring technique for a clean, sweet cup.',
    excerpt:
      'A clean, bright, and endlessly repeatable cup. Master the V60 pour over with the exact ratio, grind, and pour schedule the pros use.',
    difficulty: 'Beginner',
    brewTime: '3–4 min',
    ratio: '1:16 (60 g/L)',
    grind: 'Medium-fine',
    yield: '1–2 cups',
    updated: '2026-06-15',
    image: '/images/pour-over-hero.png',
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
    title: 'French Press Coffee Ratio & Method (Step-by-Step Technique)',
    metaDescription:
      'French press coffee ratio, method, and technique: the ideal 1:15 coffee-to-water ratio, grind size, and 4-minute steep for a full-bodied cup every morning.',
    excerpt:
      'Rich, full-bodied, and nearly foolproof. Get the French press coffee ratio, grind, and 4-minute steep dialed in.',
    difficulty: 'Beginner',
    brewTime: '4–5 min',
    ratio: '1:15 (67 g/L)',
    grind: 'Coarse',
    yield: '3–4 cups',
    updated: '2026-07-12',
    image: '/images/french-press-hero.png',
    intro:
      'The French press (or cafetière) is immersion brewing at its simplest. Because the metal mesh filter lets natural oils through, it produces a heavier, richer body than paper-filtered methods. There is no pour technique to master and no specialized equipment beyond a press and a scale — making it one of the most forgiving ways to brew genuinely great coffee at home.',
    body: [
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
    title: 'How to Use an AeroPress: Recipes for a Smooth Cup',
    metaDescription:
      'A complete AeroPress guide with the standard and inverted methods, ratios, grind size, and steep times for a smooth, low-acidity cup of coffee.',
    excerpt:
      'Compact, travel-friendly, and incredibly versatile. Learn the standard and inverted AeroPress methods.',
    difficulty: 'Beginner',
    brewTime: '1–2 min',
    ratio: '1:14 to 1:16',
    grind: 'Medium-fine',
    yield: '1 cup',
    updated: '2026-05-28',
    image: '/images/aeropress-hero.png',
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
    ],
  },
  {
    slug: 'how-to-pull-espresso-shot',
    method: 'Espresso',
    title: 'How to Pull a Perfect Espresso Shot at Home',
    metaDescription:
      'Learn how to pull a perfect espresso shot: dose, grind, tamp, and the ideal brew ratio and shot time. A beginner-friendly guide to dialing in espresso.',
    excerpt:
      'Concentrated, syrupy, and the base of every latte and cappuccino. Learn to dial in a balanced shot.',
    difficulty: 'Advanced',
    brewTime: '25–30 sec',
    ratio: '1:2 (18 g in, 36 g out)',
    grind: 'Fine',
    yield: '1 double shot',
    updated: '2026-06-01',
    image: '/images/espresso-hero.png',
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
    ],
  },
  {
    slug: 'cold-brew-coffee-recipe',
    method: 'Cold Brew',
    title: 'Cold Brew Coffee: Easy Overnight Recipe and Ratio',
    metaDescription:
      'Make smooth, low-acidity cold brew coffee at home. Get the cold brew ratio, grind size, steep time, and how to store and dilute the concentrate.',
    excerpt:
      'Smooth, sweet, and low in acidity. Steep coarse grounds overnight for a concentrate you can keep all week.',
    difficulty: 'Beginner',
    brewTime: '12–18 hrs',
    ratio: '1:8 concentrate',
    grind: 'Coarse',
    yield: '4–6 cups',
    updated: '2026-05-20',
    image: '/images/cold-brew-hero.png',
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
    title: 'Moka Pot Guide: Stovetop Coffee Done Right',
    metaDescription:
      'How to use a Moka pot for rich, espresso-style stovetop coffee without bitterness. Get the grind, heat level, and technique that avoids burnt flavors.',
    excerpt:
      'The classic Italian stovetop brewer. Get a rich, espresso-style cup without the bitterness.',
    difficulty: 'Intermediate',
    brewTime: '5 min',
    ratio: 'Fill the basket',
    grind: 'Fine-medium',
    yield: '2–3 cups',
    updated: '2026-04-30',
    image: '/images/moka-pot-hero.png',
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
    ],
  },
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
}

export const GEAR: GearItem[] = [
  {
    slug: 'best-burr-coffee-grinders',
    category: 'Grinder',
    name: 'Burr Coffee Grinders',
    title: 'Best Burr Coffee Grinders for Every Budget (2026)',
    metaDescription:
      'Best coffee burr grinders for every budget — plus why a burr grinder beats a blade grinder. Hand and electric picks for pour over, drip, and espresso.',
    excerpt:
      'The single most important upgrade for better coffee. Our budget-to-premium burr grinder picks.',
    priceRange: '$40–$700',
    bestFor: 'Everyone — upgrade this first',
    rating: 4.8,
    updated: '2026-06-12',
    image: '/images/grinder-hero.png',
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
        question: 'Ceramic vs steel burrs — which is better?',
        answer:
          'Steel burrs are sharper and more common in higher-end grinders; they cut cleanly and stay precise. Ceramic burrs stay sharp a long time and run cooler, but can chip if a stone hits them. For most home buyers, burr quality and alignment matter more than the material label alone.',
      },
    ],
  },
  {
    slug: 'best-gooseneck-kettles',
    category: 'Kettle',
    name: 'Gooseneck Kettles',
    title: 'Best Gooseneck Kettles for Pour Over Coffee',
    metaDescription:
      'The best gooseneck kettles for pour over coffee, including variable temperature electric models. Why the pour spout controls your extraction.',
    excerpt:
      'Precise pouring is half the battle in pour over. Our favorite variable-temperature gooseneck kettles.',
    priceRange: '$35–$180',
    bestFor: 'Pour over and drip enthusiasts',
    rating: 4.6,
    updated: '2026-05-18',
    image: '/images/kettle-hero.png',
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
  },
  {
    slug: 'best-coffee-scales',
    category: 'Scale',
    name: 'Coffee Scales',
    title: 'Best Coffee Scales with Timers for Precise Brewing',
    metaDescription:
      'The best coffee scales with built-in timers for pour over and espresso. Why weighing your coffee and water is the key to repeatable results.',
    excerpt:
      'Consistency starts with weighing. The best coffee scales with timers for repeatable brews.',
    priceRange: '$15–$150',
    bestFor: 'Anyone chasing consistency',
    rating: 4.5,
    updated: '2026-04-22',
    image: '/images/scale-hero.png',
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
  items: { name: string; why: string }[]
  faqs: FaqItem[]
}

export const SETUPS: Setup[] = [
  {
    slug: 'beginner-home-coffee-setup',
    title: 'The Best Beginner Home Coffee Setup Under $200',
    metaDescription:
      'A complete beginner home coffee setup under $200: grinder, brewer, kettle, and scale. Everything a rookie needs to brew great coffee at home.',
    excerpt: 'Everything a first-timer needs to brew genuinely great coffee, without overspending.',
    budget: 'Under $200',
    level: 'Rookie',
    image: '/images/setup-beginner-hero.png',
    intro:
      'You do not need an expensive machine to make delicious coffee. This starter kit prioritizes the things that actually move the needle: a burr grinder and a simple, forgiving brew method.',
    items: [
      { name: 'Hand burr grinder', why: 'Uniform grounds are the #1 flavor upgrade — and hand grinders are cheap.' },
      { name: 'Plastic V60 or AeroPress', why: 'Forgiving, durable, and cheap. Both make an excellent cup.' },
      { name: 'Basic gooseneck kettle', why: 'Precise pouring without breaking the bank.' },
      { name: '0.1 g coffee scale with timer', why: 'Makes your ratios repeatable from day one.' },
    ],
    faqs: [
      {
        question: 'What is the best beginner home coffee setup?',
        answer:
          'The best beginner setup puts most of the budget into a burr grinder, then pairs it with a simple brewer, a kettle, and a scale. That combination improves grind quality, consistency, and brew control without forcing you into expensive espresso gear too early.',
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
          'Usually the grinder. If you already have a decent grinder, the next step is often a more temperature-stable kettle or a better scale. Upgrades should remove a real bottleneck, not just add cost.',
      },
    ],
  },
  {
    slug: 'pro-espresso-setup',
    title: 'The Pro Home Espresso Setup: Café Quality at Home',
    metaDescription:
      'A pro home espresso setup for café-quality shots: dual-boiler machine, dedicated espresso grinder, and the accessories that dial in consistency.',
    excerpt: 'Café-quality shots at home. The machine, grinder, and accessories serious enthusiasts choose.',
    budget: '$1,500+',
    level: 'Enthusiast',
    image: '/images/setup-espresso-hero.png',
    intro:
      'When you are ready to chase espresso seriously, the grinder matters as much as the machine. This setup pairs temperature-stable brewing with a grinder that can resolve tiny adjustments.',
    items: [
      { name: 'Dual-boiler or heat-exchanger machine', why: 'Stable temperature and the ability to steam and brew at once.' },
      { name: 'Dedicated espresso grinder', why: 'Fine, stepless adjustment is essential for dialing in.' },
      { name: 'Precision tamper and distribution tool', why: 'Even puck prep prevents channeling.' },
      { name: 'Bottomless portafilter and shot scale', why: 'Diagnose extraction and hit ratios precisely.' },
    ],
    faqs: [
      {
        question: 'What is the best home espresso setup for serious enthusiasts?',
        answer:
          'A strong enthusiast setup usually combines a temperature-stable machine, a dedicated espresso grinder, and a few puck-prep tools that make extraction more consistent. The grinder is just as important as the machine because espresso depends on tiny grind adjustments.',
      },
      {
        question: 'Should I spend more on the espresso machine or the grinder?',
        answer:
          'If you have to prioritize, spend more on the grinder once the machine is competent and temperature-stable. A premium machine cannot rescue an inconsistent espresso grind, but a great grinder can make a modest machine perform far better.',
      },
      {
        question: 'Do I need a dual-boiler machine at home?',
        answer:
          'Not everyone does. Dual-boiler machines are most useful if you make milk drinks often, want tighter temperature control, or pull several drinks back to back. For occasional straight espresso, a simpler machine may be enough.',
      },
      {
        question: 'What accessories actually matter for espresso consistency?',
        answer:
          'A good scale, a tamper that fits your basket well, and a way to distribute grounds evenly matter far more than novelty gadgets. A bottomless portafilter is also useful because it shows channeling immediately and helps you diagnose puck-prep problems.',
      },
    ],
  },
]

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
}

export const BEAN_ARTICLES: BeanArticle[] = [
  {
    slug: 'coffee-roast-levels-explained',
    topic: 'Roasting',
    title: 'Coffee Roast Levels Explained: Light vs Medium vs Dark',
    metaDescription:
      'Types of coffee roasts explained: light, medium, and dark. Learn how the roast of coffee changes flavor, acidity, body, and caffeine — and which to choose.',
    excerpt: 'How roast level changes flavor, acidity, and body — and which one is right for you.',
    readTime: '6 min',
    updated: '2026-07-12',
    image: '/images/roast-levels-hero.png',
    intro:
      'Roast level is one of the biggest factors in how your coffee tastes. As beans roast longer, origin flavors give way to roast flavors. Understanding the spectrum helps you buy beans you will actually enjoy.',
    body: [
      { type: 'heading', text: 'Light roast' },
      {
        type: 'paragraph',
        text: 'Light roasts are pulled shortly after "first crack." They preserve the most origin character — think bright acidity, floral and fruity notes, and a lighter body. They are the specialty coffee favorite for showcasing single origins.',
      },
      { type: 'heading', text: 'Medium roast' },
      {
        type: 'paragraph',
        text: 'Medium roasts balance origin flavors with roast sweetness. Expect notes of caramel, chocolate, and nuts with moderate acidity and body. This is the most crowd-pleasing, versatile roast.',
      },
      { type: 'heading', text: 'Dark roast' },
      {
        type: 'paragraph',
        text: 'Dark roasts go past "second crack," developing bold, roasty, bittersweet flavors like dark chocolate and toast. Acidity drops, body increases, and origin character fades. Great for espresso and milk drinks.',
      },
      {
        type: 'tip',
        text: 'Contrary to popular belief, dark roast does not have more caffeine. By weight the difference is negligible; by scoop, light roast is denser and can have slightly more.',
      },
      { type: 'heading', text: 'How roast level changes brewing' },
      {
        type: 'paragraph',
        text: 'Roast level does not just change taste; it changes how the bean behaves in the grinder and brewer. Light roasts are denser and less porous, so they usually need a finer grind, hotter water, and sometimes slightly longer contact time to extract fully. Dark roasts are more brittle and soluble, so they often taste better with a coarser grind and a slightly lower water temperature. If you brew every roast with the same recipe, you are not making a fair comparison.',
      },
      { type: 'heading', text: 'How to choose the right roast for your taste' },
      {
        type: 'list',
        items: [
          'Choose light roast if you enjoy floral, fruity, tea-like coffees and mostly brew pour over or filter coffee.',
          'Choose medium roast if you want the widest brewing flexibility and a balance of sweetness, body, and acidity.',
          'Choose dark roast if you prefer low-acid, bold coffee or mainly make milk drinks, moka pot coffee, or traditional espresso.',
        ],
      },
      { type: 'heading', text: 'Roast labels can be inconsistent' },
      {
        type: 'paragraph',
        text: 'One roaster\'s medium roast can be another roaster\'s light-medium. Large grocery brands also tend to roast darker overall than specialty roasters using the same labels. That is why tasting notes and brew behavior are often more useful than the roast word printed on the bag. If a so-called medium roast tastes smoky and oily, treat it like a dark roast when you brew it.',
      },
    ],
    faqs: [
      {
        question: 'What are the types of coffee roasts?',
        answer:
          'The three main types of coffee roasts are light, medium, and dark. Light roasts taste bright and fruity, medium roasts balance sweetness and acidity, and dark roasts are bold, low-acid, and roast-forward. Some bags also use labels like “medium-dark” or “French roast,” which sit toward the darker end of the spectrum.',
      },
      {
        question: 'What is the roast of coffee?',
        answer:
          'Roast of coffee means how long and how dark the green beans were roasted. Light stops soon after first crack; medium balances origin and roast sweetness; dark goes toward or past second crack, trading origin nuance for bold, roasty flavors.',
      },
      {
        question: 'Which roast has the most caffeine?',
        answer:
          'They are nearly identical. Roast level has a minimal effect on caffeine. Any difference comes down to whether you measure by weight (dark slightly higher) or by scoop (light slightly higher).',
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
        question: 'Is medium roast the best for beginners?',
        answer:
          'Usually yes. Medium roast is the most forgiving across drip, pour over, French press, and espresso, with balanced sweetness and acidity. Start there, then explore lighter or darker once you know what you like.',
      },
    ],
  },
  {
    slug: 'coffee-bean-origins-guide',
    topic: 'Origins',
    title: 'Coffee Bean Origins: How Region Shapes Flavor',
    metaDescription:
      'A guide to coffee bean origins and how growing region shapes flavor. Compare African, Latin American, and Asian coffees — with country profiles, processing, and buying tips.',
    excerpt: 'Why Ethiopian coffee tastes like blueberries and Sumatran tastes earthy — origin decoded.',
    readTime: '12 min',
    updated: '2026-07-08',
    image: '/images/origins-hero.png',
    intro:
      'Where coffee grows — the soil, altitude, climate, varietal, and processing method — shapes its flavor as much as the roast. Coffee only thrives in the "Bean Belt" between the Tropics of Cancer and Capricorn, where warm days, cool nights, and seasonal rainfall let cherries ripen slowly and develop complex sugars. Learning regional flavor profiles helps you shop for beans you will love and understand why the same roast tastes completely different from one country to the next.',
    body: [
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
    title: 'How to Store Coffee Beans to Keep Them Fresh',
    metaDescription:
      'How to store coffee beans to keep them fresh: the right container, whether to freeze coffee, and how long beans last after roasting.',
    excerpt: 'Air, light, heat, and moisture are the enemies. Store beans right and taste the difference.',
    readTime: '5 min',
    updated: '2026-05-05',
    image: '/images/storage-hero.png',
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
  category: 'Calculator' | 'Timer' | 'Reference'
  keywords: string[]
  faqs: FaqItem[]
}

export const TOOLS: ToolMeta[] = [
  {
    slug: 'coffee-ratio-calculator',
    name: 'Coffee Ratio Calculator',
    title: 'Coffee-to-Water Ratio Calculator (Grams & Cups)',
    metaDescription:
      'Free coffee-to-water ratio calculator. Enter your cups, water, or coffee dose and instantly get the perfect measurements for pour over, drip, and French press.',
    excerpt:
      'Enter any one value — coffee, water, or cups — and get the perfect brew measurements for any ratio.',
    icon: 'Scale',
    category: 'Calculator',
    keywords: [
      'coffee to water ratio',
      'coffee ratio calculator',
      'how much coffee per cup',
      'golden ratio coffee',
    ],
    faqs: [
      {
        question: 'What is the golden ratio for coffee?',
        answer:
          'The "golden ratio" is roughly 1:15 to 1:18 — one gram of coffee for every 15 to 18 grams of water. A 1:16 ratio (about 62 grams of coffee per liter) is the most popular all-purpose starting point.',
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
          'Pour over and drip do well at 1:16–1:17. French press is often brewed a touch stronger at 1:15. Espresso is a different scale entirely, usually 1:2.',
      },
      {
        question: 'Is coffee ratio by weight or volume?',
        answer:
          'By weight. “1:16” means 1 gram of coffee to 16 grams of water (1 ml of water ≈ 1 g). Tablespoons are only an approximation because roast level and grind change how densely coffee packs.',
      },
      {
        question: 'Why does my coffee taste weak even at 1:16?',
        answer:
          'Weak flavor is often under-extraction, not only ratio — grind too coarse, water too cool, or brew time too short. Try grinding a bit finer before dropping to 1:15. Also confirm you are measuring water by weight, not eyeballing the mug.',
      },
    ],
  },
  {
    slug: 'drip-coffee-calculator',
    name: 'Drip Coffee Calculator',
    title: 'Drip Coffee Calculator (How Much Coffee for 4, 8, 10, or 12 Cups)',
    metaDescription:
      'Use our drip coffee calculator to find how much coffee you need for 4, 8, 10, or 12 cups. Convert coffee maker cups to grams, tablespoons, scoops, and water instantly.',
    excerpt:
      'How much coffee for your machine? Enter cups and get grams, tablespoons, scoops, and water for drip coffee instantly.',
    icon: 'Scale',
    category: 'Calculator',
    keywords: [
      'drip coffee calculator',
      'how much coffee for 12 cups',
      'how much coffee for 8 cups',
      'coffee maker ratio',
      'how many tablespoons of coffee per cup',
      'drip coffee ratio',
      'mr coffee ratio',
    ],
    faqs: [
      {
        question: 'How much coffee do I use for 12 cups of drip coffee?',
        answer:
          'For a standard 12-cup coffee maker using 5 oz machine cups, start with about 106 to 113 grams of coffee and roughly 1.8 liters of water, depending on strength. That is around 10 to 11 standard coffee scoops or about 20 to 21 tablespoons.',
      },
      {
        question: 'How much coffee for 8 cups in a coffee maker?',
        answer:
          'For 8 machine cups of drip coffee, a solid starting point is about 71 to 75 grams of coffee with roughly 1.2 liters of water. If you prefer a stronger pot, go slightly higher. If you want a lighter brew, back off by a few grams.',
      },
      {
        question: 'How much coffee for 10 cups?',
        answer:
          'For 10 coffee-maker cups (5 oz each), use about 88–94 g of coffee and roughly 1.5 liters of water at a standard drip ratio. That is roughly 9 scoops or 17–18 tablespoons if you do not have a scale.',
      },
      {
        question: 'What is the best drip coffee ratio?',
        answer:
          'A 1:16 to 1:17 coffee-to-water ratio is the best place to start for most drip coffee makers. That gives you enough strength and sweetness without making the pot taste heavy or bitter. Stronger drinkers often prefer 1:15.5 to 1:16.',
      },
      {
        question: 'Why does a coffee maker cup not equal a normal mug?',
        answer:
          'Most coffee makers define one cup as 5 ounces, not the 8-ounce cups people expect in recipes and kitchens. That is why 12-cup coffee makers do not actually produce 12 full mugs. This calculator accounts for that difference so the numbers make sense in the real world.',
      },
      {
        question: 'How many tablespoons of coffee for 12 cups?',
        answer:
          'About 20–21 tablespoons (roughly 106–113 g) for a 12-cup machine pot at standard strength. Tablespoons vary with grind and roast, so grams are more reliable when you can weigh.',
      },
    ],
  },
  {
    slug: 'french-press-calculator',
    name: 'French Press Calculator',
    title: 'French Press Coffee Ratio Calculator (Grams, Cups & Strength)',
    metaDescription:
      'Free French press coffee ratio calculator. Pick your press size and strength to get exact coffee and water amounts — classic 1:15 ratio, grind, and 4-minute steep.',
    excerpt:
      'Dial in French press coffee ratio by press size and strength. Get grams, tablespoons, grind, and steep time instantly.',
    icon: 'Coffee',
    category: 'Calculator',
    keywords: [
      'french press coffee ratio',
      'french press ratio',
      'french press calculator',
      'french press method',
      'french press coffee technique',
      'how much coffee for french press',
    ],
    faqs: [
      {
        question: 'What is the best French press coffee ratio?',
        answer:
          'A 1:15 coffee-to-water ratio is the classic French press starting point — about 67 grams of coffee per liter of water. Use 1:14 for a stronger cup or 1:16 for something lighter and more tea-like.',
      },
      {
        question: 'How much coffee do I use for an 8-cup French press?',
        answer:
          'An 8-cup French press holds about 1 liter (1000 g) of water. At the classic 1:15 ratio that is roughly 67 g of coarse-ground coffee, or about 12–13 tablespoons. Always leave a little headroom under the lid for the bloom.',
      },
      {
        question: 'How much coffee for a 4-cup French press?',
        answer:
          'A 4-cup press is about 500 g of water. At 1:15 that is roughly 33 g of coarse coffee (~6 tablespoons). At mild 1:16 use about 31 g; at strong 1:14 use about 36 g.',
      },
      {
        question: 'What grind size and steep time for French press?',
        answer:
          'Use a coarse grind (like sea salt) and steep for about 4 minutes. Too fine and the cup turns bitter and muddy; too long and bitterness creeps in. Press slowly and decant immediately so the coffee does not keep extracting.',
      },
      {
        question: 'Is French press coffee stronger than drip?',
        answer:
          'It often tastes stronger because the metal filter lets oils through and many people brew French press at a slightly stronger ratio (1:15 vs 1:16–1:17 for drip). Caffeine per ounce is similar if the dose is similar — body and mouthfeel are what feel “stronger.”',
      },
      {
        question: 'Why is my French press muddy?',
        answer:
          'Muddy cups usually mean the grind is too fine or you plunged too hard and forced fines through the mesh. Grind coarser, press gently, and pour soon after plunging. A quick secondary strain through a fine mesh helps if you hate sediment.',
      },
    ],
  },
  {
    slug: 'brew-timer',
    name: 'Pour Over Brew Timer',
    title: 'Pour Over Brew Timer (Guided Bloom & Pour Schedule)',
    metaDescription:
      'A free guided pour over brew timer. Follow the bloom and pour schedule with on-screen prompts and target weights for a perfect V60 or Kalita cup every time.',
    excerpt:
      'A guided timer that walks you through the bloom and pours with target weights and live prompts.',
    icon: 'Timer',
    category: 'Timer',
    keywords: ['pour over timer', 'coffee brew timer', 'v60 timer', 'coffee bloom timer'],
    faqs: [
      {
        question: 'How long should a pour over take?',
        answer:
          'A single-cup V60 usually finishes between 2:30 and 3:30 total, including a 30–45 second bloom. If it drains much faster grind finer; much slower, grind coarser.',
      },
      {
        question: 'What is the bloom?',
        answer:
          'The bloom is the first small pour that wets all the grounds and lets trapped CO₂ escape for 30–45 seconds. It leads to a more even extraction and a sweeter cup.',
      },
      {
        question: 'How long should I bloom coffee?',
        answer:
          'Bloom for 30–45 seconds with about 2–3× the coffee dose in water (for 20 g coffee, pour 40–60 g). Fresh light roasts often bloom vigorously and benefit from the full 45 seconds.',
      },
      {
        question: 'What water temperature for pour over?',
        answer:
          'Use about 93–96°C (200–205°F) for most light and medium roasts. Darker roasts can taste cleaner a bit cooler, around 88–92°C. If you do not have a variable kettle, boil and wait ~30 seconds before pouring.',
      },
      {
        question: 'Why is my pour over bitter?',
        answer:
          'Bitterness usually means over-extraction: grind too fine, pours too slow, or water too hot. Grind coarser by a click or two, keep total brew time under ~3:30, and avoid drowning the bed with aggressive pours.',
      },
    ],
  },
  {
    slug: 'cold-brew-calculator',
    name: 'Cold Brew Calculator',
    title: 'Cold Brew Coffee Ratio Calculator (Concentrate & Ready-to-Drink)',
    metaDescription:
      'Calculate exactly how much coffee and water you need for cold brew. Choose concentrate or ready-to-drink strength and scale to any batch size.',
    excerpt:
      'Scale cold brew to any jar or batch. Pick concentrate or ready-to-drink and get exact amounts.',
    icon: 'Snowflake',
    category: 'Calculator',
    keywords: [
      'cold brew ratio',
      'cold brew calculator',
      'cold brew concentrate ratio',
      'cold brew coffee ratio',
      'how long to steep cold brew',
    ],
    faqs: [
      {
        question: 'What is the best cold brew ratio?',
        answer:
          'Use about 1:8 coffee to water for a concentrate you dilute later, or 1:15 for a ready-to-drink batch. This calculator handles both.',
      },
      {
        question: 'How long should cold brew steep?',
        answer:
          'Steep coarse grounds in the fridge for 12–18 hours. Longer extracts more strength but can turn bitter past about 24 hours.',
      },
      {
        question: 'Is cold brew stronger than regular coffee?',
        answer:
          'Concentrate is much stronger until you dilute it. Ready-to-drink cold brew is often similar in caffeine per mug to hot drip, but concentrate packs more caffeine per ounce — dilute to taste.',
      },
      {
        question: 'What grind size for cold brew coffee?',
        answer:
          'Extra coarse — like cracked peppercorns. A medium grind over a 12-hour steep turns bitter, cloudy, and hard to filter.',
      },
      {
        question: 'Do you use hot or cold water for cold brew?',
        answer:
          'Cold or room-temperature water. Hot water makes Japanese iced coffee (flash brew), which is a different method. True cold brew extracts slowly without heat for a smoother, lower-acidity cup.',
      },
    ],
  },
  {
    slug: 'espresso-ratio-calculator',
    name: 'Espresso Ratio Calculator',
    title: 'Espresso Ratio Calculator (Dose In, Yield Out)',
    metaDescription:
      'Espresso brew ratio calculator. Enter your dose and target ratio to get your yield for ristretto, normale, and lungo shots — plus dial-in tips.',
    excerpt:
      'Enter your dose and target ratio to get the exact yield for ristretto, normale, or lungo shots.',
    icon: 'Coffee',
    category: 'Calculator',
    keywords: [
      'espresso ratio',
      'espresso brew ratio calculator',
      'dose to yield espresso',
      'ristretto vs lungo',
      '18g in 36g out',
    ],
    faqs: [
      {
        question: 'What is a normal espresso ratio?',
        answer:
          'A "normale" shot is 1:2 — for example 18 g of coffee in, 36 g of espresso out, in about 25–30 seconds. Ristretto is 1:1–1:1.5 and lungo is 1:3 or more.',
      },
      {
        question: 'What does 18 in 36 out mean?',
        answer:
          'It means you dose 18 grams of dry coffee into the portafilter and stop the shot when 36 grams of liquid espresso are in the cup — a classic 1:2 brew ratio. Weigh both with a scale; volume in the demitasse is less accurate.',
      },
      {
        question: 'How do I fix a sour or bitter shot?',
        answer:
          'Sour and fast usually means grind finer; bitter and slow means grind coarser. Change one variable at a time and keep the ratio consistent.',
      },
      {
        question: 'What is the difference between ristretto and lungo?',
        answer:
          'Ristretto is a short ratio (about 1:1–1:1.5) — thicker, sweeter, more intense. Lungo is a long ratio (about 1:3+) — lighter body, more bitterness risk, bigger drink. Same dose, different yield.',
      },
      {
        question: 'How long should an espresso shot take?',
        answer:
          'Most 1:2 double shots land around 25–30 seconds, not counting pre-infusion. Use time as a guide, not a rule — taste and yield matter more than hitting exactly 28 seconds.',
      },
    ],
  },
  {
    slug: 'caffeine-calculator',
    name: 'Caffeine Calculator',
    title: 'Caffeine Calculator: How Much Caffeine Is in Your Coffee?',
    metaDescription:
      'Estimate caffeine in your coffee by drink type — or convert mg to cups. How many cups of coffee is 155 mg of caffeine? Use the calculator to find out.',
    excerpt:
      'Estimate caffeine by drink and servings, and see how close you are to the daily safe limit.',
    icon: 'Zap',
    category: 'Calculator',
    keywords: [
      'caffeine calculator',
      'how much caffeine in coffee',
      'how many cups of coffee is 155 mg of caffeine',
      'caffeine in espresso',
      'daily caffeine limit',
    ],
    faqs: [
      {
        question: 'How many cups of coffee is 155 mg of caffeine?',
        answer:
          'About one 8 oz cold brew (typically ~155 mg) or roughly 1.5–1.6 cups of regular brewed coffee (~95 mg each). A single espresso shot has about 63 mg, so 155 mg is a little under 2.5 shots. Use the calculator above to convert any mg amount into cups by drink type.',
      },
      {
        question: 'How much caffeine is in a cup of coffee?',
        answer:
          'A typical 8 oz brewed coffee has about 95 mg of caffeine. A single espresso shot has roughly 63 mg, and cold brew is often higher per ounce.',
      },
      {
        question: 'How much caffeine is in espresso vs coffee?',
        answer:
          'Per ounce, espresso is stronger (~63 mg in a 1 oz shot). Per serving, an 8 oz drip coffee (~95 mg) often has more total caffeine than one shot. A double shot (~126 mg) is closer to a full mug.',
      },
      {
        question: 'What is the safe daily caffeine limit?',
        answer:
          'Most healthy adults can have up to about 400 mg of caffeine per day — roughly four 8 oz cups of coffee. Pregnant people and those sensitive to caffeine should have less.',
      },
      {
        question: 'Does dark roast have less caffeine?',
        answer:
          'Barely. Roast level has a tiny effect. By weight, dark and light are nearly the same; by scoop, light roast can have slightly more because the beans are denser. Brew method and dose matter far more.',
      },
      {
        question: 'How much caffeine is in decaf coffee?',
        answer:
          'Decaf is not caffeine-free. An 8 oz cup of decaf usually has about 2–15 mg of caffeine — enough that sensitive people can still notice it if they drink several cups.',
      },
    ],
  },
  {
    slug: 'coffee-measurement-converter',
    name: 'Coffee Measurement Converter',
    title: 'Coffee Measurement Converter (Tablespoons, Scoops & Grams)',
    metaDescription:
      'Convert coffee measurements between grams, tablespoons, and scoops. Stop guessing and dose accurately even without a scale.',
    excerpt:
      'Convert between grams, tablespoons, and scoops so you can dose accurately even without a scale.',
    icon: 'Ruler',
    category: 'Reference',
    keywords: [
      'coffee grams to tablespoons',
      'coffee scoop to grams',
      'how many grams in a tablespoon of coffee',
      'how many tablespoons of coffee per cup',
    ],
    faqs: [
      {
        question: 'How many grams are in a tablespoon of coffee?',
        answer:
          'One level tablespoon of whole beans is roughly 5 grams; ground coffee is a bit denser at about 5–6 grams. A standard coffee scoop is about 2 tablespoons, or 10 grams.',
      },
      {
        question: 'How many tablespoons of coffee per cup?',
        answer:
          'For an 8 oz (240–250 ml) mug at a 1:16 ratio, use about 2 tablespoons of coffee (~15–16 g). For a coffee-maker “cup” (often only 5 oz), closer to 1–1.5 tablespoons is enough.',
      },
      {
        question: 'How many scoops of coffee per cup?',
        answer:
          'One standard coffee scoop is about 2 tablespoons (~10 g). For a full 8 oz mug you usually want closer to 1.5 scoops (~15 g). The old “one scoop per cup” advice assumes tiny 5–6 oz cups.',
      },
      {
        question: 'Why measure by weight instead of scoops?',
        answer:
          'Bean size, roast level, and grind all change volume, so scoops are inconsistent. Weighing in grams is the most repeatable way to dose coffee.',
      },
      {
        question: 'How many grams of coffee for 8 cups?',
        answer:
          'It depends whether you mean 8 machine cups or 8 mugs. Eight 5 oz machine cups need about 70–75 g at a standard drip ratio; eight 8 oz mugs need about 120–125 g. Use the drip coffee calculator for exact numbers.',
      },
    ],
  },
  {
    slug: 'grind-size-chart',
    name: 'Grind Size Chart',
    title: 'Coffee Grind Size Chart by Brew Method',
    metaDescription:
      'A visual coffee grind size chart. Find the right grind — from extra fine to extra coarse — for espresso, pour over, drip, French press, and cold brew.',
    excerpt:
      'Find the right grind for every brew method, from espresso-fine to cold-brew-coarse.',
    icon: 'Beaker',
    category: 'Reference',
    keywords: [
      'coffee grind size chart',
      'grind size for pour over',
      'espresso grind size',
      'french press grind size',
      'cold brew grind size',
      'what grind for drip coffee',
      'coffee grind too fine',
      'coffee grind too coarse',
    ],
    faqs: [
      {
        question: 'What grind size should I use?',
        answer:
          'Match grind to brew time: espresso is fine, pour over and drip are medium to medium-fine, French press and cold brew are coarse. Finer grinds extract faster because more surface area touches the water.',
      },
      {
        question: 'What grind size for pour over coffee?',
        answer:
          'Use medium-fine — about the texture of table salt. If the brew finishes under ~2:30 and tastes sour, grind finer. If it stalls past ~4:00 and tastes bitter or astringent, grind coarser. One or two clicks on a burr grinder is usually enough.',
      },
      {
        question: 'What grind size for French press?',
        answer:
          'Use a coarse grind, like sea salt or raw sugar. French press steeps for about 4 minutes; a fine grind over-extracts, clogs the mesh, and leaves a muddy cup. If your press tastes silty, go coarser before changing the ratio.',
      },
      {
        question: 'What grind size for espresso?',
        answer:
          'Espresso needs a fine grind — closer to powdered sugar or very fine salt — so a ~25–30 second shot at a 1:2 ratio can extract properly. If the shot gushes and tastes sour, grind finer. If it drips slowly and tastes bitter, grind coarser. Espresso is the most sensitive grind setting on any chart.',
      },
      {
        question: 'What grind size for cold brew?',
        answer:
          'Use extra-coarse grounds, similar to cracked peppercorns or very chunky sea salt. Cold brew steeps 12–18 hours; anything medium or finer tends to turn bitter, cloudy, and over-extracted. Coarse grind also strains cleaner.',
      },
      {
        question: 'What grind size for drip coffee makers?',
        answer:
          'Most automatic drip machines want a medium grind — like regular sand. Basket machines with flat-bottom filters can go slightly coarser; cone filters often prefer slightly finer. If the pot tastes weak, try a notch finer before adding more coffee.',
      },
      {
        question: 'What happens if my grind is wrong?',
        answer:
          'Too fine for the method over-extracts and tastes bitter, harsh, or drying. Too coarse under-extracts and tastes sour, thin, and hollow. When a cup tastes off, change grind first — before ratio, temperature, or brew time.',
      },
      {
        question: 'Why does my coffee taste bitter or sour?',
        answer:
          'Bitter and harsh often means the grind is too fine (over-extraction). Sour and watery often means the grind is too coarse (under-extraction). Confirm you are in the right ballpark for your brew method on the chart, then adjust one click at a time.',
      },
      {
        question: 'Do I need a burr grinder for accurate grind size?',
        answer:
          'Yes if you care about consistency. Blade grinders chop beans into a mix of dust and chunks, so the same cup can taste bitter and sour at once. A burr grinder produces uniform particles, which is why grind-size charts assume burr grinding.',
      },
      {
        question: 'How fine is espresso grind vs drip?',
        answer:
          'Espresso is much finer. Drip is medium; espresso is fine enough that water needs pressure to push through the puck in ~25–30 seconds. If you try to brew drip coffee at espresso fineness, the basket will clog and taste bitter. If you pull espresso at drip coarseness, the shot will gush and taste sour.',
      },
    ],
  },
  {
    slug: 'world-coffee-map',
    name: 'World Coffee Map Explorer',
    title: 'World Coffee Map: Explore Coffee Origins, Flavors & Growing Regions',
    metaDescription:
      'An interactive world coffee map. Click any coffee-growing country to explore altitude, flavor profile, processing methods, and recommended brew style for that origin.',
    excerpt:
      'Click any coffee-growing country to discover its altitude, flavor notes, processing methods, and ideal brew style.',
    icon: 'Beaker',
    category: 'Reference',
    keywords: [
      'world coffee map',
      'coffee growing regions',
      'coffee origins map',
      'ethiopia coffee flavor',
      'colombia coffee',
      'coffee producing countries',
    ],
    faqs: [
      {
        question: 'Which country produces the most coffee?',
        answer:
          'Brazil is the world\'s largest coffee producer, accounting for roughly 40% of global output. It is followed by Vietnam, Colombia, and Indonesia. Brazil dominates in volume; Ethiopia and Colombia are more celebrated for specialty-grade quality.',
      },
      {
        question: 'What is the coffee belt?',
        answer:
          'The "coffee belt" is the band between the Tropics of Cancer and Capricorn (roughly 25°N to 30°S) where coffee plants thrive. It encompasses Central and South America, Africa, the Middle East, and Southeast Asia.',
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
          'Most specialty origins (Ethiopia, Colombia, Kenya, Costa Rica) grow Arabica. Vietnam grows mostly Robusta. Brazil grows both. Arabica tastes sweeter and more complex; Robusta has more caffeine and a heavier, earthier profile.',
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
      'coffee taste profile',
      'how does grind affect coffee taste',
      'coffee extraction explained',
      'coffee science',
    ],
    faqs: [
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
        question: 'What is under-extracted coffee?',
        answer:
          'Under-extracted coffee tastes sour, salty, and thin, without sweetness. Common causes: grind too coarse, brew time too short, dose too low, or water too cool.',
      },
      {
        question: 'Which variable should I change first when coffee tastes bad?',
        answer:
          'Change grind size first. It is the fastest fix for bitter vs sour cups. Keep ratio and temperature steady until the grind is in the right ballpark, then fine-tune the rest.',
      },
    ],
  },
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
  }
> = {
  'coffee-ratio-calculator': {
    intro:
      'The coffee-to-water ratio is the single biggest lever you can pull to change the taste of your cup — bigger than grind size, bigger than water temperature, bigger than brew time. Too little coffee and the water passes right through without extracting enough flavor, leaving a sour, thin cup. Too much and you pull out every harsh, bitter compound the bean has to offer. The SCA (Specialty Coffee Association) defines the "golden cup standard" as 55 g of coffee per liter of water, which sits right at 1:18. Most home brewers land happiest between 1:15 and 1:17.',
    howToUse: [
      {
        step: 'Pick your target strength',
        detail:
          'Choose a ratio preset or drag the slider. 1:15 is strong and bold, 1:16 is the balanced all-rounder most coffee shops use, 1:17–1:18 is lighter and more delicate — good for bright, floral single origins.',
      },
      {
        step: 'Enter what you know',
        detail:
          "Type into whichever field you're starting from — your coffee bag weight, your carafe's water capacity, or the number of cups you're brewing. All three fields update in real time.",
      },
      {
        step: 'Check the tablespoon estimate',
        detail:
          "If you don't own a scale yet, the tablespoon readout gives you a usable approximation. Bear in mind a tablespoon of light-roast whole beans weighs about 4–5 g while dark roast grounds pack closer to 6 g, so buy a $10 scale when you can.",
      },
      {
        step: 'Brew and adjust',
        detail:
          "Taste the cup before you tweak the recipe. If it's too weak, drop the ratio by 1 (go from 1:16 to 1:15). If it's too strong or bitter, increase it. Make one change at a time.",
      },
    ],
    proTips: [
      'Always weigh water, not just coffee. Many brewers weigh coffee but eyeball the water — that wipes out half the benefit of measuring.',
      'Use the same ratio as a baseline, then adjust roast level. A light roast at 1:16 will taste completely different from a dark roast at 1:16.',
      'Cold brew uses a much lower ratio (1:8 for concentrate) — use the dedicated cold brew calculator for that.',
      'Espresso lives on a totally different scale (1:2 dose-to-yield). The espresso calculator handles that separately.',
    ],
    whyItMatters:
      'Repeatability is what separates a good home brewer from a great one. Writing down your ratio means you can reproduce a great cup tomorrow, next week, or after switching beans. It also makes troubleshooting simple: if one variable is locked, you only ever have to diagnose one thing at a time.',
    relatedSlugs: ['brew-timer', 'coffee-measurement-converter', 'espresso-ratio-calculator'],
  },

  'drip-coffee-calculator': {
    intro:
      'Automatic drip coffee is still the way most people brew at home, but it comes with a persistent problem: coffee makers label everything in tiny 5 oz "cups" while most people drink from 8 to 12 oz mugs. That is why searches like "how much coffee for 12 cups" and "how many tablespoons of coffee for 8 cups" never go away. This drip coffee calculator solves that confusion by converting coffee maker cups into real water volume, then showing exactly how much coffee you need in grams, tablespoons, and scoops for the strength you want.',
    howToUse: [
      {
        step: 'Choose your serving style',
        detail:
          'Select whether you are thinking in coffee maker cups or full mugs. Coffee maker cups are 5 oz each; mugs are larger and closer to what people actually drink at breakfast.',
      },
      {
        step: 'Set the batch size',
        detail:
          'Use the preset buttons for common brews like 4, 8, 10, or 12 cups, or type your own amount. The calculator immediately updates the required water and coffee.',
      },
      {
        step: 'Pick a strength',
        detail:
          'Choose light, standard, or strong. Standard is the safest starting point for most home drip machines. Strong works well for darker roasts or bigger mugs that will be diluted with milk.',
      },
      {
        step: 'Use the grams first, spoons second',
        detail:
          'The gram value is the accurate target. The tablespoon and scoop estimates are there for convenience if you do not own a scale yet, but a scale will make your drip coffee much more repeatable.',
      },
    ],
    proTips: [
      'If your coffee maker has a showerhead that saturates grounds unevenly, use a slightly coarser grind and avoid overfilling the basket.',
      'Most grocery-store pre-ground coffee is a decent grind size for drip machines, but freshly ground beans still taste noticeably sweeter and more aromatic.',
      'If your pot tastes flat no matter what ratio you use, your machine may need cleaning. Mineral buildup hurts brew temperature and extraction fast.',
      'For iced coffee made in a drip machine, brew slightly stronger than usual so the ice does not wash the flavor out.',
    ],
    whyItMatters:
      'Drip coffee looks simple, but bad measurements are why so many home pots taste weak, bitter, or generic. A dedicated drip calculator meets people where they actually are: brewing for multiple cups, often without a scale, on mainstream machines with confusing markings. That makes it one of the best search-intent fits on the whole site.',
    relatedSlugs: ['coffee-ratio-calculator', 'coffee-measurement-converter', 'french-press-calculator'],
  },

  'french-press-calculator': {
    intro:
      'French press coffee ratio searches are some of the most common brewing questions online — and for good reason. Immersion brewing is forgiving on technique, but the dose still has to be right. Too little coffee and the cup tastes thin and sour; too much and it turns heavy and bitter. This calculator gives you the classic 1:15 French press coffee ratio (plus milder and stronger options), sized for the press you actually own: 3-cup, 4-cup, 8-cup, or 12-cup.',
    howToUse: [
      {
        step: 'Choose your press size',
        detail:
          'Tap 3-cup, 4-cup, 8-cup, or 12-cup. These match common Bodum-style usable volumes (about 350 ml, 500 ml, 1 L, and 1.5 L), not the confusing “cup” markings on some lids.',
      },
      {
        step: 'Adjust water if needed',
        detail:
          'Override the water field if your press is a non-standard size or you only want to fill it partway. Leave roughly 2 cm of space under the lid so the grounds can bloom.',
      },
      {
        step: 'Pick a strength',
        detail:
          'Classic (1:15) is the best French press coffee ratio for most people. Mild (1:16) is brighter and lighter; Strong (1:14) is bold and rich — great for milk drinks or dark roasts.',
      },
      {
        step: 'Grind coarse and steep 4 minutes',
        detail:
          'Use a coarse grind, add hot water (~93–96°C / 200–205°F), steep about 4 minutes, break the crust, skim foam, press slowly, and pour everything out so it does not keep steeping.',
      },
    ],
    proTips: [
      'French press “cups” on packaging are usually ~4 oz, not full mugs. Trust water weight (grams/ml) over the printed cup count when you can.',
      'If the cup tastes muddy or bitter, go coarser before you change the ratio. Grind size causes most French press failures.',
      'Decant immediately after pressing. Leaving coffee on the grounds is the fastest way to turn a good brew bitter.',
      'Pair this calculator with our full French press method guide for bloom, plunge technique, and sediment tips.',
    ],
    whyItMatters:
      'A dedicated French press calculator matches how people actually search: “french press coffee ratio,” “how much coffee for french press,” and “french press method.” Getting the ratio right once — then repeating it — is the shortest path from “okay immersion coffee” to a cup you look forward to every morning.',
    relatedSlugs: [
      'coffee-ratio-calculator',
      'grind-size-chart',
      'coffee-measurement-converter',
      'caffeine-calculator',
    ],
  },

  'brew-timer': {
    intro:
      'Pour over coffee is one of the most forgiving brew methods once you understand the pour schedule — and one of the most inconsistent when you wing it. The bloom, the timing of each pour, and the total drawdown time all affect extraction. This guided timer removes the guesswork by giving you on-screen prompts for exactly when to pour and how much to target on your scale, based on your dose and chosen ratio.',
    howToUse: [
      {
        step: 'Set your dose and ratio',
        detail:
          "Enter your coffee dose in grams (18–22 g is typical for a single cup) and your target ratio. The timer calculates all pour targets from these two numbers. You can't change them once you start.",
      },
      {
        step: 'Hit Start at the first pour',
        detail:
          'Tap Start exactly as you begin your bloom pour. The timer syncs the pour schedule to real clock time from this moment forward.',
      },
      {
        step: 'Follow the phase cards',
        detail:
          'Each phase lights up as it becomes active — Bloom, First Pour, Second Pour, Drawdown. The large number shows your target scale weight at that moment.',
      },
      {
        step: 'Watch the drawdown',
        detail:
          "Once you've finished all pours, just wait. A healthy V60 drawdown takes 60–90 seconds. Total brew time including bloom should land between 2:30 and 3:30 for most recipes.",
      },
    ],
    proTips: [
      'The bloom is the most important pour. Use 2–3× the coffee dose in water (for 20 g coffee, pour 40–60 g) and give it the full 30–45 seconds. Gases escaping here would otherwise create uneven extraction.',
      "Pour in slow, steady spirals from the center outward, then back. Avoid pouring directly on the filter — it channels water past the coffee bed.",
      "If your drawdown is slow (over 4 minutes) and the coffee tastes bitter, grind coarser. If it races through in under 2 minutes and tastes sour, grind finer.",
      'A flat coffee bed after drawdown is a sign of even extraction. A domed or channeled bed means you poured too fast or too aggressively.',
      'Rinse your paper filter with hot water before brewing. It removes paper taste and pre-heats your dripper and vessel.',
    ],
    whyItMatters:
      "Consistency is the goal of any brew timer. The difference between a 2:45 and a 4:00 total brew time at the same grind is significant — and without a timer you'll never know which you're hitting. Once you nail a recipe you love, log the time and use the timer to reproduce it exactly.",
    relatedSlugs: ['coffee-ratio-calculator', 'grind-size-chart', 'coffee-measurement-converter'],
  },

  'cold-brew-calculator': {
    intro:
      'Cold brew is less a brew "method" and more a long steep — coarse grounds and cold or room-temperature water sit together for 12–24 hours, slowly extracting flavor without heat. Because there is no heat to force extraction, you need a lot more coffee than a hot brew. The standard concentrate ratio is 1:8 (one part coffee to eight parts water by weight) — roughly twice as strong as you would ever drink it, intended to be diluted with water, milk, or ice. A ready-to-drink batch runs about 1:15, similar to a strong drip brew.',
    howToUse: [
      {
        step: 'Choose concentrate or ready-to-drink',
        detail:
          'Concentrate is ideal if you want flexibility — dilute 1:1 with water or milk to taste, or use it in coffee cocktails and ice drinks. Ready-to-drink skips the dilution step but uses more coffee per serving.',
      },
      {
        step: 'Enter your water volume',
        detail:
          "Type the amount of water you're working with, or tap a preset. Most mason jars hold 500 ml to 1 liter; a large pitcher is usually 1.5–2 liters.",
      },
      {
        step: 'Grind coarse and steep',
        detail:
          'Cold brew needs an extra-coarse grind — similar to raw sugar or coarsely cracked peppercorns. Fine or medium grinds over-extract over a 12-hour steep and turn bitter. Add coffee and water to a jar, stir, cover, and refrigerate.',
      },
      {
        step: 'Strain and store',
        detail:
          'After 12–18 hours, strain through a fine-mesh sieve lined with a paper coffee filter. Store concentrate in the fridge for up to two weeks; ready-to-drink for about a week.',
      },
    ],
    proTips: [
      'Room-temperature steeping (often called "room temp cold brew") cuts the time to 8–12 hours and produces a slightly brighter flavor. Refrigerator steeping is gentler and more forgiving if you overshoot the steep time.',
      'Use a medium-dark or dark roast for cold brew. The lack of heat means light roasts can come out grassy and underdeveloped.',
      "Double-filtering (mesh sieve then paper filter) produces a crystal-clear concentrate with no sediment — worth the extra step if you're serving guests.",
      'Cold brew concentrate freezes well in ice cube trays. Drop a cube into a glass and pour milk over it for a quick iced latte.',
    ],
    whyItMatters:
      "Cold brew has a notably lower acidity than hot-brewed coffee — typically 60–70% less, according to research from Toddy. That makes it a good option for people who find regular coffee hard on their stomach. The slow, cold extraction also produces a naturally sweet, mellow flavor that doesn't need much sugar.",
    relatedSlugs: ['coffee-ratio-calculator', 'grind-size-chart', 'caffeine-calculator'],
  },

  'espresso-ratio-calculator': {
    intro:
      'Espresso is brewed at a 1:2 ratio by default — 18 grams of coffee in, 36 grams of espresso out — but the right ratio for your palate and your beans could be anywhere from 1:1.5 (a tight, syrupy ristretto) to 1:3 or beyond (a long, tea-like lungo). Understanding brew ratio is the foundation of dialing in a shot: it determines body, sweetness, and bitterness more directly than almost any other variable except grind size.',
    howToUse: [
      {
        step: 'Choose a shot style',
        detail:
          'Tap Ristretto (1:1.5), Normale (1:2), or Lungo (1:3) for a starting point. Each one lights up the ratio slider at the canonical value for that style.',
      },
      {
        step: 'Enter your dose',
        detail:
          'Your dose is the weight of dry coffee you put in the portafilter. Most standard single baskets take 7–9 g; doubles take 14–20 g. If you are not sure, weigh what your grinder outputs for one dose.',
      },
      {
        step: 'Read the yield',
        detail:
          "The yield is the weight of liquid espresso in your cup after the shot pulls. Place a digital scale under your portafilter, tare it to zero, and stop extraction when it hits the calculated number.",
      },
      {
        step: 'Taste and adjust the ratio, not the dose',
        detail:
          'If the shot tastes sour or hollow, let it run a little longer (higher ratio). If it tastes bitter or harsh, cut it shorter (lower ratio). Keep the dose constant while you dial in the ratio.',
      },
    ],
    proTips: [
      'Brew ratio and grind size work together. A finer grind slows the shot and produces more yield; a coarser grind speeds it up. If your ratio is right but the taste is off, adjust grind next.',
      "Shot time is a rough guide, not a rule. A 25-second shot at 1:2 on one machine might be 32 seconds on another. Trust taste and scale over the clock.",
      "Single-origin light roasts often pull better at 1:2.5–1:3. The extra yield dilutes the acidity and sweetens the cup. Don't force a 1:2 ratio if the shot isn't tasting right.",
      'Espresso at 1:10 or higher is sometimes called a "filter espresso" or "long black espresso" — common in specialty coffee shops. Not a mistake, just a style.',
    ],
    whyItMatters:
      "Most espresso problems — bitterness, sourness, thin body — trace back to brew ratio before anything else. Fixing ratio costs nothing and changes everything. Lock in a ratio that tastes good, then you can start experimenting with dose, grind, temperature, and pre-infusion from a solid baseline.",
    relatedSlugs: ['coffee-ratio-calculator', 'caffeine-calculator', 'grind-size-chart'],
  },

  'caffeine-calculator': {
    intro:
      'Caffeine is the world\'s most widely consumed psychoactive substance, and coffee is its biggest delivery vehicle. A single 8 oz brewed cup contains roughly 80–100 mg depending on roast level, bean variety, and brew method. Cold brew and drip are at the high end; espresso per ounce is high but per serving is moderate because the serving is small. The FDA considers 400 mg per day safe for most healthy adults — that is four standard mugs of brewed coffee. This calculator helps you see exactly where your current intake lands.',
    howToUse: [
      {
        step: 'Select your drink',
        detail:
          'Choose the drink type closest to what you actually drink. The listed mg values are averages — your specific beans and brewer will vary, but these are reliable ballpark figures drawn from USDA and published food lab data.',
      },
      {
        step: 'Set your daily servings',
        detail:
          "Drag the slider to match how many of that drink you typically have in a day. If you mix drinks (two espressos and a drip coffee), run the calculator twice and add the totals in your head — or use round numbers.",
      },
      {
        step: 'Check the bar',
        detail:
          'The progress bar fills toward the 400 mg daily guideline. Green means you have room; it turns red once you exceed the threshold. This is not a medical tool — it is a useful reference.',
      },
    ],
    proTips: [
      "Caffeine's half-life in the body is about 5–6 hours. A 3 pm espresso still has about half its caffeine in your system at 8–9 pm, which is why it can affect sleep even when you don't feel wired.",
      'Robusta beans have roughly twice the caffeine of Arabica. Most specialty coffee uses Arabica, but some espresso blends include Robusta for body and crema — check the bag.',
      'Light roasts are very slightly higher in caffeine than dark roasts by weight, because caffeine degrades marginally with heat. The difference is small and usually swamped by dose variation.',
      'Coffee tolerance builds over time. Regular drinkers often need more caffeine to feel the same effect — one reason morning coffee feels essential but a second cup barely registers.',
      'Decaf is not caffeine-free: an 8 oz decaf typically contains 2–5 mg per cup, sometimes up to 15 mg. Probably not enough to matter, but worth knowing.',
    ],
    whyItMatters:
      'Tracking caffeine intake helps identify whether coffee is affecting your sleep, anxiety, or focus — three things most coffee drinkers genuinely care about. It is also useful context if you are pregnant, on medication that interacts with caffeine, or simply trying to understand your energy patterns throughout the day.',
    relatedSlugs: ['coffee-ratio-calculator', 'espresso-ratio-calculator', 'cold-brew-calculator'],
  },

  'coffee-measurement-converter': {
    intro:
      'Coffee recipes are written in grams, but most kitchens measure in tablespoons and scoops — and the two systems do not convert cleanly. The density of coffee changes dramatically depending on whether it is whole bean or ground, how coarsely it is ground, and how dark it is roasted. A tablespoon of fine espresso grind weighs about 6–7 g. A tablespoon of coarsely ground light roast can be as low as 4 g. This converter uses a sensible middle-ground average of 5.3 g per level tablespoon of ground coffee, which is close enough to get you brewing without a scale.',
    howToUse: [
      {
        step: 'Enter your amount',
        detail:
          'Type in the number you are starting from — say, 2 tablespoons from a recipe card, or 20 g from a guide online.',
      },
      {
        step: 'Select the unit',
        detail:
          'Choose the unit that matches your input: Grams, Tablespoons, Scoops (one standard coffee scoop = 2 tablespoons = ~10 g), or Teaspoons.',
      },
      {
        step: 'Read all four conversions at once',
        detail:
          'All four output tiles update instantly, so you can see the full picture. The highlighted tile is your source unit.',
      },
    ],
    proTips: [
      "A standard coffee scoop is 2 tablespoons (roughly 10 g). The 'one scoop per cup' guideline most automatic drip machines print is for 6 oz cups — a standard mug is 8–12 oz, so you may need 1.5–2 scoops.",
      'If you measure by volume and your coffee tastes inconsistent week to week, it is likely bean density changing between bags. A digital scale fixes this permanently.',
      'Whole beans are dramatically lighter per tablespoon than ground coffee — you cannot substitute the same volume. Always grind first if a recipe calls for grams of ground coffee.',
      "The best $10 you can spend on coffee is a digital kitchen scale accurate to 0.1 g. It pays off immediately in consistency, and you'll never need this converter again.",
    ],
    whyItMatters:
      "Volume measurement is inherently variable for coffee — the same tablespoon can mean 4 g or 7 g depending on grind and roast. That's a 75% difference in dose, which produces dramatically different cups. This converter helps you bridge the gap between recipes written for scale users and the reality of a spoon-and-scoop kitchen.",
    relatedSlugs: ['coffee-ratio-calculator', 'grind-size-chart', 'brew-timer'],
  },

  'grind-size-chart': {
    intro:
      "Grind size controls extraction rate. Finer grinds have more surface area exposed to water, so they extract quickly — ideal for espresso's 25-second shot. Coarser grinds extract slowly, which is why French press and cold brew need minutes to hours rather than seconds. When grind is mismatched to brew method, the result is predictable: too fine for the method produces over-extracted bitterness; too coarse produces under-extracted sourness and weakness. This chart maps every common brew method to the grind size that produces the most balanced cup.",
    howToUse: [
      {
        step: 'Find your brew method in the chart',
        detail:
          "Scan the 'Best for' column for your brew method. Each row shows the grind name, a tactile reference ('feels like...') so you can check your grinder output by touch, and the coarseness dots so you can see where it sits on the spectrum.",
      },
      {
        step: 'Use the tactile reference to calibrate',
        detail:
          "Rub a pinch of your ground coffee between your fingers. Fine espresso grind should feel like soft flour or powdery table salt — no distinct grit. Pour over medium-fine should have a light sandy texture. French press coarse should feel like raw cane sugar or cracked sea salt.",
      },
      {
        step: 'Adjust your grinder in steps',
        detail:
          "Most grinders label settings 1–10 or use numbered clicks. Move one or two steps at a time and brew a test cup before moving further. Grind-size taste issues are exaggerated in espresso (one click can change a shot dramatically) and subtle in drip (several clicks may barely register).",
      },
    ],
    proTips: [
      "Grind consistency matters as much as grind size. A cheap blade grinder produces a mix of fine dust and coarse chunks — the dust over-extracts and turns bitter while the chunks under-extract. A burr grinder cuts coffee to a uniform size. It's the most impactful upgrade you can make to your setup.",
      'After changing grind size, always discard the first few grams of output. Grounds from the previous setting linger in the burr chamber and will skew your new results.',
      "Coffee absorbs moisture, which swells the grounds and affects how they grind. Expect to re-dial your grinder after a new bag, especially if you've switched roasters or origins.",
      "Espresso grind is the most sensitive — a half-click on a quality grinder is meaningful. Pour over and drip are forgiving. French press and cold brew are the most forgiving of all, which is why they're great starting points for new home brewers.",
      "Altitude and humidity affect grind. If you're at high altitude, water boils at a lower temperature, which changes extraction dynamics and may require a slightly finer grind to compensate.",
    ],
    whyItMatters:
      "Grind is the most frequently mis-set variable in home coffee. Most 'bad coffee' complaints — sour, bitter, weak, muddy — are directly traceable to grind size before anything else. This chart is the reference to reach for first whenever a cup tastes off.",
    relatedSlugs: ['coffee-ratio-calculator', 'brew-timer', 'espresso-ratio-calculator'],
  },

  'world-coffee-map': {
    intro:
      'Coffee is a product of place. The same Coffea arabica plant grown at 800 meters in Brazil produces a completely different cup than one grown at 2,000 meters in Ethiopia — and both taste nothing like a Sumatran. Altitude, soil composition, rainfall patterns, average temperature, and the way beans are processed after harvest all shape flavor in ways that cannot be replicated by changing any brew variable. This map lets you explore 15 major coffee-producing origins, understand what makes each unique, and match an origin to the brewing method that suits it best.',
    howToUse: [
      {
        step: 'Click a highlighted country',
        detail:
          'Coffee-producing countries are shown in a warm amber tone. Click any one to open the origin profile panel below the map with altitude, process methods, flavor profile, and recommended brew.',
      },
      {
        step: 'Read the flavor profile',
        detail:
          'Body and acidity bars show where this origin sits on the spectrum. High acidity coffees like Kenya and Ethiopia suit pour over methods that highlight brightness. Low-acid, full-body origins like Brazil and Sumatra suit espresso and French press.',
      },
      {
        step: 'Check the process method',
        detail:
          'Natural (dry) processing tends to produce fruity, winey, heavy-bodied cups. Washed processing gives cleaner, brighter, more acidic cups. Honey is a middle ground. Origin + process together tell you more about flavor than origin alone.',
      },
      {
        step: 'Use the brew recommendation',
        detail:
          'Each origin lists its best-suited brew method. This is a starting point — every origin can work in any method — but some matches are much more satisfying than others.',
      },
    ],
    proTips: [
      'Single-origin coffees highlight the terroir of one farm or region. Blends balance multiple origins for consistency. For exploring coffee origins, always start with single-origin bags.',
      'Roast level can mask or enhance origin character. Light roasts preserve the most origin flavor — fruity Ethiopian naturals are best enjoyed light. Dark roasts shift character toward roast-driven chocolate and smoke.',
      'The processing method is often listed on specialty coffee bags and is as important as origin for predicting flavor.',
      'If you want to explore high-acidity coffees, Kenya and Ethiopia are the places to start. If you prefer low-acid, smooth cups, Brazil and Sumatra are your best bet.',
    ],
    whyItMatters:
      'Understanding origin is the fastest way to reliably buy coffee you will enjoy. Instead of guessing from vague tasting notes on a bag, knowing that you love washed Ethiopian pour overs or low-acid Brazilian espresso means you can walk into any specialty coffee shop and know exactly what to ask for.',
    relatedSlugs: ['grind-size-chart', 'coffee-ratio-calculator', 'brew-timer'],
  },

  'coffee-lab': {
    intro:
      'Every variable in coffee brewing — grind size, water temperature, brew ratio, roast level, and bean origin — affects extraction, and extraction determines flavor. The problem is that most people change one thing and taste a completely different cup, making it hard to know which variable was responsible. The Coffee Lab Simulator models these relationships interactively: adjust any variable and the taste profile bars update immediately after you brew, so you can build an intuition for how the pieces fit together before you waste a bag of expensive beans experimenting.',
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
        step: 'Hit Brew and read the result',
        detail:
          'The extraction percentage tells you if your recipe is under, over, or in the ideal zone. The verdict at the bottom tells you specifically what to adjust if the profile is off.',
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
      'Most coffee guides give you a recipe. This simulator gives you the underlying logic — so when your cup is sour, you understand why finer grind or higher temp will fix it; when it is bitter, you know to go coarser or pull back the temperature. This is how baristas and roasters think, and once it clicks, dialing in any brew on any equipment becomes intuitive rather than accidental.',
    relatedSlugs: ['coffee-ratio-calculator', 'grind-size-chart', 'brew-timer'],
  },
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
