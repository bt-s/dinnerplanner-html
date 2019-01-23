/**
 * @param {jQuery object} container - references the HTML parent element that
 * contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
var DishSearchView = function (container, model) {
  var dishesTypes = model.getDishesTypes();
  var searchedDishes;
  var searchedDishesContainer = container.find("#searchedDishes");
  var dishTypeSelect = container.find("#dishTypeSelect");
  var keywordInput = container.find("#keywordInput");

  var titalizeWords = (words) => {
    return words
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  var listDishesTypes = function () {
    dishTypeSelect.html("");
    var option = $("<option/>");
    option.text("All");
    option.prop("value", ""); // set it to none so by default can get all dishes
    dishTypeSelect.append(option);

    dishesTypes.forEach(function (type) {
      var option = $("<option/>");
      option.text(titalizeWords(type));
      option.prop("value", type);
      dishTypeSelect.append(option);
    });
  }

  listDishesTypes();

  this.searchDishButton = container.find("#searchDishButton");

  this.updateFilters = () => {
    model.setTypeFilter(dishTypeSelect.prop("value"));
    model.setKeywordFilter(keywordInput.prop("value"));
  };

  this.operateSearch = () => {
    this.updateFilters();
    //clear all dish in DOM before search
    searchedDishesContainer.html("");
    searchedDishes = model.getAllDishes(model.getTypeFilter(), model.getKeywordFilter());
    //create views for each items
    searchedDishes.forEach(function (dish) {
      var tmpDishItem = $("<a/>");
      tmpDishItem.prop("id", dish.id);
      var dishItemView = new DishItemView(dish.id, tmpDishItem, model);
      searchedDishesContainer.append(dishItemView.getDomObj());
    });
  }

  this.hide = () => {
    container.hide();
  };
  this.show=()=>{
    container.show();
  };

  
  this.operateSearch();

}