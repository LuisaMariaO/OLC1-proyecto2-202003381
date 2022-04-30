import { Instruccion } from "../abstract/instruccion";
import { Singleton } from "../pattern/singleton";
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

    public ast() {
        const s= Singleton.getInstance()
        const nombre_nodo=`node_${this.line}_${this.column}_`
        s.add_ast(`
        ${nombre_nodo} [label="\\<Instruccion\\>\\nRun"];
        ${nombre_nodo}1 [label="{Función}"];
        ${nombre_nodo}2 [label="<\\Parametros\\>"];
        ${nombre_nodo}->${nombre_nodo}2;
        ${nombre_nodo}->${nombre_nodo}1;
        ${nombre_nodo}->${this.funcion.ast()};
        
        `)
        
    }
}