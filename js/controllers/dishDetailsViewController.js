class DishDetailsViewController {
  constructor(view, model, generalController) {

    view.backToSearchButton.click(() => {
      generalController.showScreen("SELECT_DISH");
    });

    view.addToMenuButton.click(() => {
      model.addDishToMenu(model.getCurrentViewingDish().id);
    });
  }
}
