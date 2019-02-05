class WelcomeViewController {
  constructor(view, model, generalController) {
    view.createNewDinnerButton.click(() => {
      model.clearSelectedDishes();
      model.setNumberOfGuests(0);
      model.setSearchCondition("", "");
      model.operateSearch(...model.getSearchCondition());
      generalController.showScreen("SELECT_DISH");
    });
  }
}
