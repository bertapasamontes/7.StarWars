import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsComponent } from './films.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;
  let apiSpia : jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiSpia = jasmine.createSpyObj('ApiService', ['getInfo']);

    const peliFicticia = {
      id: '1',
      image: 'assets/img/films/1.jpg',
      title: 'A New Hope',
      episode: 'Episode 4'
    };

    apiSpia.getInfo.and.returnValue(of(peliFicticia));

    await TestBed.configureTestingModule({
      imports: [FilmsComponent],
      providers: [provideRouter([]), provideHttpClient(), { provide: ApiService, useValue: apiSpia }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;

    component.peliculas = [peliFicticia]; // simulamos q cargamos una peli
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the film title', ()=>{
    const titulo = fixture.debugElement.query(By.css('.film-nombre')); //en el dom, la clase film-nombre debe contener
    expect(titulo.nativeElement.textContent).toContain('A New Hope') // el titulo
  })
});
