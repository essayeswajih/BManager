import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureVDetailsComponent } from './facture-v-details.component';

describe('FactureVDetailsComponent', () => {
  let component: FactureVDetailsComponent;
  let fixture: ComponentFixture<FactureVDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FactureVDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FactureVDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
