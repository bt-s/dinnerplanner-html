let DishSearchViewController = function (view, model, generalController) {
  view.searchDishButton.click(() => {
    model.operateSearch(...view.getSearchCondition());
  });
}
