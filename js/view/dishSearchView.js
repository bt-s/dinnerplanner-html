class DishSearchView {
  constructor(container, model) {
    this.container = container;
    this.model = model;

    container.html(`
      <div class="search-bar">
        <h2>Find a dish</h2>
        <div class="search-bar-container">
          <input id="keywordInput" placeholder="Enter key word" />
          <select id="dishTypeSelect">
             <option value=''>All</option>
          </select>
          <button type="submit" id="searchDishButton" class="btn btn-orange">Search</button>
        </div>
      </div>
      <div class="dish-items-container">
        <div class="dish-items-wrapper" id="searchedDishes"></div>
      </div>
    </div>`
    );

    this.dishTypeSelect = container.find("#dishTypeSelect");
    this.keywordInput = container.find("#keywordInput");
    this.searchDishButton = container.find("#searchDishButton");

    this.getSearchCondition = () => {
      return [
        this.dishTypeSelect.prop("value"),
        this.keywordInput.prop("value")
      ];
    };

    this.setSearchCondition = (type, kwd) => {
      for (let i = 0; i < this.dishTypeSelect.children().length; i++) {
        if (this.dishTypeSelect.children()[i].value == type)
          this.dishTypeSelect[0].selectedIndex = i;
      }

      this.keywordInput.prop("value", kwd);
    };

    this.hide = () => {
      container.hide();
    };

    this.show = () => {
      container.show();
    };

    this.listDishesTypes.bind(this);
    this.listDishesTypes();

    model.operateSearch(...model.getSearchCondition());
    model.addObserver(this.update.bind(this));
  }

  listDishesTypes() {
    let titalizeWords = (words) => {
      return words
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    this.model.getDishesTypes().forEach((type) => {
      let option = `<option value=${type}>${titalizeWords(type)}</option>`;
      this.dishTypeSelect.append(option);
    });
  };

  showSearchedDishes() {
    let searchedDishesContainer = this.container.find("#searchedDishes").html("");

    this.model.getSearchedDishes().forEach((dish) => {
      let dishItemView = new DishItemView(dish.id, this.model);
      searchedDishesContainer.append(dishItemView.dishItem);
    });
  };

  update(model, changeDetails) {
    if (changeDetails === "searchedDishes") {
      this.showSearchedDishes();
    }

    if (changeDetails == "searchCondition") {
      this.setSearchCondition(...this.model.getSearchCondition());
    }
  };
}
