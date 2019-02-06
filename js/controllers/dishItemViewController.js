class DishItemViewController {
  constructor(itemContainer, model, generalController) {
    itemContainer.click((event) => {
      let dishId = event.target.parentNode.id;
      model.requestRecipeInfo(dishId)
        .then(param => generalController.showScreen("DISH_DETAILS"));
    });
  }
}
