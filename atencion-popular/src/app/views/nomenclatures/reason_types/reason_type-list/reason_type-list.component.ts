import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {ReasonType} from '../../../../core/models/reason_type';
import {ReasonTypeService} from '../../../../core/services/api/reason-type.service';
import {NzDrawerPlacement} from 'ng-zorro-antd/drawer';
import {SearchableColumnItem} from '../../../../core/interfaces/searchable_column_item';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-way-list',
  templateUrl: './reason_type-list.component.html',
  styleUrls: ['./reason_type-list.component.css']
})
export class ReasonTypeListComponent implements OnInit {

  data: ReasonType[] = [];
  filteredData: ReasonType[] = [];
  listOfCurrentPageData: ReasonType[] = [];
  loading: boolean;
  validateForm!: FormGroup;
  isEditMode: boolean;
  drawer: boolean;
  drawerTitle: string;
  placement: NzDrawerPlacement = 'right';
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  listOfColumns: SearchableColumnItem[] = [
    {
      name: 'Nombre',
      sortOrder: null,
      sortFn: (a: ReasonType, b: ReasonType) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'name',
      priority: 3,
    },
    {
      name: 'Código',
      sortOrder: null,
      sortFn: (a: ReasonType, b: ReasonType) => a.code.localeCompare(b.code),
      sortDirections: ['ascend', 'descend'],
      searchable: false,
      searchVisible: false,
      searchValue: '',
      data: 'code',
      priority: false,
    },
  ];
  searchValue: string;
  searchColumn: SearchableColumnItem;

  constructor(private reasonsApi: ReasonTypeService,
              private fb: FormBuilder,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${environment.appName} - Tipos de razón`);
    this.createForm();

    this.cancelEdit();
    this.updateList();
  }

  createForm(): void {
    this.isEditMode = false;
    this.validateForm = this.fb.group({
      id:   [null, [Validators.nullValidator]],
      name: [null, [Validators.required]],
      code: [null, [Validators.nullValidator]],
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateReasonType();
    } else {
      this.storeReasonType();
    }
    this.cancelEdit();
  }

  updateList(): void {
    this.loading = true;
    this.reasonsApi.getReasonTypes()
      .subscribe((response: any) => {
        this.data = response.reason_types;
        this.filteredData = response.reason_types;
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.drawer = false;
    this.validateForm.reset();
  }

  editReasonType(element: any): void {
    this.drawerTitle = 'Modificar tipo de razón';
    this.loading = false;
    this.validateForm.setValue(_.cloneDeep(element));
    this.isEditMode = true;
    this.drawer = true;
  }

  deleteReasonType(id: number): void {
    this.loading = true;
    this.reasonsApi.deleteReasonType(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  deleteSelection(): void {

  }

  addReasonType(): void {
    this.drawerTitle = 'Nuevo tipo de razón';
    this.loading = false;
    this.isEditMode = false;
    this.drawer = true;
  }

  storeReasonType(): void {
    this.loading = true;
    this.reasonsApi.addReasonType(this.validateForm.value)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
      });
  }

  updateReasonType(): void {
    this.loading = true;
    this.reasonsApi.updateReasonType(this.validateForm.get('id').value, this.validateForm.value)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
      });
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    }
    else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageChanged(listOfCurrentPageData: ReasonType[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  private refreshCheckedStatus(): void {
    const listOfEnableData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnableData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnableData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  onChangeSearch($event: any): void {
    const search = this.searchValue;
    if (!this.searchColumn?.searchVisible) {
      const visibleSearches = this.listOfColumns.filter((c: SearchableColumnItem) => c.searchVisible);
      if (visibleSearches.length > 0) {
        this.searchColumn = visibleSearches[0];
      }
    }
    this.searchColumn.searchValue = search;
  }

  search(): void {
    this.searchColumn.searchVisible = false;
    const search = this.searchColumn.searchValue;
    const column = this.searchColumn.data;
    this.filteredData = this.data.filter((item: ReasonType) => item[column].indexOf(search) !== -1);
  }

  reset(): void {
    this.searchColumn.searchVisible = false;
    this.searchColumn.searchValue = '';
    this.searchValue = '';
    this.search();
  }

}
