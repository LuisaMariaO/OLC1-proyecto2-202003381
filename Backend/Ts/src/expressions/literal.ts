import { Expression } from "../abstract/expresion";
import { Retorno } from "../abstract/retorno";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";

export class Literal extends Expression{
    constructor(
        private value:any,
        private type:Type,
        line:number,
        column:number 
    )
    {
        super(line,column)
    }
    public execute(env: Enviroment): Retorno {
        if(this.type==Type.INTEGER){
            return {value:Number(this.value),type:Type.INTEGER}
        }
        else if(this.type==Type.DOUBLE){
            return {value:Number(this.value),type:Type.DOUBLE}
        }
        else if(this.type==Type.CHAR){
            return {value:this.value,type:Type.CHAR}
        }
        else if(this.type==Type.STRING){
            return {value:this.value,type:Type.CHAR}
        }
      
        else if(this.type==Type.BOOLEAN){
            var valor = this.value.toLowerCase()
            if(valor=="true"){
                return {value:Boolean(valor),type:Type.BOOLEAN}
            }
            else{
                if(valor=="false"){
                    return {value:Boolean(valor),type:Type.BOOLEAN}
                }
            }
        }
        return {value:"Error semántico",type:Type.error}
    }
}