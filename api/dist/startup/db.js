"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class Db {
    connect() {
        this.url =
            'mongodb://facebook-clone-db:facebook-clone-1@ds139436.mlab.com:39436/facebook-clone-db';
        mongoose
            .connect(this.url)
            .then(() => console.log('connected db'))
            .catch(() => console.log('connected error'));
    }
}
exports.default = new Db().connect;
