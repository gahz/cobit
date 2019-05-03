var buildWelcomePanel = function()
{
    var body = $("#welcomePanel").clone();
    var mainContainer = $("#mainContainer");
    var loading =  $("#loading").clone();

    $(loading).removeAttr("id");
    $(body).removeAttr("id");

    $(mainContainer).empty();
    mainContainer.append(body);

    $(body).hide();

    populateCompanyInfo(function (companyInfo) {

        $(body).find(".infoCompanyName").val(companyInfo.name);
        $(body).find(".infoCompanyMission").val(companyInfo.mission);
        $(body).find(".infoCompanyVision").val(companyInfo.vision);

        companyInformation = companyInfo;

        M.updateTextFields();
        $(loading).remove();
        $(body).show();
    });
};

function saveCompanyInfo()
{
    var body = $("#mainContainer");

    companyInformation.name = $(body).find(".infoCompanyName").val();
    companyInformation.mission = $(body).find(".infoCompanyMission").val();
    companyInformation.vision = $(body).find(".infoCompanyVision").val();

    firebase.database().ref('/companyInfo').set(companyInformation);
    M.toast({html: 'Guardado'});
}

var hideWelcomePanel = function()
{
    $("#mainContainer").empty();
    //var body = $("#mainContainer").children();
    //var mainContainer = $("#welcomePanelWrapper");

    //$(body).attr("id", "welcomePanel");
    //mainContainer.append(body);
};
