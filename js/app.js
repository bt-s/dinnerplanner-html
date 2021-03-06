$(function () {
  let dataToStore = {
    'currentScreen': '',
    'numberOfGuests': 1,
    'selectedDishes': [],
    'searchCondition': [],
    'viewingDishID': '',
    'offset': 0
  }

  document.querySelector('body').hidden = false;

  const model = new DinnerModel();
  loadDataFromLocal();
  injectDataIntoModel();

  const generalController = new GeneralController();

  const welcomeView = new WelcomeView($('#welcomeView'), model);
  const sideBarView = new SideBarView($('#sideBarView'), model);
  const dishSearchView = new DishSearchView($('#dishSearchView'), model);
  const dishDetailView = new DishDetailView($('#dishDetailView'), model);
  const dinnerOverviewView = new DinnerOverviewView($('#dinnerOverviewView'), model);
  const titleBarView = new TitleBarView($('#titleBarView'), model);
  const printView = new PrintView($('#printView'), model);

  generalController
    .addView(welcomeView)
    .addView(sideBarView)
    .addView(dishSearchView)
    .addView(dishDetailView)
    .addView(dinnerOverviewView)
    .addView(titleBarView)
    .addView(printView);

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
    new DishItemViewController($('#searchedDishes'), model, generalController);

  const SCREENS = [
    'WELCOME',
    'SELECT_DISH',
    'DISH_DETAILS',
    'DINNER_OVERVIEW',
    'DINNER_PRINTOUT'
  ];

  generalController.addOddElement('headLine', $('#headLine'));
  generalController.initOddElements();

  generalController
    .addScreen('WELCOME', [welcomeView])
    .addScreen('SELECT_DISH', [sideBarView, dishSearchView])
    .addScreen('DISH_DETAILS', [sideBarView, dishDetailView])
    .addScreen('DINNER_OVERVIEW', [dinnerOverviewView, titleBarView])
    .addScreen('DINNER_PRINTOUT', [printView, titleBarView]);

  generalController.showScreen('WELCOME');

  updateViews();


  function loadDataFromLocal() {
    let getCookie = (cname) => {
      let name = cname + '=';
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return '';
    }

    if (document.cookie.length === 0) {
      for (let key in dataToStore) {
        dataToStore[key] = localStorage.getItem(key);
      }
    } else {
      for (let key in dataToStore) {
        dataToStore[key] = getCookie(key);
      }
    }
  }

  function injectDataIntoModel() {
    const selectedDishes = dataToStore['selectedDishes'];
    const viewingDishID = dataToStore['viewingDishID'];
    const offset = dataToStore['offset'] ? parseInt(dataToStore['offset']) : 0;

    if (selectedDishes == null) {
      return;
    }

    const ids = selectedDishes.split(',');
    // delete empty items
    for (let i = 0; i < ids.length; i++) {
      if (!ids[i]) {
        ids.splice(i, 1);
      }
    }

    // Add dish to menu
    ids.forEach((id) => {
      if (id !== '') {
        model.addDishToMenu(id);
      }
    });

    // Load data into storedDishes
    if (viewingDishID) {
      ids.push(viewingDishID);
    }

    if (ids.length > 0) {
      model.requestRecipeData(ids)
        .then(param => {
          if (viewingDishID) {
            model.setCurrentViewingDish(viewingDishID);
          }
        });
    }

    model.setNumberOfGuests(Number(dataToStore['numberOfGuests']));
    model.setSearchCondition(...dataToStore['searchCondition'].split(','));
    model.setOffset(offset);
  }

  function updateViews() {
    const searchCondition = dataToStore['searchCondition'];
    const currentScreen = dataToStore['currentScreen'];

    const hideLoader = () => {
      const loader = document.querySelector('.loader');
      loader.classList.add('hide');
    }

    if (currentScreen == null) {
      hideLoader();
      return;
    }

    if (searchCondition == null) {
      return;
    }

    dishSearchView.setSearchCondition(...searchCondition.split(','));


    generalController.setCurrentScreen(
      SCREENS.indexOf(currentScreen) === -1 ?
      'WELCOME' : currentScreen
    );

    if (generalController.getCurrentScreen() === 'WELCOME') {
      hideLoader();
    }

    generalController.showScreen(generalController.getCurrentScreen());
  }

  window.addEventListener('unload', function (event) {
    let currentScreen = generalController.getCurrentScreen();
    let numberOfGuests = model.getNumberOfGuests() + '';
    let searchCond = dishSearchView.getSearchCondition();
    let viewingDishID = model.getCurrentViewingDish();
    let offset = model.getOffset();

    viewingDishID = viewingDishID ? viewingDishID.id : false;

    document.cookie = 'currentScreen=' + currentScreen;
    document.cookie = 'numberOfGuests=' + numberOfGuests;
    document.cookie = 'offset=' + offset;

    if (viewingDishID) {
      document.cookie = 'viewingDishID=' + viewingDishID;
    }

    let sl = [];
    let slStr = '';
    model.getSelectedDishes().forEach((dish) => {
      sl.push(dish.id);
      slStr += ',' + dish.id;
    });

    slStr = slStr.substr(1);

    document.cookie = 'selectedDishes=' + sl;
    document.cookie = 'searchCondition=' + searchCond;

    // Chrome doesn't support cookies for local .html files, so the followiung
    // is used for Chrome
    localStorage.setItem('currentScreen', currentScreen);
    localStorage.setItem('numberOfGuests', numberOfGuests);
    localStorage.setItem('selectedDishes', slStr);
    localStorage.setItem('offset', offset);

    let searchCondStr = searchCond[0] + ',' + searchCond[1] + ',' + searchCond[2];
    localStorage.setItem('searchCondition', searchCondStr);

    if (viewingDishID) {
      localStorage.setItem('viewingDishID', viewingDishID)
    }

    for (let key in dataToStore) {
      dataToStore[key] = localStorage.getItem(key);
    }
  });
})
