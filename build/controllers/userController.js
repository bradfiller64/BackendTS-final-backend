"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = exports.getAllUser = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const getAllUser = async (req, res, next) => {
    let users = await user_1.User.findAll();
    res.status(200).json(users);
};
exports.getAllUser = getAllUser;
const createUser = async (req, res, next) => {
    let newUser = req.body;
    if (newUser.username && newUser.password && newUser.firstName && newUser.lastName && newUser.city && newUser.state) {
        let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
        newUser.password = hashedPassword;
        let created = await user_1.User.create(newUser);
        res.status(200).json({
            username: created.username,
            userId: created.userId
        });
    }
    else {
        res.status(400).send('Username and password required!');
    }
};
exports.createUser = createUser;
const getUser = async (req, res, next) => {
    let username = req.params.username;
    let user = await user_1.User.findByPk(username);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({});
    }
};
exports.getUser = getUser;
const updateUser = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let username = req.params.username;
    let newUser = req.body;
    newUser.username = user.username;
    let userFound = await user_1.User.findByPk(username);
    if (userFound && userFound.username == newUser.username) {
        await user_1.User.update(newUser, {
            where: { username: username }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let username = req.params.username;
    let userFound = await user_1.User.findByPk(username);
    if (userFound) {
        await user_1.User.destroy({
            where: { username: username }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deleteUser = deleteUser;
const loginUser = async (req, res, next) => {
    // Look up user by their username
    let existingUser = await user_1.User.findOne({
        where: { username: req.body.username }
    });
    // If user exists, check that password matches
    if (existingUser) {
        let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        // If passwords match, create a JWT
        if (passwordsMatch) {
            let token = await (0, auth_1.signUserToken)(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password!');
        }
    }
    else {
        res.status(401).json('Invalid username!');
    }
};
exports.loginUser = loginUser;
