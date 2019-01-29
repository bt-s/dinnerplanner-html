$(function () {
  // We instantiate our model at the beginning
  const model = new DinnerModel();

  // We instantiate our general controller
  const generalController = new GeneralController();

  // Create the instances of our view
  const welcomeView = new WelcomeView($("#welcomeView"), model);
  const sideBarView = new SideBarView($("#sideBarView"), model);
  const dishSearchView = new DishSearchView($("#dishSearchView"), model);
  const dishDetailView = new DishDetailView($("#dishDetailView"), model);
  const dinnerOverviewView = new DinnerOverviewView($("#dinnerOverviewView"), model);
  const titleBarView = new TitleBarView($("#titleBarView"), model);
  const printView = new PrintView($("#printView"), model);

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
  const welcomeViewController =
    new WelcomeViewController(welcomeView, model, generalController);
  const sideBarViewController =
    new SideBarViewController(sideBarView, model, generalController);
  const dishSearchViewController =
    new DishSearchViewController(dishSearchView, model, generalController);
  const dishDetailsViewController =
    new DishDetailsViewController(dishDetailView, model, generalController);
  const dinnerOverviewViewController =
    new DinnerOverviewViewController(dinnerOverviewView, model, generalController);
  const titleBarViewController =
    new TitleBarViewController(titleBarView, model, generalController);
  const dishItemViewController =
    new DishItemViewController($("#searchedDishes"), model, generalController);

  const SCREENS = [
    "WELCOME",
    "SELECT_DISH",
    "DISH_DETAILS",
    "DINNER_OVERVIEW",
    "DINNER_PRINTOUT"
  ];

  // Register && Initialize Odd Elements
  generalController.addOddElement("headLine", $("#headLine"));
  generalController.initOddElements();

  // Instantiate all screens
  generalController
    .addScreen("WELCOME", [welcomeView])
    .addScreen("SELECT_DISH", [sideBarView, dishSearchView])
    .addScreen("DISH_DETAILS", [sideBarView, dishDetailView])
    .addScreen("DINNER_OVERVIEW", [dinnerOverviewView, titleBarView])
    .addScreen("DINNER_PRINTOUT", [printView, titleBarView]);

  // read stored data from local
  let dataToStore = {
    "currentScreen": "",
    "numberOfGuests": 0,
    "selectedDishes": [],
    "searchCondition": []
  };

  let storeCookies = () => {
    let getCookie = (cname) => {
      let name = cname + "=";
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    }

    if (document.cookie.length === 0) {
      for (key in dataToStore) {
        dataToStore[key] = localStorage.getItem(key);
      }
    } else {
      for (key in dataToStore) {
        dataToStore[key] = getCookie(key);
      }
    }
  }

  function loadDataFromLocal() {
    if (dataToStore['selectedDishes'] !== null) {
      dataToStore['selectedDishes'].split(',').forEach((id) => {
        model.addDishToMenu(id);
      });
      model.setNumberOfGuests(Number(dataToStore['numberOfGuests']));
      dishSearchView.setSearchCondition(...dataToStore["searchCondition"].split(','));
    }
    // if the name is illegal, set to Welcome page
    generalController.setCurrentScreen(
      SCREENS.indexOf(dataToStore['currentScreen']) === -1 ?
      "WELCOME" : dataToStore['currentScreen']
    );
    generalController.showScreen(generalController.getCurrentScreen());
  }

  storeCookies();
  loadDataFromLocal();

  // Save current screen name on machine
  window.addEventListener("unload", function(event) {
    let currentScreen = generalController.getCurrentScreen();
    let numberOfGuests = model.getNumberOfGuests();
    let searchCond = dishSearchView.getSearchCondition();

    document.cookie = 'currentScreen=' + currentScreen;
    document.cookie = "numberOfGuests=" + numberOfGuests;

    let sl = [];
    let slStr = '';
    model.getSelectedDishes().forEach((dish) => {
      sl.push(dish.id);
      slStr += ',' + dish.id;
    });
    slStr = slStr.substr(1);

    document.cookie = "selectedDishes=" + sl;
    document.cookie = "searchCondition=" + searchCond;

    // Chrome doesn't support cookies for local .html files, so the followiung
    // is used for Chrome
    localStorage.setItem('currentScreen', currentScreen);
    localStorage.setItem('numberOfGuests', numberOfGuests + '');
    localStorage.setItem('selectedDishes', slStr);
    let searchCondStr = searchCond[0] + ',' + searchCond[1];
    localStorage.setItem('searchCondition', searchCondStr);
    for (key in dataToStore) {
      dataToStore[key] = localStorage.getItem(key);
    }
  });
});
