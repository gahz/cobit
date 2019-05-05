var buildProcessExecutionPanel = function()
{
    var body = $("#ProcessExecution").clone();
    var mainContainer = $("#mainContainer");

    /*Display Loading */
    $(mainContainer).empty();
    var loading =  $("#loading").clone();
    $(loading).removeAttr("id");
    mainContainer.append(loading);

    $(body).removeAttr("id");
    $(body).hide();

    mainContainer.append(body);

    var processExecutionTemplate = $("#processExecutionTemplate");
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
                    var template = processExecutionTemplate.clone();
                    $(template).removeAttr("id");

                    var wrapper = $(body).find(".PEDomainWrapper_"+process.domain);

                    $(template).find(".processId").val(process.id);
                    $(template).find(".processName").val(process.name);
                    $(template).find(".processExecutor").click(function(){
                       executeProcess(process);
                    });
                    $(template).find(".processEvaluator").click(function(){
                        evaluateProcess(process, null);
                    });

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

var hideProcessExecutionPanel = function()
{
    $("#mainContainer").empty();
};

