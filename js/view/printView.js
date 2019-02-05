class PrintView {
  constructor(container, model) {
    let loadOrderedItems = () => {
      let numberOfGuests = container.find(".numberOfGuests")
        .text(model.getNumberOfGuests());

      container.html(`<ul id="orderedItemsList" class="printout-dishes"></ul>`);

      let orderedItems = container.find("#orderedItemsList").html("");

      model.getSelectedDishes().forEach(dish => {
        console.log(dish, 'in get selected dishes, print view');

        let listItem = `
          <li class="printout-dish">
            <img src=${dish.image} alt='' img>
            <section>
              <h2>${dish.title}</h2>
              <p>${dish.instructions}</p>
            </section>
            <section>
              <h3>Preparation</h3>
              <p>${dish.instructions}</p>
            </section>
          </li>`

        orderedItems.append(listItem);
      });
    }

    this.update = (model, changeDetails) => {
      if (changeDetails == "selectedDishes") {
        loadOrderedItems();
      }
    };

    this.hide = () => {
      container.hide();
    };

    this.show = () => {
      container.show();
    };

    model.addObserver(this.update);
  }
}
