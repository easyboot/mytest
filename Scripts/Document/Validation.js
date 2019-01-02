var errMsg = [
            '字符长度不能小于4个字符',
            '必须是三位小数的正实数',
            '名字必须汉字',
            '年龄必须为数字',
            '密码必须多于或等于 6 个字符。',
            '验证密码与原密码不一致！',
            'Email地址不合法！',

];
var pattern = [
              /.{4,}/,
              /^[0-9]+(.[0-9]{1,3})?$/,
              /^([\u4E00-\u9FA5]){1,}$/,
              /^[0-9]{1,3}$/,
              /.{6,}/,
              '',
              /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]{2,}(\.[a-z0-9]{2,5}){1,2}$/
];

function CheckLengthNG(TagValue,TagName,Message) {
    if (!pattern[0].test($(TagValue).val())) {
        $(TagName).html(Message + errMsg[0]);
        return true;
    }
    else
    {
        $(TagName).html('');
        return false;
    }
}

function CheckPositiveRealNumberNG(TagValue, TagName, Message) {
    if (!pattern[1].test($(TagValue).val())) {
        $(TagName).html(Message + errMsg[1]);
        return true;
    }
    else {
        $(TagName).html('');
        return false;
    }
}

function check2() {
    if (!pattern[1].test(document.getElementById("age").value)) {
        document.getElementById("span2").innerHTML = errMsg[1];
    }
}
function check3() {
    if (!pattern[2].test(document.getElementById("pwd").value)) {
        document.getElementById("span3").innerHTML = errMsg[2];
    }
}
function check4() {
    if (document.getElementById("repwd").value != document.getElementById("pwd").value) {
        document.getElementById("span4").innerHTML = errMsg[3];
    }
    function check5() {
        if (patter[4].test(document.getElementById("email").value)) {
            document.getElementById("span5").innerHTML = errMsg[4];
        }
    }
}


function showErrorMessage(TagName, ErrorMessage) {
    var a = ErrorMessage.substring(ErrorMessage.indexOf('['), ErrorMessage.indexOf(']')+1)
    var b = '<span style="color:skyblue">' + a + '</span>'
    var ErrMsg = ErrorMessage.replace(a, b);

    $(TagName).html(ErrMsg);
}