import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncomeBlockComponent } from './edit-income-block.component';

describe('EditIncomeBlockComponent', () => {
  let component: EditIncomeBlockComponent;
  let fixture: ComponentFixture<EditIncomeBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditIncomeBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditIncomeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
