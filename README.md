# Jannat Safar Kashmir | Tour & Travels Website

A modern, responsive, and luxury travel portal designed specifically for Kashmir Tour & Travel operations. Built with clean HTML5, CSS3, and modern Vanilla JavaScript with zero external build dependencies.

---

## 🌟 Key Features

1. **Brand Identity & Kashmiri Alpine Aesthetic**:
   - Regal typography (`Playfair Display` serif headers + `Plus Jakarta Sans` clean body).
   - Kashmiri Chinar motifs, emerald pine greens, warm saffron gold accents, and frosted glass cards.
   - Fully responsive on mobile, tablet, laptop, and 4K displays.

2. **Interactive Tour Search & Filtering**:
   - Filter by destination (Srinagar, Gulmarg, Pahalgam, Sonamarg, Gurez, Doodhpathri).
   - Filter by tour style (Honeymoon Specials, Family Delights, Winter Snow & Ski, Offbeat Valleys, 5-Star Ultra Luxury, Budget Explorer).
   - Filter by duration (Short break 3-4 days, Classic 5-6 days, Grand 7+ days) and travel season.

3. **Handcrafted Kashmir Packages with Day-by-Day Modal**:
   - High-resolution imagery, duration tags, hotel ratings, and detailed inclusions.
   - **Interactive Modal**: Click "Itinerary" on any package to view a complete day-by-day timeline covering morning/afternoon schedules, hotel stays, and meal plans.
   - "Book Now" auto-populates the booking form.

4. **Multi-Currency Live Switcher**:
   - Supports **INR (₹)**, **USD ($)**, **EUR (€)**, **AED (د.إ)**, and **GBP (£)**.
   - Instantly converts all package prices, original prices, and custom calculator figures on the fly.

5. **Interactive Custom Trip Cost Calculator ("Build Your Kashmir Trip")**:
   - Step-by-step interactive planner:
     - Multi-select valleys to visit (Srinagar, Gulmarg, Pahalgam, Sonamarg, Doodhpathri, Gurez).
     - Select duration (3 to 10 nights).
     - Select travelers (Adults & Children).
     - Select vehicle (Sedan, Toyota Innova Crysta, Luxury Tempo Traveller).
     - Select stay category (3-Star Deluxe, 4-Star Premium, 5-Star Heritage Luxury).
     - Select optional add-ons (Sunset Shikara cruise, Gulmarg Gondola Phase 1 & 2 tickets, Lidder river rafting, Royal Wazwan 7-course feast).
   - Calculates total price and per-person cost in real time.
   - One-click **"Get Detailed Quote on WhatsApp"** button which auto-formats the exact customized breakdown into WhatsApp!

6. **Destination Explorer & Signature Experiences**:
   - Visual cards with altitude tags, best travel season, and top attractions for Srinagar, Gulmarg, Pahalgam, Sonamarg, Doodhpathri, and Gurez.
   - Highlight cards for Shikara cruises, cedar wood houseboats, Gondola rides, Wazwan feast, and Pashmina weaving masterclasses.

7. **Four Seasons in Kashmir Guide**:
   - Temperature, highlights, and travel tips for Spring (Tulip Festival), Summer (Lush Green Meadows), Autumn (Golden Chinar Leaves), and Winter (Snow & Skiing).

8. **Kashmir Travel Advisory & FAQs (Accordion)**:
   - Crucial advice on prepaid vs postpaid SIM cards in J&K, Gondola ticket advance booking, tourist safety, local taxi union policies, and seasonal clothing packing tips.

9. **Direct Booking & WhatsApp Integration**:
   - Inquiry form with validation, date picker, special request notes, and toast notifications.
   - Floating WhatsApp button and 24/7 call helpline for instant guest conversions.

---

## 📁 Project Structure

```
tour and travels/
├── index.html            # Main website entry point
├── css/
│   └── style.css         # Complete styling, animations, media queries
├── js/
│   ├── data.js           # Central data store (packages, destinations, FAQs, currencies)
│   └── app.js            # UI logic, filters, modal, calculator & WhatsApp handling
├── images/               # Directory for local image assets
└── README.md             # Documentation and guide
```

---

## 🚀 How to Run the Website

### Option 1: Direct Double Click
Simply double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option 2: Local Web Server
If you have any web server installed:
- **VS Code**: Right-click `index.html` and click **"Open with Live Server"**.
- **Python**: `python -m http.server 8000` and visit `http://localhost:8000`.
- **Node**: `npx serve` and open the displayed URL.

---

## ⚙️ How to Customize

- **Change WhatsApp Number or Phone**:
  Search for `9419078241` in `index.html` and `js/app.js` and replace with your phone number.
- **Add or Edit Packages**:
  Open `js/data.js` and edit the `TOUR_DATA.packages` array. You can adjust prices, day-by-day itineraries, inclusions, and photos.
- **Update Exchange Rates**:
  Open `js/data.js` and update `TOUR_DATA.currencies`.

