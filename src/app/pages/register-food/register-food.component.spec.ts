import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFoodComponent } from './register-food.component';

describe('RegisterFoodComponent', () => {
  let component: RegisterFoodComponent;
  let fixture: ComponentFixture<RegisterFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
