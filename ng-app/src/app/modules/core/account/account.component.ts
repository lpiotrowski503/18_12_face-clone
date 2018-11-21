import { Component, OnInit } from '@angular/core'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {
  url = this.store.get('data', 'url')
  logout = {
    logout: true
  }
  show = false

  constructor(public store: StoreService) {}

  onClick() {
    this.show = !this.show
  }

  ngOnInit() {}
}
