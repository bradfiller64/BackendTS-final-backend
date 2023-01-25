import { RequestHandler } from "express";
import { Post } from "../models/post";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllPost: RequestHandler = async (req, res, next) => {
    let posts = await Post.findAll();
    res.status(200).json(posts);
}

export const createPost: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let newPost: Post = req.body;
    newPost.username = user.username;

    if (newPost.message) {
        let created = await Post.create(newPost);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

export const getPost: RequestHandler = async (req, res, next) => {
    let postId = req.params.id;
    let post = await Post.findByPk(postId);
    if (post) {
        res.status(200).json(post);
    }
    else {
        res.status(404).json({});
    }
}

export const editPost: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let postId = req.params.id;

    let newPost: Post = req.body;

    let postFound = await Post.findByPk(postId);

    if (postFound && postFound.username == newPost.username
        && newPost.message && user.username == postFound.username) {
        await Post.update(newPost, {
            where: { username: postId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }

}

export const deletePost: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let postId = req.params.id;

    let postFound = await Post.findByPk(postId);

    if (postFound && postFound.username == user.username) {
        await Post.destroy({
            where: { username: postId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
}