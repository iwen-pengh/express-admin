'use strict';

const sysRequest = require('request');
const config = require('../config.json');

const tokenFlag = "userToken";

exports.request = function () {

    function formatUrl(req, uri) {
        if (uri.length < 4 || uri.substring(0, 4).toUpperCase() != 'HTTP') {
            uri = config.host + uri;
        }
        if (-1 == uri.indexOf('?')) {
            uri += '?';
        } else {
            uri += '&';
        }
        var userToken = req.cookies[tokenFlag] || '';
        uri += '__ez_token__=' + userToken;
        return encodeURI(uri);
    }

    function request(req, method, uri, body, successFun, errorFun) {
        const url = formatUrl(req, uri);
        sysRequest({
            url: url
            , method: method
            , json: true
            , body: body
        }, function (err, response, result) {
            if (err != null) {
                null != errorFun && errorFun('-1', err.message)
            } else {
                switch (result.code) {
                    case '200':
                    case 200:
                        null != successFun && successFun(result.body);
                        break;
                    default :
                        console.log("[" + result.code + "]" + result.message);
                        null != errorFun && errorFun(result.code, result.message)
                }
            }
        });
    }

    return {
        post: function (req, uri, body, successFun, errorFun) {
            request(req, 'POST', uri, body, successFun, errorFun)
        },
        get: function (req, uri, successFun, errorFun) {
            request(req, 'GET', uri, null, successFun, errorFun)
        },
        put: function (req, uri, body, successFun, errorFun) {
            request(req, 'PUT', uri, body, successFun, errorFun)
        },
        del: function (req, uri, successFun, errorFun) {
            request(req, 'DELETE', uri, null, successFun, errorFun)
        }
    }
}();
