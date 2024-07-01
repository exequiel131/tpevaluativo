export interface usuario {
    uid:string | any;  //atributos del tipo any recibe vacios o indefinidos
    nombre: string;
    apellido: string;
    rol: string;
    email:string;
    password:string; //la ñ esta prohibida
}
