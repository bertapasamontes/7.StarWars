import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Auth, User } from 'firebase/auth';
import { AuthService } from '../../../services/authService/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user: User | null = null; // Estado local del usuario
  private userSubscription!: Subscription;

  constructor(
    public authService: AuthService
  ){}

  ngOnInit() {
    // this.authService.userIsLogged();
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.user = user;
      console.log("user:", user);
    });
  }
  
}
