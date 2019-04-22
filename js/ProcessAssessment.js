var buildProcessAssessmentPanel = function()
{
    var body = $("#processAssessment").clone();
    var mainContainer = $("#mainContainer");

    /*Display Loading */
    $(mainContainer).empty();
    var loading =  $("#loading").clone();
    $(loading).removeAttr("id");
    mainContainer.append(loading);

    $(body).removeAttr("id");
    $(body).hide();

    mainContainer.append(body);

    var processAssessmentTemplate = $("#processAssessmentTemplate");

    //build processList
    var activeProcessList = Array();

    populateITGoalsDefinitionData(function(ITGoals) {

        ITGoalsData = ITGoals;

        ITGoals.forEach(function (ITGoal) {

            if(ITGoal.processes)
            {
                ITGoal.processes.forEach(function (ITGoalProcess) {
                    activeProcessList.push(ITGoalProcess.idProcess);
                });
            }

        });

        populateCobitProcessList(function(processList){

            processList.forEach(function (process) {

                if(activeProcessList.includes(process.id))
                {
                    var template = processAssessmentTemplate.clone();
                    $(template).removeAttr("id");

                    var wrapper = $(body).find(".PADomainWrapper_"+process.domain);

                    $(template).find(".processId").val(process.id);
                    $(template).find(".processName").val(process.name);

                    if(process.assessment !=null)
                    {
                        $(template).find(".evaluatedLevel").val(process.assessment.evaluatedLevel);
                        $(template).find(".goalLevel").val(process.assessment.goalLevel);
                        $(template).find(".level0").val(process.assessment.level0);
                        $(template).find(".level1").val(process.assessment.level1);
                        $(template).find(".level2").val(process.assessment.level2);
                        $(template).find(".level3").val(process.assessment.level3);
                        $(template).find(".level4").val(process.assessment.level4);
                        $(template).find(".level5").val(process.assessment.level5);
                    }

                    validateFieldsLabelIds($(template).find(".processName"), process.id+"_name");
                    validateFieldsLabelIds($(template).find(".evaluatedLevel"), process.id+"_evaluatedLevel");
                    validateFieldsLabelIds($(template).find(".goalLevel"), process.id+"_goalLevel");
                    validateFieldsLabelIds($(template).find(".level0"), process.id+"_level0");
                    validateFieldsLabelIds($(template).find(".level1"), process.id+"_level1");
                    validateFieldsLabelIds($(template).find(".level2"), process.id+"_level2");
                    validateFieldsLabelIds($(template).find(".level3"), process.id+"_level3");
                    validateFieldsLabelIds($(template).find(".level4"), process.id+"_level4");
                    validateFieldsLabelIds($(template).find(".level5"), process.id+"_level5");

                    wrapper.append(template);
                }

            });

            cobitProcessList = processList;
            $(loading).remove();
            $(body).show();
            M.updateTextFields();
            $("#mainContainer").find('select').formSelect();
            $("#mainContainer").find(".collapsible").collapsible();
        });

    });

};

function validateFieldsLabelIds(el, id)
{
    $(el).attr("id", "processAssessment_"+id);
    $(el).parent().find("label").attr("for", "processAssessment_"+id);
}

var hideProcessAssessmentPanel = function()
{
    $("#mainContainer").empty();
};

function saveAssessmentData()
{

    var processListAssessment = Array();

    for(i=1; i<6; i++)
    {
        $("#mainContainer").find(".PADomainWrapper_"+i).find(".processAssess").each(function () {

            processListAssessment.push({

                "id" : $(this).find(".processId").val(),
                "assessment" : {
                    "evaluatedLevel" : $(this).find(".evaluatedLevel").val(),
                    "goalLevel": $(this).find(".goalLevel").val(),
                    "level0" : $(this).find(".level0").val(),
                    "level1" : $(this).find(".level1").val(),
                    "level2" : $(this).find(".level2").val(),
                    "level3" : $(this).find(".level3").val(),
                    "level4" : $(this).find(".level4").val(),
                    "level5" : $(this).find(".level5").val()
                }

            });

        });
    }

    processListAssessment.forEach(function (processAssessment) {

        cobitProcessList.forEach(function (cobitProcess) {

            if(cobitProcess.id == processAssessment.id)
                cobitProcess.assessment = processAssessment.assessment;

        });

    });

    //pushing updated data to DB
    firebase.database().ref('/cobitProcesses').set(cobitProcessList);

    M.toast({html: 'Guardado'})
}