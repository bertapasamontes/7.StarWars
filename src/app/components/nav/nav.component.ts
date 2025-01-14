import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { PageNumberService } from '../../services/page-number.service';

@Component({
  selector: 'app-nav',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  pageNumber: number;
  pagina:number = 1;
  
  constructor(
    private pageNumberService :PageNumberService,
    private ruta: ActivatedRoute
  ){
    this.pageNumber = this.pageNumberService.getCurrentPage(); 
  }
  ngOnInit(){
    this.ruta.paramMap.subscribe((params) => {
      const pageParam = params.get('page');
      // this.page = pageParam ? +pageParam : 1; // Convierte "page" a número o usa 1 por defecto
      if(pageParam){
        this.pagina = Number(pageParam);
      }
      console.log('Current Page:', this.pagina);
    });
  }

  
}
