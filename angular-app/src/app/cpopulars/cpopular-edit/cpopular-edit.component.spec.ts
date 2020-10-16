import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpopularEditComponent } from './cpopular-edit.component';

describe('CpopularEditComponent', () => {
  let component: CpopularEditComponent;
  let fixture: ComponentFixture<CpopularEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpopularEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpopularEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
