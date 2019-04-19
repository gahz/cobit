var buildITCompanyGoalsPanel = function()
{
    var body = $("#ITGoals");
    var mainContainer = $("#mainContainer");

    $(body).removeAttr("id");

    $(mainContainer).empty();
    mainContainer.append(body);
/*
    populateITGoalsData(function(){

        Object.keys(ITGoalsData).forEach(function(key){
                $("#"+key).val(ITGoalsData[key]);
        });

        $("#mainContainer").find('select').formSelect();
        M.updateTextFields();
    });
*/
    $("#mainContainer").find(".collapsible").collapsible();
    //$("#mainContainer").find('select').formSelect();
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
    /*
    Object.keys(ITGoalsData).forEach(function(key){

        if($("#"+key).prop('tagName').toLowerCase() == "select")
            ITGoalsData[key] = valOrParam($("#"+key).find("option:selected"), "");
        else
            ITGoalsData[key] = valOrParam($("#"+key), "");

    });

    //pushing updated data to DB
    firebase.database().ref('/ITGoals').set(ITGoalsData);
       */
    M.toast({html: 'Guardado'})
}