import { Retorno } from '../abstract/retorno';
import { Funcion } from '../instruction/funcion';
import {Symbol} from './symbols'
import { Type } from './type';
 export class Enviroment{
    private variables : Map<string,Symbol>
    public funciones : Map<string,Funcion>

    constructor(public anterior: Enviroment | null){
        this.variables = new Map();
        this.funciones = new Map();
    }

    //Métodos para buscar y crear variables
    
    //Verificar que no exista
    public guardarVariable(nombre:string,valor:any,tipo:Type):boolean{
        //console.log("Intento guardar una variable")
        if(this.existe(nombre)){return false}

        //Si no existe se agrega la variable a la tabla de símbolos
        this.variables.set(nombre,new Symbol(valor,nombre,tipo))
        return true;
    }

    public existe(nombre:string):boolean{
        //En variables
        for(let entry of Array.from(this.variables.entries())){
           
            if(entry[0]==nombre){return true;}
        }
        //En funciones
        for (let entry of Array.from(this.funciones.entries())) {
            if (entry[0] == nombre) {return true};
        }
        return false;
    }
    public getVariable(nombre:string):Symbol | null | undefined{
        let envi:Enviroment | null = this;
        while(envi!=null){
            if(envi.variables.has(nombre)){
                return envi.variables.get(nombre)
            }
            envi = envi.anterior;
        }
        return null;
    }

    public actualizar_variable(nombre: string, valor: any) {

        let env: Enviroment | null = this;

        while (env != null) {
            if (env.variables.has(nombre)) {
                for (let entry of Array.from(env.variables.entries())) {
                    if (entry[0] == nombre) {
                        entry[1].value = valor;
                        return
                    }
                }
            }
            env = env.anterior;
        }
    }

    public guardarFuncion(id: string, funcion: Funcion) {
        this.funciones.set(id, funcion)
    }

    public getFuncion(id: string): Funcion | undefined | null {
        let env: Enviroment | null = this
        while (env != null) {
            if (env.funciones.has(id)) return env.funciones.get(id)
            env = env.anterior
        }
        return env
    }

  
 
}