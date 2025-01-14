import { RouterModule, Routes } from '@angular/router';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CardComponent } from './components/card/card.component';

export const routes: Routes = [
  { path: 'starship', component: StarshipListComponent },
  { path: '',   redirectTo: '/starship', pathMatch: 'full' },
  { path: 'starship/:pagina/:id', component: CardComponent }, 
  { path: 'home', component: HomeComponent },
  // { path: '', redirectTo: '/starship/:pagina', pathMatch: 'full' }, //hacer que la pagina predeterminada sea starship
  {path: '**', component: PageNotFoundComponent} //404 not found
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
