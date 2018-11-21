import { StoreService } from './../../services/store.service'
import { HttpService } from './../../services/http.service'
import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, OnDestroy {
  public home = {}
  public href = this.store.get('data', 'href')

  constructor(public http: HttpService, public store: StoreService) {}

  ngOnInit() {
    this.store.createSubcription('locale', 'home', store => (this.home = store))
    this.http.initNavi()
  }

  ngOnDestroy() {
    this.store.destroySubscription()
  }
}
