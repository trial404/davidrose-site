/* ==========================================================================
   MEDIA — one of the two files you edit.
   --------------------------------------------------------------------------
   Everything here is a file path, a price, or an external link. No prose
   longer than a caption lives in this file — all the writing is in copy.js.

   name/role/email/socials  who you are, used across every page
   series      the two series, and the colour each one floods the showcase with
   photos      every photograph in the two showcase fields
   prints      what is actually for sale, with per-size prices and payment links
   photobooks  printed books you ship
   books       ebooks on Gumroad
   projects    the AI builds, with demo/repo links
   legal       your trading identity, used by the three legal pages
   ========================================================================== */

window.MEDIA = {

  name: "David Rose",
  role: "Photographer · Writer · Builder",
  email: "hello@yourname.com",
  instagram: "https://instagram.com/",
  substack: "https://yourname.substack.com",
  gumroad: "https://yourname.gumroad.com",
  github: "https://github.com/",

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

  series: [
    { name: "Landscape", color: "var(--blue)" },
    { name: "Artistic",  color: "var(--orange)" }
  ],

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

  featuredPrintId: "landscape-landscape-copy",

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
