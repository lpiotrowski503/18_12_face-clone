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
const user_1 = require("../../models/user");
const async_1 = require("../../middleware/async");
const validate_1 = require("../../middleware/validate");
const hash_1 = require("../../middleware/hash");
//
// ────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: R E G I S T E R   U S E R   C O N T R O L E R : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────
//
class Signup {
    constructor() {
        this.router = express.Router();
    }
    createUserModel(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user = new user_1.User(user);
            this.user.password = yield hash_1.default(this.user.password);
        });
    }
    saveUser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.user.save();
        });
    }
    dbErrorHandler(error) {
        if ((error.name = 'MongoError' && error.code === 11000))
            error.message = 'The user already exist';
    }
    controller() {
        return this.router.post('/', async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
            validate_1.default(req.body);
            yield this.createUserModel(req.body);
            yield this.saveUser();
            res.json({ signup: true });
        }), (error, req, res) => {
            this.dbErrorHandler(error);
            res.status(400).json({ error: error.message });
        }));
    }
}
exports.default = new Signup().controller();
