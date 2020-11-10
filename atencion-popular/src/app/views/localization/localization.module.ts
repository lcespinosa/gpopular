import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LocalizationRoutingModule } from './localization-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LocalizationRoutingModule,
    SharedModule,
  ],
  declarations: [],
  entryComponents: [
  ]
})
export class LocalizationModule { }
