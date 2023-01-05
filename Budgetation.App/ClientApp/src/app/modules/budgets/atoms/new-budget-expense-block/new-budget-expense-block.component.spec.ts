import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBudgetExpenseBlockComponent } from './new-budget-expense-block.component';

describe('NewBudgetExpenseBlockComponent', () => {
  let component: NewBudgetExpenseBlockComponent;
  let fixture: ComponentFixture<NewBudgetExpenseBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBudgetExpenseBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBudgetExpenseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
