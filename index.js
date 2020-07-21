const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const errorHandler = require(`./middleware/errorHandler`)
const port = 3000

const db = require('./database/db')
const routes = require(`./routes/routes`)

app.use(express.json())

//routers
app.use(`/api/`, routes)

//error handler middleware
app.use(errorHandler)


//app.get('/', (req, res) => res.send('Welcome to Trivious APIs!'))

app.listen(port, () => console.log(`Trivious app backend listening at port: ${port}`))