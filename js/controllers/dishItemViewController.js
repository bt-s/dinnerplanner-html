let DishItemViewController = function (itemContainer, model, generalController) {
  itemContainer.click((event) => {
    let dishId = event.target.parentNode.id;
    model.setCurrentViewingDish(dishId)
    model.requestRecipeInfo(dishId) // further info needed for this page
    generalController.showScreen("DISH_DETAILS");
  });
}
