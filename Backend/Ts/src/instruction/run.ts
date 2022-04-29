import { Instruccion } from "../abstract/instruccion";
import { Enviroment } from "../symbol/enviroment";
import { Call } from "./call";
import { Funcion } from "./funcion";

export class Run extends Instruccion {

    constructor(
        private funcion: Call,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Enviroment) {
        this.funcion.execute(env)
    }
}