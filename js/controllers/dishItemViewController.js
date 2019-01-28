let DishItemViewController = function (itemContainer, model, generalController) {
  itemContainer.click((event) => {
    let dishId = event.target.parentNode.id.substring(8);
    model.setCurrentViewingDish(dishId);
    generalController.showScreen("DISH_DETAILS");
  });
}
