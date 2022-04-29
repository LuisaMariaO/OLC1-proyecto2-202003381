var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var app = express();
var corsOptions = {origin:true, optionsSuccessStatus:200};
var parser = require('./Jison/gramatica')
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


})

app.get('/getConsola',function(req:any,res:any){
    res.json({consola:consola.getConsola()})
})