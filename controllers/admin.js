'use strict'

var request = require('request')
var config = require('../config.json')

exports.login = function (req, res, next) {
    res.render('wangzi/login', {
        title: '登陆',
        layout: 'layout_login'
    })
}

exports.imArchiving = function (req, res, next) {
    res.render('wangzi/imArchiving', {
        title: '影像归档'
    })
}

exports.loginUser = function (req, res, next) {
    var loginId = req.body.loginId
    var password = req.body.password
    request({
            url: config.host + '/public/auth/pc/login/',
            method: 'POST',
            json: true,
            body: {
                loginId: loginId,
                password: password
            }
        },
        function (err, response, body) {
            // err -> http err
            // response -> ['statusCode'] -> 200
            //          -> ['header'] -> header
            // body -> response JSON
            //json -> name, age
            // { token: '323c81ccd5fa4f648faf4f3172e60a06',
            //  account_code: 'e413c34557ee4201a1a249848fc9d7ad',
            //  login_id: 'sysadmin',
            //  name: 'Sys Admin',
            //  email: 'sysadmin@virtual.is',
            //  image: '',
            //  organization_code: '',
            //  organization_name: '上海旺资',
            //  organization_category: '',
            //  role_codes: [ '@system' ],
            //  lastLoginTime: 1470831997836,
            //  ext_id: '',
            //  ext_info: {} } }
            res.cookie('userToken', body.body.token)
            res.cookie('userName', body.body.name)
            return res.json({
                err: err,
                response: response,
                body: body
            })
        })
}


exports.logout = function (req, res, next) {
    var userToken = req.cookies.userToken
    console.log(userToken)
    var url = config.host + '/auth/logout/?__ez_token__=' + userToken

    request(url, function (err, response, body) {
        console.log(body)
    })
    res.cookie('userToken', '')
    res.cookie('userName', '')
    res.redirect('/login')
}

exports.orderList = function (req, res, next) {
    // TODO 使用AJAX

    var userToken = req.cookies.userToken || ''
    var pageNum = parseInt(req.query.pageNum) || 1
    var pageSize = parseInt(req.query.pageSize) || 10
    var loanAppUUID = req.query.loanAppUUID || ''
    var status = req.query.status || 'SUBMITTED|APPROVED|APPROVED_QUA|DISAPPROVED'
    var appNumber = req.query.appNumber || ''
    var productUUID = req.query.productUUID || ''
    var idNumber = req.query.idNumber || ''
    var customerName = encodeURI(req.query.customerName || '')
    var supplierUUID = req.query.supplierUUID || ''
    var salesName = encodeURI(req.query.salesName || '')
    var finSpecialName = encodeURI(req.query.finSpecialName || '')
    var startTime = req.query.startTime || ''
    var endTime = req.query.endTime || ''

    var url = config.host + '/loan/apply/page/' + pageNum + '/' + pageSize + '/?__ez_token__=' + userToken + "&loanAppUUID=" + loanAppUUID + "&status=" + status + "&appNumber=" + appNumber + "&productUUID=" + productUUID + "&idNumber=" + idNumber + "&customerName=" + customerName + "&supplierUUID=" + supplierUUID + "&salesName=" + salesName + "&finSpecialName=" + finSpecialName + "&startTime=" + startTime + "&endTime=" + endTime

    request(url, function (err, response, data) {
        const result = JSON.parse(data);
        console.log(result.body);
        if(result.body){
            for (var k in result.body.objects) {
                var item = result.body.objects[k];

                switch (item.status) {
                    case "SUBMITTED":
                        item.status = '待审核';
                        break;
                    case "APPROVED":
                    case "APPROVED_QUA":
                        item.status = '审核通过';
                        break;
                    case "DISAPPROVED":
                        item.status = '审核拒绝';
                        break;
                }
            }
            // TODO 加入全局拦截器，处理code不是200的错误请求，统一做提示
            res.render('wangzi/orderList', {
                items: result.body
            })
        }else{
            // TODO 加入全局拦截器，处理code不是200的错误请求，统一做提示
            res.render('wangzi/orderList', {
                items: {}
            })
        }
    })

    // var testTemp = {
    //   pageNumber: pageNum,
    //   pageSize: pageSize,
    //   pageTotal: 3,
    //   recordTotal: 8,
    //   objects: [{
    //     loan_app_uuid: "loan_app_uuid", // 贷款申请uuid
    //     app_number: "app_number", // 贷款申请编号
    //     down_payment_amount: 0, // 首付金额
    //     project_amount: 0, // 标的总额
    //     loan_amount: 0, // 申请金额
    //     product_name: "product_name", // 产品名称
    //     apply_date: "apply_date", // 申请时间
    //     repayment_periods:0, // 申请期数
    //     status: "SUBMITTED", // 申请状态
    //     car_brand: "car_brand", // 品牌
    //     car_sub_brand: "car_sub_brand", // 子品牌
    //     car_model: "ar_model", // 型号
    //     car_trim: "car_trim", // 配置
    //     customer_name: "customer_name", // 客户名称
    //     customer_id_number: "customer_id_number", // 客户身份证
    //     customer_mobile: "customer_mobile", // 客户手机
    //     sales_name: "sales_name", // 销售顾问名称
    //     sales_id_number: "sales_id_number", // 销售顾问身份证
    //     sales_mobile: "sales_mobile", // 销售顾问手机
    //     finSpecial_name: "finSpecial_name", // 金融专员名称
    //     finSpecial_id_number: "finSpecial_id_number", // 金融专员身份证
    //     finSpecial_mobile: "finSpecial_mobile", // 金融专员手机
    //     supplier_name: "supplier_name", // 经销商名称
    //     supplier_telephone: "123123telephone", // 经销商电话
    //     supplier_addr_prov: "123123addr_prov", // 经销商所在省份编码
    //     supplier_addr_ctiy: "123123addr_ctiy", // 经销商所在城市编码
    //     supplier_address: "1123address" // 经销商地址详细
    //   },
    //   {
    //     loan_app_uuid: "loan_app_uuid", // 贷款申请uuid
    //     app_number: "app_number", // 贷款申请编号
    //     down_payment_amount: 0, // 首付金额
    //     project_amount: 0, // 标的总额
    //     loan_amount: 0, // 申请金额
    //     product_name: "product_name", // 产品名称
    //     apply_date: "apply_date", // 申请时间
    //     repayment_periods:0, // 申请期数
    //     status: "SUBMITTED", // 申请状态
    //     car_brand: "car_brand", // 品牌
    //     car_sub_brand: "car_sub_brand", // 子品牌
    //     car_model: "ar_model", // 型号
    //     car_trim: "car_trim", // 配置
    //     customer_name: "customer_name", // 客户名称
    //     customer_id_number: "customer_id_number", // 客户身份证
    //     customer_mobile: "customer_mobile", // 客户手机
    //     sales_name: "sales_name", // 销售顾问名称
    //     sales_id_number: "sales_id_number", // 销售顾问身份证
    //     sales_mobile: "sales_mobile", // 销售顾问手机
    //     finSpecial_name: "finSpecial_name", // 金融专员名称
    //     finSpecial_id_number: "finSpecial_id_number", // 金融专员身份证
    //     finSpecial_mobile: "finSpecial_mobile", // 金融专员手机
    //     supplier_name: "supplier_name", // 经销商名称
    //     supplier_telephone: "123123telephone", // 经销商电话
    //     supplier_addr_prov: "123123addr_prov", // 经销商所在省份编码
    //     supplier_addr_ctiy: "123123addr_ctiy", // 经销商所在城市编码
    //     supplier_address: "1123address" // 经销商地址详细
    //   }]
    // }

    ///loan/apply/page/<pageNumber>/<pageSize>/?__ez_token__=<token>

    // request({
    //   url: 'http://www.baidu.com',
    //   method: 'POST',
    //   json: true,
    //   body: {
    //     pageSize: pageSize,
    //     pageNum: pageNum
    //   }
    // },
    // function(err, response, body) {
    //   res.render('wangzi/orderListpat', {
    //     items: [{
    //         name: 'pengh'
    //     }]
    //   })
    // })

}

exports.getHtmlPath = function (req, res, next) {
    req.params = req.params || {}
    var path = req.params.path || ''
    if (path.lastIndexOf('.html') + '.html'.length === path.length) {
        path = path.substring(0, path.lastIndexOf('.html'))
    }

    // var request = require('request')
    // request({
    //     url: ''
    //     , method: '' // GET | POST
    //     , form: {

    //     } // POST x-www-form-urlencoded name=pengh&age=26

    //     , json: true
    //     , body: {
    //         name: 'pangh'
    //     } // POST json '{'name': 'pangh', 'age': 22}'

    // }, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(body) // Show the HTML for the Google homepage.
    //     }
    // })

    res.render('wangzi/' + path, {
        path: path,
        layout: 'layout.ejs'
    })
}


/* GET  'wangzi' page. */
// router.get('/wangzi/:path', function(req, res, next) {
//   req.params = req.params || {}
//   var path = req.params.path || ''
//   if(path.lastIndexOf('.html') + '.html'.length === path.length){
//       path = path.substring(0, path.lastIndexOf('.html'))
//   }

//   var request = require('request')
//   request({
//     url: '',
//     method: '',
//     form: {

//     } // POST x-www-form-urlencoded name=pengh&age=26

//     , json: true
//     , body: {
//         name: 'pangh'
//     } // POST json '{'name': 'pangh', 'age': 22}'

//   }, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body) // Show the HTML for the Google homepage.
//     }
//   })

//   res.render('wangzi/'+path, {
//     path : path,
//     layout : 'layout.ejs'
//   })
// })

