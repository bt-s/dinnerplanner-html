class DinnerOverviewView {
  constructor(container, model) {
    this.container = container;
    this.model = model;

    container.html(`
      <div id='selectedDishesOverview'></div>
      <span id='totalCost'></span>
      <hr />
      <button id='printRecipeButton' class='btn btn-orange'>
        <span>Print Full Recipe</span>
      </button>
    `);

    this.printRecipeButton = container.find('#printRecipeButton');


    this.hide = () => {
      container.hide();
    };

    this.show = () => {
      container.show();
    };

    model.addObserver(this.update.bind(this));
  }

  displaySelectedDishes() {
    let selectedDishes = this.container.find('#selectedDishesOverview');

    selectedDishes.html('');

    this.model.getSelectedDishes().forEach((dish) => {
      const dishItem = `
        <img alt=${this.model.getDishName(dish)}
              src=${dish['image']}>
          <h3>${this.model.getDishName(dish)}</h3>
          <span>${this.model.getDishPrice(dish) + ' SEK'}</span>
        </img>`

      selectedDishes.append(dishItem);
    });
  }

  updateTotalCost() {
    let totalCost = this.container.find('#totalCost');
    totalCost.html('Total' + this.model.getTotalMenuPrice() + ' SEK');
  }

  update(model, changeDetails) {
    if (changeDetails == 'numberOfGuests') {
      this.updateTotalCost();
    }

    if (changeDetails == 'selectedDishes') {
      this.displaySelectedDishes();
      this.updateTotalCost();
    }
  }
}
