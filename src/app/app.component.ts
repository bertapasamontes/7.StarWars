import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { ApiService } from './services/api.service';
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";


@Component({
  selector: 'app-root',
  imports: [NavComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[ApiService]
})
export class AppComponent {
  title = '7.StarWars';

  private iconos = inject(MatIconRegistry);

  pagina: number = 1;

  constructor(private ruta: ActivatedRoute){}

  ngOnInit(){
    this.ruta.paramMap.subscribe((params) => {
      const paginaParam = params.get('pagina');
      this.pagina = paginaParam ? +paginaParam : 1; // Convierte "pagina" a número o usa 1 por defecto
      console.log('Pagina de la api actual:', this.pagina);
    });
  }
}
