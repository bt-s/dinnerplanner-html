var TitleBarViewController = function(view, model, generalController) {
  view.backButton.click(() => {
    generalController.showScreen("SELECT_DISH");
  });
}
