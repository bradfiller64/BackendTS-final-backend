import { InferAttributes, InferCreationAttributes, Model, DataTypes, Sequelize } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare userId: number;
    declare username: string;
    declare password: string;
    declare firstName: string;
    declare lastName: string;
    declare city: string;
    declare state: string;
    declare createdAt?: Date;
}

export function UserFactory(sequelize: Sequelize) {
    User.init({
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'users',
        freezeTableName: true,
        sequelize
    });
}