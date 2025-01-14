import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class PageNumberService {
  private currentPageService = new BehaviorSubject<number>(1); // Página inicial
  public currentPage$ = this.currentPageService.asObservable();

  constructor() { };

  getCurrentPage():number{
    return this.currentPageService.value;
  }

  nextPage(number:number):any{
    const nextPage = this.currentPageService.value + 1;
    this.currentPageService.next(number);
  }

  resetPage():void{
    this.currentPageService.next(1);
  }
}
