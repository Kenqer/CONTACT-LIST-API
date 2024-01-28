const express = require('express');
const bodyParser = require('body-parser');
const db = require('./services/db');
const app = express()
const PORT = process.env.PORT || 5000

//set body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//set server 
app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`API running on port: ${PORT}`)
})


// CREATE DATA

app.post('/api/contact-create', (req, res) => {
    const data = { ...req.body }
    const querySQL = 'INSERT INTO contacts SET ?'

    db.query(querySQL, data, (err, rows, field) => {
        if (err) {
            return res.status(500).json({ msg: 'Failed INSERT data contacts', err: err })
        }
        res.status(200).json({ status_code: 200, success: true, msg: "Success INSERT data contacts" })
    })
})

// UPDATE DATA

app.put('/api/contact-update/:id', (req, res) => {
    const data = { ...req.body }
    const queryFindById = 'SELECT * FROM contacts WHERE id = ?'
    const queryUpdate = 'UPDATE contacts SET ? WHERE id = ?'
    const types = ['ID', 'SGP', 'MLY', 'TH', 'PH', 'VIE', 'LS', 'MY']


    // query find data 
    db.query(queryFindById, req.params.id, (err, rows, field) => {
        // error handling
        if (err) {
            return res.status(500).json({ status_code: 500, msg: err })
        }
        // update data
        if (rows.length) {

            db.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
                if (!types.includes(req.body.type)) {
                   return  res.status(500).json({ status_code: 500, msg: 'Not Found', err: err })
                } 
                if (err) {
                  return  res.status(500).json({ status_code: 500, msg: 'Failed Upload Data', err: err })
                }
               return res.status(200).json({ status_code: 200, msg: "Success Update Data", rows: rows })
            })
        } else {
            return res.status(404).json({ status_code: 404, msg: `Data ${req.params.id} not found` })
        }
    })

})
// DELETE DATA

app.delete('/api/contact-delete/:id', (req, res) => {
    const queryDelete = 'DELETE FROM contacts WHERE id=?'

    // query find data 
            if (!req.params.id){
                return  res.status(500).json({ status_code: 500, msg: 'Failed Found Data', err: err })
            }
        // delete data


            db.query(queryDelete, task_id, (err, rows, field) => {
                if (err) throw error;
               return res.status(200).json({ status_code: 200, msg: "Success Delete Data", rows: rows })
            })
    })

    // READ DATA

    app.get('/api/contact-read/:id', function (req, res) {
        
        db.query('SELECT * FROM contacts where id=?', req.params.id, function (err, rows, fields) {
            if (err) throw error;
            return res.send({message: 'Contact list.', rows:rows });
        });
    
    });