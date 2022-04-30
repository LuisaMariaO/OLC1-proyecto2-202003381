var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
import { exec } from "child_process";
const fs = require('fs');
var app = express();
var corsOptions = {origin:true, optionsSuccessStatus:200};
var parser = require('./Jison/gramatica')
import { Expression } from './abstract/expresion';
import { Asignacion } from './instruction/asignacion';
import { Declaracion } from './instruction/declaracion';
import { Funcion } from './instruction/funcion';
import { Run } from './instruction/run';
import { Singleton } from './pattern/singleton';
var consola = Singleton.getInstance();
import {Enviroment} from './symbol/enviroment'

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));

var incremental = 0;
app.listen(8080, function(){
    console.log('app escuchando en el puerto 8080');

})

app.get('/', function(req:any,res:any){
    res.json({mensaje:"hola mundo"})
    incremental++;
})

app.get('/retornoTexto', function(req:any,res:any){
    res.send('Hola, soy un mensaje de texto')
})

app.get('/getHi', function(req:any,res:any){
    res.json({"incremental":incremental})
    console.log(incremental)
})

app.post('/setHi', function(req:any,res:any){
   incremental = req.body.incremental
   res.json({msg:"Operacion con exito :D"})
})

app.post('/setCode',function(req:any,res:any){
console.log(req.body.data);
res.json({msg:"Data recibida"})

//Enviando la data a analisis
const ast=parser.parse((req.body.data).toString());

const env = new Enviroment(null)

//Lo que tiene la consola
let date = new Date().toDateString();//Fecha 
let time = new Date().toLocaleTimeString();
consola.addConsola("\n----------------------->"+date+" "+time+"<-----------------------\n");
consola.clear_ast()//Limpia la ejecución anterior
consola.add_ast(`nodeOriginal[label="<\\Lista_Instrucciones\\>"];`)
//Grafico AST
for(const instruccion of ast){
    try{
        if(instruccion !instanceof Expression){
        instruccion.ast();
        consola.add_ast(`nodeOriginal->node_${instruccion.line}_${instruccion.column}_;`)
        }
        else{
            consola.add_ast(`nodeOriginal->node_${instruccion.line}_${instruccion.column}_;`)
        }
    instruccion.ast()
    }catch(error){
        console.log(error)
    }
}

//Recorrer las instrucciones y ejecutarlas
for(const instruccion of ast){
    if(instruccion instanceof Funcion){
    try{
        instruccion.execute(env);
    }catch(error){
        console.log(error)
    }
}
}
for(const instruccion of ast){
    if(instruccion instanceof Asignacion || instruccion instanceof Declaracion || instruccion instanceof Run){
    try{
        instruccion.execute(env);
    }catch(error){
        console.log(error)
    }
}
}


createFile("ast.dot", "digraph G {\nnode[shape=box];" + consola.get_ast() + "\n}")
        exec('dot -Tpng ast.dot -o ast.png ')


})

app.get('/getConsola',function(req:any,res:any){
    res.json({consola:consola.getConsola()})
})

app.get('/getAst',function(req:any,res:any){
    res.json({ast:"C:\\Users\Stuardo Donis\\Desktop\\1er Semestre 2022\\Compiladores 1\\Laboratorio\\Proyecto2\\OLC1-proyecto2-202003381\\Backend\\Ts\\ast.png"})
})


app.get('/getErrores',function(req:any,res:any){
    console.log(consola.get_error())
    res.json({html:consola.get_error()})
})

app.get('/clear',function(req:any,res:any){
    console.log(consola.get_error())
    consola.clear_consola()
    res.json({msg:"Consola restaurada"})
})


function createFile(nameFile: string, data: string) {
    fs.writeFile(nameFile, data, () => {
        
    })}