var database = firebase.database();

var autoDiagnosticData;
var ITGoalsData;
var companyGoalsData;

function populateCompanyGoalsData(formDataPopulation)
{
    return firebase.database().ref('/companyGoals').once("value").then(function (snapshot) {
        companyGoalsData = snapshot.val();
        console.log(companyGoalsData);
        formDataPopulation();
    });
}

function populateITGoalsData(formDataPopulation)
{
    return firebase.database().ref('/ITGoals').once("value").then(function (snapshot) {
        ITGoalsData = snapshot.val();
        console.log(ITGoalsData);
        formDataPopulation();
    });
}

function populateAutoDiagnosticData(formDataPopulation)
{
    return firebase.database().ref('/AutoDiagnostic').once("value").then(function (snapshot) {
        autoDiagnosticData = snapshot.val();
        console.log(autoDiagnosticData);
        formDataPopulation();
    });
}
