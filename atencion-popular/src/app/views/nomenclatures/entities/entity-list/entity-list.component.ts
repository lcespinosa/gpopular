import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Entity} from '../../../../core/models/entity';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EntityService} from '../../../../core/services/api/entity.service';
import * as _ from 'lodash';
import {NzDrawerPlacement} from 'ng-zorro-antd/drawer';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../../../environments/environment';
import {SearchableColumnItem} from '../../../../core/interfaces/searchable_column_item';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {

  @ViewChild('tagInputElement', { static: false }) tagInputElement?: ElementRef;

  data: Entity[] = [];
  filteredData: Entity[] = [];
  listOfCurrentPageData: Entity[] = [];
  loading: boolean;
  validateForm!: FormGroup;
  isEditMode: boolean;
  drawer: boolean;
  drawerTitle: string;
  placement: NzDrawerPlacement = 'right';
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<number>();
  tagInputVisible: boolean;

  listOfColumns: SearchableColumnItem[] = [
    {
      name: 'Nombre',
      sortOrder: null,
      sortFn: (a: Entity, b: Entity) => a.name.localeCompare(b.name),
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
      sortFn: (a: Entity, b: Entity) => a.code.localeCompare(b.code),
      sortDirections: ['ascend', 'descend'],
      searchable: false,
      searchVisible: false,
      searchValue: '',
      data: 'code',
      priority: false,
    },
    {
      name: 'Descripción',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'description',
      priority: 1,
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
  ];
  searchValue: string;
  searchColumn: SearchableColumnItem;

  get Tags(): [] {
    return this.validateForm.get('phones').value || [];
  }

  constructor(private entitiesApi: EntityService,
              private fb: FormBuilder,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${environment.appName} - Organismos`);
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
      description:  [null, [Validators.nullValidator]],
      phones:       [null, [Validators.nullValidator]],
      tmp_phone:    [null, [Validators.nullValidator]],
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateEntity();
    } else {
      this.storeEntity();
    }
    this.cancelEdit();
  }

  updateList(): void {
    this.loading = true;
    this.entitiesApi.getEntities()
      .subscribe((response: any) => {
        this.data = response.agencies;
        this.filteredData = response.agencies;
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

  editEntity(element: any): void {
    this.drawerTitle = 'Modificar organismo';
    this.loading = false;
    const clone = _.cloneDeep(element);
    clone.tmp_phone = '';
    this.validateForm.setValue(clone);
    this.isEditMode = true;
    this.drawer = true;
  }

  deleteEntity(id: number): void {
    this.loading = true;
    this.entitiesApi.deleteEntity(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  deleteSelection(): void {

  }

  addEntity(): void {
    this.drawerTitle = 'Nuevo organismo';
    this.loading = false;
    this.isEditMode = false;
    this.drawer = true;
  }

  storeEntity(): void {
    this.loading = true;
    this.entitiesApi.addEntity(this.validateForm.value)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
      });
  }

  updateEntity(): void {
    this.loading = true;
    this.entitiesApi.updateEntity(this.validateForm.get('id').value, this.validateForm.value)
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

  onCurrentPageChanged(listOfCurrentPageData: Entity[]): void {
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
    this.filteredData = this.data.filter((item: Entity) => item[column].indexOf(search) !== -1);
  }

  reset(): void {
    this.searchColumn.searchVisible = false;
    this.searchColumn.searchValue = '';
    this.searchValue = '';
    this.search();
  }
}
