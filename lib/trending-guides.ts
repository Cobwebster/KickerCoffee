import type { BeanArticle, BrewGuide, ToolMeta, AnswerTable } from './content'

export const TRENDING_BREW_GUIDES: BrewGuide[] = [
  {
    slug: 'how-to-make-protein-coffee',
    method: 'Protein Coffee',
    title: 'How to Make Protein Coffee (Proffee) — Hot, Iced & No Clumps',
    metaDescription:
      'How to make protein coffee at home: iced proffee and hot recipes that do not clump. Calories, protein grams, whey vs plant powder, and café-style protein latte tips.',
    excerpt:
      'Mix protein into milk first — never dump powder into hot coffee. Iced and hot proffee recipes with real calorie and protein numbers.',
    difficulty: 'Beginner',
    brewTime: '2–5 min',
    ratio: '1 scoop + 6–8 oz coffee',
    grind: 'Espresso or coarse (cold brew)',
    yield: '1 large glass',
    updated: '2026-10-29',
    image: '/images/cold-brew-hero.webp',
    quickAnswer:
      'Shake 1 scoop (about 25–30 g) protein powder into cold milk until smooth, then add espresso or cold brew over ice. For hot proffee, warm milk to ~65°C / 150°F, whisk in powder, then pour coffee in. Never add powder straight to boiling coffee.',
    intro:
      'Protein coffee — “proffee” on TikTok, protein lattes on chain menus — is just coffee plus a real protein source. Searches exploded because café versions now advertise 20–30+ grams of protein, and home versions are cheaper if you already own powder. The drink fails for two reasons: clumps, and recipes that taste like chalk. This guide is the method that actually works, plus the nutrition math people Google next.',
    body: [
      { type: 'heading', text: 'What protein coffee actually is' },
      {
        type: 'paragraph',
        text: 'Proffee is coffee (espresso, strong drip, or cold brew) combined with whey, casein, or plant protein — usually mixed through milk so the powder hydrates. Collagen coffee is related but different: collagen peptides dissolve more easily and add roughly 10–20 g protein with less foam and less “shake” texture. Café protein lattes typically use ultra-filtered milk plus a protein booster, not a random kitchen scoop dumped into a shot.',
      },
      {
        type: 'list',
        items: [
          'Iced proffee: cold milk + powder, then coffee over ice — most reliable texture.',
          'Hot protein coffee: powder into warm (not boiling) milk, then coffee.',
          'Protein cold foam: half scoop + a splash of milk, frothed, poured over cold brew.',
          'Café-style protein latte: espresso + steamed high-protein milk (Fairlife-style or similar).',
        ],
      },
      { type: 'heading', text: 'Iced protein coffee recipe (best everyday version)' },
      {
        type: 'list',
        items: [
          '1 scoop whey or plant protein (25–30 g powder; vanilla or mocha works best)',
          '240 ml / 1 cup very cold milk (dairy, soy, or high-protein dairy)',
          '2 espresso shots or 120–180 ml strong cold brew',
          'Ice',
          'Optional: 1 tsp cocoa, cinnamon, or sugar-free syrup',
        ],
      },
      {
        type: 'steps',
        items: [
          'Add milk and protein powder to a shaker bottle or jar with a tight lid.',
          'Shake 20–30 seconds until completely smooth — no dry pockets on the lid.',
          'Fill a 16 oz glass with ice and pour in the espresso or cold brew.',
          'Pour the protein milk over the coffee and stir once.',
          'Taste. If it is chalky, you used too much powder or a gritty plant blend — drop to 3/4 scoop next time.',
        ],
      },
      {
        type: 'tip',
        text: 'Mixing powder into coffee first is how you get floaters. Hydrate the powder in cold liquid, then introduce coffee. A cheap handheld frother in a jar is almost as good as a shaker.',
      },
      { type: 'heading', text: 'Hot protein coffee without curdling' },
      {
        type: 'paragraph',
        text: 'Whey denatures in very hot liquid. That is why “scoop into a steaming mug” turns into rubbery bits. Keep the milk around 60–70°C (140–160°F) — hot latte territory, not a rolling boil. Whisk powder into that milk, then add coffee that has sat 30–60 seconds off the boil. Stir as you pour.',
      },
      {
        type: 'steps',
        items: [
          'Brew 180–240 ml coffee or pull a double espresso.',
          'Warm 120–180 ml milk until steaming but not scalding.',
          'Whisk or froth 1 scoop protein into the milk until glossy.',
          'Pour coffee into the mug, then the protein milk (or reverse — both work if the powder is already dissolved).',
        ],
      },
      { type: 'heading', text: 'How much protein and how many calories' },
      {
        type: 'paragraph',
        text: 'Numbers depend on the powder and the milk, not the coffee. Black coffee is ~2 calories. The drink is a breakfast, not a zero-cal hack.',
      },
      {
        type: 'table',
        caption: 'Typical one-serving estimates — brands vary. Weigh your scoop.',
        headers: ['Build', 'Protein', 'Calories (approx)'],
        rows: [
          ['2 shots + water + 1 scoop whey', '22–27 g', '110–140'],
          ['2 shots + 240 ml skim + 1 scoop whey', '30–35 g', '190–220'],
          ['2 shots + 240 ml 2% + 1 scoop whey', '32–36 g', '230–260'],
          ['Cold brew + almond milk + 1 scoop whey', '23–28 g', '130–170'],
          ['Espresso + oat milk + 1 scoop plant protein', '20–28 g', '200–280'],
          ['Café grande protein latte (chain average)', '25–32 g', '250–350'],
        ],
      },
      { type: 'heading', text: 'Whey vs plant vs collagen' },
      {
        type: 'list',
        items: [
          'Whey isolate: smoothest in iced drinks, foams well, usually 20–25 g protein per scoop. Can curdle if boiled.',
          'Casein: thicker, slower digesting, can get pudding-like if you over-scoop.',
          'Pea/soy blends: more grit; blend or shake longer. Soy milk plus soy protein stacks protein well.',
          'Collagen peptides: dissolve in hot coffee with almost no clumps, but they are not a complete protein and usually add less per serving.',
        ],
      },
      { type: 'heading', text: 'Does protein coffee replace breakfast?' },
      {
        type: 'paragraph',
        text: 'A 30 g protein drink can be a useful breakfast component — especially if it stops you buying a 400-calorie flavored latte and a pastry. It is not a balanced meal by itself: there is little fiber, and liquid calories are easy to overshoot if you add syrups. If you train in the morning, iced proffee after a session is a practical way to hit protein without cooking. If you have kidney disease or a clinician-set protein limit, do not treat TikTok macros as medical advice.',
      },
      { type: 'heading', text: 'Troubleshooting' },
      {
        type: 'list',
        items: [
          'Clumps: powder hit hot liquid first, or you under-shook. Mix in cold milk.',
          'Foam volcano: some whey brands foam hard in a shaker — leave headspace and burp the lid.',
          'Bitter or burnt: coffee was over-extracted or the powder is unflavored cocoa-heavy. Use a medium roast and vanilla whey.',
          'Too sweet: flavored powders plus syrup double up. Use unflavored isolate and cinnamon.',
          'Stomach issues: lactose in whey concentrate + milk. Try isolate, lactose-free milk, or a plant powder.',
        ],
      },
      { type: 'heading', text: 'No espresso machine?' },
      {
        type: 'paragraph',
        text: 'Strong drip, AeroPress, Moka pot, or leftover cold brew all work. Aim for a concentrated coffee base so milk and powder do not turn it into beige water. Instant espresso powder stirred into 60 ml hot water is a fair stand-in for two shots.',
      },
    ],
    faqs: [
      {
        question: 'How do you make protein coffee without clumps?',
        answer:
          'Dissolve the powder in cold milk first, then add coffee. For hot drinks, warm milk to about 65°C / 150°F before whisking in protein. Do not dump powder into boiling coffee.',
      },
      {
        question: 'How much protein is in protein coffee?',
        answer:
          'A typical homemade version with one scoop of whey and milk lands around 25–35 g of protein. Coffee itself adds almost none. Café protein lattes are often advertised in the mid-20s to low-30s depending on size and milk.',
      },
      {
        question: 'Is protein coffee good for weight loss?',
        answer:
          'It can help if it replaces a sugary café drink and keeps you full. It is not a fat-loss shortcut. Watch milk and syrup calories — those decide whether the drink is 150 or 400 kcal.',
      },
      {
        question: 'Can you put protein powder in hot coffee?',
        answer:
          'Yes if you hydrate it in warm milk first. Adding a dry scoop to steaming coffee is the usual reason it clumps or gets rubbery, especially with whey.',
      },
      {
        question: 'What is the best protein powder for coffee?',
        answer:
          'Vanilla or mocha whey isolate is the easiest for iced proffee. Collagen is easiest for black hot coffee. Avoid egg-white powders in hot drinks — they scramble-like clump.',
      },
      {
        question: 'Is Starbucks protein latte the same as proffee?',
        answer:
          'Same idea, different recipe. Chain protein lattes use protein-boosted milk systems designed not to split. Homemade proffee uses a scoop of powder. Nutrition and texture will not match ounce-for-ounce.',
      },
    ],
  },
  {
    slug: 'espresso-tonic-recipe',
    method: 'Espresso Tonic',
    title: 'Espresso Tonic Recipe — Coffee Tonic Ratio, Ice & How to Pour',
    metaDescription:
      'Espresso tonic recipe: coffee tonic ratio, tonic water, ice, and pour order so it does not foam over. How to make espresso tonic at home without a café.',
    excerpt:
      'Bright, bitter-sweet, and very 2026. The espresso tonic ratio that does not taste like flat soda or drowned espresso.',
    difficulty: 'Beginner',
    brewTime: '3 min',
    ratio: '1:3 to 1:4 espresso:tonic',
    grind: 'Fine (espresso)',
    yield: '1 tall glass',
    updated: '2026-10-29',
    image: '/images/espresso-hero.webp',
    quickAnswer:
      'Fill a glass with ice, add 150–180 ml cold tonic water, then pour 1–2 espresso shots (30–60 ml) slowly over the back of a spoon. Classic coffee tonic ratio is about 1:3 to 1:4 espresso to tonic. Drink immediately.',
    intro:
      'Espresso tonic (coffee tonic) is one of the fastest-growing coffee-drink searches in 2026: tonic water, ice, and espresso. Done well it tastes like citrusy cola crossed with a shot — bitter, sparkling, and strangely refreshing. Done badly it is warm espresso dumped into warm soda. The pour order and the tonic brand matter more than people expect.',
    body: [
      { type: 'heading', text: 'What you need' },
      {
        type: 'list',
        items: [
          '1–2 espresso shots (30–60 ml), or 40–50 ml strong Moka pot coffee',
          '150–200 ml chilled tonic water (not diet if you want classic bitterness-plus-sweetness)',
          'A tall glass and plenty of ice',
          'Optional: orange or grapefruit peel, a few drops of lemon, simple syrup',
        ],
      },
      { type: 'heading', text: 'Espresso tonic ratio' },
      {
        type: 'paragraph',
        text: 'Think in volumes, not brew-ratio grams. A single shot (30 ml) into 150 ml tonic is 1:5 — light and highball-like. A double (60 ml) into 180 ml tonic is 1:3 — café-standard and more coffee-forward. Start at 1:3.5 (about 50 ml espresso to 175 ml tonic) if you are unsure.',
      },
      {
        type: 'table',
        caption: 'Coffee tonic starting points. Tonic is measured after ice displacement — fill ice first.',
        headers: ['Style', 'Espresso', 'Tonic', 'Taste'],
        rows: [
          ['Light / spritz', '30 ml (1 shot)', '180 ml', 'More tonic, brunch-friendly'],
          ['Classic café', '50–60 ml', '160–180 ml', 'Balanced bitter-citrus'],
          ['Coffee-forward', '60 ml', '120–140 ml', 'Stronger, less sweet'],
        ],
      },
      { type: 'heading', text: 'Step-by-step espresso tonic' },
      {
        type: 'steps',
        items: [
          'Chill the glass and the tonic. Warm tonic goes flat and tastes metallic against espresso.',
          'Fill the glass with ice almost to the top.',
          'Pour tonic over the ice and wait 5–10 seconds for the foam to settle.',
          'Pull espresso (or brew a concentrated Moka shot). It should be fresh — stale espresso turns the drink muddy.',
          'Pour espresso slowly over the back of a spoon onto the tonic so it layers instead of exploding into foam.',
          'Do not stir unless you want a uniform tan highball. Many cafés serve it layered and let the drinker stir.',
          'Garnish with citrus peel if you like. Drink before the ice wrecks the bubbles.',
        ],
      },
      {
        type: 'tip',
        text: 'Pour espresso into tonic, not tonic into espresso. Espresso-first in an empty glass plus tonic on top is a foam geyser.',
      },
      { type: 'heading', text: 'Which tonic water works' },
      {
        type: 'paragraph',
        text: 'Indian tonic with quinine bitterness is the point of the drink. Super-sweet supermarket tonic plus a dark oily espresso tastes like cough syrup. Premium tonics with citrus oils (Fever-Tree Mediterranean-style, similarly dry crafts) flatter light-roast espresso. Diet tonic is fine if you want fewer calories; expect a sharper, thinner finish.',
      },
      { type: 'heading', text: 'Which coffee to use' },
      {
        type: 'list',
        items: [
          'Light-medium washed African or Central American espresso: citrus and tonic agree with each other.',
          'Classic chocolate espresso: drinkable but less “wow”; can taste cola-like.',
          'Very dark oily shots: clash with quinine — go lighter or use a single shot only.',
          'No machine: Moka pot concentrate, cooled 30 seconds, or 40 ml strong AeroPress inverted.',
        ],
      },
      { type: 'heading', text: 'Espresso tonic vs espresso soda vs americano' },
      {
        type: 'paragraph',
        text: 'Espresso soda is espresso plus unflavored sparkling water — drier, no quinine. Americano is espresso plus still hot water — a different drink entirely. Coffee tonic is specifically tonic water. If you hate tonic’s bitterness, you will hate this; try espresso soda with orange peel instead.',
      },
      { type: 'heading', text: 'Calories, caffeine, and when to drink it' },
      {
        type: 'paragraph',
        text: 'A double-shot espresso tonic is usually 80–120 calories depending on tonic sugar, with caffeine similar to a double espresso (~120 mg) plus a little from some tonics (usually negligible). It is an afternoon café drink more than a breakfast mug — carbonation plus acidity can bother empty stomachs. It is not a hydration drink; it is still caffeine plus sodium from tonic.',
      },
      { type: 'heading', text: 'Troubleshooting a bad coffee tonic' },
      {
        type: 'list',
        items: [
          'Tastes medicinal: tonic is too cheap/sweet or espresso is a very dark oily shot. Switch tonic and use a lighter roast.',
          'Tastes thin and watery: too much ice melt or too little espresso. Use a double and drink sooner.',
          'Flat in two minutes: tonic was warm or the bottle was already open for days. New cold tonic only.',
          'Foams over the rim: espresso hit tonic too fast, or you built espresso-first. Spoon pour, ice packed high.',
          'Sour espresso on top: the shot was under-extracted. Fix the espresso before blaming tonic.',
        ],
      },
      { type: 'heading', text: 'Easy variations worth making' },
      {
        type: 'paragraph',
        text: 'Orange peel expressed over the glass is the classic garnish. A few millilitres of grapefruit juice turns it toward a highball. A teaspoon of simple syrup helps if your tonic is very dry and your espresso is a light Nordic roast. Gin has no place in this recipe unless you are deliberately making a different cocktail — keep the coffee version non-alcoholic so the search intent stays honest.',
      },
      { type: 'heading', text: 'Batching for guests' },
      {
        type: 'paragraph',
        text: 'You cannot batch the bubbles. Chill glasses, pre-portion tonic, and pull shots to order. If you only have drip coffee, reduce 200 ml of strong coffee in a pan until you have ~60 ml of concentrate, cool it, and use that as the “espresso” layer — it will not taste like café espresso tonic, but the structure teaches the drink.',
      },
    ],
    faqs: [
      {
        question: 'What is the espresso tonic ratio?',
        answer:
          'Use about 1 part espresso to 3–4 parts tonic water by volume. A common café build is a double shot (50–60 ml) over ice with 160–180 ml chilled tonic.',
      },
      {
        question: 'How do you make a coffee tonic at home without espresso?',
        answer:
          'Brew a strong Moka pot or AeroPress concentrate (about 40–50 ml) and pour it over ice and tonic the same way. Instant espresso dissolved in 40 ml hot water also works in a pinch.',
      },
      {
        question: 'Why did my espresso tonic foam over?',
        answer:
          'You poured tonic onto espresso, used warm tonic, or poured the shot too fast. Ice and tonic first, then a slow espresso pour over a spoon.',
      },
      {
        question: 'Is espresso tonic the same as espresso and soda?',
        answer:
          'No. Tonic water has quinine and sweetness. Club soda or sparkling water makes a drier espresso soda. They are cousins, not the same recipe.',
      },
      {
        question: 'What tonic is best for espresso tonic?',
        answer:
          'A dry, citrus-leaning Indian tonic. Avoid the sweetest bargain tonics with a delicate light-roast shot. Diet tonic works if you want fewer calories.',
      },
      {
        question: 'Should you stir an espresso tonic?',
        answer:
          'Cafés often serve it layered and let you stir. Stirring makes the flavor uniform; leaving it layered looks nicer for ten seconds. Taste is the point — stir if the first sip is only tonic.',
      },
      {
        question: 'Is espresso tonic high in calories?',
        answer:
          'Usually 80–120 calories for a double-shot drink, driven by tonic sugar. Diet tonic drops that. It is not a protein drink and not a hydration plan.',
      },
    ],
  },
  {
    slug: 'how-to-make-a-flat-white',
    method: 'Flat White',
    title: 'How to Make a Flat White — vs Cappuccino, Ratio & Milk Texture',
    metaDescription:
      'How to make a flat white at home: espresso-to-milk ratio, microfoam, and flat white vs cappuccino vs latte. Recipe with or without a machine.',
    excerpt:
      'A flat white is a short, strong milk drink with glossy microfoam — not a wet cappuccino and not a small latte.',
    difficulty: 'Intermediate',
    brewTime: '3–5 min',
    ratio: '~1:3 to 1:4 espresso:milk',
    grind: 'Fine (espresso)',
    yield: '1 small cup (150–180 ml)',
    updated: '2026-10-29',
    image: '/images/espresso-hero.webp',
    quickAnswer:
      'A flat white is a double espresso (or two ristrettos) in a 150–180 ml cup, topped with thin, glossy steamed milk — little to no dry foam cap. Versus cappuccino: less foam, stronger coffee taste. Versus latte: smaller drink, higher espresso-to-milk ratio.',
    intro:
      '“What is a flat white” and “flat white vs cappuccino” are among the fastest-growing coffee-drink searches. The flat white started in Australia/New Zealand café culture and spread globally as the milk drink for people who find lattes too milky and cappuccinos too foamy. You can make a convincing one at home if you get cup size, espresso strength, and milk texture right — not if you just pour a latte into a smaller mug and rename it.',
    body: [
      { type: 'heading', text: 'Flat white vs cappuccino vs latte' },
      {
        type: 'table',
        caption: 'Typical café builds — shops vary, especially in the US.',
        headers: ['Drink', 'Cup size', 'Espresso', 'Milk texture'],
        rows: [
          ['Flat white', '150–180 ml (5–6 oz)', 'Double / two ristrettos', 'Thin microfoam, glossy, almost no dry cap'],
          ['Cappuccino', '150–180 ml', 'Single or double', 'Thicker foam; often a distinct white cap'],
          ['Latte', '240–350 ml+', 'Single or double', 'More steamed milk, thinner foam layer'],
          ['Cortado', '~120 ml', 'Double', 'Equal-ish espresso and milk, little foam'],
        ],
      },
      {
        type: 'paragraph',
        text: 'If you remember one sentence: a flat white is coffee-forward milk, velvety rather than fluffy. A cappuccino is a foam-forward cousin in a similar cup. A latte is a longer milk drink. US chains sometimes serve “flat whites” in larger cups that are really strong lattes — if yours tastes like a lot of milk, the cup was too big.',
      },
      { type: 'heading', text: 'The home recipe' },
      {
        type: 'list',
        items: [
          'A 5–6 oz ceramic cup (this is the ingredient people skip)',
          '18 g coffee in, ~36 g espresso out (1:2 double), or two short ristrettos',
          'About 120–140 ml milk (dairy textures easiest; see oat-milk notes below)',
          'A steam wand, or a Moka pot plus a handheld frother as a compromise',
        ],
      },
      {
        type: 'steps',
        items: [
          'Warm the cup. A cold mug kills microfoam.',
          'Pull a double espresso into the cup (or two ristrettos if you want it sweeter and denser).',
          'Steam milk to ~60–65°C (140–150°F). Stretch only 1–2 seconds for a little air, then spin to polish — you want wet paint, not soap bubbles.',
          'Tap and swirl the pitcher until the milk is uniform and shiny.',
          'Pour into the center of the espresso, raising the pitcher at the end for a small dot if you like latte art. You should still taste espresso clearly.',
        ],
      },
      {
        type: 'tip',
        text: 'If the surface looks like bubble bath, you stretched too long — that is cappuccino foam. If there is no sheen and it looks like hot milk, you did not incorporate any air. Flat white sits in the middle: microfoam you can pour, not scoop.',
      },
      { type: 'heading', text: 'No espresso machine' },
      {
        type: 'paragraph',
        text: 'A Moka pot 3-cup yields a concentrated base. Fill a small cup halfway with Moka coffee, then add steamed or frothed milk to 150–180 ml total. It will not have true crema or 9-bar sweetness, but the ratio and cup size still teach you what a flat white is supposed to feel like. AeroPress inverted, concentrated, can stand in too. Do not use a full mug of drip plus foam and call it a flat white — that is a different drink.',
      },
      { type: 'heading', text: 'Milk choice (including oat)' },
      {
        type: 'paragraph',
        text: 'Whole dairy milk is the easiest microfoam. Oat milk “barista” versions steam better than regular oat milk because they are formulated with extra fat/emulsifiers. Regular oat milk often splits or stays thin. Almond milk rarely holds a flat-white texture. If you want oat, buy a carton labeled barista and keep the drink small so the coffee still shows.',
      },
      { type: 'heading', text: 'Dialing taste' },
      {
        type: 'list',
        items: [
          'Too milky: smaller cup, or two ristrettos instead of a long double.',
          'Too harsh: slightly longer shot, or a medium espresso roast instead of a light filter roast forced through espresso.',
          'Sour: under-extracted espresso — finer grind or a bit more yield time.',
          'Bitter/ashy: coarser grind, cooler milk, or a less dark roast.',
        ],
      },
      { type: 'heading', text: 'Caffeine and calories' },
      {
        type: 'paragraph',
        text: 'A double-shot flat white is usually ~120–130 mg caffeine (two shots). Calories are mostly milk: roughly 80–120 kcal with whole dairy in a true small cup, more if a chain serves it in a 12 oz cup. It is not a protein drink unless you use high-protein milk — that is a different recipe (see protein coffee).',
      },
      { type: 'heading', text: 'Steaming in more detail' },
      {
        type: 'paragraph',
        text: 'Purge the wand. Tip just under the surface for a short paper-tear sound (that is your only stretch), then bury the tip and spin a whirlpool until the pitcher is too hot to hold comfortably for more than a second — about 60–65°C. If you hear screaming, the tip is too deep with no spin. If you hear ripping for ten seconds, you are making cappuccino foam. Wipe and purge after every drink so old milk does not bake onto the wand.',
      },
      { type: 'heading', text: 'Ristretto vs lungo in a flat white' },
      {
        type: 'paragraph',
        text: 'Two ristrettos (same dose, less water out) make a sweeter, heavier base that some Australian-style shops prefer. A long lungo makes a bigger, more watery coffee that then needs even less milk or it becomes a latte. If your home machine struggles to pull a clean 1:2, a slightly shorter 1:1.5–1:1.8 double in a small cup is closer to a flat white than a 40 g shot drowned in 250 ml of milk.',
      },
      { type: 'heading', text: 'Ordering one that is actually a flat white' },
      {
        type: 'list',
        items: [
          'Ask for a 5–6 oz cup. If they only have 8–12 oz, you are getting a strong latte.',
          'Specify two shots if the shop defaults to one.',
          'Oat: say barista oat if they have it; otherwise expect a thinner drink.',
          'If it arrives with a dry foam cap you could scoop, it was steamed like a cappuccino.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is a flat white?',
        answer:
          'A small espresso milk drink (about 5–6 oz) with a double shot and thin, glossy microfoam. It should taste stronger than a latte and less foamy than a cappuccino.',
      },
      {
        question: 'What is the difference between a flat white and a cappuccino?',
        answer:
          'Similar cup size, different texture. Cappuccino has a thicker foam cap. A flat white has velvety steamed milk poured through, so the coffee and milk integrate. Flat whites also usually use a double espresso.',
      },
      {
        question: 'Is a flat white stronger than a latte?',
        answer:
          'Usually yes, because there is less milk in a smaller cup around the same (or more) espresso. A 12 oz latte can have more total caffeine if it uses extra shots, but per sip a proper flat white is more intense.',
      },
      {
        question: 'Can you make a flat white with oat milk?',
        answer:
          'Yes if you use barista-formula oat milk and keep the cup small. Regular oat milk often will not microfoam cleanly and can drown the espresso.',
      },
      {
        question: 'What is the flat white coffee-to-milk ratio?',
        answer:
          'Roughly 1:3 to 1:4 espresso to milk by volume in a 150–180 ml cup — for example 50–60 ml espresso and 120–140 ml steamed milk.',
      },
      {
        question: 'Is a flat white the same as a cortado?',
        answer:
          'No. A cortado is even smaller and more equal espresso-to-milk, with little foam. A flat white is slightly longer and should have pourable microfoam.',
      },
      {
        question: 'Why does my homemade flat white taste like a latte?',
        answer:
          'The cup is too big or you stretched the milk too long and then filled it. Use a 150–180 ml cup and stop pouring when the espresso is still obvious.',
      },
    ],
  },
]

export const TRENDING_BEAN_ARTICLES: BeanArticle[] = [
  {
    slug: 'mushroom-coffee-explained',
    topic: 'Health',
    title: 'Mushroom Coffee Explained: Caffeine, Benefits & Is It Better?',
    metaDescription:
      'What is mushroom coffee? Caffeine vs regular coffee, lion’s mane and reishi claims, taste, and whether mushroom coffee is actually better for you.',
    excerpt:
      'Mushroom coffee is usually coffee plus mushroom extracts — lower caffeine, big wellness claims, mixed evidence. Here is what is real.',
    readTime: '12 min',
    updated: '2026-10-29',
    image: '/images/roast-levels-hero.webp',
    quickAnswer:
      'Mushroom coffee blends coffee with extracts like lion’s mane, reishi, or chaga. Most cups have about half the caffeine of regular coffee (often ~40–60 mg vs ~95 mg) because part of the scoop is mushroom, not bean. Wellness claims are ahead of human trials on the beverage itself — the reliable effect is usually less caffeine.',
    intro:
      'Mushroom coffee is one of the loudest functional-coffee searches of 2026: lion’s mane focus, reishi calm, “no jitters.” It is not coffee brewed from culinary mushrooms. It is typically instant or ground coffee mixed with powdered extracts of “functional” fungi. Whether it is “better” than coffee depends on why you drink coffee — flavor, caffeine, or supplement marketing.',
    body: [
      { type: 'heading', text: 'What mushroom coffee is (and is not)' },
      {
        type: 'paragraph',
        text: 'Commercial mushroom coffee is a blend. Brands mix Arabica (sometimes instant) with extracts of lion’s mane, cordyceps, reishi, chaga, turkey tail, or king trumpet. You are not eating a portobello. The mushrooms are grown, extracted (hot water and/or alcohol), dried, and dosed in milligrams to grams per serving. Instant mixes taste more “mushroom-earthy.” Ground blends with a higher coffee percentage taste closer to normal drip.',
      },
      {
        type: 'list',
        items: [
          'Lion’s mane: marketed for focus and cognition.',
          'Reishi: marketed for calm and “adaptogen” stress support.',
          'Cordyceps: marketed for energy and workouts.',
          'Chaga: marketed for antioxidants.',
          'Turkey tail: marketed for immune support.',
        ],
      },
      {
        type: 'tip',
        text: 'Those marketing jobs are based mostly on isolated mushroom studies, often in animals or small human trials of extracts — not on your specific 5 g instant packet. Dose on the tin is the only number that matters, and many tins are shy about milligrams of extract vs mycelium filler.',
      },
      { type: 'heading', text: 'Caffeine: the one clear difference' },
      {
        type: 'paragraph',
        text: 'Mushroom powder has no caffeine. If a serving is half coffee and half mushroom, caffeine drops roughly in half. Many popular instant mushroom coffees land around 40–60 mg per cup versus ~95 mg in 8 oz drip or ~150 mg in a large mug. Some people sleep better or feel less anxious after switching — clinicians quoted in mainstream explainers usually attribute that to less caffeine, not magic fungi. Always read the label: a “mushroom coffee” that is mostly coffee will still hit hard.',
      },
      {
        type: 'table',
        caption: 'Typical caffeine, not a lab test of every brand.',
        headers: ['Drink (8–10 oz-ish)', 'Approx caffeine'],
        rows: [
          ['Brewed coffee', '90–150 mg'],
          ['Espresso, 1 shot', '~63 mg'],
          ['Common instant mushroom coffee', '40–60 mg'],
          ['Decaf coffee', '2–15 mg'],
        ],
      },
      { type: 'heading', text: 'Is mushroom coffee better for you?' },
      {
        type: 'paragraph',
        text: 'Honest answer: it is not clearly better than coffee as a health food. Harvard and UCLA explainers note potential mushroom benefits (immune activity, antioxidants in fungi generally) but stress that processing into a coffee mix may not preserve those compounds, and clinical trials on mushroom coffee as a product are thin. Regular coffee already has a large observational evidence base at moderate intake. Mushroom coffee’s unique, proven advantage for most drinkers is a gentler caffeine load — useful if regular coffee wrecks sleep or jitters.',
      },
      { type: 'heading', text: 'Taste and how to brew it' },
      {
        type: 'paragraph',
        text: 'Expect nutty, earthy, slightly cocoa or woody notes. Instant sticks are convenient and taste least like specialty coffee. Ground blends can go in a dripper or French press; use your normal ratio as a start, then expect a little less intensity because part of the bed is not coffee. Do not pay specialty-bean prices and then bury a delicate washed Ethiopian under a heavy reishi mix — use a chocolatey medium roast if you DIY a blend.',
      },
      {
        type: 'steps',
        items: [
          'Check caffeine mg per serving on the package.',
          'If instant: 200–250 ml hot water, stir, wait 20 seconds so grit settles.',
          'If ground: brew like drip at 1:16 and taste; add a gram or two of coffee if it is thin.',
          'Judge after a week of sleep and jitters, not after one Instagram cup.',
        ],
      },
      { type: 'heading', text: 'Safety, cost, and who should skip it' },
      {
        type: 'list',
        items: [
          'Generally treated as food-safe for healthy adults in moderation — still talk to a clinician if you are pregnant, on immunosuppressants, anticoagulants, or have mushroom allergies.',
          'Quality varies: look for extract ratios, fruiting-body vs mycelium-on-grain, and third-party testing if you care.',
          'It is usually more expensive per caffeine milligram than decent beans.',
          'GI upset happens; stop if you get cramps or rashes.',
        ],
      },
      { type: 'heading', text: 'DIY vs branded packets' },
      {
        type: 'paragraph',
        text: 'You can stir a measured lion’s mane extract into coffee you already like. That separates “I want less caffeine” (just drink smaller coffee or half-caf) from “I want this extract.” Combining them in a proprietary blend makes it hard to know what you paid for. If your only goal is fewer jitters, half-caf or a smaller mug is cheaper and better studied than a $2 sachet.',
      },
      { type: 'heading', text: 'How to read a mushroom coffee label' },
      {
        type: 'list',
        items: [
          'Caffeine mg per serving — the number that actually predicts jitters and sleep.',
          'Extract vs “mycelium on grain”: grain filler can pad the bag with starch.',
          'Fruiting body vs mycelium claims: marketing loves fruiting body; dose still has to be listed.',
          'Other extras: collagen, probiotics, herbs. More ingredients means more ways to get an upset stomach.',
          'Third-party testing if you are paying premium prices.',
        ],
      },
      { type: 'heading', text: 'Mushroom coffee vs half-caf vs decaf' },
      {
        type: 'table',
        caption: 'Pick the tool that matches the job.',
        headers: ['If you want…', 'Usually cheaper/clearer option'],
        rows: [
          ['Less caffeine, same coffee taste', 'Half-caf or smaller mug of beans you like'],
          ['Almost no caffeine', 'Decaf (still a few mg)'],
          ['To try lion’s mane as a supplement', 'Measured extract, not a mystery blend'],
          ['A different ritual / earthy flavor', 'Mushroom coffee is fair — judge taste honestly'],
        ],
      },
      { type: 'heading', text: 'A week-long trial that is actually useful' },
      {
        type: 'steps',
        items: [
          'Keep bedtime and alcohol the same.',
          'Replace your usual morning coffee with the mushroom blend at the labeled serving.',
          'Log sleep, jitters, and whether you needed a second caffeinated drink at 11 a.m.',
          'If you just chased caffeine with a real coffee anyway, the blend did not replace anything — it added cost.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is mushroom coffee?',
        answer:
          'A mix of coffee and powdered extracts of functional mushrooms such as lion’s mane, reishi, or chaga. It is not brewed from grocery mushrooms.',
      },
      {
        question: 'Does mushroom coffee have caffeine?',
        answer:
          'Yes, unless it is a caffeine-free mushroom drink mislabeled as coffee. Most blends have less caffeine than regular coffee — often around 40–60 mg per cup — because mushrooms dilute the coffee portion.',
      },
      {
        question: 'Is mushroom coffee better for you than regular coffee?',
        answer:
          'Not proven as a superior health drink. The realistic benefit for many people is lower caffeine. Mushroom-specific benefits are not well established for the coffee mix itself. This is general information, not medical advice.',
      },
      {
        question: 'Does mushroom coffee taste like mushrooms?',
        answer:
          'Ground blends with more coffee taste mildly earthy. Instant mixes with a high mushroom percentage taste more like cocoa, wood, or broth-adjacent earthiness than a café espresso.',
      },
      {
        question: 'Can mushroom coffee help with anxiety?',
        answer:
          'Some people feel calmer because they ingest less caffeine. That is not the same as treating an anxiety disorder. If caffeine is the trigger, half-caf or fewer shots may do the same job.',
      },
      {
        question: 'Is lion’s mane coffee the same as a lion’s mane supplement?',
        answer:
          'Usually no. Coffee mixes often contain less extract than a dedicated capsule, and the dose is poorly labeled. Do not assume café wellness claims equal a clinical dose.',
      },
      {
        question: 'Can I brew mushroom coffee in a French press or espresso machine?',
        answer:
          'Ground blends can go in a press or dripper. Instant sticks are for a mug of hot water. Do not put unknown extra powders through an espresso machine’s group head.',
      },
    ],
  },
  {
    slug: 'matcha-vs-coffee',
    topic: 'Health',
    title: 'Matcha vs Coffee: Caffeine, Energy, Health & Which to Drink',
    metaDescription:
      'Matcha vs coffee compared: caffeine per cup, jitters, L-theanine, calories in matcha lattes, and which one to drink for focus or stomach comfort.',
    excerpt:
      'Matcha is not “decaf coffee.” Here is how caffeine, crash, and café lattes actually compare — including the sugary ones Google also ranks.',
    readTime: '11 min',
    updated: '2026-10-29',
    image: '/images/pour-over-hero.webp',
    quickAnswer:
      'Coffee usually delivers more caffeine faster (about 95 mg per 8 oz drip vs roughly 40–75 mg in a typical serving of matcha, depending on grams whisked). Matcha’s L-theanine may make the lift feel smoother. A café matcha latte can rival a flavored coffee in sugar. Choose based on caffeine budget, stomach, and whether you actually like green-tea flavor.',
    intro:
      'Matcha latte is one of the most-searched café drinks on earth; “matcha vs coffee” follows right behind as people try to switch, stack, or cut jitters. They are different plants (Camellia sinensis vs Coffea) with different caffeine curves, minerals, and café calorie traps. This is a practical comparison for drinkers, not a wellness contest.',
    body: [
      { type: 'heading', text: 'Caffeine: coffee usually wins on milligrams' },
      {
        type: 'paragraph',
        text: 'An 8 oz brewed coffee is commonly ~95 mg caffeine. A ceremonial-style bowl might use 2 g matcha (~40–70 mg, highly variable). Café scoops are often 2–4 g. Espresso is ~63 mg per shot but tiny. Cold brew can exceed drip per ounce. If you replace a 16 oz drip (~190 mg) with a lightly whisked matcha, you will feel less wired — that can be the whole point.',
      },
      {
        type: 'table',
        caption: 'Ballpark averages — brands and scoop size swing matcha a lot.',
        headers: ['Drink', 'Typical caffeine'],
        rows: [
          ['Drip coffee, 8 oz', '~95 mg'],
          ['Drip coffee, 16 oz', '~190 mg'],
          ['Espresso, 1 shot', '~63 mg'],
          ['Matcha, ~2 g in water', '~40–70 mg'],
          ['Café matcha latte, 12–16 oz', '~70–140 mg (ask grams used)'],
        ],
      },
      { type: 'heading', text: 'Why matcha can feel “smoother”' },
      {
        type: 'paragraph',
        text: 'Matcha contains L-theanine, an amino acid studied with caffeine for attention without as much of the edgy peak some people get from coffee alone. You still get a stimulant. Slow sipping of a latte versus slamming espresso also changes how you feel. If matcha still jitters you, the café used a heavy scoop or you stacked it with coffee.',
      },
      { type: 'heading', text: 'Health claims, stripped down' },
      {
        type: 'list',
        items: [
          'Both are plant drinks with polyphenols. Coffee has a large epidemiology file at moderate intake; matcha/green tea has its own (catechins like EGCG).',
          'Neither detoxes you. Neither replaces sleep.',
          'Matcha is powdered whole leaf, so you ingest more of the leaf than in steeped tea — including whatever was on the leaf (buy reputable sources).',
          'Stomach: coffee is more likely to trigger reflux in sensitive people; matcha can still nauseate on empty stomach, especially lattes with dairy.',
          'Teeth: both can stain; sweet lattes add sugar exposure.',
        ],
      },
      { type: 'heading', text: 'Calories: the latte problem' },
      {
        type: 'paragraph',
        text: 'Plain coffee and plain matcha-in-water are both very low calorie. The search intent often hides a 12–16 oz sweet matcha latte (milk + syrup) that can run 200–400+ kcal — in the same neighborhood as a flavored coffee latte. If you switched “for health” and kept the pumps, you switched flavors, not outcomes. Unsweetened matcha with a splash of milk is the fair comparison to black or white coffee.',
      },
      { type: 'heading', text: 'When to pick coffee' },
      {
        type: 'list',
        items: [
          'You need a reliable, cheap caffeine dose you can measure.',
          'You like roast flavor, espresso drinks, or brewing as a hobby.',
          'You already tolerate coffee and do not want a second stimulant habit.',
        ],
      },
      { type: 'heading', text: 'When to pick matcha' },
      {
        type: 'list',
        items: [
          'Coffee gives reflux, jitters, or you want a lower-caffeine ritual.',
          'You like savory-green, umami, slightly sweet vegetal flavors.',
          'You want an afternoon drink that is less likely to match a double espresso.',
        ],
      },
      { type: 'heading', text: 'Can you drink both?' },
      {
        type: 'paragraph',
        text: 'Yes — count combined caffeine toward the ~400 mg healthy-adult ballpark (less in pregnancy). A morning coffee plus an afternoon matcha is a common split. Stacking a large cold brew and a sweet matcha latte is how people accidentally overshoot and then blame “matcha insomnia.”',
      },
      {
        type: 'tip',
        text: 'Quality gap is huge. Grocery “matcha latte mix” is often sugar plus green coloring. Look for stone-milled matcha with origin (Uji, Nishio, etc.) if you care about taste; culinary grade is fine in milk drinks.',
      },
      { type: 'heading', text: 'How to make a fair home comparison' },
      {
        type: 'steps',
        items: [
          'Weekday A: your usual 8–12 oz coffee, no extra syrup.',
          'Weekday B: 2 g matcha whisked in 60 ml 80°C water, then the same milk you use in coffee, no syrup.',
          'Note energy at 30 minutes, 3 hours, and bedtime — not which drink is trendier.',
          'If B needs two extra scoops to feel awake, you did not switch to a “healthier stimulant.” You under-dosed caffeine.',
        ],
      },
      { type: 'heading', text: 'Ceremonial vs culinary vs latte mix' },
      {
        type: 'paragraph',
        text: 'Ceremonial-grade matcha is meant for water, with a sweeter, less astringent sip. Culinary grade is stronger and more bitter — fine in milk. Latte mixes are often sugar, milk powder, and a little green tea. Comparing a ceremonial bowl to a pumpkin-spice latte is not a caffeine study; it is two different groceries.',
      },
      { type: 'heading', text: 'Stomach, teeth, and sleep' },
      {
        type: 'list',
        items: [
          'Coffee is the more common reflux trigger; matcha lattes can still bother dairy-sensitive people.',
          'Both stain; water rinses help more than buying a new powder.',
          'Late matcha still contains caffeine. “Tea doesn’t affect me” is often a smaller milligram dose, not magic.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does matcha have more caffeine than coffee?',
        answer:
          'Usually no, per typical serving. Coffee drip and large café coffees often contain more milligrams. Matcha can catch up if the shop uses several grams in a large latte.',
      },
      {
        question: 'Is matcha healthier than coffee?',
        answer:
          'Not automatically. Both can fit a healthy diet. Matcha’s edge is often lower caffeine and L-theanine; coffee’s edge is a bigger research base for moderate coffee drinking. Sugary lattes of either kind are dessert.',
      },
      {
        question: 'Why does matcha not give me the same energy as coffee?',
        answer:
          'You are probably taking in fewer milligrams of caffeine, and theanine plus slower sipping can blunt the spike. Use more matcha only if you still feel well — do not chase coffee’s peak.',
      },
      {
        question: 'Can I replace coffee with matcha in the morning?',
        answer:
          'Yes if the lower caffeine still wakes you up. Expect a few days of coffee withdrawal (headache, fatigue) if you were a heavy coffee drinker.',
      },
      {
        question: 'Is a matcha latte better than a coffee latte?',
        answer:
          'Only if you cut sugar and control milk. Otherwise they are similar calorie bombs with different flavor and a different caffeine curve.',
      },
      {
        question: 'How much matcha equals a cup of coffee?',
        answer:
          'There is no exact swap. Roughly 3–4 g of matcha can approach an 8 oz drip in caffeine, depending on the powder. Taste gets very intense before milligrams match a large café coffee.',
      },
      {
        question: 'Can I drink matcha and coffee in the same day?',
        answer:
          'Yes. Add the milligrams together and stay near your personal limit (often under ~400 mg for healthy adults, less in pregnancy). Morning coffee plus a modest afternoon matcha is a common split.',
      },
    ],
  },
  {
    slug: 'oat-milk-in-coffee',
    topic: 'Milk & Brewing',
    title: 'Oat Milk in Coffee: Best Oat Milk for Lattes & Why It Splits',
    metaDescription:
      'Best oat milk for coffee and lattes, why oat milk curdles, barista vs regular oat milk, calories vs dairy, and how to steam oat milk at home.',
    excerpt:
      'Oat milk searches hit records in 2026. Here is which carton actually microfoams, why coffee splits it, and how it changes calories.',
    readTime: '11 min',
    updated: '2026-10-29',
    image: '/images/french-press-hero.webp',
    quickAnswer:
      'Use a carton labeled barista oat milk for lattes and flat whites. Regular oat milk is thinner, sweeter, and splits more easily in hot acidic coffee. Add oat milk to slightly cooled espresso or pour espresso into the milk. Barista versions cost more because they are built to steam.',
    intro:
      'Oat milk is the plant milk that won cafés: it steams better than most almonds, tastes sweeter than soy for many people, and is everywhere on Google alongside flat whites and protein lattes. It is also the milk that mysteriously curdles in a perfectly good shot. The fix is chemistry plus buying the right formula — not “oat milk is bad.”',
    body: [
      { type: 'heading', text: 'Why cafés default to oat' },
      {
        type: 'paragraph',
        text: 'Barista oat milks are formulated with extra oil, acidity regulators, and sometimes gums so they stretch into microfoam and do not break the moment espresso hits. That is why a $5 latte can look glossy with oat while the same drink at home with a cheap original oat milk looks watery or grainy. You are not crazy; you bought a drinking-oat, not a steaming-oat.',
      },
      { type: 'heading', text: 'Barista vs original vs unsweetened' },
      {
        type: 'table',
        caption: 'Typical patterns — read your label.',
        headers: ['Type', 'Best for', 'Watch-outs'],
        rows: [
          ['Barista', 'Lattes, flat whites, cappuccinos', 'Higher calories/fat; some brands taste oily'],
          ['Original', 'Iced coffee, cereal, drinking', 'Splits in hot espresso; extra sweetness'],
          ['Unsweetened', 'Calorie control, iced', 'Can taste cardboard; still may split if not barista'],
          ['Extra creamy / full fat oat', 'Dessert lattes', 'Calories can match 2% dairy'],
        ],
      },
      { type: 'heading', text: 'Why oat milk curdles in coffee' },
      {
        type: 'paragraph',
        text: 'Espresso is hot and acidic. Oat proteins and starches can coagulate when pH drops and temperature spikes — especially in light-roast, high-acid shots. You see specks, slime, or a broken layer. Darker, lower-acid espresso and slightly cooler shots are gentler. Pouring espresso into the oat milk (instead of milk into a naked hot shot) buffers the hit. A pinch of baking soda is a café hack some people use; it flattens acidity and can taste soapy if you overdo it — better to cool the shot 20 seconds or switch roast.',
      },
      {
        type: 'steps',
        items: [
          'Buy barista oat milk if you steam.',
          'Let espresso sit 15–30 seconds or pull into a pre-warmed pitcher of oat milk.',
          'Do not boil oat milk; steam to ~55–65°C. Overheating splits it.',
          'If it still breaks, try a medium-dark espresso roast or a different barista brand — formulas are not interchangeable.',
        ],
      },
      { type: 'heading', text: 'Calories and sugar vs dairy' },
      {
        type: 'paragraph',
        text: 'Oat milk is not automatically lighter. Enzymes turn oat starch into maltose, so many cartons taste sweet and land around 120 kcal per cup — similar to 2% dairy, sometimes more than skim. A 12 oz oat latte can match or beat a dairy latte. Unsweetened barista lines help. If the goal is protein, oat is usually weak (~2–4 g per cup) versus dairy or soy; protein coffee with oat still needs powder.',
      },
      { type: 'heading', text: 'How oat milk changes flavor' },
      {
        type: 'list',
        items: [
          'Adds cereal, vanilla, and sweetness — can hide origin nuance in a light roast pour over.',
          'Pairs well with chocolatey medium espresso, pistachio-style syrups, and iced drinks.',
          'Can mute acidity that some people drink light roasts for — that is a feature if you hate sour lattes.',
        ],
      },
      { type: 'heading', text: 'Home steaming without a wand' },
      {
        type: 'paragraph',
        text: 'Heat barista oat milk gently, then use a handheld frother for 15–20 seconds. French-press pumping also works: warm milk, plunge rapidly to foam, rest 10 seconds, pour. Microwave-plus-jar-shake is messy but fine for iced oat lattes. Skip boiling.',
      },
      { type: 'heading', text: 'Allergies, environment, and “is oat milk healthy”' },
      {
        type: 'paragraph',
        text: 'Oat milk is a gluten-cross-contamination risk for some people with celiac unless certified. It is not a protein equivalent to dairy. Environmentally it generally beats dairy on land and many emissions metrics, with caveats by brand and farm. “Healthy” depends on the rest of the carton: added oils, sugar, and gums. If you want a plant latte that microfoams and you like the taste, barista oat is a reasonable choice — not a superfood.',
      },
      { type: 'heading', text: 'Oat vs soy vs almond in coffee' },
      {
        type: 'table',
        caption: 'Home steaming, not a moral ranking.',
        headers: ['Milk', 'Foam', 'Protein (per cup, typical)', 'Coffee behavior'],
        rows: [
          ['Barista oat', 'Good if not overheated', '~2–4 g', 'Sweet cereal; can split in very acidic shots'],
          ['Soy (barista if available)', 'Decent', '~6–8 g', 'Beanier flavor; some brands curdle too'],
          ['Almond', 'Usually poor', '~1 g', 'Thin, nutty, splits easily'],
          ['Dairy whole', 'Easiest microfoam', '~8 g', 'Classic flat white texture'],
        ],
      },
      { type: 'heading', text: 'Iced oat lattes are easier than hot' },
      {
        type: 'paragraph',
        text: 'Cold espresso or cold brew over ice plus oat milk skips the steam-split problem. Shake or stir; use original oat if you only drink iced. Save barista cartons for hot drinks. If an iced oat latte tastes watery, you under-dosed coffee — the milk is sweet enough already.',
      },
      { type: 'heading', text: 'Storage and waste' },
      {
        type: 'list',
        items: [
          'Refrigerate after opening; most barista oats last 7–10 days, not a month.',
          'Shake every time — oils separate and then your foam dies.',
          'Do not leave steamed leftovers in the pitcher from yesterday.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the best oat milk for coffee?',
        answer:
          'A barista-labeled oat milk. Those formulas steam and resist splitting better than original drinking oat milk. Among barista cartons, pick the one whose flavor you like — they differ more than marketing admits.',
      },
      {
        question: 'Why does oat milk curdle in coffee?',
        answer:
          'Heat plus acidity from espresso. Use barista oat, slightly cooler shots, and pour espresso into the milk. Very light, bright espresso is the worst match for cheap original oat milk.',
      },
      {
        question: 'Is oat milk better than dairy in coffee?',
        answer:
          'It is better if you want a plant option that actually foams. Dairy still wins on protein and is often easier to steam. Calories can be similar.',
      },
      {
        question: 'Does oat milk have more sugar than milk?',
        answer:
          'Often yes, even when unsweetened is not on the label, because enzymes create sugars from starch. Check the nutrition panel per 240 ml.',
      },
      {
        question: 'Can you make a flat white with oat milk?',
        answer:
          'Yes with barista oat milk in a small cup. Regular oat milk usually will not hold microfoam, so the drink becomes a thin oat latte.',
      },
      {
        question: 'Is oat milk healthier than dairy in a latte?',
        answer:
          'Not automatically. Calories are often similar. Dairy usually has more protein. Choose based on taste, digestion, and whether you need a plant option — not a halo around the word oat.',
      },
      {
        question: 'Why is café oat milk better than mine at home?',
        answer:
          'Cafés buy barista formulas and steam to a controlled temperature. Grocery original oat plus boiling espresso is the usual homemade failure.',
      },
    ],
  },
]

export const TRENDING_TOOLS: ToolMeta[] = [
  {
    slug: 'protein-coffee-calculator',
    name: 'Protein Coffee Calculator',
    title: 'Protein Coffee Calculator — Proffee Protein, Calories & Caffeine',
    metaDescription:
      'Protein coffee calculator: estimate protein grams, calories, and caffeine in homemade proffee from powder, milk, and espresso, drip, or cold brew.',
    excerpt:
      'Build a hot or iced protein coffee and see protein, calories, and caffeine before you shake it.',
    icon: 'Beaker',
    category: 'Calculator',
    keywords: [
      'protein coffee calculator',
      'proffee calories',
      'how much protein in protein coffee',
      'protein coffee calories',
      'protein latte protein grams',
    ],
    faqs: [
      {
        question: 'How much protein is in protein coffee?',
        answer:
          'Most of it comes from the powder and the milk. One scoop of whey is often 20–25 g; a cup of dairy milk adds ~8 g; coffee adds ~0. Coffee-shop protein lattes vary by size and booster.',
      },
      {
        question: 'How many calories are in proffee?',
        answer:
          'A whey scoop is often 110–140 kcal. Milk can add 30–150+ kcal depending on type and amount. Black coffee is negligible. Syrups stack fast.',
      },
      {
        question: 'Does protein powder add caffeine?',
        answer:
          'Almost never, unless it is a pre-workout or coffee-flavored mix with added caffeine. Check the label. This calculator treats powder as 0 mg caffeine.',
      },
      {
        question: 'Is homemade protein coffee the same as a café protein latte?',
        answer:
          'Same idea, different ingredients. Cafés often use protein-fortified milk instead of a kitchen scoop. Use this tool for homemade builds.',
      },
      {
        question: 'Can I use plant protein in the calculator?',
        answer:
          'Yes — type your scoop’s protein grams and calories from the label. Plant scoops are often lower protein per calorie and grittier in hot coffee.',
      },
      {
        question: 'Does milk double-count protein with the powder?',
        answer:
          'The tool adds milk protein and powder protein together, which is correct. Ultra-filtered dairy plus a full whey scoop can land north of 35 g — fine for many adults, not a requirement.',
      },
    ],
  },
  {
    slug: 'hydration-calculator',
    name: 'Hydration Calculator',
    title: 'Hydration Calculator — Height, Weight & Water You’ve Drunk',
    metaDescription:
      'Free hydration calculator: enter height, weight, and how much water you’ve drunk. Get an estimated daily fluid target and how hydrated you are versus that target. Coffee can count too.',
    excerpt:
      'Height, weight, and glasses so far — see an estimated daily water target and how close you are.',
    icon: 'Droplets',
    category: 'Calculator',
    keywords: [
      'hydration calculator',
      'how much water should I drink',
      'water intake calculator by weight',
      'am I hydrated calculator',
      'daily water intake calculator',
      'does coffee count as water',
    ],
    faqs: [
      {
        question: 'How much water should I drink a day?',
        answer:
          'A common adult starting point is about 30–35 ml per kilogram of body weight, then adjusted for height (body size) and heat or exercise. Many people land near 2–3 litres from all fluids, not water alone. This tool estimates a personal target — it is not a prescription.',
      },
      {
        question: 'Does height matter for hydration?',
        answer:
          'Weight drives most of the math, but height changes body surface area and estimated total body water. Two people at 70 kg can have different fluid targets if one is much taller.',
      },
      {
        question: 'Does coffee count toward hydration?',
        answer:
          'For most regular coffee drinkers, yes — the water in the cup counts. Caffeine is only a mild diuretic at typical doses. Very high caffeine, alcohol, heat, or illness is a different story.',
      },
      {
        question: 'Can this tell me if I am dehydrated?',
        answer:
          'No. It only compares today’s logged fluids to a typical target. Dark urine, dizziness, confusion, or not peeing need medical care, not a website bar chart.',
      },
      {
        question: 'Can you drink too much water?',
        answer:
          'Yes. Forcing gallons can dilute blood sodium (hyponatremia), especially during long endurance events. Hitting 100–120% of this estimate is plenty for a normal day.',
      },
    ],
  },
]

export const TRENDING_TOOL_CONTENT: Record<
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
  'protein-coffee-calculator': {
    intro:
      'People searching how to make protein coffee immediately want two numbers: grams of protein and calories. This calculator uses typical USDA-style averages for milk and coffee, plus a customizable powder scoop, so you can see whether your “healthy latte” is a 180 kcal breakfast or a 400 kcal dessert. Brands vary — treat the output as a planning estimate.',
    howToUse: [
      {
        step: 'Pick your coffee base',
        detail:
          'Espresso, strong drip, and cold brew change caffeine a lot and calories almost not at all. Choose what you actually brew.',
      },
      {
        step: 'Set your protein powder',
        detail:
          'Use the label if you have it (protein grams and calories per scoop). The defaults assume a typical whey isolate scoop.',
      },
      {
        step: 'Choose milk type and amount',
        detail:
          'Oat and whole milk move calories more than protein. Almond milk does the opposite. Barista oat is not magically high-protein.',
      },
      {
        step: 'Add syrup if you use it',
        detail:
          'Each teaspoon of sugar is about 16 kcal. Flavored café pumps are often more — round up if you are honest with yourself.',
      },
    ],
    proTips: [
      'Mix powder into cold milk first so the calculator’s “one scoop” actually ends up in the glass, not in the sink strainer.',
      'If you use Fairlife-style ultra-filtered milk, bump protein and keep calories similar to the “high-protein dairy” preset.',
      'Collagen in black coffee: set milk to zero and lower the scoop calories/protein to your collagen tub.',
      'Café protein lattes are a different formula — this tool is for homemade proffee.',
    ],
    whyItMatters:
      'Protein coffee is the rare viral drink that people actually make daily. A calculator that shows protein next to caffeine stops the two failure modes: chalky over-scooping, and a “fitness drink” that is secretly a mocha.',
    relatedSlugs: [
      'coffee-calories-calculator',
      'caffeine-calculator',
      'cold-brew-calculator',
      'espresso-ratio-calculator',
    ],
    answerTables: [
      {
        title: 'Typical homemade protein coffee (estimates)',
        caption: 'Whey isolate ~24 g protein / 120 kcal per scoop. Your tub wins over this table.',
        headers: ['Build', 'Protein', 'Calories', 'Caffeine'],
        rows: [
          ['Double espresso + water + 1 scoop', '~24 g', '~125', '~126 mg'],
          ['Double espresso + 240 ml skim + 1 scoop', '~32 g', '~205', '~126 mg'],
          ['Cold brew 8 oz + 240 ml oat + 1 scoop', '~26 g', '~240', '~155 mg'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'Proffee vs protein latte',
        paragraphs: [
          'Proffee is DIY powder plus coffee. A protein latte at a chain is usually espresso plus protein-boosted milk, sometimes with syrup. Protein can look similar on the menu board while calories diverge with flavor pumps.',
          'Use the full protein coffee guide for mixing technique so the numbers you calculate are the drink you actually swallow.',
        ],
      },
      {
        heading: 'Where the calories actually hide',
        paragraphs: [
          'The scoop is obvious. Milk type is the silent swing: almond vs oat vs whole dairy can move a drink by 100+ kcal with similar protein only if you picked high-protein dairy. Syrup is the third lever — two teaspoons of sugar are ~32 kcal; café pumps are often more.',
          'If weight loss is the goal, freeze the powder brand, change milk down, then cut syrup. Do not add a second scoop “for gains” on top of oat milk and caramel.',
        ],
      },
      {
        heading: 'Caffeine is independent of protein',
        paragraphs: [
          'Whey does not cancel espresso. A double shot plus cold brew in the same shaker is still two caffeine sources. Use the caffeine calculator if you are stacking pre-workout and proffee.',
          'Unflavored collagen in black coffee can look “high protein” on Instagram and still be a small dose — enter the tub’s grams, not the marketing scoop art.',
        ],
      },
    ],
  },
  'hydration-calculator': {
    intro:
      '“How much water should I drink?” is usually answered with a blunt 8 glasses — which ignores body size. This hydration calculator uses height and weight to estimate a daily fluid target (about 35 ml per kilogram, scaled by body surface area, with a bump for hot or sweaty days). You log water already drunk, optionally count coffee or tea, and see how close you are. It cannot measure cells or electrolytes. It is a planning gauge for a normal day.',
    howToUse: [
      {
        step: 'Choose metric or US units',
        detail:
          'Height in cm (or feet and inches) and weight in kg (or pounds). Sex only switches the Hume total-body-water equation so taller vs shorter bodies at the same weight are not treated identically.',
      },
      {
        step: 'Log what you’ve already drunk',
        detail:
          'Slide water glasses (250 ml metric / 8 oz US). Add coffee or tea cups if you want them included — moderate coffee still counts as fluid for most habitual drinkers.',
      },
      {
        step: 'Set the kind of day you’re having',
        detail:
          'Desk days stay at the base target. Walking or a hot commute needs more. Hard workouts and heat need more still — this is a rough multiplier, not sweat-loss science.',
      },
      {
        step: 'Read percent, litres left, and glasses left',
        detail:
          'The bar is intake divided by today’s estimated target. If you are behind, drink steadily, not a chug. If you are far over, you do not need to keep forcing water.',
      },
    ],
    proTips: [
      'Urine color (pale straw vs dark apple juice) is a better real-time check than any calculator.',
      'Coffee counts; alcohol does not hydrate you the same way. Don’t “make up” a hangover with this tool alone.',
      'Pregnancy, kidney disease, heart failure, and some medications change fluid rules — follow a clinician, not this page.',
      'Pair this with the caffeine calculator if you’re stacking large cold brews and wondering why sleep and thirst feel off.',
    ],
    whyItMatters:
      'Coffee drinkers are told they are dehydrated by default. A height-and-weight fluid target plus an honest coffee slider answers that search without pretending to be a lab test — and it supports the dehydrate-myth article with a thing people can actually use.',
    relatedSlugs: [
      'caffeine-calculator',
      'caffeine-half-life-calculator',
      'coffee-calories-calculator',
      'protein-coffee-calculator',
    ],
    answerTables: [
      {
        title: 'Rough daily fluid targets (desk day, all fluids)',
        caption: 'About 35 ml/kg before height/activity tweaks. Includes water, coffee, tea, food moisture is extra.',
        headers: ['Weight', 'Ballpark target', '8 oz glasses'],
        rows: [
          ['55 kg / 121 lb', '~1.9 L', '~8'],
          ['68 kg / 150 lb', '~2.4 L', '~10'],
          ['82 kg / 180 lb', '~2.9 L', '~12'],
          ['95 kg / 210 lb', '~3.3 L', '~14'],
        ],
      },
    ],
    hubSections: [
      {
        heading: 'Does coffee dehydrate you?',
        paragraphs: [
          'Usually not at 1–4 normal cups. The mug is mostly water; caffeine’s diuretic effect is mild if you drink coffee regularly. Count those cups here, then still drink water across the day — especially after sweaty exercise.',
          'Read the full explainer if you want the myth vs the studies, then come back and log today’s glasses.',
        ],
      },
      {
        heading: 'What this percentage is not',
        paragraphs: [
          'It is not blood osmolality, not a medical dehydration grade, and not advice to drink until you slosh. Illness, vomiting, endurance racing, and heat waves need oral rehydration or clinical care. If you feel faint, confused, or have not urinated, stop using a website and get help.',
        ],
      },
      {
        heading: 'How the height and weight math works',
        paragraphs: [
          'Base target starts near 35 ml of fluid per kilogram. Body surface area (from height × weight) scales that so a tall person and a short person at the same weight are not treated as identical. The Hume equation estimates total body water as a sanity check — you do not need to drink your entire TBW every day.',
          'Activity multipliers bump the target for walking or heat. They are not sweat-loss tests. If you finished a long run, drink to thirst and urine color first.',
        ],
      },
      {
        heading: 'Coffee, tea, and what we ignore',
        paragraphs: [
          'The coffee slider assumes a typical cup of fluid. It does not subtract extra urine from a 400 mg caffeine bomb, and it does not add soup, fruit, or beer. Alcohol still dehydrates relative to water. Food moisture is a real part of intake in diet surveys — this tool is drinks-only so you do not get a false “I’m done” from a watery lunch.',
        ],
      },
    ],
  },
}
