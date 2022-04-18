var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(express.json());
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

