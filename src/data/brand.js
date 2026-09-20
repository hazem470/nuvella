/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NUVELLA — BRAND & CONTENT SOURCE OF TRUTH
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything on the website is driven by this single file. Edit copy, prices,
 *  reviews, FAQ, colours-in-copy and image briefs here — no component changes
 *  needed for a content refresh.
 *
 *  ⚠️  DEMO / PLACEHOLDER NOTICE
 *  Nuvella is a fictional brand created for this demo. Ingredient lists,
 *  safety statements, reviews, certifications and business details are
 *  illustrative placeholder content. They MUST be reviewed and approved by a
 *  qualified cosmetic formulator, regulatory affairs specialist and legal
 *  counsel before any commercial use.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const brand = {
  name: 'Nuvella',
  wordmark: 'NUVELLA',
  productName: 'Daily Comfort Baby Lotion',
  fullProductName: 'Nuvella Daily Comfort Baby Lotion',
  tagline: 'Quiet comfort for delicate skin.',
  slogan: 'Softness, every single day.',
  story:
    'Nuvella began with a simple observation: the smallest people in the room deserve the calmest care. We spent two years working with a small team of formulators and parents to build a daily lotion that asks for nothing but a minute of your attention — light, quiet, and easy to reach for. No complicated routines. No long ingredient lists for the sake of it. Just one honest product, made to be part of the everyday.',
  personality: ['Gentle', 'Calm', 'Thoughtful', 'Unfussy', 'Quietly premium'],
  audience:
    'Parents and caregivers of babies and toddlers (0–3 years) who read labels, value simplicity, and want a premium everyday product they can trust without thinking about it.',
  promise: 'Made for the everyday. Kind to the smallest skin.',
}

export const palette = [
  { name: 'Warm Cream', hex: '#FAF6F1', role: 'Primary background' },
  { name: 'Soft Clay', hex: '#B87F68', role: 'Primary accent' },
  { name: 'Sage Mist', hex: '#7E9A78', role: 'Secondary accent' },
  { name: 'Warm Charcoal', hex: '#3A342E', role: 'Text & detail' },
  { name: 'Petal Blush', hex: '#E8CFC4', role: 'Soft highlight' },
]

export const typography = {
  display: 'Fraunces — a soft, humanist serif for headlines and the wordmark',
  body: 'DM Sans — a clean geometric sans for body copy, navigation and UI',
}

export const packaging = {
  bottle:
    '260 ml matte-finish HDPE bottle with a gently tapered shoulder, an oval cross-section for a confident grip, and a soft-touch amber-tinted body that protects the formula from light.',
  closure:
    'Brushed aluminium-look lockable pump with a half-turn lock — one-handed, quiet, and travel-safe.',
  label:
    'A wrap-around textured paper label in Warm Cream, letterpress-style wordmark, a single clay-rose arc motif, and a sage band along the base. Front of label carries only the essentials: brand, product name, volume.',
  carton:
    'Uncoated FSC-certified folding carton in Warm Cream with a clay-rose foil wordmark and a debossed arc. Fully recyclable, soy-based inks, no plastic film.',
  size: '250 ml / 8.5 fl oz',
  fill: '250 ml',
  dimensions: 'Ø 58 mm × 168 mm',
}

export const product = {
  price: 24.0,
  compareAt: 29.0,
  currency: 'USD',
  currencySymbol: '$',
  rating: 4.9,
  ratingCount: 1284, // demo figure
  shortDescription:
    'A lightweight daily lotion that absorbs in seconds and leaves skin feeling soft, smooth and comfortably calm.',
  description:
    'Daily Comfort Baby Lotion is built around a short, gentle formula: a squalane-and-glycerin base that holds moisture, oat and calendula extracts chosen for their soothing character, and a soft oat-milk scent that fades within minutes. The texture is deliberately light — it spreads with almost no pressure and sinks in before you have finished dressing your little one. Designed for morning, after bath, and every quiet moment in between.',
  features: [
    {
      icon: 'Droplets',
      title: 'Lightweight, fast-absorbing',
      text: 'A fluid lotion texture that settles in within about 30 seconds — no sticky film, no waiting.',
    },
    {
      icon: 'Feather',
      title: 'Fragrance-light',
      text: 'A gentle oat-milk scent at less than 0.3%, or choose the unscented edition.',
    },
    {
      icon: 'Leaf',
      title: 'Short, considered formula',
      text: '22 ingredients, each with a stated purpose. Nothing added for decoration.',
    },
    {
      icon: 'ShieldCheck',
      title: 'Dermatologist-style testing',
      text: 'Demo formulation tested under paediatric-dermatological supervision (placeholder statement).',
    },
    {
      icon: 'Recycle',
      title: 'Refill-friendly packaging',
      text: 'A 500 ml refill pouch uses 62% less plastic than a second bottle.',
    },
    {
      icon: 'Thermometer',
      title: 'pH balanced for delicate skin',
      text: 'Formulated to a mildly acidic pH range typical of infant skin.',
    },
  ],
  howToUse: [
    {
      step: '01',
      title: 'Warm a small amount',
      text: 'Dispense one to two pumps into your palm and warm it between your hands for a moment.',
    },
    {
      step: '02',
      title: 'Smooth gently',
      text: 'Glide over clean, dry skin with light, circular strokes. No rubbing required.',
    },
    {
      step: '03',
      title: 'Use daily',
      text: 'Apply morning and after bath. Reapply to dry patches as needed through the day.',
    },
  ],
  safety: {
    warnings: [
      'For external use only.',
      'Keep out of reach of children. Not intended for ingestion.',
      'Avoid contact with eyes. If contact occurs, rinse thoroughly with clean water.',
      'Discontinue use if irritation or redness develops and consult a healthcare professional.',
      'Do not apply to broken, cracked or infected skin.',
      'Store below 30°C / 86°F, away from direct sunlight and heat.',
      'Use within 12 months of opening.',
      'If your baby has a diagnosed skin condition, speak with your paediatrician or dermatologist before use.',
    ],
    disclaimer:
      'This product is a cosmetic preparation for moisturising and softening the skin. It is not a medicine and is not intended to diagnose, treat, cure or prevent any disease or skin condition.',
    placeholderNote:
      '⚠️ PLACEHOLDER SAFETY CONTENT — the warnings above are illustrative demo copy for a fictional product. A real commercial launch requires a Cosmetic Product Safety Report (CPSR), compliant labelling for each market, and review by a qualified regulatory specialist.',
  },
}

export const ingredients = [
  {
    icon: 'Droplet',
    name: 'Squalane (Olive-Derived)',
    role: 'Softening emollient',
    text: 'A lightweight, plant-derived emollient that helps skin feel supple without a heavy finish.',
    placeholder: true,
  },
  {
    icon: 'Wind',
    name: 'Glycerin',
    role: 'Humectant',
    text: 'Draws and holds water in the upper layers of the skin, helping it stay comfortably hydrated.',
    placeholder: false,
  },
  {
    icon: 'Sprout',
    name: 'Oat Extract',
    role: 'Soothing botanical',
    text: 'A colloidal oat derivative traditionally used in gentle skincare for its calming character.',
    placeholder: true,
  },
  {
    icon: 'Flower2',
    name: 'Calendula Extract',
    role: 'Comforting botanical',
    text: 'A gentle flower extract included to help skin feel settled and comfortable.',
    placeholder: true,
  },
  {
    icon: 'Shield',
    name: 'Panthenol (Pro-Vitamin B5)',
    role: 'Skin conditioning',
    text: 'A conditioning agent that supports the feel of soft, resilient skin.',
    placeholder: false,
  },
  {
    icon: 'Layers',
    name: 'Shea Butter (Refined)',
    role: 'Rich occlusive',
    text: 'Used sparingly for a cushioning feel — enough to comfort, light enough for daily use.',
    placeholder: true,
  },
  {
    icon: 'Milk',
    name: 'Sunflower Seed Oil',
    role: 'Light emollient',
    text: 'A thin, easily spread oil rich in linoleic acid, chosen for its gentle slip.',
    placeholder: true,
  },
  {
    icon: 'CheckCircle2',
    name: 'Tocopherol (Vitamin E)',
    role: 'Antioxidant',
    text: 'Helps protect the formula itself from oxidation and supports the skin’s natural barrier feel.',
    placeholder: false,
  },
]

export const benefits = [
  {
    icon: 'Droplets',
    title: 'Gentle Moisture',
    text: 'A humectant-and-emollient base that helps skin hold on to water through the day.',
  },
  {
    icon: 'Feather',
    title: 'Soft & Smooth Skin',
    text: 'Leaves a velvety, cushioned finish — soft to the touch, never greasy.',
  },
  {
    icon: 'Wind',
    title: 'Fast Absorption',
    text: 'Sinks in within about thirty seconds, so dressing, cuddling and play can carry on.',
  },
  {
    icon: 'Sun',
    title: 'Everyday Care',
    text: 'Light enough for twice-daily use, from the first weeks through the toddler years.',
  },
]

export const whyChooseUs = [
  {
    icon: 'HeartHandshake',
    title: 'Gentle Formula',
    text: '22 ingredients. No dyes, no drying alcohols, no essential oils. Built to be boring in the best way.',
  },
  {
    icon: 'Sparkles',
    title: 'Premium Ingredients',
    text: 'Olive-derived squalane, refined shea, colloidal oat — sourced from named suppliers with full traceability.',
  },
  {
    icon: 'Sun',
    title: 'Everyday Baby Care',
    text: 'Designed around real routines: the morning change, the after-bath minute, the bedtime wind-down.',
  },
  {
    icon: 'Package',
    title: 'Thoughtful Packaging',
    text: 'Refillable bottle, recyclable carton, lockable pump. Premium without the plastic guilt.',
  },
]

export const reviews = [
  {
    name: 'Amelia R.',
    location: 'Portland, OR',
    rating: 5,
    title: 'Finally, a lotion that doesn’t feel sticky',
    text: 'We tried four other lotions before this one. It goes on light and my daughter is dressed thirty seconds later — no fighting, no residue on her onesies.',
    date: 'March 2026',
    verified: true,
  },
  {
    name: 'Daniel K.',
    location: 'Copenhagen, DK',
    rating: 5,
    title: 'The pump is genuinely well designed',
    text: 'One hand, quiet, locks for the nappy bag. Small thing, but it is the reason this lives on the changing table instead of in a cupboard.',
    date: 'February 2026',
    verified: true,
  },
  {
    name: 'Priya S.',
    location: 'Toronto, CA',
    rating: 4,
    title: 'Lovely texture, subtle scent',
    text: 'The scent is barely there, which I prefer. I use it after every bath and my son’s skin feels consistently soft. Only wish the bottle were bigger.',
    date: 'February 2026',
    verified: true,
  },
  {
    name: 'Marcus T.',
    location: 'Austin, TX',
    rating: 5,
    title: 'Our go-to gift for new parents',
    text: 'Bought one for ourselves, then three more as gifts. The packaging is beautiful enough to hand over without wrapping.',
    date: 'January 2026',
    verified: true,
  },
  {
    name: 'Sofia L.',
    location: 'Milan, IT',
    rating: 5,
    title: 'Gentle enough for our routine',
    text: 'We use it twice a day and have had no trouble at all. It absorbs quickly and never leaves a film on her skin.',
    date: 'January 2026',
    verified: true,
  },
  {
    name: 'Hannah B.',
    location: 'Manchester, UK',
    rating: 5,
    title: 'Worth the price',
    text: 'It costs more than the supermarket option and I keep buying it anyway. A little goes a long way — one bottle lasted us nearly three months.',
    date: 'December 2025',
    verified: true,
  },
]

export const faqs = [
  {
    q: 'How do I use the lotion?',
    a: 'Dispense one to two pumps into your palm, warm it between your hands, then smooth it over clean, dry skin with light circular strokes. There is no need to rub it in — it absorbs on its own within about thirty seconds. Use morning and after bath, and reapply to dry areas as needed.',
  },
  {
    q: 'What is the bottle size?',
    a: 'The standard bottle contains 250 ml / 8.5 fl oz and measures Ø 58 mm × 168 mm — sized to sit comfortably in one hand and to fit a standard changing-table shelf. A 500 ml refill pouch is also available.',
  },
  {
    q: 'How often can it be used?',
    a: 'Daily Comfort is designed for everyday use — typically twice a day, in the morning and after bath time. Because the texture is light and the formula is short, there is no need to alternate it with another product. If your baby’s skin is unusually dry, you can reapply to those areas during the day.',
  },
  {
    q: 'Is it suitable for sensitive skin?',
    a: 'The formula was developed with delicate skin in mind: no dyes, no drying alcohols, no essential oils, and a fragrance level under 0.3% (with an unscented edition available). That said, every baby is different. We recommend a small patch test on the inner forearm 24 hours before first full use. If your baby has a diagnosed skin condition, speak with your paediatrician or dermatologist before use.',
  },
  {
    q: 'How should the product be stored?',
    a: 'Store below 30°C / 86°F, away from direct sunlight and heat sources. The pump locks with a half turn for travel. Once opened, use within 12 months — there is a small open-jar symbol on the carton to remind you.',
  },
  {
    q: 'Is the packaging recyclable?',
    a: 'Yes. The carton is uncoated FSC-certified board printed with soy-based inks, and the bottle is recyclable HDPE. The 500 ml refill pouch uses 62% less plastic than a second bottle, and the pump can be reused across refills.',
  },
  {
    q: 'What is your returns policy?',
    a: 'If Nuvella is not right for your family, contact us within 30 days of delivery and we will arrange a full refund — even on an opened bottle. This is demo copy for a fictional brand; a real policy would be set by the retailer.',
  },
]

export const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'Product', href: '#product' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
]

export const footerLinks = {
  about: [
    { label: 'Our Story', href: '#story' },
    { label: 'Brand Philosophy', href: '#why-us' },
    { label: 'Sustainability', href: '#why-us' },
    { label: 'Press Enquiries', href: '#contact' },
  ],
  quickLinks: [
    { label: 'Shop', href: '#product' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Ingredients', href: '#ingredients' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ],
  customerCare: [
    { label: 'Shipping & Delivery', href: '#faq' },
    { label: 'Returns & Refunds', href: '#faq' },
    { label: 'Track Your Order', href: '#contact' },
    { label: 'Contact Support', href: '#contact' },
  ],
}

export const contact = {
  email: 'hello@nuvella.example',
  care: 'care@nuvella.example',
  phone: '+1 (555) 012-3456',
  address: 'Nuvella Studio, 14 Alder Lane, Suite 200, Portland, OR 97204',
  hours: 'Monday – Friday, 9:00 – 17:00 (PT)',
}

export const social = [
  { label: 'Instagram', href: '#', icon: 'Instagram' },
  { label: 'Facebook', href: '#', icon: 'Facebook' },
  { label: 'Pinterest', href: '#', icon: 'Bookmark' },
  { label: 'YouTube', href: '#', icon: 'Youtube' },
  { label: 'X', href: '#', icon: 'Twitter' },
]

export const trustBadges = [
  { icon: 'Truck', text: 'Free shipping over $60' },
  { icon: 'RefreshCw', text: '30-day returns, even opened' },
  { icon: 'Lock', text: 'Secure checkout' },
  { icon: 'Recycle', text: 'Refillable & recyclable' },
]

export const legal = {
  privacyTitle: 'Privacy Policy',
  privacy: [
    'This is demo placeholder copy for a fictional brand. A real privacy policy would describe, in plain language, what personal data is collected (name, delivery address, email, order history), why it is collected, how long it is retained, who it is shared with (payment processors, carriers), and the rights available to you under applicable law such as GDPR or CCPA.',
    'It would also explain the use of cookies and analytics, how marketing consent is obtained and withdrawn, and how to contact the data controller. Replace this text with a policy reviewed by qualified legal counsel before launch.',
  ],
  termsTitle: 'Terms & Conditions',
  terms: [
    'This is demo placeholder copy for a fictional brand. Real terms and conditions would set out the basis of sale: pricing and currency, order acceptance, delivery timelines and risk, cancellation and returns, product use and storage expectations, limitation of liability, and the governing law and jurisdiction for disputes.',
    'They would also cover intellectual property, acceptable use of the website, and how changes to the terms are communicated. Replace this text with terms reviewed by qualified legal counsel before launch.',
  ],
}

export const imageBriefs = [
  {
    id: 'hero',
    title: 'Main Hero Image',
    ratio: '4:5 portrait',
    description:
      'The bottle standing on a warm cream pedestal, soft directional light from the upper left, a long gentle shadow, a single blurred sage leaf in the foreground. Negative space at the top for a headline.',
    prompt:
      'Premium product photography of a matte amber-tinted baby lotion bottle with a brushed metal pump, standing on a warm cream stone pedestal, soft window light from the upper left, long soft shadow, blurred sage eucalyptus leaf in the foreground, warm neutral background, minimalist, editorial, shot on 85mm, shallow depth of field, high-end skincare campaign, no text, no logo',
  },
  {
    id: 'front',
    title: 'Front Product Shot',
    ratio: '1:1 square',
    description:
      'Straight-on packshot on a seamless warm cream background. Label fully readable, even lighting, crisp edge definition, subtle contact shadow. The reference image for all retailer listings.',
    prompt:
      'Straight-on packshot of a premium baby lotion bottle with a lockable pump, centered on a seamless warm cream background, even studio lighting, crisp edges, subtle contact shadow, label facing camera, e-commerce catalogue photography, no text, no logo',
  },
  {
    id: 'side',
    title: 'Side Product Shot',
    ratio: '1:1 square',
    description:
      'Three-quarter rear angle showing the pump profile and the sage band along the base of the label. Reveals bottle depth and the tapered shoulder.',
    prompt:
      'Three-quarter rear angle product shot of a matte baby lotion bottle, showing pump profile and sage green band at the base of the label, warm cream seamless background, studio lighting, premium e-commerce photography, no text, no logo',
  },
  {
    id: 'detail',
    title: 'Close-Up Packaging Shot',
    ratio: '3:2 landscape',
    description:
      'Macro on the pump head and label edge — brushed metal, textured paper, the debossed arc catching raking light. Communicates craft and material quality.',
    prompt:
      'Macro close-up of a brushed aluminium lotion pump and textured paper label edge, raking side light revealing paper grain and a debossed arc motif, warm neutral tones, extreme detail, luxury packaging photography, no text, no logo',
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle Image',
    ratio: '3:2 landscape',
    description:
      'A parent’s hands smoothing lotion on a baby’s arm on a linen changing mat, morning light through a sheer curtain. Faces out of frame. Warm, calm, unstyled.',
    prompt:
      'Warm lifestyle photograph of a parent’s hands gently smoothing lotion onto a baby’s arm, baby lying on a natural linen changing mat, soft morning light through a sheer curtain, faces out of frame, warm neutral tones, calm domestic atmosphere, editorial family photography, shallow depth of field, no text',
  },
  {
    id: 'background',
    title: 'Baby-Care Themed Background',
    ratio: '16:9 wide',
    description:
      'A soft overhead flat-lay: folded muslin cloth, a wooden hairbrush, a sprig of dried oat, on warm cream linen. Low contrast and slightly out of focus so text can sit over it.',
    prompt:
      'Overhead flat-lay of baby care objects on warm cream linen — folded muslin cloth, small wooden brush, sprig of dried oats, soft folded towel — very soft diffused light, low contrast, gentle shadows, muted pastel palette, background texture for a website hero, no text',
  },
]

export const imageAssets = {
  // Local, self-contained SVG visuals shipped with the project (no external URLs).
  hero: './images/hero.svg',
  front: './images/front.svg',
  side: './images/side.svg',
  detail: './images/detail.svg',
  lifestyle: './images/lifestyle.svg',
  background: './images/background.svg',
}
