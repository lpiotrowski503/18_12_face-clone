import { Directive, HostBinding } from '@angular/core'

@Directive({
  selector: '.label'
})
export class LabelDirective {
  @HostBinding('style.padding') padding = '20px 0px 0px 10px'
  @HostBinding('style.fontSize') fontSize = '20px'
  @HostBinding('style.letterSpacing') letterSpacing = '1px'
  @HostBinding('style.color') color = '#fff'
  constructor() {}
}
