const express = require('express');
const path = require('path');
const userRouter = require('./user');
const bookRouter = require('./book');
const app = express();
const dbHandler = require('./dbHandler');

app.use(express.urlencoded({ extended: true }));
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

app.use('/', userRouter);
app.use('/', bookRouter);

// ASYNCHRONOUS CALLBACK (async/await)
app.get('/', async(req, res) => {
    const books = await dbHandler.showBook();
    const data = {        
        books,
        link_name   : ['/user/login', '/user/register'],
        link_msg    : ['Login', 'Register']     
    }
    res.render('home', {data: data} );   // redirect to homepage
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('The Server is running...'));
