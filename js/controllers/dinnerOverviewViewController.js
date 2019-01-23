var DinnerOverviewViewController = function(view, model, generalController) {
  view.printRecipeButton.click(() => {
    generalController.showScreen("DINNER_PRINTOUT");
  });
}
