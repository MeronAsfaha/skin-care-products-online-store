export class User {
  #_id: String;
  #name: String;
  #username: String;
  #password: String;

  constructor(id: String, name: String, username: String, password: String) {
    this.#_id = id;
    this.#name = name;
    this.#username = username;
    this.#password = password;
  }

  get _id(): String {
    return this.#_id;
  }
  get name(): String {
    return this.#name;
  }
  get username(): String {
    return this.#username;
  }
  get password(): String {
    return this.#password;
  }
  set name(name: String) {
    this.#name = name;
  }
  set username(username: String) {
    this.#username = username;
  }
  set password(password: String) {
    this.#password = password;
  }
}
