var SideBarViewController = function(view, model, generalController) {
  view.plusButton.click(function() {
    model.setNumberOfGuests(model.getNumberOfGuests() + 1);
  });

  view.minusButton.click(function() {
    if (model.getNumberOfGuests() !== 0) {
      model.setNumberOfGuests(model.getNumberOfGuests() - 1);
    }
  });
}
