import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  currentUser: any;
  noData = true;

  constructor(private notificationService: NzNotificationService,
              private authService: AuthenticationService,
              private titleService: Title,
              private logger: NGXLogger) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.titleService.setTitle(`${environment.appName} - Mural`);
    this.logger.log('Dashboard loaded');

    setTimeout(() => {
      this.notificationService.info('Hola', `Bienvenid@ otra vez ${this.currentUser.fullName}. ¿Por dónde empezamos?`);
    });
  }

  onBack(): void {
    console.log('back!');
  }
}
