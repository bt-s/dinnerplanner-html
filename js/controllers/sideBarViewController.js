var SideBarViewController = function(view, model, generalController) {
  view.confirmationButton.click(function() {
    generalController.showScreen("DINNER_OVERVIEW");
  });

  view.plusButton.click(function() {
    model.setNumberOfGuests(model.getNumberOfGuests() + 1);
  });

  view.minusButton.click(function() {
    if (model.getNumberOfGuests() !== 0) {
      model.setNumberOfGuests(model.getNumberOfGuests() - 1);
    }
  });
}
