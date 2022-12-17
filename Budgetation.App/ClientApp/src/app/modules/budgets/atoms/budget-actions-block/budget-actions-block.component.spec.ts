import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetActionsBlockComponent } from './budget-actions-block.component';

describe('BudgetActionsBlockComponent', () => {
  let component: BudgetActionsBlockComponent;
  let fixture: ComponentFixture<BudgetActionsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetActionsBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetActionsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
