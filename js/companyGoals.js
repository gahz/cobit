var buildCompanyGoalsPanel = function()
{
    var body = $("#companyGoals");
    var mainContainer = $("#mainContainer");

    $(body).removeAttr("id");

    $(mainContainer).empty();
    mainContainer.append(body);
/*
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
*/
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
/*
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
*/
    M.toast({html: 'Guardado'})
}


function addGoal(el, tab)
{
    var wrapper = $(el).parent().find("ul");
    var template = $("#goalTemplate").clone();

    //Getting amount of goals for id generation
    var goalSequence = $(wrapper).find("li").length+1;

    //Generating id and for, so the label of the fields can work properly
    var goalNameForm = $(template).find(".goalName").parent();
    $(goalNameForm).find("input").attr("id", tab+"-"+goalSequence+"-goalName");
    $(goalNameForm).find("label").attr("for", tab+"-"+goalSequence+"-goalName");

    //Removing templates id attribute
    $(template).removeAttr("id");

    //Adding template to wrapper
    wrapper.append(template);

    $("#mainContainer").find(".collapsible").collapsible();
}

function updateGoalTitle(el)
{
    $(el).parent().parent().parent().parent().find(".goalTemplateTitle").html($(el).val());
}

function addITGoalRelation(el)
{
    var wrapper = $(el).parent().find(".relationsWrapper");
    var template = $("#ITGoalRelationTemplate").clone();
    $(template).removeAttr("id");
}
