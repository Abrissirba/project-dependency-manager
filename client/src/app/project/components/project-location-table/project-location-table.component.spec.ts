import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLocationTableComponent } from './project-location-table.component';

describe('ProjectLocationTableComponent', () => {
  let component: ProjectLocationTableComponent;
  let fixture: ComponentFixture<ProjectLocationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectLocationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLocationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
