"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.getPost = exports.createPost = exports.getAllPost = void 0;
const post_1 = require("../models/post");
const auth_1 = require("../services/auth");
const getAllPost = async (req, res, next) => {
    let posts = await post_1.Post.findAll();
    res.status(200).json(posts);
};
exports.getAllPost = getAllPost;
const createPost = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newPost = req.body;
    newPost.username = user.username;
    if (newPost.message) {
        let created = await post_1.Post.create(newPost);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createPost = createPost;
const getPost = async (req, res, next) => {
    let postId = req.params.id;
    let post = await post_1.Post.findByPk(postId);
    if (post) {
        res.status(200).json(post);
    }
    else {
        res.status(404).json({});
    }
};
exports.getPost = getPost;
const editPost = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let postId = req.params.id;
    let newPost = req.body;
    let postFound = await post_1.Post.findByPk(postId);
    if (postFound && postFound.username == newPost.username
        && newPost.message && user.username == postFound.username) {
        await post_1.Post.update(newPost, {
            where: { username: postId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.editPost = editPost;
const deletePost = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let postId = req.params.id;
    let postFound = await post_1.Post.findByPk(postId);
    if (postFound && postFound.username == user.username) {
        await post_1.Post.destroy({
            where: { username: postId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deletePost = deletePost;
