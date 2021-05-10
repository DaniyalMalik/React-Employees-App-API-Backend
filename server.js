const express = require('express'),
  // path = require('path'),
  app = express(),
  dotenv = require('dotenv'),
  // cors = require('cors'),
  methodOverride = require('method-override'),
  employeeRoutes = require('./routes/employees'),
  userRoutes = require('./routes/auth'),
  connectDB = require('./config/db'),
  colors = require('colors'),
  morgan = require('morgan'),
  xss = require('xss-clean'),
  cookieParser = require('cookie-parser'),
  helmet = require('helmet'),
  hpp = require('hpp'),
  error = require('./middleware/error'),
  rateLimit = require('express-rate-limit'),
  mongoSanitize = require('express-mongo-sanitize');

dotenv.config({ path: 'config/config.env' });

// app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});

const limiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });

// app.use(cors());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(limiter);

app.use('/api/v1/employees', employeeRoutes);
app.use('/api/auth', userRoutes);
app.use(error);

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV;

const server = app.listen(PORT, () =>
  console.log(
    `Server started running in ${ENVIRONMENT} mode on PORT ${PORT}`.blue.bold,
  ),
);

connectDB();

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  server.close(() => process.exit(1));
});
