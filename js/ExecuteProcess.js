var lastProcess=null;

function executeProcess(process)
{
    lastProcess = process;

    var body = $("#executingProcess").clone();
    var mainContainer = $("#mainContainer");

    /*Display Loading */
    $(mainContainer).empty();
    var loading =  $("#loading").clone();
    $(loading).removeAttr("id");
    mainContainer.append(loading);

    $(body).removeAttr("id");
    $(body).hide();

    mainContainer.append(body);

    $(body).find(".processTitle").html(process.id+" - "+process.name);

    var purposeTemplate = $("#processPurposeTemplate");
    var criteriaTemplate = $("#processCriteriaTemplate");

    if(process.execution)
    {
        for(var i=0; i<6; i++)
        {
            var level0PurposeWrapper =  $(body).find(".executionLevel"+i);

            process.execution["level"+i].forEach(function (levelData) {

                var purposeWrapper = $(purposeTemplate).clone();

                $(purposeWrapper).removeAttr("id");
                //$(purposeWrapper).find(".purposeTitle").html(levelData.title);
                $(purposeWrapper).find(".purposeTitle").val(levelData.title);

                var purposeCriteriaWrapper = $(purposeWrapper).find(".processCriteriaWrapper");

                levelData.criteria.forEach(function (purposeCriteria) {

                    var criteriaWrapper = $(criteriaTemplate).clone();
                    $(criteriaWrapper).removeAttr("id");

                    $(criteriaWrapper).find(".processCriteria").val(purposeCriteria.title);
                    $(criteriaWrapper).find(".processCompleted").attr("checked", purposeCriteria.completed);

                    purposeCriteriaWrapper.append(criteriaWrapper);
                });

                level0PurposeWrapper.append(purposeWrapper);


            });
        }
    }

    $(body).find(".collapsible").collapsible();
    $(loading).remove();
    $(body).show();

}


function saveProcessExec()
{
    var mainContainer = $("#mainContainer");
    var execution = Array();

    for(var i=0; i<6; i++)
    {
        var purposeLevelWrapper =  $(mainContainer).find(".executionLevel"+i);
        var purposeWrapper = $(purposeLevelWrapper).find(".processPurposeWrapper");

        var purpose = Array();

        $(purposeWrapper).each(function () {

            //var purposeTitle = $(this).find(".purposeTitle").html();
            var purposeTitle = $(this).find(".purposeTitle").val();
            var criteria = Array();

            $(this).find(".processCriteriaFormWrapper").each(function () {

                var completed = $(this).find(".processCompleted").prop("checked");

                criteria.push({

                    "title" : $(this).find(".processCriteria").val(),
                    "completed" : completed
                });

            });

            purpose.push({
                "title" : purposeTitle,
                "criteria" : criteria
            });

        });

        execution["level"+i] = purpose;
    }

    var levelsCompletionPercentage = getExecutionPercentage(execution);

    //Updating process assessment
    for(var i=0; i<6; i++)
        lastProcess.assessment["level"+i] = getCompletionLevel(levelsCompletionPercentage[i]);

    //Updating process
    lastProcess.execution = execution;

    //Searching process for db update
    cobitProcessList.forEach(function (cProcess) {

        if(cProcess.id == lastProcess.id)
            cProcess = lastProcess;
    });

    //updating db
    firebase.database().ref('/cobitProcesses').set(cobitProcessList);

    M.toast({html: 'Guardado'});
}


function getExecutionPercentage(execution)
{
    var levelPercentage = Array();

    for(var i=0; i<6; i++)
    {
        if(!levelPercentage[i])
            levelPercentage[i] = 0;

        var criteriaCompleted = 0;
        var criteriaAmt = 0;

        execution["level"+i].forEach(function (purpose) {

            purpose.criteria.forEach(function (criteria) {

                criteriaAmt++;

                if(criteria.completed == true)
                    criteriaCompleted++;

            });

        });

        levelPercentage[i] = ((criteriaCompleted*100)/(criteriaAmt));
    }

    return levelPercentage;
}

function getCompletionLevel(percentage)
{
    if(percentage>=0 && percentage<=15)
        return "N";
    else if(percentage>15 && percentage<=50)
        return "P";
    else if(percentage>50 && percentage<=85)
        return "L";
    else if(percentage>85 && percentage<=100)
        return "F";
    else
        return "N";
}

function buildExecutionReport()
{
    renderExecutionReport(getExecutionPercentage(lastProcess.execution));
}