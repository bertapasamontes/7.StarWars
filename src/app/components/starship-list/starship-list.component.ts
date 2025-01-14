import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PageNumberService } from '../../services/page-number.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-starship-list',
  imports: [],
  templateUrl: './starship-list.component.html',
  styleUrl: './starship-list.component.scss',
})
export class StarshipListComponent implements OnInit{
  page: number = 1;

  constructor(
    private servicioApi: ApiService,
    private ruta: ActivatedRoute
  ){}

  private apiService = inject(ApiService);
  listaStarhips: Array<any> = [];
  nextUrl:string = "";


  ngOnInit():void{
  //  this.llamandoApi(); //cargamos lista al llegar a la pagina


   this.ruta.paramMap.subscribe((params) => {
    const pageParam = params.get('page');
    this.page = pageParam ? +pageParam : 1; // Convierte "page" a número o usa 1 por defecto
    console.log('Pagina de la api actual:', this.page);
    
  });


  // codigo nuevo del tutorial:
  this.apiService.getCharacters().subscribe({
    next:(respuesta)=> {
      this.listaStarhips = respuesta.results;
      this.nextUrl = respuesta.next;
      console.log("naves iniciales:",this.listaStarhips)
      let resultados = Array.from(respuesta.results); //los resutlados que obtenemos los transformamos en un array.
      resultados.forEach((nave:any)=>{ //los recorremos
        if(!this.listaStarhips.some((existing: any) => existing.id === nave.id)){
          this.listaStarhips = [... this.listaStarhips, nave]
        }
        // this.listaStarhips = [... this.listaStarhips, nave] //añadimos cada nave a la lista de naves
        
      })
      console.log("list lengh antes de imprimir:", this.listaStarhips.length)
      // console.log("estoy aqui")
      this.printCard();
    }
  })
  }


  @HostListener('window:scroll', ['$event'])//no separar de OnScroll()
  OnScroll(){
    console.log("scrolleando");
    console.log(this.nextUrl);
    this.apiService.getCharacters(this.nextUrl).subscribe({
      next:(respuesta)=>{
        if(respuesta.next && respuesta.next !== null){ // si existe una nextUrl Y no es null:
          this.nextUrl = respuesta.next; // se actualiza la siguiente url
          Array.from(respuesta.results).forEach((nave:any)=>{ //los recorremos
            if(this.listaStarhips.includes(nave.id) == false){
              this.listaStarhips = [... this.listaStarhips, nave]
            }
             //añadimos cada nave a la lista de naves
          })
        }
        if(respuesta.next === null){
          console.log("es null: ", respuesta.next)
        }
      }
    })
    console.log(this.listaStarhips);
    this.printCard()
  }  

  printCard(){
    console.log("print card")
    console.log("list length: ", this.listaStarhips.length);
    console.log("list al imprimir: ", this.listaStarhips)
    this.listaStarhips.forEach((nave)=>{
        this.crearCarta(nave.name, nave.model, nave.url)
      })
    
    console.log("impreso")
  }
  

  crearCarta(starshipName:string, starshipModel:string, starshipURL:string):void {  
   //variable de la web
    const divStarshipList = document.querySelector("#placeholder-starship-list") as HTMLDivElement;


    //url
    const starshipId = starshipURL.split("/").slice(-2, -1)[0]; //sacamos el id de la url de la api 
    if (document.querySelector(`#starship-${starshipId}`)) { //miramos si existe ese item en el DOM
      return; // Si ya existe, no hacemos nada
    }

    //varaibles para la web
    const newRow = document.createElement("div");
    newRow.setAttribute("class","row");
    newRow.classList.add("row");

    const nuevaCarta = document.createElement("div");
    nuevaCarta.classList.add('carta','my-2');
    nuevaCarta.id = `starship-${starshipId}`;

    const nombre = document.createElement("p");
    nombre.classList.add('nombre-starship');

    nombre.textContent = starshipName;

    const modelo = document.createElement("p");
    modelo.textContent = starshipModel;

    nuevaCarta.appendChild(nombre);
    nuevaCarta.appendChild(modelo);
    newRow.appendChild(nuevaCarta);
    divStarshipList.appendChild(newRow);

    
    // url hacia la carta de cada nave
    nuevaCarta.addEventListener("click", () => { //al hacer click en la nave, se cambia la url a la del componente carta
      window.location.href = `/starship/${this.page}/${starshipId}`;
    });

  }
}
