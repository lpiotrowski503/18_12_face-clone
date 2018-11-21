"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
// ────────────────────────────────────────────────────────────────────────────────
const dashboard_1 = require("../routes/dashboard/dashboard");
const about_1 = require("../routes/account/about");
const friends_1 = require("../routes/account/friends");
const photos_1 = require("../routes/account/photos");
const messages_1 = require("../routes/messages/messages");
const login_1 = require("../routes/auth/login");
const signup_1 = require("../routes/auth/signup");
class Routes {
    routes(app) {
        app.use('/api/dashboard', dashboard_1.default);
        app.use('/api/account/about', about_1.default);
        app.use('/api/account/friends', friends_1.default);
        app.use('/api/account/photos', photos_1.default);
        app.use('/api/messages', messages_1.default);
        app.use('/api/auth/login', login_1.default);
        app.use('/api/auth/signup', signup_1.default);
        app.use('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../public/index.html'));
        });
    }
}
exports.default = new Routes().routes;
