import { Component, OnInit, ViewChild } from '@angular/core';
import {TopicService} from '../../../../core/services/api/topic.service';
import {Topic} from '../../../../core/models/topic';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {EntityService} from '../../../../core/services/api/entity.service';
import {NzDrawerPlacement} from 'ng-zorro-antd/drawer';
import {SearchableColumnItem} from '../../../../core/interfaces/searchable_column_item';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  data: Topic[] = [];
  filteredData: Topic[] = [];
  listOfCurrentPageData: Topic[] = [];
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
      sortFn: (a: Topic, b: Topic) => a.name.localeCompare(b.name),
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
      sortFn: (a: Topic, b: Topic) => a.code.localeCompare(b.code),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'code',
      priority: false,
    },
    {
      name: 'Tiene recursos',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'has_resources',
      priority: false,
    },
    {
      name: 'Organismo',
      sortOrder: null,
      sortFn: (a: Topic, b: Topic) => a.agency.name.localeCompare(b.agency.name),
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
              private topicsApi: TopicService,
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
      code:         [null, [Validators.nullValidator]],
      has_resources: [null, [Validators.nullValidator]],
      agency:       [null, [Validators.nullValidator]],
      agency_id:    [null, [Validators.required]],
      created_at:   [null, [Validators.nullValidator]],
      updated_at:   [null, [Validators.nullValidator]],
    });

    this.loading = true;
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateTopic();
    } else {
      this.storeTopic();
    }
    this.cancelEdit();
  }

  updateList(): void {
    this.loading = true;
    this.topicsApi.getTopics()
      .subscribe((response: any) => {
        this.data = response.topics;
        this.filteredData = response.topics;
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

  editTopic(element: any): void {
    this.drawerTitle = 'Modificar asunto';
    this.loading = false;
    const clone = _.cloneDeep(element);
    this.validateForm.setValue(clone);
    this.isEditMode = true;
    this.drawer = true;
  }

  deleteTopic(id: number): void {
    this.loading = true;
    this.topicsApi.deleteTopic(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  deleteSelection(): void {

  }

  addTopic(): void {
    this.drawerTitle = 'Nuevo asunto';
    this.loading = false;
    this.isEditMode = false;
    this.drawer = true;
  }

  storeTopic(): void {
    this.loading = true;
    this.topicsApi.addTopic(this.validateForm.value)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
      });
  }

  updateTopic(): void {
    this.loading = true;
    this.topicsApi.updateTopic(this.validateForm.get('id').value, this.validateForm.value)
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

  onCurrentPageChanged(listOfCurrentPageData: Topic[]): void {
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
    if (column === 'agency') {
      this.filteredData = this.data.filter((item: Topic) => item[column].name.indexOf(search) !== -1);
    }
    else if (column === 'has_resources') {
      const yes = search.toLowerCase() === 'si';
      if (search.length > 0) {
        this.filteredData = this.data.filter((item: Topic) => item[column] === yes);
      }
      else {
        this.filteredData = this.data;
      }
    }
    else {
      this.filteredData = this.data.filter((item: Topic) => item[column].indexOf(search) !== -1);
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
