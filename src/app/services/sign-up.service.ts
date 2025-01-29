import { inject, Injectable } from '@angular/core';
import { collection, addDoc, Firestore} from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';
import { database } from '../firebase.init'; //importamos la base de datos 


@Injectable({
  providedIn: 'root'
})
export class SignUpService {  
  
  // registrarUsuario(usuario: Usuario){ //creamos un metodo para subir los usuarios nuevos a nuestra base de datos.
  //   const userRef = collection(this.firebase, 'usuarios'); //al trabajar con una bbdd no relacional, las "tablas" se llaman colecciones. Creamos una variable que sea una referencia a la colección q nos interesa, en este caso, usuarios (no estaba creada peros e crea así.). Segun se vayan insertando los datos, se generan en la base de datos.

  //   return addDoc(userRef, usuario);  //devolvemos la llamada de addDoc, en el q le pasamos Dónde hacemos la inserción (la colección userRef) y lo que le pasamos como parametro (= usuario);
  // }

  async signUpUser(user:Usuario){
    try {
    const userReference = await addDoc(collection(database, "users"),{
      user
    });
    console.log("Document written with ID: ", userReference.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  }
  
}
