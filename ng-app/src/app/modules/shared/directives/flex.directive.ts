import { Directive, HostBinding, Input } from '@angular/core'

@Directive({
  selector: '.flex'
})
export class FlexDirective {
  @HostBinding('style.display') display = 'flex'

  @Input()
  @HostBinding('style.flexDirection')
  direction = 'column'

  @Input()
  @HostBinding('style.justifyContent')
  y = 'center'

  @Input()
  @HostBinding('style.alignItems')
  x = 'center'

  @Input()
  @HostBinding('style.flexGrow')
  grow = '1'

  constructor() {}
}
