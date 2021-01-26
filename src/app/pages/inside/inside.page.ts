import { ProsesService } from './../../services/proses.service';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

// jwt
import { AuthService } from './../../services/auth.service';
import { Storage } from '@ionic/storage';
// import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';cd ..

@Component({
	selector: 'app-inside',
	templateUrl: './inside.page.html',
	styleUrls: [ './inside.page.scss' ]
})
export class InsidePage implements OnInit {
	data: Object;
	// bearerToken: any;

	constructor(
		// jwt
		private authService: AuthService,
		// private storage: Storage,
		private LoadingController: LoadingController,
		private ProsesService: ProsesService
	) {}

	async ngOnInit() {
		const loading = await this.LoadingController.create({
			message: 'Mengambil data...'
		});
		await loading.present();
		this.ProsesService.apiGet('/user').subscribe(
			(res) => {
				this.data = res['user'];
				console.log(res);

				loading.dismiss();
			},
			(err) => {
				loading.dismiss();

				// bobo: this.data = res['error'];
				// if (this.data === 'error') {
				// 	this.ProsesService.showAlert('You are not authorized for this!');
				// 	this.authService.logout();
				// }
			}
		);
	}

	logout() {
		this.authService.logout();
	}
}
