let DishSearchViewController = function (view, model, generalController) {
  view.searchDishButton.click(() => {
    model.setSearchCondition(...view.getSearchCondition());
    model.operateSearch(...model.getSearchCondition());
  });
}