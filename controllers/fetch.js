const db = require('../database/db')
const ErrorResponse = require(`../utils/errorResponse`)
const asyncHandler = require(`../middleware/asyncHandler`)

// fetching tags

exports.getTags = asyncHandler(async (req, res, next) => {

    const query = `select a.tag_id id,a.tag_title title,a.time_created,a.time_updated from tags_master a where a.dml_status_flag<>2;`
    console.log('getting tags')
    db.query(query, (err, rows) => {
        if (!err) {
            res.status(200).json({
                success: true,
                data: rows,
                msg: 'Tags displayed successfully'
            })

        }
        else {
            return next(
                new ErrorResponse(`Error in displaying tags +  ${err.message}`, 404)
            )
        }
    })

})

// fetching bookmarks


exports.getBookmarks = asyncHandler(async (req, res, next) => {

    const query = `select a.bookmark_id id ,a.bookmark_link  link,a.bookmark_title title,a.publisher,a.time_created,a.time_updated, null tags from bookmark a where a.dml_status_flag<>2;`
    console.log('getting tags')
    var bookmarks = []
    db.query(query, (err, rows) => {
        if (!err) {
            for (i = 0; i < rows.length; i++) {
                console.log(i)
                const query2 = `select a.tag_id from bookmark_tags_map a where a.bookmark_id='${rows[i].id}' and a.dml_status_flag<>2`
                db.query(query2, (err, rows2) => {
                    if (!err) {
                        //console.log(rows[i])
                        console.log(JSON.stringify(rows2))
                        //rows[i].tags = JSON.stringify(rows2)

                    }
                })

            }

            res.status(200).json({
                success: true,
                data: rows,
                msg: 'Bookmarks displayed successfully'
            })

        }
        else {
            return next(
                new ErrorResponse(`Error in displaying bookmarks +  ${err.message}`, 404)
            )
        }
    })

})