import { Component, OnInit, OnDestroy } from '@angular/core'
import { HttpService } from 'src/app/services/http.service'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.sass']
})
export class FriendsComponent implements OnInit, OnDestroy {
  url = this.store.get('data', 'url')
  friends

  constructor(private http: HttpService, public store: StoreService) {}

  ngOnInit() {
    this.store.createSubcription('data', 'friends', store => {
      this.friends = store
    })
    this.http.get(this.url.friends)
  }

  ngOnDestroy() {
    this.store.destroySubscription()
  }
}
