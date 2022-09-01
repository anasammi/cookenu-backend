export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export class User {
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private role: USER_ROLES,
    private id: string
  ) {}

  public getName() {
    return this.name;
  }
  public getEmail() {
    return this.email;
  }
  public getPassword() {
    return this.password;
  }
  public getRole() {
    return this.role;
  }
  public getId() {
    return this.id;
  }
  static toUserModel(data: any): User {
    return new User(data.name, data.email, data.password, data.role, data.id);
  }
}
