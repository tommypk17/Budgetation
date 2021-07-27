import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseBlockComponent } from './expense-block.component';

describe('ExpenseBlockComponent', () => {
  let component: ExpenseBlockComponent;
  let fixture: ComponentFixture<ExpenseBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
