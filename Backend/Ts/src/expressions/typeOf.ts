import { Expression } from "../abstract/expresion";
import { Retorno } from "../abstract/retorno";
import { Singleton } from "../pattern/singleton";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";
import { error } from "../tool/error";

export class TypeOf extends Expression{
    constructor(
        private valor:Expression,
        line:number,
        column:number 
    )
    {
        super(line,column)
    }

    public execute(env: Enviroment): Retorno {
        
        var consola = Singleton.getInstance()
        var result:Retorno={value:"",type:Type.STRING}
        var expr = this.valor.execute(env)
        if(expr.type!=Type.error){
            result = {value:this.TipoString(expr.type),type:Type.STRING}
            return result;
            
        }
        else{
            consola.addConsola("\n---> ERROR SEMÁNTICO: TYPE OF compatible con tipos de dato válido "+" Línea: "+this.line+" Columna: "+this.column)
            throw new error("Semantico","TO LOWER compatible solo con el tipo STRING", this.line, this.column)  
        }
        
    }

    public ast(): string {
        return ""
    }

    TipoString(tipo:Type):string{
        if(tipo==Type.INTEGER){
            return "INTEGER"
        }
        else if(tipo==Type.DOUBLE){
            return "DOUBLE"
        }
        else if(tipo==Type.BOOLEAN){
            return "BOOLEAN"
        }
        else if(tipo==Type.CHAR){
            return "CHAR"
        }
        else{
            return "STRING"
        }
    }
}