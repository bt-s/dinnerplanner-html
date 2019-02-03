let DishItemView = function (id, model) {
  let dish = model.getLocalDish(id);
  console.log(dish);

  let heading = $("<h3/>").text(dish['title']);

  let image = $("<img/>")
    .prop("alt", dish['title'])
    .prop("src", model.getImgBaseUrl() + dish["image"]);

  let dishItem = $("<a/>")
    .prop("id", "dishItem" + id)
    .append(image, heading);

  this.getDomObj = () => {
    return dishItem;
  };
}
