import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { PilotsComponent } from "./pilots/pilots.component";
import { FilmsComponent } from "./films/films.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  imports: [CommonModule, NgIf, PilotsComponent, FilmsComponent, RouterLink, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  pagina:number = 1;
  constructor(
    private servicioApi: ApiService,
    private ruta: ActivatedRoute
  ){}
  private router = inject(Router); 
  

  nave: any={};

  ngOnInit(){
    const starshipId =  this.ruta.snapshot.paramMap.get('id') as string; //almacenamos el id de la url en la variable starshipId
    console.log("id: ", starshipId);
    this.gettingDetails(starshipId);
    // this.getImage(starshipId);

  
    this.ruta.paramMap.subscribe((params) => {
      const pageParam = params.get('page');
      // this.page = pageParam ? +pageParam : 1; // Convierte "page" a número o usa 1 por defecto
      if(pageParam){
        this.pagina = Number(pageParam);
      }
    });
    
  }

  async gettingDetails(id:string):Promise<void>{
    this.servicioApi.getDetails(id).subscribe(
    (respuesta) => {
      this.nave = respuesta;
      // this.nave.image2 = "https://starwars-visualguide.com/assets/img/starships/"+id+".jpg";
      this.nave.image2 = "../assets/img/starships/"+id+".jpg";

      console.dir("nave:"+this.nave);
    },
    (error) => {
      console.error(error)
    });
  }

  atras(){
    const returnUrl = this.ruta.snapshot.queryParams['returnUrl'] || '/'; //al completar el login (user no logueado redireccionado por el guard) lo devuelve a la pantalla donde queria acceder.
      this.router.navigateByUrl(returnUrl);
  }
}
