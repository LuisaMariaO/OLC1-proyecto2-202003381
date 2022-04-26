import { Instruccion } from "../abstract/instruccion";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";

export class Asignacion extends Instruccion{
    constructor(
        public nombre:string,
        line : number,
        column : number
    ){
        super(line,column)
    }

    public execute(env: Enviroment) {
        //Validar que exista la variable

        //Modificar la variable

        //Tambien verificar los tipos
        
        
    }
}

