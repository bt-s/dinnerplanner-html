let DishDetailView = function (container, model) {
  let numberOfGuests = container.find(".numberOfGuests").
  html(model.getNumberOfGuests());;

  let loadDishInfo = () => {
    let viewingDish = model.getCurrentViewingDish();
    let dishTitle = container.find("#dishTitle").
    text(viewingDish.title);

    let detailImg = container.find("#detailImg").
    prop("src", model.getImgBaseUrl() + viewingDish.image,
      "alt", viewingDish.title);

    let detailDescription = container.find("#detailDescription")
      .text(model.getDishPreparation(viewingDish));

    let prepText = container.find("#prepText")
      .text(model.getDishPreparation(viewingDish));
  }

  let loadIngredients = () => {
    let dishPrice = 0;
    let ingredientList = container.find("#listOfIngredients").html("");
    let viewingDish = model.getCurrentViewingDish();
    if (!viewingDish) {
      return
    }
    viewingDish.info.extendedIngredients.forEach(ingredient => {
      let tableItem = $("<tr/>");
      tableItem.append($("<td/>").text(ingredient.amount + ingredient.measures.metric.unitShort), // amount and unit in short
        $("<td/>").text(ingredient.name),
        $("<td/>").text("SEK")); // no price for ingredients
      // $("<td/>").text(ingredient.price)); 
      ingredientList.append(tableItem);
      // dishPrice += ingredient.price;  // no price provided
    });
    dishPrice = viewingDish.info.pricePerServing * model.getNumberOfGuests()
    container.find("#dishPrice").text("TOTAL: SEK " + dishPrice);
  }

  this.backToSearchButton = container.find("#backToSearchButton");
  this.addToMenuButton = container.find("#addToMenuButton");

  this.update = (model, changeDetails) => {
    if (changeDetails == "viewingDishDetail") {
      loadDishInfo();
      loadIngredients();
    } else if (changeDetails == 'numberOfGuests') {
      loadIngredients()
      numberOfGuests.text(model.getNumberOfGuests())
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
