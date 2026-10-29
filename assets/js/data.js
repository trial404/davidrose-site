/* ==========================================================================
   YOUR NAME — site content
   --------------------------------------------------------------------------
   The ONLY file you need to edit to change words, prices and links.

   Rules:
   - Text in "double quotes". Keep the commas between items.
   - image: ""  -> numbered grey placeholder
   - image: "assets/img/photos/x.jpg" -> your photograph
   - link:  "#" -> does nothing yet; paste a Stripe link when ready

   PHOTO CONVENTION
   `ar` is the exact pixel ratio, written as "width / height". The real
   dimensions are used so the grid never jumps while images load.
   ========================================================================== */

window.SITE = {

  /* ---------- who you are ---------- */
  name: "David Rose",
  role: "Photographer · Writer · Builder",
  email: "hello@yourname.com",
  instagram: "https://instagram.com/",
  substack: "https://yourname.substack.com",
  gumroad: "https://yourname.gumroad.com",
  github: "https://github.com/",

  /* ---------- the four worlds ---------- */
  worlds: [
    {
      id: "photography",
      num: "01",
      name: "Photography",
      color: "var(--blue)",
      href: "photography.html",
      blurb: "Landscapes and quiet places. A selection of work available as limited and open-edition prints, plus printed photobooks.",
      count: "27 photographs · 9 prints",
      cta: "See the work",
      previews: [
        { image: "assets/img/photos/landscape-h39a0377.jpg", label: "" },
        { image: "assets/img/photos/artistic-frame-13.jpg", label: "" },
        { image: "assets/img/photos/landscape-landscape-copy.jpg", label: "" }
      ]
    },
    {
      id: "writing",
      num: "02",
      name: "Writing",
      color: "var(--orange)",
      href: "writing.html",
      blurb: "Three books on human value, AI literacy, and the discipline of asking why. Published as ebooks and serialised on Substack.",
      count: "3 books",
      cta: "Read the books",
      previews: [
        { image: "", label: "Book 01" },
        { image: "", label: "Book 02" },
        { image: "", label: "Book 03" }
      ]
    },
    {
      id: "ai",
      num: "03",
      name: "AI builds",
      color: "var(--green)",
      href: "ai.html",
      blurb: "Things I've designed and shipped with AI as a collaborator — small tools, experiments, and this website. Notes on how they were made.",
      count: "6 projects",
      cta: "See the builds",
      previews: [
        { image: "", label: "01" },
        { image: "", label: "02" },
        { image: "", label: "03" }
      ]
    },
    {
      id: "about",
      num: "04",
      name: "About",
      color: "var(--yellow)",
      href: "about.html",
      blurb: "Photographer, writer, and a person who builds things. The longer version, and how to get in touch.",
      count: "Read",
      cta: "About me",
      previews: [
        { image: "", label: "Portrait" },
        { image: "", label: "Studio" },
        { image: "", label: "Field" }
      ]
    }
  ],

  /* ---------- series ----------
     One colour per series, from the four-colour palette. The colour becomes
     the showcase background when that series is selected, so filtering is a
     colour change rather than just a list change. */
  series: [
    { name: "Landscape", color: "var(--blue)" },
    { name: "Artistic",  color: "var(--orange)" }
  ],

  /* ---------- showcase grid ----------
     Titles are placeholders. Replace them with your own — that is the one
     thing nobody else can write for you. `series` drives the filter chips. */
  photos: [
    { title: "Landscape 01", series: "Landscape", ar: "1280 / 1600", image: "assets/img/photos/landscape-h39a0377.jpg" },
    { title: "Landscape 02", series: "Landscape", ar: "1066 / 1600", image: "assets/img/photos/landscape-h39a1763.jpg" },
    { title: "Landscape 03", series: "Landscape", ar: "1280 / 1600", image: "assets/img/photos/landscape-h39a1880.jpg" },
    { title: "Landscape 04", series: "Landscape", ar: "1066 / 1600", image: "assets/img/photos/landscape-h39a5474-1.jpg" },
    { title: "Landscape 05", series: "Landscape", ar: "1280 / 1600", image: "assets/img/photos/landscape-h39a9236.jpg" },
    { title: "Landscape 06", series: "Landscape", ar: "1280 / 1600", image: "assets/img/photos/landscape-img-4334.jpg" },
    { title: "Landscape 07", series: "Landscape", ar: "1280 / 1600", image: "assets/img/photos/landscape-img-6361.jpg" },
    { title: "Landscape 08", series: "Landscape", ar: "1600 / 1281", image: "assets/img/photos/landscape-landscape-copy.jpg" },

    { title: "Artistic 01", series: "Artistic", ar: "1240 / 1600", image: "assets/img/photos/artistic-frame-11-4.jpg" },
    { title: "Artistic 02", series: "Artistic", ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-13.jpg" },
    { title: "Artistic 03", series: "Artistic", ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-19.jpg" },
    { title: "Artistic 04", series: "Artistic", ar: "1297 / 1600", image: "assets/img/photos/artistic-frame-21.jpg" },
    { title: "Artistic 05", series: "Artistic", ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-27.jpg" },
    { title: "Artistic 06", series: "Artistic", ar: "1297 / 1600", image: "assets/img/photos/artistic-frame-33-2.jpg" },
    { title: "Artistic 07", series: "Artistic", ar: "1280 / 1600", image: "assets/img/photos/artistic-frame-4-6.jpg" },
    { title: "Artistic 08", series: "Artistic", ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-53.jpg" },
    { title: "Artistic 09", series: "Artistic", ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-55.jpg" },
    { title: "Artistic 10", series: "Artistic", ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-59.jpg" },
    { title: "Artistic 11", series: "Artistic", ar: "1280 / 1600", image: "assets/img/photos/artistic-frame-6-3.jpg" },
    { title: "Artistic 12", series: "Artistic", ar: "1280 / 1600", image: "assets/img/photos/artistic-frame-7-12.jpg" },
    { title: "Artistic 13", series: "Artistic", ar: "1282 / 1600", image: "assets/img/photos/artistic-frame-70-2.jpg" },
    { title: "Artistic 14", series: "Artistic", ar: "1600 / 1282", image: "assets/img/photos/artistic-frame-72-2.jpg" },
    { title: "Artistic 15", series: "Artistic", ar: "1240 / 1600", image: "assets/img/photos/artistic-frame-9-12.jpg" },
    { title: "Artistic 16", series: "Artistic", ar: "1600 / 1280", image: "assets/img/photos/artistic-h39a6457.jpg" },
    { title: "Artistic 17", series: "Artistic", ar: "1600 / 1066", image: "assets/img/photos/artistic-h39a8057-1.jpg" },
    { title: "Artistic 18", series: "Artistic", ar: "1280 / 1600", image: "assets/img/photos/artistic-h39a8775-1.jpg" },
    { title: "Artistic 19", series: "Artistic", ar: "1280 / 1600", image: "assets/img/photos/artistic-h39a8846-1.jpg" }
  ],

  /* ---------- prints for sale ----------
     Portrait prints use portrait sizes; landscape prints use landscape sizes.
     Each size needs its own `link` — a Stripe Payment Link per size. */
  prints: [
    {
      id: "landscape-h39a0377",
      title: "Landscape 01",
      series: "Landscape",
      image: "assets/img/photos/landscape-h39a0377.jpg",
      ar: "1280 / 1600",
      description: "Fog sitting in the pines below a rock face, shot from the opposite slope. The whole frame is one long wait for the cloud to open.",
      paper: "Hahnemühle Photo Rag 308gsm, matte",
      edition: "Open edition, signed",
      delivery: "Made to order · ships in 5–10 business days",
      sizes: [
        { label: "30 × 40 cm", cm: "30 × 40 cm", inches: "12 × 16 in", price: "€85", link: "#" },
        { label: "40 × 50 cm", cm: "40 × 50 cm", inches: "16 × 20 in", price: "€135", link: "#" },
        { label: "50 × 70 cm", cm: "50 × 70 cm", inches: "20 × 28 in", price: "€210", link: "#" }
      ]
    },
    {
      id: "landscape-landscape-copy",
      title: "Landscape 08",
      series: "Landscape",
      image: "assets/img/photos/landscape-landscape-copy.jpg",
      ar: "1600 / 1281",
      description: "Pines in low golden fog. The colour is in the light, not the grade — this is what the file looked like.",
      paper: "Hahnemühle Photo Rag 308gsm, matte",
      edition: "Limited edition of 25, numbered + signed",
      delivery: "Ships in 7–14 business days · certificate included",
      sizes: [
        { label: "40 × 30 cm", cm: "40 × 30 cm", inches: "16 × 12 in", price: "€85", link: "#" },
        { label: "50 × 40 cm", cm: "50 × 40 cm", inches: "20 × 16 in", price: "€135", link: "#" },
        { label: "70 × 50 cm", cm: "70 × 50 cm", inches: "28 × 20 in", price: "€210", link: "#" }
      ]
    },
    {
      id: "landscape-h39a1763",
      title: "Landscape 02",
      series: "Landscape",
      image: "assets/img/photos/landscape-h39a1763.jpg",
      ar: "1066 / 1600",
      description: "From the same morning as the others in this series. Printed portrait so the depth of the original frame is kept.",
      paper: "Hahnemühle Photo Rag 308gsm, matte",
      edition: "Open edition, signed",
      delivery: "Made to order · ships in 5–10 business days",
      sizes: [
        { label: "30 × 40 cm", cm: "30 × 40 cm", inches: "12 × 16 in", price: "€85", link: "#" },
        { label: "40 × 50 cm", cm: "40 × 50 cm", inches: "16 × 20 in", price: "€135", link: "#" },
        { label: "50 × 70 cm", cm: "50 × 70 cm", inches: "20 × 28 in", price: "€210", link: "#" }
      ]
    },
    {
      id: "landscape-h39a9236",
      title: "Landscape 05",
      series: "Landscape",
      image: "assets/img/photos/landscape-h39a9236.jpg",
      ar: "1280 / 1600",
      description: "A quieter frame from the same series — mostly air, which is the point.",
      paper: "Hahnemühle Photo Rag 308gsm, matte",
      edition: "Open edition, signed",
      delivery: "Made to order · ships in 5–10 business days",
      sizes: [
        { label: "30 × 40 cm", cm: "30 × 40 cm", inches: "12 × 16 in", price: "€85", link: "#" },
        { label: "40 × 50 cm", cm: "40 × 50 cm", inches: "16 × 20 in", price: "€135", link: "#" }
      ]
    },
    {
      id: "landscape-img-4334",
      title: "Landscape 06",
      series: "Landscape",
      image: "assets/img/photos/landscape-img-4334.jpg",
      ar: "1280 / 1600",
      description: "Made on a phone on the walk back, and still one of the ones I keep coming back to.",
      paper: "Hahnemühle Photo Rag 308gsm, matte",
      edition: "Open edition, signed",
      delivery: "Made to order · ships in 5–10 business days",
      sizes: [
        { label: "30 × 40 cm", cm: "30 × 40 cm", inches: "12 × 16 in", price: "€85", link: "#" },
        { label: "40 × 50 cm", cm: "40 × 50 cm", inches: "16 × 20 in", price: "€135", link: "#" }
      ]
    },
    {
      id: "artistic-frame-13",
      title: "Artistic 02",
      series: "Artistic",
      image: "assets/img/photos/artistic-frame-13.jpg",
      ar: "1327 / 1600",
      description: "Light through moving water, close enough that the surface becomes texture rather than subject.",
      paper: "Hahnemühle Photo Rag Baryta 315gsm",
      edition: "Limited edition of 25, numbered + signed",
      delivery: "Ships in 7–14 business days · certificate included",
      sizes: [
        { label: "30 × 40 cm", cm: "30 × 40 cm", inches: "12 × 16 in", price: "€95", link: "#" },
        { label: "40 × 50 cm", cm: "40 × 50 cm", inches: "16 × 20 in", price: "€150", link: "#" },
        { label: "50 × 70 cm", cm: "50 × 70 cm", inches: "20 × 28 in", price: "€240", link: "#" }
      ]
    },
    {
      id: "artistic-frame-72-2",
      title: "Artistic 14",
      series: "Artistic",
      image: "assets/img/photos/artistic-frame-72-2.jpg",
      ar: "1600 / 1282",
      description: "The same water, stepped back. Warmer, slower, and the one that works best large.",
      paper: "Hahnemühle Photo Rag Baryta 315gsm",
      edition: "Limited edition of 25, numbered + signed",
      delivery: "Ships in 7–14 business days · certificate included",
      sizes: [
        { label: "40 × 30 cm", cm: "40 × 30 cm", inches: "16 × 12 in", price: "€95", link: "#" },
        { label: "50 × 40 cm", cm: "50 × 40 cm", inches: "20 × 16 in", price: "€150", link: "#" },
        { label: "70 × 50 cm", cm: "70 × 50 cm", inches: "28 × 20 in", price: "€240", link: "#" }
      ]
    },
    {
      id: "artistic-h39a6457",
      title: "Artistic 16",
      series: "Artistic",
      image: "assets/img/photos/artistic-h39a6457.jpg",
      ar: "1600 / 1280",
      description: "A swimmer seen from above, refracted through warm water. The body is the thing the light is made of.",
      paper: "Hahnemühle Photo Rag Baryta 315gsm",
      edition: "Limited edition of 15, numbered + signed",
      delivery: "Ships in 7–14 business days · certificate included",
      sizes: [
        { label: "40 × 30 cm", cm: "40 × 30 cm", inches: "16 × 12 in", price: "€110", link: "#" },
        { label: "50 × 40 cm", cm: "50 × 40 cm", inches: "20 × 16 in", price: "€175", link: "#" },
        { label: "70 × 50 cm", cm: "70 × 50 cm", inches: "28 × 20 in", price: "€280", link: "#" }
      ]
    },
    {
      id: "artistic-h39a8846-1",
      title: "Artistic 19",
      series: "Artistic",
      image: "assets/img/photos/artistic-h39a8846-1.jpg",
      ar: "1280 / 1600",
      description: "Portrait format, made for a narrow wall. The last frame of the water series.",
      paper: "Hahnemühle Photo Rag Baryta 315gsm",
      edition: "Limited edition of 15, numbered + signed",
      delivery: "Ships in 7–14 business days · certificate included",
      sizes: [
        { label: "30 × 40 cm", cm: "30 × 40 cm", inches: "12 × 16 in", price: "€110", link: "#" },
        { label: "40 × 50 cm", cm: "40 × 50 cm", inches: "16 × 20 in", price: "€175", link: "#" },
        { label: "50 × 70 cm", cm: "50 × 70 cm", inches: "20 × 28 in", price: "€280", link: "#" }
      ]
    }
  ],

  /* ---------- printed photobooks ---------- */
  photobooks: [
    {
      title: "High Country",
      subtitle: "Five years of walking the same range",
      blurb: "84 photographs across four seasons. Casebound, 24 × 28 cm, printed on uncoated 170gsm stock with a foil-blocked spine.",
      format: "Hardback · 128 pages",
      price: "€48",
      pages: "128 pages",
      cover: "",
      color: "var(--blue)",
      link: "#"
    },
    {
      title: "Water",
      subtitle: "Coast, lake, rain",
      blurb: "A smaller book about the edges of things. Softcover with a dust jacket, edition of 300, each one numbered.",
      format: "Softcover · 96 pages · edition of 300",
      price: "€32",
      pages: "96 pages",
      cover: "",
      color: "var(--green)",
      link: "#"
    }
  ],

  /* ---------- ebooks ----------
     Titles and page counts come from the PDFs. Subtitles and blurbs are written
     from each book's preface and table of contents — replace with your own words.
     Links stay "#" until the Gumroad product pages exist. */
  books: [
    {
      title: "The Paradigm Shift in Human Value",
      subtitle: "Finding your value in an age of AI",
      blurb: "For anyone who did everything right and still feels misaligned. The argument is that AI has flattened the value of the answer, so what becomes valuable is process, nuance and framing — and the book builds a repeatable operating system for your own. Ends in practice rather than theory.",
      format: "Ebook · PDF",
      price: "€14",
      pages: "125 pages",
      cover: "",
      color: "var(--yellow)",
      link: "#"
    },
    {
      title: "You and [A]i",
      subtitle: "What it is, where it breaks, how to steer it",
      blurb: "Opens with what a language model actually is and where it structurally fails — hallucination, no embodied understanding, no authentic intent, no continual learning. Then builds the working system: context engineering, the two logs, the eight-line brief, and the shift from operator to editor.",
      format: "Ebook · PDF",
      price: "€16",
      pages: "170 pages",
      cover: "",
      color: "var(--green)",
      link: "#"
    },
    {
      title: "Okay, but Why?",
      subtitle: "On shortcuts, labels and meaning",
      blurb: "Nine chapters with titles like “a windowless sauna” and “four plates”. About the shortcut instinct — reaching for the tool before the question — and why asking why is the discipline that keeps a person in the loop.",
      format: "Ebook · PDF",
      price: "€12",
      pages: "101 pages",
      cover: "",
      color: "var(--blue)",
      link: "#"
    }
  ],

  /* ---------- AI / dev projects ----------
     Real, taken from 2026 Brain -> 02_Projects/Apps. Descriptions drawn from each
     project's README; tighten them in your own voice.
     The through-line: all of it runs locally. No accounts, no uploads. */
  projects: [
    {
      title: "Voice Studio",
      desc: "Local voice-cloning text-to-speech. Register one reference recording, then generate audio from any text — a paragraph to test, a chapter, a whole book. Audio8 running CPU-only behind a FastAPI app.",
      tags: ["FastAPI", "TTS", "Local"],
      link: "#"
    },
    {
      title: "Book Converter",
      desc: "A small Calibre that lives on your own machine. EPUB, PDF, MOBI and AZW3 in and out, with Markdown export built in pure Python. No uploads, no accounts.",
      tags: ["Python", "EPUB", "Offline"],
      link: "#"
    },
    {
      title: "File Converter",
      desc: "Garmin FIT, TCX, GPX and Strava exports flattened into one CSV per activity — and back out to FIT through the official Garmin SDK. Browser UI, every conversion on your machine.",
      tags: ["Python", "Garmin FIT", "Strava"],
      link: "#"
    },
    {
      title: "Bike Interval Timer",
      desc: "Phone-first interval timer for a gym bike: the whole plan as a table with a live countdown on each row, and one big clock for the segment you are in. A single HTML file.",
      tags: ["Vanilla JS", "Single file"],
      link: "#"
    },
    {
      title: "Piano Wait Mode",
      desc: "Listens to an acoustic piano through a microphone and refuses to advance until you have found every note in the bar. No clock, no tempo, no rushing. Forty-three tests green.",
      tags: ["Web Audio", "DSP"],
      link: "#"
    },
    {
      title: "Pitch Monitor",
      desc: "Microphone in, scrolling pitch-against-time chart out — semitone gridlines, live note readout, autocorrelation detection on canvas. Nothing leaves the machine.",
      tags: ["Web Audio", "Canvas", "Local"],
      link: "#"
    }
  ],

  /* ---------- the print featured on the home page ---------- */
  featuredPrintId: "landscape-landscape-copy",

  /* ---------- FAQ ---------- */
  faq: [
    {
      q: "What paper do you print on?",
      a: "Hahnemühle Photo Rag, 308gsm, matte — a cotton rag with a fine texture and no surface glare. The water series is printed on Photo Rag Baryta, which holds more depth in the blacks."
    },
    {
      q: "How long until my print arrives?",
      a: "Prints are made to order, not held in stock. Production takes 3–5 working days. Shipping is then 2–4 days within the EU and 5–12 days elsewhere. You get a tracking number as soon as the parcel leaves the lab."
    },
    {
      q: "Do you ship outside the EU?",
      a: "Yes, worldwide and tracked. Orders leaving the EU may attract import duty or VAT on arrival. That is charged by your customs authority and is not included in the price."
    },
    {
      q: "Can I return a print?",
      a: "Yes. Under EU consumer law you have 14 days from delivery to withdraw from the purchase. Email me, return the print in its original packaging, and I refund the price once it arrives — return shipping is at your cost. If a print arrives damaged, send a photograph and I reprint it at no charge."
    },
    {
      q: "Do you sell framed prints?",
      a: "Not yet. Framing is where most transit damage and cost happens, so I would rather you chose a local framer. Email me and I will happily advise on moulding and mount width for a particular print."
    },
    {
      q: "Will the colours match my screen?",
      a: "Closely, not exactly. Screens vary, and the print is made from an sRGB-profiled file on archival paper. If a print looks meaningfully different from the listing, tell me and I will reprint it."
    }
  ],

  /* ---------- about page ---------- */
  timeline: [
    { year: "2019", text: "Bought a second-hand camera and started photographing the same mountain range every weekend." },
    { year: "2021", text: "Sold the first prints. Wrote the first book, mostly at night, mostly badly." },
    { year: "2023", text: "Started writing publicly about AI. Built the first small tool I actually used every day." },
    { year: "2024", text: "Third book. Began assembling this site as one place for all of it rather than five places for none of it." },
    { year: "2025", text: "Working on a longer photographic series and a fourth book about looking." }
  ],

  /* PLACEHOLDERS. These are not real quotes. The layout is here so you can see
     what three short quotes look like in place. Replace with real ones or delete
     the array (the section on about.html and writing.html will disappear). */
  press: [
    { quote: "[A real quote about the photographs — roughly this length, one line]", source: "[Publication — year]" },
    { quote: "[A real quote about the writing — roughly this length, one line]", source: "[Reader or editor — year]" },
    { quote: "[A real quote about the builds — roughly this length, one line]", source: "[Publication — year]" }
  ],

  /* a real pull-quote from book three — swap in whichever line you want to lead with */
  excerpt: {
    book: "Okay, but Why?",
    chapter: "Chapter one — a windowless sauna",
    text: "We live in a world where it is easy to generate content, but hard to generate meaning. Anyone can fill a page with words, just like anyone can buy materials for a house."
  },

  /* ---------- legal identity (used by the legal pages) ---------- */
  legal: {
    owner: "David Rose",
    tradingName: "David Rose",
    street: "[street and number]",
    city: "[postcode] [city]",
    country: "[country]",
    email: "hello@yourname.com",
    phone: "+00 000 000 000",
    vat: "Not VAT registered",
    register: "—",
    responsible: "David Rose"
  }
};
