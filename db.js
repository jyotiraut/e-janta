const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://anup:20600921@cluster0.woygkpr.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', (err) => console.log('MongoDB error occured:', err))
db.once('open', () => {
  console.log('Connected to MongoDB')
})