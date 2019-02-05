class PrintView {
  constructor(container, model) {
    this.container = container;
    this.model = model;

    this.hide = () => {
      container.hide();
    };

    this.show = () => {
      container.show();
    };

    model.addObserver(this.update.bind(this));
  }

  loadOrderedItems() {
    let numberOfGuests = this.container.find(".numberOfGuests")
      .text(this.model.getNumberOfGuests());

    this.container.html(`<ul id="orderedItemsList" class="printout-dishes"></ul>`);

    let orderedItems = this.container.find("#orderedItemsList").html("");

    this.model.getSelectedDishes().forEach(dish => {
      let listItem = `
        <li class="printout-dish">
          <img src=${this.model.getImgBaseUrl() + dish.image} alt='' img>
          <section>
            <h2>${this.model.getDishName(dish)}</h2>
            <p>${this.model.getDishDescription(dish)}</p>
          </section>
          <section>
            <h3>Preparation</h3>
            <p>${this.model.getDishPreparation(dish)}</p>
          </section>
        </li>`

      orderedItems.append(listItem);
    });
  }

  update(model, changeDetails) {
    if (changeDetails == "selectedDishes") {
      this.loadOrderedItems();
    }
  };
}
