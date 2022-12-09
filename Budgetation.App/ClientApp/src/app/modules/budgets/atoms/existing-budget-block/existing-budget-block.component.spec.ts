import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingBudgetBlockComponent } from './existing-budget-block.component';

describe('ExistingBudgetBlockComponent', () => {
  let component: ExistingBudgetBlockComponent;
  let fixture: ComponentFixture<ExistingBudgetBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingBudgetBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingBudgetBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
