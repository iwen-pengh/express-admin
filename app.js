'use strict'

var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var errorHandler = require('errorhandler')
var bodyParser = require('body-parser')
var partials = require('express-partials')
//var session = require('express-session')

var routes = require('./routes')

var app = express()


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(partials())

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
// app.use(session({
//   secret: 'wanzi',
//   resave: true,
//   saveUninitialized: true
// }))

app.use(function(req, res, next) {
  var userToken = req.cookies.userToken
  var userName = req.cookies.userName

  // If there's no user in the cookies, just skip.
  if (!userToken) return next()

  res.locals.userName = userName
  next()

})

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  // debug
  app.use(errorHandler())
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    if(err.status === 404){
      res.render('error404', {
        message: err.message,
        error: err
      })
    }else{
      res.render('error500', {
        message: err.message,
        error: err
      })
    }
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  if(err.status === 404){
    res.render('error404', {
      message: err.message,
      error: {}
    })
  }else{
    res.render('error500', {
      message: err.message,
      error: {}
    })
  }
})

module.exports = app
