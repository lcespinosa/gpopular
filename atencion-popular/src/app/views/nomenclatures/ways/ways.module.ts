import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaysRoutingModule } from './ways-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { WayListComponent } from './way-list/way-list.component';

@NgModule({
  imports: [
    CommonModule,
    WaysRoutingModule,
    SharedModule
  ],
  declarations: [
    WayListComponent,
  ],
  entryComponents: [
  ]
})
export class WaysModule { }
