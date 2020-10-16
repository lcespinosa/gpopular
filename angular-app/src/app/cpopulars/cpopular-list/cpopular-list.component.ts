import { Component, OnInit } from '@angular/core';
import {CpopularsService} from '../../core/services/api/cpopulars.service';
import {Cpopular} from '../../core/models/cpopulars';

@Component({
  selector: 'app-cpopular-list',
  templateUrl: './cpopular-list.component.html',
  styleUrls: ['./cpopular-list.component.css']
})
export class CpopularListComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  data: Cpopular[] = [];
  isLoadingResults = true;

  constructor(private cpopularsApi: CpopularsService) { }

  ngOnInit() {
    this.cpopularsApi.getCpopulars()
        .subscribe((response: any) => {
          this.data = response;
          console.log(this.data);
          this.isLoadingResults = false;
        }, error => {
          console.log(error);
          this.isLoadingResults = false;
        });
  }

}
