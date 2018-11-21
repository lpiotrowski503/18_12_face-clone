"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validate {
    constructor() {
        this.regExEmail = /^([a-z\d.-_]+)@([a-z\d-_]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    }
    validate() {
        return user => {
            if (!user)
                throw new Error('No user Data');
            if (!this.regExEmail.test(user.email))
                throw new Error('wrong email');
            if (!user.password)
                throw new Error('wrong password');
            if (user.password !== user.confirmPassword)
                throw new Error('passwords aren`t the same');
        };
    }
}
exports.default = new Validate().validate();
