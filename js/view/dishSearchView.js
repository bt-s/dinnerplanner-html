let DishSearchView = function (container, model) {
  let dishTypeSelect = container.find("#dishTypeSelect").html("");
  let keywordInput = container.find("#keywordInput");

  let titalizeWords = (words) => {
    return words
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  let listDishesTypes = () => {
    let option = $("<option/>").text("All").prop("value", "");
    dishTypeSelect.append(option);

    model.getDishesTypes().forEach((type) => {
      let option = $("<option/>").text(titalizeWords(type)).prop("value", type);
      dishTypeSelect.append(option);
    });
  };

  let showSearchedDishes = () => {
    let searchedDishesContainer = container.find("#searchedDishes").html("");

    model.getSearchedDishes().forEach((dish) => {
      let dishItemView = new DishItemView(dish.id, model);
      searchedDishesContainer.append(dishItemView.getDomObj());
    });
  };

  this.searchDishButton = container.find("#searchDishButton");

  this.getSearchCondition = () => {
    return [dishTypeSelect.prop("value"),
      keywordInput.prop("value")
    ];
  };

  this.setSearchCondition = (type, kwd) => {
    for (let i = 0; i < dishTypeSelect.children().length; i++) {
      if (dishTypeSelect.children()[i].value == type)
        dishTypeSelect[0].selectedIndex = i;
    }

    keywordInput.prop("value", kwd);
  };

  this.update = (model, changeDetails) => {
    if (changeDetails === "searchedDishes") {
      showSearchedDishes();
    }
  };

  this.hide = () => {
    container.hide();
  };

  this.show = () => {
    container.show();
  };

  listDishesTypes();
  showSearchedDishes();
  model.addObserver(this.update);
}
