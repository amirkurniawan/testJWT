import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// for jwt
import { AuthGuardService } from './services/auth-guard.service';
// end jwt

const routes: Routes = [
	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule)
		// canDeactivate : [AuthGuardService]
	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginPageModule)
	},
	{
		path: 'inside',
		loadChildren: () => import('./pages/inside/inside.module').then((m) => m.InsidePageModule),
		canActivate: [ AuthGuardService ] // for jwt
	},
	{
		path: 'login2',
		loadChildren: () => import('./pages/login2/login2.module').then((m) => m.Login2PageModule)
	},
	{
		path: 'beranda',
		loadChildren: () => import('./pages/beranda/beranda.module').then((m) => m.BerandaPageModule),
		canActivate: [ AuthGuardService ] // for jwt
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
