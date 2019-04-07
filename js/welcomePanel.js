var buildWelcomePanel = function()
{
  var body = $("#welcomePanel");
  var mainContainer = $("#mainContainer");

  $(body).removeAttr("id");

  $(mainContainer).empty();
  $(mainContainer).append(body);
};

var hideWelcomePanel = function()
{
    var body = $("#mainContainer").children();
    var mainContainer = $("#welcomePanelWrapper");

    $(body).attr("id", "welcomePanel");
    mainContainer.append(body);
};
