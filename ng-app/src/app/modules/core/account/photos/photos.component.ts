import { Component, OnInit, OnDestroy } from '@angular/core'
import { HttpService } from 'src/app/services/http.service'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.sass']
})
export class PhotosComponent implements OnInit, OnDestroy {
  url = this.store.get('data', 'url')
  photos

  constructor(private http: HttpService, public store: StoreService) {}

  ngOnInit() {
    this.store.createSubcription('data', 'photos', store => {
      this.photos = store
    })
    this.http.get(this.url.photos)
  }

  ngOnDestroy() {
    this.store.destroySubscription()
  }
}
