import { Component, OnInit, ViewChild } from '@angular/core';
import {TopicService} from '../../core/services/api/topic.service';
import {Topic} from '../../core/models/topic';
import {NgForm} from '@angular/forms';
import * as _ from 'lodash';
import {Entity} from '../../core/models/entity';
import {EntityService} from '../../core/services/api/entity.service';
import {Select2OptionData} from 'ng-select2';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'code', 'has_resources', 'agency', 'actions'];
  data: Topic[] = [];
  entities: Array<Select2OptionData>;
  loading: boolean;

  @ViewChild('topicForm', { static: false })
    topicForm: NgForm;
  topicData: Topic = {
    id:         0,
    name:       '',
    code:       '',
    has_resources: false,
    agency:     null,
    agency_id:  null,
    created_at: null,
    updated_at: null,
  };
  isEditMode: boolean;
  options = {
    theme: 'mat',
    allowClear: true,
    tags: true
  };

  constructor(private topicsApi: TopicService, private entityApi: EntityService) { }

  ngOnInit() {
    this.isEditMode = false;

    this.loading = true;
    this.entityApi.getEntities()
      .subscribe((response: any) => {
        this.entities = response.agencies.map((element) => {
          return {
            id: element.id,
            text: element.name
          };
        });
        console.log(this.entities);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });

    this.updateList();
  }

  updateList() {
    this.loading = true;
    this.topicsApi.getTopics()
      .subscribe((response: any) => {
        this.data = response.topics;
        console.log(this.data);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
  }

  editTopic(element: any) {
    this.loading = false;
    this.topicData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.topicForm.resetForm();
    this.topicData = {
      id:         0,
      name:       '',
      code:       '',
      has_resources: false,
      agency:     null,
      agency_id:  null,
      created_at: null,
      updated_at: null,
    };
  }

  deleteTopic(id: number) {
    this.loading = true;
    this.topicsApi.deleteTopic(id)
      .subscribe(result => {
        this.loading = false;
        this.updateList();
      });
  }

  addTopic() {
    this.loading = true;
    this.topicsApi.addTopic(this.topicData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();
        this.topicForm.resetForm();
      });
  }

  updateTopic() {
    this.loading = true;
    this.topicsApi.updateTopic(this.topicData.id, this.topicData)
      .subscribe((response) => {
        this.loading = false;
        this.updateList();

        this.cancelEdit();
      });
  }

  onSubmit() {
    if (this.topicForm.form.valid) {
      if (this.isEditMode) {
        this.updateTopic();
      } else {
        this.addTopic();
      }
    } else {
      console.log('Enter valid data!');
    }
  }

  changedEntity(e: any): void {
    if (e && e.length > 0) {
      this.topicData.agency_id = e;
    }
  }
}
