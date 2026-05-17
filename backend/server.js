require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/bookings', require('./routes/bookings'));

// Production Setup
if (process.env.NODE_ENV === 'production') {

  app.use(express.static(
    path.join(__dirname, '../frontend/dist')
  ));

  // SPA fallback
  app.use((req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../frontend/dist/index.html')
    );
  });

} else {

  app.get('/', (req, res) => {
    res.send('Narmada Setu API running...');
  });

}

const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(() => console.log('MongoDB connection error'));

app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);