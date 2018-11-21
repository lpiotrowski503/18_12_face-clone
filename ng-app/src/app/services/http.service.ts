import { environment } from './../../environments/environment.node'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { StoreService } from './store.service'
import { NavigateService } from './navigate.service'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  token: string
  url = this.store.get('data', 'url')

  constructor(
    private http: HttpClient,
    private store: StoreService,
    private navi: NavigateService
  ) {}

  headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': this.getToken()
    })
  }

  get(url) {
    return this.http
      .get<{} | []>(`${environment.apiUrl}${url}`, {
        headers: this.headers()
      })
      .subscribe(response => this.res(response), error => this.res(error.error))
  }

  getForget(url, token) {
    return this.http.get<{}>(`${environment.apiUrl}${url}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token
      })
    })
  }

  post(url, data) {
    return this.http
      .post<{}>(`${environment.apiUrl}${url}`, data, {
        headers: this.headers()
      })
      .subscribe(response => this.res(response), error => this.res(error.error))
  }

  put(url, data) {
    return this.http
      .put<{}>(`${environment.apiUrl}${url}`, data, {
        headers: this.headers()
      })
      .subscribe(response => this.res(response), error => this.res(error.error))
  }

  delete(url) {
    return this.http
      .delete(`${environment.apiUrl}${url}`, {
        headers: this.headers()
      })
      .subscribe(response => this.res(response), error => this.res(error.error))
  }

  res(response) {
    console.log('responseService', response)
    if (response.invalidToken) {
      this.logout()
      this.navi.navigate('/auth/login')
    }
    if (response.post) this.get(this.url.posts)
    if (response.about) this.store.post('data', 'about', () => response.about)
    if (response.friends) {
      this.store.post('data', 'friends', () => response.friends.user.friends)
    }
    if (response.posts) this.store.post('data', 'posts', () => response.posts)
    if (response.signup) this.navi.navigate(`/auth/login`)
    if (response.token) {
      this.saveToken(response.token)
      this.get(this.store.store.data.url.about)
      if (!this.navi.includeUrl('app')) {
        this.navi.navigate(`/app`)
      }
    }
  }

  initNavi() {
    if (this.getToken()) this.navi.navigate('/app')
  }

  saveToken(token) {
    localStorage.setItem('x-auth-token', token)
  }

  getToken() {
    return localStorage.getItem('x-auth-token') || ''
  }

  logout() {
    localStorage.removeItem('x-auth-token')
  }
}
