import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBonLivComponent } from './new-bon-liv.component';

describe('NewBonLivComponent', () => {
  let component: NewBonLivComponent;
  let fixture: ComponentFixture<NewBonLivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewBonLivComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewBonLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
