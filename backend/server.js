const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const trailsRouter = require('./routes/trails');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Mongo error:', err));

app.use('/api/trails', trailsRouter);

app.get('/', (req, res) => {
    res.send('TrailWeather API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
