const express = require('express');
const router = express.Router();
const path = require('path');
const dbHandler = require('./dbHandler');

router.use(express.urlencoded({extended: true}));

// Get method starts
router.get('/user/login', (req, res) => {    
    res.render('login');
});

router.get('/user/register', (req, res) => {
    res.render('register');
});

router.get('/user/addbooks', (req, res) => {
    res.render('addbooks');
});

// ASYNCHRONOUS CALLBACK in get method 
router.get('/user/logout', async (req, res) => {
    const user = await dbHandler.loggedUser();
    await dbHandler.removeSession(user);

    const books = await dbHandler.showBook();
    const data = {
        books,
        link_name   : ['/user/login', '/user/register'],
        link_msg    : ['Login', 'Register'],        
    }
    res.render('home', {data: data} );   // redirect to homepage
});

// ASYNCHRONOUS CALLBACK in get method 
router.get('/user/dashboard', async(req, res) => {
    const result = await dbHandler.showBook();

    res.render('dashboard', {info: result});
});

// Get method Ends


// Post method starts

// ASYNCHRONOUS CALLBACK (async/await)
router.post('/user/login', async (req, res) => {    
    const userInfo = await dbHandler.loginValidate(req.body);    
    const books = await dbHandler.showBook();
    await dbHandler.addSession(req.body);
    
    console.log('UserInfo', userInfo);
    
    if(userInfo.length == 0){
        const data = {
            books,
            link_name   : ['/user/login', '/user/register'],
            link_msg    : ['Login', 'Register']
        }
        res.render('home', {data: data});
    }
    else{
        const data = {
            books,
            user        : userInfo[0],
            link_name   : ['/user/dashboard', '/user/logout'],
            link_msg    : ['Dashboard', 'Log Out']   
        }
        res.render('home', {data: data});
    }
});

// ASYNCHRONOUS CALLBACK (async/await)
router.post('/user/register', async (req, res) => {        
    const result = await dbHandler.createUser(req.body);
    const books = await dbHandler.showBook();

    if(!result){
        const data = {
            books,
            link_name   : ['/user/login', '/user/register'],
            link_msg    : ['Login', 'Register']
        }
        res.render('home', {data: data});
    }
    else{
        const data = {
            books,
            userInfo    : req.body,
            link_name   : ['/user/dashboard', '/user/logout'],
            link_msg    : ['Dashboard', 'Log Out']   
        }
        res.render('home', {data: data});
    }
});

// ASYNCHRONOUS CALLBACK (async/await)
router.post('/user/addbooks', async(req, res) => {    
    await dbHandler.createBook(req.body);
    const books = await dbHandler.showBook();
    const userInfo = await dbHandler.loggedUser();

    const data = {
        books,
        userInfo,
        link_name   : ['/user/dashboard', '/user/logout'],
        link_msg    : ['Dashboard', 'Log Out']   
    }
    res.render('home', {data: data});
});

// Post method ends

module.exports = router;