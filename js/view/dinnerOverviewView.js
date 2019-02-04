let DinnerOverviewView = function (container, model) {
  let numberOfGuests = container.find("#numberOfGuests");
  numberOfGuests.html(model.getNumberOfGuests());

  let selectedDishes = container.find("#selectedDishesOverview");

  let displaySelectedDishes = () => {
    selectedDishes.html("");
    model.getSelectedDishes().forEach((dish) => {
      let image = $("<img/>")
        .prop("alt", model.getDishName(dish))
        .prop("src", model.getImgBaseUrl() + dish["image"]);
      let heading = $("<h3/>").text(model.getDishName(dish));
      let dishPrice = model.getDishPrice(dish);
      let priceSpan = $("<span/>").text(dishPrice + " SEK");;
      let dishItem = $("<a/>").append(image, heading, priceSpan);;

      selectedDishes.append(dishItem);
    });
  }

  let totalCost = container.find("#totalCost").html(" SEK");;

  this.printRecipeButton = container.find("#printRecipeButton");

  this.update = (model, changeDetails) => {
    if (changeDetails == "numberOfGuests") {
      totalCost.html(model.getTotalMenuPrice() + " SEK");
    }
    if (changeDetails == "selectedDishes") {
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
  // displaySelectedDishes();
}
