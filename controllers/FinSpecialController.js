'use strict';

const basic = require('./BasicController');

exports.addFinSpecial = function (req, res, next) {
    const body = req.body;
    // 提交新金融专员
    basic.request.post(req,'/auth/register/finSpecial/', body, function () {
        res.json(body);
    });
};

exports.findFinSpecials = function (req, res, next) {
    var pageNum = parseInt(req.query.pageNum) || 1;
    var pageSize = parseInt(req.query.pageSize) || 10;
    basic.request.get(req,'/auth/manage/account/page/' + pageNum + '/' + pageSize + '/?roleFlag=fin_special', function (data) {
        res.render('manage/fin-special', {
            data: data
        })
    });
};