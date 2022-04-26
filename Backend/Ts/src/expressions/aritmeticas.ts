import { Expression } from "../abstract/expresion";
import { Retorno } from "../abstract/retorno";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";
import { ArithmeticOption } from "./arithmeticOption";

/*
LAS EXPRESIONES RETORNAN VALORES
*/

export class Arithmetic extends Expression{
    constructor(
        private left: Expression,
        private rigth: Expression,
        private type: ArithmeticOption,
        line:number,
        column:number
    )
    {
        super(line,column)
    }

    public execute(env: Enviroment): Retorno {
        //Valor por defecto
        let result:Retorno = {value:0,type:Type.INTEGER}
    

        const nodoIzq = this.left.execute(env)
        const nodoDer = this.rigth.execute(env)

        //SUMA

        if(this.type == ArithmeticOption.SUMA){
            if(nodoIzq.type == Type.INTEGER && nodoDer.type == Type.INTEGER)
            result = {value:(nodoIzq.value+nodoDer.value),type:Type.INTEGER}
        }
        else{
            //RECORDAR RETORNAR ERRORES CUANDO CORRESPONDA
            result = {value:0,type:Type.INTEGER}
        }

        return result;
    }
}