import {Component, OnInit, ViewChild} from '@angular/core';
import {CpopularsService} from '../../../../core/services/api/cpopulars.service';
import {Cpopular} from '../../../../core/models/cpopulars';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {NzDrawerPlacement} from 'ng-zorro-antd/drawer';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../../../environments/environment';
import {SearchableColumnItem} from '../../../../core/interfaces/searchable_column_item';

@Component({
  selector: 'app-cpopular-list',
  templateUrl: './cpopular-list.component.html',
  styleUrls: ['./cpopular-list.component.css']
})
export class CpopularListComponent implements OnInit {

  data: Cpopular[] = [];
  filteredData: Cpopular[] = [];
  listOfCurrentPageData: Cpopular[] = [];
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
      sortFn: (a: Cpopular, b: Cpopular) => a.name.localeCompare(b.name),
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
      sortFn: (a: Cpopular, b: Cpopular) => a.code.localeCompare(b.code),
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

  constructor(private cpopularsApi: CpopularsService,
              private fb: FormBuilder,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${environment.appName} - Consejos populares`);
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
      this.updateCpopular();
    } else {
      this.storeCpopular();
    }
    this.cancelEdit();
  }

  updateList(): void {
    this.loading = true;
    this.cpopularsApi.getCpopulars()
      .subscribe((response: any) => {
        this.data = response.cpopulars;
        this.filteredData = response.cpopulars;
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

  editCpopular(element: any): void {
    this.drawerTitle = 'Modificar consejo popular';
    this.loading = false;
    this.validateForm.setValue(_.cloneDeep(element));
    this.isEditMode = true;
    this.drawer = true;
  }

  deleteCpopular(id: number): void {
    this.loading = true;
    this.cpopularsApi.deleteCpopular(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  deleteSelection(): void {

  }

  addCpopular(): void {
    this.drawerTitle = 'Nuevo consejo popular';
    this.loading = false;
    this.isEditMode = false;
    this.drawer = true;
  }

  storeCpopular(): void {
    this.loading = true;
    this.cpopularsApi.addCpopular(this.validateForm.value)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
      });
  }

  updateCpopular(): void {
    this.loading = true;
    this.cpopularsApi.updateCpopular(this.validateForm.get('id').value, this.validateForm.value)
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

  onCurrentPageChanged(listOfCurrentPageData: Cpopular[]): void {
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
    this.filteredData = this.data.filter((item: Cpopular) => item[column].indexOf(search) !== -1);
  }

  reset(): void {
    this.searchColumn.searchVisible = false;
    this.searchColumn.searchValue = '';
    this.searchValue = '';
    this.search();
  }
}
