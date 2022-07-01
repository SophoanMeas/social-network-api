const express = require('express');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

db.set('debug', true);

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('Connected successfully');
});
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
