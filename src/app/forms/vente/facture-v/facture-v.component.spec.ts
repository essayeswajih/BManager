import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureVComponent } from './facture-v.component';

describe('FactureVComponent', () => {
  let component: FactureVComponent;
  let fixture: ComponentFixture<FactureVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactureVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactureVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
