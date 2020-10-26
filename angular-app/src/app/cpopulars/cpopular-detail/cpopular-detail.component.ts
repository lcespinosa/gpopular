import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CpopularsService} from '../../core/services/api/cpopulars.service';
import {Cpopular} from '../../core/models/cpopulars';

@Component({
  selector: 'app-cpopular-detail',
  templateUrl: './cpopular-detail.component.html',
  styleUrls: ['./cpopular-detail.component.css']
})
export class CpopularDetailComponent implements OnInit {

  selected: Cpopular = {
    _id:        0,
    name:       '',
    code:       '',
    created_at: null,
    updated_at: null,
  };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private cpopularsApi: CpopularsService, private router: Router) { }

  ngOnInit() {
    this.getCpopularDetails(this.route.snapshot.params['id']);
  }

  getCpopularDetails(id: number) {
    this.cpopularsApi.getCpopular(id)
      .subscribe((response: any) => {
        this.selected = response.cpopular;
        console.log(this.selected);
        this.isLoadingResults = false;
      });
  }

  deleteCpopular(id: number) {
    this.isLoadingResults = true;
    this.cpopularsApi.deleteCpopular(id)
      .subscribe(result => {
        this.isLoadingResults = false;
        this.router.navigate(['/cpopulars']);
      });
  }
}
