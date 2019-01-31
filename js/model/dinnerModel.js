// DinnerModel Object constructor
let DinnerModel = function () {
  const _this = this;

  const dishesData = new DishesData();
  const dishes = dishesData.dishes;
  Object.freeze(dishes);

  let observers = [];

  this.addObserver = (observer) => {
    observers.push(observer);
  }

  let notifyObservers = (details) => {
    for (let i = 0; i < observers.length; i++) {
      observers[i](_this, details);
    }
  }

  this.numberOfGuests = 1;

  this.setNumberOfGuests = (num) => {
    this.numberOfGuests = num;
    notifyObservers("numberOfGuests");
  }

  this.getNumberOfGuests = () => {
    return this.numberOfGuests;
  }

  let selectedDishIDs = [];
  this.getSelectedDishes = () => {
    let selectedDishes = [];
    selectedDishIDs.forEach((id) => {
      selectedDishes.push(this.getDish(id));
    });
    return selectedDishes;
  };
  this.clearSelectedDishes = () => {
    selectedDishIDs = [];
  }

  // Returns the dish that is(/are) on the (selected) menu for type
  this.getSelectedDish = (type) => {
    let dishType;
    selectedDishIDs.forEach((id) => {
      let dish = this.getDish(id);
      if (dish["type"] === type) {
        dishType = dish;
      }
    });
    return dishType;
  }

  let currentViewingDish = dishes[0];

  this.getCurrentViewingDish = () => {
    return currentViewingDish;
  };

  this.setCurrentViewingDish = (id) => {
    currentViewingDish = this.getDish(id);
    notifyObservers("viewingDish");
  };

  // Returns all the dishes on the (selected) menu.
  this.getFullMenu = () => {
    return this.getSelectedDishes();
  }

  // Returns all types of dishes
  this.getDishesTypes = () => {
    let dishesTypes = [];

    dishes.forEach((dish) => {
      dishesTypes.push(dish["type"]);
    });

    return [...new Set(dishesTypes)];
  }

  // Returns all ingredients for all the dishes on the (selected) menu.
  this.getAllIngredients = () => {
    let ingredients = [];
    selectedDishIDs.forEach((id) => {
      let dish = this.getDish(id);
      dish["ingredients"].forEach((ingredient) => {
        ingredients.push(ingredient);
      });
    });

    return ingredients;
  }

  // Returns the price of the selected dish
  // multiplied by the number of guests
  this.getDishPrice = (dish) => {
    let dishPrice = 0;

    dish["ingredients"].forEach((ingredient) => {
      dishPrice += ingredient["price"];
    });

    return dishPrice * this.getNumberOfGuests();
  }

  // Returns the total price of the (selected) menu (all the ingredients
  // multiplied by number of guests).
  this.getTotalMenuPrice = () => {
    let totalPrice = 0;

    selectedDishIDs.forEach((id) => {
      let dish = this.getDish(id);
      dish["ingredients"].forEach((ingredient) => {
        totalPrice += ingredient["price"];
      });
    });

    return totalPrice * this.getNumberOfGuests();
  }

  // Adds the passed dish to the (selected) menu. If the dish of that type
  // already exists on the (selected) menu it is removed from the (selected)
  // menu and the new one is added.
  this.addDishToMenu = (id) => {
    dishes.forEach((dish) => {
      if (dish["id"] != id)
        return;
      let replaced = false;
      for (let i = 0; i < selectedDishIDs.length; i++) {
        if (this.getDish(selectedDishIDs[i]).type === this.getDish(id).type) {
          selectedDishIDs[i] = id;
          replaced = true;
        }
      }
      if (!replaced) {
        selectedDishIDs.push(id);
      }
      notifyObservers("selectedDishes");

    });
  }

  // Removes dish from (selected) menu
  this.removeDishFromMenu = (id) => {
    for (let i = 0; i < selectedDishIDs.length; i++) {
      if (selectedDishIDs[i] == id) {
        selectedDishIDs.splice(i, 1);
      }
    }
  }

  // Function that returns all dishes of specific type (i.e. "starter",
  // "main dish" or "dessert"). You can use the filter argument to filter out
  // the dish by name or ingredient (use for search). If you don't pass any
  // filter all the dishes of the specified type will be returned. If you
  // don't pass any type, all the dishes will be returned.
  this.getAllDishes = (type, filter) => {
    return dishes.filter((dish) => {
      let found = true;

      if (filter) {
        found = false;
        dish.ingredients.forEach((ingredient) => {
          if (ingredient.name.indexOf(filter) != -1) {
            found = true;
          }
        });

        if (dish.name.indexOf(filter) != -1) {
          found = true;
        }
      }

      if (type)
        return dish.type == type && found;

      return found;
    });
  }

  let searchCondition = ["", ""]; // keyword, type
  this.getSearchCondition = () => {
    return searchCondition;
  }
  this.setSearchCondition = (type, kwd) => {
    searchCondition[0] = type;
    searchCondition[1] = kwd;
    notifyObservers("searchCondition");
  }

  let searchedDishes = dishes;
  this.getSearchedDishes = () => {
    return searchedDishes;
  };

  this.operateSearch = (type, keyword) => {
    searchedDishes = this.getAllDishes(type, keyword);
    notifyObservers("searchedDishes");
  };

  // Function that returns a dish of specific ID
  this.getDish = (id) => {
    for (const key in dishes) {
      if (dishes[key].id == id) {
        return dishes[key];
      }
    }
  }

  // Welcome text
  this.welcomeText = "\
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do \
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim \
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut  \
          aliquip ex ea commodo consequat."
}