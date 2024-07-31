import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FedbackComponent } from './fedback.component';

describe('FedbackComponent', () => {
  let component: FedbackComponent;
  let fixture: ComponentFixture<FedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FedbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
