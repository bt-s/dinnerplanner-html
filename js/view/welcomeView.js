class WelcomeView {
  constructor(container, model) {
    container.html(`
      <p id="welcomeText">${model.welcomeText}</p>
      <a>
        <button id="createNewDinnerButton" class="btn btn-orange">
          Create new dinner
        </button>
      </a>`
      );

    this.createNewDinnerButton = container.find("#createNewDinnerButton");

    this.hide = () => {
      container.hide();
    };

    this.show=()=>{
      container.show();
    };

    model.addObserver(this.update.bind(this));
  }

  update(model, changeDetails) {
    const loader = document.querySelector('.loader');

    if (changeDetails == 'loadingData') {
      loader.classList.remove('hide');
    }

    if (changeDetails == 'loadedData') {
      loader.classList.add('hide');
    }
  };
}
