import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlaComponent } from './bla.component';

describe('BlaComponent', () => {
  let component: BlaComponent;
  let fixture: ComponentFixture<BlaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
