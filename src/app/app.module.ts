import { NgModule } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { MatIconModule } from "@angular/material/icon";


import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
// import { environment } from '../environments/environment';

import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';

bootstrapApplication(AppComponent)
@NgModule({
    imports: [BrowserModule, AppComponent, StarshipListComponent, MatIconModule,
    ],
    providers: [
        // provideFirebaseApp(() => initializeApp(environment.firebase)),
        // provideFirestore(() => getFirestore()),
    ]
})

export class AppModule { }