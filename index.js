const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const userRoutes = require('./routes/api/users');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started running on PORT ${PORT}`));
