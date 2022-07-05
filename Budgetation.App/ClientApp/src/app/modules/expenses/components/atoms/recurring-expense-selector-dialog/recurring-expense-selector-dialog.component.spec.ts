import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringExpenseSelectorDialogComponent } from './recurring-expense-selector-dialog.component';

describe('RecurringExpenseSelectorDialogComponent', () => {
  let component: RecurringExpenseSelectorDialogComponent;
  let fixture: ComponentFixture<RecurringExpenseSelectorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringExpenseSelectorDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringExpenseSelectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
