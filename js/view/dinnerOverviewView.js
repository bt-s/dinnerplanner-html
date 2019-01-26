/**
 * @param {jQuery object} container - references the HTML parent element that
 * contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
var DinnerOverviewView = function (container, model) {
  var numberOfGuests = container.find("#numberOfGuests");
  numberOfGuests.html(model.getNumberOfGuests());

  var selectedDishes = container.find("#selectedDishesOverview");

  var displaySelectedDishes = () => {
    selectedDishes.html("");
    for (var i = 0; i < model.getSelectedDishes().length; i++) {
      var dishSpan = $("<span/>");
      var dish = model.getSelectedDishes()[i];
      var dishItem = $("<a/>");
      var image = $("<img/>");
      var heading = $("<h3/>");
      var dishPrice = model.getDishPrice(dish);
      var priceSpan = $("<span/>");

      image.prop("alt", dish["name"]);
      image.prop("src", "images/" + dish["image"]);

      heading.text(dish["name"]);

      priceSpan.text(dishPrice + " SEK");

      dishItem.append(image);
      dishItem.append(heading);
      dishItem.append(priceSpan);

      selectedDishes.append(dishItem);
    }
  }

  var totalCost = container.find("#totalCost");
  totalCost.html(model.getTotalMenuPrice() + " SEK");

  this.backButton = container.find("#backButton");
  this.printRecipeButton = container.find("#printRecipeButton");

  this.update = (model, changeDetails) => {
    if (changeDetails == "numberOfGuests") {
      displaySelectedDishes();
      totalCost.html(model.getTotalMenuPrice() + " SEK");
    }
  }

  this.hide = () => {
    container.hide();
  };

  this.show = () => {
    container.show();
  };

  model.addObserver(this.update);
  displaySelectedDishes();

}