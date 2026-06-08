const express = require('express');
const cors = require('cors');

const connectDatabase = require('./config/database');
const homeRoutes = require('./routes/homeRoutes');
const missionRoutes = require('./routes/missionRoutes');
const contactRoutes = require('./routes/contactRoutes');
const visitRoutes = require('./routes/visitRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', homeRoutes);
app.use('/api/mission', missionRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/visit', visitRoutes);
app.use('/admin', adminRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

module.exports = app;
