$(function () {
  // read stored data from local, use var to elevate
  let dataToStore = {
    "currentScreen": "",
    "numberOfGuests": 0,
    "selectedDishes": [],
    "searchCondition": []
  };

  // Show the whole page when loading the main script
  document.querySelector("body").hidden = false;

  // We instantiate our model at the beginning
  const model = new DinnerModel();
  loadDataFromLocal();
  injectDataIntoModel();
  // We instantiate our general controller
  // @ts-ignore
  const generalController = new GeneralController();

  // Create the instances of our view
  // @ts-ignore
  const welcomeView = new WelcomeView($("#welcomeView"), model);
  // @ts-ignore
  const sideBarView = new SideBarView($("#sideBarView"), model);
  // @ts-ignore
  const dishSearchView = new DishSearchView($("#dishSearchView"), model);
  // @ts-ignore
  const dishDetailView = new DishDetailView($("#dishDetailView"), model);
  // @ts-ignore
  const dinnerOverviewView = new DinnerOverviewView($("#dinnerOverviewView"), model);
  // @ts-ignore
  const titleBarView = new TitleBarView($("#titleBarView"), model);
  // @ts-ignore
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
  // @ts-ignore
  const welcomeViewController =
    // @ts-ignore
    new WelcomeViewController(welcomeView, model, generalController);
  // @ts-ignore
  const sideBarViewController =
    // @ts-ignore
    new SideBarViewController(sideBarView, model, generalController);
  // @ts-ignore
  const dishSearchViewController =
    // @ts-ignore
    new DishSearchViewController(dishSearchView, model, generalController);
  // @ts-ignore
  const dishDetailsViewController =
    // @ts-ignore
    new DishDetailsViewController(dishDetailView, model, generalController);
  // @ts-ignore
  const dinnerOverviewViewController =
    // @ts-ignore
    new DinnerOverviewViewController(dinnerOverviewView, model, generalController);
  // @ts-ignore
  const titleBarViewController =
    // @ts-ignore
    new TitleBarViewController(titleBarView, model, generalController);
  // @ts-ignore
  const dishItemViewController =
    // @ts-ignore
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



  // had to use function in order to elevate its scope
  function loadDataFromLocal() {
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
      // @ts-ignore
      for (key in dataToStore) {
        // @ts-ignore
        dataToStore[key] = localStorage.getItem(key);
      }
    } else {
      // @ts-ignore
      for (key in dataToStore) {
        // @ts-ignore
        dataToStore[key] = getCookie(key);
      }
    }
  }

  function injectDataIntoModel() {
    if (dataToStore['selectedDishes'] !== null) {
      // @ts-ignore
      dataToStore['selectedDishes'].split(',').forEach((id) => {
        model.addDishToMenu(id);
      });
      model.setNumberOfGuests(Number(dataToStore['numberOfGuests']));
      // @ts-ignore

      model.setSearchCondition(...dataToStore["searchCondition"].split(','));

    }
  }

  function updateViews() {
    dishSearchView.setSearchCondition(...dataToStore["searchCondition"].split(','));
    if (dataToStore['currentScreen'] !== null) {
      // if the name is illegal, set to Welcome page
      generalController.setCurrentScreen(
        SCREENS.indexOf(dataToStore['currentScreen']) === -1 ?
        "WELCOME" : dataToStore['currentScreen']
      );
      generalController.showScreen(generalController.getCurrentScreen());
    }
  }

  updateViews();

  // @ts-ignore
  window.addEventListener("unload", function (event) {
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
    // @ts-ignore
    for (key in dataToStore) {
      // @ts-ignore
      dataToStore[key] = localStorage.getItem(key);
    }
  });
});