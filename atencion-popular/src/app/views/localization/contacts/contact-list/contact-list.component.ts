import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Contact} from '../../../../core/models/contact';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzDrawerPlacement} from 'ng-zorro-antd/drawer';
import {SearchableColumnItem} from '../../../../core/interfaces/searchable_column_item';
import {Title} from '@angular/platform-browser';
import * as _ from 'lodash';
import {ContactsService} from '../../../../core/services/api/contacts.service';
import {environment} from '../../../../../environments/environment';
import {Street} from '../../../../core/models/street';
import {CpopularsService} from '../../../../core/services/api/cpopulars.service';
import {StreetService} from '../../../../core/services/api/street.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less']
})
export class ContactListComponent implements OnInit {

  @ViewChild('tagInputElement', { static: false }) tagInputElement?: ElementRef;

  data: Contact[] = [];
  filteredData: Contact[] = [];
  listOfCurrentPageData: Contact[] = [];
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
      sortFn: (a: Contact, b: Contact) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'name',
      priority: 1,
    },
    {
      name: 'Apellidos',
      sortOrder: null,
      sortFn: (a: Contact, b: Contact) => a.last_name.localeCompare(b.last_name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'last_name',
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
    {
      name: 'Calle',
      sortOrder: null,
      sortFn: (a: Contact, b: Contact) => a?.address?.street?.name?.localeCompare(b?.address?.street?.name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'address.street.name',
      priority: 2,
    },
    {
      name: 'Consejo popular',
      sortOrder: null,
      sortFn: (a: Contact, b: Contact) => a?.address?.street?.cpopular?.name?.localeCompare(b?.address?.street?.cpopular?.name),
      sortDirections: ['ascend', 'descend'],
      searchable: true,
      searchVisible: false,
      searchValue: '',
      data: 'address.street.cpopular.name',
      priority: 2,
    },
  ];
  searchValue: string;
  searchColumn: SearchableColumnItem;
  cpopulars = [];
  streets = [];
  loadingStreets: boolean;
  loadingCpopulars: boolean;

  get Tags(): [] {
    return this.validateForm.get('phones').value || [];
  }

  constructor(private contactsApi: ContactsService,
              private cpopularsApi: CpopularsService,
              private streetsApi: StreetService,
              private fb: FormBuilder,
              private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(`${environment.appName} - Contactos`);
    this.createForm();

    this.cancelEdit();
    this.updateList();
    this.onChange();
  }

  createForm(): void {
    this.isEditMode = false;
    this.validateForm = this.fb.group({
      id:           [null, [Validators.nullValidator]],
      name:         [null, [Validators.required]],
      last_name:    [null, [Validators.nullValidator]],
      phones:       [null, [Validators.nullValidator]],
      tmp_phone:    [null, [Validators.nullValidator]],
      anonymous:    [null, [Validators.nullValidator]],
      created_at:   [null, [Validators.nullValidator]],
      updated_at:   [null, [Validators.nullValidator]],
      cpopular_id:  [null, [Validators.required]],
      street_id:    [null, [Validators.required]],
      address:      this.fb.group({
        id:           [null, [Validators.nullValidator]],
        building:     [null, [Validators.nullValidator]],
        apartment:    [null, [Validators.nullValidator]],
        number:       [null, [Validators.nullValidator]],
        created_at:   [null, [Validators.nullValidator]],
        updated_at:   [null, [Validators.nullValidator]],
      })
    });
  }

  onChange(): void {
    this.validateForm.get('cpopular_id').valueChanges.subscribe(value => {
      if (this.streets.length > 0) {
        this.validateForm.patchValue({street_id: null}, {emitEvent: false});
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
            console.log(error);
          });
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateContact();
    } else {
      this.storeContact();
    }
    this.cancelEdit();
  }

  updateList(): void {
    this.loading = true;
    this.loadingStreets = true;
    this.loadingCpopulars = true;
    this.contactsApi.getContacts()
      .subscribe((response: any) => {
        this.data = response.contacts;
        this.filteredData = response.contacts;
        this.loading = false;
        this.cpopularsApi.getCpopulars()
          .subscribe((resp: any) => {
            this.cpopulars = resp.cpopulars.map((element) => {
              return {
                id: element.id,
                text: element.name
              };
            });
            this.loadingStreets = false;
            this.loadingCpopulars = false;
          }, error => {
            console.log(error);
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

  editContact(element: any): void {
    this.drawerTitle = 'Modificar contacto';
    this.loading = false;
    element = _.cloneDeep(element);
    element.address = element.address || {
      id:           null,
      building:     null,
      apartment:    null,
      number:       null,
      created_at:   null,
      updated_at:   null,
    };
    this.validateForm.patchValue(element);
    this.validateForm.patchValue({
      cpopular_id: element?.address?.street?.cpopular?.id,
      street_id: element?.address?.street?.id,
    });

    this.isEditMode = true;
    this.drawer = true;
  }

  deleteContact(id: number): void {
    this.loading = true;
    this.contactsApi.deleteContact(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  deleteSelection(): void {

  }

  addContact(): void {
    this.drawerTitle = 'Nuevo contacto';
    this.loading = false;
    this.isEditMode = false;
    this.drawer = true;
  }

  storeContact(): void {
    this.loading = true;
    this.contactsApi.addContact(this.validateForm.value)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
      });
  }

  updateContact(): void {
    this.loading = true;
    this.contactsApi.updateContact(this.validateForm.get('id').value, this.validateForm.value)
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

  onCurrentPageChanged(listOfCurrentPageData: Contact[]): void {
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
    this.filteredData = this.data.filter((item: Contact) => {
      const result = _.get(item, column)?.indexOf(search);
      if (result === undefined && search.length > 0) {
        return false;
      }
      return result !== -1;
    });
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
}
