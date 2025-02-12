import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userIsLogged=false;

  private usuarioLogueado = new BehaviorSubject <User | null> (null); //creamos un servicio para ver el estado del user
  user$ = this.usuarioLogueado.asObservable(); // hacemos que sea observable para que otros componentes lo puedan ver.
  
  // usuarioLogueado: User | null = null


    private router = inject(Router); 
  
  constructor(
        private route: ActivatedRoute,
    
  ){

    const auth = getAuth();
    
    //el usuario ha iniciado sesion:
    onAuthStateChanged(auth, (user) => { //al cargar la pagina, miramos si el estado del usuario cambia (si ha iniciado sesion o si la ha cerrado).
    
      // usuarioLogueado.next(user); //el usuario está logueado
      this.usuarioLogueado.next(user);
      if (user) {
        this.userIsLogged = true;
         console.log("userIsLogged = true");
         localStorage.setItem('user', JSON.stringify(user));

         const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'; //al completar el login (user no logueado redireccionado por el guard) lo devuelve a la pantalla donde queria acceder.
         this.router.navigateByUrl(returnUrl);
         // this.router.navigateByUrl("/starship");
      } 
      else {
        this.userIsLogged = false;
        console.log("userIsLogged = false");
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
