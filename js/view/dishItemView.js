var DishItemView = function (id, model) {
  var dishItem = $("<a/>");
  dishItem.prop("id", "dishItem" + id);
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
}