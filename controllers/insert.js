const db = require('../database/db')
const ErrorResponse = require(`../utils/errorResponse`)
const asyncHandler = require(`../middleware/asyncHandler`)

exports.insertBookmark = asyncHandler(async (req, res, next) => {
    const doctor_id = req.body.doctor_id
    const date = moment(req.body.date, 'DD-MM-YYYY').format('DD-MM-YYYY').toString()
    console.log(date)
    const query = `Select a.appointment_id, a.patient_id,b.name,b.phone_number,b.age,time(a.final_datetime) as appointment_time,
    case 
        when a.status='P' then
        'Pending'
        When a.status='C' then
        'Cancelled'
    end as Status
    
    from appointment a,
    patient_master b 
    where a.patient_id=b.patient_id
    and a.doctor_id = ${doctor_id} 
    and a.dml_status_flag<>2 
    and b.dml_status_flag<>2
    and date(a.final_datetime) = STR_TO_DATE('${date}','%d-%m-%Y')
    and a.status not in ('C','CS')`

    db.query(query, (err, rows) => {
        if (!err) {
            res.status(200).json({
                success: true,
                data: rows
            })
        }
        else {
            return next(
                new ErrorResponse(`No appointment found for this date  +  ${err.message}`, 404)
            )
        }
    })
})