import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Reason_typeListComponent } from './way-list.component';

describe('WayListComponent', () => {
  let component: Reason_typeListComponent;
  let fixture: ComponentFixture<Reason_typeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Reason_typeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Reason_typeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
