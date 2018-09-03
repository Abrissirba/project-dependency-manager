//import { MatDialogRef } from '@angular/material';
//import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import * as TestingModules from 'testing/modules';
//import { ConfirmDialogComponent } from './confirm-dialog.component';
//
//const matDialogRefMock = {
//  close: () => {}
//}
//
//describe('ConfirmDialogComponent', () => {
//  let component: ConfirmDialogComponent;
//  let fixture: ComponentFixture<ConfirmDialogComponent>;
//
//  beforeEach(async(() => {
//    TestBed.configureTestingModule({
//      imports: [
//        TestingModules.NoopAnimationsModule,
//        TestingModules.DocEditorMaterialModule
//      ],
//      declarations: [ 
//        ConfirmDialogComponent
//      ],
//      providers: [
//        { provide: MatDialogRef, useValue: matDialogRefMock },
//      ]
//    })
//    .compileComponents();
//  }));
//
//  beforeEach(() => {
//    fixture = TestBed.createComponent(ConfirmDialogComponent);
//    component = fixture.componentInstance;
//    fixture.detectChanges();
//  });
//
//  it('should be created', () => {
//    expect(component).toBeTruthy();
//  });
//});
//