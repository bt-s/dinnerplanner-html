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

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }
  // In the essence, every variable in JS is an Object
  // So we can put a switchTo() function in this "Dic"
  var SCREENS = {
    "names": [
      "WELCOME",
      "SELECT_DISH",
      "DISH_DETAILS",
      "DINNER_OVERVIEW",
      "DINNER_PRINTOUT",
    ],
    // Variable to store current screen
    "currentScreen": "WELCOME", // Welcome by default
    "switchTo": (name) => {
      return SCREENS.currentScreen = name;
    }
  };
  // Instantiate all screens
  generalController
    .addScreen(SCREENS.names[0], [welcomeView])
    .addScreen(SCREENS.names[1], [sideBarView, dishSearchView])
    .addScreen(SCREENS.names[2], [sideBarView, dishDetailView])
    .addScreen(SCREENS.names[3], [dinnerOverviewView, titleBarView])
    .addScreen(SCREENS.names[4], [printView, titleBarView]);

  // read current screen name from local
  var readedScrnName = (document.cookie.length === 0) ?
    localStorage.getItem("currentScreen") :
    getCookie('currentScreen');
  // if the name is illegal, set to Welcome page
  SCREENS.currentScreen =
    SCREENS.names.indexOf(readedScrnName) === -1 ?
    "WELCOME" : readedScrnName;
  generalController.showScreen(
    SCREENS.switchTo(SCREENS.currentScreen));


  // save current screen name on machine 
  window.onunload = () => {
    //Chrome doesn't support cookies for local .html files
    document.cookie = 'currentScreen=' + SCREENS.currentScreen;
    //This is used for Chrome
    localStorage.setItem('currentScreen', SCREENS.currentScreen);
  };




});