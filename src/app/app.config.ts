import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({ projectId: "starwars-itacademy2025v02", appId: "1:605373812980:web:bc0e9102b0c28d42980ea1", databaseURL: "https://starwars-itacademy2025v02-default-rtdb.europe-west1.firebasedatabase.app", storageBucket: "starwars-itacademy2025v02.firebasestorage.app", apiKey: "AIzaSyDfJAuB6UePl-BSEQHuM0N7VuPySOoszp0", authDomain: "starwars-itacademy2025v02.firebaseapp.com", messagingSenderId: "605373812980", measurementId: "G-E3LZP6MVM8" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()),
  ]
};
