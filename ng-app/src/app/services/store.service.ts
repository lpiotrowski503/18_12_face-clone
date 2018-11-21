import { Injectable } from '@angular/core'
import { Subject, Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public store = {
    locale: {
      home: {
        header: 'Witaj w aplikacji Facebook-clone',
        link: {
          login: 'Logowanie',
          signup: 'Rejestracja'
        }
      },
      form: {
        label: {
          email: 'Email',
          nick: 'Nick',
          password: 'Hasło',
          confirmPassword: 'Powtórz hasło',
          title: 'Tytuł',
          article: 'Treść'
        },
        submit: {
          login: 'Zaloguj',
          signup: 'Zarejestruj',
          about: 'Wyślij',
          post: 'Wyślij',
          cancel: 'Anuluj',
          forgetBtn: 'Zapomniałem hasła',
          forget: 'Resetuj hasło',
          reset: 'Nowe hasło'
        }
      },
      errors: {}
    },
    data: {
      href: {
        home: '/',
        login: '/auth/login',
        signup: '/auth/signup',
        dashboard: '/app/dashboard',
        messages: '/app/messages',
        account: '/app/account'
      },
      url: {
        login: '/auth/login',
        forget: '/auth/login/forget',
        reset: '/auth/login/forget',
        signup: '/auth/signup',
        post: '/dashboard/post',
        posts: '/dashboard/posts',
        about: '/account/about',
        friends: '/account/friends',
        photos: '/account/photos'
      },
      name: {
        email: 'email',
        nick: 'nick',
        password: 'password',
        confirmPassword: 'confirmPassword',
        title: 'title',
        article: 'article'
      },
      condition: {
        login: type => type === 'login',
        forget: type => type === 'forget',
        reset: type => type === 'reset',
        signup: type => type === 'signup',
        post: type => type === 'post',
        about: type => type === 'about'
      },
      posts: [],
      account: {},
      about: {},
      friends: [],
      photos: 'photos'
    }
  }

  private storeSubcription: Subscription
  private storeSubject = new Subject()

  constructor() {}

  public createSubcription(parent: string, child: string, callback: Function) {
    this.storeSubcription = this.storeSubject.subscribe(data => {
      callback(data[parent][child])
    })
    this.emit()
  }

  public destroySubscription() {
    this.storeSubcription.unsubscribe()
  }

  public emit() {
    this.storeSubject.next(this.store)
  }

  public post(parent: string, child: string, callback: Function) {
    this.store[parent][child] = callback()
    this.emit()
  }

  public get(parent: string, child: string) {
    return this.store[parent][child]
  }
}
