var buildITCompanyGoalsPanel = function()
{
    var body = $("#ITGoals");
    var mainContainer = $("#mainContainer");

    $(body).removeAttr("id");

    $(mainContainer).empty();
    mainContainer.append(body);

    populateITGoalsData(function(){

        Object.keys(ITGoalsData).forEach(function(key){
            $("#"+key).val(ITGoalsData[key]);
        });

    });

    M.updateTextFields();
    $("#mainContainer").find(".collapsible").collapsible();
    $("#mainContainer").find('select').formSelect();
};

var hideITCompanyGoalsPanel = function()
{
    var body = $("#mainContainer").children();
    var mainContainer = $("#ITGoalsWrapper");

    $(body).attr("id", "ITGoals");
    mainContainer.append(body);
};

function saveITGoalsData()
{

}