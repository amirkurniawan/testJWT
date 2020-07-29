import { Injectable } from '@angular/core';

// for jwt
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertController } from '@ionic/angular';
// end jwt



@Injectable({
  providedIn: 'root'
})
// export class AuthGuardService {

//   constructor() { }
// }


// for jwt
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public alertCtrl: AlertController) {}

  canActivate(): boolean {
    // return this.auth.isAuthenticated();

    let allowed =  this.auth.isAuthenticated();
    if (allowed) {
      return true
    }
    else {
      this.alertCtrl.create({
        header: 'Belum Login',
        message: 'Untuk menggunakan fitur ini, Anda harus login',
        buttons: ['OK']
      }).then(alert => alert.present());
      return false;
    }
  }
}
// end jwt
