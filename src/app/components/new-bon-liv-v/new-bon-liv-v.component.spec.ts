import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBonLivVComponent } from './new-bon-liv-v.component';

describe('NewBonLivVComponent', () => {
  let component: NewBonLivVComponent;
  let fixture: ComponentFixture<NewBonLivVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewBonLivVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewBonLivVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
