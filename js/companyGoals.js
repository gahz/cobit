var buildCompanyGoalsPanel = function()
{
    var body = $("#companyGoals");
    var mainContainer = $("#mainContainer");

    $(body).removeAttr("id");

    $(mainContainer).empty();
    mainContainer.append(body);

    populateCompanyGoalsData(function(){

        Object.keys(companyGoalsData["cg-fin"]).forEach(function(key){
            $("#"+key).val(companyGoalsData["cg-fin"][key]);
        });

        Object.keys(companyGoalsData["cg-cli"]).forEach(function(key){
            $("#"+key).val(companyGoalsData["cg-cli"][key]);
        });

        Object.keys(companyGoalsData["cg-int"]).forEach(function(key){
            $("#"+key).val(companyGoalsData["cg-int"][key]);
        });

        Object.keys(companyGoalsData["cg-apr"]).forEach(function(key){
            $("#"+key).val(companyGoalsData["cg-apr"][key]);
        });

        M.updateTextFields();
    });

    $("#mainContainer").find(".collapsible").collapsible();
};

var hideCompanyGoalsPanel = function()
{
    var body = $("#mainContainer").children();
    var mainContainer = $("#companyGoalsWrapper");

    $(body).attr("id", "companyGoals");
    mainContainer.append(body);
};


function saveCompanyGoalsData()
{
    //updating data

    Object.keys(companyGoalsData["cg-fin"]).forEach(function(key){
        companyGoalsData["cg-fin"][key] =  valOrParam($("#"+key), "");
    });

    Object.keys(companyGoalsData["cg-cli"]).forEach(function(key){
        companyGoalsData["cg-cli"][key] =  valOrParam($("#"+key), "");
    });

    Object.keys(companyGoalsData["cg-int"]).forEach(function(key){
        companyGoalsData["cg-int"][key] =  valOrParam($("#"+key), "");
    });

    Object.keys(companyGoalsData["cg-apr"]).forEach(function(key){
        companyGoalsData["cg-apr"][key] =  valOrParam($("#"+key), "");
    });

    //pushing updated data to DB
    firebase.database().ref('/companyGoals').set(companyGoalsData);

    M.toast({html: 'Guardado'})
}

