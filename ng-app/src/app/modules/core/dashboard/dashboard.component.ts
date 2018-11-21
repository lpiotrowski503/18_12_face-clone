import { HttpService } from './../../../services/http.service'
import { StoreService } from './../../../services/store.service'
import { Component, OnInit, OnDestroy } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnDestroy {
  url = this.store.get('data', 'url')
  posts
  show = false

  constructor(private http: HttpService, public store: StoreService) {}

  onClick() {
    this.show = !this.show
  }

  ngOnInit() {
    this.store.createSubcription('data', 'posts', store => {
      this.posts = store
    })
    this.http.get(this.url.posts)
  }

  ngOnDestroy() {
    this.store.destroySubscription()
  }
}
