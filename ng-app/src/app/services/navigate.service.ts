import { StoreService } from './store.service'
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  url = this.store.get('data', 'url')

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: StoreService
  ) {}

  navigate(href) {
    this.router.navigate([href])
  }

  includeUrl(url: string) {
    return new RegExp(url).test(this.router.url)
  }

  getUrl() {
    return this.router
  }

  getQueryParam(param) {
    return this.route.snapshot.queryParams[param]
  }
}
