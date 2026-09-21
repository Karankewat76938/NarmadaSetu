const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('../config/db');
const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Review = require('../models/Review');
const PartnerApplication = require('../models/PartnerApplication');

const seedData = async () => {
  try {
    console.log('[Seeder] Connecting to database...');
    await connectDB();

    console.log('[Seeder] Clearing old records...');
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Booking.deleteMany({}),
      Review.deleteMany({}),
      PartnerApplication.deleteMany({})
    ]);

    console.log('[Seeder] Creating users across roles...');
    const adminPassword = await User.hashPassword('Admin@123');
    const partnerPassword = await User.hashPassword('Partner@123');
    const touristPassword = await User.hashPassword('Tourist@123');

    // 1. Admin
    const admin = await User.create({
      name: 'NarmadaSetu Platform Admin',
      email: 'admin@narmadasetu.com',
      phone: '+91 98260 11111',
      passwordHash: adminPassword,
      role: 'admin',
      accountStatus: 'active'
    });

    // 2. Partners
    const boatPartner = await User.create({
      name: 'Rameshwar Majhi (Boat Operator)',
      email: 'partner.boat@narmadasetu.com',
      phone: '+91 98260 22222',
      passwordHash: partnerPassword,
      role: 'partner',
      accountStatus: 'active'
    });

    const homestayPartner = await User.create({
      name: 'Sunita & Arvind Sharma (Riverside Homestay)',
      email: 'partner.homestay@narmadasetu.com',
      phone: '+91 98260 33333',
      passwordHash: partnerPassword,
      role: 'partner',
      accountStatus: 'active'
    });

    const guidePartner = await User.create({
      name: 'Pandit Devendra Shastri (Local Guide & Aarti)',
      email: 'partner.guide@narmadasetu.com',
      phone: '+91 98260 44444',
      passwordHash: partnerPassword,
      role: 'partner',
      accountStatus: 'active'
    });

    // 3. Tourists
    const tourist = await User.create({
      name: 'Aarav Patel',
      email: 'tourist@narmadasetu.com',
      phone: '+91 98260 55555',
      passwordHash: touristPassword,
      role: 'tourist',
      accountStatus: 'active'
    });

    console.log('[Seeder] Creating approved partner applications...');
    await PartnerApplication.create([
      {
        user: boatPartner._id,
        serviceCategory: 'boat_ride',
        businessName: 'Narmada Marble Rocks Boating Association',
        experienceYears: 18,
        contactDetails: {
          phone: '+91 98260 22222',
          address: 'Panchvati Ghat, Bhedaghat',
          ghatOrCity: 'Bhedaghat, Jabalpur'
        },
        documents: {
          idProofType: 'Aadhaar Card',
          idProofNumber: 'XXXX-XXXX-4589',
          licenseNumber: 'MP-TOUR-BOAT-8941'
        },
        applicationStatus: 'approved',
        reviewedBy: admin._id,
        reviewedAt: new Date()
      },
      {
        user: homestayPartner._id,
        serviceCategory: 'homestay',
        businessName: 'Ahilya Narmada Retreat & Homestay',
        experienceYears: 7,
        contactDetails: {
          phone: '+91 98260 33333',
          address: 'Near Ahilya Ghat, Fort Road',
          ghatOrCity: 'Maheshwar'
        },
        documents: {
          idProofType: 'Aadhaar Card',
          idProofNumber: 'XXXX-XXXX-9123',
          licenseNumber: 'MP-HOMESTAY-2041'
        },
        applicationStatus: 'approved',
        reviewedBy: admin._id,
        reviewedAt: new Date()
      },
      {
        user: guidePartner._id,
        serviceCategory: 'local_guide',
        businessName: 'Narmada Heritage & Cultural Walks',
        experienceYears: 12,
        contactDetails: {
          phone: '+91 98260 44444',
          address: 'Gwarighat Main Temple Chowk',
          ghatOrCity: 'Jabalpur'
        },
        documents: {
          idProofType: 'Tourism Guide License',
          idProofNumber: 'MP-GUIDE-3301',
          licenseNumber: 'MP-GUIDE-3301'
        },
        applicationStatus: 'approved',
        reviewedBy: admin._id,
        reviewedAt: new Date()
      }
    ]);

    console.log('[Seeder] Creating comprehensive Narmada tourism services...');
    const services = await Service.create([
      {
        provider: boatPartner._id,
        category: 'boat_ride',
        title: 'Bhedaghat Marble Rocks Sunset Boating',
        description: 'Experience the world-renowned gorge of white and colored marble rocks on the holy Narmada River. Scenic 45-minute ride with local songs and folklore narrated by experienced boatmen.',
        price: 350,
        pricingUnit: 'per_person',
        location: {
          name: 'Panchvati Ghat Marble Rocks',
          ghat: 'Panchvati Ghat',
          city: 'Jabalpur',
          coordinates: { lat: 23.1311, lng: 79.8009 }
        },
        images: [
          'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
        ],
        availability: {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          timeSlots: ['Morning (6:30 AM - 9:30 AM)', 'Afternoon (1:00 PM - 4:00 PM)', 'Sunset Ride (4:30 PM - 6:30 PM)'],
          isAvailable: true
        },
        categoryDetails: {
          boatName: 'Narmada Tarangini 04',
          boatType: 'Motor Boat',
          capacity: 8,
          durationMinutes: 45,
          safetyEquipment: ['ISO Certified Life Jackets', 'Life Buoy', 'First Aid Kit', 'Certified Swimmer Pilot'],
          boardingPoint: 'Panchvati Boat Jetty, Bhedaghat'
        },
        status: 'active',
        verificationStatus: 'approved',
        rating: 4.9,
        reviewCount: 24
      },
      {
        provider: boatPartner._id,
        category: 'boat_ride',
        title: 'Omkareshwar Island Parikrama Boat Tour',
        description: 'Sacred circumnavigation of the Mandhata island (Omkareshwar) covering the Sangam of Narmada and Kaveri rivers. Calm waters and magnificent views of the ancient temples.',
        price: 500,
        pricingUnit: 'per_person',
        location: {
          name: 'Narmada-Kaveri Sangam Ghat',
          ghat: 'Narmada Ghat',
          city: 'Omkareshwar',
          coordinates: { lat: 22.2425, lng: 76.1504 }
        },
        images: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
        ],
        availability: {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          timeSlots: ['Morning (7:00 AM - 11:00 AM)', 'Evening (3:30 PM - 6:00 PM)'],
          isAvailable: true
        },
        categoryDetails: {
          boatName: 'Omkar Jyoti',
          boatType: 'Traditional Wooden Boat',
          capacity: 6,
          durationMinutes: 60,
          safetyEquipment: ['Life Jackets', 'Emergency Whistle', 'Lifeguard'],
          boardingPoint: 'Kaveri Sangam Ghat'
        },
        status: 'active',
        verificationStatus: 'approved',
        rating: 4.8,
        reviewCount: 16
      },
      {
        provider: homestayPartner._id,
        category: 'homestay',
        title: 'Maheshwar Riverside Heritage Homestay',
        description: 'Traditional Malwi stone bungalow situated right above Ahilya Ghat. Panoramic views of morning rituals, cool river breeze, organic vegetarian food, and woven Maheshwari textile workshops.',
        price: 2400,
        pricingUnit: 'per_night',
        location: {
          name: 'Ahilya Ghat Heritage Lane',
          ghat: 'Ahilya Ghat',
          city: 'Maheshwar',
          coordinates: { lat: 22.1764, lng: 75.5866 }
        },
        images: [
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
        ],
        availability: {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          timeSlots: ['Check-in: 12:00 PM - Check-out: 11:00 AM'],
          isAvailable: true
        },
        categoryDetails: {
          propertyName: 'Ahilya Kuti Heritage Stay',
          roomType: 'Deluxe Riverside Balcony Room',
          guestCapacity: 4,
          amenities: ['Riverfront Terrace', 'High-Speed Wi-Fi', 'Hot Geyser', 'Complimentary Pure Veg Breakfast'],
          checkInTime: '12:00 PM',
          checkOutTime: '11:00 AM',
          houseRules: 'Vegetarian only, quiet hours after 10 PM'
        },
        status: 'active',
        verificationStatus: 'approved',
        rating: 4.95,
        reviewCount: 31
      },
      {
        provider: homestayPartner._id,
        category: 'food',
        title: 'Authentic Malwi Dal Bafla & Nimar Thali',
        description: 'Pure desi ghee Dal Bafla, Churma Laddu, Kadhi, Chana Masala, Nimari green chili thecha, and seasonal sweet served in eco-friendly leaf platters by local home chefs.',
        price: 350,
        pricingUnit: 'per_meal',
        location: {
          name: 'Narmada Rasoi Bhawan',
          ghat: 'Ahilya Ghat',
          city: 'Maheshwar',
          coordinates: { lat: 22.177, lng: 75.587 }
        },
        images: [
          'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80'
        ],
        availability: {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          timeSlots: ['Lunch (12:30 PM - 3:30 PM)', 'Dinner (7:30 PM - 10:00 PM)'],
          isAvailable: true
        },
        categoryDetails: {
          foodType: 'Pure Vegetarian Malwi Traditional Meal',
          isPureVeg: true,
          menuItems: ['Dal Bafla with Desi Ghee', 'Churma Laddu', 'Nimari Thecha', 'Kadhi', 'Pulao'],
          servingCapacity: 30
        },
        status: 'active',
        verificationStatus: 'approved',
        rating: 4.85,
        reviewCount: 42
      },
      {
        provider: guidePartner._id,
        category: 'narmada_aarti',
        title: 'Gwarighat Maha Aarti VIP Seating & Diya Offering',
        description: 'Reserved peaceful seating at Gwarighat during the sunset Maha Aarti. Includes brass lamp ceremonial offering, fresh flower garland, Vedic priest blessings, and sacred Narmada prasad.',
        price: 250,
        pricingUnit: 'per_person',
        location: {
          name: 'Gwarighat Main Steps',
          ghat: 'Gwarighat',
          city: 'Jabalpur',
          coordinates: { lat: 23.125, lng: 79.945 }
        },
        images: [
          'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
        ],
        availability: {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          timeSlots: ['Evening Aarti (6:45 PM - 8:00 PM)'],
          isAvailable: true
        },
        categoryDetails: {
          ghatLocation: 'Gwarighat Platform 1',
          aartiTiming: '7:00 PM - 7:45 PM',
          includesSpecialSeating: true,
          includesPrasad: true
        },
        status: 'active',
        verificationStatus: 'approved',
        rating: 5.0,
        reviewCount: 50
      },
      {
        provider: guidePartner._id,
        category: 'local_guide',
        title: 'Bhedaghat Marble Geological & Chausath Yogini Temple Guide',
        description: 'Explore the 10th-century Kalachuri Chausath Yogini Temple and the geological formation of Narmada marble canyon with an officially accredited heritage historian.',
        price: 800,
        pricingUnit: 'per_group',
        location: {
          name: 'Chausath Yogini Temple complex',
          ghat: 'Bhedaghat Ghat',
          city: 'Jabalpur',
          coordinates: { lat: 23.1315, lng: 79.803 }
        },
        images: [
          'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
        ],
        availability: {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          timeSlots: ['Morning Tour (8:00 AM - 11:00 AM)', 'Afternoon Tour (3:00 PM - 6:00 PM)'],
          isAvailable: true
        },
        categoryDetails: {
          languages: ['Hindi', 'English', 'Sanskrit'],
          specializations: ['Ancient Temples', 'Marble Canyon Geology', 'River Narmada Legends'],
          tourDuration: '3 Hours'
        },
        status: 'active',
        verificationStatus: 'approved',
        rating: 4.9,
        reviewCount: 19
      }
    ]);

    console.log('[Seeder] Creating sample bookings and reviews...');
    const pastBooking = await Booking.create({
      tourist: tourist._id,
      service: services[0]._id, // Bhedaghat sunset boating
      provider: boatPartner._id,
      bookingDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      bookingTimeSlot: 'Sunset Ride (4:30 PM - 6:30 PM)',
      quantity: 2,
      unitPrice: 350,
      totalAmount: 700,
      bookingStatus: 'completed',
      paymentStatus: 'paid',
      notes: 'Need life jackets for 2 adults'
    });

    await Review.create({
      tourist: tourist._id,
      service: services[0]._id,
      booking: pastBooking._id,
      rating: 5,
      comment: 'Mesmerizing sunset experience on Narmada! Rameshwar ji is a master storyteller and sang traditional boat songs between the marble cliffs. Safe and prompt.'
    });

    // Upcoming booking
    await Booking.create({
      tourist: tourist._id,
      service: services[2]._id, // Maheshwar Homestay
      provider: homestayPartner._id,
      bookingDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days in future
      bookingTimeSlot: 'Check-in: 12:00 PM',
      quantity: 2,
      unitPrice: 2400,
      totalAmount: 2400,
      bookingStatus: 'confirmed',
      paymentStatus: 'pending',
      notes: 'Late arrival expected around 4 PM'
    });

    console.log('\n=============================================');
    console.log(' [Seeder] Database successfully seeded!');
    console.log('=============================================');
    console.log(' Test Credentials:');
    console.log('   Admin:   admin@narmadasetu.com   / Admin@123');
    console.log('   Partner: partner.boat@narmadasetu.com / Partner@123');
    console.log('   Tourist: tourist@narmadasetu.com / Tourist@123');
    console.log('=============================================\n');

    return true;
  } catch (err) {
    console.error('[Seeder] Error seeding database:', err);
    throw err;
  }
};

if (require.main === module) {
  seedData()
    .then(async () => {
      await disconnectDB();
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { seedData };
