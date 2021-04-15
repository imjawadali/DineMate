const express = require('express')
const cors = require("cors")
const path = require('path')

const app = express()

var corsOptions = { origin: "*" }
app.use(cors(corsOptions))

app.use(express.static(__dirname + '/customer/build/'))

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'customer', 'build', 'index.html')))

const PORT = process.env.PORT || 3002
app.listen(PORT)