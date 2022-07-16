import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidExpenseDialogComponent } from './paid-expense-dialog.component';

describe('PaidExpenseDialogComponent', () => {
  let component: PaidExpenseDialogComponent;
  let fixture: ComponentFixture<PaidExpenseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidExpenseDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidExpenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
