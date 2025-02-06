import { TestBed } from '@angular/core/testing';

import { ApiService } from '../services/api.service';
import { provideHttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it("should get pilot name", ()=>{
    const nombrePiloto = "Luke Skywalker";
    service.getInfo('https://swapi.py4e.com/api/people/1/').subscribe((perfil)=> {
      expect(perfil.name).toBe(nombrePiloto);
    })
  })
});
