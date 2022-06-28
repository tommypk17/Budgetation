import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingIncomeBlockComponent } from './existing-income-block.component';

describe('ExistingIncomeBlockComponent', () => {
  let component: ExistingIncomeBlockComponent;
  let fixture: ComponentFixture<ExistingIncomeBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingIncomeBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingIncomeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
