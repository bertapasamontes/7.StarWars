export interface Usuario {
    id?:string;
    name: string;
    email: string;
    password: string;
    fechaDeCreacion: Date;
    fechaDeActualizacion: Date;
  
//   constructor(name: string; email: string, password: string){
//     this.name = name;
//     this.email = email;
//     this.password = password;
//     this.fechaDeCreacion = new Date();
//     this.fechaDeActualizacion = new Date();
//   }
}
