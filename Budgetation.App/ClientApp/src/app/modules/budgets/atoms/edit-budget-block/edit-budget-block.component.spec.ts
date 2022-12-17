import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBudgetBlockComponent } from './edit-budget-block.component';

describe('EditBudgetBlockComponent', () => {
  let component: EditBudgetBlockComponent;
  let fixture: ComponentFixture<EditBudgetBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBudgetBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBudgetBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
