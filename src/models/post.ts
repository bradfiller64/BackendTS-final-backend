import { InferAttributes, InferCreationAttributes, Model, DataTypes, Sequelize } from "sequelize";
import { User } from "./user";

export class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>>{
    declare postId: number;
    declare message: string;
    declare username: string;
    declare createdAt?: Date;
}

export function PostFactory(sequelize: Sequelize) {
    Post.init({
        postId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        freezeTableName: true,
        tableName: 'posts',
        sequelize
    });
}

export function AssociateUserPost() {
    User.hasMany(Post, { foreignKey: 'username' });
    Post.belongsTo(User, { foreignKey: 'username' });
}