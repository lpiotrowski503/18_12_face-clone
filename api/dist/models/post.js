"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class PostModel {
    constructor() {
        this.postSchema = new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            article: {
                type: String,
                required: true
            },
            author: {
                type: Object,
                required: true
            },
            editable: {
                type: Boolean,
                default: false
            },
            date: {
                type: Date,
                required: true,
                default: Date.now
            }
        });
        this.post = mongoose.model('Post', this.postSchema);
    }
}
exports.Post = new PostModel().post;
