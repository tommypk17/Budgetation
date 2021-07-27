import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewTaskListDialogComponent } from './new-task-list-dialog.component';

describe('NewTaskListDialogComponent', () => {
  let component: NewTaskListDialogComponent;
  let fixture: ComponentFixture<NewTaskListDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTaskListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
