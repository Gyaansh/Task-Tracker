import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://task-tracker-opal-eta.vercel.app/',  // Vercel URL
  ],
}));
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Task Tracker API is running' });
});

// Global error handler (must be last)
app.use(errorHandler);

export default app;
