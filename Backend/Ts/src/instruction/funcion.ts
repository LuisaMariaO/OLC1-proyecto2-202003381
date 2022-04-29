import { Instruccion } from "../abstract/instruccion";
import { Singleton } from "../pattern/singleton";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";
import { error } from "../tool/error";

export class Funcion extends Instruccion {

    constructor(
        public name: string,
        public bloque: Instruccion,
        public parametros: Array<string>,
        public tipo: string,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Enviroment) {
        var consola = Singleton.getInstance()

        let f = env.existe(this.name)

        if (f){
            consola.addConsola("---> ERROR SEMÁNTICO: Ya existe una variable, arrelgo o función con el nombre "+this.name)
            throw new error("Semantico", `Ya existe una variable,arreglo o función con el nombre '${this.name}' `, this.line, this.column)
        }
        else{
        //revisar que el nombre de los parametros no se repitan
        let array_parametro: string[] = [] //Array auxilar para no corropmper el original
        this.parametros.forEach(x => {
            let tmp = x.split(",")
            array_parametro.push(tmp[0])//Solo nombres
        });

        var flag:Boolean=false;
        var i = 0
        array_parametro.forEach(x => {
            if (i != array_parametro.indexOf(x) //que no sea el mismo, porque ira a buscar el nombre a todo el array
                && array_parametro.indexOf(x) >= 0
            ) {
                flag=true
                
                consola.addConsola("\n---> ERROR SEMÁNTICO: La función "+this.name+" contiene parámetros repetidos")
                throw new error("Semantico", `La funcion  '${this.name}' tiene un parametro repetido llamado '${x}'`, this.line, this.column)
            }
            i++
        })
    }

        //todo esta listo para guardarla en la tabla de simbolos
        env.guardarFuncion(this.name, this)
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