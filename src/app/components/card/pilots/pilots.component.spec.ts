import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotsComponent } from './pilots.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('PilotsComponent', () => {
  let component: PilotsComponent;
  let fixture: ComponentFixture<PilotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilotsComponent],
      providers: [provideRouter([]), provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PilotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the id / the last digit in the url', ()=>{
    const id = component.getId('https://swapi.py4e.com/api/people/1/');
    expect(id).toBe('1');
  });
});
