import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  auth = getAuth();
  user = this.auth.currentUser;

  constructor() {}

  async userIsLoggedIn(email:any, password:any){

    try{
      const usuarioLogueado = await signInWithEmailAndPassword(this.auth, email, password)
    
      const user:User = usuarioLogueado.user;

      console.log("usuario logueado: ", user.displayName);
      return true; 
    } 
    catch(error){
      console.log("nungun usuario logueado:", error);
      return false;
    };
  }

  
}
