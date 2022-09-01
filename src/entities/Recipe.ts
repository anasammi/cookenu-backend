export class Recipe {
  constructor(
    private id: string,
    private title: string,
    private description: string,
    private createdAt: Date,
    private user_id: string
  ) {}

  public getRecipeId() {
    return this.id;
  }
  public getTitle() {
    return this.title;
  }
  public getDescription() {
    return this.description;
  }
  public getDate() {
    return this.createdAt;
  }
  public getUserId() {
    return this.user_id;
  }

  static toRecipeModel(data: any): Recipe {
    return new Recipe(
      data.id,
      data.title,
      data.description,
      data.createdAt,
      data.user_id
    );
  }
}
