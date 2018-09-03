import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDependencyPageComponent } from './project-dependency-page.component';

describe('ProjectDependencyPageComponent', () => {
  let component: ProjectDependencyPageComponent;
  let fixture: ComponentFixture<ProjectDependencyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDependencyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDependencyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
