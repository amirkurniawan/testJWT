import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// jwt
import { AuthService } from './services/auth.service';
// end jwt

// routes
import { Router } from '@angular/router';
// end routes

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    // jwt and routes
    private authService: AuthService,
    private router: Router
    // end jwt and routes

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // jwt and routes
      this.authService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['inside']);
        } else {
          this.router.navigate(['login']);
        }
      });
      // end jwt and routes
    });
  }
}
