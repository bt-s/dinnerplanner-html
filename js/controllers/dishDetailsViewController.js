let DishDetailsViewController = function (view, model, generalController) {
  view.backToSearchButton.click(() => {
    generalController.showScreen("SELECT_DISH");
  });

  view.addToMenuButton.click((event) => {
    console.log('add btn click');

    model.addDishToMenu(model.getCurrentViewingDish().id);
  });
}
