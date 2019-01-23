$(function () {
  // We instantiate our model
  var model = new DinnerModel();

  // We instantiate our general controller
  var generalController = new GeneralController();

  // Create the instances of our view
  var welcomeView = new WelcomeView($("#welcomeView"), model);
  var sideBarView = new SideBarView($("#sideBarView"), model);
  var dishSearchView = new DishSearchView($("#dishSearchView"), model);
  var dishDetailView = new DishDetailView($("#dishDetailView"), model);
  var dinnerOverviewView = new DinnerOverviewView($("#dinnerOverviewView"), model);
  var titleBarView = new TitleBarView($("#titleBarView"), model);
  var printView = new PrintView($("#printView"), model);

  // Add all views to the general controller
  generalController
    .addView(welcomeView)
    .addView(sideBarView)
    .addView(dishSearchView)
    .addView(dishDetailView)
    .addView(dinnerOverviewView)
    .addView(titleBarView)
    .addView(printView);

  // Instantiate the controllers
  var welcomeViewController =
    new WelcomeViewController(welcomeView, model, generalController);
  var sideBarViewController =
    new SideBarViewController(sideBarView, model, generalController);
  var dishSearchViewController =
    new DishSearchViewController(dishSearchView, model, generalController);
  var dishDetailsViewController =
    new DishDetailsViewController(dishDetailView, model, generalController);
  var dinnerOverviewViewController =
    new DinnerOverviewViewController(dinnerOverviewView, model, generalController);
  var titleBarViewController =
    new TitleBarViewController(titleBarView, model, generalController);
  var printViewController =
    new PrintViewController(printView, model, generalController);

  // Instantiate all screens
  generalController
    .addScreen("WELCOME", [welcomeView])
    .addScreen("SELECT_DISH", [sideBarView, dishSearchView])
    .addScreen("DISH_DETAILS", [sideBarView, dishDetailView])
    .addScreen("DINNER_OVERVIEW", [dinnerOverviewView, titleBarView])
    .addScreen("DINNER_PRINTOUT", [printView, titleBarView]);

  generalController.showScreen("WELCOME");
});
