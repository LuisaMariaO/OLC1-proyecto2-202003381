export class error {
    constructor(
        public tipo: string,
        public descripcion: string,
        public linea: number,
        public columna: number
    ) { }
}