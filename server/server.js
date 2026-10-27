/**
 * Jannat Safar Kashmir - Enterprise Travel Booking & Management Server
 * Express.js REST API with Persistent JSON Database and Static File Serving.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper functions for persistent JSON storage
function readJSON(filename, defaultVal = []) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), 'utf-8');
      return defaultVal;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultVal;
  }
}

function writeJSON(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Serve frontend static assets from workspace root
app.use(express.static(ROOT_DIR));

// ============================================================================
// REST API ROUTES
// ============================================================================

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    app: 'Jannat Safar Kashmir Travel Portal API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 2. Packages list with optional filters
app.get('/api/packages', (req, res) => {
  try {
    // Extract packages from js/data.js or provide structured response
    const dataJsContent = fs.readFileSync(path.join(ROOT_DIR, 'js', 'data.js'), 'utf-8');
    // Simple extraction of TOUR_DATA.packages
    const match = dataJsContent.match(/packages:\s*(\[\s*\{[\s\S]*?\}\s*\])\s*,\s*destinations:/);
    let packages = [];
    if (match) {
      packages = eval(`(${match[1]})`);
    }

    const { category, destination, search, maxPrice } = req.query;

    let filtered = [...packages];

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    if (destination && destination !== 'all') {
      filtered = filtered.filter(p =>
        p.destinations.some(d => d.toLowerCase().includes(destination.toLowerCase()))
      );
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.destinations.some(d => d.toLowerCase().includes(q))
      );
    }
    if (maxPrice) {
      filtered = filtered.filter(p => p.priceINR <= Number(maxPrice));
    }

    res.json({
      success: true,
      total: filtered.length,
      packages: filtered
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not fetch packages', details: err.message });
  }
});

// 3. Single package details
app.get('/api/packages/:id', (req, res) => {
  try {
    const dataJsContent = fs.readFileSync(path.join(ROOT_DIR, 'js', 'data.js'), 'utf-8');
    const match = dataJsContent.match(/packages:\s*(\[\s*\{[\s\S]*?\}\s*\])\s*,\s*destinations:/);
    if (!match) return res.status(404).json({ success: false, error: 'Packages not found' });

    const packages = eval(`(${match[1]})`);
    const found = packages.find(p => p.id === req.params.id);

    if (!found) {
      return res.status(404).json({ success: false, error: 'Package not found' });
    }

    res.json({ success: true, package: found });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Get all bookings (CRM endpoint)
app.get('/api/bookings', (req, res) => {
  try {
    let bookings = readJSON('bookings.json', []);
    const { status, search } = req.query;

    if (status && status !== 'all') {
      bookings = bookings.filter(b => b.status.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      bookings = bookings.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.phone.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        (b.package && b.package.toLowerCase().includes(q)) ||
        b.id.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch bookings' });
  }
});

// 5. Create new booking / inquiry
app.post('/api/bookings', (req, res) => {
  try {
    const { name, phone, email, package: pkgName, travelDate, guests, notes, estimatedAmount } = req.body;

    if (!name || !phone || !travelDate) {
      return res.status(400).json({
        success: false,
        error: 'Name, Phone number, and Expected Travel Date are required.'
      });
    }

    const bookings = readJSON('bookings.json', []);

    // Generate unique ID like JSK-2026-4892
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: `JSK-2026-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      phone: phone.trim(),
      email: (email || '').trim(),
      package: pkgName || 'Custom Tour Plan',
      travelDate,
      guests: guests || '2 Adults',
      notes: notes || '',
      status: 'Pending',
      estimatedAmount: estimatedAmount ? Number(estimatedAmount) : 0,
      assignedAgent: 'Unassigned'
    };

    bookings.unshift(newBooking);
    writeJSON('bookings.json', bookings);

    console.log(`[NEW BOOKING] ${newBooking.id} created for ${newBooking.name} (${newBooking.phone})`);

    res.status(201).json({
      success: true,
      message: 'Booking request created successfully. Our Srinagar representative will connect shortly.',
      booking: newBooking
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to create booking', details: err.message });
  }
});

// 6. Update booking status / notes (CRM action)
app.patch('/api/bookings/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, assignedAgent, estimatedAmount } = req.body;

    const bookings = readJSON('bookings.json', []);
    const index = bookings.findIndex(b => b.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: `Booking ${id} not found.` });
    }

    if (status) bookings[index].status = status;
    if (notes !== undefined) bookings[index].notes = notes;
    if (assignedAgent) bookings[index].assignedAgent = assignedAgent;
    if (estimatedAmount !== undefined) bookings[index].estimatedAmount = Number(estimatedAmount);
    bookings[index].updatedAt = new Date().toISOString();

    writeJSON('bookings.json', bookings);

    res.json({
      success: true,
      message: `Booking ${id} updated successfully.`,
      booking: bookings[index]
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to update booking' });
  }
});

// 7. Delete booking (CRM action)
app.delete('/api/bookings/:id', (req, res) => {
  try {
    const { id } = req.params;
    let bookings = readJSON('bookings.json', []);
    const initialLen = bookings.length;

    bookings = bookings.filter(b => b.id !== id);

    if (bookings.length === initialLen) {
      return res.status(404).json({ success: false, error: `Booking ${id} not found.` });
    }

    writeJSON('bookings.json', bookings);
    res.json({ success: true, message: `Booking ${id} deleted.` });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to delete booking' });
  }
});

// 8. CRM Dashboard Analytics & Statistics
app.get('/api/stats', (req, res) => {
  try {
    const bookings = readJSON('bookings.json', []);

    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'Pending').length;
    const contacted = bookings.filter(b => b.status === 'Contacted').length;
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
    const cancelled = bookings.filter(b => b.status === 'Cancelled').length;

    const totalPipelineValue = bookings
      .filter(b => b.status !== 'Cancelled')
      .reduce((sum, b) => sum + (b.estimatedAmount || 0), 0);

    const confirmedRevenue = bookings
      .filter(b => b.status === 'Confirmed')
      .reduce((sum, b) => sum + (b.estimatedAmount || 0), 0);

    res.json({
      success: true,
      stats: {
        totalBookings: total,
        pendingBookings: pending,
        contactedBookings: contacted,
        confirmedBookings: confirmed,
        cancelledBookings: cancelled,
        totalPipelineValue,
        confirmedRevenue
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to calculate statistics' });
  }
});

// 9. Quotation Calculation Engine (Server-side)
app.post('/api/calculate', (req, res) => {
  try {
    const {
      nights = 5,
      adults = 2,
      children = 0,
      transport = 'innova',
      hotelTier = 'premium',
      addons = [],
      destinations = ['Srinagar', 'Gulmarg', 'Pahalgam']
    } = req.body;

    const hotelRates = { comfort: 3500, premium: 6000, luxury: 14000 };
    const transportRates = { sedan: 2800, innova: 4200, tempo: 6800 };

    const roomsCount = Math.ceil((Number(adults) + Number(children) * 0.5) / 2);
    const stayCost = (hotelRates[hotelTier] || 6000) * roomsCount * Number(nights);
    const transportCost = (transportRates[transport] || 4200) * (Number(nights) + 1);

    const totalPersons = Number(adults) + Number(children);
    let addonsCost = 0;

    addons.forEach(addon => {
      if (addon === 'shikara') addonsCost += 800 * Math.ceil(totalPersons / 4);
      if (addon === 'gondola') addonsCost += 2200 * totalPersons;
      if (addon === 'rafting') addonsCost += 1200 * totalPersons;
      if (addon === 'wazwan') addonsCost += 1800 * totalPersons;
    });

    const destSurcharge = destinations.length > 3 ? (destinations.length - 3) * 2000 : 0;
    const totalCostINR = stayCost + transportCost + addonsCost + destSurcharge;
    const perPersonINR = totalPersons > 0 ? Math.round(totalCostINR / totalPersons) : totalCostINR;

    res.json({
      success: true,
      calculation: {
        totalCostINR,
        perPersonINR,
        breakdown: {
          stayCost,
          transportCost,
          addonsCost,
          destSurcharge
        },
        params: {
          nights,
          roomsCount,
          adults,
          children,
          transport,
          hotelTier,
          destinationsCount: destinations.length
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Calculation error' });
  }
});

// 10. Reviews API
app.get('/api/reviews', (req, res) => {
  const reviews = readJSON('reviews.json', []);
  res.json({ success: true, count: reviews.length, reviews });
});

app.post('/api/reviews', (req, res) => {
  try {
    const { name, location, rating, text, badge } = req.body;
    if (!name || !text) {
      return res.status(400).json({ success: false, error: 'Name and review text are required.' });
    }

    const reviews = readJSON('reviews.json', []);
    const newRev = {
      id: `rev-${Date.now()}`,
      name,
      location: location || 'India',
      rating: Number(rating) || 5,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      badge: badge || 'Verified Traveler',
      text,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };

    reviews.unshift(newRev);
    writeJSON('reviews.json', reviews);

    res.status(201).json({ success: true, message: 'Review added successfully!', review: newRev });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to add review' });
  }
});

// 11. Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email required' });
    }

    const subscribers = readJSON('subscribers.json', []);
    if (!subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      subscribers.push({ email, subscribedAt: new Date().toISOString() });
      writeJSON('subscribers.json', subscribers);
    }

    res.json({ success: true, message: 'Subscribed to Kashmir seasonal travel deals!' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to subscribe' });
  }
});

// Route: Admin Dashboard page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'admin.html'));
});

// Fallback: Serve index.html
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(ROOT_DIR, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log('========================================================');
  console.log(` Jannat Safar Kashmir - Enterprise Server Running!`);
  console.log(` Customer Portal: http://localhost:${PORT}/`);
  console.log(` Admin CRM Desk:  http://localhost:${PORT}/admin`);
  console.log(` API Endpoint:    http://localhost:${PORT}/api/health`);
  console.log('========================================================');
});
