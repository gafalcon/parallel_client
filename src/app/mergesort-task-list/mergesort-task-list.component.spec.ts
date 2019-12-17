import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergesortTaskListComponent } from './mergesort-task-list.component';

describe('MergesortTaskListComponent', () => {
  let component: MergesortTaskListComponent;
  let fixture: ComponentFixture<MergesortTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergesortTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergesortTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
