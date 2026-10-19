/* =====================================================================
   layout.js: the SHARED parts of every page (written once, used everywhere)
     - falling-symbol background, skip link
     - the sidebar (photo, name, menu, profile icons)
     - the top bar (logo, clock, theme selector)
     - the footer
   Edit the three blocks marked "EDIT HERE" and every page updates.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------------- EDIT HERE (1): your name, photo and logo ---------------- */
  var SITE = {
    name: "Khandakar Rashedul Islam",
    title: "Environmental Science Researcher",
    photo: "assets/profile.jpg",
    logo: "assets/logo.png",
    home: "index.html"
  };

  /* ---------------- EDIT HERE (2): the sidebar menu ----------------
     page  = the same word used in <body data-page="..."> on that page
     href  = the file that opens
     To add a menu item, copy one line and change it (the icon is optional). */
  var MENU = [
    { page: "about",        href: "about.html",        label: "About",        icon: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>' },
    { page: "research",     href: "research.html",     label: "Research",     icon: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2h12.4a1.5 1.5 0 0 0 1.3-2L14 9V3"/><path d="M7 15h10"/>' },
    { page: "publications", href: "publications.html", label: "Publications", icon: '<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/>' },
    { page: "cv",           href: "cv.html",           label: "CV",           icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M6 16c.5-1.5 5.5-1.5 6 0M15 10h3M15 14h3"/>' },
    { page: "contact",      href: "contact.html",      label: "Contact",      icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>' }
  ];

  /* ---------------- EDIT HERE (3): your profile links ----------------
     key must stay the same (the Contact page buttons use it).
     To remove a profile, delete its whole line. */
  var PROFILES = [
    { key: "linkedin",     label: "LinkedIn",     href: "https://www.linkedin.com/in/khandakarrashedulislam/",                      icon: "assets/icons/linkedin.svg" },
    { key: "scholar",      label: "Google Scholar", href: "https://scholar.google.com/citations?user=u9Iv7xsAAAAJ&hl=en",           icon: "assets/icons/scholar.svg" },
    { key: "orcid",        label: "ORCID",        href: "https://orcid.org/0000-0001-8953-0224",                                    icon: "assets/icons/orcid.svg" },
    { key: "researchgate", label: "ResearchGate", href: "https://www.researchgate.net/profile/Khandakar-Rashedul-Islam-2?ev=hdr_xprf", icon: "assets/icons/researchgate.svg" }
  ];

  /* ===================== Nothing below needs editing ===================== */

  function esc(text) {
    return String(text)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  var currentPage = document.body.getAttribute("data-page") || "";

  var menuItems = MENU.map(function (item) {
    var active = item.page === currentPage;
    return '' +
      '<li><a' + (active ? ' class="is-active" aria-current="page"' : '') + ' href="' + esc(item.href) + '">' +
        '<span class="nav-icon"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true">' + item.icon + '</svg></span>' +
        esc(item.label) +
      '</a></li>';
  }).join("");

  var profileIcons = PROFILES.map(function (p) {
    return '' +
      '<a class="profile-icon" href="' + esc(p.href) + '" data-profile="' + esc(p.key) + '" title="' + esc(p.label) + '" aria-label="' + esc(p.label) + '">' +
        '<img src="' + esc(p.icon) + '" alt="" width="20" height="20">' +
      '</a>';
  }).join("");

  var sidebarHtml = '' +
    '<div class="bg-glyphs" id="bg-glyphs" aria-hidden="true"></div>' +
    '<a class="skip-link" href="#main">Skip to content</a>' +
    '<div class="sidebar-overlay" id="sidebar-overlay" hidden></div>' +
    '<aside class="sidebar" id="sidebar" aria-label="Site menu">' +
      '<button class="icon-btn sidebar-close" id="sidebar-close" type="button" aria-label="Close menu">✕</button>' +
      '<a class="side-brand" href="' + esc(SITE.home) + '">' +
        '<img class="side-avatar" src="' + esc(SITE.photo) + '" alt="">' +
        '<span class="side-brand-text">' +
          '<span class="side-name">' + esc(SITE.name) + '</span>' +
          '<span class="side-title">' + esc(SITE.title) + '</span>' +
        '</span>' +
      '</a>' +
      '<nav class="side-nav" aria-label="Main navigation"><ul>' + menuItems + '</ul></nav>' +
      '<div class="sidebar-links" aria-label="Academic profiles">' + profileIcons + '</div>' +
    '</aside>';

  var topbarHtml = '' +
    '<header class="topbar">' +
      '<div class="topbar-left">' +
        '<button class="icon-btn menu-btn" id="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="sidebar">' +
          '<span class="menu-bar"></span><span class="menu-bar"></span><span class="menu-bar"></span>' +
        '</button>' +
        '<a class="site-logo" href="' + esc(SITE.home) + '" aria-label="Home">' +
          '<img src="' + esc(SITE.logo) + '" alt="' + esc(SITE.name) + ' logo" width="36" height="36">' +
        '</a>' +
        '<div class="clock">' +
          '<span class="clock-time" id="clock-time">--:--</span>' +
          '<span class="clock-date" id="clock-date"></span>' +
        '</div>' +
      '</div>' +
      '<div class="topbar-right">' +
        '<label class="visually-hidden" for="theme-select">Colour theme</label>' +
        '<select class="theme-select" id="theme-select">' +
          '<option value="forest">🌲 Forest</option>' +
          '<option value="light">🌞 Light</option>' +
          '<option value="dark">🌙 Dark</option>' +
        '</select>' +
      '</div>' +
    '</header>';

  var footerHtml = '' +
    '<footer class="site-footer"><div class="container">' +
      '<p>© <span id="current-year">2026</span> ' + esc(SITE.name) + '. All rights reserved.</p>' +
    '</div></footer>';

  var page = document.getElementById("page");
  document.body.insertAdjacentHTML("afterbegin", sidebarHtml);
  if (page) {
    page.insertAdjacentHTML("afterbegin", topbarHtml);
    page.insertAdjacentHTML("beforeend", footerHtml);
  }
})();
