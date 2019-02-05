class TitleBarView {
  constructor(container, model) {
    this.container =container;
    this.model = model;

    container.html(`
      <h2>My Dinner:
          <span id="numberOfGuests">${model.getNumberOfGuests()}</span>
          people
      </h2>
      <button id="backButton" class="btn btn-orange btn-pointy">
        <span>Go back and edit dinner</span>
      </button>
    `);

    this.backButton = container.find("#backButton");
    this.printRecipeButton = container.find("#printRecipeButton");

    this.hide = () => {
      container.hide();
    };

    this.show = () => {
      container.show();
    };

    model.addObserver(this.update.bind(this));
  }

  update(model, changeDetails) {
    let numberOfGuests = this.container.find("#numberOfGuests");

    if (changeDetails== "numberOfGuests") {
      numberOfGuests.html(this.model.getNumberOfGuests());
    }
  }
}
