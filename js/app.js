/**
 * Jannat Safar Kashmir - Main Application Script
 * Implements package filtering, currency conversion, itinerary modals,
 * custom trip calculator, FAQ accordions, and WhatsApp inquiry handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    currency: 'INR',
    activeCategory: 'all',
    searchFilters: {
      destination: 'all',
      style: 'all',
      duration: 'all',
      month: 'all'
    },
    calculator: {
      destinations: ['Srinagar', 'Gulmarg', 'Pahalgam'],
      nights: 5,
      hotelTier: 'premium', // comfort, premium, luxury
      adults: 2,
      children: 0,
      transport: 'innova', // sedan, innova, tempo
      addons: ['shikara', 'gondola'] // shikara, gondola, rafting, wazwan
    }
  };

  // DOM Elements
  const packagesContainer = document.getElementById('packages-container');
  const destinationsContainer = document.getElementById('destinations-container');
  const experiencesContainer = document.getElementById('experiences-container');
  const testimonialsContainer = document.getElementById('testimonials-container');
  const faqContainer = document.getElementById('faq-container');
  const currencySelects = document.querySelectorAll('.currency-select');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  const toastContainer = document.getElementById('toast-container');

  // Modal Elements
  const itineraryModal = document.getElementById('itinerary-modal');
  const modalCloseBtn = document.querySelector('.modal-close');
  const modalTitle = document.getElementById('modal-package-title');
  const modalTimeline = document.getElementById('modal-timeline');
  const modalBookBtn = document.getElementById('modal-book-now');

  // Calculator Elements
  const calcNights = document.getElementById('calc-nights');
  const calcAdults = document.getElementById('calc-adults');
  const calcChildren = document.getElementById('calc-children');
  const calcTransport = document.getElementById('calc-transport');
  const calcHotelRadios = document.querySelectorAll('input[name="calc-hotel"]');
  const calcDestChecks = document.querySelectorAll('input[name="calc-dest"]');
  const calcAddonChecks = document.querySelectorAll('input[name="calc-addon"]');
  const calcTotalPriceEl = document.getElementById('calc-total-price');
  const calcPerPersonEl = document.getElementById('calc-per-person');
  const calcSummaryDestEl = document.getElementById('calc-summary-dest');
  const calcSummaryDurationEl = document.getElementById('calc-summary-duration');
  const calcSummaryHotelEl = document.getElementById('calc-summary-hotel');
  const calcSummaryTransportEl = document.getElementById('calc-summary-transport');
  const calcWhatsappBtn = document.getElementById('calc-whatsapp-btn');

  // Booking Form
  const bookingForm = document.getElementById('booking-form');
  const packageSelect = document.getElementById('book-package');

  // Search Form in Hero
  const heroSearchForm = document.getElementById('hero-search-form');

  // =========================================================================
  // Helper Functions
  // =========================================================================

  function formatPrice(amountInINR) {
    const cur = TOUR_DATA.currencies[state.currency] || TOUR_DATA.currencies.INR;
    const converted = Math.round(amountInINR * cur.rate);
    return `${cur.symbol}${converted.toLocaleString()}`;
  }

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="font-size: 1.25rem;">${type === 'success' ? '✓' : 'ℹ'}</span>
      <div>${message}</div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // =========================================================================
  // Rendering Functions
  // =========================================================================

  function renderPackages() {
    if (!packagesContainer) return;

    let filtered = TOUR_DATA.packages;

    // Filter by Category Tab
    if (state.activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === state.activeCategory);
    }

    // Filter by Hero Search
    if (state.searchFilters.destination !== 'all') {
      filtered = filtered.filter(p => 
        p.destinations.some(d => d.toLowerCase().includes(state.searchFilters.destination.toLowerCase()))
      );
    }

    if (state.searchFilters.style !== 'all') {
      filtered = filtered.filter(p => p.category === state.searchFilters.style);
    }

    if (state.searchFilters.duration !== 'all') {
      const dur = parseInt(state.searchFilters.duration);
      if (dur === 4) filtered = filtered.filter(p => p.durationDays <= 4);
      else if (dur === 6) filtered = filtered.filter(p => p.durationDays >= 5 && p.durationDays <= 6);
      else if (dur === 7) filtered = filtered.filter(p => p.durationDays >= 7);
    }

    if (filtered.length === 0) {
      packagesContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <p style="font-size: 1.25rem; color: var(--color-text-muted); margin-bottom: 1rem;">
            No packages matched your exact criteria.
          </p>
          <button class="btn btn-outline" id="reset-filters-btn">Reset All Filters</button>
        </div>
      `;
      document.getElementById('reset-filters-btn')?.addEventListener('click', () => {
        state.activeCategory = 'all';
        state.searchFilters = { destination: 'all', style: 'all', duration: 'all', month: 'all' };
        filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === 'all'));
        renderPackages();
      });
      return;
    }

    packagesContainer.innerHTML = filtered.map(pkg => `
      <div class="package-card" data-id="${pkg.id}">
        <div class="package-image-wrap">
          <img src="${pkg.image}" alt="${pkg.title}" class="package-image" loading="lazy">
          <span class="package-badge">${pkg.badge}</span>
          <span class="package-duration">
            ⏱ ${pkg.durationDays}D / ${pkg.durationNights}N
          </span>
        </div>
        
        <div class="package-content">
          <div class="package-meta">
            <div class="package-rating">
              <span class="star">★</span>
              <span>${pkg.rating}</span>
              <span class="count">(${pkg.reviewsCount} reviews)</span>
            </div>
            <div class="package-destinations">
              📍 ${pkg.destinations.slice(0, 3).join(' • ')}
            </div>
          </div>

          <h3 class="package-title">${pkg.title}</h3>
          <p class="package-subtitle">${pkg.subtitle}</p>

          <div class="package-features">
            ${pkg.features.slice(0, 4).map(f => `
              <div class="package-feature-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${f}</span>
              </div>
            `).join('')}
          </div>

          <div class="package-footer">
            <div class="package-pricing">
              <span class="package-old-price">${formatPrice(pkg.originalPriceINR)}</span>
              <div class="package-price">
                ${formatPrice(pkg.priceINR)}
                <span class="label">/ person</span>
              </div>
            </div>
            
            <div class="package-actions">
              <button class="btn btn-outline btn-sm view-itinerary-btn" data-id="${pkg.id}">
                Itinerary
              </button>
              <button class="btn btn-primary btn-sm book-pkg-btn" data-id="${pkg.id}" data-title="${pkg.title}">
                Book
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach event listeners for card buttons
    document.querySelectorAll('.view-itinerary-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pkgId = e.currentTarget.dataset.id;
        openItineraryModal(pkgId);
      });
    });

    document.querySelectorAll('.book-pkg-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pkgTitle = e.currentTarget.dataset.title;
        scrollToBooking(pkgTitle);
      });
    });
  }

  function renderDestinations() {
    if (!destinationsContainer) return;

    destinationsContainer.innerHTML = TOUR_DATA.destinations.map(dest => `
      <div class="dest-card" data-id="${dest.id}">
        <img src="${dest.image}" alt="${dest.name}" class="dest-card-bg" loading="lazy">
        <div class="dest-card-overlay">
          <span class="dest-altitude-badge">🏔 ${dest.altitude}</span>
          <h3 class="dest-title">${dest.name}</h3>
          <p class="dest-tagline">${dest.tagline}</p>
          <p class="dest-desc">${dest.description}</p>
          <div class="dest-highlights">
            ${dest.highlights.map(h => `<span class="dest-chip">${h}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderExperiences() {
    if (!experiencesContainer) return;

    experiencesContainer.innerHTML = TOUR_DATA.experiences.map(exp => `
      <div class="exp-card">
        <div class="exp-img-wrap">
          <img src="${exp.image}" alt="${exp.title}" class="exp-img" loading="lazy">
          <div class="exp-icon-floating">${exp.icon}</div>
        </div>
        <div class="exp-content">
          <h3 class="exp-title">${exp.title}</h3>
          <p class="exp-desc">${exp.desc}</p>
        </div>
      </div>
    `).join('');
  }

  function renderTestimonials() {
    if (!testimonialsContainer) return;

    testimonialsContainer.innerHTML = TOUR_DATA.testimonials.map(t => `
      <div class="review-card">
        <div>
          <div class="review-stars">
            ${'★'.repeat(t.rating)}
          </div>
          <p class="review-text">"${t.text}"</p>
        </div>
        <div class="review-user">
          <img src="${t.avatar}" alt="${t.name}" class="review-avatar">
          <div>
            <div class="review-user-name">${t.name}</div>
            <div class="review-user-loc">${t.location} • ${t.badge}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderFAQs() {
    if (!faqContainer) return;

    faqContainer.innerHTML = TOUR_DATA.faqs.map((faq, idx) => `
      <div class="faq-item ${idx === 0 ? 'active' : ''}">
        <button class="faq-question">
          <span>${faq.q}</span>
          <span class="faq-icon">▾</span>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">${faq.a}</div>
        </div>
      </div>
    `).join('');

    // Accordion Toggle
    faqContainer.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        faqContainer.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }

  function populatePackageSelect() {
    if (!packageSelect) return;
    packageSelect.innerHTML = `
      <option value="Custom Tour Plan">Custom Tailor-made Itinerary</option>
      ${TOUR_DATA.packages.map(p => `
        <option value="${p.title}">${p.title} (${p.durationDays}D/${p.durationNights}N)</option>
      `).join('')}
    `;
  }

  // =========================================================================
  // Itinerary Modal Functions
  // =========================================================================

  let currentModalPkg = null;

  function openItineraryModal(pkgId) {
    const pkg = TOUR_DATA.packages.find(p => p.id === pkgId);
    if (!pkg) return;

    currentModalPkg = pkg;
    modalTitle.textContent = `${pkg.title} - Day-by-Day Itinerary`;
    
    modalTimeline.innerHTML = pkg.itinerary.map(item => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-day">DAY 0${item.day}</div>
        <h4 class="timeline-title">${item.title}</h4>
        <p class="timeline-desc">${item.description}</p>
        <div class="timeline-tags">
          <span class="timeline-tag">🏨 Stay: ${item.stay}</span>
          <span class="timeline-tag">🍽 Meals: ${item.meals}</span>
        </div>
      </div>
    `).join('');

    itineraryModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeItineraryModal() {
    itineraryModal.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeItineraryModal);
  }

  if (itineraryModal) {
    itineraryModal.addEventListener('click', (e) => {
      if (e.target === itineraryModal) closeItineraryModal();
    });
  }

  if (modalBookBtn) {
    modalBookBtn.addEventListener('click', () => {
      if (currentModalPkg) {
        closeItineraryModal();
        scrollToBooking(currentModalPkg.title);
      }
    });
  }

  function scrollToBooking(packageName = '') {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      if (packageName && packageSelect) {
        packageSelect.value = packageName;
      }
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // =========================================================================
  // Custom Trip Cost Calculator
  // =========================================================================

  function calculateCustomTrip() {
    // Read state from inputs
    const nights = parseInt(calcNights?.value || 5);
    const adults = parseInt(calcAdults?.value || 2);
    const children = parseInt(calcChildren?.value || 0);
    const transport = calcTransport?.value || 'innova';

    let hotelTier = 'premium';
    calcHotelRadios.forEach(r => {
      if (r.checked) hotelTier = r.value;
    });

    const selectedDestinations = [];
    calcDestChecks.forEach(c => {
      if (c.checked) selectedDestinations.push(c.value);
    });

    const selectedAddons = [];
    calcAddonChecks.forEach(c => {
      if (c.checked) selectedAddons.push(c.value);
    });

    // Pricing components per night
    const hotelNightlyRatePerRoom = {
      comfort: 3500,
      premium: 6000,
      luxury: 14000
    }[hotelTier];

    // Total rooms needed (2 adults per room, children with extra bed)
    const roomsCount = Math.ceil((adults + children * 0.5) / 2);
    const totalStayCost = hotelNightlyRatePerRoom * roomsCount * nights;

    // Transport Daily Rates
    const transportDailyRate = {
      sedan: 2800,
      innova: 4200,
      tempo: 6800
    }[transport];
    const totalTransportCost = transportDailyRate * (nights + 1);

    // Addons Per Person
    let addonsCost = 0;
    const totalPersons = adults + children;

    selectedAddons.forEach(addon => {
      if (addon === 'shikara') addonsCost += 800 * Math.ceil(totalPersons / 4);
      if (addon === 'gondola') addonsCost += 2200 * totalPersons;
      if (addon === 'rafting') addonsCost += 1200 * totalPersons;
      if (addon === 'wazwan') addonsCost += 1800 * totalPersons;
    });

    // Destination coverage allowance (inter-district tolls/charges)
    const destSurcharge = (selectedDestinations.length > 3 ? (selectedDestinations.length - 3) * 2000 : 0);

    // Total Estimated Cost
    const totalCostINR = totalStayCost + totalTransportCost + addonsCost + destSurcharge;
    const perPersonINR = totalPersons > 0 ? Math.round(totalCostINR / totalPersons) : totalCostINR;

    // Update UI elements
    if (calcTotalPriceEl) calcTotalPriceEl.textContent = formatPrice(totalCostINR);
    if (calcPerPersonEl) calcPerPersonEl.textContent = `(${formatPrice(perPersonINR)} per person)`;

    if (calcSummaryDestEl) {
      calcSummaryDestEl.textContent = selectedDestinations.length > 0 ? selectedDestinations.join(', ') : 'None selected';
    }
    if (calcSummaryDurationEl) {
      calcSummaryDurationEl.textContent = `${nights + 1} Days / ${nights} Nights`;
    }
    if (calcSummaryHotelEl) {
      const labels = { comfort: '3-Star Deluxe', premium: '4-Star Premium', luxury: '5-Star Heritage Luxury' };
      calcSummaryHotelEl.textContent = labels[hotelTier];
    }
    if (calcSummaryTransportEl) {
      const transLabels = { sedan: 'Private Sedan (Dzire/Etios)', innova: 'Toyota Innova Crysta', tempo: '12-Seater Luxury Tempo' };
      calcSummaryTransportEl.textContent = transLabels[transport];
    }

    // Prepare WhatsApp Message Link
    if (calcWhatsappBtn) {
      const msg = `Hello Jannat Safar Kashmir team! I planned a customized Kashmir tour on your website:
• Destinations: ${selectedDestinations.join(', ')}
• Duration: ${nights + 1} Days / ${nights} Nights
• Accommodation: ${hotelTier.toUpperCase()}
• Travelers: ${adults} Adults, ${children} Children
• Vehicle: ${transport.toUpperCase()}
• Addons: ${selectedAddons.join(', ') || 'None'}
• Estimated Quote: ${formatPrice(totalCostINR)} (${formatPrice(perPersonINR)}/person)

Please share an official detailed itinerary and availability for our dates!`;

      calcWhatsappBtn.href = `https://wa.me/917889491283?text=${encodeURIComponent(msg)}`;
    }
  }

  // Attach calculator listeners
  [calcNights, calcAdults, calcChildren, calcTransport].forEach(el => {
    el?.addEventListener('change', calculateCustomTrip);
  });
  calcHotelRadios.forEach(r => r.addEventListener('change', calculateCustomTrip));
  calcDestChecks.forEach(c => c.addEventListener('change', calculateCustomTrip));
  calcAddonChecks.forEach(c => c.addEventListener('change', calculateCustomTrip));

  // =========================================================================
  // Currency Switcher
  // =========================================================================

  currencySelects.forEach(select => {
    select.value = state.currency;
    select.addEventListener('change', (e) => {
      state.currency = e.target.value;
      currencySelects.forEach(s => s.value = state.currency);
      renderPackages();
      calculateCustomTrip();
      showToast(`Currency switched to ${state.currency} (${TOUR_DATA.currencies[state.currency].name})`, 'info');
    });
  });

  // =========================================================================
  // Category Filter Tabs
  // =========================================================================

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.dataset.category;
      renderPackages();
    });
  });

  // =========================================================================
  // Hero Search Form
  // =========================================================================

  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      state.searchFilters.destination = document.getElementById('search-dest')?.value || 'all';
      state.searchFilters.style = document.getElementById('search-style')?.value || 'all';
      state.searchFilters.duration = document.getElementById('search-duration')?.value || 'all';
      state.searchFilters.month = document.getElementById('search-month')?.value || 'all';

      state.activeCategory = 'all';
      filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === 'all'));

      renderPackages();

      const pkgSection = document.getElementById('packages');
      if (pkgSection) {
        pkgSection.scrollIntoView({ behavior: 'smooth' });
      }
      showToast('Tour packages filtered according to your preferences!', 'success');
    });
  }

  // =========================================================================
  // Booking Form Submission (Connected to Backend API)
  // =========================================================================

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('book-name').value.trim();
      const phone = document.getElementById('book-phone').value.trim();
      const email = document.getElementById('book-email').value.trim();
      const date = document.getElementById('book-date').value;
      const guests = document.getElementById('book-guests').value.trim();
      const pkg = packageSelect.value;
      const notes = document.getElementById('book-notes').value.trim();

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Processing Booking...</span>';

      let bookingRef = 'JSK-2026-' + Math.floor(1000 + Math.random() * 9000);
      let ownerNotifyUrl = null;

      // Attempt to save to backend API
      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            phone,
            email,
            package: pkg,
            travelDate: date,
            guests,
            notes
          })
        });

        if (response.ok) {
          const result = await response.json();
          if (result.booking && result.booking.id) {
            bookingRef = result.booking.id;
          }
          if (result.ownerNotifyUrl) {
            ownerNotifyUrl = result.ownerNotifyUrl;
          }
        }
      } catch (err) {
        console.warn('Backend API not reachable (running in static mode). Proceeding with client notification.', err);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }

      showToast(`Booking Received! Ref: ${bookingRef} (Status: ⏳ PENDING APPROVAL). Agency manager notified.`, 'info');

      // WhatsApp notification payload directed to agency owner (7889491283)
      const adminAlertText = `🚨 *NEW BOOKING ALERT - AWAITING YOUR APPROVAL*
• Booking ID: ${bookingRef}
• Customer Name: ${name}
• Customer Phone: ${phone}
• Email: ${email || 'N/A'}
• Package: ${pkg}
• Travel Date: ${date}
• Guests: ${guests || '2 Adults'}
• Notes: ${notes || 'None'}
• Status: ⏳ PENDING APPROVAL

Action Required: Please review and approve in your CRM portal.`;

      const finalNotifyUrl = ownerNotifyUrl || `https://wa.me/917889491283?text=${encodeURIComponent(adminAlertText)}`;

      // Immediate notification popup & WhatsApp dispatch
      setTimeout(() => {
        const notifyOwner = confirm(`📋 Booking Registered (Ref: ${bookingRef})\n\nStatus: ⏳ PENDING APPROVAL\n\nYour booking request is logged and awaiting official approval by our reservations team (+91 78894 91283).\n\nClick OK to forward this notification to our manager on WhatsApp now.`);
        if (notifyOwner) {
          window.open(finalNotifyUrl, '_blank');
        }
      }, 400);

      bookingForm.reset();
    });
  }

  // =========================================================================
  // Mobile Navigation Menu Toggle
  // =========================================================================

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // =========================================================================
  // Initial Boot
  // =========================================================================

  renderPackages();
  renderDestinations();
  renderExperiences();
  renderTestimonials();
  renderFAQs();
  populatePackageSelect();
  calculateCustomTrip();
});

