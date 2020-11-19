import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import * as _ from 'lodash';
import {NzDrawerPlacement} from 'ng-zorro-antd/drawer';
import {SearchableColumnItem} from '../../../../core/interfaces/searchable_column_item';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../../../environments/environment';
import {Demand} from '../../../../core/models/demand';
import {DemandsService} from '../../../../core/services/api/demands.service';
import {TypesService} from '../../../../core/services/api/types.service';
import {WayService} from '../../../../core/services/api/way.service';
import {CpopularsService} from '../../../../core/services/api/cpopulars.service';
import {EntityService} from '../../../../core/services/api/entity.service';
import {DemandCaseService} from '../../../../core/services/api/demand-case.service';
import {StreetService} from '../../../../core/services/api/street.service';
import {ContactsService} from '../../../../core/services/api/contacts.service';
import {TopicService} from '../../../../core/services/api/topic.service';

@Component({
  selector: 'app-demand-list',
  templateUrl: './demand-list.component.html',
  styleUrls: ['./demand-list.component.less']
})
export class DemandListComponent implements OnInit {

  data: Demand[] = [];
  filteredData: Demand[] = [];
  listOfCurrentPageData: Demand[] = [];
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
      name: 'Página',
      sortOrder: null,
      sortFn: (a: Demand, b: Demand) => a.page.localeCompare(b.page),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'page',
      priority: 3,
    },
    {
      name: 'Número',
      sortOrder: null,
      sortFn: (a: Demand, b: Demand) => a.number.localeCompare(b.number),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'number',
      priority: 2,
    },
    {
      name: 'Expediente',
      sortOrder: null,
      sortFn: (a: Demand, b: Demand) => a.expedient.localeCompare(b.expedient),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'expedient',
      priority: 2,
    },
    {
      name: 'Fecha de recepción',
      sortOrder: null,
      sortFn: (a: Demand, b: Demand) => a.reception_date.localeCompare(b.reception_date),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'reception_date',
      priority: 2,
    },
    {
      name: 'Anónimo',
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'is_anonymous',
      priority: false,
    },
    {
      name: 'Contacto',
      sortOrder: null,
      sortFn: (a: Demand, b: Demand) => a?.contact?.name?.localeCompare(b?.contact?.name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'contact.name',
      priority: 1,
    },
    {
      name: 'Consejo popular',
      sortOrder: null,
      sortFn: (a: Demand, b: Demand) => a?.contact?.address?.street?.cpopular?.name?.localeCompare(b?.contact?.address?.street?.cpopular?.name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'contact.address.street.cpopular.name',
      priority: 1,
    },
  ];
  searchValue: string;
  searchColumn: SearchableColumnItem;

  types = [];
  loadingTypes: boolean;
  ways = [];
  loadingWays: boolean;
  cpopulars = [];
  loadingCpopulars: boolean;
  agencies = [];
  loadingAgencies: boolean;
  demandCases = [];
  loadingDemandCases: boolean;

  streets = [];
  loadingStreets: boolean;
  contacts = [];
  loadingContacts: boolean;
  topics = [];
  loadingTopics: boolean;

  constructor(private demandsApi: DemandsService,
              private typesApi: TypesService,
              private waysApi: WayService,
              private cpopularsApi: CpopularsService,
              private agenciesApi: EntityService,
              private demandCasesApi: DemandCaseService,
              private streetsApi: StreetService,
              private contactsApi: ContactsService,
              private topicsApi: TopicService,
              private fb: FormBuilder,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${environment.appName} - Demandas`);
    this.createForm();

    this.cancelEdit();
    this.updateList();
    this.onChange();
  }

  createForm(): void {
    this.isEditMode = false;
    this.validateForm = this.fb.group({
      id:           [null, [Validators.nullValidator]],
      page:         [null, [Validators.required]],
      number:       [null, [Validators.required]],
      expedient:    [null, [Validators.nullValidator]],
      reception_date: [null, [Validators.nullValidator]],
      content:      [null, [Validators.required]],
      is_anonymous: [null, [Validators.required]],

      type:         [null, [Validators.nullValidator]],
      type_id:      [null, [Validators.required]],
      cpopular_id:  [null, [Validators.nullValidator]],
      street_id:    [null, [Validators.nullValidator]],
      contact:      [null, [Validators.nullValidator]],
      contact_id:   [null, [Validators.required]],
      way:          [null, [Validators.nullValidator]],
      way_id:       [null, [Validators.required]],
      topic:        [null, [Validators.nullValidator]],
      topic_id:     [null, [Validators.required]],
      agency_id:    [null, [Validators.required]],
      demand_case:  [null, [Validators.nullValidator]],
      demand_case_id: [null, [Validators.required]],

      created_at:   [null, [Validators.nullValidator]],
      updated_at:   [null, [Validators.nullValidator]],
    });

    this.loading = true;
  }

  onChange(): void {
    this.validateForm.get('is_anonymous').valueChanges.subscribe(value => {
      if (value) {
        this.validateForm.get('cpopular_id').disable({emitEvent: false});
        this.validateForm.get('street_id').disable({emitEvent: false});
        this.validateForm.get('contact_id').disable({emitEvent: false});
      }
      else {
        this.validateForm.get('cpopular_id').enable({emitEvent: false});
        this.validateForm.get('street_id').enable({emitEvent: false});
        this.validateForm.get('contact_id').enable({emitEvent: false});
      }
    });

    this.validateForm.get('cpopular_id').valueChanges.subscribe(value => {
      if (this.streets.length > 0) {
        this.validateForm.patchValue({street_id: null}, {emitEvent: true});
      }
      this.streets = [];
      if (isNaN(value)) {
      } else if (value != null) {
        this.loadingStreets = true;
        this.cpopularsApi.getStreets(value)
          .subscribe((resp: any) => {
            this.streets = resp.streets.map((element) => {
              return {
                id: element.id,
                text: element.name
              };
            });
            this.loadingStreets = false;
          }, error => {
            this.loadingStreets = false;
            console.log(error);
          });
      }
    });
    this.validateForm.get('street_id').valueChanges.subscribe(value => {
      if (this.contacts.length > 0) {
        this.validateForm.patchValue({contact_id: null}, {emitEvent: true});
      }
      this.contacts = [];
      if (isNaN(value)) {
      } else if (value != null) {
        this.loadingContacts = true;
        this.streetsApi.getContacts(value)
          .subscribe((resp: any) => {
            console.log(resp);
            this.contacts = resp.street.addresses.map((element) => {
              const contact = element.contact;
              return {
                id: contact.id,
                text: contact.name + ' ' + contact.last_name
              };
            });
            console.log(this.contacts);
            this.loadingContacts = false;
          }, error => {
            this.loadingContacts = false;
            console.log(error);
          });
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateDemand();
    } else {
      this.storeDemand();
    }
    this.cancelEdit();
  }

  updateList(): void {
    this.loading = true;
    this.demandsApi.getDemands()
      .subscribe((response: any) => {
        this.data = response.demands;
        this.filteredData = response.demands;
        this.loading = false;
      }, error => {
        this.loading = false;
      });

    this.loadingTypes = true;
    this.typesApi.getTypes()
      .subscribe((resp: any) => {
        this.types = resp.types.map((element) => {
          return {
            id: element.id,
            text: element.name
          };
        });
        this.loadingTypes = false;
      }, error => {
        this.loadingTypes = false;
        console.log(error);
      });

    this.loadingWays = true;
    this.waysApi.getWays()
      .subscribe((resp: any) => {
        this.ways = resp.ways.map((element) => {
          return {
            id: element.id,
            text: element.name
          };
        });
        this.loadingWays = false;
      }, error => {
        this.loadingWays = false;
        console.log(error);
      });

    this.loadingAgencies = true;
    this.agenciesApi.getEntities()
      .subscribe((resp: any) => {
        this.agencies = resp.agencies.map((element) => {
          return {
            id: element.id,
            text: element.name
          };
        });
        this.loadingAgencies = false;
      }, error => {
        this.loadingAgencies = false;
        console.log(error);
      });

    this.loadingDemandCases = true;
    this.demandCasesApi.getDemandCases()
      .subscribe((resp: any) => {
        this.demandCases = resp.demand_cases.map((element) => {
          return {
            id: element.id,
            text: element.name
          };
        });
        this.loadingDemandCases = false;
      }, error => {
        this.loadingDemandCases = false;
        console.log(error);
      });

    this.loadingCpopulars = true;
    this.cpopularsApi.getCpopulars()
      .subscribe((resp: any) => {
        this.cpopulars = resp.cpopulars.map((element) => {
          return {
            id: element.id,
            text: element.name
          };
        });
        this.loadingCpopulars = false;
      }, error => {
        this.loadingCpopulars = false;
        console.log(error);
      });
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.drawer = false;
    this.validateForm.reset();
  }

  editDemand(element: any): void {
    this.drawerTitle = 'Modificar demanda';
    this.loading = false;
    const clone = _.cloneDeep(element);
    clone.tmp_phone = '';
    this.validateForm.setValue(clone);
    this.isEditMode = true;
    this.drawer = true;
  }

  deleteDemand(id: number): void {
    this.loading = true;
    this.demandsApi.deleteDemand(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  deleteSelection(): void {

  }

  addDemand(): void {
    this.drawerTitle = 'Nueva demanda';
    this.loading = false;
    this.isEditMode = false;
    this.drawer = true;
  }

  storeDemand(): void {
    this.loading = true;
    this.demandsApi.addDemand(this.validateForm.value)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
      });
  }

  updateDemand(): void {
    this.loading = true;
    this.demandsApi.updateDemand(this.validateForm.get('id').value, this.validateForm.value)
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

  onCurrentPageChanged(listOfCurrentPageData: Demand[]): void {
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
    if (column === 'is_anonymous') {
      const yes = search.toLowerCase() === 'si';
      if (search.length > 0) {
        this.filteredData = this.data.filter((item: Demand) => item[column] === yes);
      } else {
        this.filteredData = this.data;
      }
    }
    else {
      this.filteredData = this.data.filter((item: Demand) => {
        const result = _.get(item, column)?.indexOf(search);
        if (result === undefined && search.length > 0) {
          return false;
        }
        return result !== -1;
      });
    }
  }

  reset(): void {
    this.searchColumn.searchVisible = false;
    this.searchColumn.searchValue = '';
    this.searchValue = '';
    this.search();
  }

  /*addCpopularItem(input: HTMLInputElement): void {
    const value = input.value;
    const hasEntity = this.cpopulars.some((item: any) => item.text.indexOf(value) !== -1);
    if (!hasEntity) {
      this.cpopulars = [...this.cpopulars, {
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

  addContactItem(input: HTMLInputElement): void {
    const value = input.value;
    const hasEntity = this.contacts.some((item: any) => item.text.indexOf(value) !== -1);
    if (!hasEntity) {
      this.contacts = [...this.contacts, {
        id:         value,
        text:       value,
      }];
    }
  }

  addTypeItem(input: HTMLInputElement): void {
    const value = input.value;
    const hasEntity = this.types.some((item: any) => item.text.indexOf(value) !== -1);
    if (!hasEntity) {
      this.types = [...this.types, {
        id:         value,
        text:       value,
      }];
    }
  }
  */

  addWayItem(input: HTMLInputElement): void {
    const value = input.value;
    const hasEntity = this.ways.some((item: any) => item.text.indexOf(value) !== -1);
    if (!hasEntity) {
      this.ways = [...this.ways, {
        id:         value,
        text:       value,
      }];
    }
  }

  addAgencyItem(input: HTMLInputElement): void {
    const value = input.value;
    const hasEntity = this.agencies.some((item: any) => item.text.indexOf(value) !== -1);
    if (!hasEntity) {
      this.agencies = [...this.agencies, {
        id:         value,
        text:       value,
      }];
    }
  }

  addTopicItem(input: HTMLInputElement): void {
    const value = input.value;
    const hasEntity = this.topics.some((item: any) => item.text.indexOf(value) !== -1);
    if (!hasEntity) {
      this.topics = [...this.topics, {
        id:         value,
        text:       value,
      }];
    }
  }

}
