import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as _ from 'lodash';
import {Result} from '../../core/models/result';
import {ResultService} from '../../core/services/api/result.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})
export class ResultListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  data: Result[] = [];
  loading: boolean;

  @ViewChild('resultForm', { static: false })
  resultForm: NgForm;
  resultData: Result = {
    id:         0,
    name:       '',
    code:       '',
    created_at: null,
    updated_at: null,
  };
  isEditMode: boolean;

  constructor(private resultApi: ResultService) { }

  ngOnInit() {
    this.isEditMode = false;
    this.updateList();
  }

  updateList() {
    this.loading = true;
    this.resultApi.getResults()
      .subscribe((response: any) => {
        this.data = response.results;
        console.log(this.data);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
  }

  editResult(element: any) {
    this.loading = false;
    this.resultData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.resultForm.resetForm();
  }

  deleteResult(id: number) {
    this.loading = true;
    this.resultApi.deleteResult(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  addResult() {
    this.loading = true;
    this.resultApi.addResult(this.resultData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
        this.resultForm.resetForm();
      });
  }

  updateResult() {
    this.loading = true;
    this.resultApi.updateResult(this.resultData.id, this.resultData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();

        this.cancelEdit();
      });
  }

  onSubmit() {
    if (this.resultForm.form.valid) {
      if (this.isEditMode) {
        this.updateResult();
      } else {
        this.addResult();
      }
    } else {
      console.log('Enter valid data!');
    }
  }

}
