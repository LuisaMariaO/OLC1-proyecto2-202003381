import { Expression } from "../abstract/expresion"
import { Instruccion } from "../abstract/instruccion"
import { Singleton } from "../pattern/singleton"
import { Enviroment } from "../symbol/enviroment"
import { Type } from "../symbol/type"
import { error } from "../tool/error"

export class Call extends Instruccion {

    constructor(
        private id: string,
        private expresiones: Array<Expression>,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Enviroment) {
        var consola = Singleton.getInstance()
        const func = env.getFuncion(this.id)
        if (func == null){
            consola.addConsola("---> ERROR SEMÁNTICO: "+`No se encontró la funcion con el nombre '${this.id}'`+" Línea: "+this.line+" Columna: "+this.column)
            throw new error("Semantico", `No se encontró la funcion con el nombre '${this.id}'`, this.line, this.column)
        } 

        //verificar que el numero de parametros ingresados sea el mismo numero de parametros en la funcion almacenada
        if (this.expresiones.length != func.parametros.length) {
        consola.addConsola("\n---> ERROR SEMÁNTICO: "+`No se encontró la funcion  '${this.id}' con esos parametros`+" Línea: "+this.line+" Columna "+this.column)
        throw new error("Semantico", `No se encontró la funcion  '${this.id}' con esos parametros`, this.line, this.column)
        }
        //ejecuto cada uno de las expresiones que vienen como parametros y los almaceno los tipos en un array
        let array: number[] = []
        this.expresiones.forEach(x => {
            const expre = x.execute(env)
            array.push(expre.type)
        })

        //recorre cada uno de los parametros de la funcion y verificar que sean del mismo tipo
        for (let i = 0; i < func.parametros.length; i++) {
            const element = func.parametros[i].split(",")[1]
            console.log(array[i])
            if (
                element.toLowerCase() == "int" && array[i] == Type.INTEGER ||
                element.toLowerCase() == "double" && array[i] == Type.DOUBLE ||
                element.toLowerCase() == "char" && array[i] == Type.CHAR ||
                element.toLowerCase() == "string" && array[i] == Type.STRING ||
                element.toLowerCase() == "boolean" && array[i] == Type.BOOLEAN
            ) {
                
            } else {
                consola.addConsola("\n---> ERROR SEMÁNTICO "+`Error de parametros, no se esperaba un tipo [${this.TipoString(array[i])}] en la posicion ${i + 1} de los parametros de la funcion. `+"Línea: "+this.line+" Columna: "+this.column)
            throw new error("Semantico", `Error de parametros, no se esperaba un tipo [${this.TipoString(array[i])}] en la posicion ${i + 1} de los parametros de la funcion`, this.line, this.column)
        }
        }

        
        const newEnv = new Enviroment(env)
        let y = 0
        this.expresiones.forEach(element => {
            const x = element.execute(env)
            newEnv.guardarVariable(func.parametros[y].split(",")[0], x.value, x.type) //En el nuevo entorno
            y++
        })

        const s= Singleton.getInstance()
        s.addPila(this)

        //invocar la funcion
        func.bloque.execute(newEnv)

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