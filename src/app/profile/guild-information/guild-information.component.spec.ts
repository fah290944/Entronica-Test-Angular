import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildInformationComponent } from './guild-information.component';

describe('GuildInformationComponent', () => {
  let component: GuildInformationComponent;
  let fixture: ComponentFixture<GuildInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
