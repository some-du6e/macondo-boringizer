const onetoken2usd = 5
const onehour2usd = 5
const REALLYdebuging = false

if (!window.HCTG) {
  window.HCTG = {}
}

window.HCTG.consts = {
  onetoken2usd: onetoken2usd,
  onehour2usd: onehour2usd,
  REALLYdebuging: REALLYdebuging,
}

if (!window.HCTG.shop) {
  window.HCTG.shop = {}
}

window.HCTG.shop.categories = {
  featured: [
    64,   // $8 Travel Stipend
    98,   // Hack Club Pin
    25,   // Travel Stipends ($80)
    29,   // $150 Laptop Grant
    27,   // Macbook Neo (Global)
    26    // Macbook Neo (India)
  ],
  travel: [
    64,   // $8 Travel Stipend
    25,   // Travel Stipends ($80)
    101   // eSIM
  ],
  grants: [
    64,   // $8 Travel Stipend
    25,   // Travel Stipends ($80)
    29,   // $150 Laptop Grant
    16,   // Cloudflare Grant
    9,    // AI Usage Grants
    73,   // PCB Grant
    76,   // Domain Grant
    63,   // $20 Framework Credits
    71,   // $20 Keychron Credit
    90,   // Proton VPN Credits
    10,   // $10 Nebula Credit
    96,   // $10 Nintendo eShop credits
    107,  // $10 Spotify Credit
    66,   // $25 Steam Credit
    97    // $30 Console Grant
  ],
  tech: [
    29,   // $150 Laptop Grant
    27,   // Macbook Neo (Global)
    26,   // Macbook Neo (India)
    80,   // Mac Mini
    69,   // iPad
    63,   // $20 Framework Credits
    71,   // $20 Keychron Credit
    14,   // 64GB USB
    83,   // Evoworks Evo80
    87,   // Logitech C920
    86,   // Fujifilm Instax Mini 12 Instant Camera
    8,    // Github branded Yubikey 5C
    85    // Pebble Time 2 (smartwatch)
  ],
  hardware: [
    11,   // Raspberry Pi Zero 2 W
    74,   // Elegoo Uno Project Starter Kit
    72,   // Flipper Zero
    82,   // Bambu Lab A1 mini 3D Printer combo
    103,  // A1 mini 3D Printer
    73    // PCB Grant
  ],
  audio: [
    68,   // Beats Solo Buds
    67,   // Beats Solo 4 Headphones
    91,   // CMF Buds 2 Plus
    78,   // AirPods Pro 2nd Generation (USB-C) Refurbished
    81,   // Marshall Emberton III Speaker
    107   // $10 Spotify Credit
  ],
  gaming: [
    15,   // Mini Metro
    70,   // Mini Airways
    75,   // Minecraft
    77,   // Pico-8
    89,   // Playdate
    96,   // $10 Nintendo eShop credits
    97,   // $30 Console Grant
    66    // $25 Steam Credit
  ],
  misc: [
    98,   // Hack Club Pin
    65,   // Signed photo of @radioblahaj
    79,   // GitHub Denik Layflat Notebook
    88,   // Chrome Web Store license
    12,   // Hell Yes CSS by Julia Evans
    13,   // The Pocket Guide to Debugging by Julia Evans
    90,   // Proton VPN Credits
    10    // $10 Nebula Credit
  ]
}

if (!window.HCTG.roles) {
  window.HCTG.roles = {}
}

// prob really bad but wtv
window.HCTG.roles = {
  98: {
    id: 98,
    avatar: "https://avatars.slack-edge.com/2025-07-20/9220922723411_77b5657506d5c607a606_512.jpg",
    role: "reviewer",
    username: "Adhyys",
  },
  424: {
    id: 424,
    avatar: "https://avatars.slack-edge.com/2026-01-14/10299410841394_d43f91bb6b15095f06a2_512.png",
    role: "admin",
    username: "ascpixi",
  },
  539: {
    id: 539,
    avatar: "https://avatars.slack-edge.com/2026-01-02/10222102531364_81897bd5a29daff5c6c7_512.jpg",
    role: "admin",
    username: "phthallo",
  },
  1683: {
    id: 1683,
    avatar: "https://avatars.slack-edge.com/2025-11-22/9966719883203_8e7a52fe549bb55071ce_512.png",
    role: "reviewer",
    username: "iau",
  },
  578: {
    id: 578,
    avatar: "https://avatars.slack-edge.com/2026-01-16/10345469199216_84aca69f87c315112438_512.png",
    role: "reviewer",
    username: "maxstellar",
    },
    5: {
    "id": 5,
    "avatar": "https://avatars.slack-edge.com/2025-12-04/10057350036450_b4702515c7432666ac79_512.png",
    "role": "reviewer",
    "username": "zsharpminor"
},
}
if (!window.HCTG.quickresponses) {
  window.HCTG.quickresponses = []
}

window.HCTG.quickresponses = [
  "Hi! You need to include a proper README for your project. This should include a short description of the project, how you built it, and instructions on how to run/play/experience it. Feel free to resubmit when you've done this!",
  "Hey, it looks like you submitted this project to both Hack Club The Game and another YSWS program, which isn't allowed. Feel free to create and submit an original project just for Hack Club: The Game :) - ask in #hack-club-the-game if you need help!",
  `It looks like your submission relied on AI for its creation. We respect the value of AI as a coding tool, but a Hack Club project should be something that, when you look at it, you feel proud of how hard you worked to ship it. If you are using AI to help you code, then that means manually reviewing and adjusting the code so that the finished project is polished. You should also keep the use of AI to generally under 30% of your total project's code!
    
    Keep working until you have something that you can honestly say is your best work! Add a couple of features yourself, and once you feel confident that you've done the work to make this project your own, feel free to submit again! See slide 17 of https://hack.club/hctg/guide for more context.`
]
