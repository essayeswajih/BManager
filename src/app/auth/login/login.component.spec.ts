import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginComponent } from './login.component';
import { SteService } from '../../apiServices/ste/ste.service';
import { AuthService } from '../../apiServices/auth/auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let toastrService: ToastrService;
  let steService: jasmine.SpyObj<SteService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const steSpy = jasmine.createSpyObj('SteService', ['login']);
    const authSpy = jasmine.createSpyObj('AuthService', ['setToken']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: SteService, useValue: steSpy },
        { provide: AuthService, useValue: authSpy },
        ToastrService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    steService = TestBed.inject(SteService) as jasmine.SpyObj<SteService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    steService.login.and.returnValue(Promise.resolve({ message: 'User login was successful', access_token: 'fake-token' }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call success method of ToastrService on successful login', async () => {
    const toastrSpy = spyOn(toastrService, 'success').and.callThrough();
    component.form.setValue({ username: 'test', password: 'test' });
    await component.save();
    expect(toastrSpy).toHaveBeenCalledWith('Login Successful', 'Success!');
    expect(authService.setToken).toHaveBeenCalledWith('fake-token');
  });
});
