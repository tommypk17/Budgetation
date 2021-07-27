import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingExpenseBlockComponent } from './existing-expense-block.component';

describe('ExistingExpenseBlockComponent', () => {
  let component: ExistingExpenseBlockComponent;
  let fixture: ComponentFixture<ExistingExpenseBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingExpenseBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingExpenseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
