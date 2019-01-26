var DishItemViewController = function (itemContainer, model, generalController) {
  itemContainer.click((event) => {
    var dishId = event.target.parentNode.id.substring(8);
    model.addDishToMenu(dishId);
  });
}