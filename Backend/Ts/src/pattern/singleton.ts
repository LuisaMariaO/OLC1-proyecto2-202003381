export class Singleton{

    private static instance: Singleton
    private consola:string=""

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
}