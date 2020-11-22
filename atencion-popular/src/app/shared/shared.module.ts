import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {LayoutComponent} from './layout/layout.component';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {IconsProviderModule} from '../icons-provider.module';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzNoAnimationModule} from 'ng-zorro-antd/core/no-animation';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzPopconfirmModule,
    IconsProviderModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzDrawerModule,
    NzTagModule,
    NzNoAnimationModule,
    NzDropDownModule,
    NzEmptyModule,
    NzCheckboxModule,
    NzSelectModule,
    NzDatePickerModule,
  ],
  exports: [
    NzLayoutModule,
    NzMenuModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzPopconfirmModule,
    IconsProviderModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzDrawerModule,
    NzTagModule,
    NzNoAnimationModule,
    NzDropDownModule,
    NzEmptyModule,
    NzCheckboxModule,
    NzSelectModule,
    NzDatePickerModule,
  ]
})
export class SharedModule { }
