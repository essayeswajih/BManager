import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonDeRetourComponent } from './bon-de-retour.component';

describe('BonDeRetourComponent', () => {
  let component: BonDeRetourComponent;
  let fixture: ComponentFixture<BonDeRetourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BonDeRetourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonDeRetourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
