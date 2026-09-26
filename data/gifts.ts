/**
 * Curated trending gift ideas. Refresh this file each season: bump
 * TRENDS_UPDATED, edit TREND_REPORT, and flip `hot` on what's peaking.
 */
export const TRENDS_UPDATED = "September 2026";

export type GiftFor = "him" | "her" | "both";
export type Interest = "tech" | "style" | "wellness" | "experience" | "personal" | "foodie" | "home" | "adventure" | "creative";
export type Occasion = "birthday" | "anniversary" | "valentine" | "justbecause" | "festive";

export type Gift = {
  id: string;
  name: string;
  emoji: string;
  for: GiftFor;
  /** 1: under ₹1,000 · 2: ₹1,000–3,000 · 3: ₹3,000–10,000 · 4: ₹10,000+ */
  budget: 1 | 2 | 3 | 4;
  price: string;
  interests: Interest[];
  occasions: Occasion[];
  /** Why people are gifting it right now. */
  trend: string;
  /** How to make it feel like it came from you. */
  touch: string;
  hot?: boolean;
  /** Search phrase for the shop links. */
  query: string;
};

export const BUDGETS = [
  { id: 1, label: "Under ₹1k" },
  { id: 2, label: "₹1k–3k" },
  { id: 3, label: "₹3k–10k" },
  { id: 4, label: "₹10k+" },
] as const;

export const INTERESTS: { id: Interest; label: string; emoji: string }[] = [
  { id: "personal", label: "Personalised", emoji: "✍️" },
  { id: "tech", label: "Tech", emoji: "🎧" },
  { id: "style", label: "Style & jewellery", emoji: "💍" },
  { id: "wellness", label: "Self-care", emoji: "🧖" },
  { id: "experience", label: "Experiences", emoji: "🎟️" },
  { id: "foodie", label: "Foodie", emoji: "🍫" },
  { id: "home", label: "Home & cosy", emoji: "🕯️" },
  { id: "adventure", label: "Travel & outdoors", emoji: "🧭" },
  { id: "creative", label: "Creative & hobbies", emoji: "🎨" },
];

export const OCCASIONS: { id: Occasion; label: string; emoji: string }[] = [
  { id: "birthday", label: "Birthday", emoji: "🎂" },
  { id: "anniversary", label: "Anniversary", emoji: "💞" },
  { id: "valentine", label: "Valentine's", emoji: "🌹" },
  { id: "festive", label: "Diwali / festive", emoji: "🪔" },
  { id: "justbecause", label: "Just because", emoji: "✨" },
];

/** Headline trends shown above the finder. */
export const TREND_REPORT: { emoji: string; title: string; text: string }[] = [
  { emoji: "✍️", title: "Personalisation is everything", text: "Engraved, name-cut and photo gifts are the biggest gifting shift this year." },
  { emoji: "🧸", title: "Mini-me keepsakes", text: "Custom 3D figurines and crochet couple dolls modelled on the two of you." },
  { emoji: "💎", title: "Everyday fine jewellery", text: "Lab-grown diamonds, minimal silver and men's steel bracelets he'll actually wear." },
  { emoji: "🎟️", title: "Experiences over things", text: "Classes, getaways and shared memories beat one-day gestures." },
];

const ALL: Occasion[] = ["birthday", "anniversary", "valentine", "justbecause", "festive"];

export const GIFTS: Gift[] = [
  // ── For both / couple gifts
  { id: "g1", name: "Custom 3D mini figurines of you two", emoji: "🧸", for: "both", budget: 3, price: "₹3,500–7,000", interests: ["personal", "creative"], occasions: ["anniversary", "valentine", "birthday"], trend: "The #1 personalised gift trend of 2026: your photos turned into desk-sized figures.", touch: "Recreate the outfits from your first date.", hot: true, query: "custom 3d couple figurine" },
  { id: "g2", name: "Crochet couple dolls", emoji: "🧶", for: "both", budget: 2, price: "₹1,800–3,500", interests: ["personal", "creative", "home"], occasions: ["anniversary", "justbecause", "valentine"], trend: "Viral handmade dolls made to look like the two of you, down to your pyjamas.", touch: "Ask the maker to add a tiny chai cup or your pet.", hot: true, query: "custom crochet couple doll" },
  { id: "g3", name: "\"Where we met\" star map / city map print", emoji: "🗺️", for: "both", budget: 2, price: "₹1,200–2,500", interests: ["personal", "home"], occasions: ["anniversary", "valentine"], trend: "Custom street-sign and map art is a gallery-wall favourite.", touch: "Use the exact date and coordinates of your first meeting.", query: "custom star map print couple" },
  { id: "g4", name: "Couples pottery or cooking class", emoji: "🏺", for: "both", budget: 2, price: "₹1,500–4,000 for two", interests: ["experience", "creative", "foodie"], occasions: ALL, trend: "Most couples now say they'd rather get an experience than an object.", touch: "Keep what you make as your first shared 'artwork'.", hot: true, query: "couple pottery class" },
  { id: "g5", name: "Weekend staycation voucher", emoji: "🏨", for: "both", budget: 4, price: "₹8,000–20,000", interests: ["experience", "adventure", "wellness"], occasions: ["anniversary", "birthday", "valentine"], trend: "Short hill and beach getaways are the go-to milestone gift.", touch: "Hand it over in a hand-drawn 'boarding pass'.", query: "couple staycation package" },
  { id: "g6", name: "\"Open When\" letters box", emoji: "💌", for: "both", budget: 1, price: "₹300–900", interests: ["personal"], occasions: ALL, trend: "Hand-written letters for 'open when you miss me' moments are back in a big way.", touch: "Tuck a pressed flower or a playlist QR in each envelope.", hot: true, query: "open when letters box" },
  { id: "g7", name: "Photo book of your year together", emoji: "📖", for: "both", budget: 2, price: "₹1,200–3,000", interests: ["personal", "home"], occasions: ["anniversary", "birthday", "festive"], trend: "Printed memories: layflat photo books are the gift couples keep for decades.", touch: "Add ticket stubs and handwritten captions.", query: "layflat photo book personalised" },
  { id: "g8", name: "Aroma diffuser & essential oils set", emoji: "🕯️", for: "both", budget: 2, price: "₹1,500–3,000", interests: ["home", "wellness"], occasions: ["festive", "justbecause", "birthday"], trend: "Ambience gifts that make a home feel calmer are big for festive gifting.", touch: "Pick a scent that reminds you of a trip together.", query: "aroma diffuser gift set" },
  { id: "g9", name: "Artisanal chocolate & chai hamper", emoji: "🍫", for: "both", budget: 1, price: "₹700–1,500", interests: ["foodie"], occasions: ["festive", "justbecause", "valentine"], trend: "Small-batch Indian chocolate and single-estate chai lead festive hampers.", touch: "Add a note pairing each flavour with a memory.", query: "artisanal chocolate chai hamper" },
  { id: "g10", name: "Matching Polaroid-style instant camera", emoji: "📸", for: "both", budget: 3, price: "₹5,500–9,000", interests: ["tech", "creative", "adventure"], occasions: ["birthday", "anniversary"], trend: "Instant cameras are still riding the retro, 'print your moments' wave.", touch: "Load it with film and take the first photo together.", query: "instant camera instax mini" },

  // ── For him
  { id: "h1", name: "Engraved steel / titanium bracelet", emoji: "⛓️", for: "him", budget: 2, price: "₹1,200–3,000", interests: ["style", "personal"], occasions: ALL, trend: "Men's everyday jewellery is the standout 2026 gift for boyfriends.", touch: "Engrave your coordinates or an inside joke on the inside.", hot: true, query: "men engraved titanium bracelet" },
  { id: "h2", name: "Minimal silver chain or signet ring", emoji: "💍", for: "him", budget: 3, price: "₹3,000–8,000", interests: ["style"], occasions: ["birthday", "anniversary", "valentine"], trend: "Minimalist 925 silver is replacing chunky pieces for men.", touch: "Pick the ring size by borrowing one he already wears.", query: "men 925 silver chain" },
  { id: "h3", name: "Smartwatch or fitness band", emoji: "⌚", for: "him", budget: 3, price: "₹3,000–10,000", interests: ["tech", "wellness"], occasions: ["birthday", "festive"], trend: "Health-tracking wearables remain the top tech gift in India.", touch: "Set a custom watch face with a photo of you two.", query: "smartwatch men" },
  { id: "h4", name: "Noise-cancelling earbuds", emoji: "🎧", for: "him", budget: 3, price: "₹3,500–9,000", interests: ["tech", "adventure"], occasions: ["birthday", "festive", "justbecause"], trend: "ANC earbuds are the most-wished-for gadget under ₹10k.", touch: "Pair it with a shared playlist called 'for your commute'.", query: "anc earbuds" },
  { id: "h5", name: "Leather valet tray & organiser", emoji: "🗝️", for: "him", budget: 2, price: "₹1,200–2,500", interests: ["home", "style", "personal"], occasions: ["birthday", "anniversary"], trend: "Desk and dresser organisers with initials are trending for men.", touch: "Emboss his initials plus the year you met.", query: "leather valet tray monogram" },
  { id: "h6", name: "Beard & grooming kit", emoji: "🧔", for: "him", budget: 1, price: "₹600–1,500", interests: ["wellness", "style"], occasions: ["birthday", "justbecause", "festive"], trend: "Men's self-care is one of the fastest-growing gift categories.", touch: "Add a handwritten 'spa day coupon' from you.", query: "beard grooming kit gift" },
  { id: "h7", name: "Pour-over / cold brew coffee kit", emoji: "☕", for: "him", budget: 2, price: "₹1,500–3,500", interests: ["foodie", "home", "creative"], occasions: ["birthday", "justbecause"], trend: "Home coffee rituals and Indian specialty roasters are booming.", touch: "Include beans from the café of your first date.", query: "pour over coffee kit" },
  { id: "h8", name: "Retro gaming handheld", emoji: "🕹️", for: "him", budget: 3, price: "₹4,000–9,000", interests: ["tech", "creative"], occasions: ["birthday", "festive"], trend: "Nostalgic handhelds are a hit for the '90s-kid boyfriend.", touch: "Challenge him to a best-of-three the day he opens it.", query: "retro handheld game console" },
  { id: "h9", name: "Weekend trek or rafting booking", emoji: "🥾", for: "him", budget: 2, price: "₹1,500–4,000", interests: ["adventure", "experience"], occasions: ["birthday", "anniversary", "justbecause"], trend: "Adventure experiences top the 'experiences over objects' list.", touch: "Book two slots. You're coming too.", query: "weekend trek booking" },
  { id: "h10", name: "Personalised wallet with photo insert", emoji: "💳", for: "him", budget: 1, price: "₹700–1,500", interests: ["personal", "style"], occasions: ALL, trend: "Engraved everyday carry is the classic that personalisation revived.", touch: "Hide a tiny note in a card slot.", query: "personalised engraved wallet men" },
  { id: "h11", name: "Premium perfume discovery set", emoji: "🧴", for: "him", budget: 2, price: "₹1,500–3,000", interests: ["style", "wellness"], occasions: ["birthday", "valentine", "festive"], trend: "Indian niche fragrance houses are having a big moment.", touch: "Pick the one you love on him and tell him why.", query: "men perfume discovery set" },
  { id: "h12", name: "Mechanical keyboard", emoji: "⌨️", for: "him", budget: 3, price: "₹3,500–8,000", interests: ["tech", "creative"], occasions: ["birthday", "festive"], trend: "Desk-setup upgrades are the go-to for WFH partners.", touch: "Swap one keycap for a custom heart key.", query: "mechanical keyboard" },

  // ── For her
  { id: "s1", name: "Name or initial pendant necklace", emoji: "📿", for: "her", budget: 2, price: "₹1,200–3,000", interests: ["style", "personal"], occasions: ALL, trend: "Name-cut and initial pendants lead personalised jewellery this year.", touch: "Choose her initial and yours on one chain.", hot: true, query: "custom name pendant necklace" },
  { id: "s2", name: "Lab-grown diamond studs", emoji: "💎", for: "her", budget: 4, price: "₹12,000–40,000", interests: ["style"], occasions: ["anniversary", "birthday", "valentine"], trend: "Lab-grown diamonds are the ethical, everyday-luxury trend of 2026.", touch: "Gift them in a box with a note on why you chose them.", hot: true, query: "lab grown diamond stud earrings" },
  { id: "s3", name: "Minimal demi-fine silver jewellery set", emoji: "✨", for: "her", budget: 2, price: "₹1,500–3,000", interests: ["style"], occasions: ["birthday", "justbecause", "festive"], trend: "Stackable silver and demi-fine pieces for daily wear are everywhere.", touch: "Add one charm that means something to you two.", query: "demi fine silver jewellery set" },
  { id: "s4", name: "Spa & self-care hamper", emoji: "🧖‍♀️", for: "her", budget: 2, price: "₹1,500–3,500", interests: ["wellness", "home"], occasions: ALL, trend: "Wellness hampers are replacing flowers-and-chocolates boxes.", touch: "Add a coupon: 'one full evening, I handle everything'.", hot: true, query: "self care spa hamper for her" },
  { id: "s5", name: "Kindle or e-reader", emoji: "📚", for: "her", budget: 3, price: "₹8,000–14,000", interests: ["tech", "creative", "home"], occasions: ["birthday", "festive"], trend: "Booktok keeps e-readers on every wishlist.", touch: "Preload the book you'd love to read together.", query: "kindle paperwhite" },
  { id: "s6", name: "Personalised tote or jute bag", emoji: "👜", for: "her", budget: 1, price: "₹500–1,200", interests: ["personal", "style"], occasions: ["justbecause", "birthday"], trend: "Monogrammed everyday bags are the affordable personal-gift star.", touch: "Embroider her name in your handwriting.", query: "personalised monogram tote bag" },
  { id: "s7", name: "Fresh flower subscription", emoji: "💐", for: "her", budget: 2, price: "₹1,500–3,000 / month", interests: ["home", "experience"], occasions: ["anniversary", "valentine", "justbecause"], trend: "Recurring gifts that last beyond one day are replacing single bouquets.", touch: "Write a new note for every delivery.", query: "flower subscription india" },
  { id: "s8", name: "Handcrafted saree or kurta set", emoji: "🥻", for: "her", budget: 3, price: "₹3,000–10,000", interests: ["style"], occasions: ["festive", "anniversary"], trend: "Handloom and artisan labels are the festive favourite.", touch: "Match your outfit for Diwali photos.", query: "handloom saree" },
  { id: "s9", name: "Instant photo printer", emoji: "🖨️", for: "her", budget: 3, price: "₹5,000–9,000", interests: ["tech", "creative", "personal"], occasions: ["birthday", "anniversary"], trend: "Printing phone photos for journals and walls is a huge trend.", touch: "Print 20 of your photos and put them in the box.", query: "instant photo printer" },
  { id: "s10", name: "Painting / journaling starter kit", emoji: "🎨", for: "her", budget: 2, price: "₹1,200–3,000", interests: ["creative", "wellness"], occasions: ["birthday", "justbecause"], trend: "Mindful hobbies like watercolour and bullet journaling are booming.", touch: "Paint the first page together.", query: "watercolour journaling kit" },
  { id: "s11", name: "Luxe silk pillowcase & scrunchie set", emoji: "🛏️", for: "her", budget: 2, price: "₹1,500–3,000", interests: ["wellness", "home"], occasions: ["birthday", "valentine", "justbecause"], trend: "Beauty-sleep gifts are a quiet bestseller.", touch: "Pair it with a sleep playlist you made.", query: "mulberry silk pillowcase" },
  { id: "s12", name: "Candle-making or perfume workshop", emoji: "🕯️", for: "her", budget: 2, price: "₹1,500–3,500", interests: ["experience", "creative"], occasions: ALL, trend: "Make-your-own scent workshops are a top experience gift.", touch: "Create a scent together and name it after her.", query: "perfume making workshop" },
];

export function shopLinks(g: Gift) {
  const q = encodeURIComponent(g.query);
  return [
    { label: "Amazon", href: `https://www.amazon.in/s?k=${q}` },
    { label: "Flipkart", href: `https://www.flipkart.com/search?q=${q}` },
  ];
}

export const TREND_SOURCES = [
  { label: "Eternz: Valentine's gift trends 2026 (India)", href: "https://www.eternz.com/blog/valentines-day-gift-trends-2026-whats-in-whats-out-what-actually-works-in-india/" },
  { label: "Snapfigures: custom 3D gift trend 2026", href: "https://snapfigures.com/blogs/news/personalized-valentines-day-gift-trends-2026" },
  { label: "Groovy Girl Gifts: gifts for couples 2026", href: "https://www.groovygirlgifts.com/blogs/news/gifts-for-couples" },
  { label: "Gifts to India: top trending gifts 2026", href: "https://www.giftstoindia24x7.com/a/top-10-trending-gifts-in-india" },
];
