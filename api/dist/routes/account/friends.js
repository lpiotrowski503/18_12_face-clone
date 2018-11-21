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
//
// ──────────────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: A C C O U N T   F R I E N D S   C O N T R O L L E R : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────────
//
class Friends {
    constructor() {
        this.router = express.Router();
    }
    controller() {
        this.router.get('/', auth_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.json({
                friends: req.body
            });
        }));
        return this.router;
    }
}
exports.default = new Friends().controller();
