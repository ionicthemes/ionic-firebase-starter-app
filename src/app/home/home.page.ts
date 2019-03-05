import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  items: Array<any>;
  loadingElement: any;

  constructor(
    public loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    if (this.route && this.route.data) {
      this.presentLoader();
      this.route.data.subscribe(routeData => {
        routeData['data'].subscribe(data => {
          this.dismissLoader();
          this.items = data;
        })
      })
    }
  }

  async presentLoader() {
    this.loadingElement = await this.loadingController.create({
      message: 'Loading ...'
    });

    await this.loadingElement.present();
  }

  async dismissLoader() {
    if (this.loadingElement) {
      await this.loadingElement.dismiss();
    }
  }

  logout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(["/login"]);
    }, err => {
      console.log(err);
    })
  }

}
