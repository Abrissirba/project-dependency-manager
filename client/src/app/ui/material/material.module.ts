import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    LayoutModule,
    MatDialogModule,
    MatTooltipModule,
    MatListModule,
    OverlayModule,
    PortalModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    LayoutModule,
    MatDialogModule,
    MatTooltipModule,
    MatListModule,
    OverlayModule,
    PortalModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class MaterialModule { }
