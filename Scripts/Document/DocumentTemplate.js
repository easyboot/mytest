function GetTemplateID() {
    var TemplateObj = {
        statusCode: 0,
        TemplateID: ""
    }

    var TemplateID = $('#selDocumentTemplate').val();

    if (TemplateID.length < 2) {
        TemplateObj.TemplateID = TemplateID;
        TemplateObj.statusCode = 1

        ShowMsg('Please Select one Template!');

    }
    else {
        TemplateObj.TemplateID = TemplateID;
        TemplateObj.statusCode = 0
    }

    return TemplateObj;
}