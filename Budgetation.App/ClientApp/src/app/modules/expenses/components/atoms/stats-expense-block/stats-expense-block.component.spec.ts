import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsExpenseBlockComponent } from './stats-expense-block.component';

describe('StatsExpenseBlockComponent', () => {
  let component: StatsExpenseBlockComponent;
  let fixture: ComponentFixture<StatsExpenseBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsExpenseBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsExpenseBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
