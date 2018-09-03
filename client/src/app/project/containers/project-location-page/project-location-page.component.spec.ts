import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLocationPageComponent } from './project-location-page.component';

describe('ProjectLocationPageComponent', () => {
  let component: ProjectLocationPageComponent;
  let fixture: ComponentFixture<ProjectLocationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectLocationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLocationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
