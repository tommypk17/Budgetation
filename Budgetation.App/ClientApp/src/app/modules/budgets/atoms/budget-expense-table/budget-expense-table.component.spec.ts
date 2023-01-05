import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetExpenseTableComponent } from './budget-expense-table.component';

describe('BudgetExpenseTableComponent', () => {
  let component: BudgetExpenseTableComponent;
  let fixture: ComponentFixture<BudgetExpenseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetExpenseTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetExpenseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
