require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ROUTES
app.use('/api/v1.0.0', require('./v1.0.0/routes'));
app.get('*', (_, res) => {
  res.redirect('/');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});