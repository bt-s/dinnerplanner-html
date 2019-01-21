var DishSearchView = function (container, model) {
  var dishesTypes = model.getDishesTypes();

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
    console.log(keywordInput.prop("value"));
  };
}