import { Directive, HostBinding } from '@angular/core'

@Directive({
  selector: '.header'
})
export class HeaderDirective {
  @HostBinding('style.textAlign') textAlign = 'center'
  @HostBinding('style.fontSize') fontSize = '30px'
  @HostBinding('style.color') color = '#ffffff'

  constructor() {}
}
