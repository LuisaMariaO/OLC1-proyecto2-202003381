import { Expression } from "../abstract/expresion";
import { Retorno } from "../abstract/retorno";
import { Singleton } from "../pattern/singleton";
import { Enviroment } from "../symbol/enviroment";
import { Type } from "../symbol/type";
import { error } from "../tool/error";
import { RelationalOption } from "./relationalOption";

export class Relational extends Expression{
    constructor(
        private left: Expression,
        private rigth: Expression,
        private type: RelationalOption,
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

        //Igual
        if(this.type==RelationalOption.IGUAL){
        // Primera fila de la tabla
        if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.INTEGER){
            if(nodoIzq.value==nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.DOUBLE){
            if(nodoIzq.value==nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.BOOLEAN){
            let valor = 1
            if(nodoDer.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(nodoIzq.value==valor){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.CHAR){
            let char = nodoDer.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(nodoIzq.value==char.charCodeAt(0)){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }

        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INTEGER){
            if(nodoIzq.value==nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
            if(nodoIzq.value==nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.BOOLEAN){
            let valor = 1
            if(nodoDer.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(nodoIzq.value==valor){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
            let char = nodoDer.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(nodoIzq.value==char.charCodeAt(0)){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }

        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.INTEGER){
            let valor = 1
            if(nodoIzq.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(valor==nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.DOUBLE){
            let valor = 1
            if(nodoIzq.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(valor==nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.BOOLEAN){
            if(nodoIzq.value==nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INTEGER){
            let char = nodoIzq.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(char.charCodeAt(0)==nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
            let char = nodoIzq.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(char.charCodeAt(0)==nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.CHAR){
            if(nodoIzq.value==nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        //siguiente fila de la tabla
        else if(nodoIzq.type==Type.STRING && nodoDer.type==Type.STRING){
            if(nodoIzq.value==nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else{
            consola.addConsola("\n---> ERROR SEMÁNTICO: "+this.TipoString(nodoIzq.type)+"=="+this.TipoString(nodoDer.type)+" :Datos incompatibles"+" Línea: "+this.line+" Columna: "+this.column)
                throw new error("Semantico", this.TipoString(nodoIzq.type)+"=="+this.TipoString(nodoDer.type)+": Datos incompatibles", this.line, this.column)  
        }

    }

    /*-----------------------------------------------------------------------------------------*/
    else if(this.type==RelationalOption.DIFERENTE){//Diferente
        if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.INTEGER){
            if(nodoIzq.value!=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.DOUBLE){
            if(nodoIzq.value!=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.BOOLEAN){
            let valor = 1
            if(nodoDer.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(nodoIzq.value!=valor){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.CHAR){
            let char = nodoDer.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(nodoIzq.value!=char.charCodeAt(0)){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }

        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INTEGER){
            if(nodoIzq.value!=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
            if(nodoIzq.value!=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.BOOLEAN){
            let valor = 1
            if(nodoDer.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(nodoIzq.value!=valor){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
            let char = nodoDer.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(nodoIzq.value!=char.charCodeAt(0)){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }

        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.INTEGER){
            let valor = 1
            if(nodoIzq.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(valor!=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.DOUBLE){
            let valor = 1
            if(nodoIzq.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(valor!=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.BOOLEAN){
            if(nodoIzq.value!=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INTEGER){
            let char = nodoIzq.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(char.charCodeAt(0)!=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
            let char = nodoIzq.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(char.charCodeAt(0)!=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.CHAR){
            if(nodoIzq.value!=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        //siguiente fila de la tabla
        else if(nodoIzq.type==Type.STRING && nodoDer.type==Type.STRING){
            if(nodoIzq.value!=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else{
            consola.addConsola("\n---> ERROR SEMÁNTICO: "+this.TipoString(nodoIzq.type)+"!="+this.TipoString(nodoDer.type)+" :Datos incompatibles"+" Línea: "+this.line+" Columna: "+this.column)
                throw new error("Semantico", this.TipoString(nodoIzq.type)+"!="+this.TipoString(nodoDer.type)+": Datos incompatibles", this.line, this.column)  
        }
    }
    /*---------------------------------------------------------------------------------------*/
    else if(this.type==RelationalOption.MENOR){
        if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.INTEGER){
            if(nodoIzq.value<nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.DOUBLE){
            if(nodoIzq.value<nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.BOOLEAN){
            let valor = 1
            if(nodoDer.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(nodoIzq.value<valor){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.CHAR){
            let char = nodoDer.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(nodoIzq.value<char.charCodeAt(0)){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }

        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INTEGER){
            if(nodoIzq.value==nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
            if(nodoIzq.value<nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.BOOLEAN){
            let valor = 1
            if(nodoDer.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(nodoIzq.value<valor){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
            let char = nodoDer.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(nodoIzq.value<char.charCodeAt(0)){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }

        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.INTEGER){
            let valor = 1
            if(nodoIzq.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(valor<nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.DOUBLE){
            let valor = 1
            if(nodoIzq.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(valor<nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.BOOLEAN){
            if(nodoIzq.value<nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INTEGER){
            let char = nodoIzq.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(char.charCodeAt(0)<nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
            let char = nodoIzq.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(char.charCodeAt(0)<nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.CHAR){
            if(nodoIzq.value<nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        //siguiente fila de la tabla
        else if(nodoIzq.type==Type.STRING && nodoDer.type==Type.STRING){
            if(nodoIzq.value<nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else{
            consola.addConsola("\n---> ERROR SEMÁNTICO: "+this.TipoString(nodoIzq.type)+"<"+this.TipoString(nodoDer.type)+" :Datos incompatibles"+" Línea: "+this.line+" Columna: "+this.column)
                throw new error("Semantico", this.TipoString(nodoIzq.type)+"<"+this.TipoString(nodoDer.type)+": Datos incompatibles", this.line, this.column)  
        }
    }

    /*-------------------------------------------------------------------------------------------*/
    else if(this.type==RelationalOption.MENORIGUAL){
        if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.INTEGER){
            if(nodoIzq.value<=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.DOUBLE){
            if(nodoIzq.value<=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.BOOLEAN){
            let valor = 1
            if(nodoDer.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(nodoIzq.value<=valor){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.CHAR){
            let char = nodoDer.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(nodoIzq.value<=char.charCodeAt(0)){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }

        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INTEGER){
            if(nodoIzq.value<=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
            if(nodoIzq.value<=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.BOOLEAN){
            let valor = 1
            if(nodoDer.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(nodoIzq.value<=valor){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
            let char = nodoDer.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(nodoIzq.value<=char.charCodeAt(0)){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }

        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.INTEGER){
            let valor = 1
            if(nodoIzq.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(valor<=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.DOUBLE){
            let valor = 1
            if(nodoIzq.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(valor<=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.BOOLEAN){
            if(nodoIzq.value<=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INTEGER){
            let char = nodoIzq.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(char.charCodeAt(0)<=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
            let char = nodoIzq.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(char.charCodeAt(0)<=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.CHAR){
            if(nodoIzq.value<=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        //siguiente fila de la tabla
        else if(nodoIzq.type==Type.STRING && nodoDer.type==Type.STRING){
            if(nodoIzq.value<=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else{
            consola.addConsola("\n---> ERROR SEMÁNTICO: "+this.TipoString(nodoIzq.type)+"<="+this.TipoString(nodoDer.type)+" :Datos incompatibles"+" Línea: "+this.line+" Columna: "+this.column)
                throw new error("Semantico", this.TipoString(nodoIzq.type)+"<="+this.TipoString(nodoDer.type)+": Datos incompatibles", this.line, this.column)  
        }
    }
    /*-----------------------------------------------------------------------------------------*/
    else if(this.type==RelationalOption.MAYOR){
        if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.INTEGER){
            if(nodoIzq.value>nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.DOUBLE){
            if(nodoIzq.value>nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.BOOLEAN){
            let valor = 1
            if(nodoDer.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(nodoIzq.value>valor){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.CHAR){
            let char = nodoDer.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(nodoIzq.value>char.charCodeAt(0)){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }

        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INTEGER){
            if(nodoIzq.value>nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
            if(nodoIzq.value>nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.BOOLEAN){
            let valor = 1
            if(nodoDer.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(nodoIzq.value>valor){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
            let char = nodoDer.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(nodoIzq.value>char.charCodeAt(0)){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }

        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.INTEGER){
            let valor = 1
            if(nodoIzq.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(valor>nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.DOUBLE){
            let valor = 1
            if(nodoIzq.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(valor>nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.BOOLEAN){
            if(nodoIzq.value>nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INTEGER){
            let char = nodoIzq.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(char.charCodeAt(0)>nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
            let char = nodoIzq.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(char.charCodeAt(0)>nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.CHAR){
            if(nodoIzq.value>nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        //siguiente fila de la tabla
        else if(nodoIzq.type==Type.STRING && nodoDer.type==Type.STRING){
            if(nodoIzq.value>nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else{
            consola.addConsola("\n---> ERROR SEMÁNTICO: "+this.TipoString(nodoIzq.type)+">"+this.TipoString(nodoDer.type)+" :Datos incompatibles"+" Línea: "+this.line+" Columna: "+this.column)
                throw new error("Semantico", this.TipoString(nodoIzq.type)+">"+this.TipoString(nodoDer.type)+": Datos incompatibles", this.line, this.column)  
        }

        /*-----------------------------------------------------------------------------------*/
       
    }
    else if(this.type==RelationalOption.MAYORIGUAL){
        if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.INTEGER){
            if(nodoIzq.value>=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.DOUBLE){
            if(nodoIzq.value>=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.BOOLEAN){
            let valor = 1
            if(nodoDer.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(nodoIzq.value>=valor){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.INTEGER && nodoDer.type==Type.CHAR){
            let char = nodoDer.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(nodoIzq.value>=char.charCodeAt(0)){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }

        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.INTEGER){
            if(nodoIzq.value>=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.DOUBLE){
            if(nodoIzq.value>=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            } 
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.BOOLEAN){
            let valor = 1
            if(nodoDer.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(nodoIzq.value>=valor){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.DOUBLE && nodoDer.type==Type.CHAR){
            let char = nodoDer.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(nodoIzq.value>=char.charCodeAt(0)){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }

        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.INTEGER){
            let valor = 1
            if(nodoIzq.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(valor>=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.DOUBLE){
            let valor = 1
            if(nodoIzq.value==true){
                valor = 1
            }
            else{
                valor = 0
            }

            if(valor>=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.BOOLEAN && nodoDer.type==Type.BOOLEAN){
            if(nodoIzq.value>=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
            result = {value:false,type:Type.BOOLEAN}
            }
        }
        //Siguiente fila de la tabla
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.INTEGER){
            let char = nodoIzq.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(char.charCodeAt(0)>=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.DOUBLE){
            let char = nodoIzq.value
            char = char.replace("'","")//Verificar para sumar caracteres de escape
            if(char.charCodeAt(0)>=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else if(nodoIzq.type==Type.CHAR && nodoDer.type==Type.CHAR){
            if(nodoIzq.value>=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        //siguiente fila de la tabla
        else if(nodoIzq.type==Type.STRING && nodoDer.type==Type.STRING){
            if(nodoIzq.value>=nodoDer.value){
                result = {value:true,type:Type.BOOLEAN}
            }
            else{
                result = {value:false,type:Type.BOOLEAN}
            }
        }
        else{
            consola.addConsola("\n---> ERROR SEMÁNTICO: "+this.TipoString(nodoIzq.type)+">="+this.TipoString(nodoDer.type)+" :Datos incompatibles"+" Línea: "+this.line+" Columna: "+this.column)
                throw new error("Semantico", this.TipoString(nodoIzq.type)+">="+this.TipoString(nodoDer.type)+": Datos incompatibles", this.line, this.column)  
        }
    }
        return result
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
        const nombreNodo = `node_${this.line}_${this.column}_`
        return `
        ${nombreNodo};
        ${nombreNodo}[label="${this.get_simbolo(this.type)}"];
        ${nombreNodo}->${this.left.ast()}
        ${nombreNodo}->${this.rigth.ast()}
        `
    }

    get_simbolo(objeto: RelationalOption) {
        switch (objeto) {
            case 0:
                return "==";
            case 1:
                return "!="
            case 2:
                return "<"
            case 3:
                return "<="
            case 4:
                return ">"
            case 5:
                return ">="    
            
            default:
                return "";
        }
    }

}