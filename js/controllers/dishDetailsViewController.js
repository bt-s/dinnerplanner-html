var DishDetailsViewController = function (view, model, generalController) {
  view.backToSearchButton.click(() => {
    generalController.showScreen(SCREENS_Set.SELECT_DISH);
  });
  view.addToMenuButton.click((event) => {
    model.addDishToMenu(model.getCurrentViewingDish().id);
  });
}