class DishSearchViewController {
  constructor(view, model, generalController) {
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

    view.paginationPreviousButton.click((evt) => {
      const searchCond = model.getSearchCondition();
      let offset = model.getOffset();

      if (offset !== 0) {
        model.setOffset(offset - ITEMS_PER_PAGE);
        offset = model.getOffset();
      }

      model.setSearchCondition(searchCond[0], searchCond[1], offset);
      model.operateSearch(...model.getSearchCondition());
    });

    view.paginationNextButton.click((evt) => {
      const searchCond = model.getSearchCondition();
      model.setOffset(model.getOffset() + ITEMS_PER_PAGE);
      let offset = model.getOffset();

      model.setSearchCondition(searchCond[0], searchCond[1], offset);
      model.operateSearch(...model.getSearchCondition());
    });
  }
}
