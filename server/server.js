const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoute = require('./routes/auth');
const eventsRoute = require('./routes/events');
const postRoute = require('./routes/posts');
const userRoute = require('./routes/users'); 
const ideasRoute = require('./routes/ideas');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use(cors());         

app.use('/api/auth', authRoute);
app.use('/api/events', eventsRoute);
app.use('/api/posts', postRoute);
app.use('/api/users', userRoute); 
app.use('/api/ideas', ideasRoute);
app.get('/api/test', (req, res) => {
  res.json({ message: 'Riders Hub API is running... 🤘' });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected... 🔥');
    app.listen(PORT, () => {
      console.log(`Server blasting off on http://localhost:${PORT} 🚀`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });