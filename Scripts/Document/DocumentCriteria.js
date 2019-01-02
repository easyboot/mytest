/// <reference path="DocumentReviewBy.js" />

function GetDocumentCriteria(VerificationType) {
 
    GetDocumentReviewBy(VerificationType);

    $("#divDocumentCriteria" + VerificationType + " #TableCriteira tbody").html('');
    var TemplateID = $('#selDocumentTemplate').val();
   // var url = "/Document/GetDocumentCriteria?VerificationType=" + VerificationType + "&TemplateID=" + TemplateID;
    var url = "/Document/GetDocumentCriteria"  ;
    $.ajax({
        url: url,
        async: false,
        type: "POST",
        //contentType: "application/json", 
        data: {
            TemplateID: TemplateID,
            VerificationType: VerificationType 
        },
        success: function (data) {
            var objData = JSON.parse(data) 
            for (var x = 0 ; x < objData.length; x++) {
                var row = "<tr>" +
                              "<td>" + objData[x].ID                 + "</td>" +
                              "<td>" + objData[x].AcceptanceCriteria + "</td>" +
                              "<td>" + objData[x].CriteriaMet        + "</td>" +
                              "<td>" + objData[x].EmployeeInitial    + "</td>" +
                              "<td>" + objData[x].Date               + "</td>" +
                              "<td><button class='btn btn-success btn-xs' data-toggle='modal' data-target='#modal-info-DocumentCriterie'  onclick='SetDocumentCriteriaData(&quot;" + objData[x].ID + "&quot;,&quot;" + objData[x].AcceptanceCriteria + "&quot;,&quot;" + VerificationType + "&quot;,&quot;" + objData[x].CriteriaMet + "&quot;)'>Edit</button></td>" +
                          "</tr>"; 
                $("#divDocumentCriteria" + VerificationType + " #TableCriteira tbody").append(row);
            }
        }
    });
}

function SetDocumentCriteriaData(ID, AcceptanceCriteria, VerificationType, CriteriaMet) {
    $('#txtDocumentCriteriaID1').val(ID);
    $('#txtDocumentAcceptanceCriteria1').val(AcceptanceCriteria);
    $('#txtDocumentVerificationType1').val(VerificationType);

    $('#SelDocumentCriteriaMet1').val(CriteriaMet);
}

function UpdateDocumentCriteria() {
    var TemplateID   = $('#selDocumentTemplate').val();
    var ID           = $('#txtDocumentCriteriaID1').val();
    var CriteriaMet  = $('#SelDocumentCriteriaMet1').val();
    if (CriteriaMet.length < 2) {
        alert('please select one result!');
        return;
    }

    VerificationType = $('#txtDocumentVerificationType1').val();
    //var url = "/Document/UpdateDocumentCriteria?ID=" + ID + "&TemplateID=" + TemplateID + "&CriteriaMet=" + CriteriaMet;
    var url = "/Document/UpdateDocumentCriteria" ;
    $.ajax({
        url: url,
        async: false,
        type: "POST",
        //contentType: "application/json",
        data: {
            ID: ID,
            TemplateID: TemplateID,
            CriteriaMet: CriteriaMet
        },
        // data: param,
        success: function (data) {
            var objData = JSON.parse(data) 
            if (objData.statusCode != '0') {
                alert(objData.statusMessage)
            } else {
                GetDocumentCriteria(VerificationType);
            }
        }
    });
}







