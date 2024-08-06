import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlvComponent } from './blv.component';

describe('BlvComponent', () => {
  let component: BlvComponent;
  let fixture: ComponentFixture<BlvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
