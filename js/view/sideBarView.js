let SideBarView = function (container, model) {
  let numberOfGuests = container.find("#numberOfGuests")
    .html(model.getNumberOfGuests());

  this.plusButton = container.find("#plusGuest");
  this.minusButton = container.find("#minusGuest");
  this.menuButton = container.find("#menuButton");

  let loadSelectedDishes = () => {
    let selectedDishes = container.find("#selectedDishes").html("");

    model.getSelectedDishes().forEach((dish) => {
      let dishSpan = $("<span/>").text(model.getDishName(dish));
      let priceSpan = $("<span/>").text(model.getDishPrice(dish));
      let listItem = $("<li/>")
        .append(dishSpan)
        .append(priceSpan);
      selectedDishes.append(listItem);
    });
  }

  let totalPrice = container.find("#totalPrice").html("SEK ");

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

  model.addObserver(this.update);
}
