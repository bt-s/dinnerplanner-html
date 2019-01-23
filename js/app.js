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
  var printView = new PrintView($("#printView"), model);

  // Add all views to the general controller
  generalController
    .addView(welcomeView)
    .addView(sideBarView)
    .addView(dishSearchView)
    .addView(dishDetailView)
    .addView(dinnerOverviewView)
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
  var printViewController =
    new PrintViewController(printView, model, generalController);

  // Instantiate all screens
  generalController
    .addScreen("WELCOME", [welcomeView])
    .addScreen("SELECT_DISH", [sideBarView, dishSearchView])
    .addScreen("DISH_DETAILS", [sideBarView, dishDetailView])
    .addScreen("DINNER_OVERVIEW", [dinnerOverviewView])
    .addScreen("DINNER_PRINTOUT", [printView]);

  generalController.showScreen("WELCOME");

  // ---- for test purpose --------
  var counter = 0;
  var screenNames = [
    "WELCOME",
    "SELECT_DISH",
    "DISH_DETAILS",
    "DINNER_OVERVIEW",
    "DINNER_PRINTOUT"
  ];
  document.onclick = () => {
    console.log("document click");
    counter = ++counter % screenNames.length;
    generalController.showScreen(screenNames[counter]);
  };
  // -------  for test purpose ------
});