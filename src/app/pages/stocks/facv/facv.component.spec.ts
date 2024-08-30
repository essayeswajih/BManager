import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacvComponent } from './facv.component';

describe('FacvComponent', () => {
  let component: FacvComponent;
  let fixture: ComponentFixture<FacvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
