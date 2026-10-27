/**
 * Kashmir Wanderlust & Tour Travels - Data Store
 * Comprehensive travel packages, destinations, experiences, FAQs, and reviews.
 */

const TOUR_DATA = {
  currencies: {
    INR: { symbol: '\u20B9', rate: 1, name: 'Indian Rupee' },
    USD: { symbol: '$', rate: 0.012, name: 'US Dollar' },
    EUR: { symbol: '\u20AC', rate: 0.011, name: 'Euro' },
    AED: { symbol: 'AED ', rate: 0.044, name: 'UAE Dirham' },
    GBP: { symbol: '\u00A3', rate: 0.0095, name: 'British Pound' }
  },

  packages: [
    {
      id: 'kashmir-honeymoon-romance',
      title: 'Romantic Kashmir: Houseboat & Snowy Peaks',
      subtitle: 'The Ultimate Couples Honeymoon Experience',
      badge: 'Bestseller',
      category: 'honeymoon',
      durationDays: 6,
      durationNights: 5,
      priceINR: 24999,
      originalPriceINR: 32000,
      rating: 4.9,
      reviewsCount: 384,
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80',
      destinations: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Dal Lake'],
      features: [
        '1 Night Luxury Carved Cedar Houseboat Stay',
        '2 Nights Srinagar Deluxe Hotel + 2 Nights Pahalgam Valley Resort',
        'Sunset Shikara Ride on Dal Lake with Flower Decor',
        'Gulmarg Gondola Phase 1 & 2 Cable Car Assistance',
        'Private Chauffeur-driven Sedan/SUV for the entire trip',
        'Daily Candlelight Dinner & Special Honeymoon Cake',
        'Warm Kashmiri Saffron Kahwa Welcome Drink'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Srinagar & Dal Lake Sunset Shikara',
          description: 'Warm welcome at Srinagar Airport by our local Kashmiri representative. Private transfer to your handcrafted luxury houseboat on serene Dal Lake. Enjoy a traditional welcome with hot Saffron Kahwa. In the evening, embark on a dreamy 2-hour Shikara ride through floating gardens, lotus blooms, and Char Chinar island. Savor a romantic candlelit dinner aboard the houseboat.',
          stay: 'Super Deluxe Cedar Houseboat, Dal Lake',
          meals: 'Dinner included'
        },
        {
          day: 2,
          title: 'Srinagar to Gulmarg: Meadow of Flowers & Snow Gondola',
          description: 'After breakfast, drive through scenic mustard and apple orchards to Gulmarg (8,825 ft). Board the famous Gulmarg Gondola—one of the world\'s highest cable cars—up to Kongdoori (Phase 1) and Apharwat Peak (Phase 2 at 13,780 ft) where perpetual snow awaits. Enjoy snowball fights, sledging, and breathtaking Himalayan panoramic vistas. Evening return to Srinagar.',
          stay: 'Boutique Heritage Hotel, Srinagar',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 3,
          title: 'Srinagar Heritage & Mughal Gardens Trail',
          description: 'Explore the historical jewels of Srinagar: the terraced lawns of Nishat Bagh (Garden of Pleasure), Shalimar Bagh (Abode of Love built by Emperor Jahangir), and Chashme Shahi royal spring. Visit the ancient Shankaracharya Temple atop Gopadri Hill overlooking the entire Kashmir Valley. Afternoon stroll through the vibrant Lal Chowk old bazaar for authentic Pashmina and saffron.',
          stay: 'Boutique Heritage Hotel, Srinagar',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 4,
          title: 'Srinagar to Pahalgam: Valley of Shepherds via Saffron Fields',
          description: 'Drive along the emerald Lidder River towards Pahalgam (7,200 ft). En-route stop at the historic saffron fields of Pampore and the ancient 1,100-year-old Avantipur ruins. Check in to your pine-surrounded riverside resort. Spend the afternoon strolling along the whispering river banks and soaking in pine-scented mountain air.',
          stay: 'Riverside Pine Resort, Pahalgam',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 5,
          title: 'Pahalgam Excursion: Betaab Valley, Aru & Baisaran',
          description: 'Visit the picturesque Betaab Valley (famed from Bollywood classics) and Aru Valley with its lush meadows and crystal snow streams. Optional pony ride or hike to Baisaran, lovingly nicknamed "Mini Switzerland" for its pine meadows framed by snow-clad peaks. Relax by a romantic riverside bonfire in the evening.',
          stay: 'Riverside Pine Resort, Pahalgam',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 6,
          title: 'Farewell Kashmir: Souvenirs & Airport Transfer',
          description: 'Enjoy a leisurely breakfast surrounded by misty mountain views. Pack memories, authentic dry fruits, and souvenirs before your private transfer to Srinagar International Airport for your return flight with unforgettable memories of Jannat.',
          stay: 'Departure',
          meals: 'Breakfast included'
        }
      ]
    },

    {
      id: 'enchanting-family-kashmir',
      title: 'Grand Kashmir Family Delight: 5 Valleys Tour',
      subtitle: 'Complete Holiday covering Srinagar, Gulmarg, Pahalgam & Sonamarg',
      badge: 'Most Popular',
      category: 'family',
      durationDays: 7,
      durationNights: 6,
      priceINR: 28500,
      originalPriceINR: 36000,
      rating: 4.95,
      reviewsCount: 512,
      image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1000&q=80',
      destinations: ['Srinagar', 'Sonamarg', 'Gulmarg', 'Pahalgam', 'Doodhpathri'],
      features: [
        'Dedicated Innova Crysta / Luxury Coach with Courteous Driver',
        '2 Nights Srinagar + 2 Nights Pahalgam + 1 Night Gulmarg + 1 Night Houseboat',
        'Sonamarg Thajiwas Glacier Day Trip with Snow Experience',
        'Pahalgam Betaab & Chandanwari Valley Excursions Included',
        'All Tolls, Parking, Driver Allowances & Fuel Included',
        'Buffet Breakfast & Sumptuous Kashmiri / North Indian Dinners Daily',
        'Complimentary Shikara Ride for the whole family'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Srinagar - Welcome to Paradise',
          description: 'Airport pickup in private Innova Crysta. Check-in to luxury hotel in Srinagar. Afternoon visit to the famous Nishat and Shalimar Mughal Gardens. Sunset Shikara ride on Dal Lake visiting floating market and lotus gardens.',
          stay: 'Hotel Grand Boulevard, Srinagar',
          meals: 'Dinner'
        },
        {
          day: 2,
          title: 'Excursion to Sonamarg - The Meadow of Gold',
          description: 'Full day drive through Sindh Valley to Sonamarg (9,000 ft), the gateway to Ladakh. Marvel at snow-clad peaks, wild streams, and the majestic Thajiwas Glacier. Enjoy pony trekking or sledge sliding on the snow. Return to Srinagar for overnight stay.',
          stay: 'Hotel Grand Boulevard, Srinagar',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 3,
          title: 'Srinagar to Gulmarg: Gondola Cable Car Ride',
          description: 'Scenic drive to Gulmarg. Check into hotel surrounded by pine woods. Take the world-famous Gondola ride to Kongdoori and Apharwat Peak. Enjoy snow activities, visit the historic St. Mary’s Church and the world’s highest 18-hole golf course.',
          stay: 'Alpine Luxury Resort, Gulmarg',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 4,
          title: 'Gulmarg to Pahalgam via Saffron Fields & Apple Orchards',
          description: 'Descend through alpine roads towards Pahalgam. Stop at Pampore saffron farms and fresh apple orchards where you can pluck crisp Kashmiri apples in season. Arrive in Pahalgam and relax beside the melodious Lidder River.',
          stay: 'Pine View Resort, Pahalgam',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 5,
          title: 'Pahalgam Sightseeing: Betaab Valley, Chandanwari & Aru',
          description: 'Explore the scenic valleys of Pahalgam: Chandanwari (starting point of Amarnath Yatra), Betaab Valley with its crystal river and willow trees, and Aru Valley. Evening free for local handicraft shopping.',
          stay: 'Pine View Resort, Pahalgam',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 6,
          title: 'Pahalgam to Dal Lake Royal Houseboat Experience',
          description: 'Transfer back to Srinagar and check in to your carved walnut-wood Royal Houseboat on Dal Lake. Enjoy high tea on the sun deck, watch Shikaras paddle by, and savor an authentic 7-course Kashmiri Wazwan meal for dinner.',
          stay: 'Royal Heritage Houseboat, Dal Lake',
          meals: 'Breakfast & Wazwan Dinner'
        },
        {
          day: 7,
          title: 'Departure with Sweet Memories',
          description: 'Morning breakfast on the houseboat deck. Last-minute dry fruit and saffron shopping before dropping you off at Srinagar Airport with cherished memories.',
          stay: 'Departure',
          meals: 'Breakfast'
        }
      ]
    },

    {
      id: 'gulmarg-snow-ski-adventure',
      title: 'Gulmarg Snow Paradise & Ski Expedition',
      subtitle: 'Powder Snow, Gondola Apharwat & Winter Adventure',
      badge: 'Winter Special',
      category: 'winter',
      durationDays: 5,
      durationNights: 4,
      priceINR: 22999,
      originalPriceINR: 29000,
      rating: 4.92,
      reviewsCount: 247,
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80',
      destinations: ['Gulmarg', 'Srinagar', 'Apharwat Peak'],
      features: [
        '2 Nights Stay in Heated Gulmarg Alpine Resort',
        'Guaranteed Gondola Phase 1 & Phase 2 Ticket Assistance',
        'Introductory Skiing / Snowboarding Session with Certified Instructor',
        'Snowmobile Safari & ATV Snow Ride Option',
        '1 Night Cozy Dal Lake Heated Houseboat Experience',
        '4x4 Chain-fitted Vehicle for Safe Snow Driving in Gulmarg',
        'Unlimited Kashmiri Kahwa to Keep You Warm'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Srinagar Airport to Snowy Gulmarg',
          description: 'Arrive at Srinagar Airport, meet our snow guide, and transfer directly to Gulmarg in a 4x4 snow-chained vehicle. Check in to centrally heated mountain resort. Watch snowfall by the fireplace with hot Saffron Kahwa.',
          stay: 'Heated Ski Resort, Gulmarg',
          meals: 'Dinner'
        },
        {
          day: 2,
          title: 'Gulmarg Gondola Summit: Apharwat Peak (13,780 ft)',
          description: 'Early morning ride on the Gulmarg Gondola Phase 1 (Kongdoori) & Phase 2 (Apharwat Peak). Stand above the clouds with pristine white peaks stretching to Nanga Parbat in the distance. Enjoy snow biking, sledging, and breathtaking photography.',
          stay: 'Heated Ski Resort, Gulmarg',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 3,
          title: 'Ski Training & Snow Fun in Gulmarg',
          description: 'Learn the fundamentals of skiing from certified ski instructors on beginner slopes. Equipment (skis, boots, poles) provided. Afternoon ATV ride through snowbound pine forests and visit the historic frozen St. Mary’s Church.',
          stay: 'Heated Ski Resort, Gulmarg',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 4,
          title: 'Gulmarg to Srinagar: Frozen Dal Lake & Houseboat',
          description: 'Drive down to Srinagar. Check in to an insulated, heated deluxe houseboat on Dal Lake. Experience a winter Shikara ride through misty waters with traditional Kangri (clay firepot) to keep you cozy. Enjoy dinner on board.',
          stay: 'Deluxe Heated Houseboat, Dal Lake',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 5,
          title: 'Airport Transfer with Winter Souvenirs',
          description: 'Enjoy morning breakfast on Dal Lake. Shop for genuine Pashmina shawls, Kashmiri walnuts, and pure saffron before your airport drop.',
          stay: 'Departure',
          meals: 'Breakfast'
        }
      ]
    },

    {
      id: 'offbeat-gurez-doodhpathri-trail',
      title: 'Hidden Kashmir: Gurez Valley & Doodhpathri',
      subtitle: 'Untouched Meadows, Habba Khatoon Peak & River Camping',
      badge: 'Offbeat Gem',
      category: 'offbeat',
      durationDays: 8,
      durationNights: 7,
      priceINR: 32500,
      originalPriceINR: 42000,
      rating: 4.97,
      reviewsCount: 189,
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1000&q=80',
      destinations: ['Gurez Valley', 'Doodhpathri', 'Srinagar', 'Razdan Pass', 'Dawar'],
      features: [
        'Explore the World\'s Most Untouched Border Valley (Gurez)',
        'Drive through Razdan Pass at 11,672 ft with 360° Views',
        'Camp beside the Turquoise Kishanganga River',
        '2 Nights Gurez Valley + 1 Night Doodhpathri + 3 Nights Srinagar',
        'Visit the Legendary Habba Khatoon Pyramid Peak',
        'All Inner Line Permits and Forest Clearances Arranged',
        'Private 4x4 Scorpio / Innova with Veteran Local Mountain Chauffeur'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Srinagar - Old City Heritage Walk',
          description: 'Arrive in Srinagar. Visit Khanqah-e-Moula, Jamia Masjid with 378 deodar pillars, and savor Rogan Josh and Gushtaba in the old bazaar.',
          stay: 'Heritage Guest House, Srinagar',
          meals: 'Dinner'
        },
        {
          day: 2,
          title: 'Srinagar to Gurez Valley via Razdan Pass (11,672 ft)',
          description: 'An exhilarating mountain drive crossing Wular Lake and ascending the dramatic Razdan Pass. Witness the majestic Harmukh Peak. Descend into the enchanted Dawar town of Gurez Valley.',
          stay: 'Wooden Riverside Cottage / Camp, Dawar (Gurez)',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 3,
          title: 'Gurez Valley Exploration: Habba Khatoon & Kishanganga',
          description: 'Explore the iconic pyramidal Habba Khatoon peak and the pure spring named after the famous Kashmiri poetess-queen. Walk through traditional log-wood villages of Tulail and enjoy stargazing in pollution-free skies.',
          stay: 'Riverside Cottage / Camp, Gurez',
          meals: 'Breakfast, Lunch & Dinner'
        },
        {
          day: 4,
          title: 'Gurez to Srinagar via Manasbal Lake',
          description: 'Return drive through the emerald valleys with a stop at Manasbal Lake (deepest lake in Kashmir, known for water lilies). Evening check-in at Srinagar.',
          stay: 'Deluxe Hotel, Srinagar',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 5,
          title: 'Day Trip to Doodhpathri: The Valley of Milk',
          description: 'Drive to Doodhpathri, a virgin meadow where mountain streams froth like milk over green slopes. Walk along Shaliganga River, breathe pristine alpine air, and enjoy a picnic on the carpet of flowers.',
          stay: 'Deluxe Hotel, Srinagar',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 6,
          title: 'Srinagar to Pahalgam via Apple Belt',
          description: 'Drive to Pahalgam. Visit scenic Betaab Valley and Chandanwari. Campfire beside Lidder river in the evening.',
          stay: 'Pahalgam Valley Resort',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 7,
          title: 'Pahalgam to Dal Lake Luxury Houseboat',
          description: 'Return to Dal Lake for an evening of luxury on a carved houseboat. Sunset Shikara ride and farewell dinner.',
          stay: 'Heritage Houseboat, Dal Lake',
          meals: 'Breakfast & Wazwan Dinner'
        },
        {
          day: 8,
          title: 'Departure with Extraordinary Memories',
          description: 'Transfer to Srinagar Airport after breakfast with unforgettable tales from the hidden frontiers of Kashmir.',
          stay: 'Departure',
          meals: 'Breakfast'
        }
      ]
    },

    {
      id: 'kashmir-express-glimpse',
      title: 'Glimpse of Kashmir: Quick Weekend Getaway',
      subtitle: 'Srinagar, Gulmarg & Dal Lake in 4 Days',
      badge: 'Budget Friendly',
      category: 'budget',
      durationDays: 4,
      durationNights: 3,
      priceINR: 14999,
      originalPriceINR: 19500,
      rating: 4.88,
      reviewsCount: 310,
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1000&q=80',
      destinations: ['Srinagar', 'Gulmarg', 'Dal Lake'],
      features: [
        'Ideal for Short Breaks & Weekend Escapes',
        '1 Night Dal Lake Houseboat + 2 Nights Srinagar Deluxe Hotel',
        'Full Day Gulmarg Gondola Excursion with Cabs Included',
        'Mughal Gardens Tour: Nishat Bagh & Shalimar Bagh',
        'Complimentary 1-Hour Shikara Ride',
        'Airport Pick-up and Drop Included'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Srinagar & Dal Lake Shikara',
          description: 'Airport reception and transfer to Dal Lake houseboat. Enjoy a soothing Shikara ride across the waters, visit floating markets, and enjoy dinner aboard.',
          stay: 'Deluxe Houseboat, Dal Lake',
          meals: 'Dinner'
        },
        {
          day: 2,
          title: 'Gulmarg Gondola & Alpine Meadow Day Trip',
          description: 'Full day excursion to Gulmarg. Ride the Gondola to snow-covered peaks, indulge in pony rides or snow games, and return to Srinagar by evening.',
          stay: 'Boutique Hotel, Srinagar',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 3,
          title: 'Srinagar Mughal Gardens & Local Bazaars',
          description: 'Visit Nishat Bagh, Shalimar Bagh, Chashme Shahi, and Shankaracharya Temple. Shop for dry fruits, Pashmina, and wooden crafts in Lal Chowk.',
          stay: 'Boutique Hotel, Srinagar',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 4,
          title: 'Departure with Cherished Memories',
          description: 'Breakfast and private transfer to Srinagar Airport for your onward journey.',
          stay: 'Departure',
          meals: 'Breakfast'
        }
      ]
    },

    {
      id: 'royal-luxury-heritage-wazwan',
      title: 'Royal Kashmir: 5-Star Heritage & Wazwan Trail',
      subtitle: 'The Lalit / Khyber Luxury & Royal Cedar Houseboat',
      badge: 'Ultra Luxury',
      category: 'luxury',
      durationDays: 6,
      durationNights: 5,
      priceINR: 48000,
      originalPriceINR: 65000,
      rating: 5.0,
      reviewsCount: 142,
      image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1000&q=80',
      destinations: ['Srinagar', 'Gulmarg', 'Pahalgam', 'Nigeen Lake'],
      features: [
        '5-Star Luxury Accommodations (The Lalit Grand Palace / Khyber style)',
        'Royal Suite on Pristine Nigeen Lake Private Houseboat',
        'Dedicated Mercedes / Audi / Innova Crysta with Senior Chauffeur',
        'Authentic 36-Course Wazwan Feast with Master Craftsmen (Wazas)',
        'Private Luxury Shikara with Kashmiri Musicians & Kahwa Service',
        'VIP Express Gondola Phase 1 & 2 Passes Included',
        'Exclusive Pashmina & Hand-knotted Carpet Weaving Private Tour'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Royal Welcome at Srinagar & Nigeen Lake Houseboat',
          description: 'VIP airport greeting with traditional garlands and luxury transfer to exclusive Nigeen Lake royal suite houseboat. Private 3-hour sunset cruise with live Santoor and Rabab music, accompanied by saffron Kahwa and Kashmiri sweets.',
          stay: 'Royal Suite Cedar Houseboat, Nigeen Lake',
          meals: 'Royal Wazwan Dinner'
        },
        {
          day: 2,
          title: 'Srinagar Imperial Gardens & Private Artisan Studios',
          description: 'Private guided tour of Pari Mahal, Shalimar Bagh, and Nishat Bagh. Exclusive access to master artisans hand-weaving 100% Cashmere Pashmina shawls and silk carpets that take up to 2 years to weave.',
          stay: 'The Lalit Grand Palace / Heritage 5-Star, Srinagar',
          meals: 'Breakfast & Gourmet Dinner'
        },
        {
          day: 3,
          title: 'Luxury Gulmarg Retreat & Gondola Peak Experience',
          description: 'Chauffeured transfer to Gulmarg. Check into premier alpine resort. VIP pass boarding for Gondola Phase 1 & 2 reaching 14,000 ft without queuing. Mountain-view private dinner in heated glass pod.',
          stay: 'The Khyber Himalayan Resort & Spa / Luxury Suite, Gulmarg',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 4,
          title: 'Gulmarg to Pahalgam: Pine Forests & Lidder Riverbank',
          description: 'Drive along pine-scented mountain passes to Pahalgam. Check into luxury river cottage. Private riverside high-tea with fresh walnut cakes and Kashmiri pastries.',
          stay: 'Pine N Peak / River Cottage Luxury Suite, Pahalgam',
          meals: 'Breakfast & Dinner'
        },
        {
          day: 5,
          title: 'Pahalgam Valleys & Private Riverside Candlelight Dinner',
          description: 'Private tour to Betaab and Aru Valleys in luxury 4x4. Return to resort for an exclusive riverside private cabana dinner with bonfire and curated Kashmiri delicacies.',
          stay: 'Pine N Peak / River Cottage Luxury Suite, Pahalgam',
          meals: 'Breakfast & Chef’s Table Dinner'
        },
        {
          day: 6,
          title: 'Royal Farewell to Kashmir',
          description: 'Champagne breakfast by the river. Chauffeur transfer to Srinagar Airport with premium gift hampers of Grade-1 Saffron, Mamra Almonds, and Kashmiri Kahwa tea.',
          stay: 'Departure',
          meals: 'Breakfast'
        }
      ]
    }
  ],

  destinations: [
    {
      id: 'srinagar',
      name: 'Srinagar',
      tagline: 'The Venetian Crown of Kashmir',
      altitude: '5,200 ft',
      bestSeason: 'Year Round (Tulips: Mar-Apr)',
      idealDuration: '2 - 3 Days',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
      description: 'Capital of Jammu & Kashmir, Srinagar is famous for its serene Dal Lake, intricate wooden houseboats, historic Mughal gardens, and centuries-old wooden bridges crisscrossing the Jhelum River.',
      highlights: ['Dal & Nigeen Lake Shikara Rides', 'Terraced Mughal Gardens', 'Shankaracharya Temple', 'Old City Wood Carvings & Lal Chowk']
    },
    {
      id: 'gulmarg',
      name: 'Gulmarg',
      tagline: 'Meadow of Flowers & Asia\'s Ski Capital',
      altitude: '8,825 ft (Peak 13,780 ft)',
      bestSeason: 'Dec - Mar (Snow) | May - Sep (Green)',
      idealDuration: '1 - 2 Days',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      description: 'World renowned for the Gulmarg Gondola (one of the world\'s highest cable cars) and pristine powder snow slopes that attract skiers and honeymooners from across the globe.',
      highlights: ['Gondola Phase 1 & 2 to Apharwat', 'Snowmobiling & Skiing', 'Highest 18-hole Golf Course', 'Historic St. Mary\'s Church']
    },
    {
      id: 'pahalgam',
      name: 'Pahalgam',
      tagline: 'The Enchanting Valley of Shepherds',
      altitude: '7,200 ft',
      bestSeason: 'April to November',
      idealDuration: '2 - 3 Days',
      image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
      description: 'Cradled by the Lidder River and dense coniferous forests, Pahalgam is the trekking and romantic heart of Kashmir, serving as the base for Betaab Valley and the Amarnath Yatra.',
      highlights: ['Betaab Valley & Aru Valley', 'Baisaran "Mini Switzerland"', 'Lidder River Rafting', 'Trout Angling & Pine Trails']
    },
    {
      id: 'sonamarg',
      name: 'Sonamarg',
      tagline: 'The Golden Meadow & Glacier Gateway',
      altitude: '9,000 ft',
      bestSeason: 'May to October',
      idealDuration: '1 - 2 Days',
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80',
      description: 'Flanked by towering glaciers and the roaring Sindh river, Sonamarg is the dramatic gateway to Ladakh and home to the majestic Thajiwas Glacier, accessible via pony or trek.',
      highlights: ['Thajiwas Glacier Trek', 'Zero Point Snow Play', 'Sindh River Alpine Fishing', 'Gateway to Zoji La Pass']
    },
    {
      id: 'doodhpathri',
      name: 'Doodhpathri',
      tagline: 'The Untouched Valley of Milk',
      altitude: '8,957 ft',
      bestSeason: 'May to September',
      idealDuration: '1 Day Trip',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      description: 'An untouched alpine pasture where the Shaliganga River rushes with water so turbulent and white it appears like frothing milk. Free from commercial crowds.',
      highlights: ['Pristine Pine Meadows', 'Frothing Shaliganga Stream', 'Authentic Shepherd Gujjar Huts', 'Pure Wild Nature Walks']
    },
    {
      id: 'gurez',
      name: 'Gurez Valley',
      tagline: 'Kashmir\'s Hidden Himalayan Frontier',
      altitude: '8,000 ft',
      bestSeason: 'June to October',
      idealDuration: '2 - 3 Days',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80',
      description: 'Surrounded by towering peaks and the turquoise Kishanganga River, Gurez is steeped in Dardic culture, the legend of poetess Habba Khatoon, and total mountain serenity.',
      highlights: ['Habba Khatoon Pyramid Peak', 'Razdan Pass (11,672 ft)', 'Kishanganga River Camping', 'Dard-Shin Tribal Culture']
    }
  ],

  experiences: [
    {
      title: 'Romantic Dal Lake Shikara Cruise',
      icon: '🛶',
      image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80',
      desc: 'Glide gently on mirror-like waters past floating gardens, flower vendors, and Char Chinar island as the sun sets behind the Pir Panjal mountains.'
    },
    {
      title: 'Heritage Cedar Houseboat Stay',
      icon: '🏡',
      image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=600&q=80',
      desc: 'Step into colonial Kashmiri luxury with handcrafted walnut-wood paneling, Persian carpets, crystal chandeliers, and hot Kahwa on the sun deck.'
    },
    {
      title: 'Gulmarg Gondola to 14,000 ft',
      icon: '🚠',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80',
      desc: 'Ride the world’s second-highest operating cable car up to Apharwat Peak for breathtaking views of snow peaks stretching to the horizon.'
    },
    {
      title: 'Authentic Kashmiri Wazwan Feast',
      icon: '🍲',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
      desc: 'Relish a multi-course culinary masterpiece cooked over firewood by master Wazas: Rista, Rogan Josh, Tabak Maaz, Gushtaba, and Saffron Phirni.'
    },
    {
      title: 'Pahalgam Valley Horse Trekking',
      icon: '🐎',
      image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80',
      desc: 'Trek on gentle mountain ponies through dense deodar forests to reach Baisaran, the rolling green plateau nicknamed "Mini Switzerland".'
    },
    {
      title: 'Artisan Pashmina & Saffron Tour',
      icon: '🧣',
      image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=600&q=80',
      desc: 'Visit heritage artisan karkhanas to watch pure Cashmere shawls being hand-spun and pick authentic GI-tagged Pampore saffron.'
    }
  ],

  testimonials: [
    {
      name: 'Dr. Rohan & Sneha Verma',
      location: 'Mumbai, Maharashtra',
      rating: 5,
      date: 'Visited January 2026',
      badge: 'Honeymoon Couple',
      text: 'Our honeymoon in Kashmir was like stepping straight into a fairytale! Bhat Tanzil Kashmir took care of every single detail—from the heated houseboat on Dal Lake with rose petals to our Gondola tickets in Gulmarg. Our driver-guide Bashir was polite, knowledgeable, and made us feel so safe throughout!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Amitabh & Priya Sen & Family',
      location: 'Kolkata, West Bengal',
      rating: 5,
      date: 'Visited December 2025',
      badge: 'Family Tour',
      text: 'Traveling with elderly parents and two kids can be stressful, but the Bhat Tanzil Kashmir team organized a clean, comfortable Innova Crysta and wheelchair-friendly accommodations where needed. The kids had a blast playing in the snow at Gulmarg! Truly 5-star service.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Sarah & David Miller',
      location: 'London, United Kingdom',
      rating: 5,
      date: 'Visited September 2025',
      badge: 'International Guests',
      text: 'We were blown away by the hospitality in Kashmir. The Dal Lake houseboat was magnificent with intricate wood carvings, and Gurez Valley was the most pristine place we have ever visited on Earth. Honest pricing and outstanding coordination!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Vikram & Aarti Deshmukh',
      location: 'Pune, Maharashtra',
      rating: 5,
      date: 'Visited October 2025',
      badge: 'Autumn Chinar Tour',
      text: 'The golden Chinar leaves in October are magical! Our customized itinerary was executed without a single hitch. The Wazwan dinner recommendation in Srinagar was mouth-watering. Best travel agency for Kashmir, hands down!',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    }
  ],

  faqs: [
    {
      q: 'Is Kashmir safe for families and solo travelers?',
      a: 'Absolutely yes! Tourist areas including Srinagar, Gulmarg, Pahalgam, Sonamarg, and Doodhpathri are extraordinarily welcoming, safe, and peaceful. Kashmiris are famous for their unmatched warmth and hospitality (termed "Mehmaan Nawazi"). Our dedicated local team and private chauffeurs provide 24/7 ground assistance throughout your journey.'
    },
    {
      q: 'Do prepaid mobile SIM cards from other Indian states work in Kashmir?',
      a: 'Prepaid SIM cards from outside Jammu & Kashmir do NOT work due to government security regulations. Only Postpaid SIMs (Jio, Airtel, BSNL) work seamlessly. If you only have a prepaid connection, our driver will assist you in obtaining a local tourist SIM card at Srinagar airport upon arrival.'
    },
    {
      q: 'How and when should I book Gulmarg Gondola cable car tickets?',
      a: 'Gondola tickets for Phase 1 (Kongdoori) and Phase 2 (Apharwat Peak) frequently sell out weeks in advance due to high demand. When you book our tour packages, our Srinagar reservations desk assists and books your official Gondola slots in advance so you do not face disappointment or long queues.'
    },
    {
      q: 'What is the best season to visit Kashmir?',
      a: 'Kashmir is mesmerizing in all four distinct seasons:\n• Spring (Mar - May): Asia\'s largest Tulip Garden blooms, almond blossoms, pleasant weather.\n• Summer (Jun - Aug): Lush green alpine meadows, cool climate, fruit orchards in full swing.\n• Autumn (Sep - Nov): World-famous golden Chinar leaves, saffron harvest, crisp cool air.\n• Winter (Dec - Feb): Fairytale snowfall, frozen lakes, and world-class skiing in Gulmarg.'
    },
    {
      q: 'What clothes should I pack for my Kashmir trip?',
      a: '• Summer (May–Aug): Light cottons for day, light jacket/shawl for evening, comfortable walking shoes.\n• Autumn & Spring (Mar–Apr / Sep–Nov): Medium woolens, windproof jackets, thermals for higher altitudes.\n• Winter (Dec–Feb): Heavy woolens, thermal innerwear, down jacket, gloves, woolen caps, and waterproof snow boots (snow boots & jackets can also be rented in Tangmarg/Gulmarg).'
    },
    {
      q: 'How does local taxi union transportation work in Gulmarg and Pahalgam?',
      a: 'Per local taxi union regulations in J&K, Srinagar registered private cabs can drop guests at Gulmarg and Pahalgam hotels. For specific interior sightseeing spots like Betaab Valley / Chandanwari / Aru in Pahalgam, or Tangmarg to Gulmarg snow routes during heavy snow, local union 4x4 cabs or ponies operate. Our packages clearly list and can pre-bundle these excursions so you have zero hassle.'
    }
  ]
};
