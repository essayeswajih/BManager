import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFactureVComponent } from './new-facture-v.component';

describe('NewFactureVComponent', () => {
  let component: NewFactureVComponent;
  let fixture: ComponentFixture<NewFactureVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewFactureVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewFactureVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
