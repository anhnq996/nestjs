import { Model, Table, Column, DataType } from 'sequelize-typescript';
@Table({ tableName: 'permissions' })
export class PermissionModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
