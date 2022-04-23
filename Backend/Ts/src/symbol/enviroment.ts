import {Symbol} from './symbols'
 export class Enviroment{
    private variables : Map<string,Symbol>

    constructor(public anterior: Enviroment | null){
        this.variables = new Map();
    }

    //Métodos para buscar y crear variables
}