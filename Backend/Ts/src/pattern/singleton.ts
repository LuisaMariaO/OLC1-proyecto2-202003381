import { Instruccion } from "../abstract/instruccion";

export class Singleton{

    private static instance: Singleton
    private consola:string="**************************EJECUCIÓN EN CURSO****************************"
 
    private pila: Instruccion[] = []
    private ast: string = ""
    private error:string=""
    private entorno:string=""
    private constructor(){}

    public static getInstance():Singleton{
        if(!Singleton.instance){
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }

    public addConsola(data:string){
        this.consola+=data;
    }
    public getConsola():string{
        return this.consola;
    }
    public addPila(data:Instruccion) {
        this.pila.push(data)
    }
    public add_ast(data: string) {
        this.ast += data
    }
    public get_ast():string{
        return this.ast;
    }
    public clear_ast(){
        this.ast="";
    }

    public add_error(data: any) {
        console.log("aqui")
        this.error +=
            "<tr>" +
            "<td>" + data.tipo + "</td>" +
            "<td>" + data.descripcion + "</td>" +
            "<td>" + data.linea + "</td>" +
            "<td>" + data.columna + "</td>" +
            "</tr>"

            
    }

    public get_error() {
        return `
        <table border=1 style="width: 75%;margin: 0 auto;" cellpadding ="5">
            <tr>
                <th>Tipo error</th>
                <th>Descripcion</th>
                <th>Linea</th>
                <th>Columna</th>
            </tr>${this.error}
        </table>`
    }

    public add_entorno(data:string){
        this.entorno+=data
    }
    public get_entorno():string{
        return this.entorno
    }
    public clear_consola(){
        this.consola="**************************EJECUCIÓN EN CURSO****************************"
    }
}