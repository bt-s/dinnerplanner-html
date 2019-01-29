let WelcomeView = function (container, model) {
  let welcomeText = container.find("#welcomeText").html(model.welcomeText);

  this.createNewDinnerButton = container.find("#createNewDinnerButton");

  this.hide = () => {
    container.hide();
  };

  this.show=()=>{
    container.show();
  };
}
