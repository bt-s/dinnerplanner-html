/**
 * @param {jQuery object} container - references the HTML parent element that
 * contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
var WelcomeView = function (container, model) {
  var welcomeText = container.find("#welcomeText");
  welcomeText.html(model.welcomeText);

  this.createNewDinnerButton = container.find("#createNewDinnerButton");
}

