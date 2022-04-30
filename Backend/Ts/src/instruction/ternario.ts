import { Expression } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Singleton } from "../pattern/singleton";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";
import { error } from "../tool/error";

export class Ternario extends Instruccion{
    constructor(
        private condition: Expression,
        private code: Instruccion,
        private elsei: Instruccion | null,//Podría no tener else
        line:number,
        column:number
    ){
        super(line,column)
    }

    public execute(env:Enviroment){
        
        var consola = Singleton.getInstance()
        const expresion = this.condition.execute(env)
        if (expresion.type != Type.BOOLEAN) {
            consola.addConsola("---> ERROR SEMÁNTICO: La condición de la instrucción IF debe ser de tipo BOOLEAN y se recibió el tipo "+this.typeString(expresion.type))
            throw new error("Semantico", `La condicion de la instruccion if debe ser tipo [BOOLEAN] y se reconocio el tipo [${this.typeString(expresion.type)}}]]`, this.line, this.column)
        }
        else{
            if (expresion.value){
            
            this.code.execute(env)
            }
            else if (this.elsei!=null){//Si no es true y tiene instrucción else
            this.elsei.execute(env)
        }
       
        }

        
    }

    private typeString(tipo:Type):string{
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
        ${name_node}[label="\\<Instruccion\\>\\nif"];
        ${name_node}1[label="\\<True\\>"];
        ${name_node}2[label="\\<Else\\>"];
        ${name_node}->${name_node}1;
        ${name_node}->${name_node}2;
        ${name_node}1->node_${this.code.line}_${this.code.column}_;`)
        this.code.ast()
        if (this.elsei != null) {
            s.add_ast(`${name_node}2->node_${this.elsei.line}_${this.elsei.column}_`)
            this.elsei.ast()
        }
    }
    
}