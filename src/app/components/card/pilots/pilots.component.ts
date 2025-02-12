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
      console.log("nave:",nave.url);
      this.pilotosDeNave = nave.pilots;

      this.pilotosDeLaNave();

      },
    (error) => {
      console.error("error: ",error)
    });
   
   }

  pilotosDeLaNave(){
    this.pilotosDeNave.forEach((urlPiloto: string) => {



      this.servicioApi.getInfo(urlPiloto).subscribe(
        (pilot)=>{
          
          const pilotId = this.getId(pilot.url);
          const especiePiloto = "Especie desconocida";

          if(pilot.species.length > 0){
            //planeta origen:
            this.servicioApi.getInfo(pilot.species[0]).subscribe((especie)=> {
              const especiePiloto =  especie.name;
              this.addPilot(pilotId, pilot, especiePiloto);
            })
          }
          else{
            this.addPilot(pilotId, pilot, especiePiloto);
          }
          
          
        }
      );
    });
    console.log("pilotos de la nave: ", this.pilotos);

  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  getId(url: string): string {
    return url.split('/').filter(Boolean).pop() || '';
  }

  addPilot(pilotId:string, pilot: any, especiePiloto: string){
    this.pilotos.push({
      id: pilotId,
      name: pilot.name,
      films: pilot.films,
      url: pilot.url,
      // image: "https://starwars-visualguide.com/assets/img/characters/"+pilotId+".jpg",
      image: "https://raw.githubusercontent.com/vieraboschkova/swapi-gallery/refs/heads/main/static/assets/img/people/"+pilotId+".jpg",

      especie: especiePiloto
    })
  }
}
