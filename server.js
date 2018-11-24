const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials/')
app.set('view engine', 'hbs');

// Middleware
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
})
// ---------------------------------------------
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

app.get('/', (req, res) => { // request, response
    // res.send('Hello world !!!');
    res.render('home.hbs', {
        welcomeMessage: 'Hello on my website',
        pageTitle: 'Home page'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.listen(3000, () => {
    console.log('app is listening on port 3000');
});