import { Component, Input, input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { KeyValuePipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pilots',
  imports: [NgIf],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss'
})
export class PilotsComponent {

  constructor(
        private servicioApi: ApiService,
            private ruta: ActivatedRoute
        
  ){}

  pilotos:any= [];

  // pilotosDeNave:any= {};
  pilotosDeNave: []=[];

  ngOnInit(){
    const starshipId =  this.ruta.snapshot.paramMap.get('id') as string; //almacenamos el id de la url en la variable starshipId
    this.gettingPilots(starshipId);
    console.log("URL llamada:", starshipId);
  }

  async gettingPilots(id:string):Promise<void>{
    this.servicioApi.getDetails(id).subscribe(
    (nave) => {
      console.log("dentro de pilots getting pilots");
      console.log("nave:",nave.url);

      // console.log("pilotos de la nave antes de getPeople: ", nave.pilots);
      this.pilotosDeNave = nave.pilots;

      this.pilotosDeLaNave();

      },
    
      // this.servicioApi.getPeople().subscribe(
      //   (people)=>{
      //     console.log("people: ", people.results);
      //     for (let piloto of people.results){  //miramos cada uno de los pilotos
      //       console.log("piloto starship: ", piloto.starships);
      //       console.log("nave url: ", nave.url);



      //       if (nave.url in piloto.starships){ 
      //         nave.pilots.append(piloto.name);
      //         // console.log("piloto: ", nave);
      //         console.log("pilotoaDeNave: ", this.pilotosDeNave);
      //         // console.log("piloto añadido a nave.pilots")
      //       }
      //       else console.log("no encuentro la nave");
      //     }
      //     // console.log("pilotos que manejan la nave:",nave.pilots);
      //     this.pilotosDeNave = nave.pilots;

      //     this.pilotosDeLaNave();

      //   },
      //   (error)=>{
      //     console.log("error: ", error);
      //   }
      // );
    // },
    (error) => {
      console.error("error: ",error)
    });
   
   }

  pilotosDeLaNave(){
    // console.log("pilotos de la nave: ", this.pilotosDeNave);
    this.pilotosDeNave.forEach((urlPiloto: string) => {
      this.servicioApi.getPeople(urlPiloto).subscribe(
        // (pilot)=>{
        //   this.pilotos = {
        //     name: pilot.name,
        //     films: pilot.films
        //   }
        // }

        (pilot)=>{
          const pilotId = this.getId(pilot.url);
          this.pilotos.push({
            id: pilotId,
            name: pilot.name,
            films: pilot.films,
            url: pilot.url,
            image: "https://starwars-visualguide.com/assets/img/characters/"+pilotId+".jpg",
          })
        }
      );
    });
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  getId(url: string): string {
    return url.split('/').filter(Boolean).pop() || '';
  }
}
