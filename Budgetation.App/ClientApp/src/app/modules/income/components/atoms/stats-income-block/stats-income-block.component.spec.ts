import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsIncomeBlockComponent } from './stats-income-block.component';

describe('StatsIncomeBlockComponent', () => {
  let component: StatsIncomeBlockComponent;
  let fixture: ComponentFixture<StatsIncomeBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsIncomeBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsIncomeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
