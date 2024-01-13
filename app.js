const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
const methodOverride = require('method-override');

require('dotenv').config()

const app = express();

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI)
    .then((result) => {
        app.listen(3000, 'localhost', () => {
            console.log("Connected to the db and server is running on port 3000.");
        })
    })
    .catch((error) => {
        console.log(error)
    })



app.set('view engine', 'ejs');
app.set('views', 'layouts')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.redirect("/blogs")
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About"
    });
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: "Contact"
    });
})


app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', {
        title: "Error 404"
    });
})
