class DishItemView {
  constructor(id, model) {
    let dish = model.getLocalDish(id);

    this.dishItem = `
      <a id=${id}>
      <img src=${model.getImgBaseUrl() + dish["image"]}
           alt='${dish['title']}'/>
      <h3>${dish['title']}</h3>
      </a>`
  }
}
