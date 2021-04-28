const express = require('express'),
  // path = require('path'),
  app = express(),
  dotenv = require('dotenv'),
  methodOverride = require('method-override'),
  employeeRoutes = require('./routes/employees'),
  connectDB = require('./config/db'),
  colors = require('colors');

dotenv.config({ path: 'config/config.env' });

connectDB();
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/api/v1/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV;

const server = app.listen(PORT, () =>
  console.log(
    `Server started running in ${ENVIRONMENT} mode on PORT ${PORT}`.blue.bold,
  ),
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  server.close(() => process.exit(1));
});
