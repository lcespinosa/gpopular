import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreetsRoutingModule } from './streets-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { StreetListComponent } from './street-list/street-list.component';

@NgModule({
  imports: [
    CommonModule,
    StreetsRoutingModule,
    SharedModule,
  ],
  declarations: [
    StreetListComponent,
  ],
  entryComponents: [
  ]
})
export class StreetsModule { }
