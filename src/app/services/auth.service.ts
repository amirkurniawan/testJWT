import { Injectable } from '@angular/core';

// import for jwt
import { Platform, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
// end import for jwt

// for router
import { Router } from '@angular/router';
// end router

// const for jwt
const TOKEN_KEY = 'access_token';
const EMAIL = 'EMAIL';
// end cost for jwt

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	// for jwt

	url = environment.url;
	user = null;
	authenticationState = new BehaviorSubject(false);
	// token_key = TOKEN_KEY;
	// end for jwt

	constructor(
		// for jwt
		private http: HttpClient,
		private helper: JwtHelperService,
		private storage: Storage,
		private plt: Platform,
		private alertController: AlertController,
		// end for jwt

		// for router
		private router: Router // end router
	) {
		// for jwt
		this.plt.ready().then(() => {
			this.checkToken();
		});
		// end jwt
	}

	// check token jwt
	checkToken() {
		this.storage.get(TOKEN_KEY).then((token) => {
			if (token) {
				let decoded = this.helper.decodeToken(token);
				let isExpired = this.helper.isTokenExpired(token);

				if (!isExpired) {
					this.user = decoded;
					this.authenticationState.next(true);
				} else {
					this.storage.remove(TOKEN_KEY);
				}
			}
		});
	}
	// end check token jwt

	// function
	// register(credentials) {
	//   return this.http.post(`${this.url}/api/register`, credentials).pipe(
	//     catchError(e => {
	//       this.showAlert(e.error.msg);
	//       throw new Error(e);
	//     })
	//   );
	// }

	login(credentials) {
		return this.http.post(`${this.url}/login`, credentials).pipe(
			tap((res) => {
				this.storage.set(TOKEN_KEY, res['token']);
				// this.storage.set(TOKEN_KEY, 'Bearer ' + res['token']);
				this.storage.set(EMAIL, res['data']['email']);
				this.storage.set('NAME', res['data']['name']);
				this.user = this.helper.decodeToken(res['token']);
				this.authenticationState.next(true);
			}),
			catchError((e) => {
				this.showAlert(e.error.msg);
				throw new Error(e);
			})
		);
	}

	logout() {
		this.storage.remove(TOKEN_KEY).then(() => {
			this.authenticationState.next(false);
			this.router.navigate([ 'login' ]);
		});
	}

	// getSpecialData() {
	//   return this.http.get(`${this.url}/api/special`).pipe(
	//     catchError(e => {
	//       let status = e.status;
	//       if (status === 401) {
	//         this.showAlert('You are not authorized for this!');
	//         this.logout();
	//       }
	//       throw new Error(e);
	//     })
	//   );
	// }

	isAuthenticated() {
		return this.authenticationState.value;
	}

	showAlert(msg) {
		let alert = this.alertController.create({
			message: msg,
			header: 'Error',
			buttons: [ 'OK' ]
		});
		alert.then((alert) => alert.present());
	}
}
