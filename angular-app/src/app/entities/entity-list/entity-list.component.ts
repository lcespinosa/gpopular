import {Component, OnInit, ViewChild} from '@angular/core';
import {Cpopular} from '../../core/models/cpopulars';
import {Entity} from '../../core/models/entity';
import {NgForm} from '@angular/forms';
import {EntityService} from '../../core/services/api/entity.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.css']
})
export class EntityListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'description', 'phones', 'actions'];
  data: Entity[] = [];
  loading: boolean;

  @ViewChild('entityForm', { static: false })
  entityForm: NgForm;
  entityData: Entity = {
    id:         0,
    name:       '',
    code:       '',
    description: '',
    phones:     '',
    created_at: null,
    updated_at: null,
  };
  isEditMode: boolean;

  constructor(private entityApi: EntityService) { }

  ngOnInit() {
    this.isEditMode = false;
    this.updateList();
  }

  updateList() {
    this.loading = true;
    this.entityApi.getEntities()
      .subscribe((response: any) => {
        this.data = response.agencies;
        console.log(this.data);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
  }

  editEntity(element: any) {
    this.loading = false;
    this.isEditMode = true;
    this.entityData = _.cloneDeep(element);
  }

  cancelEdit() {
    this.isEditMode = false;
    this.entityForm.resetForm();
  }

  deleteEntity(id: number) {
    this.loading = true;
    this.entityApi.deleteEntity(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  addEntity() {
    this.loading = true;
    this.entityApi.addEntity(this.entityData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
        this.entityForm.resetForm();
      });
  }

  updateEntity() {
    this.loading = true;
    this.entityApi.updateEntity(this.entityData.id, this.entityData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();

        this.cancelEdit();
      });
  }

  onSubmit() {
    if (this.entityForm.form.valid) {
      if (this.isEditMode) {
        this.updateEntity();
      } else {
        this.addEntity();
      }
    } else {
      console.log('Enter valid data!');
    }
  }
}
