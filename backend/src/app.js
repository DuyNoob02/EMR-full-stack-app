const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { logger } = require('./config/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger } = require('./middlewares/logger');
const v1Routes = require('./routes/v1');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8034;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// API routes
app.use('/api/v1', v1Routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    ok: true,
    status: 200,
    data: { message: 'Server is running' }
  });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    ok: false,
    status: 404,
    code: 'NOT_FOUND',
    message: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;