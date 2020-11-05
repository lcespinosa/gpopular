import {Component, OnInit, ViewChild} from '@angular/core';
import {StreetService} from '../../core/services/api/street.service';
import {Street} from '../../core/models/street';
import {NgForm} from '@angular/forms';
import * as _ from 'lodash';
import {Cpopular} from '../../core/models/cpopulars';
import {CpopularsService} from '../../core/services/api/cpopulars.service';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-street-list',
  templateUrl: './street-list.component.html',
  styleUrls: ['./street-list.component.css']
})
export class StreetListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'cpopular', 'between_street', 'actions'];
  data: Street[] = [];
  cpopulars: Array<Select2OptionData>;
  loading: boolean;

  @ViewChild('streetForm', { static: false })
  streetForm: NgForm;
  streetData: Street = {
    id:         null,
    name:       '',
    code:       '',
    cpopular:   null,
    cpopular_id: null,
    first_between_street: null,
    first_between_id: null,
    second_between_street: null,
    second_between_id: null,
    created_at: null,
    updated_at: null,
  };
  isEditMode: boolean;
  options = {
    theme: 'mat',
    allowClear: true,
    tags: true
  };


  constructor(private streetApi: StreetService, private cpopularApi: CpopularsService) { }

  ngOnInit() {
    this.isEditMode = false;

    this.loading = true;
    this.cpopularApi.getCpopulars()
      .subscribe((response: any) => {
        this.cpopulars = response.cpopulars.map((element) => {
          return {
            id: element.id,
            text: element.name
          };
        });
        console.log(this.cpopulars);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });

    this.updateList();
  }

  updateList() {
    this.loading = true;
    this.streetApi.getStreets()
      .subscribe((response: any) => {
        this.data = response.streets;
        console.log(this.data);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
  }

  editStreet(element: any) {
    this.loading = false;
    this.streetData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.streetForm.resetForm();
    this.streetData = {
      id:         null,
      name:       '',
      code:       '',
      cpopular:   null,
      cpopular_id: null,
      first_between_street: null,
      first_between_id: null,
      second_between_street: null,
      second_between_id: null,
      created_at: null,
      updated_at: null,
    };
  }

  deleteStreet(id: number) {
    this.loading = true;
    this.streetApi.deleteStreet(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  addStreet() {
    this.loading = true;
    this.streetApi.addStreet(this.streetData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();

        this.cancelEdit();
      });
  }

  updateStreet() {
    this.loading = true;
    this.streetApi.updateStreet(this.streetData.id, this.streetData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();

        this.cancelEdit();
      });
  }

  onSubmit() {
    if (this.streetForm.form.valid) {
      if (this.isEditMode) {
        this.updateStreet();
      } else {
        this.addStreet();
      }
    } else {
      console.log('Enter valid data!');
    }
  }

}
