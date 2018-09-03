import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyPageComponent } from './dependency-page.component';

describe('DependencyPageComponent', () => {
  let component: DependencyPageComponent;
  let fixture: ComponentFixture<DependencyPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencyPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
