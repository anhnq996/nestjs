import { Model, Table, Column, DataType, ForeignKey } from "sequelize-typescript";
import { UserModule } from "../v1/admin/user/user.module";
import { UserModel } from "@models/User.model";
import { RoleModel } from "@models/Role.model";
@Table({ tableName: 'user_has_roles' })
export class UserHasRoleModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => RoleModel)
  @Column(DataType.BIGINT)
  role_id: bigint;

  @ForeignKey(() => UserModel)
  @Column(DataType.BIGINT)
  user_id: bigint;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
