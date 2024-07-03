import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteComponent } from './ste.component';

describe('SteComponent', () => {
  let component: SteComponent;
  let fixture: ComponentFixture<SteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
