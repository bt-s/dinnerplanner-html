$(function () {
  // We instantiate our model
  var model = new DinnerModel();

  // Create the instances of our view
  var exampleView = new ExampleView($("#exampleView"), model);
  var welcomeView = new WelcomeView($("#welcomeView"), model);
  var sideBarView = new SideBarView($("#sideBarView"), model);
  var dishSearchView = new DishSearchView($("#dishSearchView"), model); // should be initialized before dishItemsView
  var dishItemsView = new DishItemsView($("#dishItemsView"), model);
  var dishDetailView = new DishDetailView($("#dishDetailView"), model);
  var dinnerOverviewView = new DinnerOverviewView($("#dinnerOverviewView"), model);
  var printView = new PrintView($("#printView"), model);
  /**
   * IMPORTANT: app.js is the only place where you are allowed to
   * use the $('someSelector') to search for elements in the whole HTML.
   * In other places you should limit the search only to the children
   * of the specific view you're working with (see exampleView.js).
   */

  /**------------------------------------------------------
   * I'm temporally doing some logic here, It seeems we should 
   * create another controller file to manage all these views 
   * and take care of the communication between different views.
   ---------------------------------------------------------
   */
  dishSearchView.searchDishButton.click(() => {
    dishSearchView.updateFilters();
    dishItemsView.displaySearchedDishes();
  });
});