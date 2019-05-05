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
    mainContainer.append(body);

    $(body).hide();

    $(body).find(".processTitle").html(process.id+" - "+process.name);

    var activityGroupWrapper = $(body).find(".processActivityGroupsWrapper");

    if(process.activityGroups)
    {
        var optionsWrapper = $("#processDependenciesTemplate").find("select.processDependency");
        var domainGroup = Array();

        //first populate select
        cobitProcessList.forEach(function (process) {

            if(domainGroup[process.domain] == null)
            {
                var domainTitle;

                switch(process.domain)
                {
                    case 1: domainTitle = "Evaluar, Orientar y Supervisar"; break;
                    case 2: domainTitle = "Alinear, Planificar y Organizar"; break;
                    case 3: domainTitle = "Construir, Adquirir e Implementar"; break;
                    case 4: domainTitle = "Entrega, Servicio y Soporte"; break;
                    case 5: domainTitle = "Supervisar, Evaluar y Valorar"; break;
                }

                domainGroup[process.domain] = $("<optgroup></optgroup>");
                $(domainGroup[process.domain]).attr("label", domainTitle);
                optionsWrapper.append(domainGroup[process.domain]);
            }

            var option = $("<option></option>");
            $(option).attr("value", process.id);
            $(option).html(process.id+" - "+process.name);

            domainGroup[process.domain].append(option);
        });

        process.activityGroups.forEach(function (activityGroup, index) {

            var groupTemplate = $("#processEvalGroupTemplate").clone();
            $(groupTemplate).removeAttr("id");

            $(groupTemplate).find(".activityGroupTitle").html(process.id+"."+(index+1));

            activityGroup.dependencies.forEach(function (dependency) {

                var dependenciesWrapper = $(groupTemplate).find(".dependenciesWrapper");
                var dependencyFormTemplate = $("#processDependenciesTemplate").clone();
                $(dependencyFormTemplate).removeAttr("id");

                $(dependencyFormTemplate).find(".processDependency").val(dependency);
                dependenciesWrapper.append(dependencyFormTemplate);
            });

            activityGroup.activities.forEach(function (activity, index) {

                var activitiesWrapper = $(groupTemplate).find(".activitiesWrapper");
                var activityFormTemplate = $("#processActivitiesTemplate").clone();
                $(activityFormTemplate).removeAttr("id");

                $(activityFormTemplate).find(".processActivityTitle").val($(activityFormTemplate).find(".processActivityTitle").val()+" "+(index+1)+":");

                $(activityFormTemplate).find(".processActivity").val(activity);
                activitiesWrapper.append(activityFormTemplate);
            });

            activityGroupWrapper.append(groupTemplate);
        })
    }

    $(mainContainer).find(".collapsible").collapsible();
    $(mainContainer).find('select').formSelect();
    M.updateTextFields();
    $(loading).remove();
    $(body).show();
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
                activities.push($(this).find(".processActivity").val());
            });

        });

        activityGroups.push({
            "dependencies" : dependencies,
            "activities" : activities
        });
    });

    var updateIndex = null;

    //Searching process for db update
    cobitProcessList.forEach(function (cProcess, index) {

        if(cProcess.id == lastEvaluatedProcess.id) {
            cProcess.activityGroups = activityGroups;
            updateIndex = index;
        }

    });

    //updating db
    if(updateIndex==null)
        firebase.database().ref('/cobitProcesses').set(cobitProcessList);
    else
        firebase.database().ref('/cobitProcesses/'+updateIndex+"/activityGroups").set(activityGroups);

    M.toast({html: 'Guardado'});
}

