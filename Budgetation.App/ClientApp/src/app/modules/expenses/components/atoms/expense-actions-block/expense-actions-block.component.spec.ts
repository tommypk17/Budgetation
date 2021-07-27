import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseActionsBlockComponent } from './expense-actions-block.component';

describe('ExpenseActionsBlockComponent', () => {
  let component: ExpenseActionsBlockComponent;
  let fixture: ComponentFixture<ExpenseActionsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseActionsBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseActionsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
