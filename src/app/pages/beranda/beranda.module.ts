import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BerandaPageRoutingModule } from './beranda-routing.module';

import { BerandaPage } from './beranda.page';

import { SuperTabsModule } from '@ionic-super-tabs/angular';

// page yang mau di input
import { HomePageModule } from './../../home/home.module';
import { InsidePageModule } from './../inside/inside.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		BerandaPageRoutingModule,
		SuperTabsModule,
		HomePageModule,
		InsidePageModule
	],
	declarations: [ BerandaPage ]
})
export class BerandaPageModule {}
