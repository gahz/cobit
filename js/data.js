var database = firebase.database();

var autoDiagnosticData=null;
var ITGoalsData=null;
var companyGoalsData=null;
var cobitProcessList=null;

function populateCompanyGoalsData(formDataPopulation)
{
    return firebase.database().ref('/companyGoals').once("value").then(function (snapshot) {
        //companyGoalsData = snapshot.val();
        //console.log(companyGoalsData);
        formDataPopulation(snapshot.val());
    });
}

function populateCobitProcessList(dataPopulationTrigger)
{
    return firebase.database().ref('/cobitProcesses').once("value").then(function (snapshot) {
        //companyGoalsData = snapshot.val();
        //console.log(companyGoalsData);
        dataPopulationTrigger(snapshot.val());
    });
}

function populateITGoalsData(formDataPopulation)
{
    return firebase.database().ref('/ITGoals').once("value").then(function (snapshot) {
        //ITGoalsData = snapshot.val();
        //console.log(ITGoalsData);
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

function populateITGoalsDefinitionData(formDataPopulation)
{
    return firebase.database().ref('/ITGoals').once("value").then(function (snapshot) {
        //ITGoalsData = snapshot.val();
        //console.log(ITGoalsData);
        formDataPopulation(snapshot.val());
    });
}


function lookoutForProcesses()
{
    var ref2 = firebase.database().ref('/cobitProcesses');
    var query = ref2.orderByChild('id').equalTo('EDM01');
    query.once('value',function(snapshot){
        console.log(snapshot.val())
    });
}

function valOrParam(el, param)
{
    return (el.val())?el.val():param;
}