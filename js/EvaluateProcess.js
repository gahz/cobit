var lastEvaluatedProcess=null;

function evaluateProcess(process)
{
    lastEvaluatedProcess = process;

    var body = $("#evaluatingProcess").clone();
    var mainContainer = $("#mainContainer");
    var loading =  $("#loading").clone();

    $(loading).removeAttr("id");
    $(body).removeAttr("id");

    $(mainContainer).empty();
    mainContainer.append(loading);
    mainContainer.append(body);

    $(body).hide();

    $(body).find(".processTitle").html(process.id+" - "+process.name);

    var activityGroupWrapper = $(body).find(".processActivityGroupsWrapper");

    var imageDescriptorTemplate = $("#processDescriptorTemplate");
    loadImageDescriptors(1, imageDescriptorTemplate, $(body).find(".processActivitiesDescription"), process.id, function () {

        if(process.activityGroups)
        {
            process.activityGroups.forEach(function (activityGroup, index) {

                var groupTemplate = $("#processEvalGroupTemplate").clone();
                $(groupTemplate).removeAttr("id");

                $(groupTemplate).find(".activityGroupTitle").html(process.id+"."+(index+1));

                if(activityGroup.dependencies)
                {
                    activityGroup.dependencies.forEach(function (dependency) {

                        var dependenciesWrapper = $(groupTemplate).find(".dependenciesWrapper");
                        var dependencyFormTemplate = $("#processDependenciesTemplate").clone();
                        $(dependencyFormTemplate).removeAttr("id");

                        $(dependencyFormTemplate).find(".processDependency").val(dependency);
                        dependenciesWrapper.append(dependencyFormTemplate);
                    });
                }

                if(activityGroup.activities)
                {
                    activityGroup.activities.forEach(function (activity, index) {

                        var activitiesWrapper = $(groupTemplate).find(".activitiesWrapper");
                        var activityFormTemplate = $("#processActivitiesTemplate").clone();
                        $(activityFormTemplate).removeAttr("id");

                        $(activityFormTemplate).find(".processActivityTitle").val($(activityFormTemplate).find(".processActivityTitle").val() + " " + (index + 1) + ":");

                        $(activityFormTemplate).find(".processActivity").val(activity);
                        activitiesWrapper.append(activityFormTemplate);
                    });
                }

                activityGroupWrapper.append(groupTemplate);
            })
        }

        $(mainContainer).find(".collapsible").collapsible();
        $(mainContainer).find('select').formSelect();
        M.updateTextFields();
        $(loading).remove();
        $(body).show();

    });

}

function loadImageDescriptors(index, template, wrapper, processId, keepGoing)
{
    console.log("procesos/"+processId+"-"+index+".png");

    checkImage("procesos/"+processId+"-"+index+".png", function () {

        var imgTemplate = $(template).clone();
        $(imgTemplate).removeAttr("id");

        $(imgTemplate).find("img").attr("src", "procesos/"+processId+"-"+index+".png");
        wrapper.append(imgTemplate);

        loadImageDescriptors(index+1, template, wrapper, processId, keepGoing);

    }, function () {

        keepGoing();

    });
}

function checkImage(imageSrc, good, bad) {
    var img = new Image();
    img.onload = good;
    img.onerror = bad;
    img.src = imageSrc;
}

function deleteActivityEvaluation(el) {
    $(el).parent().parent().remove();
}

function deleteActivityGroup(el) {
    $(el).parent().parent().parent().parent().remove();
}

function saveProcessActivityEvaluation()
{
    var mainContainer = $("#mainContainer");
    var activityGroups = Array();
    var activityResultAcumulator = 0;
    var activityResultCounter = 0;

    if(lastEvaluatedProcess==null)
        return 1;

    $(mainContainer).find(".processEvaluationGroup").each(function () {

        var dependencies = Array();
        var activities = Array();

        $(this).find(".dependenciesWrapper").each(function () {

            $(this).find(".processDependencyForm").each(function () {
                dependencies.push($(this).find(".processDependency").val());
            });

        });

        $(this).find(".activitiesWrapper").each(function () {

            $(this).find(".processActivityForm").each(function () {
                var activityResult = $(this).find(".processActivity").val();

                activityResultAcumulator += parseInt(activityResult);
                activityResultCounter++;

                activities.push(activityResult);
            });

        });

        activityGroups.push({
            "dependencies" : dependencies,
            "activities" : activities
        });
    });

    var updateIndex = null;
    var evaluationResult = (activityResultAcumulator/activityResultCounter);

    console.log(activityResultAcumulator);
    console.log(activityResultCounter);

    //Searching process for db update
    cobitProcessList.forEach(function (cProcess, index) {

        if(cProcess.id == lastEvaluatedProcess.id) {
            cProcess.activityGroups = activityGroups;
            cProcess.evaluationResult = evaluationResult;
            updateIndex = index;
        }

    });

    //updating db
    if(updateIndex==null) {
        firebase.database().ref('/cobitProcesses').set(cobitProcessList);
    }else{
        firebase.database().ref('/cobitProcesses/' + updateIndex + "/activityGroups").set(activityGroups);
        firebase.database().ref('/cobitProcesses/' + updateIndex + "/evaluationResult").set(evaluationResult);
    }

    M.toast({html: 'Guardado'});
}

function buildEvaluationReport()
{
    renderEvaluationIndividualReport(lastEvaluatedProcess);
}