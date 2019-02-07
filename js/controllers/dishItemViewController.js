class DishItemViewController {
  constructor(itemContainer, model, generalController) {
    itemContainer.click((event) => {
      let dishId = event.target.parentNode.id;
      model.requestRecipeInfo(dishId)
        .catch(err => {
          return Promise.reject(err);
        })
        .then(param => {
          generalController.showScreen("DISH_DETAILS")
        })
        .catch(err => {
          console.error(err);
          return;
        });
    });
  }
}
