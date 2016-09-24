'use strict'

var request = require('request')
var config = require('../config.json')

exports.requiresLogin = function(req, res, next) {
  var userToken = req.cookies.userToken

  if (!userToken) {
    return res.redirect('/login')
  }

  var url = config.host + '/auth/logininfo/?__ez_token__=' + userToken

  request(url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      next()
    }
    else {
      return res.redirect('/login')
    }
  })
}