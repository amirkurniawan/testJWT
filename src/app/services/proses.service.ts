import { AuthService } from './auth.service';
import { AlertController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

const TOKEY_KEY = 'access_token';
//tetap di tambahkan

@Injectable({
	providedIn: 'root'
})
export class ProsesService {
	url = environment.url;

	constructor(
		private http: HttpClient,
		private alertCtrl: AlertController,
		private authService: AuthService
	) // private plt: Platform
	{
		// this.plt.ready().then(() => {
		// 	this.authService.checkToken();
		// });
	}

	showAlert(msg) {
		let alert = this.alertCtrl.create({
			message: msg,
			header: 'Error',
			buttons: [ 'Ok' ]
		});
		alert.then((alert) => alert.present());
	}

	showInfo(msg) {
		let alert = this.alertCtrl.create({
			message: msg,
			header: 'Info',
			buttons: [ 'Ok' ]
		});
		alert.then((alert) => alert.present());
	}

	showSuccess(msg) {
		let alert = this.alertCtrl.create({
			message: msg,
			header: 'OK',
			buttons: [ 'OK' ]
		});
		alert.then((alert) => alert.present());
	}

	apiGet(method) {
		return this.http.get(`${this.url}${method}`).pipe(
			catchError((e) => {
				if (e.status) {
					this.showAlert(e.error.message);
				} else {
					this.showAlert(e.message);
				}
				throw new Error(e);
			})
		);
	}
	// apiGet(method) {
	// 	return this.http.get(`${this.url}${method}`).pipe(
	// 		catchError((e) => {
	// 			let status = e.status;
	// 			if (status === 401) {
	// 				this.showAlert('You are not authorized for this!');
	// 				this.authService.logout();
	// 			}
	// 			throw new Error(e);
	// 		})
	// 	);
	// }

	apiPost(method, param) {
		return this.http.post(`${this.url}${method}`, param).pipe(
			tap((res) => {
				return res;
			}),
			catchError((e) => {
				if (e.status) {
					this.showAlert(e.error.message);
				} else {
					this.showAlert(e.message);
				}
				throw new Error(e);
			})
		);
	}
}
