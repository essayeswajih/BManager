import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonLivADetailsComponent } from './bon-liv-a-details.component';

describe('BonLivADetailsComponent', () => {
  let component: BonLivADetailsComponent;
  let fixture: ComponentFixture<BonLivADetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BonLivADetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonLivADetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
