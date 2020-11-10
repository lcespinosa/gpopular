import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {ReactiveFormsModule} from '@angular/forms';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzButtonModule,
    NzCardModule,
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
