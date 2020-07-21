const db = require('../database/db')
const ErrorResponse = require(`../utils/errorResponse`)
const asyncHandler = require(`../middleware/asyncHandler`)

// deleting tags

exports.deleteTags = asyncHandler(async (req, res, next) => {
    //const title = req.body.title
    const id = req.params.id
    const query = `select * from tags_master a where a.tag_id='${id}' and a.dml_status_flag<>2;`
    console.log('getting tags')
    db.query(query, (err, rows) => {
        if (!err) {
            console.log(rows)
            if (rows.length == 0) {

                res.status(403).json({
                    success: false,

                    msg: 'Invalid Tag ID'
                })

            }
            else {
                const query2 = `update tags_master a set a.dml_status_flag=2 , a.time_updated=UNIX_TIMESTAMP() where a.tag_id='${id}' and a.dml_status_flag<>2;`
                db.query(query2, (err, rows2) => {
                    if (!err) {


                        const query2 = `update bookmark_tags_map a set a.dml_status_flag=2 , a.time_updated=UNIX_TIMESTAMP() where a.tag_id='${id}' and a.dml_status_flag<>2;`
                        db.query(query2, (err, rows2) => {
                            if (!err) {



                                res.status(200).json({
                                    success: true,
                                    msg: 'Tag deleted successfully'
                                })

                            }
                        })
                    }

                })


            }
        }
        else {
            return next(
                new ErrorResponse(`Error in deleting tags +  ${err.message}`, 404)
            )
        }
    })

})



// deleting bookmarks


exports.deleteBookmarks = asyncHandler(async (req, res, next) => {
    /*const title = req.body.title
    const link = req.body.link
    const publisher = req.body.publisher
    const tags = req.body.tags*/
    const id = req.params.id
    const query = `select * from bookmark a where a.bookmark_id='${id}' and a.dml_status_flag<>2;`
    console.log('getting bookmark')
    db.query(query, (err, rows) => {
        if (!err) {
            console.log(rows)
            if (rows.length == 0) {

                res.status(403).json({
                    success: false,

                    msg: 'Invalid Bookmark ID'
                })

            }
            else {
                const query2 = `update bookmark a set a.dml_status_flag =2 , a.time_updated=UNIX_TIMESTAMP() where a.bookmark_id='${id}' and a.dml_status_flag<>2;`
                db.query(query2, (err, rows2) => {
                    if (!err) {


                        const query3 = `update bookmark_tags_map a set  a.time_updated=UNIX_TIMESTAMP(), a.dml_status_flag=2 where a.bookmark_id='${id}' and a.dml_status_flag<>2;`


                        db.query(query3, (err, rows3) => {
                            if (!err) {

                                res.status(200).json({
                                    success: true,
                                    msg: 'Bookmark deleted successfully'
                                })



                            }
                        })



                    }
                })





            }
        }
        else {
            return next(
                new ErrorResponse(`Error in deleting Bookmark +  ${err.message}`, 404)
            )
        }
    })

})