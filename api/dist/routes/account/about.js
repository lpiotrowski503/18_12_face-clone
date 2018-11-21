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
const validate_1 = require("../../middleware/validate");
const jwt_1 = require("../../middleware/jwt");
const hash_1 = require("../../middleware/hash");
const user_1 = require("../../models/user");
//
// ──────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A C C O U N T   A B O U T   C O N T R O L L E R : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────
//
class About {
    constructor() {
        this.router = express.Router();
    }
    createUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user = user;
            this.user.user = undefined;
            this.user.confirmPassword = undefined;
            this.user._id = id;
            this.user.password = yield hash_1.default(this.user.password);
        });
    }
    updateAccount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_1.User.findByIdAndUpdate(data._id, data);
        });
    }
    controller() {
        this.router.get('/', auth_1.default, async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
            req.body.user.friends = undefined;
            res.json({
                about: {
                    user: req.body.user
                }
            });
        }), (error, req, res) => {
            res.status(400).json({ error: error.message });
        }));
        this.router.put('/:id', auth_1.default, async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
            validate_1.default(req.body);
            yield this.createUser(req.params.id, req.body);
            yield this.updateAccount(req.body);
            res.json({ token: jwt_1.default(this.user) });
        }), (error, req, res) => {
            res.status(400).json({ error: error.message });
        }));
        return this.router;
    }
}
exports.default = new About().controller();
