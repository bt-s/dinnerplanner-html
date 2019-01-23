var GeneralController = function () {
  var views = [];
  var screens = [];

  var hideAll = () => {
    for (var key in views) {
      views[key].hide();
    }
  }

  this.addView = (view) => {
    views.push(view);
    return this;
  }

  this.addScreen = (name, views) => {
    screens[name] = views;
    return this;
  }

  this.showScreen = (name) => {
    hideAll();
    for (var key in screens[name]) {
      screens[name][key].show();
    }
  }
}
