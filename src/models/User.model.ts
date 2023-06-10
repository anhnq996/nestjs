import { Model, Table, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { RoleModel } from '@models/Role.model';
import { UserHasRoleModel } from '@models/UserHasRole.model';
@Table({ tableName: 'users' })
export class UserModel extends Model {
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

    @BelongsToMany(() => RoleModel, () => UserHasRoleModel)
    roles: RoleModel[];
}
