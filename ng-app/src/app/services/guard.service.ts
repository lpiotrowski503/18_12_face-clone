import { NavigateService } from 'src/app/services/navigate.service'
import { HttpService } from './http.service'
import { Injectable } from '@angular/core'
import { CanLoad } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanLoad {
  constructor(private http: HttpService, private navi: NavigateService) {}

  canLoad() {
    if (this.http.getToken()) return true
    this.navi.navigate('/')
    return false
  }
}
