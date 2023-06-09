import { Model, Table, Column, DataType } from 'sequelize-typescript';
import Role from '@enums/role.enum';
@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
