import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(/*private snackBar: MatSnackBar*/) { }

  // tslint:disable-next-line:typedef
    public openSnackBar(message: string) {
        /*this.snackBar.open(message, '', {
            duration: 5000
        });*/
    }
}
