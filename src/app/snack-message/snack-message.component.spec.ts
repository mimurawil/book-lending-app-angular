import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackMessageComponent } from './snack-message.component';

describe('SnackMessageComponent', () => {
  let component: SnackMessageComponent;
  let fixture: ComponentFixture<SnackMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
