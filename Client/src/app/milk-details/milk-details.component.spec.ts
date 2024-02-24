import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkDetailsComponent } from './milk-details.component';

describe('MilkDetailsComponent', () => {
  let component: MilkDetailsComponent;
  let fixture: ComponentFixture<MilkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilkDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
