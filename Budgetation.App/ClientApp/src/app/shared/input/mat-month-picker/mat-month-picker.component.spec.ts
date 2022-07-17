import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatMonthPickerComponent } from './mat-month-picker.component';

describe('MatMonthPickerComponent', () => {
  let component: MatMonthPickerComponent;
  let fixture: ComponentFixture<MatMonthPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatMonthPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatMonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
