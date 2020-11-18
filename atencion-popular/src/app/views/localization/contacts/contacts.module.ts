import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule
  ],
  declarations: [
    ContactListComponent,
  ],
  entryComponents: [
  ]
})
export class ContactsModule { }
