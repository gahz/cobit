
function renderCompanyGoalsIndividualGraph(data, labels, wrapper, datasetLabel, borderColor, bgColor)
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
            }
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
                label: "Metas Corporativas por Dominio",
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
    renderCompanyGoalsIndividualGraph(dataGraph["1"], labelsGraph["1"], "companyGoalsReportsGraph1", "Financiera", 'rgba(0, 0, 192, 1)', 'rgba(0, 0, 192, 0.2)');
    renderCompanyGoalsIndividualGraph(dataGraph["2"], labelsGraph["2"], "companyGoalsReportsGraph2", "Cliente", 'rgba(192, 0, 0, 1)', 'rgba(192, 0, 0, 0.2)');
    renderCompanyGoalsIndividualGraph(dataGraph["3"], labelsGraph["3"], "companyGoalsReportsGraph3", "Interna", 'rgba(0, 192, 0, 1)', 'rgba(0, 192, 0, 0.2)');
    renderCompanyGoalsIndividualGraph(dataGraph["4"], labelsGraph["4"], "companyGoalsReportsGraph4", "Aprendizaje", 'rgba(176,196,222, 1)', 'rgba(176,196,222, 0.2)');
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

    renderCompanyGoalsIndividualGraph(dataGraph, labelsGraph, "ITRGoalsReportsGraph", "Procesos Primarios de las Metas TI", 'rgba(0, 0, 192, 1)', 'rgba(0, 0, 192, 0.2)');
}

function renderAutoDiagnosticReport()
{
    var ctx = document.getElementById("AutoDiagnosticReportGraph").getContext('2d');

    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: "test",
            datasets: [{
                data: africa,
                label: "Africa",
                borderColor: "#3e95cd",
                fill: false
                },
                {
                    data: asia,
                    label: "Asia",
                    borderColor: "#3e95cd",
                    fill: false
                },
                {
                    data: europe,
                    label: "Europe",
                    borderColor: "#3e95cd",
                    fill: false
                },
                {
                    data: latinAmerica,
                    label: "Latin America",
                    borderColor: "#3e95cd",
                    fill: false
                },
                {
                    data: northAmerica,
                    label: "North America",
                    borderColor: "#3e95cd",
                    fill: false
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
            }
        }
    });
}