import { Expression } from "../abstract/expresion";
import { Instruccion } from "../abstract/instruccion";
import { Retorno } from "../abstract/retorno";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";

export class Declaracion extends Instruccion{
    constructor(
        public tipo:string,
        public nombre:string,
        public value:Expression, //Si no tiene expresión, este valor es nulo
        line : number,
        column : number
    ){
        super(line,column)
    }

    public execute(env: Enviroment) {
    var tipo = Type.error;
    var expresion:Retorno ={value:null,type:Type.error}


        //Asignando los tipos correspondientes
        this.tipo=this.tipo.toLowerCase();
        if(this.tipo=="int"){
            tipo=Type.INTEGER;
           expresion= {value:0,type:Type.INTEGER};
            
        }
        else{
            if(this.tipo=="double"){
                tipo = Type.DOUBLE;
                expresion = {value:0.0,type:Type.DOUBLE};
            }
            else if(this.tipo=="boolean"){
                tipo =Type.BOOLEAN;
                expresion={value:true,type:Type.BOOLEAN};
            }
            else if(this.tipo=="char"){
                tipo = Type.CHAR
                expresion={value:'0',type:Type.CHAR};
            }
            else if(this.tipo=="string"){
                tipo = Type.STRING;
                expresion={value:"",type:Type.STRING};
            }
        }

        //Ejecuto la expresión para obtener el valor
        if(this.value!=null){
            //Si el valor recibido no es nulo, cambio el valor por defecto por el correspondiente
        expresion = this.value.execute(env)
        }
  
        //Revisar el tipo de la variable
    
        const g =env.guardarVariable(this.nombre,expresion.value,tipo)
        if(g){console.log("Guardé una variable")}
        else{console.log("La variable ya existía")}
        
        console.log(env)
        
    }

    //public ast()
}

