import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../ui';
import { UiModule } from '../ui/ui.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { MainFrameComponent } from './containers/main-frame/main-frame.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    UiModule,
    RouterModule.forChild([{
      path: '', component: HomePageComponent
    }]),
  ],
  declarations: [
    NavbarComponent,
    HomePageComponent,
    MainFrameComponent,
    SidenavComponent
  ],
  exports: [
    NavbarComponent,
    MainFrameComponent
  ]
})
export class CoreModule { }
