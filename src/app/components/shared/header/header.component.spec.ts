import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from '../../../services/authService/auth.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authSpia: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    authSpia = jasmine.createSpyObj('AuthService', ['logout'], {
      user$: of(null), // ningún user logueado al principio
    });

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([]), { provide: AuthService, useValue: authSpia }]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show user'a name when its logged", () => {
    const fakeUser: Partial<User> = { displayName: 'Probando User' };
    authSpia.user$ = of(fakeUser as User); //simulando user logueado

    component.ngOnInit();

    fixture.whenStable().then(() => { //esperamos a que user cambie de valor.
    fixture.detectChanges(); //cuando detecta el cambio, actulizamos el DOM

    const userNameElement = fixture.debugElement.query(By.css('.user-name'));
    expect(userNameElement.nativeElement.textContent).toContain('Probando User'); //miramos si la clase user-name contiene el username del user
    });
  });
});
