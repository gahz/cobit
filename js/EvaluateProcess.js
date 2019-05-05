var lastEvaluatedProcess=null;

function evaluateProcess(process, activityGroupIndex)
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

                if(activityGroupIndex!=null && activityGroupIndex==index)
                    $(groupTemplate).addClass("active");


                $(groupTemplate).find(".activityGroupTitle").html(process.id+"."+(index+1));

                var fillable = true;

                if(activityGroup.dependencies)
                {
                    var dependencyAcumulator = 0;
                    var dependencyCounter = 0;

                    activityGroup.dependencies.forEach(function (dependency) {

                        dependencyCounter++;
                        dependencyAcumulator += getDependencyResult(dependency);

                        var dependenciesWrapper = $(groupTemplate).find(".dependenciesWrapper");
                        var dependencyFormTemplate = $("#processDependenciesTemplate").clone();
                        $(dependencyFormTemplate).removeAttr("id");

                        //$(dependencyFormTemplate).find(".processDependency").val(dependency);
                        $(dependencyFormTemplate).find(".processDependency").html(dependency);
                        $(dependencyFormTemplate).find(".processDependency").click(function () {

                            var dependencyData = dependency.split(".");
                            var processId = dependencyData[0];
                            var activityGroupIndex = dependencyData[1];

                            cobitProcessList.forEach(function (cProcess) {

                                if(cProcess.id==processId)
                                    evaluateProcess(cProcess, activityGroupIndex);

                            });
                        });
                        
                        dependenciesWrapper.append(dependencyFormTemplate);
                    });

                    if((dependencyAcumulator/dependencyCounter)<75)
                        fillable=false;
                }

                if(activityGroup.activities)
                {
                    activityGroup.activities.forEach(function (activity, index) {

                        var activitiesWrapper = $(groupTemplate).find(".activitiesWrapper");
                        var activityFormTemplate = $("#processActivitiesTemplate").clone();
                        $(activityFormTemplate).removeAttr("id");

                        $(activityFormTemplate).find(".processActivityTitle").val($(activityFormTemplate).find(".processActivityTitle").val() + " " + (index + 1) + ":");
                        $(activityFormTemplate).find(".processActivity").val(activity);

                        if(!fillable)
                            $(activityFormTemplate).find(".processActivity").attr("disabled", true);

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

function getDependencyResult(dependency)
{
    var dependencyData = dependency.split('.');
    var processId = dependencyData[0];
    var activityGroupIndex = dependencyData[1];
    var acumulator = 0;
    var counter = 0;

    cobitProcessList.forEach(function (process) {
        if(process.id == processId)
        {
            var activityGroup = process.activityGroups[activityGroupIndex];

            if(activityGroup)
            {
                activityGroup.activities.forEach(function (activity) {

                    counter++;
                    acumulator += parseInt(activity);
                });

            }
        }
    });

    if(counter>0)
        return (acumulator/counter);
    else
        return 0;
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

function addActivity(el)
{
    var activitiesWrapper = $(el).parent().parent().parent().find(".activitiesWrapper");
    var activityFormTemplate = $("#processActivitiesTemplate").clone();
    $(activityFormTemplate).removeAttr("id");

    $(activityFormTemplate).find(".processActivity").val("0");

    activitiesWrapper.append(activityFormTemplate);
}

function addDependency(el)
{
    var dependenciesWrapper = $(el).parent().parent().parent().find(".dependenciesWrapper");
    var dependencyFormTemplate = $("#processDependenciesTemplate").clone();
    $(dependencyFormTemplate).removeAttr("id");

    $(dependencyFormTemplate).find(".processDependency").val("");

    dependenciesWrapper.append(dependencyFormTemplate);
}