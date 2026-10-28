/**
 * Vercel Single-File Serverless Function (`api/index.js`)
 * Role: Smart Social Media Link Cloaker + High-Converting 18+ VIP Vault Pre-Lander
 * Zero external npm dependencies required — styled with Tailwind CSS CDN.
 */

const ADSTERRA_DIRECT_LINK = "https://www.profitableratecpmnetwork.com/q57rx5uii?key=71c304f4b20e2231d1d551e412b40da5";

const FALLBACK_IMAGE = "https://i.imgur.com/8Km9tLL.jpg";
const FALLBACK_BANNER = "/assets/aistudio/2560x1440.201_1860c12a.webp";

const BOT_SIGNATURES = [
  "twitterbot",
  "facebookexternalhit",
  "telegrambot",
  "discordbot",
  "whatsapp"
];

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function resolveDynamicImage(rawImg) {
  if (!rawImg || typeof rawImg !== "string") return FALLBACK_IMAGE;
  const cleaned = rawImg.trim();
  return /^https?:\/\/[^\s"'<>]+$/i.test(cleaned) || /^\/[^\s"'<>]*$/.test(cleaned) ? cleaned : FALLBACK_IMAGE;
}

function isCrawlerBot(userAgent = "") {
  const ua = String(userAgent).toLowerCase();
  return BOT_SIGNATURES.some((bot) => ua.includes(bot));
}

export default function handler(req, res) {
  const userAgent = req.headers["user-agent"] || "";
  const dynamicImg = resolveDynamicImage(req.query && req.query.img);
  const safeImg = escapeHtml(dynamicImg);

  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "vip-access.vercel.app";
  const currentUrl = escapeHtml(`${protocol}://${host}${req.url || "/"}`);

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");

  // 1. CLOAKER LOGIC FOR SOCIAL MEDIA BOTS
  if (isCrawlerBot(userAgent)) {
    const ogTitle = "Aria Vance • Desi Private MMS & Uncut Live Stream (Full HD)";
    const ogDesc = "Exclusive private Indian bedroom stream and leaked camera roll archive. Limited complimentary access window active now.";

    return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${ogTitle}</title>
  <meta name="description" content="${ogDesc}" />

  <!-- OpenGraph Meta Tags -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${currentUrl}" />
  <meta property="og:title" content="${ogTitle}" />
  <meta property="og:description" content="${ogDesc}" />
  <meta property="og:image" content="${safeImg}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter Large Summary Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${ogTitle}" />
  <meta name="twitter:description" content="${ogDesc}" />
  <meta name="twitter:image" content="${safeImg}" />
</head>
<body style="background:#09090b;color:#fafafa;font-family:sans-serif;text-align:center;padding:48px 20px;">
  <h1>${ogTitle}</h1>
  <p>${ogDesc}</p>
</body>
</html>`);
  }

  // 2. HIGH-CONVERTING 18+ VIP FANPAGE PRE-LANDER FOR REAL USERS
  const vaultItems = [
    { title: "Desi Bhabhi Private Bedroom Cam", duration: "16:42", views: "142.8K", badge: "DESI RAW" },
    { title: "Hostel Late Night MMS Tape Uncut", duration: "12:15", views: "198.4K", badge: "LEAKED MMS" },
    { title: "Mumbai Penthouse Secret Affair", duration: "24:10", views: "215.1K", badge: "4K UNCUT" },
    { title: "Devar Bhabhi Romance Full HD", duration: "18:30", views: "340.6K", badge: "VIRAL DESI" },
    { title: "Deleted Snapchat Story Full Video", duration: "08:52", views: "98.2K", badge: "PRIVATE" },
    { title: "VIP Subscriber Live Request Show", duration: "27:14", views: "285.9K", badge: "UNCENSORED" }
  ];

  const vaultGridHtml = vaultItems
    .map(
      (item) => `
      <div class="group relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 cursor-pointer">
        <img src="${safeImg}" alt="${item.title}" referrerpolicy="no-referrer" class="h-full w-full scale-110 object-cover blur-md brightness-75 transition-transform duration-300 group-hover:scale-125" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25"></div>
        <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-bold">
          <span class="rounded bg-rose-600/90 px-1.5 py-0.5 uppercase tracking-wider text-white">🔞 ${item.badge}</span>
          <span class="rounded bg-black/65 px-1.5 py-0.5 font-mono text-zinc-200">${item.duration}</span>
        </div>
        <div class="absolute inset-x-0 top-1/2 -translate-y-4 flex items-center justify-center">
          <div class="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/65 text-base shadow-lg backdrop-blur-md">🔒</div>
        </div>
        <div class="absolute bottom-2.5 left-2.5 right-2.5">
          <p class="truncate text-xs font-semibold text-white">${item.title}</p>
          <p class="mt-0.5 truncate font-mono text-[10px] text-zinc-300">${item.views} views · Tap to unlock</p>
        </div>
      </div>`
    )
    .join("");

  return res.status(200).send(`<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Aria Vance • VIP 18+ Private Vault</title>
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- ===================================================================== -->
  <!-- PASTE YOUR ADSTERRA POPUNDER / SOCIAL BAR SCRIPTS DIRECTLY BELOW HERE -->
  <!-- <script type="text/javascript" src="//plXXXXXXX.highperformanceformat.com/..."></script> -->
  <!-- ===================================================================== -->

  <style>
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.6), 0 0 32px rgba(244, 63, 94, 0.45); }
      50% { box-shadow: 0 0 0 14px rgba(244, 63, 94, 0), 0 0 48px rgba(244, 63, 94, 0.8); }
    }
    .play-glow { animation: pulseGlow 2s infinite; }
    body { cursor: pointer; -webkit-tap-highlight-color: transparent; }
  </style>
</head>
<body onclick="window.location.href = ADSTERRA_DIRECT_LINK" class="min-h-screen bg-[#07070a] text-zinc-100 antialiased selection:bg-rose-500 selection:text-white">

  <!-- Top Header: Verified Badge + Live Dot + Urgent Countdown -->
  <header class="sticky top-0 z-40 border-b border-white/10 bg-[#09090e]/90 backdrop-blur-xl">
    <div class="mx-auto flex max-w-lg items-center justify-between px-4 py-2.5">
      <div class="flex items-center gap-2 min-w-0">
        <span class="relative flex h-2.5 w-2.5 shrink-0">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
        </span>
        <span class="truncate text-sm font-bold tracking-tight text-white">Aria Vance • VIP 18+</span>
        <svg class="h-4 w-4 shrink-0 text-sky-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/15 px-2.5 py-1 text-xs font-semibold text-rose-300 shrink-0">
        <span>Free access closes in</span>
        <span id="countdown-timer" class="font-mono font-bold text-rose-200">04:59</span>
      </div>
    </div>
  </header>

  <main class="mx-auto max-w-lg pb-24">
    <!-- Background Banner & Circular Dynamic Avatar -->
    <section class="relative">
      <div class="relative h-40 w-full overflow-hidden bg-zinc-900">
        <img src="${safeImg}" alt="VIP Cover Banner" referrerpolicy="no-referrer" class="h-full w-full scale-110 object-cover blur-sm opacity-65" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/35 to-transparent"></div>
        <div class="absolute top-3 right-3 rounded-full border border-white/10 bg-black/65 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 backdrop-blur-md">
          ● LIVE STREAMING
        </div>
      </div>

      <div class="relative -mt-12 flex items-end justify-between px-4">
        <div class="relative">
          <div class="h-24 w-24 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 p-[3px] shadow-2xl">
            <img src="${safeImg}" alt="Aria Vance" referrerpolicy="no-referrer" class="h-full w-full rounded-full object-cover bg-zinc-900" />
          </div>
          <span class="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#07070a] bg-emerald-500"></span>
        </div>

        <button type="button" class="mb-1 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-rose-600/30">
          Unlock Full VIP Free
        </button>
      </div>

      <div class="mt-3 px-4">
        <h1 class="text-xl font-extrabold tracking-tight text-white">Aria Vance <span class="text-xs font-semibold text-rose-400">18+ VERIFIED</span></h1>
        <p class="text-xs text-zinc-400">@ariavance.vip · Online Now · Delhi / Mumbai VIP</p>
        <p class="mt-2 text-sm leading-relaxed text-zinc-200">
          🔥 <span class="font-bold text-rose-400">Desi Viral MMS &amp; Private Hotel Room Cam:</span> Yeh exclusive leaked video agle 5 minute ke liye free unblock hai. Age 18+ confirm karein aur full HD video turant dekhein!
        </p>
        <div class="mt-3 flex items-center gap-4 text-xs text-zinc-400 border-y border-white/10 py-2.5">
          <span><strong class="font-mono text-white">184</strong> Desi MMS</span>
          <span>·</span>
          <span><strong class="font-mono text-white">52</strong> Viral Tapes</span>
          <span>·</span>
          <span><strong class="font-mono text-white">412.8K</strong> Views</span>
        </div>
      </div>
    </section>

    <!-- Central Media Player Container -->
    <section class="mt-4 px-4">
      <div class="relative overflow-hidden rounded-2xl border border-rose-500/30 bg-zinc-950 shadow-2xl shadow-rose-950/30">
        <div class="relative aspect-video w-full overflow-hidden bg-zinc-900">
          <img src="${safeImg}" alt="18+ Blurred Preview" referrerpolicy="no-referrer" class="h-full w-full scale-110 object-cover blur-[7px] brightness-75" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30"></div>

          <div class="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span class="rounded-md bg-rose-600 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">🔞 18+ DESI MMS</span>
            <span class="rounded-md bg-black/70 px-2 py-0.5 font-mono text-[11px] font-semibold text-zinc-200">HD 1080p</span>
          </div>

          <div class="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <button type="button" aria-label="Play Explicit Video" class="play-glow flex h-16 w-16 items-center justify-center rounded-full bg-rose-600 text-white">
              <svg class="ml-1 h-8 w-8 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </button>
            <p class="mt-3 text-sm font-bold text-white">18+ Age Verification / Explicit Content Warning</p>
            <p class="mt-0.5 text-xs text-zinc-300">Tap anywhere to confirm 18+ age and unmute stream</p>
          </div>
        </div>

        <!-- Fake Interactive Progress Bar -->
        <div class="border-t border-white/10 bg-zinc-950 px-3.5 py-3">
          <div class="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <div class="h-full w-[15%] rounded-full bg-gradient-to-r from-rose-500 to-pink-500"></div>
          </div>
          <div class="mt-2 flex items-center justify-between text-xs text-zinc-300">
            <div class="flex items-center gap-2.5">
              <span class="font-semibold text-white">▶ Play</span>
              <span class="font-mono text-[11px]">0:00 / 3:45 HD</span>
            </div>
            <span class="text-[11px] font-semibold text-rose-400">🔊 Tap to Unmute · ⛶</span>
          </div>
        </div>
      </div>

      <button type="button" class="mt-3.5 flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 py-3.5 px-4 text-xs sm:text-sm font-extrabold uppercase tracking-wide text-white shadow-xl shadow-rose-600/30 whitespace-nowrap">
        🔓 Confirm 18+ &amp; Watch Full Video
      </button>
    </section>

    <!-- Locked Media Vault Grid -->
    <section class="mt-6 px-4">
      <div class="mb-3 flex items-center justify-between gap-2">
        <div class="min-w-0">
          <h2 class="text-base font-bold text-white">Locked Desi MMS Vault (6)</h2>
          <p class="text-xs text-zinc-400">Uncensored viral tapes &amp; VIP room cams</p>
        </div>
        <span class="font-mono text-xs font-semibold text-rose-400 whitespace-nowrap shrink-0">🔞 VIP ONLY</span>
      </div>
      <div class="grid grid-cols-2 gap-3">
        ${vaultGridHtml}
      </div>
    </section>
  </main>

  <!-- Floating FOMO Notification Popup -->
  <div id="fomo-popup" class="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-sm transition-all duration-300">
    <div class="flex items-center gap-2.5 rounded-xl border border-white/15 bg-zinc-900/95 px-3 py-2 shadow-2xl backdrop-blur-xl">
      <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-600/20 text-sm">🔓</span>
      <div class="min-w-0 flex-1">
        <p id="fomo-message" class="truncate text-xs font-semibold text-white">User @rohit_delhi just unlocked Desi Bhabhi Private Cam!</p>
        <p class="text-[10px] text-emerald-400">Verified 18+ Instant Access · Just now</p>
      </div>
    </div>
  </div>

  <!-- 3. GLOBAL CLICK TRAP & URGENCY SCRIPTS -->
  <script>
    const ADSTERRA_DIRECT_LINK = "https://www.profitableratecpmnetwork.com/q57rx5uii?key=71c304f4b20e2231d1d551e412b40da5";

    function redirectToOffer() {
      window.location.href = ADSTERRA_DIRECT_LINK;
    }

    // Global click & touch event listeners across the entire document
    document.addEventListener("click", redirectToOffer, true);

    // Urgent Countdown Timer (04:59 -> 00:00)
    let secondsLeft = 299;
    const timerNode = document.getElementById("countdown-timer");
    setInterval(() => {
      secondsLeft = secondsLeft > 0 ? secondsLeft - 1 : 59;
      const m = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
      const s = String(secondsLeft % 60).padStart(2, "0");
      if (timerNode) timerNode.textContent = m + ":" + s;
    }, 1000);

    // Periodic Floating FOMO Notifications
    const fomoAlerts = [
      "User @rohit_delhi just unlocked Desi Bhabhi Private Cam!",
      "User @vikram_mumbai verified 18+ & started MMS playback!",
      "User @amit_kumar99 unlocked Hostel Late Night Tape!",
      "User @rajesh_vip just accessed all 52 Desi MMS sets!",
      "User @deepak_pune unlocked Devar Bhabhi Romance Full HD!"
    ];
    let alertIndex = 0;
    const popupEl = document.getElementById("fomo-popup");
    const msgEl = document.getElementById("fomo-message");

    setInterval(() => {
      if (!popupEl || !msgEl) return;
      popupEl.style.opacity = "0";
      popupEl.style.transform = "translateY(10px)";
      setTimeout(() => {
        alertIndex = (alertIndex + 1) % fomoAlerts.length;
        msgEl.textContent = fomoAlerts[alertIndex];
        popupEl.style.opacity = "1";
        popupEl.style.transform = "translateY(0)";
      }, 300);
    }, 4500);
  </script>
</body>
</html>`);
}
