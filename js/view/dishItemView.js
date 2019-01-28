let DishItemView = function (id, model) {
  let dish = model.getDish(id);
  let heading = $("<h3/>").text(dish["name"]);

  let image = $("<img/>")
    .prop("alt", dish["name"])
    .prop("src", "../images/" + dish["image"]);

  let dishItem = $("<a/>")
    .prop("id", "dishItem" + id)
    .append(image, heading);

  this.getDomObj = () => {
    return dishItem;
  };
}
