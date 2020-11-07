import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as _ from 'lodash';
import {Way} from '../../core/models/way';
import {WayService} from '../../core/services/api/way.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-way-list',
  templateUrl: './way-list.component.html',
  styleUrls: ['./way-list.component.css']
})
export class WayListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  data: MatTableDataSource<Way>;
  loading: boolean;

  @ViewChild('wayForm', { static: false })
  wayForm: NgForm;
  // @ts-ignore
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  wayData: Way = {
    id:         0,
    name:       '',
    code:       '',
    created_at: null,
    updated_at: null,
  };
  isEditMode: boolean;

  constructor(private wayApi: WayService) { }

  ngOnInit() {
    this.isEditMode = false;
    this.updateList();
  }

  updateList() {
    this.loading = true;
    this.wayApi.getWays()
      .subscribe((response: any) => {
        this.data = new MatTableDataSource<Way>(response.ways);
        this.data.paginator = this.paginator;
        console.log(this.data);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
  }

  editWay(element: any) {
    this.loading = false;
    this.wayData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.wayForm.resetForm();
  }

  deleteWay(id: number) {
    this.loading = true;
    this.wayApi.deleteWay(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  addWay() {
    this.loading = true;
    this.wayApi.addWay(this.wayData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
        this.wayForm.resetForm();
      });
  }

  updateWay() {
    this.loading = true;
    this.wayApi.updateWay(this.wayData.id, this.wayData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();

        this.cancelEdit();
      });
  }

  onSubmit() {
    if (this.wayForm.form.valid) {
      if (this.isEditMode) {
        this.updateWay();
      } else {
        this.addWay();
      }
    } else {
      console.log('Enter valid data!');
    }
  }

}
