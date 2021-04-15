const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

var corsOptions = { origin: "*" }
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./apis/AdminAPIS')(app)
require('./apis/CustomerAPIS')(app)

app.use(express.static('home/build'))
app.use(express.static('client/build'))
app.use(express.static('customer/build'))

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'home', 'build', 'index.html')))
app.get('/client/*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
app.get('/customer/*', (req, res) => res.sendFile(path.resolve(__dirname, 'customer', 'build', 'index.html')))

const PORT = process.env.PORT || 8000
app.listen(PORT)