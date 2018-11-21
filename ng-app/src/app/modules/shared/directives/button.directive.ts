import { Directive, HostBinding, HostListener, Input } from '@angular/core'

@Directive({
  selector: '.btn'
})
export class ButtonDirective {
  @HostBinding('style.padding') padding = '15px 30px'
  @HostBinding('style.margin') margin = '10px'
  @HostBinding('style.letterSpacing') letterSpacing = '1px'
  @HostBinding('style.lineHeight') lineHeight = '20px'
  @HostBinding('style.cursor') cursor = 'pointer'
  @HostBinding('style.fontSize') fontSize = '20px'
  @HostBinding('style.fontWeight') fontWeight = '800'
  @HostBinding('style.borderRadius') borderRadius = '30px'
  @HostBinding('style.border') border = 'none'
  @HostBinding('style.outline') outline = 'none'
  @HostBinding('style.backgroundColor') backgroundColor = '#f7b733'
  @HostBinding('style.color') color = '#fff'

  constructor() {}

  @HostListener('mouseover', ['$event'])
  hover() {
    this.backgroundColor = '#f8c154'
  }

  @HostListener('mouseout', ['$event'])
  leave() {
    this.backgroundColor = '#f7b733'
  }
}
