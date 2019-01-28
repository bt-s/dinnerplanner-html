let DishDetailView = function (container, model) {
  let numberOfGuests = container.find(".numberOfGuests").
    html(model.getNumberOfGuests());;

  let viewingDish = model.getCurrentViewingDish();

  let loadDishInfo = () => {
    let dishTitle = container.find("#dishTitle").
      text(viewingDish.name);

    let detailImg = container.find("#detailImg").
      prop("src", "../images/" + viewingDish.image,
           "alt", viewingDish.name);

    let detailDescription = container.find("#detailDescription").
      text(viewingDish.description);

    let prepText = container.find("#prepText").
      text(viewingDish.description);
  }

  let loadIngredients = () => {
    let dishPrice = 0;

    viewingDish.ingredients.forEach(e => {
      let tableItem = $("<tr/>");

      tableItem.append($("<td/>").text(e.quantity + e.unit),
                       $("<td/>").text(e.name),
                       $("<td/>").text("SEK"),
                       $("<td/>").text(e.price));

      let ingredientList = container.find("#listOfIngredients").
        append(tableItem);

      dishPrice += e.price;
    });

    container.find("#dishPrice").text("TOTAL: SEK " + dishPrice);
  }

  loadDishInfo();
  loadIngredients();

  this.backToSearchButton = container.find("#backToSearchButton");
  this.addToMenuButton = container.find("#addToMenuButton");

  this.update = (model, changeDetails) => {
    if (changeDetails == "viewingDish") {
      loadDishInfo();
      loadIngredients();
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
