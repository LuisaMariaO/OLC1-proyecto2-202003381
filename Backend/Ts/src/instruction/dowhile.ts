import { Expression } from "../abstract/expresion"
import { Instruccion } from "../abstract/instruccion"
import { Singleton } from "../pattern/singleton"
import { Enviroment } from "../symbol/enviroment"
import { Type } from "../symbol/type"
import { error } from "../tool/error"

export class DoWhile extends Instruccion {

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
        consola.addConsola("---> ERROR SEMÁNTICO: `La condicion de la instruccion DO WHILE tiene que ser tipo BOOLEAN y se reconocio el tipo "+this.TipoString(condicion.type))
        throw new error("Semantico", `La condicion de la instruccion DO WHILE tiene que ser tipo [BOOLEAN] y se reconocio el tipo [${this.TipoString(condicion.type)}]`, this.line, this.column)
        }
        else{
       do {
            this.code.execute(env)
            condicion = this.condicion.execute(env)
            if (condicion.type != Type.BOOLEAN){ 
                consola.addConsola("---> ERROR SEMÁNTICO: `La condicion de la instruccion DO WHILE tiene que ser tipo BOOLEAN y se reconocio el tipo "+this.TipoString(condicion.type))
                throw new error("Semantico", `La condicion de la instruccion DO WHILE tiene que ser tipo [BOOLEAN] y se reconocio el tipo [${this.TipoString(condicion.type)}]`, this.line, this.column)
        }
    }while(condicion.value)
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
}