let TitleBarView = function (container, model) {
  let numberOfGuests = container.find("#numberOfGuests")
    .html(model.getNumberOfGuests());

  this.backButton = container.find("#backButton");
  this.printRecipeButton = container.find("#printRecipeButton");

  this.update = (model, changeDetails) => {
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
