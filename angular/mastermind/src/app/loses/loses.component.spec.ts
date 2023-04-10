import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LosesComponent } from './loses.component';

describe('LosesComponent', () => {
  let component: LosesComponent;
  let fixture: ComponentFixture<LosesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LosesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
