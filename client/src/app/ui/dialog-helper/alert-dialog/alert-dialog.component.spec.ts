//import { MatDialogRef } from '@angular/material';
//import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import * as TestingModules from 'testing/modules';
//import { AlertDialogComponent } from './alert-dialog.component';
//
//const matDialogRefMock = {
//  close: () => {}
//}
//
//describe('AlertDialogComponent', () => {
//  let component: AlertDialogComponent;
//  let fixture: ComponentFixture<AlertDialogComponent>;
//
//  beforeEach(async(() => {
//    TestBed.configureTestingModule({
//      imports: [
//        TestingModules.NoopAnimationsModule,
//        TestingModules.DocEditorMaterialModule
//      ],
//      declarations: [ 
//        AlertDialogComponent
//      ],
//      providers: [
//        { provide: MatDialogRef, useValue: matDialogRefMock },
//      ]
//    })
//    .compileComponents();
//  }));
//
//  beforeEach(() => {
//    fixture = TestBed.createComponent(AlertDialogComponent);
//    component = fixture.componentInstance;
//    fixture.detectChanges();
//  });
//
//  it('should be created', () => {
//    expect(component).toBeTruthy();
//  });
//});
//