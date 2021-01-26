import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// fitur jwt
import { HttpClientModule } from '@angular/common/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

// swipeable-tab
import { SuperTabsModule } from '@ionic-super-tabs/angular';

export function jwtOptionsFactory(storage) {
	return {
		tokenGetter: () => {
			return storage.get('access_token');
		},
		// whitelistedDomains: ['pajak.virtual-indo.com']
		// whitelistedDomains: [ 'http://laravel-api.wik' ]
		allowedDomains: [ 'laravel-api.wik' ]
	};
}

@NgModule({
	declarations: [ AppComponent ],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		// add imports for jwt
		HttpClientModule,
		// IonicStorageModule
		// 	.forRoot
		// 	//   {
		// 	// 	name: '_mydb',
		// 	// 	driverOrder: [ 'indexeddb', 'sqlite', 'websql' ]
		// 	// }
		// 	(),
		IonicStorageModule.forRoot(),
		JwtModule.forRoot({
			jwtOptionsProvider: {
				provide: JWT_OPTIONS,
				useFactory: jwtOptionsFactory,
				deps: [ Storage ]
			}
		}), // end import jwt
		SuperTabsModule.forRoot() // for swipeable-tab
	],
	providers: [ StatusBar, SplashScreen, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy } ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
