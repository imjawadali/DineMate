const express = require('express')
const cors = require("cors")
const path = require('path')

const app = express()

var corsOptions = { origin: "*" }
app.use(cors(corsOptions))

app.use(express.static('home/build'))

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'home', 'build', 'index.html')))

const PORT = process.env.PORT || 3000
app.listen(PORT)