var buildITCompanyGoalsPanel = function()
{
    var body = $("#ITGoals").clone();
    var mainContainer = $("#mainContainer");

    /*Display Loading */
    $(mainContainer).empty();
    var loading =  $("#loading").clone();
    $(loading).removeAttr("id");
    mainContainer.append(loading);

    $(body).removeAttr("id");
    $(body).hide();

    mainContainer.append(body);

    var ITGoalTemplate = $("#ITGoalWrapperTemplate");
    var ITGoalWrapper = $(mainContainer).find("#ITGoalsDescription");

    populateCobitProcessList(function (cobitPorcesses) {

        var optionsWrapper = $("#ITGoalCobitProcessTemplate").find("select.processList");
        var domainGroup = Array();

        //first populate select
        cobitPorcesses.forEach(function (process) {

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

        cobitProcessList=cobitPorcesses;

        populateITGoalsDefinitionData(function (ITGoals){

            ITGoals.forEach(function (ITGoal) {

                var template = $(ITGoalTemplate).clone();
                $(template).removeAttr("id");

                $(template).find(".ITGoalTitle").html(ITGoal.name);
                $(template).find(".ITGoalID").val(ITGoal.id);
                $(template).find(".ITGoalName").val(ITGoal.name);

                ITGoalWrapper.append(template);

                if(ITGoal.processes)
                {
                    ITGoal.processes.forEach(function (goalProcess) {
                        addCobitProcess(template, goalProcess);
                    });
                }

            });

            ITGoalsData = ITGoals;

            $(loading).remove();
            $(mainContainer).find(".collapsible").collapsible();
            $(mainContainer).find('select').formSelect();
            M.updateTextFields();
            $(body).show();
        });
    });

};

var hideITCompanyGoalsPanel = function()
{
    $("#mainContainer").empty();
    //var body = $("#mainContainer").children();
    //var mainContainer = $("#ITGoalsWrapper");

    //$(body).attr("id", "ITGoals");
    //mainContainer.append(body);
};


function addNewCobitProcess(el)
{
    addCobitProcess($(el).parent(), null);
    $("#mainContainer").find('select').formSelect();
}

function addCobitProcess(el, process)
{
    var wrapper = $(el).find(".processesWrapper");
    var template = $("#ITGoalCobitProcessTemplate").clone();

    $(template).removeAttr("id");

    if(process)
    {
        $(template).find(".processList").val(process.idProcess);
        $(template).find(".priority").val(process.priority);
    }

    wrapper.append(template);
}

function removeCobitProcess(el)
{
    $(el).parent().parent().remove();
}

function saveITGoalsData()
{
    var goalsWrappers = $("#mainContainer").find(".ITGoalWrapper");
    var ITGoals = Array();

    $(goalsWrappers).each(function () {

        var processWrappers = $(this).find(".ITGoalCobitProcess");
        var ITGoalsProcesses = Array();

        $(processWrappers).each(function () {

            ITGoalsProcesses.push({
                "idProcess" : $(this).find(".processList").val(),
                "priority" : $(this).find(".priority").val()
            });

        });

        ITGoals.push({
            "id": $(this).find(".ITGoalID").val(),
            "name": $(this).find(".ITGoalName").val(),
            "processes" : ITGoalsProcesses
        });

    });

    ITGoalsData = ITGoals;
    //pushing updated data to DB
    firebase.database().ref('/ITGoals').set(ITGoals);

    M.toast({html: 'Guardado'})
}