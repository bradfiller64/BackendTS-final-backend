import { Sequelize } from "sequelize";
import { AssociateUserPost, PostFactory } from "./post";
import { UserFactory } from "./user";

const dbName = 'myfaceDB';
const username = 'root';
const password = 'password';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

UserFactory(sequelize);
PostFactory(sequelize);
AssociateUserPost();

export const db = sequelize;