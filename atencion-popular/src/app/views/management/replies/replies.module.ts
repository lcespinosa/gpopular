import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepliesRoutingModule } from './replies-routing.module';
import { ReplyListComponent } from './reply-list/reply-list.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RepliesRoutingModule,
    SharedModule
  ],
  declarations: [
    ReplyListComponent
  ],
  entryComponents: [
  ]
})
export class RepliesModule { }
