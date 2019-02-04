let PrintView = function (container, model) {
  let loadOrderedItems = () => {
    let numberOfGuests = container.find(".numberOfGuests")
      .text(model.getNumberOfGuests());

    let orderedItems = container.find("#orderedItemsList")
      .html("");

    model.getSelectedDishes().forEach(dish => {
      let imgAtLeft = $("<img>").prop("src", model.getImgBaseUrl() + dish.image);
      let name = $("<h2/>").text(model.getDishName(dish));
      let description = $("<p/>").text(model.getDishDescription(dish));
      let preparation = $("<h3/>").text("Preparation");
      let prepText = $("<p/>").text(model.getDishPreparation(dish));

      let midPart = $("<section/>")
        .append(name)
        .append(description);

      let rightPart = $("<section/>")
        .append(preparation)
        .append(prepText);

      let listItem = $("<li/>").prop("class", "printout-dish")
        .append(imgAtLeft)
        .append(midPart)
        .append(rightPart);

      orderedItems.append(listItem);
    });
  }

  // loadOrderedItems();

  this.update = (model, changeDetails) => {
    if (changeDetails == "selectedDishes") {
      loadOrderedItems();
    }
  };

  this.hide = () => {
    container.hide();
  };

  this.show = () => {
    container.show();
  };

  model.addObserver(this.update);
}
