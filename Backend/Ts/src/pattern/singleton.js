"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = void 0;
class Singleton {
    constructor() {
        this.consola = "";
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
    addConsola(data) {
        this.consola += data;
    }
    getConsola() {
        return this.consola;
    }
}
exports.Singleton = Singleton;
