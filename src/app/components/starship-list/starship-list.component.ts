import { Component } from '@angular/core';

@Component({
  selector: 'app-starship-list',
  imports: [],
  templateUrl: './starship-list.component.html',
  styleUrl: './starship-list.component.scss'
})
export class StarshipListComponent {
  ngOnInit():void{
    this.llamandoApi(); //cargamos lista al llegar a la pagina
  }
  

  crearCarta(starshipName:string, starshipModel:string):void {
    //variable de la web
    const divStarshipList = document.querySelector("#placeholder-starship-list") as HTMLDivElement;

    //varaibles para la web
    const newRow = document.createElement("div");
    newRow.setAttribute("class","row");
    newRow.classList.add("row");

    const nuevaCarta = document.createElement("div");
    nuevaCarta.classList.add('carta');

    const nombre = document.createElement("p");
    // nombre.setAttribute("class","nombre-starship");
    nombre.classList.add('nombre-starship');

    nombre.textContent = starshipName;

    const modelo = document.createElement("p");
    modelo.textContent = starshipModel;

    nuevaCarta.appendChild(nombre);
    nuevaCarta.appendChild(modelo);
    newRow.appendChild(nuevaCarta);
    divStarshipList.appendChild(newRow);
  }


  async llamandoApi(){
    const starshipListApi = "https://swapi.py4e.com/api/starships";
    try{
        await fetch(starshipListApi,{
        headers:{"Accept": "application/json"}
      })
      .then(res=> res.json())
      .then(respuesta => {
        respuesta.results.forEach((starship: { name: string; model: string; }) => {
          this.crearCarta(starship.name, starship.model);
          console.log("api inicializada")
          console.log("starship name: ",starship.name);
          console.log("starship model: ",starship.model);
        });
        
      });
    }
    catch(error){
      console.error(error)
    }
    
  }
}
