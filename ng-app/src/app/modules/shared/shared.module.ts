import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { FlexDirective } from './directives/flex.directive'
import { ButtonDirective } from './directives/button.directive'
import { NaviDirective } from './directives/navi.directive'
import { HeaderDirective } from './directives/header.directive'
import { FormComponent } from './components/form/form.component'
import { LabelDirective } from './directives/label.directive'
import { InputDirective } from './directives/input.directive'
import { ListenerDirective } from './directives/listener.directive'
import { NavbarComponent } from './components/navbar/navbar.component'
import { MessageComponent } from './components/message/message.component'
import { PostComponent } from './components/post/post.component'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [
    FormComponent,
    NavbarComponent,
    MessageComponent,
    PostComponent,
    FlexDirective,
    ButtonDirective,
    NaviDirective,
    HeaderDirective,
    LabelDirective,
    InputDirective,
    ListenerDirective
  ],
  exports: [
    CommonModule,
    FlexDirective,
    ButtonDirective,
    NaviDirective,
    HeaderDirective,
    FormComponent,
    FormsModule,
    ReactiveFormsModule,
    LabelDirective,
    InputDirective,
    ListenerDirective,
    NavbarComponent,
    MessageComponent,
    PostComponent
  ]
})
export class SharedModule {}
