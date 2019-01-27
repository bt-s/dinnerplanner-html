/**
 * @param {jQuery object} container - references the HTML parent element that
 * contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
var DishDetailView = function (container, model) {
  var numberOfGuests = container.find(".numberOfGuests");
  var ingredientList = container.find("#listOfIngredients");
  var prepText = container.find("#prepText");
  var viewingDish = model.getCurrentViewingDish();

  numberOfGuests.html(model.getNumberOfGuests());

  var dishTitle = container.find("#dishTitle");
  var detailImg = container.find("#detailImg");
  var detailDescription = container.find("#detailDescription");

  var loadDishInfo = () => {
    viewingDish = model.getCurrentViewingDish();
    dishTitle.text(viewingDish.name);
    detailImg.prop("src", "images/" + viewingDish.image);
    detailImg.prop("alt", viewingDish.name);
    detailDescription.text(viewingDish.description);
    //no data for preparation, so reuse description
    prepText.text(viewingDish.description);
  }

  var loadIngredients = () => {
    var dishPrice = 0;
    viewingDish.ingredients.forEach(e => {
      var volumeSpan = $("<td/>");
      var nameSpan = $("<td/>");
      var monetarySpan = $("<td/>");
      var priceSpan = $("<td/>");
      var tableItem = $("<tr/>");

      dishPrice += e.price;
      tableItem.append(volumeSpan.text(e.quantity + e.unit));
      tableItem.append(nameSpan.text(e.name));
      tableItem.append(monetarySpan.text("SEK"));
      tableItem.append(priceSpan.text(e.price));
      ingredientList.append(tableItem);
    });

    container.find("#dishPrice").text("SEK    " + dishPrice);
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