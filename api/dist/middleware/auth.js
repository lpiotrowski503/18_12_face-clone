"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config = require("config");
// ────────────────────────────────────────────────────────────────────────────────
const async_1 = require("./async");
// ────────────────────────────────────────────────────────────────────────────────
class Auth {
    auth() {
        return async_1.default((req, res, next) => {
            this.token = req.header('x-auth-token');
            this.decoded = jwt.verify(this.token, config.get('jwtPrivateKey'));
            // TODO remove password from req.body.user.password with lodash
            req.body.user = this.decoded.data;
            req.body.user.password = undefined;
            next();
        }, (err, req, res) => {
            res.status(400).json({ invalidToken: true });
        });
    }
}
exports.default = new Auth().auth();
