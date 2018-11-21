import { NgModule } from '@angular/core'
import { SharedModule } from '../shared/shared.module'
import { LOCALE_ID } from '@angular/core'
import localePl from '@angular/common/locales/pl'
import { registerLocaleData } from '@angular/common'
registerLocaleData(localePl, 'pl')
import { CoreRoutingModule } from './core-routing.module'
import { CoreComponent } from './core.component'

@NgModule({
  imports: [SharedModule, CoreRoutingModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pl-PL' }],
  declarations: [CoreComponent]
})
export class CoreModule {}
