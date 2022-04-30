import { Expression } from "../abstract/expresion";
import { Retorno } from "../abstract/retorno";
import { Singleton } from "../pattern/singleton";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";
import { error } from "../tool/error";
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
        var consola = Singleton.getInstance()
        //Valor por defecto
        let result:Retorno = {value:"Error semántico",type:Type.error}
    

        const nodoIzq = this.left.execute(env)
        const nodoDer = this.rigth.execute(env)

        //SUMA

        if(this.type == ArithmeticOption.SUMA){//Tabla de resultadados dada en el enunciado
            if(nodoIzq.type == Type.INTEGER && nodoDer.type == Type.INTEGER){
            result = {value:(nodoIzq.value+nodoDer.value),type:Type.INTEGER}
            }
            else if(nodoIzq.type == Type.INTEGER && nodoDer.type == Type.DOUBLE){
            result = {value:(nodoIzq.value+nodoDer.value),type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.BOOLEAN){
              
                if(nodoDer.value==true){
                    
                    result = {value:(nodoIzq.value+1),type:Type.INTEGER} 
                }
                else{
                    result = {value:(nodoIzq.value+0),type:Type.INTEGER}
                }
            
            } 
            else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.CHAR){
                let char = nodoDer.value
                char = char.replace("'","")//Verificar para sumar caracteres de escape
                result = {value:(nodoIzq.value+(char.charCodeAt(0))),type:Type.INTEGER}
            }
            else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.STRING){
                
                result = {value:(nodoIzq.value.toString()+nodoDer.value),type:Type.STRING}
            }
            /*Siguiente fila de la tabla*/
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INTEGER){
                result = {value:(nodoIzq.value+nodoDer.value),type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
                result = {value:(nodoIzq.value+nodoDer.value),type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.BOOLEAN){
                if(nodoDer.value==true){
                    
                    result = {value:(nodoIzq.value+1),type:Type.DOUBLE} 
                }
                else{
                    result = {value:(nodoIzq.value+0),type:Type.DOUBLE}
                }
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
                let char = nodoDer.value
                char = char.replace("'","")//Verificar para sumar caracteres de escape
                result = {value:(nodoIzq.value+(char.charCodeAt(0))),type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.STRING){
                result = {value:(nodoIzq.value.toString()+nodoDer.value),type:Type.STRING}

            }

            //Siguiente fila de la tabla

            else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.INTEGER){
                if(nodoIzq.value==true){
                    result = {value:(1+nodoDer.value),type:Type.INTEGER} 
                }
                else{
                    result = {value:(0+nodoDer.value),type:Type.INTEGER}
                }
            }
            else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.DOUBLE){
                if(nodoDer.value==true){
                    
                    result = {value:(1+nodoDer.value),type:Type.DOUBLE} 
                }
                else{
                    result = {value:(0+nodoDer.value),type:Type.DOUBLE}
                }
            }
            else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.STRING){
                result = {value:(nodoIzq.value.toString()+nodoDer.value),type:Type.STRING}
            }
            /*Siguiente fila de la tabla */
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INTEGER){
                let char = nodoIzq.value
                char = char.replace("'","")//Verificar para sumar caracteres de escape
                result = {value:((char.charCodeAt(0))+nodoDer.value),type:Type.INTEGER}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
                let char = nodoIzq.value
                char = char.replace("'","")//Verificar para sumar caracteres de escape
                result = {value:((char.charCodeAt(0))+nodoDer.value),type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.CHAR){
                result = {value:(nodoIzq.value+nodoDer.value),type:Type.STRING}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.STRING){
                result = {value:(nodoIzq.value+nodoDer.value),type:Type.STRING}
            }

            /*Siguiente fila de la tabla*/
            else if(nodoIzq.type==Type.STRING && nodoDer.type!=Type.error){//Siempre y cuando no sume con una expresion error
                result = {value:(nodoIzq.value+nodoDer.value.toString()),type:Type.STRING}
            }
           

            else{
                consola.addConsola("\n---> ERROR SEMÁNTICO: "+this.TipoString(nodoIzq.type)+"+"+this.TipoString(nodoDer.type)+" :Datos incompatibles"+" Línea: "+this.line+" Columna: "+this.column)
                throw new error("Semantico", this.TipoString(nodoIzq.type)+"+"+this.TipoString(nodoDer.type)+": Datos incompatibles", this.line, this.column)  
            }

            

        }
        else if(this.type==ArithmeticOption.RESTA){
            //Primera fila de la tabla
            if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.INTEGER){
                result = {value:(nodoIzq.value-nodoDer.value),type:Type.INTEGER}
            }
            else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.DOUBLE){
                result = {value:(nodoIzq.value-nodoDer.value),type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.BOOLEAN){
                if(nodoDer.value==true){
                    
                    result = {value:(nodoIzq.value-1),type:Type.INTEGER} 
                }
                else{
                    result = {value:(nodoIzq.value-0),type:Type.INTEGER}
                }
            }
            else if(nodoIzq.value==Type.INTEGER && nodoDer.type==Type.CHAR){
                let char = nodoDer.value
                char = char.replace("'","")//Verificar para sumar caracteres de escape
                result = {value:(nodoIzq.value-(char.charCodeAt(0))),type:Type.INTEGER}
            }

            //Siguiente fila de la tabla
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INTEGER){
                result = {value:(nodoIzq.value-nodoDer.value),type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
                result = {value:(nodoIzq.value-nodoDer.value),type:Type.DOUBLE}
            }
            else if (nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.BOOLEAN){
                if(nodoDer.value==true){
                    
                    result = {value:(nodoIzq.value-1),type:Type.DOUBLE} 
                }
                else{
                    result = {value:(nodoIzq.value-0),type:Type.DOUBLE}
                }
            }
            else if(nodoIzq.value==Type.DOUBLE && nodoDer.type==Type.CHAR){
                let char = nodoDer.value
                char = char.replace("'","")//Verificar para sumar caracteres de escape
                result = {value:(nodoIzq.value-(char.charCodeAt(0))),type:Type.DOUBLE}
            }

            //Siguiente fila de la tabla
            else if(nodoIzq.value==Type.BOOLEAN && nodoDer.value==Type.INTEGER){
                if(nodoIzq.value==true){
                    
                    result = {value:(1-nodoIzq.value),type:Type.INTEGER} 
                }
                else{
                    result = {value:(0-nodoIzq.value),type:Type.INTEGER}
                }
            }
            else if (nodoIzq.value==Type.BOOLEAN && nodoDer.value==Type.DOUBLE){
                if(nodoIzq.value==true){
                    
                    result = {value:(1-nodoIzq.value),type:Type.DOUBLE} 
                }
                else{
                    result = {value:(0-nodoIzq.value),type:Type.DOUBLE}
                }
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INTEGER){
                let char = nodoIzq.value
                char = char.replace("'","")//Verificar para sumar caracteres de escape
                result = {value:((char.charCodeAt(0))-nodoDer.value),type:Type.INTEGER}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
                let char = nodoIzq.value
                char = char.replace("'","")//Verificar para sumar caracteres de escape
                result = {value:((char.charCodeAt(0))-nodoDer.value),type:Type.DOUBLE}
            }
            else{
                consola.addConsola("\n---> ERROR SEMÁNTICO: "+this.TipoString(nodoIzq.type)+"-"+this.TipoString(nodoDer.type)+" :Datos incompatibles"+" Línea: "+this.line+" Columna: "+this.column)
                throw new error("Semantico", this.TipoString(nodoIzq.type)+"-"+this.TipoString(nodoDer.type)+": Datos incompatibles", this.line, this.column)  
            }

        }
        else if(this.type==ArithmeticOption.MULTIPLICACION){
            //Primera fila de la tabla
            if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.INTEGER){
                result = {value:(nodoIzq.value*nodoDer.value),type:Type.INTEGER}
            }
            else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.DOUBLE){
                result = {value:(nodoIzq.value*nodoDer.value),type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.CHAR){
                let char = nodoDer.value
                char = char.replace("'","")//Verificar para sumar caracteres de escape
                result = {value:(nodoIzq.value*(char.charCodeAt(0))),type:Type.INTEGER}
            }

            //Siguiente fila de la tabla
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INTEGER){
                result = {value:(nodoIzq.value*nodoDer.value),type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
                result = {value:(nodoIzq.value*nodoDer.value),type:Type.DOUBLE}
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
                let char = nodoDer.value
                char = char.replace("'","")//Verificar para sumar caracteres de escape
                result = {value:(nodoIzq.value*(char.charCodeAt(0))),type:Type.DOUBLE}
            }

            //Siguiente fila de la tabla
            else if (nodoIzq.type==Type.CHAR && nodoDer.type==Type.INTEGER){
                let char = nodoIzq.value
                char = char.replace("'","")//Verificar para sumar caracteres de escape
                result = {value:((char.charCodeAt(0))*nodoDer.value),type:Type.INTEGER}
            }
            else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
                let char = nodoIzq.value
                char = char.replace("'","")//Verificar para sumar caracteres de escape
                result = {value:((char.charCodeAt(0))*nodoDer.value),type:Type.DOUBLE}
            }
            else{
                consola.addConsola("\n---> ERROR SEMÁNTICO: "+this.TipoString(nodoIzq.type)+"*"+this.TipoString(nodoDer.type)+" :Datos incompatibles"+" Línea: "+this.line+" Columna: "+this.column)
                throw new error("Semantico", this.TipoString(nodoIzq.type)+"*"+this.TipoString(nodoDer.type)+": Datos incompatibles", this.line, this.column)    
            }
        }
        else if(this.type==ArithmeticOption.DIVISION){
                 //Primera fila de la tabla
                 if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.INTEGER){
                    result = {value:(nodoIzq.value/nodoDer.value),type:Type.DOUBLE}
                }
                else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.DOUBLE){
                    result = {value:(nodoIzq.value/nodoDer.value),type:Type.DOUBLE}
                }
                else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.CHAR){
                    let char = nodoDer.value
                    char = char.replace("'","")//Verificar para sumar caracteres de escape
                    result = {value:(nodoIzq.value/(char.charCodeAt(0))),type:Type.DOUBLE}
                }
    
                //Siguiente fila de la tabla
                else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INTEGER){
                    result = {value:(nodoIzq.value/nodoDer.value),type:Type.DOUBLE}
                }
                else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
                    result = {value:(nodoIzq.value/nodoDer.value),type:Type.DOUBLE}
                }
                else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
                    let char = nodoDer.value
                    char = char.replace("'","")//Verificar para sumar caracteres de escape
                    result = {value:(nodoIzq.value/(char.charCodeAt(0))),type:Type.DOUBLE}
                }
    
                //Siguiente fila de la tabla
                else if (nodoIzq.type==Type.CHAR && nodoDer.type==Type.INTEGER){
                    let char = nodoIzq.value
                    char = char.replace("'","")//Verificar para sumar caracteres de escape
                    result = {value:((char.charCodeAt(0))/nodoDer.value),type:Type.DOUBLE}
                }
                else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
                    let char = nodoIzq.value
                    char = char.replace("'","")//Verificar para sumar caracteres de escape
                    result = {value:((char.charCodeAt(0))/nodoDer.value),type:Type.DOUBLE}
                }
                else{
                    consola.addConsola("\n---> ERROR SEMÁNTICO: "+this.TipoString(nodoIzq.type)+"/"+this.TipoString(nodoDer.type)+" :Datos incompatibles"+" Línea: "+this.line+" Columna: "+this.column)
                    throw new error("Semantico", this.TipoString(nodoIzq.type)+"/"+this.TipoString(nodoDer.type)+": Datos incompatibles", this.line, this.column)    
                }
        }
        else if(this.type==ArithmeticOption.POTENCIA){
            //Primera fila de la tabla
            if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.INTEGER){
                result = {value:(Math.pow(nodoIzq.value,nodoDer.value)),type:Type.INTEGER}  
            }
            else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.DOUBLE){
                result = {value:(Math.pow(nodoIzq.value,nodoDer.value)),type:Type.DOUBLE} 
            }
            //Siguiente fila de la tabla
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INTEGER){
                result = {value:(Math.pow(nodoIzq.value,nodoDer.value)),type:Type.DOUBLE} 
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
                result = {value:(Math.pow(nodoIzq.value,nodoDer.value)),type:Type.DOUBLE} 
            }
            else{
                consola.addConsola("\n---> ERROR SEMÁNTICO: "+this.TipoString(nodoIzq.type)+"^"+this.TipoString(nodoDer.type)+" :Datos incompatibles"+" Línea: "+this.line+" Columna: "+this.column)
                    throw new error("Semantico", this.TipoString(nodoIzq.type)+"^"+this.TipoString(nodoDer.type)+": Datos incompatibles", this.line, this.column)    
            }
        }
        else if (this.type==ArithmeticOption.MODULO){
             //Primera fila de la tabla
             if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.INTEGER){
                result = {value:(nodoIzq.value%nodoDer.value),type:Type.DOUBLE}  
            }
            else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.DOUBLE){
                result = {value:(nodoIzq.value%nodoDer.value),type:Type.DOUBLE} 
            }
            //Siguiente fila de la tabla
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INTEGER){
                result = {value:(nodoIzq.value%nodoDer.value),type:Type.DOUBLE} 
            }
            else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
                result = {value:(nodoIzq.value%nodoDer.value),type:Type.DOUBLE} 
            }
            else{
                consola.addConsola("\n---> ERROR SEMÁNTICO: "+this.TipoString(nodoIzq.type)+"%"+this.TipoString(nodoDer.type)+" :Datos incompatibles"+" Línea: "+this.line+" Columna: "+this.column)
                    throw new error("Semantico", this.TipoString(nodoIzq.type)+"%"+this.TipoString(nodoDer.type)+": Datos incompatibles", this.line, this.column)    
            }
        }
        else if(this.type==ArithmeticOption.NEGACION){
            //Primera fila
            if(nodoIzq.type==Type.INTEGER){
                result = {value:(nodoIzq.value*-1),type:Type.INTEGER} 
            }
            else if(nodoDer.type==Type.DOUBLE){
                result = {value:(nodoIzq.value*-1),type:Type.DOUBLE} 
            }
            else{
                consola.addConsola("\n---> ERROR SEMÁNTICO: NEGACIÓN incompatible con "+this.TipoString(nodoIzq.type)+" Línea: "+this.line+" Columna: "+this.column)
                throw new error("Semantico",  "NEGACIÓN incompatible con "+this.TipoString(nodoIzq.type), this.line, this.column)    
            }
        }
        else{
            //RECORDAR RETORNAR ERRORES CUANDO CORRESPONDA
            //console.log("Retornando un error")
            result = {value:"error",type:Type.error}
        }

        return result;
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

    public ast() {

        const name_nodo = `node_${this.line}_${this.column}_`
        return `
        ${name_nodo};
        ${name_nodo}[label="${this.get_simbolo(this.type)}"];
        ${name_nodo}->${this.left.ast()}
        ${name_nodo}->${this.rigth.ast()}
        `
    }

    get_simbolo(objeto: ArithmeticOption) {
        switch (objeto) {
            case 0:
                return "+";
            case 1:
                return "-"
            case 2:
                return "*";
            case 2:
                return "/";
            case 3:
                return "^";
            case 4:
                return "%";
            case 5:
                return "-N";
            default:
                return "";
        }
    }
}