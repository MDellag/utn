import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private plat: Platform) {
    // SplashScreen.show({
    //   autoHide: true,
    //   showDuration: 3000,
    // });
    this.InitializeApp();
  }

  InitializeApp() {
    this.plat.ready().then(() => {
      SplashScreen.hide();
      this.router.navigate(['']);
    });
  }
}
