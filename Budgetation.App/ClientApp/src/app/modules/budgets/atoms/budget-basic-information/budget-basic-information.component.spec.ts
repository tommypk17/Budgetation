import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetBasicInformationComponent } from './budget-basic-information.component';

describe('BudgetBasicInformationComponent', () => {
  let component: BudgetBasicInformationComponent;
  let fixture: ComponentFixture<BudgetBasicInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetBasicInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
