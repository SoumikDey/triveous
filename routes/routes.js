const express = require('express')
const router = express.Router()

//controllers
const { insertBookmark } = require('../controllers/insert')

//routes

// insert bookmark route  
router
    .route('/insert_bookmark')
    .post(insertBookmark)

module.exports = router 