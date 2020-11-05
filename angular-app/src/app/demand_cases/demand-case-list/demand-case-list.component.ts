import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as _ from 'lodash';
import {DemandCase} from '../../core/models/demand_case';
import {DemandCaseService} from '../../core/services/api/demand-case.service';

@Component({
  selector: 'app-demand-case-list',
  templateUrl: './demand-case-list.component.html',
  styleUrls: ['./demand-case-list.component.css']
})
export class DemandCaseListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'actions'];
  data: DemandCase[] = [];
  loading: boolean;

  @ViewChild('demandCaseForm', { static: false })
  demandCaseForm: NgForm;
  demandCaseData: DemandCase = {
    id:         0,
    name:       '',
    code:       '',
    created_at: null,
    updated_at: null,
  };
  isEditMode: boolean;

  constructor(private demandCaseApi: DemandCaseService) { }

  ngOnInit() {
    this.isEditMode = false;
    this.updateList();
  }

  updateList() {
    this.loading = true;
    this.demandCaseApi.getDemandCases()
      .subscribe((response: any) => {
        this.data = response.demand_cases;
        console.log(this.data);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
  }

  editDemandCase(element: any) {
    this.loading = false;
    this.demandCaseData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.demandCaseForm.resetForm();
  }

  deleteDemandCase(id: number) {
    this.loading = true;
    this.demandCaseApi.deleteDemandCase(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  addDemandCase() {
    this.loading = true;
    this.demandCaseApi.addDemandCase(this.demandCaseData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
        this.demandCaseForm.resetForm();
      });
  }

  updateDemandCase() {
    this.loading = true;
    this.demandCaseApi.updateDemandCase(this.demandCaseData.id, this.demandCaseData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();

        this.cancelEdit();
      });
  }

  onSubmit() {
    if (this.demandCaseForm.form.valid) {
      if (this.isEditMode) {
        this.updateDemandCase();
      } else {
        this.addDemandCase();
      }
    } else {
      console.log('Enter valid data!');
    }
  }

}
