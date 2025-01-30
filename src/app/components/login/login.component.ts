import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { LogInService } from '../../services/logIn/log-in.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  constructor(
    // private loggedIn: LogInService,
    private route: ActivatedRoute,
  ){}

  private router = inject(Router); 

  loginProfile = new FormGroup ({
    email: new FormControl(''),
    password: new FormControl(''),

  })

  logIn() {
    // console.warn(this.loginProfile.value);

    const email= this.loginProfile.value.email || '';
    const passwd= this.loginProfile.value.password || '';

    // const usuarioExiste = await this.loggedIn.userIsLoggedIn(email, passwd);

    // if(usuarioExiste){
    //   this.router.navigate(['/home-animation']); // redirección a Home
    // }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, passwd)
        .then((usuarioLogueado)=>{
          const user:User = usuarioLogueado.user;
          console.log("usuario logueado: ", user.displayName);

          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'; //al completar el login (user no logueado redireccionado por el guard) lo devuelve a la pantalla donde queria acceder.
          this.router.navigateByUrl(returnUrl);
          
          return true; 
        })
        .catch((error)=>{
          console.log("nungun usuario logueado:", error);
          if(error.code === "auth/invalid-credential"){
              alert("Parece que no te renemos aún en el equipo 😔. Registrate!!");
            }
          return false;
        });

    // .then(()=>{
    //   this.router.navigate(['/home-animation']); // redirección a Home
    // })
    // .catch((error)=>{
    //   console.log("error:", error.code);
    //   if(error.code === "auth/invalid-credential"){
    //     alert("Parece que no te renemos aún en el equipo 😔. Registrate!!");
    //   }
    // })
  }
}
