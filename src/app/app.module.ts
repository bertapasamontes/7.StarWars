import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent)
@NgModule({
    imports: [BrowserModule, AppComponent, StarshipListComponent],
})

export class AppModule { }