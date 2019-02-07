class DinnerModel {
  constructor() {
    const APISearchRecipe = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search';
    const APIRecipeInfo = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/{id}/information';
    const APIRecipeData = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk';

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
    let searchCondition = ['', '', 0]; // keyword, type
    let offset = 0;

    let notifyObservers = (details) => {
      for (let i = 0; i < observers.length; i++) {
        observers[i](_this, details);
      }
    }

    function handleErrors(response) {
      if (!response.ok) {
        if (response.status === 404) {
          return Promise.reject({
            PageNotFound: true
          });
        }
        throw Error(response.statusText);
      }
      return response;
    }

    const errorMsg = 'Whoops... something went wrong!\n' +
      'Please check your Internet connection.\n\n' +
      'The reported error is: '

    let URLWithParams = (url, params) => {
      let urlParams = new URLSearchParams();
      for (let key in params) {
        urlParams.append(key, params[key]);
      }
      return url + '?' + urlParams.toString();
    }

    this.requestRecipeInfo = (id) => {
      notifyObservers('loadingData');

      const url = URLWithParams(APIRecipeInfo.replace('{id}', id), {
        'id': id,
        'includeNutrition': false
      });

      const options = {
        method: 'GET',
        headers: {
          'X-Mashape-Key': APIKey
        }
      };

      return fetch(url, options)
        .then(handleErrors)
        .then(res => res.json())
        .then((json) => {
          searchedDishes.forEach((dish) => {
            if (dish.id != id) {
              return
            }

            dish.info = json;
            storedDishes[id] = dish.info;
            this.setCurrentViewingDish(id);

            notifyObservers('viewingDishDetail');
            notifyObservers('loadedData');
          })
        })
        .catch(error => {
          if (error.PageNotFound) {
            alert('Sorry, This dish is unvailable');
            notifyObservers('dishNotFound');
            throw error;
          }
          alert(errorMsg + error);
        });
    };

    this.requestRecipeData = (ids) => {
      let url = URLWithParams(APIRecipeData, {
        'ids': ids.toString(),
        'includeNutrition': false
      });

      const options = {
        method: 'GET',
        headers: {
          'X-Mashape-Key': APIKey
        }
      };

      return fetch(url, options)
        .then(handleErrors)
        .then(res => res.json())
        .then((dishes) => {
          dishes.forEach((dish) => {
            storedDishes[dish.id] = dish;
          });
          notifyObservers('selectedDishes');
        })
        .catch(error => alert(errorMsg + error));
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
        selectedDishes.push(storedDishes[id]);
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
      currentViewingDish = storedDishes[id];
      notifyObservers('viewingDishDetail')
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

    // TODO, use a uniformed way to access property of dish
    this.getDishPrice = (dish) => {
      return dish.pricePerServing;
    }

    this.getDishName = (dish) => {
      return dish.title;
    }

    this.getDishDescription = (dish) => {
      return dish.instructions;
    }

    this.getDishPreparation = (dish) => {
      return dish.instructions;
    }

    this.getTotalMenuPrice = () => {
      let totalPrice = 0;
      selectedDishIDs.forEach((id) => {
        totalPrice += storedDishes[id].pricePerServing;
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

    this.getAllDishes = (type, kwd, offset) => {
      notifyObservers('loadingData');
      let params = new URLSearchParams();
      params.append('number', ITEMS_PER_PAGE);
      params.append('offset', offset);
      type ? params.append('type', type) : null;
      kwd ? params.append('query', kwd) : null;
      let url = APISearchRecipe + '?' + params.toString();

      const options = {
        method: 'GET',
        headers: {
          'X-Mashape-Key': APIKey
        }
      };

      return fetch(url, options)
        .then(handleErrors)
        .then(res => res.json())
        .then((json) => {
          this.setSearchedDishes(json.results)
          imgBaseUrl = json.baseUri;
          notifyObservers('loadedData');
        })
        .catch(error => alert(errorMsg + error));
    }

    this.getSearchCondition = () => {
      return searchCondition;
    }

    this.setSearchCondition = (type, kwd, offset) => {
      searchCondition[0] = type;
      searchCondition[1] = kwd;
      searchCondition[2] = parseInt(offset);
      this.setOffset(searchCondition[2]);
      notifyObservers('searchCondition');
    }

    this.getOffset = () => {
      return offset;
    }

    this.setOffset = (num) => {
      offset = num >= 0 ? num : 0; // boundary check
      notifyObservers('offsetUpdate');
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

    this.operateSearch = (type, keyword, offset) => {
      this.getAllDishes(type, keyword, offset)
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
