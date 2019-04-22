var buildITGoalsDefinition = function()
{
    var body = $("#ITGoalsDefinition").clone();
    var mainContainer = $("#mainContainer");

    /*Display Loading */
    $(mainContainer).empty();
    var loading =  $("#loading").clone();
    $(loading).removeAttr("id");
    mainContainer.append(loading);

    $(body).removeAttr("id");
    $(body).hide();

    mainContainer.append(body);

    populateITGoalsDefinitionData(function(goalsData){

        goalsData.forEach(function(goal){
            addITGoalDefinition(goal.id, goal.name);
        });

        ITGoalsData = goalsData;

        $(loading).remove();
        $(body).show();
    });

};

var hideITGoalsDefinition = function()
{
    $("#mainContainer").empty();
};

function saveITGoalsDefinition()
{
    var goalForms = $("#mainContainer").find(".ITGoalsDefinitionHolder").find(".ITGoalDefinitionEl").toArray();
    var goals = Array();

    goalForms.forEach(function (goal) {

        goals.push({

            "name" : $(goal).find(".ITGoalName").val(),
            "id" : $(goal).find(".ITGoalID").val(),
            "processes" : Array()

        });
    });

    goals.forEach(function (newGoal) {

        ITGoalsData.forEach(function (oldGoal) {

            if(oldGoal.id == newGoal.id && oldGoal["processes"]!=null)
                newGoal["processes"] = oldGoal["processes"];
        });

    });

    //updating local data
    ITGoalsData = goals;

    //updating remote data
    firebase.database().ref('/ITGoals').set(goals);

    M.toast({html: 'Guardado'})
}

function addNewITGoalDefinition()
{
    var newPostKey = firebase.database().ref().child('ITGoals').push().key;
    addITGoalDefinition(newPostKey, "");
}

function addITGoalDefinition(id, name)
{
    var ITGoalTemplate = $("#ITGoalsDefinitionForm").clone();
    var ITGoalsWrapper = $("#mainContainer").find(".ITGoalsDefinitionHolder");

    $(ITGoalTemplate).removeAttr("id");

    $(ITGoalTemplate).find(".ITGoalID").val(id);

    //use id for label and form
    var nameInputWrapper = $(ITGoalTemplate).find(".ITGoalName").parent();
    nameInputWrapper.find("input").attr("id", "itrg-name-"+id);
    nameInputWrapper.find("label").attr("for", "itrg-name-"+id);
    $(ITGoalTemplate).find(".ITGoalName").val(name);

    ITGoalsWrapper.append(ITGoalTemplate);
    M.updateTextFields();
}

function removeGoalDefinition(el)
{
   $(el).parent().parent().remove();
}