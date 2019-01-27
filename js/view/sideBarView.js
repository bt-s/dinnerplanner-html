/**
 * @param {jQuery object} container - references the HTML parent element that
 * contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
var SideBarView = function (container, model) {
  var numberOfGuests = container.find("#numberOfGuests");
  numberOfGuests.html(model.getNumberOfGuests());

  this.plusButton = container.find("#plusGuest");
  this.minusButton = container.find("#minusGuest");
  this.menuButton = container.find("#menuButton");
  var selectedDishes = container.find("#selectedDishes");

  var loadSelectedDishes = () => {
    selectedDishes.html("");
    for (var i = 0; i < model.getSelectedDishes().length; i++) {
      var dishSpan = $("<span/>");
      var priceSpan = $("<span/>");
      var dish = model.getSelectedDishes()[i];
      var dishPrice = model.getDishPrice(dish);
      var listItem = $("<li/>");

      dishSpan.text(dish["name"]);
      priceSpan.text(dishPrice);
      listItem.append(dishSpan);
      listItem.append(priceSpan);
      selectedDishes.append(listItem);
    }
  }


  var totalPrice = container.find("#totalPrice");
  totalPrice.html("SEK " + model.getTotalMenuPrice());

  this.confirmationButton = container.find("#confirmationButton");

  this.update = (model, changeDetails) => {
    if (changeDetails == "numberOfGuests") {
      numberOfGuests.html(model.getNumberOfGuests());
      loadSelectedDishes();
      totalPrice.html("SEK " + model.getTotalMenuPrice());
    }
    if (changeDetails == "selectedDishes") {
      loadSelectedDishes();
      totalPrice.html("SEK " + model.getTotalMenuPrice());
    }
  }

  this.hide = () => {
    container.hide();
  };
  this.show = () => {
    container.show();
  };

  loadSelectedDishes();
  model.addObserver(this.update);
}