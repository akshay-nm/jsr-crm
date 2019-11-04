// REMOVE IN PRODUCTION
require('dotenv').config()

const express = require('express')
const path = require('path')
const PORT = process.env.PORT
const bodyParser = require('body-parser')

const db = require('./config/db')
const routes = require('./routes')

const app = express()

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url)
  }
  next()
}

function authenticate(req, res, next) {
  // Authenticate the request and set 
  res.locals.authenticated = true
  next()
}

function authorize(req, res, next) {
  // if authorized, next()
  // else save route and redirect to login
  res.locals.authorized = true
  next()
}

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//app.use(requireHTTPS)
app.use(bodyParser.json())
app.use(authenticate)
app.use(authorize)

app.use('/', routes)

db.init()
.then(() => { 
  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
})
.catch((e) => {
  console.log(`Failed to start the app...\n Reason: ${e}`)
})
