/**
 * @param {jQuery object} container - references the HTML parent element that
 * contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
var DishItemsView = function (container, model) {
  var searchedDishes = container.find("#searchedDishes");

  this.displaySearchedDishes = function () {
    var dishes = model.getAllDishes(model.getTypeFilter(), model.getKeywordFilter());
    searchedDishes.html("");
    dishes.forEach(function (dish) {
      var dishItem = $("<a/>");
      var heading = $("<h3/>");
      var image = $("<img/>");

      heading.text(dish["name"]);

      image.prop("alt", dish["name"]);
      image.prop("src", "../images/" + dish["image"]);

      dishItem.append(image);
      dishItem.append(heading);

      searchedDishes.append(dishItem);
    });
  }

  this.displaySearchedDishes();

}
