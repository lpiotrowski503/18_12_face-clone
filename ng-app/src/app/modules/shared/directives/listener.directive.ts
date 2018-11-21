import { Directive, HostListener } from '@angular/core'

@Directive({
  selector: '[appListener]'
})
export class ListenerDirective {
  @HostListener('click', ['$event'])
  onclick() {
    console.log(event.target)
  }

  constructor() {}
}
