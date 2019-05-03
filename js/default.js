var buildPositions={
    welcomePanel : buildWelcomePanel,
    ITGoalsDefinition: buildITGoalsDefinition,
    companyGoals : buildCompanyGoalsPanel,
    ITGoals: buildITCompanyGoalsPanel,
    AutoDiagnostic: buildAutoDiagnosticPanel,
    ProcessExecution : buildProcessExecutionPanel,
    ProcessAssessment : buildProcessAssessmentPanel
};

var hidePositions={
    welcomePanel : hideWelcomePanel,
    ITGoalsDefinition: hideITGoalsDefinition,
    companyGoals : hideCompanyGoalsPanel,
    ITGoals: hideITCompanyGoalsPanel,
    AutoDiagnostic: hideAutoDiagnosticPanel,
    ProcessExecution : hideProcessExecutionPanel,
    ProcessAssessment : hideProcessAssessmentPanel
};

function updatePosition(lastPosition, nextPosition)
{
    if(lastPosition!=null)
        hidePositions[lastPosition]();

    if(nextPosition!=null)
        buildPositions[nextPosition]();
}

$( document ).ready(function(){
    //default position is welcome panel
    updatePosition(null, "welcomePanel");
//    updatePosition(null, "ProcessAssessment");

    setTimeout(function(){ $('.input-field label').addClass('active'); }, 1);
    $(".tabs").tabs();
    $('.modal').modal();
});