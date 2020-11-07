import {Component, OnInit, ViewChild} from '@angular/core';
import {StreetService} from '../../core/services/api/street.service';
import {Street} from '../../core/models/street';
import {NgForm} from '@angular/forms';
import * as _ from 'lodash';
import {CpopularsService} from '../../core/services/api/cpopulars.service';
import { Select2OptionData } from 'ng-select2';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-street-list',
  templateUrl: './street-list.component.html',
  styleUrls: ['./street-list.component.css']
})
export class StreetListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'cpopular', 'between_street', 'actions'];
  data: MatTableDataSource<Street>;
  dataArray: Array<Select2OptionData>;
  cpopulars: Array<Select2OptionData>;
  loading: boolean;

  @ViewChild('streetForm', { static: false })
  streetForm: NgForm;
  // @ts-ignore
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

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
        this.data = new MatTableDataSource<Street>(response.streets);
        this.data.paginator = this.paginator;
        this.dataArray = response.streets.map((element) => {
          return {
            id: element.id,
            text: element.name
          };
        });
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
        this.cancelEdit();
        this.updateList();
      });
  }

  addStreet() {
    this.loading = true;
    this.streetApi.addStreet(this.streetData)
      .subscribe((response) => {
        this.loading = false;
        this.cancelEdit();
        this.updateList();
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

  changedCpopular(e: any) {
    if (e && e.length > 0) {
      this.streetData.cpopular_id = e;
      this.loading = true;
      this.streetApi.getStreets(this.streetData.cpopular_id + '')
        .subscribe((response: any) => {
          this.dataArray = response.streets.map((element) => {
            return {
              id: element.id,
              text: element.name
            };
          });
          this.streetData.first_between_id = null;
          this.streetData.second_between_id = null;
          this.loading = false;
        }, error => {
          console.log(error);
          this.loading = false;
        });
    }
  }

  changedFirstStrret(e: any) {
    if (e && e.length > 0) {
      this.streetData.first_between_id = e;
    }
  }

  changedSecondStreet(e: any) {
    if (e && e.length > 0) {
      this.streetData.second_between_id = e;
    }
  }
}
