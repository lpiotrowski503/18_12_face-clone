"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class UserModel {
    constructor() {
        this.userSchema = new mongoose.Schema({
            email: {
                type: String,
                required: true,
                unique: true
            },
            nick: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            friends: {
                type: Array,
                default: []
            }
        });
        this.user = mongoose.model('User', this.userSchema);
    }
}
exports.User = new UserModel().user;
