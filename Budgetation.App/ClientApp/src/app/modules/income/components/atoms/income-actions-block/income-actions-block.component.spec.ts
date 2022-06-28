import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeActionsBlockComponent } from './income-actions-block.component';

describe('IncomeActionsBlockComponent', () => {
  let component: IncomeActionsBlockComponent;
  let fixture: ComponentFixture<IncomeActionsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeActionsBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncomeActionsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
