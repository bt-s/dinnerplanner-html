class DinnerOverviewViewController {
  constructor(view, model, generalController) {
    view.printRecipeButton.click(() => {
      generalController.showScreen("DINNER_PRINTOUT");
    });
  }
}
