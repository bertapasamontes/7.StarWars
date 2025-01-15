import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { provideHttpClient } from '@angular/common/http';
import { MatIconModule } from "@angular/material/icon";

bootstrapApplication(AppComponent)
@NgModule({
    imports: [BrowserModule, AppComponent, StarshipListComponent, MatIconModule],
})

export class AppModule { }