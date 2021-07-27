import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderBlockComponent } from './header-block.component';

describe('HeaderBlockComponent', () => {
  let component: HeaderBlockComponent;
  let fixture: ComponentFixture<HeaderBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
