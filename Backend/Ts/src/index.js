"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const singleton_1 = require("./pattern/singleton");
console.log("Holis mundo");
console.log("Hola de nuevo");
var consola = singleton_1.Singleton.getInstance();
consola.addConsola("Ojalá que funcione");
console.log(consola.getConsola());
