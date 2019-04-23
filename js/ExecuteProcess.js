var lastProcess=null;

function executeProcess(process)
{
    lastProcess = process;

    console.log(process);
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
/*
function saveProcessExec()
{
    var mainContainer = $("#mainContainer");

    for(var i=0; i<6; i++)
    {
        var level0PurposeWrapper =  $(body).find(".executionLevel"+i);



        var purposeCriteriaWrapper = $(purposeWrapper).find(".processCriteriaWrapper");

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
}*/