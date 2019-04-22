var buildAutoDiagnosticPanel = function()
{
    var body = $("#AutoDiagnostic").clone();
    var mainContainer = $("#mainContainer");

    /*Display Loading */
    $(mainContainer).empty();
    var loading =  $("#loading").clone();
    $(loading).removeAttr("id");
    mainContainer.append(loading);

    $(body).removeAttr("id");
    $(body).hide();

    mainContainer.append(body);

    var processDiagnosticTemplate = $("#processDiagnosticTemplate");

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
                    var template = processDiagnosticTemplate.clone();
                    $(template).removeAttr("id");

                    var wrapper = $(body).find(".domainWrapper_"+process.domain);

                    $(template).find(".processId").val(process.id);
                    $(template).find(".processName").val(process.name);

                    if(process.diagnostic !=null)
                    {
                        $(template).find(".processImportance").val(process.diagnostic.importance);
                        $(template).find(".processPerformance").val(process.diagnostic.performance);
                        $(template).find(".processFormality").val(process.diagnostic.formality);
                        $(template).find(".processAudited").val(process.diagnostic.audited);
                        $(template).find(".processResponsible").val(process.diagnostic.responsible);
                    }

                    validateFieldsLabelIds($(template).find(".processName"), process.id+"_name");
                    validateFieldsLabelIds($(template).find(".processImportance"), process.id+"_importance");
                    validateFieldsLabelIds($(template).find(".processPerformance"), process.id+"_performance");
                    validateFieldsLabelIds($(template).find(".processFormality"), process.id+"_formality");
                    validateFieldsLabelIds($(template).find(".processAudited"), process.id+"_audited");
                    validateFieldsLabelIds($(template).find(".processResponsible"), process.id+"_responsible");

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
    $(el).attr("id", "processDiagnostic_"+id);
    $(el).parent().find("label").attr("for", "processDiagnostic_"+id);
}

var hideAutoDiagnosticPanel = function()
{
    $("#mainContainer").empty();
};

function saveAutoDiagnosticData()
{
    var processListDiagnostic = Array();

    for(i=1; i<6; i++)
    {
        $("#mainContainer").find(".domainWrapper_"+i).find(".processDiagnostic").each(function () {

            processListDiagnostic.push({

                "id" : $(this).find(".processId").val(),
                "diagnostic" : {
                    "importance" : $(this).find(".processImportance").val(),
                    "performance": $(this).find(".processPerformance").val(),
                    "formality" : $(this).find(".processFormality").val(),
                    "audited" : $(this).find(".processAudited").val(),
                    "responsible" : $(this).find(".processResponsible").val()
                }

            });

        });
    }

    processListDiagnostic.forEach(function (processDiagnostic) {

        cobitProcessList.forEach(function (cobitProcess) {

            if(cobitProcess.id == processDiagnostic.id)
                cobitProcess.diagnostic = processDiagnostic.diagnostic;

        });

    });

    //pushing updated data to DB
    firebase.database().ref('/cobitProcesses').set(cobitProcessList);

    M.toast({html: 'Guardado'})
}