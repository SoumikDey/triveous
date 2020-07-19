const express = require('express')
const app = express()
const port = 3000

const db = require('./database/db')
const routes = require(`./routes/routes`)

//routers
app.use('/api/', routes)


app.get('/', (req, res) => res.send('Welcome to Trivious APIs!'))

app.listen(port, () => console.log(`Trivious app backend listening at port: ${port}`))