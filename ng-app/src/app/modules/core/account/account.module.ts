import { NgModule } from '@angular/core'
import { SharedModule } from '../../shared/shared.module'

import { AccountRoutingModule } from './account-routing.module'
import { AccountComponent } from './account.component';
import { AboutComponent } from './about/about.component';
import { FriendsComponent } from './friends/friends.component';
import { PhotosComponent } from './photos/photos.component'

@NgModule({
  imports: [SharedModule, AccountRoutingModule],
  declarations: [AccountComponent, AboutComponent, FriendsComponent, PhotosComponent]
})
export class AccountModule {}
