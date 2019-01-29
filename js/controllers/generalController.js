let GeneralController = function () {
  let _oddElements = {}; // elements not in any view
  let _views = [];
  let _screens = [];
  let _currentScreen = "";

  let _hideAll = () => {
    for (let key in _views) {
      _views[key].hide();
    }
  }

  this.addOddElement = (name, element) => {
    _oddElements[name] = element;
  }

  this.initOddElements = () => {
    _oddElements.headLine.click(() => {
      this.showScreen("WELCOME");
    });
  }

  this.setCurrentScreen = (name) => {
    _currentScreen = name;
  }

  this.getCurrentScreen = () => {
    return _currentScreen;
  };

  this.addView = (view) => {
    _views.push(view);
    return this;
  }

  this.addScreen = (name, viewsToAdd) => {
    _screens[name] = viewsToAdd;
    return this;
  }

  this.showScreen = (name) => {
    _currentScreen = name;
    _hideAll();
    for (let key in _screens[name]) {
      _screens[name][key].show();
    }
  }
}
