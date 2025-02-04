import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http: HttpClient) { }

  // nuevo de tutorial -----
  private starshipURL = "https://swapi.py4e.com/api/starships/?page=1";
  private httpClient = inject(HttpClient);
  // ------------------

  getStarships(page:number): Observable <any>{
    const starshipListApi = "https://swapi.py4e.com/api/starships/?page="+page;
    return this.http.get(starshipListApi);
  }

  getDetails(id:string): Observable <any>{
    const  starshipURLDetail = "https://swapi.py4e.com/api/starships/"+id+"/";
    return this.http.get(starshipURLDetail);
  }

  // nuevo de tutorial -----
  getCharacters(apiURL:string = `${this.starshipURL}`):Observable <any>{
    return this.httpClient.get(apiURL).pipe(share());
  }
  // ------------------

  getInfo(url:string): Observable <any>{
    return this.http.get(url);
  }

}
