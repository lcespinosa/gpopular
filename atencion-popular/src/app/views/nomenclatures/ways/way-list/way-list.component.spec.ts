import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WayListComponent } from './way-list.component';

describe('WayListComponent', () => {
  let component: WayListComponent;
  let fixture: ComponentFixture<WayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
