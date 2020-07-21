const express = require('express')
const router = express.Router()

//controllers
const { insertBookmark, insertTag } = require('../controllers/insert')
const { getTags, getBookmarks } = require('../controllers/fetch')
const { updateBookmarks, updateTags } = require('../controllers/update')
const { deleteTags, deleteBookmarks } = require('../controllers/delete')



//routes

// insert bookmark route  
router
    .route('/insert_bookmark')
    .post(insertBookmark)


// insert tag route  
router
    .route('/insert_tag')
    .post(insertTag)

//get tags route 
router
    .route('/get_tags')
    .get(getTags)

//get bookmark route 
router
    .route('/get_bookmarks')
    .get(getBookmarks)

//put tag route 
router
    .route('/update_tags/:id')
    .put(updateTags)

//put bookmark route 
router
    .route('/update_bookmarks/:id')
    .put(updateBookmarks)


//delete tag route 
router
    .route('/delete_tags/:id')
    .delete(deleteTags)

//delete bookmark route 
router
    .route('/delete_bookmarks/:id')
    .delete(deleteBookmarks)


module.exports = router 