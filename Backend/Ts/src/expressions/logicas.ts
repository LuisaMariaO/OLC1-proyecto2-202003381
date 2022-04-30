import { Expression } from "../abstract/expresion";
import { Retorno } from "../abstract/retorno";
import { Singleton } from "../pattern/singleton";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";
import {LogicOption} from './logicOption'

export class Logic extends Expression{
    constructor(
        private left: Expression,
        private rigth: Expression,
        private type: LogicOption,
        line:number,
        column:number
    )
    {
        super(line,column)
    }

    public execute(env: Enviroment): Retorno {
        let result:Retorno = {value:"Error semántico",type:Type.error}//Por defecto
        var consola = Singleton.getInstance();

        const nodoIzq = this.left.execute(env)
        const nodoDer = this.rigth.execute(env)
        //OR
        if(this.type==LogicOption.OR){
         
            if(nodoIzq.value || nodoDer.value==true){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        //AND
        else if (this.type==LogicOption.AND){
            if(nodoIzq.value && nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        //Negacion
        if(this.type==LogicOption.NOT){
        if(!nodoIzq.value){
            result = {value:true,type:Type.BOOLEAN}
        }
        else{
            result = {value:false,type:Type.BOOLEAN}
        }
    }

        return result
    }

    public ast() {
        const nombreNodo = `node_${this.line}_${this.column}_`
        return `
        ${nombreNodo};
        ${nombreNodo}[label="${this.get_simbolo(this.type)}"];
        ${nombreNodo}->${this.left.ast()}
        ${nombreNodo}->${this.rigth.ast()}
        `
    }

    get_simbolo(objeto: LogicOption) {
        switch (objeto) {
            case 0:
                return "||";
            case 1:
                return "&&"
            case 2:
                return "NOT";
            
            default:
                return "";
        }
    }

    
}