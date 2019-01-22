$(function () {
  // We instantiate our model
  var model = new DinnerModel();

  // Create the instances of our view
  var welcomeView = new WelcomeView($("#welcomeView"), model);
  var sideBarView = new SideBarView($("#sideBarView"), model);
  var dishSearchView = new DishSearchView($("#dishSearchView"), model); // should be initialized before dishItemsView
  var dishItemsView = new DishItemsView($("#dishItemsView"), model);
  var dishDetailView = new DishDetailView($("#dishDetailView"), model);
  var dinnerOverviewView = new DinnerOverviewView($("#dinnerOverviewView"), model);
  var printView = new PrintView($("#printView"), model);

  /**------------------------------------------------------
   * We are temporally doing some logic here, It seeems we should
   * create another controller file to manage all these views
   * and take care of the communication between different views.
   ---------------------------------------------------------
   */
  dishSearchView.searchDishButton.click(() => {
    dishSearchView.updateFilters();
    dishItemsView.displaySearchedDishes();
  });
});
