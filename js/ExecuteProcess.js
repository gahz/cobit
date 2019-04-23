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
                $(purposeWrapper).find(".purposeTitle").html(levelData.title);

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
    var assessment = Array();

    for(var i=0; i<6; i++)
    {
        var purposeLevelWrapper =  $(mainContainer).find(".executionLevel"+i);
        var purposeWrapper = $(purposeLevelWrapper).find(".processPurposeWrapper");

        var purpose = Array();

        $(purposeWrapper).each(function () {

            var purposeTitle = $(this).find(".purposeTitle").html();
            var criteria = Array();

            var totalCriterias=0;
            var totalCompletedCriterias=0;

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

//        var levelAssesment = (totalCompletedCriterias*100)/totalCriterias;

//        if(levelAssesment>)


    }

    cobitProcessList.forEach(function (cProcess) {

        if(cProcess.id == lastProcess.id)
            cProcess.execution = execution;
    });

    firebase.database().ref('/cobitProcesses').set(cobitProcessList);

    M.toast({html: 'Guardado'});
}