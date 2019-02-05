class DinnerModel {
  constructor() {
    const APIKey = '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767';
    const APISearchRecipe = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search';
    const APIRecipeInfo = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/{id}/information';

    const _this = this;
    const dishesData = new DishesData();
    const dishes = dishesData.dishes;
    Object.freeze(dishes);

    this.numberOfGuests = 1;

    let searchedDishes = [];
    let searchedDishesMAP = {};
    let dishTypes = [
      'main course',
      'side dish',
      'dessert',
      'appetizer',
      'salad',
      'bread',
      'breakfast',
      'soup',
      'beverage',
      'sauce',
      'drink'
    ];

    let imgBaseUrl = '';
    let selectedDishIDs = [];
    let storedDishes = {};
    let observers = [];
    let searchCondition = ['', '']; // keyword, type

    let notifyObservers = (details) => {
      for (let i = 0; i < observers.length; i++) {
        observers[i](_this, details);
      }
    }

    let URLWithParams = (url, params) => {
      let urlParams = new URLSearchParams();
      for (let key in params) {
        urlParams.append(key, params[key]);
      }
      return url + '?' + urlParams.toString();
    }

    this.requestRecipeInfo = (id) => {
      url = URLWithParams(APIRecipeInfo.replace('{id}', id),
          {'id': id, 'includeNutrition': false });

      return fetch(url, {
        method: 'GET',
        headers: {
          'X-Mashape-Key': APIKey
        }
      })
      .then(res => res.json())
        .then((json) => {
          searchedDishes.forEach((dish) => {
            if (dish.id == id) {
              dish.info = json;
              storedDishes[id] = dish;
              notifyObservers('viewingDishDetail');
              return;
            }
          })
        })
    };

    this.addObserver = (observer) => {
      observers.push(observer);
    }

    this.getImgBaseUrl = () => {
      return imgBaseUrl;
    }

    this.setNumberOfGuests = (num) => {
      this.numberOfGuests = num;
      notifyObservers('numberOfGuests');
    }

    this.getNumberOfGuests = () => {
      return this.numberOfGuests;
    }

    this.getSelectedDishes = () => {
      let selectedDishes = [];
      selectedDishIDs.forEach((id) => {
        selectedDishes.push(this.getLocalDish(id));
      })

      return selectedDishes;
    };

    this.clearSelectedDishes = () => {
      selectedDishIDs = [];
    }

    this.getSelectedDish = (type) => {
      let dishType;
      selectedDishIDs.forEach((id) => {
        let dish = this.getDish(id);
        if (dish['type'] === type) {
          dishType = dish;
        }
      })

      return dishType;
    }

    let currentViewingDish = null;

    this.getCurrentViewingDish = () => {
      return currentViewingDish;
    };

    this.setCurrentViewingDish = (id) => {
      currentViewingDish = this.getLocalDish(id);
    };

    this.getFullMenu = () => {
      return this.getSelectedDishes();
    }

    this.getDishesTypes = () => {
      return [...new Set(dishTypes)];
    }

    this.getAllIngredients = () => {
      let ingredients = [];

      selectedDishIDs.forEach((id) => {
        let dish = this.getLocalDish(id);

        dish['ingredients'].forEach((ingredient) => {
          ingredients.push(ingredient);
        })
      })

      return ingredients;
    }

    this.getDishPrice = (dish) => {
      return dish.info.pricePerServing;
    }

    this.getDishName = (dish) => {
      return dish.title;
    }

    this.getDishDescription = (dish) => {
      return dish.info.instructions;
    }

    this.getDishPreparation = (dish) => {
      return dish.info.instructions;
    }

    this.getTotalMenuPrice = () => {
      let totalPrice = 0;
      selectedDishIDs.forEach((id) => {
        totalPrice += storedDishes[id].info.pricePerServing;
      })

      return totalPrice * this.getNumberOfGuests();
    }

    this.addDishToMenu = (newID) => {
      for (let i = 0; i < selectedDishIDs.length; i++) {
        if (newID == selectedDishIDs[i]) {
          return;
        }
      }

      selectedDishIDs.push(newID);
      notifyObservers('selectedDishes')
    }

    this.removeDishFromMenu = (id) => {
      for (let i = 0; i < selectedDishIDs.length; i++) {
        if (selectedDishIDs[i] === id) {
          selectedDishIDs.splice(i, 1);
        }
      }
    }

    this.getAllDishes = (type, kwd) => {
      let params = new URLSearchParams();
      params.append('number', 20);
      type ? params.append('type', type) : null;
      kwd ? params.append('query', kwd) : null;
      let url = APISearchRecipe + '?' + params.toString();

      return fetch(url, {
        method: 'GET',
        headers: {
          'X-Mashape-Key': APIKey
        }
      }).then(res => res.json())
      .then((json) => {
        this.setSearchedDishes(json.results)
          imgBaseUrl = json.baseUri;
      });
    }

    this.getSearchCondition = () => {
      return searchCondition;
    }

    this.setSearchCondition = (type, kwd) => {
      searchCondition[0] = type;
      searchCondition[1] = kwd;
      notifyObservers('searchCondition');
    }

    this.getSearchedDishes = () => {
      return searchedDishes;
    }

    this.setSearchedDishes = (dishes) => {
      searchedDishes = dishes;
      searchedDishes.forEach(dish => {
        searchedDishesMAP[dish.id.toString()] = dish;
      })
    }

    this.operateSearch = (type, keyword) => {
      this.getAllDishes(type, keyword)
        .then(() => {
          notifyObservers('searchedDishes');
        })
    }

    this.getLocalDish = (id) => {
      for (let key in searchedDishes) {
        if (searchedDishes[key].id == id) {
          return searchedDishes[key];
        }
      }
    }

    this.getDish = (id) => {
      for (let key in dishes) {
        if (dishes[key].id == id) {
          return dishes[key];
        }
      }
    }

    this.welcomeText = '\
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do \
                       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim \
                       ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut  \
                       aliquip ex ea commodo consequat.'
  }
}
