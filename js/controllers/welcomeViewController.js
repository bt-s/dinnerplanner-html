let WelcomeViewController = function (view, model, generalController) {
  view.createNewDinnerButton.click(() => {
    // clear all user data (maybe loaded from cache)
    model.clearSelectedDishes();
    model.setNumberOfGuests(0);
    model.setSearchCondition("", "");
    model.operateSearch(...model.getSearchCondition());
    generalController.showScreen("SELECT_DISH");
  });
}