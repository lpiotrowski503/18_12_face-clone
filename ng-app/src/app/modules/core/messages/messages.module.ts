import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared/shared.module'

import { MessagesRoutingModule } from './messages-routing.module'
import { MessagesComponent } from './messages.component'

@NgModule({
  imports: [SharedModule, MessagesRoutingModule],
  declarations: [MessagesComponent]
})
export class MessagesModule {}
