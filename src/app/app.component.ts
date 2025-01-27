import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { ApiService } from './services/api.service';
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { HeaderComponent } from "./components/shared/header/header.component";
import { FooterComponent } from "./components/shared/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [NavComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[ApiService]
})
export class AppComponent {
  title = '7.StarWars';
  pagina: number = 1;

  constructor(
    private ruta: ActivatedRoute,
  ){}

  ngOnInit(){
    this.ruta.paramMap.subscribe((params) => {
      const paginaParam = params.get('pagina');
      this.pagina = paginaParam ? +paginaParam : 1; // Convierte "pagina" a número o usa 1 por defecto
      console.log('Pagina de la api actual:', this.pagina);
    });
  }
}
