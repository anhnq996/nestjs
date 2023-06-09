import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserHasRoleModel } from '@models/UserHasRole.model';
import { UserModel } from '@models/User.model';
@Table({ tableName: 'roles' })
export class RoleModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @BelongsToMany(() => UserModel, () => UserHasRoleModel)
  users: RoleModel[];
}
