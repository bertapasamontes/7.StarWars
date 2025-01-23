import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { SignUpService } from '../../services/sign-up.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(
    private UserService: SignUpService
  ){}

  SignUpProfile = new FormGroup ({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  onSubmit() {
    // TODO: Use EventEmitter with form value
    const nuevoUser: Usuario = {
      ...this.SignUpProfile.value,
      fechaDeCreacion: new Date(),
      fechaDeActualizacion: new Date()
    } as Usuario;
    console.warn(nuevoUser);
    // this.UserService.registrarUsuario(nuevoUser)
    this.UserService.registrarUsuario(nuevoUser);
  }
}