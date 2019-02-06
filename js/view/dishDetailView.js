class DishDetailView {
  constructor(container, model) {
    this.container = container;
    container.html(`
      <div class="dish-details-overview">
        <div id='dishDescription' class="dish-description col-xs-12 col-sm-12 col-md-6"></div>
        <button id="backToSearchButton" class="btn btn-orange btn-pointy">
          back to search
        </button>

        <div class="dish-ingredients col-xs-12 col-sm-12 col-md-6">
          <div class="dish-ingredients-heading">
            <span>Ingredients For </span>
            <span id="numberOfGuests">${model.getNumberOfGuests()}</span>
            <span> People</span>
          </div>
          <hr />
          <table id="listOfIngredients"></table>
          <hr />
          <div id="ingredientTotal">
            <button id="addToMenuButton" class="btn btn-orange">Add to menu</button>
            <span id="dishPrice"></span>
          </div>
        </div>
      </div>
      <section id="prepSection"></section>`);

    this.numberOfGuests = container.find("#numberOfGuests");
    this.backToSearchButton = container.find("#backToSearchButton");
    this.addToMenuButton = container.find("#addToMenuButton");

    this.hide = () => {
      container.hide();
    };

    this.show = () => {
      container.show();
    };

    model.addObserver(this.update.bind(this));
  }

  update(model, changeDetails) {
    const loader = document.querySelector('.loader');

    let loadDishInfo = () => {
      let viewingDish = model.getCurrentViewingDish();

      let dishDescription = this.container.find('#dishDescription').html(`
        <h2 id="dishTitle">${viewingDish.title}</h2>
        <img id="detailImg"
            src=${viewingDish.image}
            alt=${viewingDish.title}>
        </img>
        <p id='detailDescription'>${viewingDish.instructions}</p>`);

      let prepSection = this.container.find("#prepSection").html(`
        <h2>Preparation</h2>
        <p id="prepText">${viewingDish.instructions}</p>
      `);
    }

    let loadIngredients = () => {
      let dishPrice = 0;
      let ingredientList = this.container.find("#listOfIngredients").html("");
      let viewingDish = model.getCurrentViewingDish();

      if (!viewingDish) {
        return
      }

      viewingDish.extendedIngredients.forEach(ingredient => {
        let tableItem = `
          <tr>
            <td>${ingredient.amount + ingredient.measures.metric.unitShort}</td>
            <td>${ingredient.name}</td>
          </tr>
        `;

        ingredientList.append(tableItem);
      });

      dishPrice = viewingDish.pricePerServing * model.getNumberOfGuests()
      this.container.find("#dishPrice").text("TOTAL: SEK " + dishPrice);
    }

    if (changeDetails == 'loadingData') {
      loader.classList.remove('hide');
    }

    if (changeDetails == 'loadedData') {
      loader.classList.add('hide');
    }

    if (changeDetails == "viewingDishDetail") {
      loadDishInfo();
      loadIngredients();
    } else if (changeDetails == 'numberOfGuests') {
      loadIngredients();
      this.numberOfGuests.text(model.getNumberOfGuests());
    }
  };
}
