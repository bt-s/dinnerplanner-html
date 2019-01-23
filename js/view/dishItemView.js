var DishItemView = function (id, dishItem, model) {
  var dish = model.getDish(id);
  var heading = $("<h3/>");
  var image = $("<img/>");

  heading.text(dish["name"]);

  image.prop("alt", dish["name"]);
  image.prop("src", "images/" + dish["image"]);

  dishItem.append(image);
  dishItem.append(heading);

  this.getDomObj = () => {
    return dishItem;
  };


  /** dish item is wrapped in dishSearchView
  so this function is not needed here*/

  // this.hide = () => {
  //   container.hide();
  // };
}