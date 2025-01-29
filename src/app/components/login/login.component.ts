import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LogInService } from '../../services/logIn/log-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  constructor(
    private loggedIn: LogInService
  ){}

  private router = inject(Router); 

  loginProfile = new FormGroup ({
    email: new FormControl(''),
    password: new FormControl(''),

  })

  async logIn() {
    // console.warn(this.loginProfile.value);

    const email= this.loginProfile.value.email || '';
    const passwd= this.loginProfile.value.password || '';

    const usuarioExiste = await this.loggedIn.userIsLoggedIn(email, passwd);

    if(usuarioExiste){
      this.router.navigate(['/home']); // redirección a Home
    }
  }
}
