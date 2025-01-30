import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/authService/auth.service';

@Component({
  selector: 'app-home-animation',
  imports: [],
  templateUrl: './home-animation.component.html',
  styleUrl: './home-animation.component.scss'
})
export class HomeAnimationComponent {
 
  user: User | null = null; // Estado local del usuario
  private userSubscription!: Subscription;

  constructor(
    public authService: AuthService,
    private router: Router
  ){}
  ngOnInit(): void {
      // Navega al componente home después de 5 segundos
      setTimeout(() => this.router.navigate(['/home']), 5000); // 5000 milisegundos = 5 segundos
  
      // this.authService.userIsLogged();
      this.userSubscription = this.authService.user$.subscribe(user => {
        this.user = user;
        console.log("user:", user);
      });
    }
}
