import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonLivVComponent } from './bon-liv-v.component';

describe('BonLivVComponent', () => {
  let component: BonLivVComponent;
  let fixture: ComponentFixture<BonLivVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BonLivVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonLivVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
