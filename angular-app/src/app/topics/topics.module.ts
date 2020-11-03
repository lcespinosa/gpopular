import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsRoutingModule } from './topics-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TopicListComponent } from './topic-list/topic-list.component';

@NgModule({
  imports: [
    CommonModule,
    TopicsRoutingModule,
    SharedModule
  ],
  declarations: [
    TopicListComponent,
  ],
  entryComponents: [
  ]
})
export class TopicsModule { }
