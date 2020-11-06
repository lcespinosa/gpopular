import { Component, OnInit, ViewChild } from '@angular/core';
import {FunctionaryService} from '../../core/services/api/functionary.service';
import {Functionary} from '../../core/models/functionary';
import {NgForm} from '@angular/forms';
import * as _ from 'lodash';
import {Entity} from '../../core/models/entity';
import {EntityService} from '../../core/services/api/entity.service';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-functionary-list',
  templateUrl: './functionary-list.component.html',
  styleUrls: ['./functionary-list.component.css']
})
export class FunctionaryListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'last_name', 'nick', 'phones', 'occupation', 'is_relevant', 'agency', 'actions'];
  data: Functionary[] = [];
  entities: Array<Select2OptionData>;
  loading: boolean;

  @ViewChild('functionaryForm', { static: false })
    functionaryForm: NgForm;
  functionaryData: Functionary = {
    id:         null,
    name:       '',
    last_name:  '',
    nick:       '',
    phones:     '',
    is_relevant: false,
    occupation: '',
    agency:     null,
    agency_id:  null,
    created_at: null,
    updated_at: null,
  };
  isEditMode: boolean;
  options = {
    theme: 'mat',
    allowClear: true,
    tags: true
  };

  constructor(private functionariesApi: FunctionaryService, private entityApi: EntityService) { }

  ngOnInit() {
    this.isEditMode = false;

    this.loading = true;
    this.entityApi.getEntities()
      .subscribe((response: any) => {
        this.entities = response.agencies.map((element) => {
          return {
            id: element.id,
            text: element.name
          };
        });
        console.log(this.entities);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });

    this.updateList();
  }

  updateList() {
    this.loading = true;
    this.functionariesApi.getFunctionaries()
      .subscribe((response: any) => {
        this.data = response.functionaries;
        console.log(this.data);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
  }

  editFunctionary(element: any) {
    this.loading = false;
    this.functionaryData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.functionaryForm.resetForm();
    this.functionaryData = {
      id:         null,
      name:       '',
      last_name:  '',
      nick:       '',
      phones:     '',
      is_relevant: false,
      occupation: '',
      agency:     null,
      agency_id:  null,
      created_at: null,
      updated_at: null,
    };
  }

  deleteFunctionary(id: number) {
    this.loading = true;
    this.functionariesApi.deleteFunctionary(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  addFunctionary() {
    this.loading = true;
    this.functionariesApi.addFunctionary(this.functionaryData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
        this.functionaryForm.resetForm();
      });
  }

  updateFunctionary() {
    this.loading = true;
    this.functionariesApi.updateFunctionary(this.functionaryData.id, this.functionaryData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();

        this.cancelEdit();
      });
  }

  onSubmit() {
    if (this.functionaryForm.form.valid) {
      if (this.isEditMode) {
        this.updateFunctionary();
      } else {
        this.addFunctionary();
      }
    } else {
      console.log('Enter valid data!');
    }
  }

  changedEntity(e: any): void {
    if (e && e.length > 0) {
      this.functionaryData.agency_id = e;
    }
  }
}
