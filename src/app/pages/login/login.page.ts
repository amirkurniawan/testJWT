import { Component, OnInit } from '@angular/core';

// form login
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// jwt
import { AuthService } from '../../services/auth.service';

// add plugins
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // form login
  credentialsForm: FormGroup;

  constructor(
    // form
    private formBuilder: FormBuilder,
    // jwt
    private authService: AuthService,
    // add plugins
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    // function login
    this.credentialsForm = this.formBuilder.group({
      npwpd: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // function submit
  async onSubmit() {
    let loading = await this.loadingCtrl.create({
      message : 'wait a moment'
    });
    await loading.present();

    this.authService.login(this.credentialsForm.value).subscribe(
      async res => {
        loading.dismiss();
        let alert = await this.alertCtrl.create({
          header: 'Welcome',
          message: res['user']['name'],
          buttons: ['OK']
        });
        alert.present();
        this.router.navigate(['inside']);
      },
      async err => {
        loading.dismiss();
      }
    );

  }

  // register() {
  //   this.authService.register(this.credentialsForm.value).subscribe(res => {
  //     // Call Login to automatically login the new user
  //     this.authService.login(this.credentialsForm.value).subscribe();
  //   });
  // }

}
