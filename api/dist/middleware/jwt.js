"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config = require("config");
class Jwt {
    createToken() {
        return user => {
            return jwt.sign({ data: user }, config.get('jwtPrivateKey'), {
                expiresIn: '2h'
            });
        };
    }
}
exports.default = new Jwt().createToken();
