import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpopularAddComponent } from './cpopular-add.component';

describe('CpopularAddComponent', () => {
  let component: CpopularAddComponent;
  let fixture: ComponentFixture<CpopularAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpopularAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpopularAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
