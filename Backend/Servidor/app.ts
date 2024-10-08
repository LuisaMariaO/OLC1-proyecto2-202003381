var express = require('express');
var morgan = require('morgan');
var cors = require('cors');
var app = express();
var corsOptions = {origin:true, optionsSuccessStatus:200};
var parser = require('../Jison/gramatica');
const singleton_1 = require('../Ts/src/pattern/singleton');
var consola = singleton_1.Singleton.getInstance();
import {Enviroment} from '../Ts/src/symbol/enviroment'

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));

var incremental = 0;
app.listen(8080, function(){
    console.log('app escuchando en el puerto 8080');

})

app.get('/', function(req,res){
    res.json({mensaje:"hola mundo"})
    incremental++;
})

app.get('/retornoTexto', function(req,res){
    res.send('Hola, soy un mensaje de texto')
})

app.get('/getHi', function(req,res){
    res.json({"incremental":incremental})
    console.log(incremental)
})

app.post('/setHi', function(req,res){
   incremental = req.body.incremental
   res.json({msg:"Operacion con exito :D"})
})

app.post('/setCode',function(req,res){
console.log(req.body.data);
res.json({msg:"Data recibida"})

//Enviando la data a analisis
const ast=parser.parse((req.body.data).toString());

const env = new Enviroment(null)

//Lo que tiene la consola
consola.addConsola("Ojalá mme lleve... el diablo");

//Recorrer las instrucciones y ejecutarlas
for(const instruccion of ast){
    try{
        instruccion.execute(env);
    }catch(error){
        console.log(error)
    }
}


})

app.get('/getConsola',function(req,res){
    res.json({consola:consola.getConsola()})
})



