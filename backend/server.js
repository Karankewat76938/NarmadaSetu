require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/bookings', require('./routes/bookings'));

// Serve static assets in production (Monolith support)
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'));
  });
} else {
  // Welcome page for API in development
  app.get('/', (req, res) => {
    res.send('Narmada Setu API is running in development mode...');
  });
}

const PORT = process.env.PORT || 5000;

// Since we may not have a MongoDB instance running locally, let's gracefully handle connection errors
// and just start the server anyway so the frontend has an API to talk to (even if it errors on DB calls).
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error. Please ensure MongoDB is running.'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
