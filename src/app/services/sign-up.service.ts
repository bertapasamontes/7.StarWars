import { inject, Injectable } from '@angular/core';
import { collection, addDoc, Firestore} from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(
    private firebase: Firestore,//importamos Firestore
  ) { }
  
  
  registrarUsuario(usuario: Usuario){ //creamos un metodo para subir los usuarios nuevos a nuestra base de datos.
    const userRef = collection(this.firebase, 'usuarios'); //al trabajar con una bbdd no relacional, las "tablas" se llaman colecciones. Creamos una variable que sea una referencia a la colección q nos interesa, en este caso, usuarios (no estaba creada peros e crea así.). Segun se vayan insertando los datos, se generan en la base de datos.

    return addDoc(userRef, usuario);  //devolvemos la llamada de addDoc, en el q le pasamos Dónde hacemos la inserción (la colección userRef) y lo que le pasamos como parametro (= usuario);
  }
}
