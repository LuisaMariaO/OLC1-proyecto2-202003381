"use strict";
exports.__esModule = true;
exports.Enviroment = void 0;
var symbols_1 = require("./symbols");
var Enviroment = /** @class */ (function () {
    function Enviroment(anterior) {
        this.anterior = anterior;
        this.tablaSimbolos = new Map();
    }
    //Métodos para buscar y crear variables
    //Verificar que no exista
    Enviroment.prototype.guardarVariable = function (nombre, valor, tipo) {
        this.tablaSimbolos.set(nombre, new symbols_1.Symbol(valor, nombre, tipo));
        return true;
    };
    return Enviroment;
}());
exports.Enviroment = Enviroment;
