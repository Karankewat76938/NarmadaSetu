const app = require('./app');
const { connectDB } = require('./config/db');
const env = require('./config/env');
const User = require('./models/User');
const { seedData } = require('./utils/seed');

const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed if empty database
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('[Server] Database is empty. Seeding initial NarmadaSetu records...');
      await seedData();
    }

    const server = app.listen(env.PORT, () => {
      console.log(`[NarmadaSetu API] Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
      console.log(`[NarmadaSetu API] Health check available at: http://localhost:${env.PORT}/health`);
      console.log(`[NarmadaSetu API] Base API route: http://localhost:${env.PORT}/api/v1`);
    });

    const shutdown = () => {
      console.log('Received shutdown signal, closing server gracefully...');
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
