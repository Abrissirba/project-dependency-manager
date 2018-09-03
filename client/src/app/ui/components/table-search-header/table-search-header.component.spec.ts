import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSearchHeaderComponent } from './table-search-header.component';

describe('TableSearchHeaderComponent', () => {
  let component: TableSearchHeaderComponent;
  let fixture: ComponentFixture<TableSearchHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSearchHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSearchHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
