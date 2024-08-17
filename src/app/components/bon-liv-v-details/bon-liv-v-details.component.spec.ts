import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonLivVDetailsComponent } from './bon-liv-v-details.component';

describe('BonLivVDetailsComponent', () => {
  let component: BonLivVDetailsComponent;
  let fixture: ComponentFixture<BonLivVDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BonLivVDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonLivVDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
