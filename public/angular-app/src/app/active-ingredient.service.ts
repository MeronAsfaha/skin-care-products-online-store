
export class ActiveIngredient {
  #_id: String;
  #name: String;
  #ingredientType: String;
  #benefits: String;

  constructor(id:String, name:String, ingredientType:String, benefits:String) {
    this.#_id = id;
    this.#name = name;
    this.#ingredientType = ingredientType;
    this.#benefits = benefits;
   }

   get _id() : String {
    return this.#_id;
   }
   get name() : String {
    return this.#name;
   }
   get ingredientType() : String {
    return this.#ingredientType;
   } 
   get benefits() : String {
    return this.#benefits;
   }

   set name(name:String) {
    this.#name = name;
   }
   set ingredientType(ingredientType:String) {
    this.#ingredientType = ingredientType;
   }
   set benefits(benefits:String) {
    this.#benefits = benefits;
   }
   
}
