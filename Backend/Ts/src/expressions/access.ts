import { Expression } from "../abstract/expresion"
import { Retorno } from "../abstract/retorno"
import { Singleton } from "../pattern/singleton"
import { Enviroment } from "../symbol/enviroment"
import { error } from "../tool/error"

export class Access extends Expression {

    constructor(
        private id: string,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(environment: Enviroment): Retorno {
        var consola = Singleton.getInstance()
        //traer la variable
        const value = environment.getVariable(this.id)
        
        if (value == null) {
            //TODO: verificar si es una funcion o arreglo
           
            consola.addConsola("---> ERROR SEMÁNTICO: No se encontró "+this.id +" Línea: "+this.line+" Columna: "+this.column)
            var errores = Singleton.getInstance()
            errores.add_error(new error("Semántico","Variable no encontrada",this.line,this.column))
           throw new error("Semantico", `Variable '${this.id}' no encontrada `, this.line, this.column)
            
        }

        return { value: value.value, type: value.type };


    }

    public ast() {
        const name_nodo = `node_${this.line}_${this.column}_`
        return `
        ${name_nodo};
        ${name_nodo}[label="{${this.id}}"];
        `
    }
}