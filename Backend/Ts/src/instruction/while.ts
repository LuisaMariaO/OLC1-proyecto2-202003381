import { Expression } from "../abstract/expresion"
import { Instruccion } from "../abstract/instruccion"
import { Singleton } from "../pattern/singleton"
import { Enviroment } from "../symbol/enviroment"
import { Type } from "../symbol/type"
import { error } from "../tool/error"

export class While extends Instruccion {

    constructor(
        private condicion: Expression,
        public code: Instruccion,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Enviroment) {
        var consola = Singleton.getInstance()
        let condicion = this.condicion.execute(env)
        if (condicion.type != Type.BOOLEAN){
        consola.addConsola("---> ERROR SEMÁNTICO: `La condicion de la instruccion WHILE tiene que ser tipo BOOLEAN y se reconocio el tipo "+this.TipoString(condicion.type))
        throw new error("Semantico", `La condicion de la instruccion WHILE tiene que ser tipo [BOOLEAN] y se reconocio el tipo [${this.TipoString(condicion.type)}]`, this.line, this.column)
        }
        else{
        while (condicion.value) {
            this.code.execute(env)
            condicion = this.condicion.execute(env)
            if (condicion.type != Type.BOOLEAN){ 
                consola.addConsola("---> ERROR SEMÁNTICO: `La condicion de la instruccion WHILE tiene que ser tipo BOOLEAN y se reconocio el tipo "+this.TipoString(condicion.type))
                throw new error("Semantico", `La condicion de la instruccion WHILE tiene que ser tipo [BOOLEAN] y se reconocio el tipo [${this.TipoString(condicion.type)}]`, this.line, this.column)
        }
    }
}
}

    private TipoString(tipo:Type):string{
        switch(tipo){
            case 0: return "INTEGER"
            case 1: return "DOUBLE"
            case 2: return "BOOLEAN"
            case 3: return "CHAR"
            case 4: return "STRING"
            default: return "ERROR"
        }

    }

    public ast() {
        const s = Singleton.getInstance()
        const name_node = `node_${this.line}_${this.column}_`
        s.add_ast(`
        ${name_node}[label="\\<Instruccion\\>\\nwhile"];
        ${name_node}1[label="\\<Condicion\\>"];
        ${name_node}->${name_node}1;
        ${name_node}1->${this.condicion.ast()}
        ${name_node}->node_${this.code.line}_${this.code.column}_;        
        `)
        this.code.ast()

    }
}