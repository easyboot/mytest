
function GetPageUserRoleAuthority()
{

}

function GetUserRolesAuthority(RolesID) {

    if (RolesID == null || RolesID == "") {
        alert('无权访问!请重新登录!')
        window.location.href = '/login/login';
    }

    var url = "/Authority/GetSoftwareRolesAuthority?RolesID=" + RolesID;
    $.ajax({
        url: url,
        async: false,
        type: "POST",
        contentType: "application/json",
        // data: param,
        success: function (data) {
            console.log(RolesID)
            console.log(data)

            var objData = JSON.parse(data)
            if (objData.length > 0) {
                for (var x = 0 ; x < objData.length; x++) {
                    var s = objData[x].CheckboxAuthorityName;

                    var patt1 = new RegExp("Visable");

                    if (patt1.test(s)) {
                        console.log('set visable ' + objData[x].AuthorityName + '  ' + objData[x].Authority)
                        if (objData[x].Authority == '0') {
                            $('#' + objData[x].AuthorityName).show();
                        } else {
                            $('#' + objData[x].AuthorityName).hide();
                        }
                    }
                    else {
                        if (objData[x].Authority == '0') {
                            $('#' + objData[x].AuthorityName).attr("disabled", false);
                            //$('div#' + objData[x].AuthorityName).attr("disabled", false);
                            $('.' + objData[x].AuthorityName).attr("disabled", false);
                        } else {
                            $('#' + objData[x].AuthorityName).attr("disabled", true);
                            $('.' + objData[x].AuthorityName).attr("disabled", true);
                            console.log("[" + objData[x].AuthorityName + "]");
                        }
                    }
                }
            }
            else
            {
                alert('无权访问!')
                window.location.href = '/login/login';
            }
        }
    });
}

    function GetDocumentUserRoleAuthority(MenuItem) {
        var url = "/Authority/GetDocumentUserRoleAuthority?MenuItem=" + MenuItem;
        $.ajax({
            url: url,
            async: false,
            type: "POST",
            contentType: "application/json",
            // data: param,
            success: function (data) {
                var objData = JSON.parse(data)
                if (objData.length > 0) {
                    if (objData[0].Visable == 0) {                        
                        $('#divDocument' + MenuItem).show();
                        $('#divMaintance_' + MenuItem).show();
                        $('#liMenuDocument' + MenuItem).show();
                        $('#liMenuMaintance' + MenuItem).show();
                    } else {
                        $('#divDocument' + MenuItem).hide();
                        $('#divMaintance_' + MenuItem).hide();
                        $('#liMenuDocument' + MenuItem).hide();
                        $('#liMenuMaintance' + MenuItem).hide();
                    }

                    var isAdd = true;
                    if (objData[0].Add == 0) { isAdd = false; } else { isAdd = true; }
                    $('#btnDocumentAdd' + MenuItem).attr('disabled', isAdd);

                    var isAddComment = true;
                    if (objData[0].CommentAdd == 0) { isAddComment = false; } else { isAddComment = true; }
                    $('#btnDocumentAddComments' + MenuItem).attr('disabled', isAddComment);

                    if (objData[0].Delete == 0) {

                    } else {
                        SetTableButtonStatus(MenuItem, 'Delete');
                    }

                    if (objData[0].Edit == 0) {

                    } else {
                        SetTableButtonStatus(MenuItem,'Edit');
                    }

                    if (objData[0].Upload == 0) {
                        //  isDisabled = '';

                    } else {
                        SetTableButtonStatus(MenuItem,'Upload');
                    }

                    if (objData[0].CriteriaEdit == 0) {
                    } else {
                        var ColsCount = $("#divDocumentCriteria" + MenuItem + " #TableCriteira").find("tr").find("th").length;
                        var DeleteRowIndex = -1;
                        for (var x = 0 ; x < ColsCount; x++) {
                            var ColTitle = $("#divDocumentCriteria" + MenuItem + " #TableCriteira thead").find("tr").find("th").eq(x).html();   //取得一行中第二个td的值

                            if ($.trim(ColTitle) == 'Edit') {
                                DeleteRowIndex = x;
                            }
                        }
                        if (DeleteRowIndex != -1) {
                            $("#divDocumentCriteria" + MenuItem + " #TableCriteira tbody").find("tr").each(function () {  //循环遍历每一行

                                var Oldstr = $(this).find("td").eq(DeleteRowIndex).html();
                                $(this).find("td").eq(DeleteRowIndex).html(Oldstr.replace(' ', ' disabled '));
                            })
                        }
                    }

                    if (objData[0].CommentDelete == 0) {
                    } else {
                        var ColsCount = $("#divDocumentComments" + MenuItem + " #TableComments").find("tr").find("th").length;
                        var DeleteRowIndex = -1;
                        for (var x = 0 ; x < ColsCount; x++) {
                            var ColTitle = $("#divDocumentComments" + MenuItem + " #TableComments thead").find("tr").find("th").eq(x).html();   //取得一行中第二个td的值

                            if ($.trim(ColTitle) == 'Delete') {
                                DeleteRowIndex = x;
                            }
                        }
                        if (DeleteRowIndex != -1) {
                            $("#divDocumentComments" + MenuItem + " #TableComments tbody").find("tr").each(function () {  //循环遍历每一行

                                var Oldstr = $(this).find("td").eq(DeleteRowIndex).html();
                                $(this).find("td").eq(DeleteRowIndex).html(Oldstr.replace(' ', ' disabled '));
                            })
                        }
                    }
                }
                else
                {
                    $('#divDocument' + MenuItem).hide();
                    $('#divMaintance_' + MenuItem).hide();
                    $('#liMenuDocument' + MenuItem).hide();
                    $('#liMenuMaintance' + MenuItem).hide();
                }
            }
        });
    }

    function SetTableButtonStatus(MenuItem,ButtonName) {
        var ColsCount = $("#Table" + MenuItem + " thead").find("tr").find("th").length;
        var DeleteRowIndex = -1;
        for (var x = 0 ; x < ColsCount; x++) {
            var ColTitle = $("#Table" + MenuItem + " thead").find("tr").find("th").eq(x).html();   //取得一行中第二个td的值
        
            if ($.trim(ColTitle) == ButtonName) {
                DeleteRowIndex = x;
            }
        }

        if (DeleteRowIndex != -1) {
            $("#Table" + MenuItem + " tbody").find("tr").each(function () {  //循环遍历每一行

                var Oldstr = $(this).find("td").eq(DeleteRowIndex).html();
                $(this).find("td").eq(DeleteRowIndex).html(Oldstr.replace(' ', ' disabled '));
            })
        }
    }

    function SetButtonStatus(power, MenuItem) {
        var isDisable = false;
        switch (power) {
            case power.Add:
                if (power.Add == 0) { isDisable = true } else { isDisable = false }
                $('#btnDocumentAdd' + MenuItem).attr('disabled', isDisable);
            case power.CommentAdd:
                if (power.CommentAdd == 0) { isDisable = true } else { isDisable = false }
                $('#btnDocumentAddComments' + MenuItem).attr('disabled', isDisable);
        }
    }