import { Component, OnInit, Input } from '@angular/core'
import { StoreService } from 'src/app/services/store.service'
import { HttpService } from 'src/app/services/http.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {
  url = this.store.get('data', 'url')
  @Input() post
  edit = false

  constructor(private http: HttpService, public store: StoreService) {}

  onClick(action: string, target) {
    if (action === 'delete') {
      this.http[action](`${this.url.post + '/' + target._id}`)
    }

    if (action === 'put') {
      this.edit = !this.edit
    }
  }

  onEdit() {
    this.edit = !this.edit
  }

  ngOnInit() {}
}
