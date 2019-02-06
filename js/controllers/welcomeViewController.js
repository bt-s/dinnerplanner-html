class WelcomeViewController {
  constructor(view, model, generalController) {
    view.createNewDinnerButton.click(() => {
      model.clearSelectedDishes();
      model.setNumberOfGuests(1);
      model.setSearchCondition("", "", 0);
      model.operateSearch(...model.getSearchCondition());
      generalController.showScreen("SELECT_DISH");
    });
  }
}
