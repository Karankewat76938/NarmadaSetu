const assert = require('assert');
const http = require('http');
const app = require('../src/app');
const { connectDB, disconnectDB } = require('../src/config/db');
const User = require('../src/models/User');
const Service = require('../src/models/Service');
const Booking = require('../src/models/Booking');
const PartnerApplication = require('../src/models/PartnerApplication');
const { seedData } = require('../src/utils/seed');

let server;
let baseUrl;

const request = (method, path, body = null, headers = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const reqOptions = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

const runTests = async () => {
  console.log('\n--- Running NarmadaSetu Full-Stack API Test Suite ---\n');
  let passed = 0;
  let failed = 0;

  try {
    await connectDB();
    await seedData();

    server = http.createServer(app);
    await new Promise((resolve) => server.listen(0, resolve));
    const port = server.address().port;
    baseUrl = `http://localhost:${port}`;
    console.log(`Test server running on port ${port}\n`);

    // TEST 1: Health Check (PRD Section 36)
    try {
      const res = await request('GET', '/health');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.status, 'ok');
      console.log('✓ TEST 1 PASSED: Health check endpoint /health returns 200 ok');
      passed++;
    } catch (e) {
      console.error('✕ TEST 1 FAILED:', e.message);
      failed++;
    }

    // TEST 2: Tourist Login with seeded credentials
    let touristToken;
    try {
      const res = await request('POST', '/api/v1/auth/login', {
        email: 'tourist@narmadasetu.com',
        password: 'Tourist@123'
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(res.body.data.token);
      assert.strictEqual(res.body.data.user.role, 'tourist');
      touristToken = res.body.data.token;
      console.log('✓ TEST 2 PASSED: Tourist login returns valid JWT token and role');
      passed++;
    } catch (e) {
      console.error('✕ TEST 2 FAILED:', e.message);
      failed++;
    }

    // TEST 3: Security Rule - Public registration prevents admin creation (PRD Section 8.1)
    try {
      const res = await request('POST', '/api/v1/auth/register', {
        name: 'Hacker Attempt',
        email: 'hacker@test.com',
        password: 'Password@123',
        role: 'admin' // Attempt to register as admin
      });
      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.data.user.role, 'tourist', 'Role must be downgraded to tourist');
      console.log('✓ TEST 3 PASSED: Public registration rejects admin role creation');
      passed++;
    } catch (e) {
      console.error('✕ TEST 3 FAILED:', e.message);
      failed++;
    }

    // TEST 4: Service Discovery & Filters (PRD Section 9, 18)
    let sampleService;
    try {
      const res = await request('GET', '/api/v1/services?category=boat_ride');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(res.body.data.services.length > 0);
      sampleService = res.body.data.services[0];
      assert.strictEqual(sampleService.category, 'boat_ride');
      console.log('✓ TEST 4 PASSED: Service search & category filtering return verified boat services');
      passed++;
    } catch (e) {
      console.error('✕ TEST 4 FAILED:', e.message);
      failed++;
    }

    // TEST 5: Booking Creation & Server-side Price Verification (PRD Section 12)
    let newBooking;
    try {
      const res = await request(
        'POST',
        '/api/v1/bookings',
        {
          serviceId: sampleService._id,
          bookingDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          bookingTimeSlot: 'Morning (6:30 AM - 9:30 AM)',
          quantity: 2,
          notes: 'Test booking'
        },
        { Authorization: `Bearer ${touristToken}` }
      );
      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
      newBooking = res.body.data.booking;
      // Total amount must equal unitPrice * 2
      assert.strictEqual(newBooking.totalAmount, sampleService.price * 2);
      assert.strictEqual(newBooking.bookingStatus, 'pending');
      assert.strictEqual(newBooking.paymentStatus, 'pending');
      console.log('✓ TEST 5 PASSED: Booking creates with verified server-side price calculation');
      passed++;
    } catch (e) {
      console.error('✕ TEST 5 FAILED:', e.message);
      failed++;
    }

    // TEST 6: RBAC Protection - Tourist cannot access Admin endpoints (PRD Section 7)
    try {
      const res = await request(
        'GET',
        '/api/v1/admin/dashboard',
        null,
        { Authorization: `Bearer ${touristToken}` }
      );
      assert.strictEqual(res.status, 403);
      assert.strictEqual(res.body.success, false);
      assert.strictEqual(res.body.error.code, 'FORBIDDEN');
      console.log('✓ TEST 6 PASSED: RBAC properly forbids tourist from admin endpoints');
      passed++;
    } catch (e) {
      console.error('✕ TEST 6 FAILED:', e.message);
      failed++;
    }

    // TEST 7: Partner Login & Booking Status Update (PRD Section 11, 15)
    let partnerToken;
    try {
      const res = await request('POST', '/api/v1/auth/login', {
        email: 'partner.boat@narmadasetu.com',
        password: 'Partner@123'
      });
      assert.strictEqual(res.status, 200);
      partnerToken = res.body.data.token;

      // Partner accepts booking (pending -> confirmed)
      const updateRes = await request(
        'PATCH',
        `/api/v1/bookings/${newBooking._id}/status`,
        { status: 'confirmed' },
        { Authorization: `Bearer ${partnerToken}` }
      );
      assert.strictEqual(updateRes.status, 200);
      assert.strictEqual(updateRes.body.data.booking.bookingStatus, 'confirmed');

      // Partner marks booking completed (confirmed -> completed)
      const completeRes = await request(
        'PATCH',
        `/api/v1/bookings/${newBooking._id}/status`,
        { status: 'completed' },
        { Authorization: `Bearer ${partnerToken}` }
      );
      assert.strictEqual(completeRes.status, 200);
      assert.strictEqual(completeRes.body.data.booking.bookingStatus, 'completed');
      console.log('✓ TEST 7 PASSED: Partner accepts booking and marks it completed');
      passed++;
    } catch (e) {
      console.error('✕ TEST 7 FAILED:', e.message);
      failed++;
    }

    // TEST 8: Tourist Reviews Completed Booking (PRD Section 17)
    try {
      const res = await request(
        'POST',
        '/api/v1/reviews',
        {
          bookingId: newBooking._id,
          rating: 5,
          comment: 'Outstanding sunset boating through the marble rocks!'
        },
        { Authorization: `Bearer ${touristToken}` }
      );
      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.data.review.rating, 5);
      console.log('✓ TEST 8 PASSED: Verified review submitted for completed booking');
      passed++;
    } catch (e) {
      console.error('✕ TEST 8 FAILED:', e.message);
      failed++;
    }

    // TEST 9: Admin Dashboard Stats (PRD Section 16)
    try {
      const loginRes = await request('POST', '/api/v1/auth/login', {
        email: 'admin@narmadasetu.com',
        password: 'Admin@123'
      });
      const adminToken = loginRes.body.data.token;

      const statsRes = await request(
        'GET',
        '/api/v1/admin/dashboard',
        null,
        { Authorization: `Bearer ${adminToken}` }
      );
      assert.strictEqual(statsRes.status, 200);
      assert.ok(statsRes.body.data.totalServices > 0);
      assert.ok(statsRes.body.data.totalBookings > 0);
      console.log('✓ TEST 9 PASSED: Admin dashboard retrieves comprehensive platform metrics');
      passed++;
    } catch (e) {
      console.error('✕ TEST 9 FAILED:', e.message);
      failed++;
    }

  } catch (err) {
    console.error('Fatal test error:', err);
    failed++;
  } finally {
    if (server) {
      server.close();
    }
    await disconnectDB();

    console.log('\n=============================================');
    console.log(` Test Summary: ${passed} Passed, ${failed} Failed`);
    console.log('=============================================\n');

    process.exit(failed > 0 ? 1 : 0);
  }
};

runTests();

