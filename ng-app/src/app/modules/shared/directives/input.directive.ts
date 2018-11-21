import { Directive, HostBinding } from '@angular/core'

@Directive({
  selector: '.input'
})
export class InputDirective {
  @HostBinding('style.padding') padding = '10px'
  @HostBinding('style.margin') margin = '10px'
  @HostBinding('style.fontSize') fontSize = '20px'
  @HostBinding('style.lineHeight') lineHeight = '24px'
  @HostBinding('style.border') border = 'none'
  @HostBinding('style.borderRadius') borderRadius = '22px'
  @HostBinding('style.outline') outline = 'none'

  constructor() {}
}
