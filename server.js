const express = require('express'),
  // path = require('path'),
  app = express(),
  dotenv = require('dotenv'),
  methodOverride = require('method-override'),
  userRoutes = require('./routes/users');

dotenv.config({ path: 'config/config.env' });

// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV;

app.listen(PORT, () =>
  console.log(`Server started running in ${ENVIRONMENT} mode on PORT ${PORT}`),
);
