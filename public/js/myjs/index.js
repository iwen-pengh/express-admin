/**
 * Created by penghao on 16/8/5.
 */
$(function () {
    //Colorbox
    $('.gallery-zoom').colorbox({
        rel: 'gallery',
        maxWidth: '90%',
        width: '800px'
    });
    /**
     * 使用方法:
     * procodestr  默认省级的CODE
     * citycodestr 默认城市的CODE
     * _sel_provice 第一个select的ID
     * _sel_city  第二个select的ID
     */
    var procodestr = 330000;
    var citycodestr = 330200;
    proVinAndCity(procodestr, citycodestr, 'provice', 'city');
    proVinAndCity(procodestr, citycodestr, 'provice1', 'city1');

    /**orderList 申请分页查询**/

    $('#getOrderList').click(function (e) {
        e.preventDefault()
        var pageNum = $('input[name="pageNumber"]').val() || 1
        var pageSize = 10
        var loanAppUUID = $('input[name="loanAppUUID"]').val()
        var status = $('#orderStatus').val()
        var appNumber = $('input[name="appNumber"]').val()
        var productUUID = $('input[name="productUUID"]').val()
        var idNumber = $('input[name="idNumber"]').val()
        var customerName = $('input[name="customerName"]').val()
        var supplierUUID = $('input[name="supplierUUID"]').val()
        var salesName = $('input[name="salesName"]').val()
        var finSpecialName = $('input[name="finSpecialName"]').val()
        var startTime = $('input[name="startTime"]').val()
        var endTime = $('input[name="endTime"]').val()
        var url = "/wangzi/orderList?pageNum=" + pageNum + "&pageSize=" + pageSize + "&loanAppUUID=" + loanAppUUID + "&status=" + status + "&appNumber=" + appNumber + "&productUUID=" + productUUID + "&idNumber=" + idNumber + "&customerName=" + customerName + "&supplierUUID=" + supplierUUID + "&salesName=" + salesName + "&finSpecialName=" + finSpecialName + "&startTime=" + startTime + "&endTime=" + endTime
        window.location.href = url
    })

    $('.nextPage').click(function (e) {
        e.preventDefault()
        pageNum = parseInt(pageNum) + 1
        var url = "/wangzi/orderList?pageNum=" + pageNum + "&pageSize=" + pageSize + "&loanAppUUID=" + loanAppUUID + "&status=" + status + "&appNumber=" + appNumber + "&productUUID=" + productUUID + "&idNumber=" + idNumber + "&customerName=" + customerName + "&supplierUUID=" + supplierUUID + "&salesUUID=" + salesUUID + "&finSpecialUUID=" + finSpecialUUID + "&startTime=" + startTime + "&endTime=" + endTime
        window.location.href = url
    })

    $('.indexPage').click(function (e) {
        e.preventDefault()
        pageNum = $(this).text()
        var url = "/wangzi/orderList?pageNum=" + pageNum + "&pageSize=" + pageSize + "&loanAppUUID=" + loanAppUUID + "&status=" + status + "&appNumber=" + appNumber + "&productUUID=" + productUUID + "&idNumber=" + idNumber + "&customerName=" + customerName + "&supplierUUID=" + supplierUUID + "&salesUUID=" + salesUUID + "&finSpecialUUID=" + finSpecialUUID + "&startTime=" + startTime + "&endTime=" + endTime
        window.location.href = url
    })

    $('.prePage').click(function (e) {
        e.preventDefault()
        pageNum = parseInt(pageNum) - 1
        var url = "/wangzi/orderList?pageNum=" + pageNum + "&pageSize=" + pageSize + "&loanAppUUID=" + loanAppUUID + "&status=" + status + "&appNumber=" + appNumber + "&productUUID=" + productUUID + "&idNumber=" + idNumber + "&customerName=" + customerName + "&supplierUUID=" + supplierUUID + "&salesUUID=" + salesUUID + "&finSpecialUUID=" + finSpecialUUID + "&startTime=" + startTime + "&endTime=" + endTime
        window.location.href = url
    })

});
