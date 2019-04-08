var buildPositions={
    welcomePanel : buildWelcomePanel,
    companyGoals : buildCompanyGoalsPanel,
    ITGoals: buildITCompanyGoalsPanel,
    AutoDiagnostic: buildAutoDiagnosticPanel
};

var hidePositions={
    welcomePanel : hideWelcomePanel,
    companyGoals : hideCompanyGoalsPanel,
    ITGoals: hideITCompanyGoalsPanel,
    AutoDiagnostic: hideAutoDiagnosticPanel()
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

    $(".tabs").tabs();
});