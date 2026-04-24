/**
 * FreshBasket Market — data.js
 * Dynamic data layer — renders products, partners, FAQ, and coverage cities
 * from JS objects instead of hardcoded HTML.
 *
 * WHY THESE SECTIONS ONLY:
 * ─────────────────────────────────────────────────────────────────────
 * MADE DYNAMIC:   Products, Partners, FAQ, Coverage cities
 *   → These are content that changes frequently (stock, partners, FAQs).
 *     Dynamicizing them means a non-developer can update data.js alone
 *     without touching HTML structure.
 *
 * LEFT STATIC:    Hero, How It Works, Pricing, Categories, App section,
 *                 Footer, CTA, Trust Bar numbers
 *   → These are strategic marketing copy. Changing them requires design
 *     intent, not data updates. Making them dynamic adds complexity with
 *     zero business value and risks breaking carefully structured HTML
 *     that has specific CSS selectors depending on its shape.
 * ─────────────────────────────────────────────────────────────────────
 */

"use strict";


const PRODUCTS = [
  {
    id: "p1",
    name: "Fresh Broccoli",
    store: "Shoprite",
    price: "₦450",
    unit: "kg",
    emoji: "🥦",
    category: "fresh",
    badge: "Fresh",
    badgeClass: "",
  },
  {
    id: "p2",
    name: "Ripe Tomatoes",
    store: "Local Market",
    price: "₦300",
    unit: "basket",
    emoji: "🍅",
    category: "fresh",
    badge: "Fresh",
    badgeClass: "",
  },
  {
    id: "p3",
    name: "Chicken Breast",
    store: "FreshMart",
    price: "₦2,800",
    unit: "kg",
    emoji: "🥩",
    category: "dairy",
    badge: "Best Seller",
    badgeClass: "best-seller",
  },
  {
    id: "p4",
    name: "Peak Milk",
    store: "Shoprite",
    price: "₦850",
    unit: "tin",
    emoji: "🥛",
    category: "pantry",
    badge: null,
    badgeClass: "",
  },
  {
    id: "p5",
    name: "Ripe Plantain",
    store: "Local Market",
    price: "₦600",
    unit: "bunch",
    emoji: "🍌",
    category: "fresh",
    badge: "Sale",
    badgeClass: "sale",
  },
  {
    id: "p6",
    name: "Basmati Rice 5kg",
    store: "Shoprite",
    price: "₦4,500",
    unit: "bag",
    emoji: "🍚",
    category: "pantry",
    badge: null,
    badgeClass: "",
  },
  {
    id: "p7",
    name: "Frozen Fish Fillet",
    store: "FreshMart",
    price: "₦3,200",
    unit: "kg",
    emoji: "🧊",
    category: "frozen",
    badge: null,
    badgeClass: "",
  },
  {
    id: "p8",
    name: "Farm Fresh Eggs",
    store: "Local Farm",
    price: "₦1,200",
    unit: "crate",
    emoji: "🥚",
    category: "dairy",
    badge: "Best Seller",
    badgeClass: "best-seller",
  },
];

// ─── PARTNERS DATA ────────────────────────────────────────────────────────────

const PARTNERS = [
  { name: "Shoprite", icon: "fas fa-store" },
  { name: "FreshMart", icon: "fas fa-shopping-basket" },
  { name: "GreenFarm", icon: "fas fa-leaf" },
  { name: "SuperSave", icon: "fas fa-store-alt" },
  { name: "NaturalBite", icon: "fas fa-apple-alt" },
  { name: "FarmDirect", icon: "fas fa-carrot" },
  { name: "BakersHub", icon: "fas fa-bread-slice" },
  { name: "SeaFresh", icon: "fas fa-fish" },
];

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────

const FAQS = [
  {
    question: "What areas do you currently deliver to?",
    answer:
      "We currently deliver across Lagos, Abuja, Port Harcourt, and Ibadan. We're expanding rapidly — enter your location in the coverage checker above to confirm availability in your exact area.",
  },
  {
    question: "How does same-day delivery work?",
    answer:
      "Place your order before 4:00 PM and we'll have it at your door the same day. Our shoppers pick and pack your items from the nearest partner store and a dedicated rider delivers to your address.",
  },
  {
    question: "What happens if an item I ordered is out of stock?",
    answer:
      "We show real-time stock from partner stores, so you'll rarely order an unavailable item. If something runs out after your order is placed, your shopper will contact you with a substitution suggestion before proceeding.",
  },
  {
    question: "How do I track my delivery?",
    answer:
      "Once your order is picked up by a rider, you'll receive an SMS with a live tracking link. You can follow your rider on a map in real time right up to your door.",
  },
  {
    question: "Can I schedule a delivery for a specific time?",
    answer:
      "Yes. At checkout you can choose a preferred delivery window — morning (8 AM–12 PM), afternoon (12 PM–4 PM), or evening (4 PM–8 PM), subject to availability in your area.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major debit and credit cards, bank transfers, USSD payments, and mobile wallets. All transactions are secured with 256-bit encryption.",
  },
];


const COVERAGE_CITIES = [
  { name: "Lagos", comingSoon: false },
  { name: "Abuja", comingSoon: false },
  { name: "Port Harcourt", comingSoon: false },
  { name: "Ibadan", comingSoon: false },
  { name: "Kano", comingSoon: true },
  { name: "Enugu", comingSoon: true },
];

function renderProducts() {
  const grid = document.querySelector(".product-grid");
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(
    (p) => `
        <div class="product-card" data-category="${p.category}">
            ${p.badge ? `<div class="product-badge ${p.badgeClass}">${p.badge}</div>` : ""}
            <div class="product-img">${p.emoji}</div>
            <div class="product-info">
                <h4 class="product-name">${p.name}</h4>
                <p class="product-store">${p.store}</p>
                <div class="product-footer">
                    <span class="product-price">${p.price} <small>/ ${p.unit}</small></span>
                    <button class="add-to-cart" aria-label="Add ${p.name} to cart">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `,
  ).join("");
}

function renderPartners() {
  const track = document.getElementById("partnersTrack");
  if (!track) return;

  const logoHTML = PARTNERS.map(
    (p) => `
        <div class="partner-logo">
            <i class="${p.icon}"></i>
            <span>${p.name}</span>
        </div>
    `,
  ).join("");

  // Render twice — first set is real, second has aria-hidden for marquee loop
  track.innerHTML =
    logoHTML +
    PARTNERS.map(
      (p) => `
            <div class="partner-logo" aria-hidden="true">
                <i class="${p.icon}"></i>
                <span>${p.name}</span>
            </div>
        `,
    ).join("");
}

function renderFAQ() {
  const grid = document.querySelector(".faq-grid");
  if (!grid) return;

  grid.innerHTML = FAQS.map(
    (faq, i) => `
        <div class="faq-item">
            <button
                class="faq-question"
                aria-expanded="false"
                aria-controls="faq-answer-${i}"
            >
                <span>${faq.question}</span>
                <i class="fas fa-chevron-down faq-icon"></i>
            </button>
            <div class="faq-answer" id="faq-answer-${i}" role="region">
                <p>${faq.answer}</p>
            </div>
        </div>
    `,
  ).join("");
}

function renderCoverageCities() {
  const container = document.querySelector(".coverage-city-tags");
  if (!container) return;

  container.innerHTML = COVERAGE_CITIES.map((city) => {
    if (city.comingSoon) {
      return `<span class="city-tag coming-soon">${city.name} <small>Coming soon</small></span>`;
    }
    return `<span class="city-tag">${city.name}</span>`;
  }).join("");
}

function initDynamicContent() {
  renderProducts();
  renderPartners();
  renderFAQ();
  renderCoverageCities();
}

if (document.readyState !== "loading") {
  initDynamicContent();
} else {
  document.addEventListener("DOMContentLoaded", initDynamicContent);
}
