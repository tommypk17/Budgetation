import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpenseBlockComponent } from './edit-expense-block.component';

describe('EditExpenseBlockComponent', () => {
  let component: EditExpenseBlockComponent;
  let fixture: ComponentFixture<EditExpenseBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExpenseBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExpenseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
