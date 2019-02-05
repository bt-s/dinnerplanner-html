class DishSearchView {
  constructor(container, model) {
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

    let listDishesTypes = () => {
      let titalizeWords = (words) => {
        return words
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      };

      model.getDishesTypes().forEach((type) => {
        let option = `<option value=${type}>${titalizeWords(type)}</option>`;
        this.dishTypeSelect.append(option);
      });
    };

    let showSearchedDishes = () => {
      let searchedDishesContainer = container.find("#searchedDishes").html("");

      model.getSearchedDishes().forEach((dish) => {
        let dishItemView = new DishItemView(dish.id, model);
        searchedDishesContainer.append(dishItemView.dishItem);
      });
    };

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

    this.update = (model, changeDetails) => {
      if (changeDetails === "searchedDishes") {
        showSearchedDishes();
      }

      if (changeDetails == "searchCondition") {
        this.setSearchCondition(...model.getSearchCondition());
      }
    };

    this.hide = () => {
      container.hide();
    };

    this.show = () => {
      container.show();
    };

    listDishesTypes();
    model.operateSearch(...model.getSearchCondition());
    model.addObserver(this.update);
  }
}
