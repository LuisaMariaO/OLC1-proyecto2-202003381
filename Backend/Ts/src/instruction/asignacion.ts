import { Expression } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Singleton } from "../pattern/singleton";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";
import { error } from "../tool/error";

export class Asignacion extends Instruccion{
    constructor(
        public nombre:string,
        public value:Expression,
        line : number,
        column : number
    ){
        super(line,column)
    }

    public execute(env: Enviroment) {
        
        var consola = Singleton.getInstance();
        const expresion = this.value.execute(env)
        var variable = env.getVariable(this.nombre)
     
        if (variable == null || variable == undefined){
        consola.addConsola("---> ERROR SEMÁNTICO: No se encontró la variable "+this.nombre+" Línea: "+this.line+" Columna: "+this.column)
        throw new error("Semantico", `No se encontró una variable con el nombre '${this.nombre}'`, this.line, this.column)
        

        }
        else{
            if (variable.type != expresion.type){ 
                consola.addConsola("---> ERROR SEMÁNTICO: No es posible asignar un valor de tipo "+this.tipoString(expresion.type)+" a una variable de tipo "+this.tipoString(variable.type)+" Línea: "+this.line+" Columna: "+this.column)
                throw new error("Semantico", `Asignacion incorrecta, la variable con nombre '${this.nombre}' es de tipo [${this.tipoString(variable.type)}] y se le esta tratando de asignar un tipo [${(this.tipoString(expresion.type))}]`, this.line, this.column)
                
                }
                else{
                    env.actualizar_variable(this.nombre, expresion.value)
                }
        }


        
        console.log(env)
        
    }

    private tipoString(tipo:Type):string | undefined{
        switch(tipo){
            case 0: return "INTEGER"
            case 1: return "DOUBLE"
            case 2: return "BOOLEAN"
            case 3: return "CHAR"
            case 4: return "STRING"
            default: "ERROR"
        }
    }
}

