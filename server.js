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
  app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
});

// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));

// // tells mongoose which database to connect to 
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// // Use this to log mongo queries being executed!
// mongoose.set('debug', true);

// // app.use(require('./routes'));

// app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));