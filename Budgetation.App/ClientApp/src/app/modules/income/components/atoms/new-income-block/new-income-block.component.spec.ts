import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIncomeBlockComponent } from './new-income-block.component';

describe('NewIncomeBlockComponent', () => {
  let component: NewIncomeBlockComponent;
  let fixture: ComponentFixture<NewIncomeBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewIncomeBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewIncomeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
