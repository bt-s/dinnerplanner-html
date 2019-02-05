class SideBarView {
  constructor(container, model) {
    container.html(`
      <div class="side-bar-header">
        <h2>My Dinner</h2>
        <a id="menuButton">
          <i class="fa fa-bars"></i>
          <i class="fa fa-times"></i>
        </a>
      </div>
      <div class="side-bar-menu">
        <div class="people-container">
          <span>People</span>
          <div class="people-selector-button">
            <span id="numberOfGuests"></span>
            <div class="up-down-buttons">
              <button id="plusGuest" class="btn">
                <i class="fa fa-angle-up"></i>
              </button>
              <button id="minusGuest" class="btn">
                <i class="fa fa-angle-down"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="side-bar-sub-header">
          <span>Dish Name</span>
          <span>Cost</span>
        </div>

        <ul id="selectedDishes"></ul>

        <div id="totalPrice"></div>

        <button id="confirmationButton" class="btn btn-orange">
          <span>Confirm Dinner</span>
        </button>
      </div>`
    );

    this.plusButton = container.find("#plusGuest");
    this.minusButton = container.find("#minusGuest");
    this.menuButton = container.find("#menuButton");
    this.confirmationButton = container.find("#confirmationButton");
    let numberOfGuests = container.find("#numberOfGuests")
      .html(model.getNumberOfGuests());

    this.update = (model, changeDetails) => {
      let totalPrice = container.find("#totalPrice");

      let loadSelectedDishes = () => {
        let selectedDishes = container.find("#selectedDishes").html("");

        model.getSelectedDishes().forEach((dish) => {
          let listItem = `
            <li>
              <span>${model.getDishName(dish)}</span>
              <span>${model.getDishPrice(dish)}</span>
            </li>
          `

          selectedDishes.append(listItem);
        });
      }

      if (changeDetails == "numberOfGuests") {
        numberOfGuests.html(model.getNumberOfGuests());
        loadSelectedDishes();
        totalPrice.html("SEK " + model.getTotalMenuPrice());
      }

      if (changeDetails == "selectedDishes") {
        loadSelectedDishes();
        totalPrice.html("SEK " + model.getTotalMenuPrice());
      }
    }

    this.hide = () => {
      container.hide();
    };

    this.show = () => {
      container.show();
    };

    model.addObserver(this.update);
  }
}
