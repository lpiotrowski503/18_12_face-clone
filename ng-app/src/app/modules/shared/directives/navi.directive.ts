import { HttpService } from './../../../services/http.service'
import { NavigateService } from './../../../services/navigate.service'
import { Directive, HostListener, Input } from '@angular/core'

@Directive({
  selector: '[navi]'
})
export class NaviDirective {
  @Input() navi

  constructor(private navigate: NavigateService, private http: HttpService) {}

  @HostListener('click', ['$event'])
  onNavi() {
    if (typeof this.navi === 'string') this.navigate.navigate(this.navi)
    if (typeof this.navi === 'object' && this.navi.logout)
      this.http.logout(), this.navigate.navigate('/')
  }
}
