// DinnerModel Object constructor
var DinnerModel = function () {
  var _this = this;
  var observers = [];

  this.addObserver = (observer) => {
    observers.push(observer);
  }

  var notifyObservers = (details) => {
    for (var i = 0; i < observers.length; i++) {
      observers[i](_this, details);
    }
  }

  this.removeObserver = (observer) => {
    observers = observers.filter(e => e !== observer);
  }

  this.numberOfGuests = 1;

  this.setNumberOfGuests = (num) => {
    this.numberOfGuests = num;

    notifyObservers("numberOfGuests");
  }

  this.getNumberOfGuests = () => {
    return this.numberOfGuests;
  }

  var selectedDishes = [];
  this.getSelectedDishes = () => {
    return selectedDishes;
  };

  // Returns the dish that is(/are) on the (selected) menu for type
  this.getSelectedDish = (type) => {
    var dishType;
    selectedDishes.forEach((dish) => {
      if (dish["type"] === type) {
        dishType = dish;
      }
    });
    return dishType;
  }

  this.currentViewingDish;

  // Returns all the dishes on the (selected) menu.
  this.getFullMenu = () => {
    return selectedDishes;
  }

  // Returns all types of dishes
  this.getDishesTypes = () => {
    dishesTypes = [];

    dishes.forEach((dish) => {
      dishesTypes.push(dish["type"]);
    });

    return [...new Set(dishesTypes)];
  }

  // Returns all ingredients for all the dishes on the (selected) menu.
  this.getAllIngredients = () => {
    var ingredients = [];

    selectedDishes.forEach((dish) => {
      dish["ingredients"].forEach((ingredient) => {
        ingredients.push(ingredient);
      });
    });

    return ingredients;
  }

  // Returns the price of the selected dish
  // multiplied by the number of guests
  this.getDishPrice = (dish) => {
    var dishPrice = 0;

    dish["ingredients"].forEach((ingredient) => {
      dishPrice += ingredient["price"];
    });

    return dishPrice * this.getNumberOfGuests();
  }

  // Returns the total price of the (selected) menu (all the ingredients
  // multiplied by number of guests).
  this.getTotalMenuPrice = () => {
    var totalPrice = 0;

    selectedDishes.forEach((dish) => {
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
    console.log(selectedDishes); // the 3rd dish became undefined object, how could that be possible?
    var dishToAdd;
    dishes.forEach((dish) => {
      if (dish["id"] === id) {
        dishToAdd = dish;
      }
    });
    if (!dishToAdd) // there will be a strange bug if don't quit on this condition
      return false;
    var dishAlreadyInMenu = false;
    for (var i = 0; i < selectedDishes.length; i++) {
      if (selectedDishes[i].type === this.getDish(id).type) {
        dishAlreadyInMenu = true;
        selectedDishes.splice(i, 1);
        selectedDishes.push(dishToAdd);
      }
    }

    if (dishAlreadyInMenu === false) {
      selectedDishes.push(dishToAdd);
      console.log(runned);
    }
  }

  // Removes dish from (selected) menu
  this.removeDishFromMenu = (id) => {
    for (var i = 0; i < selectedDishes.length; i++) {
      if (selectedDishes[i]["id"] === id) {
        selectedDishes.splice(i, 1);
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
      var found = true;
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

  // show all dishes by default;
  var searchedDishes;
  this.getSearchedDishes = () => {
    return searchedDishes;
  };

  this.operateSearch = (type, keyword) => {
    searchedDishes = this.getAllDishes(type, keyword);
    notifyObservers("searchedDishes");
  };

  // Function that returns a dish of specific ID
  this.getDish = (id) => {
    for (key in dishes) {
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

  // the dishes variable contains an array of all the
  // dishes in the database. Each dish has id, name, type,
  // image (name of the image file), description and
  // array of ingredients. Each ingredient has name,
  // quantity (a number), price (a number) and unit (string
  // defining the unit i.e. "g", "slices", "ml". Unit
  // can sometimes be empty like in the example of eggs where
  // you just say "5 eggs" and not "5 pieces of eggs" or anything else.

  var dishes = [{
    'id': 1,
    'name': 'French toast',
    'type': 'starter',
    'image': 'toast.jpg',
    'description': "In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
    'ingredients': [{
      'name': 'eggs',
      'quantity': 0.5,
      'unit': '',
      'price': 10
    }, {
      'name': 'milk',
      'quantity': 30,
      'unit': 'ml',
      'price': 6
    }, {
      'name': 'brown sugar',
      'quantity': 7,
      'unit': 'g',
      'price': 1
    }, {
      'name': 'ground nutmeg',
      'quantity': 0.5,
      'unit': 'g',
      'price': 12
    }, {
      'name': 'white bread',
      'quantity': 2,
      'unit': 'slices',
      'price': 2
    }]
  }, {
    'id': 2,
    'name': 'Sourdough Starter',
    'type': 'starter',
    'image': 'sourdough.jpg',
    'description': "Here is how you make it... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    'ingredients': [{
      'name': 'active dry yeast',
      'quantity': 0.5,
      'unit': 'g',
      'price': 4
    }, {
      'name': 'warm water',
      'quantity': 30,
      'unit': 'ml',
      'price': 0
    }, {
      'name': 'all-purpose flour',
      'quantity': 15,
      'unit': 'g',
      'price': 2
    }]
  }, {
    'id': 3,
    'name': 'Baked Brie with Peaches',
    'type': 'starter',
    'image': 'bakedbrie.jpg',
    'description': "Here is how you make it... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    'ingredients': [{
      'name': 'round Brie cheese',
      'quantity': 10,
      'unit': 'g',
      'price': 8
    }, {
      'name': 'raspberry preserves',
      'quantity': 15,
      'unit': 'g',
      'price': 10
    }, {
      'name': 'peaches',
      'quantity': 1,
      'unit': '',
      'price': 4
    }]
  }, {
    'id': 100,
    'name': 'Meat balls',
    'type': 'main dish',
    'image': 'meatballs.jpg',
    'description': "Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
    'ingredients': [{
      'name': 'extra lean ground beef',
      'quantity': 115,
      'unit': 'g',
      'price': 20
    }, {
      'name': 'sea salt',
      'quantity': 0.7,
      'unit': 'g',
      'price': 3
    }, {
      'name': 'small onion, diced',
      'quantity': 0.25,
      'unit': '',
      'price': 2
    }, {
      'name': 'garlic salt',
      'quantity': 0.7,
      'unit': 'g',
      'price': 2
    }, {
      'name': 'Italian seasoning',
      'quantity': 0.6,
      'unit': 'g',
      'price': 3
    }, {
      'name': 'dried oregano',
      'quantity': 0.3,
      'unit': 'g',
      'price': 3
    }, {
      'name': 'crushed red pepper flakes',
      'quantity': 0.6,
      'unit': 'g',
      'price': 3
    }, {
      'name': 'Worcestershire sauce',
      'quantity': 6,
      'unit': 'ml',
      'price': 7
    }, {
      'name': 'milk',
      'quantity': 20,
      'unit': 'ml',
      'price': 4
    }, {
      'name': 'grated Parmesan cheese',
      'quantity': 5,
      'unit': 'g',
      'price': 8
    }, {
      'name': 'seasoned bread crumbs',
      'quantity': 15,
      'unit': 'g',
      'price': 4
    }]
  }, {
    'id': 101,
    'name': 'MD 2',
    'type': 'main dish',
    'image': 'bakedbrie.jpg',
    'description': "Here is how you make it... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    'ingredients': [{
      'name': 'ingredient 1',
      'quantity': 1,
      'unit': 'pieces',
      'price': 8
    }, {
      'name': 'ingredient 2',
      'quantity': 15,
      'unit': 'g',
      'price': 7
    }, {
      'name': 'ingredient 3',
      'quantity': 10,
      'unit': 'ml',
      'price': 4
    }]
  }, {
    'id': 102,
    'name': 'MD 3',
    'type': 'main dish',
    'image': 'meatballs.jpg',
    'description': "Here is how you make it... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    'ingredients': [{
      'name': 'ingredient 1',
      'quantity': 2,
      'unit': 'pieces',
      'price': 8
    }, {
      'name': 'ingredient 2',
      'quantity': 10,
      'unit': 'g',
      'price': 7
    }, {
      'name': 'ingredient 3',
      'quantity': 5,
      'unit': 'ml',
      'price': 4
    }]
  }, {
    'id': 103,
    'name': 'MD 4',
    'type': 'main dish',
    'image': 'meatballs.jpg',
    'description': "Here is how you make it... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    'ingredients': [{
      'name': 'ingredient 1',
      'quantity': 1,
      'unit': 'pieces',
      'price': 4
    }, {
      'name': 'ingredient 2',
      'quantity': 12,
      'unit': 'g',
      'price': 7
    }, {
      'name': 'ingredient 3',
      'quantity': 6,
      'unit': 'ml',
      'price': 4
    }]
  }, {
    'id': 200,
    'name': 'Chocolat Ice cream',
    'type': 'dessert',
    'image': 'icecream.jpg',
    'description': "Here is how you make it... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    'ingredients': [{
      'name': 'ice cream',
      'quantity': 100,
      'unit': 'ml',
      'price': 6
    }]
  }, {
    'id': 201,
    'name': 'Vanilla Ice cream',
    'type': 'dessert',
    'image': 'icecream.jpg',
    'description': "Here is how you make it... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    'ingredients': [{
      'name': 'ice cream',
      'quantity': 100,
      'unit': 'ml',
      'price': 6
    }]
  }, {
    'id': 202,
    'name': 'Strawberry',
    'type': 'dessert',
    'image': 'icecream.jpg',
    'description': "Here is how you make it... Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    'ingredients': [{
      'name': 'ice cream',
      'quantity': 100,
      'unit': 'ml',
      'price': 6
    }]
  }];

  // all code below should be deleted
  selectedDishes = [dishes[5], dishes[1], dishes[0]];
  searchedDishes = this.getAllDishes();
}