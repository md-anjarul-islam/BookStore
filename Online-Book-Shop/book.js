const express = require('express');
const router = express.Router();
const path = require('path');
const dbHandler = require('./dbHandler');
// console.log(dbHandler);

router.use(express.json());

// Get method starts
router.get('/book/addbooks', (req, res) => {    
    res.render('addbooks');
});

// Get method Ends


// Post method starts

// VALIDATION SHOULD BE DONE HERE
router.post('/book/addbooks', (req, res) => {        
    res.render('dashboard');
});

// Post method ends

module.exports = router;