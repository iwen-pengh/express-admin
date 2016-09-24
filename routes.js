'use strict'

var express = require('express')
var router = express.Router()

var Admin = require('./controllers/admin')
var User = require('./controllers/user')
var FinSpecialController = require('./controllers/FinSpecialController')

router.get('/login', Admin.login)
router.post('/login', Admin.loginUser)
router.get('/logout', Admin.logout)

// get order list
router.get('/wangzi/orderList', User.requiresLogin, Admin.orderList)
router.get('/wangzi/imArchiving', User.requiresLogin, Admin.imArchiving)

// fin-special process
router.get('/manage/finSpecials/', User.requiresLogin, FinSpecialController.findFinSpecials);
router.post('/manage/finSpecial/', User.requiresLogin, FinSpecialController.addFinSpecial);
router.get('/manage/finSpecial/:uuid/', User.requiresLogin, Admin.imArchiving);
router.put('/manage/finSpecial/:uuid/', User.requiresLogin, Admin.imArchiving);

// get *.html
router.get('/wangzi/:path', Admin.getHtmlPath)

module.exports = router
