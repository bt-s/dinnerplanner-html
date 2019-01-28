let SideBarViewController = function (view, model, generalController) {
  view.confirmationButton.click(() => {
    generalController.showScreen("DINNER_OVERVIEW");
  });

  view.plusButton.click(() => {
    model.setNumberOfGuests(model.getNumberOfGuests() + 1);
  });

  view.minusButton.click(() => {
    if (model.getNumberOfGuests() !== 0) {
      model.setNumberOfGuests(model.getNumberOfGuests() - 1);
    }
  });

  view.menuButton.click(function(){
      $(this).parent().parent().toggleClass("menu-open");
  });
}
