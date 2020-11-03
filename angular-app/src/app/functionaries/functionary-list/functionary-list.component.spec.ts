import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionaryListComponent } from './functionary-list.component';

describe('FunctionaryListComponent', () => {
  let component: FunctionaryListComponent;
  let fixture: ComponentFixture<FunctionaryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionaryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
