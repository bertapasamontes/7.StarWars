import { RouterModule, Routes } from '@angular/router';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CardComponent } from './components/card/card.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeAnimationComponent } from './components/home-animation/home-animation.component';
import { AuthGuard } from './_helpers/auth.guard';

export const routes: Routes = [
  { path: 'starship', component: StarshipListComponent, canActivate: [AuthGuard]}, // con el "canActivate: [AuthGuard]" protegemos las paginas que no queremos que los usuarios sin loguear accedan.
  { path: '',   redirectTo: '/starship', pathMatch: 'full'},
  { path: 'starship/:pagina/:id', component: CardComponent, canActivate: [AuthGuard] }, 
  { path: 'home', component: HomeComponent},
  { path: 'home-animation', component: HomeAnimationComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {path: '**', component: PageNotFoundComponent} //404 not found
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
