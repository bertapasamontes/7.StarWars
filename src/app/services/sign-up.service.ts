import { Injectable } from '@angular/core';
import { collection, addDoc} from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';
import { database } from '../firebase.init'; //importamos la base de datos 


@Injectable({
  providedIn: 'root'
})
export class SignUpService {  
  async signUpUser(user:Usuario){//creamos un metodo para subir los usuarios nuevos a nuestra base de datos.
    try{ 
      const userRef = collection(database, "users"); //al trabajar con una bbdd no relacional, las "tablas" se llaman colecciones. Creamos una variable que sea una referencia a la colección q nos interesa, en este caso, usuarios (no estaba creada peros e crea así.). Segun se vayan insertando los datos, se generan en la base de datos.
      await addDoc(userRef,{user});//devolvemos la llamada de addDoc, en el q le pasamos Dónde hacemos la inserción (la colección userRef) y lo que le pasamos como parametro (= usuario);
    } 
    catch(error){
      console.error("Error al añadir un documento: ", error);
    }
  }
}
