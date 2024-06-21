import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalInformationComponent } from './educational-information.component';

describe('EducationalInformationComponent', () => {
  let component: EducationalInformationComponent;
  let fixture: ComponentFixture<EducationalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationalInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
