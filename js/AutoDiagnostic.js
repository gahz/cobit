var buildAutoDiagnosticPanel = function()
{
    var body = $("#AutoDiagnostic");
    var mainContainer = $("#mainContainer");

    $(body).removeAttr("id");

    $(mainContainer).empty();
    mainContainer.append(body);
/*
    populateAutoDiagnosticData(function(){

        Object.keys(autoDiagnosticData).forEach(function(key){
            $("#"+key).val(autoDiagnosticData[key]);
        });

        $("#mainContainer").find('select').formSelect();
        M.updateTextFields();
    });
*/
    $("#mainContainer").find(".collapsible").collapsible();
};

var hideAutoDiagnosticPanel = function()
{
    var body = $("#mainContainer").children();
    var mainContainer = $("#AutoDiagnosticWrapper");

    $(body).attr("id", "AutoDiagnostic");
    mainContainer.append(body);
};

function saveAutoDiagnosticData()
{
/*
    Object.keys(autoDiagnosticData).forEach(function(key){

        if($("#"+key).prop('tagName').toLowerCase() == "select")
            autoDiagnosticData[key] = valOrParam($("#"+key).find("option:selected"), "");
        else
            autoDiagnosticData[key] = valOrParam($("#"+key), "");
    });

    //pushing updated data to DB
    firebase.database().ref('/AutoDiagnostic').set(autoDiagnosticData);
*/
    M.toast({html: 'Guardado'})
}