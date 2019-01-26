/**
 * @param {jQuery object} container - references the HTML parent element that
 * contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
var DishSearchView = function (container, model) {
  var dishesTypes = model.getDishesTypes();
  var searchedDishesContainer = container.find("#searchedDishes");
  var dishTypeSelect = container.find("#dishTypeSelect");
  var keywordInput = container.find("#keywordInput");

  var titalizeWords = (words) => {
    return words
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  var listDishesTypes = () => {
    dishTypeSelect.html("");
    var option = $("<option/>");
    option.text("All");
    option.prop("value", ""); // set it to none so by default can get all dishes
    dishTypeSelect.append(option);

    dishesTypes.forEach((type) => {
      var option = $("<option/>");
      option.text(titalizeWords(type));
      option.prop("value", type);
      dishTypeSelect.append(option);
    });
  };

  var showSearchedDishes = () => {
    //clear all dish in DOM before search
    searchedDishesContainer.html("");
    //create views for each items
    model.getSearchedDishes().forEach((dish) => {
      var dishItemView = new DishItemView(dish.id, model);
      searchedDishesContainer.append(dishItemView.getDomObj());
    });
  };

  this.searchDishButton = container.find("#searchDishButton");

  this.getSearchCondition = () => {
    return [dishTypeSelect.prop("value"),
      keywordInput.prop("value")
    ];
  };

  // question, why pass model to this function as model is already available in this function because it's in the constructor function of this class
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