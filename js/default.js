var buildPositions={
    welcomePanel : buildWelcomePanel,
    ITGoalsDefinition: buildITGoalsDefinition,
    companyGoals : buildCompanyGoalsPanel,
    ITGoals: buildITCompanyGoalsPanel,
    AutoDiagnostic: buildAutoDiagnosticPanel
};

var hidePositions={
    welcomePanel : hideWelcomePanel,
    ITGoalsDefinition: hideITGoalsDefinition,
    companyGoals : hideCompanyGoalsPanel,
    ITGoals: hideITCompanyGoalsPanel,
    AutoDiagnostic: hideAutoDiagnosticPanel
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

    setTimeout(function(){ $('.input-field label').addClass('active'); }, 1);
    $(".tabs").tabs();
});