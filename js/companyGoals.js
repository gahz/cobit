var buildCompanyGoalsPanel = function()
{
    var body = $("#companyGoals");
    var mainContainer = $("#mainContainer");

    $(body).removeAttr("id");

    $(mainContainer).empty();
    mainContainer.append(body);

    //initializing materialize components
    //$("#mainContainer").find(".tabs").tabs();
    $("#mainContainer").find(".collapsible").collapsible();
};

var hideCompanyGoalsPanel = function()
{
    var body = $("#mainContainer").children();
    var mainContainer = $("#companyGoalsWrapper");

    $(body).attr("id", "companyGoals");
    mainContainer.append(body);
};
