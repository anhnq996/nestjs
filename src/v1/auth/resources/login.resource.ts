export default class UserResource {
  private data: any;
  constructor(data) {
    this.data = data;
  }
  toArray() {
    return {
      id: Number(this.data.id),
      name: this.data.name,
      email: this.data.email,
      roles: this.data.roles.map((role) => role.name),
      createdAt: this.data.createdAt,
      updatedAt: this.data.updatedAt,
    };
  }
}
