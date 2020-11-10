import { Component, OnInit, ViewChild } from '@angular/core';
import {StreetService} from '../../../../core/services/api/street.service';
import {Street} from '../../../../core/models/street';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {CpopularsService} from '../../../../core/services/api/cpopulars.service';
import {NzDrawerPlacement} from 'ng-zorro-antd/drawer';
import {SearchableColumnItem} from '../../../../core/interfaces/searchable_column_item';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-topic-list',
  templateUrl: './street-list.component.html',
  styleUrls: ['./street-list.component.css']
})
export class StreetListComponent implements OnInit {

  data: Street[] = [];
  filteredData: Street[] = [];
  listOfCurrentPageData: Street[] = [];
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
      sortFn: (a: Street, b: Street) => a.name.localeCompare(b.name),
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
      sortFn: (a: Street, b: Street) => a.code.localeCompare(b.code),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'code',
      priority: false,
    },
    {
      name: 'Consejo popular',
      sortOrder: null,
      sortFn: (a: Street, b: Street) => a.cpopular.name.localeCompare(b.cpopular.name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'cpopular',
      priority: 2,
    },
    {
      name: 'Primera calle',
      sortOrder: null,
      sortFn: (a: Street, b: Street) => a.first_between_street.name.localeCompare(b.first_between_street.name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'first_between_street',
      priority: 1,
    },
    {
      name: 'Segunda calle',
      sortOrder: null,
      sortFn: (a: Street, b: Street) => a.second_between_street.name.localeCompare(b.second_between_street.name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'second_between_street',
      priority: 1,
    },
  ];
  searchValue: string;
  searchColumn: SearchableColumnItem;
  entities = [];
  streets = [];

  constructor(private cpopularsApi: CpopularsService,
              private streetsApi: StreetService,
              private fb: FormBuilder,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${environment.appName} - Calles`);
    this.createForm();

    this.cancelEdit();
    this.updateList();
  }

  createForm(): void {
    this.isEditMode = false;
    this.validateForm = this.fb.group({
      id:           [null, [Validators.nullValidator]],
      name:         [null, [Validators.required]],
      code:         [null, [Validators.nullValidator]],
      cpopular:     [null, [Validators.nullValidator]],
      cpopular_id:  [null, [Validators.required]],
      first_between_street: [null, [Validators.nullValidator]],
      first_between_id:     [null, [Validators.nullValidator]],
      second_between_street: [null, [Validators.nullValidator]],
      second_between_id:     [null, [Validators.nullValidator]],
      created_at:   [null, [Validators.nullValidator]],
      updated_at:   [null, [Validators.nullValidator]],
    });

    this.loading = true;
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateStreet();
    } else {
      this.storeStreet();
    }
    this.cancelEdit();
  }

  updateList(): void {
    this.loading = true;
    this.streetsApi.getStreets()
      .subscribe((response: any) => {
        this.data = response.streets;
        this.filteredData = response.streets;
        this.streets = response.streets.map((element) => {
          return {
            id: element.id,
            text: element.name
          };
        });
        this.cpopularsApi.getCpopulars()
          .subscribe((resp: any) => {
            this.entities = resp.cpopulars.map((element) => {
              return {
                id: element.id,
                text: element.name
              };
            });
            this.loading = false;
          }, error => {
            console.log(error);
            this.loading = false;
          });
      }, error => {
        this.loading = false;
      });
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.drawer = false;
    this.validateForm.reset();
  }

  editStreet(element: any): void {
    this.drawerTitle = 'Modificar calle';
    this.loading = false;
    const clone = _.cloneDeep(element);
    this.validateForm.setValue(clone);
    this.isEditMode = true;
    this.drawer = true;
  }

  deleteStreet(id: number): void {
    this.loading = true;
    this.streetsApi.deleteStreet(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  deleteSelection(): void {

  }

  addStreet(): void {
    this.drawerTitle = 'Nueva calle';
    this.loading = false;
    this.isEditMode = false;
    this.drawer = true;
  }

  storeStreet(): void {
    this.loading = true;
    this.streetsApi.addStreet(this.validateForm.value)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
      });
  }

  updateStreet(): void {
    this.loading = true;
    this.streetsApi.updateStreet(this.validateForm.get('id').value, this.validateForm.value)
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

  onCurrentPageChanged(listOfCurrentPageData: Street[]): void {
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
    if (column === 'cpopular') {
      this.filteredData = this.data.filter((item: Street) => item[column].name.indexOf(search) !== -1);
    }
    else if (column === 'first_between_street') {
      this.filteredData = this.data.filter((item: Street) => item[column].name.indexOf(search) !== -1);
    }
    else if (column === 'second_between_street') {
      this.filteredData = this.data.filter((item: Street) => item[column].name.indexOf(search) !== -1);
    }
    else {
      this.filteredData = this.data.filter((item: Street) => item[column].indexOf(search) !== -1);
    }
  }

  reset(): void {
    this.searchColumn.searchVisible = false;
    this.searchColumn.searchValue = '';
    this.searchValue = '';
    this.search();
  }

  addEntityItem(input: HTMLInputElement): void {
    const value = input.value;
    const hasEntity = this.entities.some((item: any) => item.text.indexOf(value) !== -1);
    if (!hasEntity) {
      this.entities = [...this.entities, {
        id:         value,
        text:       value,
      }];
    }
  }

  addStreetItem(input: HTMLInputElement): void {
    const value = input.value;
    const hasEntity = this.streets.some((item: any) => item.text.indexOf(value) !== -1);
    if (!hasEntity) {
      this.streets = [...this.streets, {
        id:         value,
        text:       value,
      }];
    }
  }
}
