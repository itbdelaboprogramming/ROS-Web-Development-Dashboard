import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlamComponent } from './slam.component';

describe('SlamComponent', () => {
  let component: SlamComponent;
  let fixture: ComponentFixture<SlamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
