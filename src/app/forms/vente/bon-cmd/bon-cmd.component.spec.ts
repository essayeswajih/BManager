import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonCmdComponent } from './bon-cmd.component';

describe('BonCmdComponent', () => {
  let component: BonCmdComponent;
  let fixture: ComponentFixture<BonCmdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BonCmdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonCmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
