$(function () {
  // We instantiate our model at the beginning
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
  var dishItemViewController =
    new DishItemViewController($("#searchedDishes"), model, generalController);

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }

  var SCREENS = [
    "WELCOME",
    "SELECT_DISH",
    "DISH_DETAILS",
    "DINNER_OVERVIEW",
    "DINNER_PRINTOUT"
  ];
  // this set is created from the SCREENS list
  // key and value are the same
  var SCREENS_Set = new Set(SCREENS);
  SCREENS.forEach((item) => {
    SCREENS_Set[item] = item;
  });

  // Register && Initialize Odd Elements
  generalController.addOddElement("headLine", $("#headLine"));
  generalController.initOddElements();
  // Instantiate all screens
  generalController
    .addScreen(SCREENS_Set.WELCOME, [welcomeView])
    .addScreen(SCREENS_Set.SELECT_DISH, [sideBarView, dishSearchView])
    .addScreen(SCREENS_Set.DISH_DETAILS, [sideBarView, dishDetailView])
    .addScreen(SCREENS_Set.DINNER_OVERVIEW, [dinnerOverviewView, titleBarView])
    .addScreen(SCREENS_Set.DINNER_PRINTOUT, [printView, titleBarView]);

  // read current screen name from local
  var readedScrnName = (document.cookie.length === 0) ?
    localStorage.getItem("currentScreen") :
    getCookie('currentScreen');
  // if the name is illegal, set to Welcome page
  generalController.setCurrentScreen(
    SCREENS.indexOf(readedScrnName) === -1 ?
    "WELCOME" : readedScrnName
  );
  generalController.showScreen(generalController.getCurrentScreen());


  // save current screen name on machine 
  window.onunload = () => {
    //Chrome doesn't support cookies for local .html files
    document.cookie = 'currentScreen=' + generalController.getCurrentScreen();
    //This is used for Chrome
    localStorage.setItem('currentScreen', generalController.getCurrentScreen());
  };




});