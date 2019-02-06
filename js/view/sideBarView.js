class SideBarView {
  constructor(container, model) {
    this.container = container;
    this.model = model;

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
      </div>`);

    this.plusButton = container.find("#plusGuest");
    this.minusButton = container.find("#minusGuest");
    this.menuButton = container.find("#menuButton");
    this.confirmationButton = container.find("#confirmationButton");

    this.numberOfGuests = container.find("#numberOfGuests")
      .html(model.getNumberOfGuests());

    this.hide = () => {
      container.hide();
    };

    this.show = () => {
      container.show();
    };

    model.addObserver(this.update.bind(this));
  }

  update(model, changeDetails) {
    let totalPrice = this.container.find("#totalPrice");

    let loadSelectedDishes = () => {
      let selectedDishes = this.container.find("#selectedDishes").html("");

      this.model.getSelectedDishes().forEach((dish) => {
        let listItem = `
          <li>
            <span>${dish.title}</span>
            <span>${dish.pricePerServing}</span>
          </li>
        `

        selectedDishes.append(listItem);
      });
    }

    if (changeDetails == "numberOfGuests") {
      this.numberOfGuests.html(this.model.getNumberOfGuests());
      loadSelectedDishes();
      totalPrice.html("SEK " + this.model.getTotalMenuPrice().toFixed(2));
    }

    if (changeDetails == "selectedDishes") {
      loadSelectedDishes();
      totalPrice.html("SEK " + this.model.getTotalMenuPrice().toFixed(2));
    }
  }
}
