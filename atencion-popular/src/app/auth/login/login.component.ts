import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../core/services/auth.service';
import {Title} from '@angular/platform-browser';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  loading: boolean;

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(private fb: FormBuilder,
              private router: Router,
              private titleService: Title,
              private notificationService: NzNotificationService,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.titleService.setTitle(`${environment.appName} - Acceso`);
    this.authenticationService.logout();
    this.createForm();
  }

  private createForm(): void {
    this.loading = false;
    const savedUsername = localStorage.getItem('savedUsername');

    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  login(): void {
    const username = this.validateForm.get('userName').value;
    const password = this.validateForm.get('password').value;
    const rememberMe = this.validateForm.get('remember').value;

    this.loading = true;
    this.authenticationService
      .login(username.toLowerCase(), password)
      .subscribe(
        data => {
          if (rememberMe) {
            localStorage.setItem('savedUsername', username);
          } else {
            localStorage.removeItem('savedUsername');
          }
          this.router.navigate(['/']);
        },
        error => {
          this.notificationService.error('¡Error!', 'Ha ocurrido un error, vuelva a intentarlo.');
          this.loading = false;
        }
      );
  }

  /*resetPassword() {
    this.router.navigate(['/auth/password-reset-request']);
  }*/
}
