var buildCompanyGoalsPanel = function()
{
    var body = $("#companyGoals");
    var mainContainer = $("#mainContainer");

    /*Display Loading */
    $(mainContainer).empty();
    var loading =  $("#loading").clone();
    $(loading).removeAttr("id");
    mainContainer.append(loading);

    $(body).removeAttr("id");
    $(body).hide();

    mainContainer.append(body);

    //ITGoals options
    var optionsWrapper = $("#ITGoalRelationTemplate").find("select");

    populateITGoalsDefinitionData(function (ITGoals){

        //first populate selects
        ITGoals.forEach(function (goal) {

            var option = $("<option></option>");
            $(option).attr("value", goal.id);
            $(option).html(goal.name);

            optionsWrapper.append(option);

        });

        populateCompanyGoalsData(function(companyGoal){

            companyGoalsData = companyGoal;

            companyGoal.forEach(function (goal) {

                var goalElement = addGoal(goal.id, goal.name, goal.category);

                if(goal.ITGoals)
                {
                    //var wrapper = $(goalElement).parent().find(".relationsWrapper");
                    //var template = $("#ITGoalRelationTemplate");
                        //.clone();
                    //$(template).removeAttr("id");


                    goal.ITGoals.forEach(function (ITGoal) {
                        /*
                        var t = $(template).clone();
                        $(t).removeAttr("id");

                        $(t).find("select").val(ITGoal);
                        wrapper.append(t);
                        */
                        addITGoalRelation(goalElement, ITGoal);
                    });
                }

            });

            $(loading).remove();
            $(mainContainer).find(".collapsible").collapsible();
            $(mainContainer).find('select').formSelect();
            $(mainContainer).find('.tabs').tabs('select','cg-fin');
            M.updateTextFields();
            $(body).show();
        });
    });

};

var hideCompanyGoalsPanel = function()
{
    var body = $("#mainContainer").children();
    var mainContainer = $("#companyGoalsWrapper");

    $("#companyGoalCategory_1").empty();

    $("#companyGoalCategory_2").empty();

    $("#companyGoalCategory_3").empty();

    $("#companyGoalCategory_4").empty();

    $(body).attr("id", "companyGoals");
    mainContainer.append(body);
};

function addGoal(id, name, category)
{
    var wrapper = $("#companyGoalCategory_"+category);
    var template = $("#goalTemplate").clone();

    $(template).find(".goalTemplateTitle").html(name);
    $(template).find(".goalID").val(id);
    var goalNameForm = $(template).find(".goalName").val(name);

    //Generating id and for, so the label of the fields can work properly
    var goalNameForm = $(template).find(".goalName").parent();
    $(goalNameForm).find("input").attr("id", id+"-goalName");
    $(goalNameForm).find("label").attr("for", id+"-goalName");

    //Removing templates id attribute
    $(template).removeAttr("id");

    //Adding template to wrapper
    wrapper.append(template);

    return template;
}

function addNewGoal(category)
{
    var newGoalId = firebase.database().ref().child('companyGoals').push().key;
    addGoal(newGoalId, "", category);

    $("#mainContainer").find(".collapsible").collapsible();
}

function updateGoalTitle(el)
{
    $(el).parent().parent().parent().parent().find(".goalTemplateTitle").html($(el).val());
}

function addNewITGoalRelation(el)
{
    addITGoalRelation(el.parent(), null);
    $("#mainContainer").find('select').formSelect();
}

function addITGoalRelation(el, ITGoalId)
{
    var wrapper = $(el).find(".relationsWrapper");
    var template = $("#ITGoalRelationTemplate").clone();
    $(template).removeAttr("id");

    if(ITGoalId)
        $(template).find("select").val(ITGoalId);

    wrapper.append(template);
}

function removeITGoalRelation(el)
{
    $(el).parent().parent().remove();
}

function saveCompanyGoalsData()
{
    //updating data
    var companyGoals = Array();

    $("#companyGoalCategory_1").find(".companyGoalWrapper").each(function () {
        companyGoals.push(getCompanyGoalsData(this, 1));
    });

    $("#companyGoalCategory_2").find(".companyGoalWrapper").each(function () {
        companyGoals.push(getCompanyGoalsData(this, 2));
    });

    $("#companyGoalCategory_3").find(".companyGoalWrapper").each(function () {
        companyGoals.push(getCompanyGoalsData(this, 3));
    });

    $("#companyGoalCategory_4").find(".companyGoalWrapper").each(function () {
        companyGoals.push(getCompanyGoalsData(this, 4));
    });

    companyGoalsData = companyGoals;

    //pushing updated data to DB
    firebase.database().ref('/companyGoals').set(companyGoals);

    M.toast({html: 'Guardado'})
}

function getCompanyGoalsData(CompanyGoalElement, category)
{
    var ITRelatedGoalsId = Array();

    $(CompanyGoalElement).find(".ITGoalRelation").each(function () {
        ITRelatedGoalsId.push($(this).find("select").val());
    });

    var goalData = {
        "id": $(CompanyGoalElement).find(".goalID").val(),
        "name": $(CompanyGoalElement).find(".goalName").val(),
        "category": category,
        "ITGoals": ITRelatedGoalsId
    };

    return goalData;
}