import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-films',
  imports: [NgIf],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss'
})
export class FilmsComponent {
  
  constructor(
    private servicioApi: ApiService,
    private ruta: ActivatedRoute   
  ){}

  peliculas:any= [];
  peliculasDeNave: []=[];

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
      this.peliculasDeNave = nave.films;

      this.pelisDeNave();
      console.log("peliuclas: ", this.peliculas);
      },
    (error) => {
      console.error("error: ",error)
    });
    
    }

  pelisDeNave(){
    this.peliculasDeNave.forEach((URLpeli)=> {

      const peliId = this.getId(URLpeli);
      this.servicioApi.getInfo(URLpeli).subscribe(
        (peli)=>{
          this.peliculas.push({
            id: peliId,
            // image: "https://starwars-visualguide.com/assets/img/films/"+peliId+".jpg",
            image: "../assets/img/films/"+peliId+".jpg",

            url: URLpeli,
            title: peli.title,
            episode:"Episode "+peli.episode_id
          });
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
