var GeneralController = function () {
  var _oddElements = {}; // elements not in any view
  var _views = [];
  var _screens = [];
  var _currentScreen = "";

  var _hideAll = () => {
    for (var key in _views) {
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
    for (var key in _screens[name]) {
      _screens[name][key].show();
    }
  }
}