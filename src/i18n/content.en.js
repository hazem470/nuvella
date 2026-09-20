/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  NUVELLA — ENGLISH CONTENT (source of truth for structure)
 * ─────────────────────────────────────────────────────────────────────────────
 *  `content.ar.js` mirrors this file key-for-key. When you add a field here,
 *  add it there too — the components read the same paths in both languages.
 *
 *  ⚠️  DEMO / PLACEHOLDER NOTICE
 *  Nuvella is a fictional brand. Ingredient lists, safety statements, reviews,
 *  certifications and business details are illustrative placeholder content and
 *  must be reviewed by a qualified cosmetic formulator, regulatory specialist
 *  and legal counsel before any commercial use.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const content = {
  meta: {
    code: 'en',
    dir: 'ltr',
    label: 'English',
    short: 'EN',
    flag: '🇬🇧',
    switchTo: 'العربية',
    switchLabel: 'Switch to Arabic',
  },

  /* ── Announcement banner ─────────────────────────────────────── */
  announcement: {
    text: '🚀 Coming Soon — Our products are currently in preparation. Stay tuned for the official launch.',
    short: '🚀 Coming Soon — Launching very soon',
    cta: 'Follow on Telegram',
  },

  /* ── Brand ───────────────────────────────────────────────────── */
  brand: {
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
  },

  /* ── Product ─────────────────────────────────────────────────── */
  product: {
    // Egyptian market pricing — see README for how to change it in one place.
    price: 349,
    compareAt: 429,
    currency: 'EGP',
    currencyLabel: 'EGP',
    rating: 4.9,
    ratingCount: 1284,
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
    inStock: 'Pre-launch',
    preLaunchNote:
      'Products are currently in preparation. Orders will open on launch day — follow us on Telegram for the release date.',
  },

  /* ── Ingredients ─────────────────────────────────────────────── */
  ingredients: [
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
  ],

  /* ── Benefits ────────────────────────────────────────────────── */
  benefits: [
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
  ],

  whyChooseUs: [
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
  ],

  /* ── Reviews (DEMO) ──────────────────────────────────────────── */
  reviews: [
    {
      name: 'Amelia R.',
      location: 'New Cairo',
      rating: 5,
      title: 'Finally, a lotion that doesn’t feel sticky',
      text: 'We tried four other lotions before this one. It goes on light and my daughter is dressed thirty seconds later — no fighting, no residue on her onesies.',
      date: 'March 2026',
      verified: true,
    },
    {
      name: 'Daniel K.',
      location: 'Alexandria',
      rating: 5,
      title: 'The pump is genuinely well designed',
      text: 'One hand, quiet, locks for the nappy bag. Small thing, but it is the reason this lives on the changing table instead of in a cupboard.',
      date: 'February 2026',
      verified: true,
    },
    {
      name: 'Priya S.',
      location: 'Giza',
      rating: 4,
      title: 'Lovely texture, subtle scent',
      text: 'The scent is barely there, which I prefer. I use it after every bath and my son’s skin feels consistently soft. Only wish the bottle were bigger.',
      date: 'February 2026',
      verified: true,
    },
    {
      name: 'Marcus T.',
      location: 'Maadi',
      rating: 5,
      title: 'Our go-to gift for new parents',
      text: 'Bought one for ourselves, then three more as gifts. The packaging is beautiful enough to hand over without wrapping.',
      date: 'January 2026',
      verified: true,
    },
    {
      name: 'Sofia L.',
      location: 'Mansoura',
      rating: 5,
      title: 'Gentle enough for our routine',
      text: 'We use it twice a day and have had no trouble at all. It absorbs quickly and never leaves a film on her skin.',
      date: 'January 2026',
      verified: true,
    },
    {
      name: 'Hannah B.',
      location: 'Sheikh Zayed',
      rating: 5,
      title: 'Worth the price',
      text: 'It costs more than the supermarket option and I keep buying it anyway. A little goes a long way — one bottle lasted us nearly three months.',
      date: 'December 2025',
      verified: true,
    },
  ],

  /* ── FAQ ─────────────────────────────────────────────────────── */
  faqs: [
    {
      q: 'How do I use the lotion?',
      a: 'Dispense one to two pumps into your palm, warm it between your hands, then smooth it over clean, dry skin with light circular strokes. There is no need to rub it in — it absorbs on its own within about thirty seconds. Use morning and after bath, and reapply to dry areas as needed.',
    },
    {
      q: 'What is the bottle size?',
      a: 'The standard bottle contains 250 ml and measures Ø 58 mm × 168 mm — sized to sit comfortably in one hand and to fit a standard changing-table shelf. A 500 ml refill pouch is also available.',
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
      a: 'Store below 30°C, away from direct sunlight and heat sources. The pump locks with a half turn for travel. Once opened, use within 12 months — there is a small open-jar symbol on the carton to remind you.',
    },
    {
      q: 'Is the packaging recyclable?',
      a: 'Yes. The carton is uncoated FSC-certified board printed with soy-based inks, and the bottle is recyclable HDPE. The 500 ml refill pouch uses 62% less plastic than a second bottle, and the pump can be reused across refills.',
    },
    {
      q: 'How much does delivery cost?',
      a: 'Delivery is 60 EGP anywhere in Egypt, and free on orders over 750 EGP. Once the product launches you will be able to order directly through this page — until then, follow us on Telegram for the launch date.',
    },
    {
      q: 'When will the product be available?',
      a: 'Nuvella is currently in the final preparation stage before launch. The exact release date will be announced on our Telegram channel first. Follow us on Telegram so you do not miss it.',
    },
  ],

  /* ── Navigation ──────────────────────────────────────────────── */
  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'Product', href: '#product' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Ingredients', href: '#ingredients' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ],

  footerLinks: {
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
      { label: 'Contact Support', href: '#contact' },
      { label: 'Launch Updates', href: '#contact' },
    ],
  },

  contact: {
    email: 'hello@nuvella.example',
    care: 'care@nuvella.example',
    phone: '+20 100 000 0000',
    address: 'Nuvella Studio, 14 Alder Lane, Suite 200, Cairo, Egypt',
    hours: 'Saturday – Thursday, 10:00 – 18:00 (EET)',
    telegramLabel: 'Contact us on Telegram',
    telegramHandle: '@Hazem455ziad',
  },

  social: [
    { label: 'Instagram', href: '#', icon: 'Instagram' },
    { label: 'Facebook', href: '#', icon: 'Facebook' },
    { label: 'Pinterest', href: '#', icon: 'Bookmark' },
    { label: 'YouTube', href: '#', icon: 'Youtube' },
    { label: 'X', href: '#', icon: 'Twitter' },
  ],

  trustBadges: [
    { icon: 'Truck', text: 'Delivery 60 EGP · free over 750 EGP' },
    { icon: 'RefreshCw', text: '30-day returns, even opened' },
    { icon: 'Lock', text: 'Secure checkout' },
    { icon: 'Recycle', text: 'Refillable & recyclable' },
  ],

  /* ── Legal (placeholders) ────────────────────────────────────── */
  legal: {
    privacyTitle: 'Privacy Policy',
    privacy: [
      'This is demo placeholder copy for a fictional brand. A real privacy policy would describe, in plain language, what personal data is collected (name, delivery address, email, order history), why it is collected, how long it is retained, who it is shared with (payment processors, carriers), and the rights available to you under applicable law such as GDPR or Egypt’s Personal Data Protection Law.',
      'It would also explain the use of cookies and analytics, how marketing consent is obtained and withdrawn, and how to contact the data controller. Replace this text with a policy reviewed by qualified legal counsel before launch.',
    ],
    termsTitle: 'Terms & Conditions',
    terms: [
      'This is demo placeholder copy for a fictional brand. Real terms and conditions would set out the basis of sale: pricing and currency, order acceptance, delivery timelines and risk, cancellation and returns, product use and storage expectations, limitation of liability, and the governing law and jurisdiction for disputes.',
      'They would also cover intellectual property, acceptable use of the website, and how changes to the terms are communicated. Replace this text with terms reviewed by qualified legal counsel before launch.',
    ],
  },

  /* ── Photography briefs (prompts stay in English) ────────────── */
  imageBriefs: [
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
  ],

  imageAssets: {
    hero: './images/hero.svg',
    front: './images/front.svg',
    side: './images/side.svg',
    detail: './images/detail.svg',
    lifestyle: './images/lifestyle.svg',
    background: './images/background.svg',
  },

  /* ── Section headings & UI strings ───────────────────────────── */
  ui: {
    skipToProduct: 'Skip to product',

    // Hero
    heroEyebrow: 'Premium everyday baby care',
    heroHeadline: 'Quiet comfort for',
    heroHeadlineAccent: 'delicate skin',
    heroSub:
      'One lightweight lotion, made for the smallest hands and the busiest mornings — designed to be reached for every single day.',
    heroRatingFrom: 'from',
    heroRatingReviews: 'reviews',
    heroMeta: '250 ml · Refillable · Dermatologist-style tested',
    heroDemoNote: 'Demo storefront — reviews, ratings and testing statements are placeholder content.',
    absorbsIn: 'Absorbs in',
    absorbsInValue: '~30 sec',
    heroValues: [
      'No dyes or drying alcohols',
      'Fragrance under 0.3%',
      'Refillable bottle',
      '22-ingredient formula',
      'Made for daily use',
    ],

    // Buttons
    shopNow: 'Shop Now',
    discoverMore: 'Discover More',
    addedToBag: 'Added to Bag',
    addToCart: 'Add to Cart',
    buyNow: 'Buy Now',
    viewProduct: 'View the Product',
    contactUs: 'Contact Us',
    continueShopping: 'Continue Shopping',
    clearBag: 'Clear bag',
    close: 'Close',
    seeAll: 'See all',
    showBriefs: 'Show briefs',
    hideBriefs: 'Hide briefs',
    viewPrompt: 'View generation prompt',
    hoverToZoom: 'Hover to zoom',

    // Product section
    productEyebrow: 'The product',
    productReviewsSuffix: 'reviews',
    saveLabel: 'Save',
    taxesNote: 'Taxes calculated at checkout',
    sizeLabel: 'Size',
    sizeStandard: '— standard',
    refillNote: 'A 500 ml refill pouch is also available (uses 62% less plastic).',
    editionLabel: 'Edition',
    ingredientsPreview: 'Ingredients preview',
    ingredientsPreviewNote:
      'Full ingredient list is placeholder demo content and must be reviewed by a qualified formulator before commercial use.',
    tabDescription: 'Description',
    tabFeatures: 'Key Features',
    tabHow: 'How to Use',
    tabSafety: 'Safety',
    galleryFront: 'Front',
    gallerySide: 'Side',
    galleryHero: 'Hero',
    galleryDetail: 'Detail',
    galleryLifestyle: 'Lifestyle',
    galleryAlt: 'Product image viewer — use the left and right arrow keys to change image',
    demoVisualNote: 'Demo visual — replace with product photography.',

    // Editions
    editionScented: 'Scented',
    editionScentedNote: 'Soft oat-milk scent, under 0.3%',
    editionUnscented: 'Unscented',
    editionUnscentedNote: 'Fragrance-free edition',

    // Sections
    storyEyebrow: 'Our story',
    storyTitle: 'Made for the minute after the bath.',
    personalityLabel: 'Personality',
    audienceLabel: 'Made for',

    benefitsEyebrow: 'Why parents reach for it',
    benefitsTitle: 'Four quiet reasons it earns its place on the shelf',
    benefitsSub:
      'No long claims, no complicated routines. Just the things that matter when you are holding a baby in one arm.',

    whyEyebrow: 'Why choose Nuvella',
    whyTitle: 'Premium, without the theatre',
    whySub:
      'We removed everything that did not need to be there — and spent the difference on the things you can feel.',

    howEyebrow: 'How to use',
    howTitle: 'Three steps, about a minute',
    howSub: 'Designed for one-handed application — because the other hand is usually busy.',

    ingredientsEyebrow: 'What is inside',
    ingredientsTitle: 'A short list, each with a reason to be there',
    ingredientsSub: 'Twenty-two ingredients in total. These are the eight that do the visible work.',
    demoIngredient: 'Demo ingredient',
    disclosureEyebrow: 'Full disclosure',
    disclosureTitle: 'Placeholder ingredient content',
    disclosureText:
      'This ingredient list is illustrative demo content for a fictional product. A real commercial formula requires a documented INCI list, a supplier-verified specification for every material, allergen declaration, and a Cosmetic Product Safety Report (CPSR) signed by a qualified safety assessor before the product can be placed on the market.',
    ingredientClaims: [
      'No synthetic dyes',
      'No drying alcohols',
      'No essential oils',
      'Fragrance under 0.3%',
      'Mildly acidic pH',
    ],

    reviewsEyebrow: 'What parents say',
    reviewsTitle: 'Reviews from the changing table',
    reviewsSub:
      'A small selection of demo testimonials. These are placeholder reviews written for this demo storefront — not real customer feedback.',
    reviewsBasedOn: 'Based on',
    reviewsDemoWord: 'demo reviews',
    reviewsBadge: 'Demo',
    reviewsDisclaimer:
      '⚠️ All reviews, names, locations, ratings and review counts shown on this page are fictional placeholder content created for this demo storefront. They must be replaced with verified, consented customer testimonials before any commercial launch — publishing fabricated reviews is unlawful in most markets.',

    faqEyebrow: 'Questions, answered',
    faqTitle: 'Everything you might want to ask',
    faqSub: 'If your question is not here, our care team replies within one working day.',
    faqContactTitle: 'Still wondering?',
    faqContactText:
      'Our care team is small and human. Ask us anything about the formula, the packaging or the routine — we will answer properly.',
    labelEmail: 'Email',
    labelPhone: 'Phone',
    labelHours: 'Hours',
    labelStudio: 'Studio',

    ctaEyebrow: 'Begin the routine',
    ctaTitle: 'The quietest part of the day can also be the softest.',
    ctaSub:
      'One bottle, one minute, twice a day. That is the whole routine — and it is enough. Nuvella is almost ready.',
    ctaStat1: '250 ml',
    ctaStat1Label: 'Standard size',
    ctaStat2: '22',
    ctaStat2Label: 'Ingredients',
    ctaStat3: '~30 sec',
    ctaStat3Label: 'To absorb',

    briefsEyebrow: 'For the design team',
    briefsTitle: 'Photography briefs',
    briefsSub:
      'Every visual on this page is a self-contained demo illustration. Below is the art direction and a ready-to-use prompt for the real photograph that replaces it.',
    briefsNote1: 'Replace the demo SVGs in',
    briefsNote2: 'with your own licensed photography, keeping the same filenames — or point',
    briefsNote3: 'in',
    briefsNote4:
      'at new paths. Do not link to third-party image URLs you do not have rights to use.',

    footerAbout:
      'A small, considered range of everyday baby care — made to be used daily and thought about rarely.',
    footerAboutTitle: 'About',
    footerQuickLinks: 'Quick Links',
    footerCustomerCare: 'Customer Care',
    footerNewsletterLabel: 'Join the quiet list',
    footerNewsletterNote: 'Demo form — no data is transmitted or stored.',
    footerCopyright: 'A fictional brand created for this demo storefront.',
    footerTelegramHeading: 'Stay updated',

    // Cart
    cartTitle: 'Your Bag',
    cartEmpty: 'Your bag is empty',
    cartEmptyHint: 'Add Daily Comfort Baby Lotion to get started.',
    cartSubtotal: 'Subtotal',
    cartShipping: 'Shipping',
    cartFree: 'Free',
    cartTotal: 'Total',
    cartCheckout: 'Proceed to Checkout',
    cartFreeShipPrefix: 'Add',
    cartFreeShipSuffix: 'more for free shipping.',
    cartCheckoutNote: 'Checkout opens on launch day — contact us on Telegram for the release date.',
    cartItemAdded: 'added to your bag.',
    cartCheckoutDemo: 'Checkout is disabled in this demo build.',

    // Accessibility labels
    a11yDecrease: 'Decrease quantity',
    a11yIncrease: 'Increase quantity',
    a11yQuantity: 'Quantity',
    a11yQuantityFor: 'Quantity for',
    a11yRemove: 'Remove',
    a11yRemoveFromBag: 'from bag',
    a11yOpenBag: 'Open shopping bag',
    a11yCloseBag: 'Close shopping bag',
    a11yOpenMenu: 'Open menu',
    a11yCloseMenu: 'Close menu',
    a11yHome: 'Nuvella — home',
    a11yProductImages: 'Product images',
    a11yViewImage: 'View',
    a11yPrevImage: 'Previous image',
    a11yNextImage: 'Next image',
    a11yPrimary: 'Primary',
    a11yAbout: 'About',
    a11yQuickLinks: 'Quick Links',
    a11yCustomerCare: 'Customer Care',
    a11yProductInfo: 'Product information',
    a11yDismiss: 'Dismiss notification',
    a11ySubscribe: 'Subscribe to the newsletter',
    a11yPlaceholderLink: 'placeholder link',
    a11yLanguage: 'Language',
    a11yTelegram: 'Contact us on Telegram',
  },
}

export default content
