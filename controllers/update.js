const db = require('../database/db')
const ErrorResponse = require(`../utils/errorResponse`)
const asyncHandler = require(`../middleware/asyncHandler`)

// updating tags

exports.updateTags = asyncHandler(async (req, res, next) => {
    const title = req.body.title
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
                const query2 = `update tags_master a set a.tag_title='${title}' , a.time_updated=UNIX_TIMESTAMP() where a.tag_id='${id}' and a.dml_status_flag<>2;`
                db.query(query2, (err, rows2) => {
                    if (!err) {
                        res.status(200).json({
                            success: true,
                            msg: 'Tag updated successfully'
                        })

                    }
                })





            }
        }
        else {
            return next(
                new ErrorResponse(`Error in updating tags +  ${err.message}`, 404)
            )
        }
    })

})



// fetching bookmarks


exports.updateBookmarks = asyncHandler(async (req, res, next) => {
    const title = req.body.title
    const link = req.body.link
    const publisher = req.body.publisher
    const tags = req.body.tags
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
                const query2 = `update bookmark a set a.bookmark_title='${title}' , a.time_updated=UNIX_TIMESTAMP(), a.bookmark_link='${link}', a.publisher='${publisher}' where a.bookmark_id='${id}' and a.dml_status_flag<>2;`
                db.query(query2, (err, rows2) => {
                    if (!err) {


                        const query3 = `update bookmark_tags_map a set  a.time_updated=UNIX_TIMESTAMP(), a.dml_status_flag=2 where a.bookmark_id='${id}' and a.dml_status_flag<>2;`


                        db.query(query3, (err, rows3) => {
                            if (!err) {

                                // inserting tag bookmark mapping
                                tags.forEach(tag_id => {
                                    if (tag_id) {
                                        const query4 = `insert into bookmark_tags_map (bookmark_id,tag_id,time_created,time_updated, dml_status_flag) values('${id}','${tag_id}',UNIX_TIMESTAMP(),UNIX_TIMESTAMP(),0);`

                                        db.query(query4, (err, rows2) => {
                                            if (!err) {

                                                console.log("tags mapping filled ")
                                                return
                                            }
                                            else {
                                                console.log(err)
                                                return next(
                                                    new ErrorResponse(`failed to insert tag mapping  + ${err.message} `, 402)
                                                )
                                            }
                                        })


                                    }
                                    else {
                                        console.log('Empty tags')
                                    }

                                });



                            }
                        })

                        res.status(200).json({
                            success: true,
                            msg: 'Bookmark updated successfully'
                        })

                    }
                })





            }
        }
        else {
            return next(
                new ErrorResponse(`Error in updating Bookmark +  ${err.message}`, 404)
            )
        }
    })

})