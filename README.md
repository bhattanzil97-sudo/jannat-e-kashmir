# Jannat Safar Kashmir | Tour & Travels Web Application & Booking Backend

A modern, full-stack travel booking portal and reservation CRM designed specifically for Jammu & Kashmir Tour & Travel operations. Built with a Node.js + Express.js backend, persistent JSON database, responsive alpine luxury UI, and complete lead management.

---

## 🌟 Live Access URLs

- **Customer Website**: [http://localhost:5000/](http://localhost:5000/)
- **Agency CRM & Reservations Desk**: [http://localhost:5000/admin](http://localhost:5000/admin)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- **GitHub Repository**: [https://github.com/bhattanzil97-sudo/jannat-e-kashmir](https://github.com/bhattanzil97-sudo/jannat-e-kashmir)

---

## 🚀 Key Features

### 1. Customer Portal
- **Alpine Kashmiri Aesthetic**: Pine emerald greens (`#0b3b32`), warm saffron gold (`#f59e0b`), Chinar leaf motifs, and frosted glass cards.
- **Dynamic Package Catalog**: Filter by category (Honeymoon, Family, Snow & Ski, Offbeat, Luxury, Budget), destination, duration, and season.
- **Day-by-Day Itinerary Modal**: Full timeline view with stays, meals, and activities.
- **Interactive Custom Tour Cost Calculator**: Real-time quotation wizard with WhatsApp dispatch.
- **Multi-Currency Live Switcher**: Converts INR (₹), USD ($), EUR (€), AED (د.إ), and GBP (£).
- **Direct Lead Capture**: Submits inquiries to `/api/bookings` with auto-generated reference IDs (`JSK-2026-XXXX`).

### 2. Agency Reservations & CRM Dashboard (`/admin`)
- **Live KPI Analytics**: Total inquiries, pending action count, confirmed tours, and estimated pipeline value.
- **Lead Management Table**:
  - Filter by status: `All`, `Pending`, `Contacted`, `Confirmed`, `Cancelled`.
  - Search by guest name, phone, email, or Booking ID.
  - Interactive status dropdown with instant backend update.
  - One-click **WhatsApp Customer** button (opens WhatsApp with a pre-filled personalized message).
  - One-click **Call Customer** button.
- **Record Walk-in / Phone Inquiries**: Modal form for staff at the Dal Lake office.
- **Export to CSV**: Download leads as a spreadsheet for accounting and records.

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server status and timestamp |
| `GET` | `/api/packages` | List packages (supports `?category=`, `?destination=`, `?search=`) |
| `GET` | `/api/packages/:id` | Get single package with day-by-day itinerary |
| `GET` | `/api/bookings` | List all bookings (supports `?status=` and `?search=`) |
| `POST` | `/api/bookings` | Submit new booking inquiry |
| `PATCH` | `/api/bookings/:id` | Update booking status, notes, or assigned agent |
| `DELETE` | `/api/bookings/:id` | Delete booking record |
| `GET` | `/api/stats` | Dashboard statistics & pipeline revenue |
| `POST` | `/api/calculate` | Server-side quotation calculator |
| `GET` | `/api/reviews` | List customer reviews |
| `POST` | `/api/reviews` | Submit new customer review |
| `POST` | `/api/newsletter` | Newsletter subscription |

---

## 📁 Project Architecture

```
tour and travels/
├── server/
│   └── server.js         # Express.js REST API & static server
├── data/
│   ├── bookings.json     # Persistent database for customer inquiries
│   ├── reviews.json      # Persistent customer reviews
│   └── subscribers.json  # Newsletter subscriptions
├── admin.html            # Agency CRM & Reservation Dashboard
├── index.html            # Main customer website
├── css/
│   ├── style.css         # Customer portal styling & animations
│   └── admin.css         # CRM dashboard styling
├── js/
│   ├── data.js           # Static package & destination data
│   ├── app.js            # Customer UI logic & API integration
│   └── admin.js          # CRM client logic, API calls, CSV export
├── package.json          # Node.js project manifest & dependencies
├── start-server.bat      # One-click launcher for Node.js server
├── push-to-github.bat    # Quick GitHub sync script
└── README.md             # Documentation
```

---

## 🛠️ How to Start the Server Anytime

Double-click [**`start-server.bat`**](file:///c:/Users/LENOVO/Desktop/tour%20and%20travels/start-server.bat) in your folder. It will start the server and open `http://localhost:5000/` automatically in your browser.
