let SideBarView = function (container, model) {
  let totalMenuPrice = model.getTotalMenuPrice();

  let numberOfGuests = container.find("#numberOfGuests")
    .html(model.getNumberOfGuests());

  this.plusButton = container.find("#plusGuest");
  this.minusButton = container.find("#minusGuest");
  this.menuButton = container.find("#menuButton");

  let loadSelectedDishes = () => {
    let selectedDishes = container.find("#selectedDishes").html("");

    model.getSelectedDishes().forEach((dish) => {
      let dishSpan = $("<span/>").text(dish["name"]);
      let priceSpan = $("<span/>").text(model.getDishPrice(dish));
      let listItem = $("<li/>")
        .append(dishSpan)
        .append(priceSpan);
      selectedDishes.append(listItem);
    });
  }

  let totalPrice = container.find("#totalPrice")
    .html("SEK " + totalMenuPrice);

  this.confirmationButton = container.find("#confirmationButton");

  this.update = (model, changeDetails) => {
    if (changeDetails == "numberOfGuests") {
      numberOfGuests.html(model.getNumberOfGuests());
      loadSelectedDishes();
      totalPrice.html("SEK " + totalMenuPrice);
    }
    if (changeDetails == "selectedDishes") {
      loadSelectedDishes();
      totalPrice.html("SEK " + totalMenuPrice);
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
