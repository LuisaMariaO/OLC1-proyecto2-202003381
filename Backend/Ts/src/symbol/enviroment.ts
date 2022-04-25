import {Symbol} from './symbols'
import { Type } from './type';
 export class Enviroment{
    private tablaSimbolos : Map<string,Symbol>

    constructor(public anterior: Enviroment | null){
        this.tablaSimbolos = new Map();
    }

    //Métodos para buscar y crear variables
    
    //Verificar que no exista
    public guardarVariable(nombre:string,valor:any,tipo:Type){
        this.tablaSimbolos.set(nombre,new Symbol(valor,nombre,tipo))
        return true;
    }
}