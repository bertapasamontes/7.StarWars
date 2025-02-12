import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword, User } from "firebase/auth";
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  constructor(
    private route: ActivatedRoute,
  ){}

  private router = inject(Router); 

  loginProfile = new FormGroup ({
    email: new FormControl(''),
    password: new FormControl(''),

  })

  logIn() {

    const email= this.loginProfile.value.email || '';
    const passwd= this.loginProfile.value.password || '';

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, passwd)
    .then((usuarioLogueado)=>{
      const user:User = usuarioLogueado.user;
      console.log("usuario logueado: ", user.displayName);

      return true; 
    })
    .catch((error)=>{
      console.log("ningun usuario logueado:", error);
      if(error.code === "auth/invalid-credential"){
          alert("Parece que no te tenemos aún en el equipo 😔. Registrate!!");
        }
      return false;
    });
  }
}
