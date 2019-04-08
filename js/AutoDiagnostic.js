var buildAutoDiagnosticPanel = function()
{
    var body = $("#AutoDiagnostic");
    var mainContainer = $("#mainContainer");

    $(body).removeAttr("id");

    $(mainContainer).empty();
    mainContainer.append(body);

    populateAutoDiagnosticData(function(){

        Object.keys(autoDiagnosticData).forEach(function(key){
            $("#"+key).val(autoDiagnosticData[key]);
        });

    });

    M.updateTextFields();

    $("#mainContainer").find(".collapsible").collapsible();
    $("#mainContainer").find('select').formSelect();
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


}