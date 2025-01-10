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
  

  crearCarta(starshipName:string, starshipModel:string, starshipURL:string):void {  
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

    //url
    const starshipId = starshipURL.split("/").slice(-2, -1)[0]; //sacamos el id de la url de la api 

    nuevaCarta.addEventListener("click", () => { //al hacer click en la nave, se cambia la url a la del componente carta
      window.location.href = `/starship/${starshipId}`;
    });

  }


  async llamandoApi(){
    const starshipListApi = "https://swapi.py4e.com/api/starships";
    try{
        await fetch(starshipListApi,{
        headers:{"Accept": "application/json"}
      })
      .then(res=> res.json())
      .then(respuesta => {
        respuesta.results.forEach((starship: { name: string; model: string; url:string; }) => {
          this.crearCarta(starship.name, starship.model, starship.url);
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
