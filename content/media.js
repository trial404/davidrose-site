/* ==========================================================================
   MEDIA — one of the two files you edit.
   --------------------------------------------------------------------------
   Everything here is a file path, a price, or an external link. All page
   prose lives in content/WRITING.txt (compiled to content/copy.js?v=20261125b).

   name/role   who you are. All links live in content/links.js?v=20261125b
   series      the gallery views and the colour each one uses as its accent
   photos      every photograph. Mechanical only — id, series, sets, ratio, file
   prints      prints available on request / for sale, with sizes and prices
   photobooks  printed trip photobooks in progress
   books       the trilogy
   projects    the five working AI builds, with screenshots and write-ups
   legal       your trading identity, used by the three legal pages
   ========================================================================== */

window.MEDIA = {

  name: "David Rose",
  role: "Photography · Writing · AI Builds",
  worlds: [
    {
      id: "photography",
      num: "01",
      name: "Photography",
      color: "var(--blue)",
      href: "photography.html",
      blurb: "Landscape and water studies, plus two trip photobooks in progress — the Canary Islands and a solo crossing of the Pyrenees.",
      count: "34 photographs · 2 photobooks",
      cta: "See the work",
      previews: [
        { image: "assets/img/photos/landscape-h39a0377.jpg", label: "Pyrenees fog" },
        { image: "assets/img/photos/artistic-frame-72-2.jpg", label: "Water study" },
        { image: "assets/img/photos/landscape-h39a1324.jpg", label: "Landscape" }
      ]
    },
    {
      id: "writing",
      num: "02",
      name: "Writing",
      color: "var(--orange)",
      href: "writing.html",
      blurb: "A three-book arc: judging value when shortcuts hide effort, staying sovereign with AI, and finding an inward compass for what comes next.",
      count: "Books 1 & 2 drafted · Book 3 in progress",
      cta: "Read the books",
      previews: [
        { image: "assets/img/books/01-okay-but-why.jpg?v=20261125b", label: "Okay, But Why?" },
        { image: "assets/img/books/02-you-and-ai.jpg?v=20261125b", label: "You and [A]I" },
        { image: "", label: "03 · Next" }
      ]
    },
    {
      id: "ai",
      num: "03",
      name: "AI builds",
      color: "var(--green)",
      href: "ai.html",
      blurb: "Five local-first apps built to solve specific problems in my own life — language learning, training telemetry, piano, book research, and audio.",
      count: "5 working apps",
      cta: "See the builds",
      previews: [
        { image: "assets/img/projects/language-studio.jpg", label: "Language Studio" },
        { image: "assets/img/projects/training-hub.jpg", label: "Training Hub" },
        { image: "assets/img/projects/piano-wait-mode.jpg", label: "Piano Teacher" }
      ]
    },
    {
      id: "about",
      num: "04",
      name: "About",
      color: "var(--yellow)",
      href: "about.html",
      blurb: "Engineering, aerospace planning, photography, writing, and personal tools — a home for curiosity without boxing it into one lane.",
      count: "Background & values",
      cta: "About me",
      previews: [
        { image: "assets/img/about-portrait.jpg", label: "In the field" },
        { image: "assets/img/photos/landscape-h39a1639.jpg", label: "Mountain" },
        { image: "assets/img/photos/artistic-h39a8775-1.jpg", label: "Light" }
      ]
    }
  ],

  /* the four things you can toggle between in the gallery */
  series: [
    { id: "landscape",   name: "Landscape",   color: "var(--blue)",   contrast: "var(--orange)", blurb: "Field, weather, and time on foot" },
    { id: "artistic",    name: "Artistic",    color: "var(--orange)", contrast: "var(--blue)",   blurb: "Water, surface, and light" },
    { id: "collections", name: "Collections", color: "var(--green)",  contrast: "var(--yellow)", blurb: "Curated groups, across both series" },
    /* the shop sits on paper, not a colour field — yellow is the highlight only */
    { id: "shop",        name: "Print shop",  color: "var(--paper)",  contrast: "var(--yellow)", blurb: "Available by request" }
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
    { id: "artistic-h39a8846-1", series: "Artistic", sets: ["artistic", "shop"], ar: "1280 / 1600", image: "assets/img/photos/artistic-h39a8846-1.jpg" }
  ],

  /* ---------- collections ----------
     Curated groups that can mix both series. Reference photos by id
     (the image filename without its extension). */
  collections: [
    {
      id: "weather",
      name: "Weather",
      note: "Fog, low cloud, and the brief window when a ridge opens.",
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
      note: "The frames that took patience. Mixed across both series.",
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
      description: "Fog sitting in the pines below a rock face, shot from the opposite slope while waiting for the cloud to open.",
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
      description: "Portrait frame from the landscape series, printed tall so the vertical depth of the original composition holds.",
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
      description: "A quieter frame from the landscape series — mostly air and weather.",
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
      description: "Water and light stepped back into a wider frame — warmer, slower, and suited to a larger print.",
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
      description: "A swimmer seen from above, refracted through warm water. The body becomes the thing the light is made of.",
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
      description: "Portrait frame from the water and light series, balanced for a narrow wall.",
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
      title: "HRP — Solo Across the Pyrenees",
      subtitle: "Haute Randonnée Pyrénéenne · in progress",
      blurb: "Photographs and field notes from crossing the Pyrenees alone, self-supported — done for the experience itself rather than an accolade. This book is the bridge between the photography and the ideas in Okay, But Why?.",
      format: "Printed photobook · in progress",
      price: "In progress",
      pages: "",
      cover: "assets/img/photos/landscape-h39a0377.jpg",
      color: "var(--blue)",
      link: "#"
    },
    {
      title: "Canary Islands",
      subtitle: "Trip photobook · in progress",
      blurb: "A printed volume capturing volcanic terrain, coastal weather, and slow days moving through the Canary Islands with a camera — noticing what stays when you stop rushing.",
      format: "Printed photobook · in progress",
      price: "In progress",
      pages: "",
      cover: "assets/img/photos/landscape-h39a1324.jpg",
      color: "var(--orange)",
      link: "#"
    }
  ],

  books: [
    {
      title: "Okay, But Why?",
      subtitle: "Why two reasonable people look at the exact same shortcut and react in opposite ways.",
      blurb: "Most arguments about shortcuts, AI, and \"real\" work go in circles because we cram two separate questions into one word: how something was made (effort, risk, and human intent) and what it actually does for you right now. Pulling those two apart explains why something can work well and still feel hollow, and gives you a plain way to decide what's actually worth caring about, both in what you consume and what you build.",
      format: "Book 01 · 10 chapters · EN & ES",
      price: "Complete draft",
      pages: "",
      cover: "assets/img/books/01-okay-but-why.jpg?v=20261125b",
      color: "var(--yellow)",
      link: "https://docs.google.com/document/d/1qXgIToHOOvjCUNre_7BiaNNECljoZowlgnSgTmuf2uA/edit?usp=sharing",
      links: [
        { label: "Read · EN", url: "https://docs.google.com/document/d/1qXgIToHOOvjCUNre_7BiaNNECljoZowlgnSgTmuf2uA/edit?usp=sharing" },
        { label: "Read · ES", url: "https://docs.google.com/document/d/1BQvrO2-2W2nxu793IvgKU_WyAVjGf3_FRNMKf3fKKeg/edit?usp=sharing" }
      ]
    },
    {
      title: "You and [A]I",
      subtitle: "How modern AI actually works, what it does to your thinking, and how to stay in the driver's seat.",
      blurb: "You don't need to build an engine to drive safely, yet once software stops recommending songs and starts writing, coding, and deciding for you, flying blind carries real costs. This book compares how human minds and AI models actually operate, traces how passive offloading slowly dulls your own judgment, and lays out practical habits for steering these tools without turning into a rubber stamp.",
      format: "Book 02 · 10 chapters · EN & ES",
      price: "Complete draft",
      pages: "",
      cover: "assets/img/books/02-you-and-ai.jpg?v=20261125b",
      color: "var(--orange)",
      link: "https://docs.google.com/document/d/19pKioiXXr6vbwsTv4O1xSpnqvwwa6fmRPlrxFhSaha4/edit?usp=sharing",
      links: [
        { label: "Read · EN", url: "https://docs.google.com/document/d/19pKioiXXr6vbwsTv4O1xSpnqvwwa6fmRPlrxFhSaha4/edit?usp=sharing" },
        { label: "Read · ES", url: "https://docs.google.com/document/d/1gee2fgkvf_brqLQ_y9I4bfG8qPdZI5LtzMAzwZ1JLpc/edit?usp=sharing" }
      ]
    },
    {
      title: "How to Restart",
      subtitle: "When technology lets you do almost anything, the hard part becomes deciding what you actually want.",
      blurb: "Instead of pretending to predict which industries or job titles survive the next five years, this book starts from what is already landing on your desk: when execution gets cheap, capability stops being the bottleneck. It looks at what happens to pride and the word \"create\" when making gets easy, why having 10x leverage doesn't mean you should produce 10x more, where human attention breaks, and how to build a real restart without burning out on endless options.",
      format: "Book 03 · Architecture locked",
      price: "In progress",
      pages: "",
      cover: "",
      color: "var(--green)",
      link: "#"
    }
  ],

  /* ---------- projects ----------
     Five working local-first apps built to solve specific problems in my own life.
     Each opens as a full card with a live screenshot and write-up. */
  projects: [
    {
      id: "language-studio",
      title: "Language Studio",
      desc: "A flexible language-learning app where I control the structure, import my own Anki decks, and study the exact vocabulary and texts I care about.",
      tags: ["FastAPI", "React", "FSRS", "Kokoro TTS"],
      image: "assets/img/projects/language-studio.jpg",
      link: "#",
      details: {
        status: "Working · daily use",
        overview: "A local-first language-learning studio supporting French and Spanish. It combines textbook-seeded grammar guidebooks, audio drills, FSRS spaced repetition, custom Anki deck imports, and a synchronized audiobook reader — all running locally with Kokoro text-to-speech.",
        why: "I learned a lot with Duolingo early on, but the rigidity of its fixed path made it hard to get back into. I wanted to structure my own learning, bring in my own Anki decks so I'm actually studying the vocabulary I want, and drop in any reading or grammar material whenever I need it.",
        challenge: "Keeping the lightweight flow and feedback of a modern language app without locking the curriculum behind someone else's fixed tree or monthly subscription.",
        solution: "A FastAPI + SQLite backend paired with a clean React interface: import EPUBs or .apkg Anki decks into a shared spaced-repetition database, run listening and production drills, and pre-generate natural audio locally.",
        aiUse: "AI helped build the parsers, spaced-repetition scheduling, and curriculum enrichment pipelines — augmenting how I study without dictating what I should learn.",
        improvements: "Expanding the Spanish B1–C2 track and adding quick capture from books and podcasts straight into the review queue."
      }
    },
    {
      id: "training-hub",
      title: "Training Hub",
      desc: "One local dashboard across cycling, running, swimming, and lifting — built to actually understand my progress across every sport I train.",
      tags: ["FastAPI", "SQLite", "Parquet", "React"],
      image: "assets/img/projects/training-hub.jpg",
      link: "#",
      details: {
        status: "Working · 840+ sessions",
        overview: "A local-first multi-sport telemetry hub that ingests Garmin FIT, TCX, GPX, and CSV files into uniform 1-second Parquet streams and a SQLite database. Tracks all-time and rolling 30-day Trophy Case benchmarks across cycling, running, and swimming, plus dual-device session washing and strength-to-endurance context.",
        why: "Every sport app silos its own data and hides the cross-sport picture — like how a heavy lifting session affects cycling efficiency or recovery 48 hours later. I wanted one place that holds all of my training tools and shows real progress across every discipline.",
        challenge: "Reconciling messy exports across different watches, bike computers, and pool workouts while keeping best-effort curves accurate and verifiable.",
        solution: "Immutable raw file storage, 1Hz resampled Parquet streams, deterministic Trophy Case calculations, a visual Wash Queue for cleaning interval blocks, and a CLI that exports compact training briefs on demand.",
        aiUse: "Built the ingestion pipeline, block-detection logic, and frontend visualizations rapidly with AI assistance, and added an optional brief exporter so I can cross-check training blocks when reviewing my plan.",
        improvements: "Adding longer seasonal trend views and tighter sleep/recovery correlation alongside the Trophy Case."
      }
    },
    {
      id: "piano-wait-mode",
      title: "Piano Teacher",
      desc: "A zero-dependency falling-note piano practice app that pauses until you hit the chord — plus offline audio-to-MIDI and PDF score conversion.",
      tags: ["Web MIDI", "Canvas", "Python", "Audio → MIDI"],
      image: "assets/img/projects/piano-wait-mode.jpg",
      link: "#",
      details: {
        status: "Working · active use",
        overview: "A local Web MIDI piano practice app with a vertical falling piano roll, Wait Mode (pauses at the play line until you play the required notes), Play Mode (adjustable tempo, A–B looping, hand isolation), and offline pipelines to convert sheet music PDFs or solo piano audio recordings into playable MIDI files.",
        why: "I wanted a clean falling-note practice tool without paying a recurring subscription for bloated features. Once I started building it, it grew into something far more capable than I expected — including turning any piano audio file directly into a beginner or full MIDI arrangement.",
        challenge: "Handling real-world MIDI timing, tied MusicXML notes across barlines, left/right hand splits, and turning messy MP3 piano covers into playable two-hand practice files.",
        solution: "A pure vanilla JS falling-note engine and Web Audio synth in a single HTML interface, paired with local Python pipelines for optical music recognition (PDF → MusicXML) and ByteDance piano transcription (audio → simplified or full MIDI).",
        aiUse: "AI helped architect the MIDI/MusicXML parsers and wire up local audio-transcription models so turning a piece I want to learn into a practice score takes one command.",
        improvements: "Refining automatic fingering hints and smoother pedal visualization for denser classical pieces."
      }
    },
    {
      id: "youtube-research-studio",
      title: "YouTube Research",
      desc: "The research tool behind my books — turns YouTube videos and comment threads into clean, structured notes I can reference and think with.",
      tags: ["Node.js", "yt-dlp", "YouTube API", "Zero deps"],
      image: "assets/img/projects/youtube-research-studio.jpg",
      link: "#",
      details: {
        status: "Working · used daily for the books",
        overview: "A zero-dependency Node.js local workspace that pulls transcripts via yt-dlp and metadata/comments via the YouTube Data API, deduplicates rolling auto-captions, and exports clean collapsible .vb blocks, Markdown, JSON, or CSV — either one video at a time or in batch queues.",
        why: "This is the exact tool I've been using while writing my trilogy. Watching long-form talks and debates is only half the work; I needed a reliable reference library of what I was watching so I could revisit ideas and have grounded AI conversations that genuinely build on what I'm absorbing.",
        challenge: "YouTube auto-captions arrive as noisy overlapping VTT lines, and copying transcripts + comments by hand breaks focus when researching a topic across dozens of videos.",
        solution: "A dual-pane local web app with a rolling-caption deduplicator, batch URL queue with manifest tracking, and structured exports formatted directly for my writing vault.",
        aiUse: "Built as a clean bridge between long-form video watching and deeper AI-assisted synthesis — turning passive watching into searchable, citable notes I actually engage with.",
        improvements: "Adding timestamped quote bookmarking and faster cross-export search across saved research folders."
      }
    },
    {
      id: "voice-studio",
      title: "TTS Generator",
      desc: "Local multilingual text-to-speech and voice cloning — built to narrate chapters and automate parts of content creation in my own voice.",
      tags: ["FastAPI", "Kokoro ONNX", "Audio8", "Local"],
      image: "assets/img/projects/voice-studio.jpg",
      link: "#",
      details: {
        status: "Working · updated dual-engine",
        overview: "A local audiobook and text-to-speech studio running on Apple Silicon. Pairs Kokoro-82M ONNX for fast multilingual synthesis (English, French, Spanish) with optional Audio8 0.6B INT4 zero-shot voice cloning from a short reference clip, plus chapter detection and resumable MP3 / .m4b audiobook rendering.",
        why: "I wanted a private, repeatable way to generate spoken versions of my writing and automate parts of content creation — using my own cloned voice or crisp multilingual voices without paying per-character API fees or uploading drafts to third-party servers.",
        challenge: "Running both fast multilingual synthesis and zero-shot voice cloning reliably on a laptop without choking RAM or losing progress mid-chapter on long manuscripts.",
        solution: "A dual-engine FastAPI backend with automatic idle memory release, smart Markdown/chapter chunking, per-chunk WAV checkpointing, and cancel/resume job control.",
        aiUse: "Local ONNX speech models do the synthesis while I control the script, pacing, voice selection, and editorial flow — keeping content production lightweight and under my own roof.",
        improvements: "Fine-tuning pronunciation dictionaries and adding direct batch presets for short-form video narration."
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
    email: "david94rose@gmail.com",
    phone: "+00 000 000 000",
    vat: "Not VAT registered",
    register: "—",
    responsible: "David Rose"
  }

};
