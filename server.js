// express server
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear',() => {
    return 'Copyright '+ new Date().getFullYear();
});
app.set('view engine','hbs');

/**
 * .use method is used to register a middle wear.
 * a middle wear implements custom functionality that express doesnt have.
 * 
 * to register a middle wear, call the .use method from express the .use method
 * takes a function.
 * 
 * the function takes 3 parameters on it, this function is gonna get called by
 * the request, response and next object.
 * 
 * the next object is used to tell the middle wear that the function is done.
 * 
 * the request object: gives you an acces on everything about the request, anything that 
 * comes from the client. http://expressjs.com/en/4x/api.html#req
 * 
 * the response object: 
 */

app.use((req, res, next) => {
    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to serever.log.')
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


/**
 * .get method is use to register a handler,
 * 
 * .get method takes 2 arguments, the url routes, and a function that 
 *  takes the request and response object as a parameter.
 * 
 *  Syntax: .get('[route]', fn(request, response){ [do something ..] })
 */
app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle : 'Home page',
        pageHeader : 'Welcome to my website',
        pageContent: 'this is the cotent of this website',
        pageFooter : 'copyright' + new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad',(req, res) => {
    res.send({
        code : "BAD_REQUEST",
        errorMessage: 'Unable to fetch request'
    })
})

app.listen(3000, () => {
    console.log('save sucessfully')
});