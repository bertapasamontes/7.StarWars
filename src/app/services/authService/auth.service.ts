import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioLogueado = new BehaviorSubject <User | null> (null); //creamos un servicio para ver el estado del user
  user$ = this.usuarioLogueado.asObservable(); // hacemos que sea observable para que otros componentes lo puedan ver.

  auth = getAuth();
  

  constructor(){
    // if (user) {
    // // https://firebase.google.com/docs/reference/js/auth.user
    //   console.log("Usuario logueado con exito");
    //   this.usuarioLogueado.next(user); // Compartir el usuario en tiempo real
    //   return localStorage.setItem('user', JSON.stringify(user)); // Guardar usuario en localStorage
      
    // }
    // else{
    //   localStorage.removeItem('user'); // Eliminar usuario al cerrar sesión
    //   return console.log("No hay usuario logueado");
    // }
    
    //el usuario ha iniciado sesion:
    onAuthStateChanged(this.auth, (user) => { //al cargar la pagina, miramos si el estado del usuario cambia (si ha iniciado sesion o si la ha cerrado).
    
      this.usuarioLogueado.next(user); //el usuario está logueado
      if (user) {
        
        console.log('Usuario logueado:', user.email);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
        console.log('No hay usuario logueado');
      }
    });

  }

  get currentUser() {
    return this.usuarioLogueado.value;
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => console.log('Usuario deslogueado'))
      .catch((error) => console.error('Error al cerrar sesión:', error));
  }

  
  
}
