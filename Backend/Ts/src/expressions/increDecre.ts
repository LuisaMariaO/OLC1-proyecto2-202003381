import { Expression } from "../abstract/expresion"
import { Retorno } from "../abstract/retorno"
import { Enviroment } from "../symbol/enviroment"
import { Type } from "../symbol/type"
import { error } from "../tool/error"
import { IncreDecreOption } from "./increDecreOption"

export class IncreDecre extends Expression {

    constructor(
        private type: IncreDecreOption,
        private nombrevariable: string,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Enviroment): Retorno {

        let result: Retorno = { value: null, type: Type.INTEGER }
        const variable = env.getVariable(this.nombrevariable)

        //validar que exista, que sea editable y que su tipo sea numero
        if (variable == null){
        throw new error("Semantico", `variable '${this.nombrevariable}' no encontrada`, this.line, this.column)
        
        }
        else{
       
        if (variable.type != Type.INTEGER){ 
        throw new error("Semantico", `La variable '${this.nombrevariable}' tiene que ser de tipo INT para incrementar o decrementar`, this.line, this.column)
        }
        else{
            if(this.type==IncreDecreOption.INCREMENTO){
                result.value= variable.value;
                variable.value++;
            }
            else{
                result.value= variable.value;
                variable.value--;
            }
        }

    }
        
        //actualizando la tabla de simbolos
        env.actualizar_variable(this.nombrevariable, variable.value)
        return result
    }

    get_simbolo(objeto: IncreDecreOption) {
        switch (objeto) {
            case 0:
                return "++";
            case 1:
                return "--"

            default:
                return "";
        }
    }

    public ast() {
        
        const nombre_nodo=`node_${this.line}_${this.column}_`
        return `
        /**/${nombre_nodo}1;
        ${nombre_nodo}1[label="{${this.nombrevariable}}"];
        ${nombre_nodo}[label="${this.get_simbolo(this.type)}"];
        ${nombre_nodo}1->${nombre_nodo};
        `
    }
}