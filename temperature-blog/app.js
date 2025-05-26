const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// mongoose.connect('mongodb+srv://sakthia:rajapandian@clusterblog.9urvzoq.mongodb.net/blogdb?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Connection error:', err));

const temperatureSchema = new mongoose.Schema({
  city: String,
  temperature: String,
  updatedAt: { type: Date, default: Date.now }
});
const Temperature = mongoose.model('Temperature', temperatureSchema);

app.get('/', async (req, res) => {
  const updates = await Temperature.find().sort({ updatedAt: -1 });
  res.render('index.html', { updates });
});

app.get('/new', (req, res) => {
  res.render('new.html');
});

app.post('/new', async (req, res) => {
  const { city, temperature } = req.body;
  await new Temperature({ city, temperature }).save();
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const entry = await Temperature.findById(req.params.id);
  res.render('edit.html', { entry });
});

app.post('/edit/:id', async (req, res) => {
  const { city, temperature } = req.body;
  await Temperature.findByIdAndUpdate(req.params.id, { city, temperature, updatedAt: new Date() });
  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  await Temperature.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// app.listen(3000, () => {
//   console.log('Temperature blog running at http://localhost:3000');
// });
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Temperature blog running at http://localhost:3000');
  });
}

module.exports = app;