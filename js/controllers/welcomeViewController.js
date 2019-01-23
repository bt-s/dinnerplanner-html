var WelcomeViewController = function(view, model, generalController) {
  view.createNewDinnerButton.click(() => {
    generalController.showScreen("SELECT_DISH");
  });
}
