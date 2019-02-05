$(function () {
  let dataToStore = {
    'currentScreen': '',
    'numberOfGuests': 0,
    'selectedDishes': [],
    'searchCondition': []
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

  // TODO: request recipe data after page refresh
  function requestRecipeData(type, kwd) {
    let params = new URLSearchParams();
    params.append('number', 20);
    type ? params.append('type', type) : null;
    kwd ? params.append('query', kwd) : null;
    let url = API_Search_Recipe + '?' + params.toString();

    return fetch(url, {
      method: 'GET',
      headers: {
        'X-Mashape-Key': API_Key
      }
    }).then(res => res.json())
    .then((json) => {
      this.setSearchedDishes(json.results)
        imgBaseUrl = json.baseUri;
    });
  }

  function injectDataIntoModel() {
    if (dataToStore['selectedDishes'] !== null) {
      dataToStore['selectedDishes'].split(',').forEach((id) => {
        if (id !== '') {
          model.addDishToMenu(id);
        }
      });
      model.setNumberOfGuests(Number(dataToStore['numberOfGuests']));
      model.setSearchCondition(...dataToStore['searchCondition'].split(','));
    }
  }

  function updateViews() {
    if (dataToStore['selectedDishes'] !== null) {
      dishSearchView.setSearchCondition(...dataToStore['searchCondition'].split(','));
      if (dataToStore['currentScreen'] !== null) {
        generalController.setCurrentScreen(
          SCREENS.indexOf(dataToStore['currentScreen']) === -1 ?
          'WELCOME' : dataToStore['currentScreen']
        );
        generalController.showScreen(generalController.getCurrentScreen());
      }
    }
  }

  generalController.showScreen("WELCOME");
  updateViews();

  window.addEventListener('unload', function (event) {
    let currentScreen = generalController.getCurrentScreen();
    let numberOfGuests = model.getNumberOfGuests();
    let searchCond = dishSearchView.getSearchCondition();

    document.cookie = 'currentScreen=' + currentScreen;
    document.cookie = 'numberOfGuests=' + numberOfGuests;

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
    localStorage.setItem('numberOfGuests', numberOfGuests + '');
    localStorage.setItem('selectedDishes', slStr);
    let searchCondStr = searchCond[0] + ',' + searchCond[1];
    localStorage.setItem('searchCondition', searchCondStr);

    for (let key in dataToStore) {
      dataToStore[key] = localStorage.getItem(key);
    }
  });
})
