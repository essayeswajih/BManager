import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFactureAComponent } from './new-facture-a.component';

describe('NewFactureAComponent', () => {
  let component: NewFactureAComponent;
  let fixture: ComponentFixture<NewFactureAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewFactureAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewFactureAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
