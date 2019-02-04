let DishSearchViewController = function (view, model, generalController) {
  view.searchDishButton.click(() => {
    model.setSearchCondition(...view.getSearchCondition());
    model.operateSearch(...model.getSearchCondition());
  });

  view.keywordInput.keyup((evt) => {
    if (evt.keyCode === 13) { // 13 is Enter key
      model.setSearchCondition(...view.getSearchCondition());
      model.operateSearch(...model.getSearchCondition());
    }
  });

  view.dishTypeSelect.click((evt) => {
    const searchCond = model.getSearchCondition();
    const newType = view.dishTypeSelect.prop('value');

    if (searchCond[0] !== newType) {
      model.setSearchCondition(newType, searchCond[1]);
      model.operateSearch(...model.getSearchCondition());
    }
  });
}
