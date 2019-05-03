function doughnutChartRenderer(data, labels, wrapper, datasetLabel, bgColor)
{
    var ctx = document.getElementById(wrapper).getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [
                {
                    label: datasetLabel,
                    //backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                    backgroundColor: bgColor,
                    //borderColor: borderColor,
                    data: data
                }
            ]
        }
    });
}

function barChartRenderer(data, labels, wrapper, datasetLabel, borderColor, bgColor)
{
    var ctx = document.getElementById(wrapper).getContext('2d');

    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: datasetLabel,
                data: data,
                borderColor: borderColor,
                backgroundColor: bgColor
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                    yAxes: [{
                    stacked: true
                }]
            }/*,
            title: {
                display: true,
                text: datasetLabel
            }*/
        }
    });
}

function renderCompanyGoalsMainGraph(data, wrapper)
{
    var ctx = document.getElementById(wrapper).getContext('2d');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Financiera","Cliente", "Interna", "Aprendizaje"],
            datasets: [{
                label: "Cantidad de Metas Corporativas",
                data: [data["1"].length, data["2"].length, data["3"].length, data["4"].length],
                borderColor: ['rgba(0, 0, 192, 1)','rgba(192, 0, 0, 1)','rgba(0, 192, 0, 1)','rgba(176,196,222, 1)'],
                backgroundColor: ['rgba(0, 0, 192, 0.2)', 'rgba(192, 0, 0, 0.2)','rgba(192, 0, 0, 0.2)', 'rgba(176,196,222, 0.2)']
            }]
        },options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}

function renderCompanyGoalsReports()
{
    //companyGoalsData
    var dataGraph = Array();
    var labelsGraph = Array();

    companyGoalsData.forEach(function (companyGoal)
    {
        if(!dataGraph[companyGoal.category])
            dataGraph[companyGoal.category] = Array();

        if(!labelsGraph[companyGoal.category])
            labelsGraph[companyGoal.category] = Array();

        dataGraph[companyGoal.category].push(companyGoal.ITGoals.length);
        labelsGraph[companyGoal.category].push(companyGoal.name);
    });

    renderCompanyGoalsMainGraph(dataGraph, "companyGoalsReportsGraph0");
    barChartRenderer(dataGraph["1"], labelsGraph["1"], "companyGoalsReportsGraph1", "Financiera", 'rgba(0, 0, 192, 1)', 'rgba(0, 0, 192, 0.2)');
    barChartRenderer(dataGraph["2"], labelsGraph["2"], "companyGoalsReportsGraph2", "Cliente", 'rgba(192, 0, 0, 1)', 'rgba(192, 0, 0, 0.2)');
    barChartRenderer(dataGraph["3"], labelsGraph["3"], "companyGoalsReportsGraph3", "Interna", 'rgba(0, 192, 0, 1)', 'rgba(0, 192, 0, 0.2)');
    barChartRenderer(dataGraph["4"], labelsGraph["4"], "companyGoalsReportsGraph4", "Aprendizaje", 'rgba(176,196,222, 1)', 'rgba(176,196,222, 0.2)');
}

function renderITRGoalsReports()
{
    //companyGoalsData
    var dataGraph = Array();
    var labelsGraph = Array();

    ITGoalsData.forEach(function (ITGoal) {

        var primarySum=0;
        labelsGraph.push(ITGoal.name);

        ITGoal.processes.forEach(function (process) {
            if(process.priority=="primary")
                primarySum++;
        });

        dataGraph.push(primarySum);
    });

    barChartRenderer(dataGraph, labelsGraph, "ITRGoalsReportsGraph", "Cantidad de Procesos Primarios de las Metas TI", 'rgba(0, 0, 192, 1)', 'rgba(0, 0, 192, 0.2)');
}

function renderAutoDiagnosticReport()
{
    //companyGoalsData
    var importanceDataGraph = Array();
    var performanceDataGraph = Array();
    var formal = 0;
    var audited = 0;
    var labelsGraph = Array();

    cobitProcessList.forEach(function (process) {

        labelsGraph.push(process.id+" "+process.name);
        importanceDataGraph.push(process.diagnostic.importance);
        performanceDataGraph.push(process.diagnostic.performance);

        if(process.diagnostic.formality=="S")
            formal++;

        if(process.diagnostic.audited=="S")
            audited++;
    });

    barChartRenderer(importanceDataGraph, labelsGraph, "AutoDiagnosticReportGraphImportance", "Nivel de Importancia", 'rgba(0, 0, 192, 1)', 'rgba(0, 0, 192, 0.2)');
    barChartRenderer(performanceDataGraph, labelsGraph, "AutoDiagnosticReportGraphPerformance", "Nivel de Rendimiento", 'rgba(0, 0, 192, 1)', 'rgba(0, 0, 192, 0.2)');
    doughnutChartRenderer([formal, (cobitProcessList.length-formal)], ["Formal", "No Formal"], "AutoDiagnosticReportGraphFormality", "Formalidad", ["#3e95cd", "#8e5ea2"]);
    doughnutChartRenderer([audited, (cobitProcessList.length-audited)], ["Auditado", "No Auditado"], "AutoDiagnosticReportGraphAudited", "Auditado", ["#3e95cd", "#8e5ea2"]);
}

function renderAssessmentReport()
{
    //companyGoalsData
    var dataGraph = Array();
    var labelsGraph = Array();

    cobitProcessList.forEach(function (process) {

        labelsGraph.push(process.id+" "+process.name);
        var level = 0;

        if(process.assessment.level1=="F")
            level=1;

        if(process.assessment.level2=="F")
            level=2;

        if(process.assessment.level3=="F")
            level=3;

        if(process.assessment.level4=="F")
            level=4;

        if(process.assessment.level5=="F")
            level=5;

        dataGraph.push(level);
    });

    barChartRenderer(dataGraph, labelsGraph, "AssessmentPAM", "Nivel", 'rgba(0, 0, 192, 1)', 'rgba(0, 0, 192, 0.2)');
}