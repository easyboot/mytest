/// <reference path="DocumentReviewBy.js" />

function SaveDocumentComments() {
    var Action = $('#txtDocumentCommentsAction1').val();
    switch (Action) {
        case 'Add':
            InsertDocumentComments();
            break;
        case 'Edit':
            UpdateDocumentComments();
            break;
    }
}

function InsertDocumentComments() {
    var VerificationType = $('#txtDocumentCommentsVerificationType1').val();
    var TemplateID       = $('#selDocumentTemplate').val();
    var Comments         = $('#txtDocumentComments1').val();

    var obj = GetTemplateID();
    if (obj.statusCode != 0) { return; } else { var TemplateID = obj.TemplateID }

    //if (Comments.length < 10) {
    //    alert('Please Input Comments mix 10 length!');
    //    return;
    //}
    //var url = "/Document/InsertDocumentComments?VerificationType=" + VerificationType + "&TemplateID=" + TemplateID + "&Comments=" + Comments;
    var url = "/Document/InsertDocumentComments" ;
    $.ajax({
        url: url,
        async: false,
        type: "POST",
        //contentType: "application/json",
        data: {
            TemplateID: TemplateID,
            VerificationType: VerificationType,
            Comments: Comments 
        },
        success: function (data) {
            var objData = JSON.parse(data) 
            if (objData.statusCode != '0') {
                alert(objData.statusMessage)
                $('#txtDocumentComments1').select();
            } else {
                GetDocumentComments(VerificationType);
                $('#txtDocumentComments1').val('');
            }
        }
    });
}

function GetDocumentComments(VerificationType) {
    GetDocumentReviewBy(VerificationType);

    $("#divDocumentComments" + VerificationType + " #TableComments tbody").html('');
    var TemplateID = $('#selDocumentTemplate').val();
    //var url = "/Document/GetDocumentComments?VerificationType=" + VerificationType + "&TemplateID=" + TemplateID;
    var url = "/Document/GetDocumentComments" ;
    $.ajax({
        url: url,
        async: false,
        type: "POST",
        //contentType: "application/json",
        data: {
            TemplateID: TemplateID,
            VerificationType: VerificationType, 
        },
        // data: param,
        success: function (data) {
            var objData = JSON.parse(data) 
            for (var x = 0 ; x < objData.length; x++) {
                var row = "<tr>" +
                              "<td>" + objData[x].ID       + "</td>" +
                              "<td>" + objData[x].Comments + "</td>" +
                              "<td><button class='btn btn-success btn-xs' onclick='EditDocumentComments(&quot;" + objData[x].ID + "&quot;,&quot;" + VerificationType + "&quot;,&quot;" + objData[x].Comments + "&quot;)' data-toggle='modal' data-target='#modal-info-DocumentComments1' >Edit</button></td>" +
                              "<td><button class='btn btn-warning btn-xs' onclick='DeleteDocumentComments(&quot;" + objData[x].ID + "&quot;,&quot;" + VerificationType + "&quot;,&quot;" + objData[x].Comments + "&quot;)'>Delete</button></td>" +
                          "</tr>"; 
                $("#divDocumentComments" + VerificationType + " #TableComments tbody").append(row);
            }
        }
    });
}

function EditDocumentComments(ID, VerificationType, Comments) {
    SetCommentsVerification(VerificationType, 'Edit', ID, Comments); 
}

function UpdateDocumentComments()
{
    var  VerificationType = $('#txtDocumentCommentsVerificationType1').val(); 
    var  ID               = $('#txtDocumentCommentsID1').val();
    var Comments          = $('#txtDocumentComments1').val(); 

    var url = "/Document/UpdateDocumentComments";
    $.ajax({
        url: url,
        async: false,
        type: "POST",
        data: {
            ID: ID,
            Comments: Comments
        },

        success: function (data) {
            var objData = JSON.parse(data)
            if (objData.statusCode != '0') {
                alert(objData.statusMessage)
            } else {
                GetDocumentComments(VerificationType);
            }
        }
    });
}

function DeleteDocumentComments(ID, VerificationType) {
    var url = "/Document/DeleteDocumentComments";
    $.ajax({
        url: url,
        async: false,
        type: "POST",
        data: {
            ID: ID  
        },
        success: function (data) {
            var objData = JSON.parse(data)
            if (objData.statusCode != '0') {
                alert(objData.statusMessage)
            } else {
                GetDocumentComments(VerificationType);
            }
        }
    });
}

function SetCommentsVerification(VerificationType,Action,ID,Comments) {
    $('#txtDocumentCommentsVerificationType1').val(VerificationType);
    $('#txtDocumentCommentsAction1').val(Action);
    $('#txtDocumentCommentsID1').val(ID);
    $('#txtDocumentComments1').val(Comments);
}






