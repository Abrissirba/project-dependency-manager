import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ProjectModule } from './project/project.module';
import { ServerApiModule } from './server-api/server-api.module';
import { MaterialModule } from './ui';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ProjectModule,
    CoreModule,
    RouterModule.forRoot([]),
    MaterialModule,
    NgxsModule.forRoot(),
    ServerApiModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
