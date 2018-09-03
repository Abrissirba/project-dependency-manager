import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDependencyTableComponent } from './project-dependency-table.component';

describe('ProjectDependencyTableComponent', () => {
  let component: ProjectDependencyTableComponent;
  let fixture: ComponentFixture<ProjectDependencyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDependencyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDependencyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
