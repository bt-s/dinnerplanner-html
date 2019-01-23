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

  // In the essence, every variable in JS is an Object
  // So we can put a switchTo() function in this "Dic"
  var SCREENS = {
    // Names for pages
    "WELCOME": "WELCOME",
    "SELECT_DISH": "SELECT_DISH",
    "DISH_DETAILS": "DISH_DETAILS",
    "DINNER_OVERVIEW": "DINNER_OVERVIEW",
    "DINNER_PRINTOUT": "DINNER_PRINTOUT",
    // Variable to store current screen
    "currentScreen": "WELCOME", // Welcome by default
    "switchTo": (name) => {
      return this.currentScreen = name;
    }
  };
  // Instantiate all screens
  generalController
    .addScreen(SCREENS.WELCOME, [welcomeView])
    .addScreen(SCREENS.SELECT_DISH, [sideBarView, dishSearchView])
    .addScreen(SCREENS.DISH_DETAILS, [sideBarView, dishDetailView])
    .addScreen(SCREENS.DINNER_OVERVIEW, [dinnerOverviewView, titleBarView])
    .addScreen(SCREENS.DINNER_PRINTOUT, [printView, titleBarView]);

  generalController.showScreen(SCREENS.switchTo(SCREENS.WELCOME));


  window.onunload = () => {
    console.log("unload 1");
  };
  // window.onclick += () => {
  //   console.log("unload 2");
  // };
});