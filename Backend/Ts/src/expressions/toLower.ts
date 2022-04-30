import { Expression } from "../abstract/expresion";
import { Retorno } from "../abstract/retorno";
import { Singleton } from "../pattern/singleton";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";
import { error } from "../tool/error";

export class ToLower extends Expression{
    constructor(
        private valor:Expression,
        line:number,
        column:number 
    )
    {
        super(line,column)
    }

    public execute(env: Enviroment): Retorno {
        console.log("DD")
        var consola = Singleton.getInstance()
        var result:Retorno={value:"",type:Type.STRING}
        var expr = this.valor.execute(env)
        if(expr.type==Type.STRING){
            result = {value:expr.value.toLowerCase(),type:Type.STRING}
            return result;
            
        }
        else{
            consola.addConsola("\n---> ERROR SEMÁNTICO: TO LOWER compatible solo con el tipo STRING"+" Línea: "+this.line+" Columna: "+this.column)
            throw new error("Semantico","TO LOWER compatible solo con el tipo STRING", this.line, this.column)  
        }
        
    }

    public ast(): string {
        return ""
    }
}