const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser')
const path = require('path')
const postCharge = require('./services/stripe')

const app = express()

var corsOptions = { origin: "http://localhost:3000" }
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./apis/AdminAPIS')(app)
require('./apis/CustomerAPIS')(app)

app.use(express.static('client/build'))

app.post('/stripe/charge', postCharge)
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))

const PORT = process.env.PORT || 8000
app.listen(PORT)