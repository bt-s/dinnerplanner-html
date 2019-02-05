let DishSearchView = function (container, model) {
  this.dishTypeSelect = container.find("#dishTypeSelect").html("");
  this.keywordInput = container.find("#keywordInput");
  this.searchDishButton = container.find("#searchDishButton");

  let titalizeWords = (words) => {
    return words
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  let listDishesTypes = () => {
    let option = $("<option/>").text("All").prop("value", "");
    this.dishTypeSelect.append(option);

    model.getDishesTypes().forEach((type) => {
      let option = $("<option/>").text(titalizeWords(type)).prop("value", type);
      this.dishTypeSelect.append(option);
    });
  };

  let showSearchedDishes = () => {
    let searchedDishesContainer = container.find("#searchedDishes").html("");
    model.getSearchedDishes().forEach((dish) => {
      let dishItemView = new DishItemView(dish.id, model);
      searchedDishesContainer.append(dishItemView.dishItem);
    });
  };


  this.getSearchCondition = () => {
    return [this.dishTypeSelect.prop("value"),
      this.keywordInput.prop("value")
    ];
  };

  this.setSearchCondition = (type, kwd) => {
    for (let i = 0; i < this.dishTypeSelect.children().length; i++) {
      if (this.dishTypeSelect.children()[i].value == type)
        this.dishTypeSelect[0].selectedIndex = i;
    }

    this.keywordInput.prop("value", kwd);
  };

  this.update = (model, changeDetails) => {
    if (changeDetails === "searchedDishes") {
      showSearchedDishes();
    }
    if (changeDetails == "searchCondition") {
      this.setSearchCondition(...model.getSearchCondition());
    }
  };

  this.hide = () => {
    container.hide();
  };

  this.show = () => {
    container.show();
  };

  listDishesTypes();
  model.operateSearch(...model.getSearchCondition());
  model.addObserver(this.update);
}
