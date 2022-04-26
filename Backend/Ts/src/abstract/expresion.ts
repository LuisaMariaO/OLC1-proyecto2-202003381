import {Retorno} from './retorno'
import { Enviroment } from '../symbol/enviroment'

export abstract class Expression{
    constructor(public line:number,public column:number){
        this.line=line;
        this.column=column;
    }

    public abstract execute(env: Enviroment):Retorno
    //public abstract ast():string
}