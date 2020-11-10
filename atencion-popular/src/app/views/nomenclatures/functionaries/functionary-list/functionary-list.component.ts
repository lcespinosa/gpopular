import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FunctionaryService} from '../../../../core/services/api/functionary.service';
import {Functionary} from '../../../../core/models/functionary';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {Entity} from '../../../../core/models/entity';
import {EntityService} from '../../../../core/services/api/entity.service';
import {NzDrawerPlacement} from 'ng-zorro-antd/drawer';
import {SearchableColumnItem} from '../../../../core/interfaces/searchable_column_item';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-functionary-list',
  templateUrl: './functionary-list.component.html',
  styleUrls: ['./functionary-list.component.css']
})
export class FunctionaryListComponent implements OnInit {

  @ViewChild('tagInputElement', { static: false }) tagInputElement?: ElementRef;

  data: Functionary[] = [];
  filteredData: Functionary[] = [];
  listOfCurrentPageData: Functionary[] = [];
  loading: boolean;
  validateForm!: FormGroup;
  isEditMode: boolean;
  drawer: boolean;
  drawerTitle: string;
  placement: NzDrawerPlacement = 'right';
  checked = false;
  indeterminate = false;
  tagInputVisible: boolean;
  setOfCheckedId = new Set<number>();
  listOfColumns: SearchableColumnItem[] = [
    {
      name: 'Nombre',
      sortOrder: null,
      sortFn: (a: Functionary, b: Functionary) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'name',
      priority: 3,
    },
    {
      name: 'Apellidos',
      sortOrder: null,
      sortFn: (a: Functionary, b: Functionary) => a.last_name.localeCompare(b.last_name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'last_name',
      priority: 1,
    },
    {
      name: 'Alias',
      sortOrder: null,
      sortFn: (a: Functionary, b: Functionary) => a.last_name.localeCompare(b.last_name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'last_name',
      priority: 2,
    },
    {
      name: 'Teléfonos',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'phones',
      priority: false,
    },
    {
      name: 'Ocupación',
      sortOrder: null,
      sortFn: (a: Functionary, b: Functionary) => a.occupation.localeCompare(b.last_name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'occupation',
      priority: 1,
    },
    {
      name: 'Cuadro',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'is_relevant',
      priority: false,
    },
    {
      name: 'Organismo',
      sortOrder: null,
      sortFn: (a: Functionary, b: Functionary) => a.agency.name.localeCompare(b.agency.name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'agency',
      priority: 1,
    },
  ];
  searchValue: string;
  searchColumn: SearchableColumnItem;
  entities = [];

  get Tags(): [] {
    return this.validateForm.get('phones').value || [];
  }

  constructor(private entitiesApi: EntityService,
              private functionariesApi: FunctionaryService,
              private fb: FormBuilder,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${environment.appName} - Funcionarios`);
    this.createForm();

    this.cancelEdit();
    this.updateList();
  }

  createForm(): void {
    this.isEditMode = false;
    this.validateForm = this.fb.group({
      id:           [null, [Validators.nullValidator]],
      name:         [null, [Validators.required]],
      last_name:    [null, [Validators.nullValidator]],
      nick:         [null, [Validators.nullValidator]],
      phones:       [null, [Validators.nullValidator]],
      tmp_phone:    [null, [Validators.nullValidator]],
      occupation:   [null, [Validators.nullValidator]],
      is_relevant:  [null, [Validators.nullValidator]],
      agency:       [null, [Validators.nullValidator]],
      agency_id:    [null, [Validators.required]],
      created_at:   [null, [Validators.nullValidator]],
      updated_at:   [null, [Validators.nullValidator]],
    });

    this.loading = true;
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateFunctionary();
    } else {
      this.storeFunctionary();
    }
    this.cancelEdit();
  }

  updateList(): void {
    this.loading = true;
    this.functionariesApi.getFunctionaries()
      .subscribe((response: any) => {
        this.data = response.functionaries;
        this.filteredData = response.functionaries;
        this.entitiesApi.getEntities()
          .subscribe((resp: any) => {
            this.entities = resp.agencies.map((element) => {
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

  editFunctionary(element: any): void {
    this.drawerTitle = 'Modificar funcionario';
    this.loading = false;
    const clone = _.cloneDeep(element);
    clone.tmp_phone = '';
    this.validateForm.setValue(clone);
    this.isEditMode = true;
    this.drawer = true;
  }

  deleteFunctionary(id: number): void {
    this.loading = true;
    this.functionariesApi.deleteFunctionary(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  deleteSelection(): void {

  }

  addFunctionary(): void {
    this.drawerTitle = 'Nuevo funcionario';
    this.loading = false;
    this.isEditMode = false;
    this.drawer = true;
  }

  storeFunctionary(): void {
    this.loading = true;
    this.functionariesApi.addFunctionary(this.validateForm.value)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
      });
  }

  updateFunctionary(): void {
    this.loading = true;
    this.functionariesApi.updateFunctionary(this.validateForm.get('id').value, this.validateForm.value)
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

  onCurrentPageChanged(listOfCurrentPageData: Functionary[]): void {
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

  handleCloseTag(removedTag: {}): void {
    let tags = this.validateForm.get('phones').value;
    tags = tags.filter(tag => tag !== removedTag);
    this.validateForm.patchValue({phones: tags});
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showTagInput(): void {
    this.tagInputVisible = true;
    setTimeout(() => {
      this.tagInputElement?.nativeElement.focus();
    }, 10);
  }

  handleTagInputConfirm(): void {
    const tagInputValue = this.validateForm.get('tmp_phone').value;
    let tags = this.validateForm.get('phones').value || [];
    if (tagInputValue && tags.indexOf(tagInputValue) === -1) {
      tags = [...tags, tagInputValue];
      this.validateForm.patchValue({phones: tags});
    }
    this.validateForm.patchValue({tmp_phone: ''});
    this.tagInputVisible = false;
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
    if (column === 'agency') {
      this.filteredData = this.data.filter((item: Functionary) => item[column].name.indexOf(search) !== -1);
    }
    else if (column === 'is_relevant') {
      const yes = search.toLowerCase() === 'si';
      if (search.length > 0) {
        this.filteredData = this.data.filter((item: Functionary) => item[column] === yes);
      }
      else {
        this.filteredData = this.data;
      }
    }
    else {
      this.filteredData = this.data.filter((item: Functionary) => item[column].indexOf(search) !== -1);
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
}
