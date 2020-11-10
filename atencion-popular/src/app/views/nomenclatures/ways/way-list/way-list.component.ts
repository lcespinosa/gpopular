import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {Way} from '../../../../core/models/way';
import {WayService} from '../../../../core/services/api/way.service';
import {NzDrawerPlacement} from 'ng-zorro-antd/drawer';
import {SearchableColumnItem} from '../../../../core/interfaces/searchable_column_item';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-way-list',
  templateUrl: './way-list.component.html',
  styleUrls: ['./way-list.component.css']
})
export class WayListComponent implements OnInit {

  data: Way[] = [];
  filteredData: Way[] = [];
  listOfCurrentPageData: Way[] = [];
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
      sortFn: (a: Way, b: Way) => a.name.localeCompare(b.name),
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
      sortFn: (a: Way, b: Way) => a.code.localeCompare(b.code),
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

  constructor(private waysApi: WayService,
              private fb: FormBuilder,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${environment.appName} - Vías`);
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
      this.updateWay();
    } else {
      this.storeWay();
    }
    this.cancelEdit();
  }

  updateList(): void {
    this.loading = true;
    this.waysApi.getWays()
      .subscribe((response: any) => {
        this.data = response.ways;
        this.filteredData = response.ways;
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

  editWay(element: any): void {
    this.drawerTitle = 'Modificar vía';
    this.loading = false;
    this.validateForm.setValue(_.cloneDeep(element));
    this.isEditMode = true;
    this.drawer = true;
  }

  deleteWay(id: number): void {
    this.loading = true;
    this.waysApi.deleteWay(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  deleteSelection(): void {

  }

  addWay(): void {
    this.drawerTitle = 'Nueva vía';
    this.loading = false;
    this.isEditMode = false;
    this.drawer = true;
  }

  storeWay(): void {
    this.loading = true;
    this.waysApi.addWay(this.validateForm.value)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
      });
  }

  updateWay(): void {
    this.loading = true;
    this.waysApi.updateWay(this.validateForm.get('id').value, this.validateForm.value)
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

  onCurrentPageChanged(listOfCurrentPageData: Way[]): void {
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
    this.filteredData = this.data.filter((item: Way) => item[column].indexOf(search) !== -1);
  }

  reset(): void {
    this.searchColumn.searchVisible = false;
    this.searchColumn.searchValue = '';
    this.searchValue = '';
    this.search();
  }

}
