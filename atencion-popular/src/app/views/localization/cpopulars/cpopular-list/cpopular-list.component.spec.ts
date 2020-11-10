import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpopularListComponent } from './cpopular-list.component';

describe('CpopularListComponent', () => {
  let component: CpopularListComponent;
  let fixture: ComponentFixture<CpopularListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpopularListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpopularListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
