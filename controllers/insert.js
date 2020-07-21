const db = require('../database/db')
const ErrorResponse = require(`../utils/errorResponse`)
const asyncHandler = require(`../middleware/asyncHandler`)
const { uuid } = require('uuidv4');


//insert bookmark
exports.insertBookmark = asyncHandler(async (req, res, next) => {
    const title = req.body.title

    const link = req.body.link
    const publisher = req.body.publisher
    const tags = req.body.tags
    console.log(tags)
    const query = `Select * from bookmark a where a.bookmark_link = '${link}' and a.dml_status_flag<>2`

    db.query(query, (err, rows) => {
        if (!err) {
            console.log(rows)

            //for checking duplicate link
            if (rows.length > 0) {
                console.log('Bookmark link cannot be same')
                res.status(401).json({
                    success: false,
                    msg: 'Bookmark link cannot be same'
                })
                return;
            }
            else {
                // for checking proper tag_ids
                let tag_id_string = tags.length === 0 ? "" : "'" + tags.join("','") + "'";
                console.log(tag_id_string)

                const query2 = `select * from tags_master a where a.tag_id IN (${tag_id_string}) and a.dml_status_flag<>2`
                db.query(query2, (err, rows) => {
                    if (!err) {
                        if (rows.length != tags.length) {
                            res.status(401).json({
                                success: false,
                                msg: 'Invalid Tag IDs'
                            })
                            console.log('Invalid Tag IDs')
                            return;
                        }
                        else {

                            const bookmark_id = uuid();
                            console.log(bookmark_id);
                            const query3 = `insert into bookmark (bookmark_id, bookmark_title, bookmark_link, publisher,time_created,time_updated, dml_status_flag) values('${bookmark_id}','${title}','${link}','${publisher}',UNIX_TIMESTAMP(),UNIX_TIMESTAMP(),0);`

                            db.query(query3, (err, rows) => {
                                // console.log('Insert executed');
                                if (!err) {

                                    // inserting tag bookmark mapping
                                    tags.forEach(tag_id => {
                                        if (tag_id) {
                                            const query4 = `insert into bookmark_tags_map (bookmark_id,tag_id,time_created,time_updated, dml_status_flag) values('${bookmark_id}','${tag_id}',UNIX_TIMESTAMP(),UNIX_TIMESTAMP(),0);`

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



                                    res.status(200).json({
                                        success: true,
                                        bookmark_id: bookmark_id,
                                        msg: 'Bookmark inserted successfully'
                                    })
                                }

                                else {
                                    res.status(400).json({
                                        success: false,
                                        msg: err
                                    })




                                }
                            })

                        }



                    }
                    else {
                        res.status(400).json({
                            success: false,
                            msg: err
                        })
                        return;
                    }
                })
            }


        }
        else {
            return next(
                new ErrorResponse(`Error in creating bookmark +  ${err.message}`, 404)
            )
        }
    })
})




// insert tags

exports.insertTag = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    const title = req.body.title

    const query = `Select * from tags_master a where a.tag_title = '${title}' and a.dml_status_flag<>2`
    db.query(query, (err, rows) => {
        if (!err) {
            console.log(rows)
            if (rows.length > 0) {
                console.log('Tag title cannot be same')
                res.status(401).json({
                    success: false,
                    msg: 'Tag title cannot be same'
                })
            }
            else {
                const tag_id = uuid();
                const query = `INSERT INTO tags_master(tag_id,tag_title,time_created,time_updated,dml_status_flag) VALUES('${tag_id}','${title}',UNIX_TIMESTAMP(),UNIX_TIMESTAMP(),0);`
                db.query(query, (err, rows) => {
                    if (!err) {

                        res.status(200).json({
                            success: true,
                            tag_id: tag_id,
                            msg: 'Tag inserted successfully'
                        })

                    }
                    else {
                        res.status(400).json({
                            success: false,
                            msg: err
                        })

                    }
                })




            }



        }
        else {
            return next(
                new ErrorResponse(`Error in creating bookmark +  ${err.message}`, 404)
            )

        }
    })
})