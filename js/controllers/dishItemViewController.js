var DishItemViewController = function (itemContainer, model, generalController) {
  itemContainer.click((event) => {
    var dishId = event.target.parentNode.id.substring(8);
    model.setCurrentViewingDish(dishId);
    generalController.showScreen(SCREENS_Set.DISH_DETAILS);
  });
}