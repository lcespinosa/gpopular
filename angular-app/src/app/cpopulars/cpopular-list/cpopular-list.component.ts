import {Component, OnInit, ViewChild} from '@angular/core';
import {CpopularsService} from '../../core/services/api/cpopulars.service';
import {Cpopular} from '../../core/models/cpopulars';
import {NgForm} from '@angular/forms';
import * as _ from 'lodash';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-cpopular-list',
  templateUrl: './cpopular-list.component.html',
  styleUrls: ['./cpopular-list.component.css']
})
export class CpopularListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  data: MatTableDataSource<Cpopular>;
  loading: boolean;

  @ViewChild('cpopularForm', { static: false })
    cpopularForm: NgForm;
  // @ts-ignore
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  cpopulaData: Cpopular = {
    id:         0,
    name:       '',
    code:       '',
    created_at: null,
    updated_at: null,
  };
  isEditMode: boolean;

  constructor(private cpopularsApi: CpopularsService) { }

  ngOnInit() {
    this.isEditMode = false;
    this.updateList();
  }

  updateList() {
    this.loading = true;
    this.cpopularsApi.getCpopulars()
      .subscribe((response: any) => {
        this.data = new MatTableDataSource<Cpopular>(response.cpopulars);
        this.data.paginator = this.paginator;
        console.log(this.data);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
  }

  editCpopular(element: any) {
    this.loading = false;
    this.cpopulaData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.cpopularForm.resetForm();
  }

  deleteCpopular(id: number) {
    this.loading = true;
    this.cpopularsApi.deleteCpopular(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  addCpopular() {
    this.loading = true;
    this.cpopularsApi.addCpopular(this.cpopulaData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
        this.cpopularForm.resetForm();
      });
  }

  updateCpopular() {
    this.loading = true;
    this.cpopularsApi.updateCpopular(this.cpopulaData.id, this.cpopulaData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();

        this.cancelEdit();
      });
  }

  onSubmit() {
    if (this.cpopularForm.form.valid) {
      if (this.isEditMode) {
        this.updateCpopular();
      } else {
        this.addCpopular();
      }
    } else {
      console.log('Enter valid data!');
    }
  }
}
