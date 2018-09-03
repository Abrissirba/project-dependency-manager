import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDependenciesJsonPanelComponent } from './project-dependencies-json-panel.component';

describe('ProjectDependenciesJsonPanelComponent', () => {
  let component: ProjectDependenciesJsonPanelComponent;
  let fixture: ComponentFixture<ProjectDependenciesJsonPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDependenciesJsonPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDependenciesJsonPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
