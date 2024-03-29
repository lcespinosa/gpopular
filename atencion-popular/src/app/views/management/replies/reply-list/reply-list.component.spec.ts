import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyListComponent } from './reply-list.component';

describe('DemandListComponent', () => {
  let component: ReplyListComponent;
  let fixture: ComponentFixture<ReplyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
