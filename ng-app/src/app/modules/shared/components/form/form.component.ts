import { StoreService } from './../../../../services/store.service'
import { HttpService } from './../../../../services/http.service'
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

interface Ipost {
  _id: string
  title: string
  article: string
  author: string
  editable: boolean
  date: Date
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit, OnDestroy {
  @Input() public type = 'login'
  @Input() public edit: Ipost

  public form
  public name = this.store.get('data', 'name')
  public condition = this.store.get('data', 'condition')
  public url = this.store.get('data', 'url')
  public reactiveForm: FormGroup

  private patterns = {
    email: /^([a-z\d.-_]+)@([a-z\d-_]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    nick: /^\w{1,20}$/,
    password: /^(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])\w{8,20}$/,
    confirmPassword: /^(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])\w{8,20}$/,
    title: /^\w{1,20}$/,
    article: /^\w{1,200}$/
  }

  @Output() public submit = new EventEmitter<boolean>()
  @Output() public cancel = new EventEmitter<boolean>()
  @Output() public forgetEmiter = new EventEmitter<boolean>()

  private formControls = {
    email: () => {
      return new FormControl(null, [
        Validators.pattern(this.patterns.email),
        Validators.required
      ])
    },
    nick: () => {
      return new FormControl(null, [
        Validators.pattern(this.patterns.nick),
        Validators.required
      ])
    },
    password: () => {
      return new FormControl(null, [
        Validators.pattern(this.patterns.password),
        Validators.required
      ])
    },
    confirmPassword: () => {
      return new FormControl(null, [
        Validators.pattern(this.patterns.confirmPassword),
        Validators.required
      ])
    },
    title: () => {
      return new FormControl(null, [
        Validators.pattern(this.patterns.title),
        Validators.required
      ])
    },
    article: () => {
      return new FormControl(null, [
        Validators.pattern(this.patterns.article),
        Validators.required
      ])
    }
  }

  private login = {
    email: this.formControls.email(),
    password: this.formControls.password()
  }

  private forget = {
    email: this.formControls.email()
  }

  private reset = {
    password: this.formControls.password(),
    confirmPassword: this.formControls.confirmPassword()
  }

  private signup = {
    email: this.formControls.email(),
    nick: this.formControls.nick(),
    password: this.formControls.password(),
    confirmPassword: this.formControls.confirmPassword()
  }

  private about = this.signup

  private post = {
    title: this.formControls.title(),
    article: this.formControls.article()
  }

  private strategy = {
    createReactiveForm: type => (this.reactiveForm = new FormGroup(this[type])),
    url: () => `${this.url[this.type]}${this.edit ? '/' + this.edit._id : ''}`,
    action: () => `${this.edit ? 'put' : 'post'}`,
    setValues: values => (values ? this.reactiveForm.patchValue(values) : null)
  }

  constructor(private http: HttpService, public store: StoreService) {}

  public onCancel() {
    this.cancel.emit(true)
  }

  public onForget() {
    this.forgetEmiter.emit(true)
  }

  public onSubmit() {
    console.log('form submit')
    this.submit.emit(true)
    this.http[this.strategy.action()](
      this.strategy.url(),
      this.reactiveForm.value
    )
  }

  ngOnInit() {
    this.store.createSubcription('locale', 'form', store => {
      this.form = store
    })
    this.strategy.createReactiveForm(this.type)
    this.strategy.setValues(this.edit)
  }

  ngOnDestroy() {
    this.store.destroySubscription()
  }
}
