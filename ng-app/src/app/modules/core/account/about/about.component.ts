import { Component, OnInit, OnDestroy } from '@angular/core'
import { HttpService } from 'src/app/services/http.service'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit, OnDestroy {
  public url = this.store.get('data', 'url')
  public about
  public show = false

  constructor(private http: HttpService, public store: StoreService) {}

  onClick() {
    this.show = !this.show
  }

  ngOnInit() {
    this.store.createSubcription('data', 'about', store => {
      this.about = store
    })
    this.http.get(this.url.about)
  }

  ngOnDestroy() {
    this.store.destroySubscription()
  }
}
