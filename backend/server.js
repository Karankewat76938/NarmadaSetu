require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

/* ======================
   MIDDLEWARE
====================== */

// CORS configuration
app.use(cors({
  origin: '*', // change to frontend URL in production
  credentials: true
}));

app.use(express.json());

/* ======================
   HEALTH CHECK (Render)
====================== */
app.get('/health', (req, res) => {
  res.status(200).send('Server Healthy ✅');
});

/* ======================
   API ROUTES
====================== */
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/bookings', require('./routes/bookings'));

/* ======================
   PRODUCTION FRONTEND
====================== */
if (process.env.NODE_ENV === 'production') {

  const frontendPath = path.join(__dirname, '../frontend/dist');

  app.use(express.static(frontendPath));

  // React SPA fallback (IMPORTANT FIX)
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });

} else {

  app.get('/', (req, res) => {
    res.send('🚀 Narmada Setu API running in development mode');
  });

}

/* ======================
   GLOBAL ERROR HANDLER
====================== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error'
  });
});

/* ======================
   DATABASE + SERVER START
====================== */

const PORT = process.env.PORT || 5000;

global.dbConnected = false;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    global.dbConnected = true;
    console.log('✅ MongoDB Connected');
  } catch (error) {
    global.dbConnected = false;
    console.warn('⚠️ MongoDB Connection Failed. Running server in OFFLINE/MOCK mode!');
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} ${global.dbConnected ? '' : '(OFFLINE/MOCK MODE)'}`);
  });
};

startServer();