import { Component, OnInit } from '@angular/core';

// jwt
import { AuthService } from './../../services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {

  constructor(
    // jwt
    private authService: AuthService, private storage: Storage
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
