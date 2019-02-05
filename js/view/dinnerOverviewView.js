class DinnerOverviewView {
  constructor(container, model) {
    container.html(`
      <div id='selectedDishesOverview'></div>
      <span id='totalCost'></span>
      <hr />
      <button id='printRecipeButton' class='btn btn-orange'>
        <span>Print Full Recipe</span>
      </button>`);

    this.printRecipeButton = container.find('#printRecipeButton');

    let displaySelectedDishes = () => {
      let selectedDishes = container.find('#selectedDishesOverview');

      selectedDishes.html('');

      model.getSelectedDishes().forEach((dish) => {
        const alt = dish.title;
        const src = dish.image;
        const heading = dish.title;
        const price = dish.pricePerServing + ' SEK';

        const dishItem = `
          <img alt=${alt} src=${src}>
            <h3>${heading}</h3>
            <span>${price}</span>
          </img>`

        selectedDishes.append(dishItem);
      });
    }

    let updateTotalCost = () => {
      let totalCost = container.find('#totalCost');
      totalCost.html('Total' + model.getTotalMenuPrice() + ' SEK');
    }

    this.update = (model, changeDetails) => {
      if (changeDetails == 'numberOfGuests') {
        updateTotalCost();
      }

      if (changeDetails == 'selectedDishes') {
        displaySelectedDishes();
        updateTotalCost();
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
