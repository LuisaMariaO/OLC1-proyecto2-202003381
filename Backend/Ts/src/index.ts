import {Singleton} from './pattern/singleton'
console.log("Holis mundo");
console.log("Hola de nuevo");

var consola = Singleton.getInstance();
consola.addConsola("Ojalá que funcione");
console.log(consola.getConsola());
