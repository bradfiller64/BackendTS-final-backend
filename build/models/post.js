"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateUserPost = exports.PostFactory = exports.Post = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
class Post extends sequelize_1.Model {
}
exports.Post = Post;
function PostFactory(sequelize) {
    Post.init({
        postId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        message: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
    }, {
        freezeTableName: true,
        tableName: 'posts',
        sequelize
    });
}
exports.PostFactory = PostFactory;
function AssociateUserPost() {
    user_1.User.hasMany(Post, { foreignKey: 'username' });
    Post.belongsTo(user_1.User, { foreignKey: 'username' });
}
exports.AssociateUserPost = AssociateUserPost;
