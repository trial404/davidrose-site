/* ==========================================================================
   MEDIA — one of the two files you edit.
   --------------------------------------------------------------------------
   Everything here is a file path, a price, or an external link. No prose
   longer than a caption lives in this file — all the writing is in copy.js.

   name/role   who you are. All links live in content/links.js
   series      the two series, and the colour each one floods the showcase with
   photos      every photograph. Mechanical only — id, series, sets,
               ratio, file. Titles and words live in content/photos.js
   prints      what is actually for sale, with per-size prices and payment links
   photobooks  printed books you ship
   books       ebooks on Gumroad
   projects    the AI builds, with demo/repo links
   legal       your trading identity, used by the three legal pages
   ========================================================================== */

window.MEDIA = {

  name: "David Rose",
  role: "Photographer · Writer · Builder",
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

  /* the four things you can toggle between in the gallery */
  series: [
    { id: "landscape",   name: "Landscape",   color: "var(--blue)",   contrast: "var(--orange)", blurb: "Field and weather" },
    { id: "artistic",    name: "Artistic",    color: "var(--orange)", contrast: "var(--blue)",   blurb: "Water and light" },
    { id: "collections", name: "Collections", color: "var(--green)",  contrast: "var(--yellow)", blurb: "Curated groups, across both series" },
    /* the shop sits on paper, not a colour field — yellow is the highlight only */
    { id: "shop",        name: "Print shop",  color: "var(--paper)",  contrast: "var(--yellow)", blurb: "Available to buy" }
  ],

  photos: [
    { id: "landscape-h39a0377", series: "Landscape", sets: ["landscape", "shop"], ar: "1280 / 1600", image: "assets/img/photos/landscape-h39a0377.jpg" },
    { id: "landscape-h39a1324", series: "Landscape", sets: ["landscape"], ar: "1600 / 1066", image: "assets/img/photos/landscape-h39a1324.jpg" },
    { id: "landscape-h39a1639", series: "Landscape", sets: ["landscape"], ar: "1600 / 1066", image: "assets/img/photos/landscape-h39a1639.jpg" },
    { id: "landscape-h39a1728", series: "Landscape", sets: ["landscape"], ar: "1600 / 1066", image: "assets/img/photos/landscape-h39a1728.jpg" },
    { id: "landscape-h39a1763", series: "Landscape", sets: ["landscape", "shop"], ar: "1066 / 1600", image: "assets/img/photos/landscape-h39a1763.jpg" },
    { id: "landscape-h39a1856", series: "Landscape", sets: ["landscape"], ar: "1600 / 1066", image: "assets/img/photos/landscape-h39a1856.jpg" },
    { id: "landscape-h39a1880", series: "Landscape", sets: ["landscape"], ar: "1280 / 1600", image: "assets/img/photos/landscape-h39a1880.jpg" },
    { id: "landscape-h39a5474-1", series: "Landscape", sets: ["landscape"], ar: "1066 / 1600", image: "assets/img/photos/landscape-h39a5474-1.jpg" },
    { id: "landscape-h39a9236", series: "Landscape", sets: ["landscape", "shop"], ar: "1278 / 1600", image: "assets/img/photos/landscape-h39a9236.jpg" },
    { id: "landscape-h39a9577", series: "Landscape", sets: ["landscape"], ar: "1600 / 1066", image: "assets/img/photos/landscape-h39a9577.jpg" },
    { id: "landscape-img-6361", series: "Landscape", sets: ["landscape"], ar: "1280 / 1600", image: "assets/img/photos/landscape-img-6361.jpg" },
    { id: "artistic-frame-11-4", series: "Artistic", sets: ["artistic"], ar: "1240 / 1600", image: "assets/img/photos/artistic-frame-11-4.jpg" },
    { id: "artistic-frame-11", series: "Artistic", sets: ["artistic"], ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-11.jpg" },
    { id: "artistic-frame-19", series: "Artistic", sets: ["artistic"], ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-19.jpg" },
    { id: "artistic-frame-21", series: "Artistic", sets: ["artistic"], ar: "1297 / 1600", image: "assets/img/photos/artistic-frame-21.jpg" },
    { id: "artistic-frame-26", series: "Artistic", sets: ["artistic"], ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-26.jpg" },
    { id: "artistic-frame-27", series: "Artistic", sets: ["artistic"], ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-27.jpg" },
    { id: "artistic-frame-30", series: "Artistic", sets: ["artistic"], ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-30.jpg" },
    { id: "artistic-frame-31", series: "Artistic", sets: ["artistic"], ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-31.jpg" },
    { id: "artistic-frame-32", series: "Artistic", sets: ["artistic"], ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-32.jpg" },
    { id: "artistic-frame-33-2", series: "Artistic", sets: ["artistic"], ar: "1297 / 1600", image: "assets/img/photos/artistic-frame-33-2.jpg" },
    { id: "artistic-frame-4-6", series: "Artistic", sets: ["artistic"], ar: "1280 / 1600", image: "assets/img/photos/artistic-frame-4-6.jpg" },
    { id: "artistic-frame-53", series: "Artistic", sets: ["artistic"], ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-53.jpg" },
    { id: "artistic-frame-55", series: "Artistic", sets: ["artistic"], ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-55.jpg" },
    { id: "artistic-frame-59", series: "Artistic", sets: ["artistic"], ar: "1327 / 1600", image: "assets/img/photos/artistic-frame-59.jpg" },
    { id: "artistic-frame-6-3", series: "Artistic", sets: ["artistic"], ar: "1280 / 1600", image: "assets/img/photos/artistic-frame-6-3.jpg" },
    { id: "artistic-frame-70-2", series: "Artistic", sets: ["artistic"], ar: "1282 / 1600", image: "assets/img/photos/artistic-frame-70-2.jpg" },
    { id: "artistic-frame-72-1", series: "Artistic", sets: ["artistic"], ar: "1600 / 1282", image: "assets/img/photos/artistic-frame-72-1.jpg" },
    { id: "artistic-frame-72-2", series: "Artistic", sets: ["artistic", "shop"], ar: "1600 / 1282", image: "assets/img/photos/artistic-frame-72-2.jpg" },
    { id: "artistic-frame-9-12", series: "Artistic", sets: ["artistic"], ar: "1240 / 1600", image: "assets/img/photos/artistic-frame-9-12.jpg" },
    { id: "artistic-h39a6457", series: "Artistic", sets: ["artistic", "shop"], ar: "1600 / 1280", image: "assets/img/photos/artistic-h39a6457.jpg" },
    { id: "artistic-h39a8021-1", series: "Artistic", sets: ["artistic"], ar: "1066 / 1600", image: "assets/img/photos/artistic-h39a8021-1.jpg" },
    { id: "artistic-h39a8775-1", series: "Artistic", sets: ["artistic"], ar: "1280 / 1600", image: "assets/img/photos/artistic-h39a8775-1.jpg" },
    { id: "artistic-h39a8846-1", series: "Artistic", sets: ["artistic", "shop"], ar: "1280 / 1600", image: "assets/img/photos/artistic-h39a8846-1.jpg" },
  ],

  /* ---------- collections ----------
     Curated groups that can mix both series. Reference photos by id
     (the image filename without its extension). */
  collections: [
    {
      id: "weather",
      name: "Weather",
      note: "Fog, low cloud, and the four minutes when the ridge opens.",
      photos: ["landscape-h39a0377", "landscape-h39a1763", "landscape-h39a9236"]
    },
    {
      id: "surface",
      name: "Surface",
      note: "Water photographed close enough that it stops reading as water.",
      photos: ["artistic-frame-72-2", "artistic-h39a6457", "artistic-frame-53"]
    },
    {
      id: "waiting",
      name: "Waiting",
      note: "The frames that took longest. Mixed across both series.",
      photos: ["artistic-h39a8846-1", "landscape-h39a1880"]
    }
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

  /* ---------- projects ----------
     Each opens as a full card: overview, why, challenge, solution, where AI comes
     in, and what is next. Fields left in [brackets] are yours to write — delete a
     field entirely and the row disappears from the card. */
  projects: [
    {
      id: "voice-studio",
      title: "Voice Studio",
      desc: "Local voice-cloning text-to-speech. Clone a voice from one reference recording, then generate audio from any text.",
      tags: ["FastAPI", "TTS", "Local"],
      link: "#",
      details: {
        status: "Working",
        overview: "A local voice-cloning text-to-speech app built around a single engine: Audio8, 0.6B parameters, quantised to ONNX INT4 and running CPU-only. Register a voice once from a short reference recording, then generate MP3s from any length of text — a paragraph to test, a chapter, or a whole book.",
        why: "[why you wanted this]",
        challenge: "CPU-only inference inside a laptop's memory budget, while the interface stays responsive.",
        solution: "One engine instead of five: Audio8 spawned as a local service and killed on shutdown, a FastAPI backend, SQLite state, and background jobs with progress. Peak memory measured around 1.0–1.2 GiB on a 16GB M2.",
        aiUse: "The engine is the AI. A voice profile is captured once and reused for every generation, which is what makes long-form output practical.",
        improvements: "[what you would improve next]"
      }
    },
    {
      id: "book-converter",
      title: "Book Converter",
      desc: "A small Calibre that lives on your own machine. Four formats in and out, with Markdown export in pure Python.",
      tags: ["Python", "EPUB", "Offline"],
      link: "#",
      details: {
        status: "Working",
        overview: "A standalone offline ebook and document converter. EPUB, PDF, MOBI and AZW3 in; PDF, MOBI, Markdown and EPUB out. No uploads, no accounts — every conversion happens on the machine.",
        why: "[why you wanted this]",
        challenge: "Four formats, four different engines, and nothing may leave the computer.",
        solution: "Markdown output is pure Python for the common case (chapters, tables and images preserved), with pandoc and PyMuPDF used when they happen to be installed.",
        aiUse: "[where AI helped]",
        improvements: "[what you would improve next]"
      }
    },
    {
      id: "file-converter",
      title: "File Converter",
      desc: "Garmin FIT, TCX, GPX and Strava exports flattened into one tidy CSV per activity — and back out to FIT.",
      tags: ["Python", "Garmin FIT", "Strava"],
      link: "#",
      details: {
        status: "Working",
        overview: "A local file converter with a browser UI. Garmin FIT, TCX, GPX and Strava exports in; one consolidated CSV per activity out — and back out to FIT through the official Garmin SDK. Every conversion runs locally.",
        why: "Strava exports arrive as a pile of per-message-type files that nothing can open comfortably. This turns them into one row-per-sample table with the lap and session summary already attached.",
        challenge: "Activity formats disagree about units, naming and structure, and Strava ships everything gzipped.",
        solution: "One CSV per activity named by date, sport and original file; metres, m/s, bpm and watts in raw SI with units in the headers; gzip and batch ZIP handled automatically.",
        aiUse: "[where AI helped]",
        improvements: "[what you would improve next]"
      }
    },
    {
      id: "bike-interval-timer",
      title: "Bike Interval Timer",
      desc: "A phone-first interval timer for a gym bike. The whole plan on one screen, with one big clock.",
      tags: ["Vanilla JS", "Single file"],
      link: "#",
      details: {
        status: "Working",
        overview: "A single HTML file. The whole workout sits at the top as a table — time, segment, watts, RPM — with each row showing planned duration, a live countdown while it runs, then a tick and the actual time once done. One large countdown underneath for whatever segment you are in.",
        why: "The bike's own display cannot show the whole workout, and switching to the Clock app loses your place mid-set.",
        challenge: "Work sets start when you are ready, rests start by themselves when a set hits zero, and a rest can run long without you losing the plan.",
        solution: "Per-row state rather than one running timer, plus a single big countdown for the current segment. No build step, no dependencies.",
        aiUse: "[where AI helped]",
        improvements: "[what you would improve next]"
      }
    },
    {
      id: "piano-wait-mode",
      title: "Piano Wait Mode",
      desc: "Listens to an acoustic piano and refuses to advance until you have found every note in the bar.",
      tags: ["Web Audio", "DSP"],
      link: "#",
      details: {
        status: "Core + app built",
        overview: "A local web app that listens through a microphone and does not move on until every note in the bar has been played. No clock, no tempo, no rushing. One hand at a time or both.",
        why: "The point is not to learn a song. It is to stop hunting for the notes, so that you can then learn the song.",
        challenge: "Working out which notes are sounding from a microphone in a real room, with pedal, harmonics and background noise in the way.",
        solution: "Signal processing validated against synthetic piano tones, with 43 tests green. One hand at a time or both.",
        aiUse: "[where AI helped]",
        improvements: "It has not yet been tuned on a real piano in a real room. Calibration is the next feature, and it is the thing that makes this usable rather than merely correct."
      }
    },
    {
      id: "pitch-monitor",
      title: "Pitch Monitor",
      desc: "Microphone in, scrolling pitch-against-time chart out. Nothing leaves the machine.",
      tags: ["Web Audio", "Canvas", "Local"],
      link: "#",
      details: {
        status: "Spec",
        overview: "A local web app that detects the pitch of your voice in real time and draws a scrolling pitch-versus-time chart with semitone gridlines and note labels — a chart rather than a piano roll. One file, no dependencies, no build step.",
        why: "[why you wanted this]",
        challenge: "Keeping the chart readable while you sing: silence and low-confidence frames must not draw a trace, or the whole thing turns to noise.",
        solution: "McLeod-style autocorrelation over a short window, recomputed continuously, with unvoiced frames skipped and a compact live readout beside the chart.",
        aiUse: "[where AI helped]",
        improvements: "[what you would improve next]"
      }
    }
  ,
    {
      id: "fisheye-wall",
      title: "Fisheye Wall",
      desc: "An experiment: the photographs as one continuous lens you can drag, with momentum. Not used in the gallery.",
      tags: ["Canvas", "No dependencies"],
      link: "lab.html",
      linkLabel: "Open the experiment",
      details: {
        status: "Experiment",
        overview: "Every photograph drawn into a single canvas grid, then scaled per tile by its distance from the pointer so the whole wall reads as one lens. Dragging pans it and the pan keeps going with friction.",
        why: "Because the reference did it and it was worth knowing how it works without a framework.",
        challenge: "Making the warp read as one continuous surface rather than a scattering of differently sized squares.",
        solution: "A gaussian falloff on distance from the focal point, applied as per-tile scale, with tiles indexed by world position so a picture keeps its place while you drag.",
        aiUse: "[where AI helped]",
        improvements: "It bends the photograph, which is exactly why it is not in the portfolio. A print should be judged straight."
      }
    }
  ],

  featuredPrintId: "landscape-h39a0377",

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
