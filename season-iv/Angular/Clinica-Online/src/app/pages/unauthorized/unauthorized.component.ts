import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss'],
  host: { class: 'error', style: 'width: 100%' },
})
export class UnauthorizedComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
