const express = require('express')
const router = express.Router()

//controllers
const { insertBookmark, insertTag } = require('../controllers/insert')

//routes

// insert bookmark route  
router
    .route('/insert_bookmark')
    .post(insertBookmark)


// insert tag route  
router
    .route('/insert_tag')
    .post(insertTag)

module.exports = router 