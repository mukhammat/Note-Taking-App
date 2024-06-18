const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();

mongoose.connect('mongodb://localhost:27017/note-taking-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/auth', authRoutes);
app.use('/notes', notesRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:3000');
});
