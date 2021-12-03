import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  constructor(private router: Router, private audio: AudioService) {}

  ngOnInit() {
    setTimeout(() => {
      this.audio.play('long');
      this.router.navigate(['login']);
    }, 4000);
  }
}
