/**
 * @param {jQuery object} container - references the HTML parent element that
 * contains the view.
 * @param {Object} model - the reference to the Dinner Model
 */
var TitleBarView = function (container, model) {
  var numberOfGuests = container.find("#numberOfGuests");
  numberOfGuests.html(model.getNumberOfGuests());

  this.backButton = container.find("#backButton");
  this.printRecipeButton = container.find("#printRecipeButton");

  this.update = function(model, changeDetails) {
    if (changeDetails== "numberOfGuests") {
      numberOfGuests.html(model.getNumberOfGuests());
    }
  }

  model.addObserver(this.update);

  this.hide = () => {
    container.hide();
  };

  this.show = () => {
    container.show();
  };
}
