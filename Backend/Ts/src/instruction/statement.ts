import { Instruccion } from "../abstract/instruccion"
import { Singleton } from "../pattern/singleton"
import { Enviroment } from "../symbol/enviroment"
import { If } from "./if"

export class Statement extends Instruccion {

    constructor(
        private code: Array<Instruccion>,
        line: number,
        column: number
    ) {
        super(line, column)
    }

    public execute(env: Enviroment) {
        
        /*
        //recorrer primero las instrucciones buscando funciones
        for (const x of this.code) {
            if (x instanceof InsFuncion) {
                x.execute(newEnv)
            }
        }

        //recorrer las instrucciones restantes
        for (const x of this.code) {
            if (x instanceof InsFuncion) { }
            else if (x.toString() != ";") {
                const instruccion = x.execute(newEnv)
            }
        }
        */
       for (const x of this.code){
    
            const instruccion = x.execute(env)
            //TODO: Crear entornos nuevos para funciones y métodos
       }     
       
    }

    public ast() {

        const s = Singleton.getInstance()
        const name_node = `node_${this.line}_${this.column}_`
        s.add_ast(`
        ${name_node}[label="Lista Instrucciones"];        
        `)
        this.code.forEach(x => {
            s.add_ast(`${name_node}->node_${x.line}_${x.column}_;`)
            //x.ast()
        })

    }
}
