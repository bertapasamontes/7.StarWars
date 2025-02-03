import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { PilotsComponent } from "./pilots/pilots.component";

@Component({
  selector: 'app-card',
  imports: [CommonModule, NgIf, PilotsComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  pagina:number = 1;
  constructor(
    private servicioApi: ApiService,
    private ruta: ActivatedRoute
  ){}

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
      // console.log('Current Page:', this.pagina);
    });
    
  }

  async gettingDetails(id:string):Promise<void>{
    this.servicioApi.getDetails(id).subscribe(
    (respuesta) => {
      this.nave = respuesta;
      this.nave.image2 = "https://starwars-visualguide.com/assets/img/starships/"+id+".jpg";
      console.dir("nave:"+this.nave);
    },
    (error) => {
      console.error(error)
    });
  }

  // async getImage(id:string){
  //   const starshipImageUrl = "https://starwars-visualguide.com/assets/img/starships/"+id+".jpg";
  //   // const starshipImageUrl = "https://swapi.dev/assets/img/starships/"+id+".jpg";
  //   try{
  //     const imageNave = await fetch(starshipImageUrl);
  //     this.nave.image = imageNave.url;
  //     console.log("nave con imagen:",this.nave.image)
  //   }
  //   catch(error){
  //     console.error(error);
  //     console.log("error: ", error)
  //   }
  // }
}
