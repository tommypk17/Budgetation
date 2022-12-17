import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBudgetBlockComponent } from './new-budget-block.component';

describe('NewBudgetBlockComponent', () => {
  let component: NewBudgetBlockComponent;
  let fixture: ComponentFixture<NewBudgetBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBudgetBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBudgetBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
