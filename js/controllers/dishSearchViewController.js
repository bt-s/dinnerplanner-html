var DishSearchViewController = function (view, model, generalController) {
  view.searchDishButton.click(() => {
    // view.operateSearch();
    model.operateSearch(...view.getSearchCondition());
    
  });
}