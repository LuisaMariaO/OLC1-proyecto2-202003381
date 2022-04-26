import {Symbol} from './symbols'
import { Type } from './type';
 export class Enviroment{
    private variables : Map<string,Symbol>

    constructor(public anterior: Enviroment | null){
        this.variables = new Map();
    }

    //Métodos para buscar y crear variables
    
    //Verificar que no exista
    public guardarVariable(nombre:string,valor:any,tipo:Type):boolean{
        console.log("Intento guardar una variable")
        if(this.existe(nombre)){return false}

        //Si no existe se agrega la variable a la tabla de símbolos
        this.variables.set(nombre,new Symbol(valor,nombre,tipo))
        return true;
    }

    public existe(nombre:string):boolean{
        for(let entry of Array.from(this.variables.entries())){
            console.log(entry[0])
            if(entry[0]==nombre){return true;}
        }
        return false;
    }
}