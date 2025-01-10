import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule, NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  constructor(
    private ruta: ActivatedRoute
  ){}

  nave: any={};

  ngOnInit(){
    const starshipId =  this.ruta.snapshot.paramMap.get('id') as string; //almacenamos el id de la url en la variable starshipId
    console.log("id: ", starshipId);
    this.getDeatails(starshipId);
    // this.getImage(starshipId);
  }

  async getDeatails(id:string):Promise<void>{
    const starshipURLDetail = "https://swapi.py4e.com/api/starships/"+id+"/";
    console.log("getting details")
    try{
      const respuesta = await fetch(starshipURLDetail)
      this.nave = await respuesta.json();
      this.nave.image2 = "https://starwars-visualguide.com/assets/img/starships/"+id+".jpg";
      console.dir("nave:"+this.nave);
    }
    catch(error){
      console.error(error)
    }
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
