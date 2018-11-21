"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = require("../../middleware/auth");
const async_1 = require("../../middleware/async");
const post_1 = require("../../models/post");
//
// ──────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: D A S H B O A R D   C O N T R O L L E R : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────
//
class Dashboard {
    constructor() {
        this.router = express.Router();
    }
    validatePostData(post) {
        if (!post)
            throw new Error('No post Data');
        if (!post.title)
            throw new Error('No post title');
        if (!post.article)
            throw new Error('No post article');
        if (!post.user.nick)
            throw new Error('No post author');
    }
    createPostModel(post) {
        this.post = new post_1.Post(post);
    }
    savePost() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.post.save();
        });
    }
    editPost(id, post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_1.Post.findByIdAndUpdate(id, {
                title: post.title,
                article: post.article
            });
        });
    }
    removePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield post_1.Post.findByIdAndRemove(id);
        });
    }
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            this.posts = yield post_1.Post.find({}).sort({ date: -1 });
        });
    }
    editRequest(user) {
        this.posts.forEach(post => {
            if (post.author._id === user._id)
                post.editable = true;
            post.author = post.author.nick;
        });
    }
    controller() {
        this.router.get('/posts', auth_1.default, async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.getPosts();
            this.editRequest(req.body.user);
            res.json({ posts: this.posts });
        }), (error, req, res) => {
            res.status(400).json({ error: error.message });
        }));
        this.router.post('/post', auth_1.default, async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
            this.validatePostData(req.body);
            this.createPostModel({
                title: req.body.title,
                article: req.body.article,
                author: {
                    _id: req.body.user._id,
                    nick: req.body.user.nick
                }
            });
            yield this.savePost();
            res.json({ post: true });
        }), (error, req, res) => {
            res.status(400).json({ error: error.message });
        }));
        this.router.put('/post/:id', auth_1.default, async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.editPost(req.params.id, req.body);
            res.json({ post: true });
        }), (error, req, res) => {
            res.status(400).json({ error: error.message });
        }));
        this.router.delete('/post/:id', auth_1.default, async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.removePost(req.params.id);
            res.json({ post: true });
        }), (error, req, res) => {
            res.status(400).json({ error: error.message });
        }));
        return this.router;
    }
}
exports.default = new Dashboard().controller();
