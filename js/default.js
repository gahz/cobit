var buildPositions={
    welcomePanel : buildWelcomePanel,
    companyGoals : buildCompanyGoalsPanel
};

var hidePositions={
    welcomePanel : hideWelcomePanel,
    companyGoals : hideCompanyGoalsPanel
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
