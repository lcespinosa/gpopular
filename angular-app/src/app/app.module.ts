import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AppRoutingModule } from './app-routing.module';
import { LoggerModule } from 'ngx-logger';
import { NgSelect2Module } from 'ng-select2';
import { MatPaginatorIntl } from '@angular/material';
import { getEsPaginatorIntl } from './core/locale/es-paginator-intl';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    CustomMaterialModule.forRoot(),
    AppRoutingModule,
    LoggerModule.forRoot({
      serverLoggingUrl: `http://my-api/logs`,
      level: environment.logLevel,
      serverLogLevel: environment.serverLogLevel
    }),
    NgSelect2Module,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: MatPaginatorIntl, useValue: getEsPaginatorIntl() }
  ]
})
export class AppModule { }
