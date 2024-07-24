import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HestoriqueArticleComponent } from './hestorique-article.component';

describe('HestoriqueArticleComponent', () => {
  let component: HestoriqueArticleComponent;
  let fixture: ComponentFixture<HestoriqueArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HestoriqueArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HestoriqueArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
