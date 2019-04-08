var buildAutoDiagnosticPanel = function()
{
    var body = $("#AutoDiagnostic");
    var mainContainer = $("#mainContainer");

    $(body).removeAttr("id");

    $(mainContainer).empty();
    mainContainer.append(body);

    //initializing materialize components
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
