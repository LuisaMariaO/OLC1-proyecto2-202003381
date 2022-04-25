import { Instruccion } from "../abstract/instruccion";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";

export class Declaracion extends Instruccion{
    constructor(
        public tipo:string,
        public nombre:string,
        line : number,
        column : number
    ){
        super(line,column)
    }

    public execute(env: Enviroment) {
        //Revisar el tipo de la variable
        //Dando valores por defecto
        var tipo:Type=Type.error;
        this.tipo=this.tipo.toLowerCase();
        if(this.tipo=="int"){
            tipo=Type.INTEGER;
        }
        else{
            if(this.tipo=="double"){
                tipo = Type.DOUBLE;
            }
            else if(this.tipo=="boolean"){
                tipo =Type.BOOLEAN;
            }
            else if(this.tipo=="char"){
                tipo = Type.CHAR;
            }
            else if(this.tipo=="string"){
                tipo = Type.STRING;
            }
        }
        env.guardarVariable(this.nombre,0,tipo)
        console.log("Guardé una variable")
        console.log(env)
        
    }
}

