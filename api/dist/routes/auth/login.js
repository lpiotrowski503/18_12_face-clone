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
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt_1 = require("../../middleware/jwt");
const async_1 = require("../../middleware/async");
const auth_1 = require("../../middleware/auth");
const hash_1 = require("../../middleware/hash");
const user_1 = require("../../models/user");
//
// ──────────────────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: L O G G I N G   U S E R   C O N T R O L E R : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────
//
class Login {
    constructor() {
        this.router = express.Router();
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user = yield user_1.User.findOne({
                email: email
            });
            if (!this.user)
                throw new Error('The user doesn`t exist');
        });
    }
    comparePassword(password, hashPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            this.isMatch = yield bcrypt.compare(password, hashPassword);
            if (!this.isMatch)
                throw new Error('Wrong password');
        });
    }
    mailBody() {
        return `<html lang="pl">
              <head>
                  <meta charset="UTF-8">
              </head>
              <body>
                <h2>Witaj ${this.user.nick}</h2>
                <h5>Aby zresetować hasło naciśni na 
                  <span>
                    <a href = 'https://faceclone.herokuapp.com/auth/login?token=${jwt_1.default(this.user)}'>
                    link
                    </a>
                  </span>
                </h3>
              </body>
            </html>`;
    }
    transporter() {
        return nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'faceclone503@gmail.com',
                pass: 'face503clone'
            }
        });
    }
    mailOptions() {
        return {
            from: '"Faceclone" <faceclone503@gmail.com>',
            to: this.user.email,
            subject: 'Nowe Hasło',
            text: 'text',
            html: this.mailBody()
        };
    }
    sendMail() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.transporter().sendMail(this.mailOptions());
        });
    }
    reset(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_1.User.findByIdAndUpdate(id, {
                password: yield hash_1.default(password)
            });
        });
    }
    controller() {
        this.router.post('/', async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.findUserByEmail(req.body.email);
            yield this.comparePassword(req.body.password, this.user.password);
            res.json({ token: jwt_1.default(this.user) });
        }), (error, req, res) => {
            res.status(400).json({ error: error.message });
        }));
        this.router.post('/forget', async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.findUserByEmail(req.body.email);
            yield this.sendMail();
            res.json({ forget: req.body });
        }), (error, req, res) => {
            res.status(400).json({
                response: {
                    error: error.message,
                    forget: req.body
                }
            });
            // res.status(400).json({ error: error.message })
        }));
        this.router.get('/forget/:token', auth_1.default, async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            res.json({
                _id: req.body.user._id
            });
        }), (error, req, res) => {
            res.status(400).json({ error: error.message });
        }));
        this.router.put('/forget/:id', async_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.reset(req.params.id, req.body.password);
            res.json({
                reset: {
                    id: req.params.id,
                    password: req.body.password
                }
            });
        }), (error, req, res) => {
            res.status(400).json({ error: error.message });
        }));
        return this.router;
    }
}
exports.default = new Login().controller();
