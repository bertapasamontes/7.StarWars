import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { SignUpService } from '../../services/sign-up.service';
import { Usuario } from '../../interfaces/usuario';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(
    private UserService: SignUpService,
  ){}

  SignUpProfile = new FormGroup ({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  
  // onSubmit() {
  //   // TODO: Use EventEmitter with form value
  //   const nuevoUser: Usuario = {
  //     ...this.SignUpProfile.value,
  //     fechaDeCreacion: new Date(),
  //     fechaDeActualizacion: new Date()
  //   } as Usuario;
  //   console.warn(nuevoUser);
  //   // this.UserService.registrarUsuario(nuevoUser)
  //   this.UserService.registrarUsuario(nuevoUser);
  // }


  email = '';
  password = '';

  auth = getAuth();

  signUp() {
    const email = this.SignUpProfile.value.email || ''; 
    const password = this.SignUpProfile.value.password || ''; 
    
    const nuevoUser: Usuario = {
      ...this.SignUpProfile.value,
      fechaDeCreacion: new Date(),
      fechaDeActualizacion: new Date()
    } as Usuario;
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('Usuario registrado:', userCredential.user);
        this.UserService.signUpUser(nuevoUser);
        alert('Usuario registrado con éxito');
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error.message);
      });
  }
}