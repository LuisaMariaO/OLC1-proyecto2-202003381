import { Expression } from "../abstract/expresion"
import { Instruccion } from "../abstract/instruccion"
import { Singleton } from "../pattern/singleton"
import { Enviroment } from "../symbol/enviroment"
import { Type } from "../symbol/type"
import { error } from "../tool/error"

export class For extends Instruccion {

    constructor(
        private declaracion: Instruccion,
        private condicion: Expression,
        private iterador: Instruccion,
        private code: Instruccion,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Enviroment) {
        var consola = Singleton.getInstance()
        //Entorno para la declaración del for
        const newEnv = new Enviroment(env)
       
        this.declaracion.execute(newEnv)
        let condicion = this.condicion.execute(newEnv)
      
        if (condicion.type != Type.BOOLEAN){
        consola.addConsola("---> ERROR SEMÁNTICO: La instruccion FOR necesita una condición de tipo BOOLEAN y se reconocio el tipo "+this.TipoString(condicion.type)+" Línea: "+this.line+" Columna: "+this.column)
        throw new error("Semantico", `La instruccion FOR necesita una condición de tipo BOOLEAN y se reconocio el tipo [${this.TipoString(condicion.type)}] en la expresion`, this.line, this.column)
        }
        else{
        while (condicion.value) {
            this.code.execute(newEnv)
            this.iterador.execute(newEnv)
            
            //Actualizando la condición
            condicion = this.condicion.execute(newEnv)
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
        ${name_node}[label="\\<Instruccion\\>\\nFor"];
        ${name_node}->node_${this.declaracion.line}_${this.declaracion.column}_;
        ${name_node}->node_${this.iterador.line}_${this.iterador.column}_;
        ${name_node}->node_${this.code.line}_${this.code.column}_;
        ${name_node}->${this.condicion.ast()}
        `)
        this.declaracion.ast();
        this.iterador.ast();
        this.code.ast()

    }

}