import { ActiveIngredient } from './active-ingredient.service';

export class SkincareProduct {
  #_id: String;
  #name: String;
  #manufacturer: String;
  #skinType: String;
  #activeIngredients: ActiveIngredient[];

  constructor(
    id: String,
    name: String,
    manufacturer: String,
    skinType: String,
    activeIngredients: ActiveIngredient[]
  ) {
    this.#_id = id;
    this.#name = name;
    this.#manufacturer = manufacturer;
    this.#skinType = skinType;
    this.#activeIngredients = activeIngredients;
  }

  get _id(): String {
    return this.#_id;
  }
  get name(): String {
    return this.#name;
  }
  get manufacturer(): String {
    return this.#manufacturer;
  }
  get skinType(): String {
    return this.#skinType;
  }
  set name(name: String) {
    this.#name = name;
  }
  set manufacturer(manufacturer: String) {
    this.#manufacturer = manufacturer;
  }
  set skinType(skinType: String) {
    this.#skinType = skinType;
  }

  get activeIngredients(): ActiveIngredient[] {
    return this.#activeIngredients;
  }
  set activeIngredients(activeIngredients: ActiveIngredient[]) {
    this.#activeIngredients = activeIngredients;
  }
}
