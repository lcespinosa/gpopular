import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpopularDetailComponent } from './cpopular-detail.component';

describe('CpopularDetailComponent', () => {
  let component: CpopularDetailComponent;
  let fixture: ComponentFixture<CpopularDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpopularDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpopularDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
