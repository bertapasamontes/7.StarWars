import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { SignUpService } from '../../services/sign-up.service';
import { Usuario } from '../../interfaces/usuario';
import { createUserWithEmailAndPassword, getAuth, updateProfile, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

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

  private router = inject(Router); 

  SignUpProfile = new FormGroup ({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });


  // email = '';
  // password = '';

  auth = getAuth();

  async signUp() {
    const email = this.SignUpProfile.value.email || ''; 
    const password = this.SignUpProfile.value.password || ''; 
    
    const nuevoUser: Usuario = {
      ...this.SignUpProfile.value,
      fechaDeCreacion: new Date(),
      fechaDeActualizacion: new Date()
    } as Usuario;
    this.UserService.signUpUser(nuevoUser); //creamos el user en la database.

    createUserWithEmailAndPassword(this.auth, email, password) //creamos el user en el firebase auth
      .then((usuarioCreado: { user: User; })=>{
        updateProfile(usuarioCreado.user, { displayName: this.SignUpProfile.value.name }); //asignamos el display name del usuario creado en el firebase database (tipo Usuario) al usuario creado del Firebase Auth, q no me lo coge.
        console.log('Usuario registrado con éxito');
        
        setTimeout(()=> {
          this.router.navigate(['/home-animation']),
          80000}); // redirección a Home
      })
      .catch((error)=> {
        console.error('Error al registrar usuario:', error.code);
        if(error.code === "auth/email-already-in-use"){
          alert("Gmail ya registrado, camarada. Prueba con otro o inicia sesión 😊");
        }
      });

  }
}