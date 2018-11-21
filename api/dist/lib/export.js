"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Export = instance => {
    return (constructor) => {
        constructor = new instance();
        console.log(constructor);
    };
};
exports.Static = () => {
    return (constructor) => {
        console.log(constructor);
    };
};
exports.Var = (target, propertyKey) => {
    // console.log(target)
    // console.log(propertyKey)
};
exports.Method = (target, methodName, descryptor) => {
    console.dir(target);
    console.log('------------------------');
    console.log(methodName);
    console.log('------------------------');
    console.log(descryptor);
};
