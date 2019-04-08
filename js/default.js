var buildPositions={
    welcomePanel : buildWelcomePanel,
    companyGoals : buildCompanyGoalsPanel,
    ITGoals: buildITCompanyGoalsPanel
};

var hidePositions={
    welcomePanel : hideWelcomePanel,
    companyGoals : hideCompanyGoalsPanel,
    ITGoals: hideITCompanyGoalsPanel
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