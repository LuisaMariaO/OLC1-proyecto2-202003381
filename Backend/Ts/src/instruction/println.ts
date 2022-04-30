import { Expression } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Singleton } from "../pattern/singleton";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";

export class Println extends Instruccion {

    constructor(
        public value: Expression,
        line: number,
        column: number
    ) {
        super(line, column);
    }

    public execute(environment: Enviroment) {

        const consola = Singleton.getInstance()
        const expresion = this.value?.execute(environment);
        if (expresion != null) {
            if (expresion.type != Type.error) consola.addConsola(expresion.value+"\n")
        }
        
    }

    public ast() {
        const s = Singleton.getInstance()
        const nombreNodo = `node_${this.line}_${this.column}_`
        s.add_ast(`
        ${nombreNodo}[label="\\<Instruccion\\>\\println"];`)
        if (this.value!= null){s.add_ast(`${nombreNodo}->${this.value.ast()}`)}
    }
}