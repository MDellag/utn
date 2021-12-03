import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { style: 'width: 100%; height: 100vh !important;' },
})
export class HomeComponent implements OnInit {
  githubProfile!: any;

  constructor(private readonly http: RequestService) {}

  async ngOnInit(): Promise<void> {
    this.githubProfile = await this.http.getGithubData();
  }
}
