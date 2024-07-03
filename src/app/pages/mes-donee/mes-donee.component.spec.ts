import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDoneeComponent } from './mes-donee.component';

describe('MesDoneeComponent', () => {
  let component: MesDoneeComponent;
  let fixture: ComponentFixture<MesDoneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesDoneeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesDoneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
