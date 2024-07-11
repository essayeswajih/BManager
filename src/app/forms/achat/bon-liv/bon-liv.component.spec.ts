import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonLivComponent } from './bon-liv.component';

describe('BonLivComponent', () => {
  let component: BonLivComponent;
  let fixture: ComponentFixture<BonLivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BonLivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
