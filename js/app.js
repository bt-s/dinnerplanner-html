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
  SCREENS_Set = new Set(SCREENS); // this should be global
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

  // read stored data from local
  var dataToStore = {
    "currentScreen": "",
    "numberOfGuests": 0,
    "selectedDishes": [],
    "searchCondition": []
  };

  if (document.cookie.length === 0) {
    for (key in dataToStore) {
      dataToStore[key] = localStorage.getItem(key);
      console.log(key, localStorage.getItem(key));
    }
    console.log(dataToStore);
  } else {
    for (key in dataToStore) {
      dataToStore[key] = getCookie(key);
      console.log(key, dataToStore[key]);
    }
  }
  // ---- Load data from local ----
  dataToStore['selectedDishes'].split(',').forEach((id) => {
    model.addDishToMenu(id);
  });
  model.setNumberOfGuests(Number(dataToStore['numberOfGuests']));
  dishSearchView.setSearchCondition(...dataToStore["searchCondition"].split(','));
  // if the name is illegal, set to Welcome page
  generalController.setCurrentScreen(
    SCREENS.indexOf(dataToStore['currentScreen']) === -1 ?
    "WELCOME" : dataToStore['currentScreen']
  );
  generalController.showScreen(generalController.getCurrentScreen());


  // save current screen name on machine 
  window.onunload = () => {
    //Chrome doesn't support cookies for local .html files
    document.cookie = 'currentScreen=' + generalController.getCurrentScreen();
    document.cookie = "numberOfGuests=" + model.getNumberOfGuests();
    var sl = [];
    var slStr = '';
    console.log(model.getSelectedDishes(), 'selected dishes');
    for (var i = 0; i < model.getSelectedDishes().length; i++) {
      sl.push(model.getSelectedDishes()[i].id);
      slStr += ',' + model.getSelectedDishes()[i].id;
    }
    slStr = slStr.substr(1);
    console.log(slStr, 'sss');
    document.cookie = "selectedDishes=" + sl;
    document.cookie = "searchCondition=" + dishSearchView.getSearchCondition();
    //This is used for Chrome
    localStorage.setItem('currentScreen', generalController.getCurrentScreen());
    localStorage.setItem('numberOfGuests', model.getNumberOfGuests() + '');
    localStorage.setItem('selectedDishes', slStr);
    var searchConStr = dishSearchView.getSearchCondition();
    searchConStr = searchConStr[0] + ',' + searchConStr[1];
    localStorage.setItem('searchCondition', searchConStr);
    for (key in dataToStore) {
      dataToStore[key] = localStorage.getItem(key);
      console.log(localStorage.getItem(key));
    }

  };




});