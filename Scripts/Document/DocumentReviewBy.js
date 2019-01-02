function GetDocumentReviewBy(VerificationType) {

    var TemplateID = $('#selDocumentTemplate').val();
    var url = "/Document/GetDocumentReviewed?TemplateID=" + TemplateID + "&VerificationType=" + VerificationType;
    $.ajax({
        url: url,
        async: false,
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            var objData = JSON.parse(data)
            if (objData.length > 0) {
                $("#divReivedBy" + VerificationType + " #txtReviewEmployeeNo").val(objData[0].EmployeeNo);
                $("#divReivedBy" + VerificationType + " #txtReviewEmployeeTitle").val(objData[0].Dept);
                $("#divReivedBy" + VerificationType + " #txtReviewDate").val(objData[0].ReviewDate);
            }
            else {
                $("#divReivedBy" + VerificationType + " #txtReviewEmployeeNo").val('');
                $("#divReivedBy" + VerificationType + " #txtReviewEmployeeTitle").val('');
                $("#divReivedBy" + VerificationType + " #txtReviewDate").val('');
            }
        }
    });

    //更新完ReviewBy 后对Deviation内容也进行更新
    {
        GetDocumentApproved();
        GetDocumentDeviation();
    }

}

function UpdateDocumentReviewBy(VerificationType) {
    var obj = GetTemplateID();
    if (obj.statusCode != 0) { return; } else { var TemplateID = obj.TemplateID }

    var url = "/Document/UpdateDocumentReviewed?TemplateID=" + TemplateID + "&VerificationType=" + VerificationType;
    $.ajax({
        url: url,
        async: false,
        type: "POST",
        contentType: "application/json",
        // data: param,
        success: function (data) {
            var objData = JSON.parse(data);

            if (objData.statusCode == '0') {
                GetDocumentReviewBy(VerificationType);
            }
            else {
                alert(objData.statusMessage);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            /*错误信息处理*/
            console.log('UpdateDocumentReviewBy error')
        }

    });
}