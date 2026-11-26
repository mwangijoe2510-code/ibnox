// ─────────────────────────────────────────────────────────────
//  Extra case-study detail, keyed by project slug.
//  Everything here is optional: a section only shows when it has content.
//
//  REAL NUMBERS: add `metrics: [{ n: '3×', l: 'more enquiries' }]` and a
//  `quote: { text, name, role }` once you have genuine figures / feedback
//  from the client. They appear automatically. Also optional:
//  `duration: '4 weeks'`, `stack: ['React', 'Node']`, `team: '2 people'`.
// ─────────────────────────────────────────────────────────────
export const caseExtras = {
  trailblaze360: {
    role: 'Strategy, design and development',
    audience: 'HR leaders, executives and organisations looking for a performance and leadership partner.',
    goals: ['Explain six solutions without overwhelming visitors', 'Make the firm look as credible as its clients expect', 'Turn visits into conversations'],
    challenges: [
      ['Six solutions and a proprietary framework could easily become a wall of text.', 'We gave each solution its own page with the same simple structure, and turned the ASCEND™ framework into a six-tile visual that is understood at a glance.'],
      ['Trust has to be earned before a consultancy gets a call.', 'Proof is placed early: impact figures, client logos and testimonials sit on the home page, not buried on an About page.'],
      ['Visitors arrive from many pages, not just the home page.', 'A contact path is reachable from every page, so no one has to hunt for how to start a conversation.'],
    ],
    decisions: [
      ['One action per page', 'Each page leads to a single next step. Fewer choices means more conversations.'],
      ['A hero carousel with purpose', 'The carousel introduces the main solutions in turn, so first-time visitors learn the offer without scrolling.'],
      ['Content built to grow', 'Insights and downloadable resources are set up from day one so the site can keep earning trust over time.'],
    ],
    before: ['A complex offer that was hard to explain in a sentence', 'Little structure around the signature framework', 'No clear route from interest to enquiry'],
    after: ['Six solutions explained in plain, consistent pages', 'ASCEND™ presented as a clear visual framework', 'A short path from first visit to first conversation'],
    lesson: 'For a services firm the website is the sales conversation before the sales conversation. Clarity beat cleverness every time.',
  },
  manesports: {
    role: 'E-commerce design, development and checkout flow',
    audience: 'Football fans and players in Eldoret and beyond, mostly shopping on their phones.',
    goals: ['Let customers order in seconds', 'Keep orders in the channel the owner already uses', 'Make the store feel like football, not a template'],
    challenges: [
      ['Most Kenyan shoppers will not create an account just to buy a pair of boots.', 'Cart and wishlist work with no sign-up. Customers pick, review and send, all in one flow.'],
      ['The owner lives in WhatsApp, not in an admin dashboard.', 'Checkout builds a ready-made message with items, sizes and totals and opens it in WhatsApp, so the order arrives where the shop already works.'],
      ['Eight categories of kit can feel like a maze.', 'The “Squad Number” system gives each category a bold, memorable identity that doubles as navigation.'],
    ],
    decisions: [
      ['WhatsApp as the order desk', 'It removes the need to monitor yet another system and keeps the personal touch of a local shop.'],
      ['M-Pesa or cash on delivery', 'Payment options match how customers in Kenya actually pay, which removes hesitation at the final step.'],
      ['Energy in the copy', 'Bold, sporty language and layouts set the store apart from generic online shops.'],
    ],
    before: ['A busy physical shop with orders handled by hand', 'No way to buy outside opening hours', 'Customers needed to call or visit to ask about stock'],
    after: ['A 24/7 storefront across eight categories', 'Orders arrive as ready-made WhatsApp messages', 'Reviews, brands and FAQs build confidence before purchase'],
    lesson: 'The best checkout is the one customers already know. Meeting people in WhatsApp and M-Pesa beat any complicated payment flow.',
  },
  brighthill: {
    role: 'Full-stack development, admin CMS and AI assistant',
    stack: ['PHP', 'MySQL', 'Custom admin CMS', 'AI chat'],
    audience: 'Individuals and businesses comparing medical, motor, travel and general insurance.',
    goals: ['Let staff run the site without a developer', 'Explain insurance in plain language', 'Capture leads with instant quotes'],
    challenges: [
      ['Insurance sites are often dense and full of jargon.', 'Category pages use plan choice cards so visitors compare options visually instead of reading policy documents.'],
      ['The agency edits content constantly and cannot wait on a developer.', 'We built a full admin panel where every page, text, photo and background is editable, with services that re-flow automatically.'],
      ['Visitors want answers outside office hours.', 'An AI assistant answers from the site’s own content, so replies stay accurate and on-brand.'],
    ],
    decisions: [
      ['Build the CMS, not just the site', 'Giving staff control makes the site a living tool rather than a brochure that goes stale.'],
      ['Quote calculator in the style of leading insurers', 'A familiar pattern lowers the effort of asking for a price and captures warm leads.'],
      ['AI limited to the site’s content', 'Answers come only from the agency’s own information, which keeps replies trustworthy.'],
    ],
    before: ['Content changes required a developer', 'Products were hard to compare', 'Questions waited for office hours'],
    after: ['Staff update any page, photo or background themselves', 'Plans compared on clear choice cards', 'Instant quotes and an always-on chat assistant'],
    lesson: 'Handing clients real control is the most valuable feature. A site people can maintain is a site that stays good.',
  },
  'agrovet-pos': {
    role: 'Analysis, system design, development and staff training',
    audience: 'Shop owners, counter staff and managers in a busy agrovet.',
    goals: ['Serve a customer in seconds', 'Always know what is in stock', 'Give the owner reports they can trust'],
    challenges: [
      ['Hundreds of products sold in different sizes and small measured quantities.', 'We modelled products around how the counter actually sells, with categories, units and quick search.'],
      ['Stock on paper is always out of date.', 'Every sale deducts stock automatically and low-stock alerts warn the owner before a shelf goes empty.'],
      ['Staff should not see everything.', 'Roles give each user only what they need, from the counter to the back office.'],
    ],
    decisions: [
      ['Start at the counter', 'We watched how sales really happen before drawing a single screen, so the software fits the workflow, not the other way round.'],
      ['Speed over features', 'The sales screen does one job extremely fast: find, tap, pay, print.'],
      ['Train the team', 'A system only works if the people using it are confident, so training is part of every delivery.'],
    ],
    before: ['Paper records and guesswork', 'No clear view of stock or daily earnings', 'Slow, error-prone sales'],
    after: ['Fast sales with instant receipts', 'Stock that updates itself', 'Daily, weekly and monthly reports'],
    lesson: 'Good POS software disappears into the work. The measure of success is a customer served quickly and an owner who trusts the numbers.',
    demo: true,
    flow: [
      ['Find', 'Search or tap a category to find the product.'],
      ['Add', 'Tap to add it to the sale. Quantities adjust with one tap.'],
      ['Pay', 'Take cash or M-Pesa and print or download a receipt.'],
      ['Update', 'Stock drops automatically and reports refresh.'],
    ],
  },
  veloprime: {
    role: 'Web design, development and brand look',
    audience: 'Business owners and managers shopping for IT support and solutions.',
    goals: ['Make technical services easy to understand', 'Project reliability and skill', 'Make asking for help effortless'],
    challenges: [
      ['IT services are full of jargon that puts buyers off.', 'Each service is described in plain language, focusing on what it does for the business.'],
      ['Buyers judge technical skill by how polished the site is.', 'A confident, modern visual style and fast, clean build signal capability before a word is read.'],
      ['Enquiries drop when contact is hard.', 'Forms, click-to-call and WhatsApp sit where a busy owner will use them.'],
    ],
    decisions: [
      ['Benefits before technology', 'Leading with outcomes keeps non-technical buyers reading.'],
      ['Mobile-first', 'Many decision-makers browse on a phone, so every layout is designed small first.'],
      ['Search-friendly structure', 'Clear page structure helps local businesses find the company on Google.'],
    ],
    before: ['A technical offer that was hard to explain', 'A first impression that did not match the skill'],
    after: ['Services explained simply', 'A modern, credible look on every device', 'Several easy ways to get in touch'],
    lesson: 'For a technology company the website is the demo. It has to be fast, clean and clear to be believed.',
  },
  'beeyond-nature': {
    role: 'Web design, development and brand storytelling',
    audience: 'People who care about natural products and the story behind them.',
    goals: ['Make the brand feel authentic', 'Let the story lead', 'Make contact simple'],
    challenges: [
      ['A natural brand loses its charm in a busy, corporate layout.', 'We kept the design calm, with generous space, readable type and image-led sections.'],
      ['Visitors need to trust the brand before they enquire.', 'Story and about sections come first and make the values clear.'],
      ['Image-heavy pages can be slow.', 'Images are optimised so the experience stays quick on mobile data.'],
    ],
    decisions: [
      ['Story before sales', 'People buy into the brand first, then the product.'],
      ['Restraint', 'Fewer elements and simple navigation let the imagery do the talking.'],
      ['Direct contact', 'Forms and WhatsApp links keep a personal line to the team.'],
    ],
    before: ['A brand story that was not told online', 'No single place to explore the offering'],
    after: ['A warm, calm site that feels like the brand', 'The offering understood in moments', 'Easy, direct contact'],
    lesson: 'With a nature-led brand, what you leave out matters as much as what you put in.',
  },
  'nox-brand': {
    role: 'Brand strategy, identity design and website',
    audience: 'Small businesses and brands in Kenya looking for a confident digital partner.',
    goals: ['Look established from day one', 'Stay recognisable in print and on screen', 'Prove what we sell'],
    challenges: [
      ['A new studio needs a look that stands out among generic agencies.', 'A hand-painted NOX mark paired with a clean DIGITAL wordmark gives the brand a human, rebellious edge.'],
      ['Colour can fall apart across print, screen and social.', 'A strict black-and-white palette stays striking everywhere and keeps production cheap.'],
      ['One-off designs do not scale into a brand.', 'We built a system: poster, flyers, cards and social templates that reuse the same rules.'],
    ],
    decisions: [
      ['Black and white only', 'Constraints create consistency and make the brand instantly recognisable.'],
      ['Handwritten accents', 'A touch of script keeps a strict system warm and approachable.'],
      ['Build the site to match', 'This website is the brand in action, proof that the system works on screen too.'],
    ],
    before: ['No visual identity', 'Nothing to show clients what we could do'],
    after: ['A complete, reusable brand system', 'Print and digital that feel like one brand', 'A website that carries the identity'],
    lesson: 'Eating our own cooking is the best test. If the system cannot run our own studio, it cannot run a client’s.',
  },
}

// Which pricing tab to point to for each project.
export const caseServiceGroup = {
  trailblaze360: 'websites',
  manesports: 'stores',
  brighthill: 'websites',
  'agrovet-pos': 'pos',
  veloprime: 'websites',
  'beeyond-nature': 'websites',
  'nox-brand': 'brand',
}
