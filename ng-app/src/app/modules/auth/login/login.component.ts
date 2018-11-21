import { StoreService } from 'src/app/services/store.service'
import { HttpService } from 'src/app/services/http.service'
import { NavigateService } from 'src/app/services/navigate.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public url = this.store.get('data', 'url')
  public forget = false
  public reset = false
  public user

  constructor(
    private navi: NavigateService,
    private http: HttpService,
    private store: StoreService
  ) {}

  public onForgetEmiter() {
    this.forget = !this.forget
  }

  public onForget() {
    this.forget = false
  }

  public onReset() {
    this.reset = false
    this.navi.navigate('auth/login')
  }

  ngOnInit() {
    if (this.navi.getQueryParam('token')) {
      this.http
        .getForget(
          this.url.forget + '/' + this.navi.getQueryParam('token'),
          this.navi.getQueryParam('token')
        )
        .subscribe(
          response => (this.user = response),
          error => console.log(error)
        )
      this.reset = true
    }
  }
}
