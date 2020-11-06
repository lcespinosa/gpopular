import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsRoutingModule } from './topics-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TopicListComponent } from './topic-list/topic-list.component';
import {NgSelect2Module} from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    TopicsRoutingModule,
    SharedModule,
    NgSelect2Module
  ],
  declarations: [
    TopicListComponent,
  ],
  entryComponents: [
  ]
})
export class TopicsModule { }
