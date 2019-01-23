var GeneralController = function () {
  var views = [];
  var screens = [];

  var hideAll = function () {
    for (var key in views) {
      views[key].hide();
    }
  }

  this.addView = function (view) {
    views.push(view);
    return this;
  }

  this.addScreen = function (name, views) {
    screens[name] = views;
    return this;
  }

  this.showScreen = function (name) {
    hideAll();
    for (var key in screens[name]) {
      screens[name][key].show();
    }
  }
}