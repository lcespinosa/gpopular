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
import {ReplyService} from '../../../../core/services/api/reply.service';
import {FunctionaryService} from '../../../../core/services/api/functionary.service';
import {ReasonTypeService} from '../../../../core/services/api/reason-type.service';
import {ResultService} from '../../../../core/services/api/result.service';

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
  validateReplyForm!: FormGroup;
  isEditMode: boolean;
  isReplyEditMode: boolean;
  drawer: boolean;
  replyDrawer: boolean;
  drawerTitle: string;
  replyDrawerTitle: string;
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
      sortFn: (a: Demand, b: Demand) => {
        const compare = a.reception_date === b.reception_date ? 0
          : a.reception_date > b.reception_date ? 1 : -1;
        return compare;
      },
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
    {
      name: 'Organismo',
      sortOrder: null,
      sortFn: (a: Demand, b: Demand) => a.topic.agency.name.localeCompare(b.topic.agency.name),
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

  functionaries: [];
  loadingFunctionaries: boolean;
  reasonTypes: [];
  loadingReasonTypes: boolean;
  results: [];
  loadingResult: boolean;

  constructor(private demandsApi: DemandsService,
              private repliesApi: ReplyService,
              private typesApi: TypesService,
              private waysApi: WayService,
              private cpopularsApi: CpopularsService,
              private agenciesApi: EntityService,
              private demandCasesApi: DemandCaseService,
              private streetsApi: StreetService,
              private contactsApi: ContactsService,
              private topicsApi: TopicService,
              private functionariesApi: FunctionaryService,
              private reasonTypesApi: ReasonTypeService,
              private resultsApi: ResultService,
              private fb: FormBuilder,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${environment.appName} - Casos`);
    this.createForm();

    this.cancelEdit();
    this.cancelReplyEdit();
    this.updateList();
    this.onChange();
  }

  createForm(): void {
    this.isEditMode = false;
    this.isReplyEditMode = false;
    this.validateForm = this.fb.group({
      id:           [null, [Validators.nullValidator]],
      page:         [null, [Validators.required]],
      number:       [null, [Validators.required]],
      expedient:    [null, [Validators.nullValidator]],
      reception_date: [null, [Validators.required]],
      content:      [null, [Validators.required]],
      is_anonymous: [null, [Validators.nullValidator]],

      type:         [null, [Validators.nullValidator]],
      type_id:      [null, [Validators.required]],
      cpopular:     [null, [Validators.nullValidator]],
      cpopular_id:  [null, [Validators.nullValidator]],
      street:       [null, [Validators.nullValidator]],
      street_id:    [null, [Validators.nullValidator]],
      contact:      [null, [Validators.nullValidator]],
      contact_id:   [null, [Validators.nullValidator]],
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

    this.validateReplyForm = this.fb.group({
      id: [null, [Validators.nullValidator]],
      description: [null, [Validators.required]],
      accepted: [null, [Validators.required]],
      send_date: [null, [Validators.nullValidator]],
      reply_date: [null, [Validators.nullValidator]],

      reason_type_id: [null, [Validators.required]],
      result_id: [null, [Validators.required]],
      functionary_id: [null, [Validators.required]],
      demand_id: [null, [Validators.required]],
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

    this.validateForm.get('type_id').valueChanges.subscribe(value => {
      if (value === 3) {
        this.validateForm.get('demand_case_id').enable();
      }
      else {
        this.validateForm.get('demand_case_id').disable();
      }
    });

    this.validateForm.get('agency_id').valueChanges.subscribe(value => {
      if (this.topics.length > 0) {
        this.validateForm.patchValue({topic_id: null}, {emitEvent: true});
      }
      this.topics = [];
      if (isNaN(value)) {
      } else if (value != null) {
        this.validateForm.get('topic_id').enable();
        this.loadingTopics = true;
        this.agenciesApi.getTopics(value)
          .subscribe((resp: any) => {
            this.topics = resp.topics.map((element) => {
              return {
                id: element.code,
                text: element.name
              };
            });
            this.loadingTopics = false;
          }, error => {
            this.loadingTopics = false;
            console.log(error);
          });
      }
      else {
        this.validateForm.get('topic_id').disable();
      }
    });

    this.validateReplyForm.get('demand_id').valueChanges.subscribe(value => {
      if (isNaN(value) || !value) {
      } else {
        this.loadingFunctionaries = true;
        this.agenciesApi.getFunctionaries(value)
          .subscribe((resp: any) => {
            this.functionaries = resp.functionaries.map((element) => {
              return {
                id: element.id,
                text: element.name
              };
            });
            this.loadingFunctionaries = false;
          }, error => {
            this.loadingFunctionaries = false;
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
      .subscribe((response: Demand[]) => {
        this.data = response;
        this.filteredData = response;
        console.log(response);
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
        this.validateForm.get('type_id').setValue(2);
      }, error => {
        this.loadingTypes = false;
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
        this.validateForm.get('topic_id').disable();
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

    this.loadingReasonTypes = true;
    this.reasonTypesApi.getReasonTypes()
      .subscribe((resp: any) => {
        this.reasonTypes = resp.reason_types.map((element) => {
          return {
            id: element.id,
            text: element.name
          };
        });
        this.loadingReasonTypes = false;
      }, error => {
        this.loadingReasonTypes = false;
        console.log(error);
      });

    this.loadingResult = true;
    this.resultsApi.getResults()
      .subscribe((resp: any) => {
        this.results = resp.results.map((element) => {
          return {
            id: element.id,
            text: element.name
          };
        });
        this.loadingResult = false;
      }, error => {
        this.loadingResult = false;
        console.log(error);
      });
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.drawer = false;
    this.validateForm.reset();
  }

  editDemand(element: any): void {
    this.drawerTitle = 'Modificar caso';
    this.loading = false;
    const clone = _.cloneDeep(element);
    clone.tmp_phone = '';
    const strDate = element.reception_date.replaceAll('-', '/');
    const split = strDate.split('/');
    clone.reception_date = new Date(split[2], split[1] - 1, split[0]);
    this.validateForm.patchValue(clone);
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
    this.drawerTitle = 'Nuevo caso';
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

  addCpopularItem(input: HTMLInputElement): void {
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

  /*addTypeItem(input: HTMLInputElement): void {
    const value = input.value;
    const hasEntity = this.types.some((item: any) => item.text.indexOf(value) !== -1);
    if (!hasEntity) {
      this.types = [...this.types, {
        id:         value,
        text:       value,
      }];
    }
  }*/

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

  addReply(element: any): void {
    this.replyDrawerTitle = 'Agregar respuesta';
    this.loading = false;
    this.validateReplyForm.patchValue({demand_id: element.id}, {emitEvent: true});
    this.isReplyEditMode = false;
    this.replyDrawer = true;
  }

  cancelReplyEdit(): void {
    this.isReplyEditMode = false;
    this.replyDrawer = false;
    this.validateReplyForm.reset();
  }

  editReply(element: any): void {
    this.replyDrawerTitle = 'Modificar respuesta';
    this.loading = false;
    const clone = _.cloneDeep(element);
    let split;
    let strDate = element.send_date?.replaceAll('-', '/');
    if (strDate) {
      split = strDate.split('/');
      clone.send_date = new Date(split[2], split[1] - 1, split[0]);
    }
    if (strDate) {
      strDate = element.reply_date?.replaceAll('-', '/');
      split = strDate.split('/');
      clone.reply_date = new Date(split[2], split[1] - 1, split[0]);
    }
    this.validateReplyForm.patchValue(clone);
    this.isReplyEditMode = true;
    this.replyDrawer = true;
  }

  onReplySubmit(): void {
    if (this.isReplyEditMode) {
      this.updateReply();
    } else {
      this.storeReply();
    }
    this.cancelReplyEdit();
  }

  storeReply(): void {
    this.loading = true;
    this.repliesApi.addReply(this.validateReplyForm.value)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
      });
  }

  updateReply(): void {
    this.loading = true;
    this.repliesApi.updateReply(this.validateReplyForm.get('id').value, this.validateReplyForm.value)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
      });
  }

  deleteReply(id: number): void {
    this.loading = true;
    this.repliesApi.deleteReply(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  disabledReplyDate = (current: Date): boolean => {
    // Can not select days before today and today
    const sendDate = this.validateReplyForm.get('send_date').value;
    console.log(sendDate, current);
    return true;
  }
}
