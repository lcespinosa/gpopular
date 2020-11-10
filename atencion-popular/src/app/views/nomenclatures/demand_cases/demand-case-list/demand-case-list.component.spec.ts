import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandCaseListComponent } from './demand-case-list.component';

describe('DemandCaseListComponent', () => {
  let component: DemandCaseListComponent;
  let fixture: ComponentFixture<DemandCaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandCaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
