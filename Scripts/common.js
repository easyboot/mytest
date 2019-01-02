
//*************************************js 检验用户是否输入选择TemplateID***************************************************
/*
coding by linyuhua 2018-05-30
*/
function TemplateNotExist(TemplateID) {
    var Result = false;
    if (TemplateID.length < 2) {
        Result = true
    }
    else
    {
        Result = false
    }
 
    return Result;
}

//*************************************js 取得系统当天日期 月/日/年***************************************************
/*
coding by linyuhua 2018-03-16
*/
function Today() {
    var today = new Date();
    var h = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    //return h + "-" + m + "-" + d;
    return m + "/" + d + "/" + h;
}

function getNewDay(dateTemp, days) {
    var dateTemp = dateTemp.split("-");
    var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式  
    var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
    var rDate = new Date(millSeconds);
    var year = rDate.getFullYear();
    var month = rDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    var date = rDate.getDate();
    if (date < 10) date = "0" + date;
    return (year + "-" + month + "-" + date);
}

//日期加天数的方法
//dataStr日期字符串
//dayCount 要增加的天数
//return 增加n天后的日期字符串
function dateAddDays(dataStr, dayCount) {
    var strdate = dataStr; //日期字符串
    var isdate = new Date(strdate.replace(/-/g, "/"));  //把日期字符串转换成日期格式
    isdate = new Date((isdate / 1000 + (86400 * dayCount)) * 1000);  //日期加1天
    var pdate = isdate.getFullYear() + "-" + ("0"+(isdate.getMonth() + 1)).slice(-2) + "-" + ("0"+(isdate.getDate())).slice(-2);   //把日期格式转换成字符串

    return pdate;
}


//*************************************js 产生GUID***************************************************
/*
coding by linyuhua 2018-03-16
create new guid 
*/
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

//*************************************ajax 取得登录用户工号***************************************************
/*
coding by linyuhua 2017-11-03
*/
function GetLoginEmployeeNo() {
    var Result = ''; 
    var url = "/Base/GetLoginEmployeeNo";
    var ajaxObj = $.ajax({
        url: url,
        async: false,
        type: "POST",
        contentType: "application/json",
        //data: param,
        success: function (data) {
            Result = data;
            return Result; 
        },
        complete: function () {
            //  return Result;
        }
    });
    //return JSON.parse(ajaxObj.responseJSON);
}


//*************************************页面控制***************************************************
/*
coding by linyuhua 2017-10-24
使当前页面最大化
*/
function PageMaximization() {
    //self.resizeTo
    self.moveTo(0, 0);//screen.availHeight
    self.resizeTo(screen.availWidth, screen.availHeight)
}

function PageMaximization1() {
    $(document).ready(function () {       //使用jquery的ready方法似的加载运行
        if (window.screen) {              //判断浏览器是否支持window.screen判断浏览器是否支持screen
            var myw = screen.availWidth;  //定义一个myw，接受到当前全屏的宽
            var myh = screen.availHeight; //定义一个myw，接受到当前全屏的高
            window.moveTo(0, 0);          //把window放在左上脚
            window.resizeTo(myw, myh);    //把当前窗体的长宽跳转为myw和myh
        }
    })
}

//***********************************ECHART字体大小*****************************************************
/* ECHART 字体大小 */
ECHART_TITLE_FONTSIZE  = 18;
ECHART_LEGEND_FONTSIZE = 10;
ECHART_X_AXIS_FONTSIZE = 10;
ECHART_Y_AXIS_FONTSIZE = 14;


//***********************************字符串操作函数*****************************************************
/* 截取字符串中前两个单词，以空格区分 */
function GetStringTwoWord(str) {
    var SpaceCount = 0;
    for (x = 1 ; x < str.length; x++) {
        if (str[x] == ' ') {
            SpaceCount++
        }
        if (SpaceCount >= 2) {
            return str.substring(0,x)
        }
    }
    return str 
}



//***********************************属性扩展*****************************************************
/* 格式化字符串 */
String.format = function () {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

/* 消除数组中的重复数据 */
Array.prototype.unque = function () {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = this[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

function Arrayplus(a, b) {
    var c = [];
    for (x = 0; x < a.length; x++) {
        c[x] = parseInt('0'+a[x]) + parseInt('0'+b[x]);
    }
    return c;
}

//function Arrayplus(a, b) {
//    return a.map(function (e, i) {
//        return e.map(function (e2, j) {
//            return e2 + b[i][j];
//        });
//    });
//}

function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result; 
}

/* 格式化日期 2017-10-24 */
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

 

/* 当前日期和参数日期比较 2018-10-29 */
// 将字符串日期格式 转换为日期格式
// 当前日期 等于 参数日期  返回 0  
// 当前日期 大于 参数日期  返回 1  
// 当前日期 小于 参数日期  返回 2
// 其他情况 返回 -1   
function CompareCurrentDate(CompareDate) {
    //console.log('******************' + CompareDate+'**********')
    if (CompareDate.Trim() == 'N/A') {
        return -1;
    }

    var starttime = new Date();
    var endtime  = new Date(Date.parse(CompareDate)); 

    console.log(starttime)
    console.log(endtime)

    if (starttime == endtime) {
        return 0;
    }

    if (starttime > endtime) {
        return 1;
    }

    if (starttime < endtime) {
        return 2;
    }
}

String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.LTrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.RTrim = function () {
    return this.replace(/(\s*$)/g, "");
}

function ShowMessage(msg) {
    var s = '<div class="alert alert-info alert-dismissible" role="alert" style="font-weight:bold;position:absolute;top:40%;left: 50%;z-index:9999">' +
               ' <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
               '  ' + msg +
               '<div class="row"><button >OK</button>     <button >Cancel</button></div>'
           '</div>' +
           
    $('body').append(s);
}
//tip是提示信息，type:'success'是成功信息，'danger'是失败信息,'info'是普通信息  
function ShowTip(tip, type) {
    var $tip = $('#tip');
    if ($tip.length == 0) {
        $tip = $('<span id="tip" style="font-weight:bold;position:absolute;top:50%;left: 50%;z-index:9999"></span><button>ok</button>');
        $('body').append($tip);
    }
    $tip.stop(true).attr('class', 'alert alert-' + type).text(tip).css('margin-left', -$tip.outerWidth() / 2).fadeIn(500).delay(3000).fadeOut(500);
}
//tip始终显示在屏幕上方top：50px  
function ShowTipAlwaysInTheMiddle(tip, type) {
    /*var $left=document.body.clientWidth/2; 
    var $top=document.body.clientHeight/2; 
    alert($left+","+$top);*/
    var $tip = $('#tip');
    if ($tip.length == 0) {
        $tip = $('<span id="tip" style="font-weight:bold;position:fixed;top:50px;left:50%;z-index:9999"></span>');
        $('body').append($tip);
    }
    $tip.stop(true).attr('class', 'alert alert-' + type).text(tip).css('margin-left', -$tip.outerWidth() / 2).fadeIn(500).delay(3000).fadeOut(500);
}
function ShowMsg(msg) {
    ShowTip(msg, 'info');
}
function ShowMiddle(msg) {
    ShowTipAlwaysInTheMiddle(msg, 'info');
}
function ShowSuccess(msg) {
    ShowTip(msg, 'success');
}

function ShowFailure(msg) {
    ShowTip(msg, 'danger');
}

function ShowWarn(msg, $focus, clear) {
    ShowTip(msg, 'warning');
    if ($focus) $focus.focus();
    if (clear) $focus.val('');
    return false;
}

  

 
