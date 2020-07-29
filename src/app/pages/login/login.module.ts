import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// jwt and routes
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// jwt and routes


import { IonicModule } from '@ionic/angular';

// import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

// routes
const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];
// end routes 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // LoginPageRoutingModule

    // form login jwt and routes
    ReactiveFormsModule,
    RouterModule.forChild(routes)
    // form login jwt routes
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
