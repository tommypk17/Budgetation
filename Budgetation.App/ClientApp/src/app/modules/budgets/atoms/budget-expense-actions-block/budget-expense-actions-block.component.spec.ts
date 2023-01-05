import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetExpenseActionsBlockComponent } from './budget-expense-actions-block.component';

describe('BudgetExpenseActionsBlockComponent', () => {
  let component: BudgetExpenseActionsBlockComponent;
  let fixture: ComponentFixture<BudgetExpenseActionsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetExpenseActionsBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetExpenseActionsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
