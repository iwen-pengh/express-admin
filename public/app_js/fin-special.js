$(function () {
    initLayout();
    initEvent();
});

function initLayout() {

}

function initEvent() {
    $('#btn-add-finSpecial').click(function (e) {
        e.preventDefault();
        const mobile = $('input[name="mobile"]').val();
        const name = $('input[name="name"]').val();
        const idNumber = $('input[name="idNumber"]').val();
        const organizationCode = $('select[name="organizationCode"]').val();
        $.ajax({
            method:'POST',
            url: '/manage/finSpecial/',
            data: JSON.stringify({
                loginId: mobile,
                name: name,
                idNumber: idNumber,
                organizationCode: organizationCode
            }),
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            cache: false
        }).done(function (result) {
            alert('ok');
        }).fail(function (result, textStatus, info) {
            alert('fail');
        });

    });
}
